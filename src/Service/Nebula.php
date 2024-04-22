<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Curl;

use DateTime;

class Nebula
{
    protected $curl, $saga, $params;

    /**
     * @param $this->curl
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->curl = new Curl();
        $this->params = $params;
    }

    /**
     * @param $request
     * @return mixed
     */
    public function getAssurances(Request $request){
        $session = $request->getSession();
        $url = $this->params->get('url_nebula')."/apis/sp/prestasupass";
        $response = $this->curl->get($url);
        $ok = array('ASS_RAPATRIEMENT_ASSURINCO','ASS_MULTI_ASSURINCO','ASS_MULTI_COVID_ASSURINCO','ASS_PREM_ASSURINCO','ASS_PREM_COVID_ASSURINCO');
        $tab = json_decode($response, true);
        foreach ($tab as $k => $r){
            if(!in_array($r['nomprest'],$ok) || $r['id_production_nautilus'] <> $session->get('production')) {
                unset($tab[$k]);
            } else {
                $tab[$k]['Pv_Eu'] = $r['Pv_Eu'] / 100;
                switch ($r['nomprest']){
                    case 'ASS_RAPATRIEMENT_ASSURINCO':
                        $session->set('taux_assurance_rapatriement',$tab[$k]['Pv_Eu']);
                        break;
                    case 'ASS_MULTI_ASSURINCO':
                        $session->set('taux_assurance_multirisque',$tab[$k]['Pv_Eu']);
                        break;
                    case 'ASS_MULTI_COVID_ASSURINCO':
                        $session->set('taux_assurance_multirisque_epidemie',$tab[$k]['Pv_Eu']);
                        break;
                    case 'ASS_PREM_ASSURINCO':
                        $session->set('taux_assurance_premium',$tab[$k]['Pv_Eu']);
                        break;
                    case 'ASS_PREM_COVID_ASSURINCO':
                        $session->set('taux_assurance_premium_epidemie',$tab[$k]['Pv_Eu']);
                        break;
                }
            }
        }
        $session->set('liste_assurances',$tab);
        return true;
    }


    public function getTarif($id_date_prix,$id_production, $request)
    {
        $session = $request->getSession();
        $url = $this->params->get('url_nebula')."/apis/sp/wssurfprice/getallpackagedateid/6c3gn7k5V53CqM9b2D76SHrjWmhHPP5p/".$id_production."/EUR/".$id_date_prix;
        $response = $this->curl->get($url);
        return json_decode($response, true);
    }
    /**
     * @param $id_date_prix
     * @param $id_production
     * @param $request
     * @return bool
     */
    public function getPrestationsObligatoires($id_date_prix, $id_production,Request $request){
        $session = $request->getSession();
        $url = $this->params->get('url_nebula')."/apis/sp/prestasupobl/".$id_date_prix."/".$id_production;
        $response = $this->curl->get($url);
        $datas = json_decode($response, true);
        $po = array();
        $re = array();
        foreach ($datas as $k => $r){
            if(substr($r['code_prest'],0,3) == "RD_" ){
                $re[] = $r;
            } elseif(substr($r['code_prest'],0,8) == "TXA_CARB" ) {
                $v = $session->get('vol');
                if($session->get('choixTransport') == 'option' && $v['stock'] > 0) $po[] = $r;
            } else {
                $po[] = $r;
            }
        }
        $session->set('prestations_obligatoires',$po);
        $session->set('reductions_enfants',$re);
        return true;
    }

    /**
     * Récupère le code et la date de départ du voyage choisi
     * @param $id_date_prix
     * @param $devise
     * @param $request
     * @return array[]
     */
    public function getProduit($id_date_prix,$devise,Request $request)
    {
        $session = $request->getSession();
        // Recup les infos du produit en json en fonction de la devise
        $url = $this->params->get('url_nebula')."/apis/sp/zohoprodcomwithpricesup/".$id_date_prix."/".$devise; // Test
        $response = $this->curl->get($url);
        $produit = json_decode($response, true);
        return $produit;
    }

    public function getVol($id_date_prix,$request)
    {
        $session = $request->getSession();
        $url = $this->params->get('url_nebula')."/apis/sp/infosvol/".$id_date_prix."/19/6c3gn7k5V53CqM9b2D76SHrjWmhHPP5p"; // Test
        $response = $this->curl->get($url);
        $vol = json_decode($response, true);
        if($vol){
            $vol = $vol['data'][0];
            $vol['stock'] = floatval($vol['quantite_stock_aerien']);
            if($vol['stock'] > 0) $vol['plan'] = $this->mise_en_forme_PlanVolStock($vol['pdv'],$vol['pdvj'],$vol);
            else $vol['plan'] = false;
            $vol['tarif'] = floatval($vol['prix_vol_ht']) + floatval($vol['taxe_vol']) + floatval($vol['fuel']);
            $session->set('vol',$vol);
            return $vol;
        }else{
            $session->set('vol',false);
        }
        return false;
    }

    public function getChoixTransport($id_date_prix, $request){
        $session = $request->getSession();
        $url = $this->params->get('url_nebula')."/apis/sp/wssurfprice/getchoixtransport/6c3gn7k5V53CqM9b2D76SHrjWmhHPP5p/".$id_date_prix;
        $response = $this->curl->get($url);
        $choixTransport = json_decode($response, true);
        if(empty($choixTransport['data'][0]['choix_transport'])) $choixTransport['data'][0]['choix_transport'] = "ND";
        $session->set('choixTransport',$choixTransport['data'][0]['choix_transport']);

        return $choixTransport['data'][0]['choix_transport'];
    }

    /**
     * @param $id_date_prix
     * @return mixed
     */
    public function getSoldOut($id_date_prix){
        $url = $this->params->get('url_nebula')."/apis/sp/soldout/".$id_date_prix;
        $response = $this->curl->get($url);
        $soldOut = json_decode($response, true);
        return $soldOut;
    }

    function mise_en_forme_PlanVolStock($pdv,$pdvj,$datas){

        $retour = [];
        $i = 0;
        $j = 0;

        $planVolStock = array();
        $planVolStockJour = array();

        foreach (explode(' ', $pdv) as $segment){
            if(empty($planVolStock[$j])) $planVolStock[$j] = $segment.' ';
            else $planVolStock[$j] .= $segment.' ';
            $i++;
            if ($i > 5) {
                $j++;
                $i = 0;
            }
        }

        $l = 0;
        $t = 0;
        $temp = explode(' ', $pdvj);

        foreach ($temp as $segment){
            if ($l == 0) $segment = substr($segment, -4);
            if ($l > 7) {
                $t++;
                if(empty($planVolStockJour[$t])) $planVolStockJour[$t] = substr($segment, -4).' ';
                else $planVolStockJour[$t] .= substr($segment, -4).' ';
                $l = 1;
            } else {
                if(empty($planVolStockJour[$t])) $planVolStockJour[$t] = $segment.' ';
                else $planVolStockJour[$t] .= $segment.' ';
                $l++;
            }
        }

        //Enlève dernière ligne qui est vide pour xx raison. A retravailler
        unset($planVolStockJour[$t]);
        $count = 0;
        $k = 0;
        foreach ($planVolStock as $segment){
            $count++;
            if ($k >= $j) continue;
            $exploded = explode(' ', $segment);
            if ($exploded[4]) $heureDepart = ' ('.substr_replace($exploded[4], ':', 2, 0).') ';
            if ($exploded[5]) $heureArrivee = ' ('.substr_replace($exploded[5], ':', 2, 0).') ';

            $retour['stock'][$k]['numVol'] = str_replace(' ', '', $exploded[1].$exploded[0]);
            $retour['stock'][$k]['depart'] = $exploded[2].$heureDepart;
            $retour['stock'][$k]['arrivee'] = $exploded[3].$heureArrivee;
            $retour['stock'][$k]['disponible'] = $datas['stock'];
            $k++;
        }
        $count = 0;
        $k = 0;

        foreach ($planVolStockJour as $segment){
            $count++;
            $exploded = explode(' ', $segment);
            if (!is_numeric($exploded[0][0])){
                $exploded[0] = substr($exploded[0], 1);
            }
            if ($exploded[4]) $heureDepart = ' ('.substr_replace($exploded[4], ':', 2, 0).') ';
            if ($exploded[5]) $heureArrivee = ' ('.substr_replace($exploded[5], ':', 2, 0).') ';

            // Recup les infos aéroports
            $cod_aero_1 = $exploded[2];
            $cod_aero_2 = $exploded[3];
            $url = $this->params->get('url_nebula')."/apis/sp/nautilusaeroport/6c3gn7k5V53CqM9b2D76SHrjWmhHPP5p/".$cod_aero_1;
            $response = $this->curl->get($url);
            $tmp = json_decode($response, true);
            $nom_aero_1 = $tmp['data'][0]['lib_aer'];
            $url = $this->params->get('url_nebula')."/apis/sp/nautilusaeroport/6c3gn7k5V53CqM9b2D76SHrjWmhHPP5p/".$cod_aero_2;
            $response = $this->curl->get($url);
            $tmp = json_decode($response, true);
            $nom_aero_2 = $tmp['data'][0]['lib_aer'];
            // Fin aéroports

            $cod_comp = $exploded[1];
            // Recup les infos compagnies
            $url = $this->params->get('url_nebula')."/apis/sp/nautiluscompagnie/6c3gn7k5V53CqM9b2D76SHrjWmhHPP5p/".$cod_comp;
            $response = $this->curl->get($url);
            $tmp = json_decode($response, true);
            $nom_com = $tmp['data'][0]['nom_cie'];

            $retour['stock'][$k]['affichage']['UN'] = "Départ " . $nom_aero_1 . ' ' .$this->setDateFormatEuropeen($exploded[6]) . ' '. $heureDepart;
            $retour['stock'][$k]['affichage']['UNB'] = 'Arrivée '. $nom_aero_2 . ' ' .$this->setDateFormatEuropeen($exploded[7]) . ' ' . $heureArrivee;

            $retour['stock'][$k]['affichage']['DEUX'] = 'Compagnie : ' . $nom_com;
            $retour['stock'][$k]['affichage']['TROIS'] = 'Numéro de vol : ' .$exploded[1].$exploded[0];

            $retour['stock'][$k]['depart_jour'] = $this->setDateFormatEuropeen($exploded[6]);
            $retour['stock'][$k]['arrivee_jour'] = $this->setDateFormatEuropeen($exploded[7]);

            $k++;
        }
        return $retour;
    }

    function setDateFormatEuropeen($date){
        // Format $date aaaa-mm-jj => jj/mm/aaaa
        $day_of_the_week = date('D', strtotime($date));
        $x = $this->translateDateDayEnglishToFrench($day_of_the_week);

        $date = explode('-', $date);
        $date = $x . ' ' . $date[2].'/'. $date[1].'/'. $date[0];
        return $date;
    }

    function translateDateDayEnglishToFrench($x){
        switch($x){
            case 'Mon':case 'Monday':
            $reponse = 'lun';
            break;
            case 'Tue':case 'Tuesday':
            $reponse = 'mar';
            break;
            case 'Wed':case 'Wednesday':
            $reponse = 'mer';
            break;
            case 'Thu':case 'Thursday':
            $reponse = 'jeu';
            break;
            case 'Fri':case 'Friday':
            $reponse = 'ven';
            break;
            case 'Sat':case 'Saturday':
            $reponse = 'sam';
            break;
            case 'Sun':case 'Sunday':
            $reponse = 'dim';
            break;
        }
        return $reponse;
    }
}