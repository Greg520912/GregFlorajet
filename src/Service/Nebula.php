<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Curl;

use DateTime;

class Nebula
{
    protected $curl, $params;

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
            if(substr($r['code_prest'],0,3) == "RD_" ) $re[] = $r;
            else $po[] = $r;
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
        $tableau_trip_data = [];
        $tableau = json_decode($response, true);

        // Pour chaque tableau d'info de produit
        foreach ($tableau as $date_prix_devise){
            // Recup le bon tableau des infos du voyage en fonction de la devise précisée dans les param de l'URL
            if (!empty($date_prix_devise["code_devise"]) && $date_prix_devise["code_devise"] == $devise){
                $tableau_trip_data = $date_prix_devise;
            };
            // Si Devise inconnue, alors pas défaut EUR
            if (empty($date_prix_devise["code_devise"])){
                $date_prix_devise["code_devise"] = "EUR";
                $tableau_trip_data = $date_prix_devise;
            }
        }
        if (empty($tableau_trip_data['montant_acompte_manuel'])) $acompte = 0;
        else $acompte = $tableau_trip_data['montant_acompte_manuel'];

        // Recup du symbole £ ou $ de la devise
        $deviseSymbole = $this->getDeviseSymbole($devise);

        // Recup les infos de Saga
        $uri = '/api/tours/'.$tableau_trip_data["code_pack"].'/dates/'.$tableau_trip_data["date_depart"];
        $params = '?user='.$this->params->get('saga_user');
        $authenticationKey = $this->params->get('saga_key');
        $signature = 'GET '.$uri.$params.'#'.$authenticationKey;

        $url = $this->params->get('url_saga').$uri.$params.'&signature='.hash('sha256', $signature);
        $tripData = $this->curl->get($url);
        $tripData = json_decode($tripData, true);

        $date = new DateTime($tableau_trip_data["date_depart"]);
        $dateDepart = $date->format('d/m/Y');
        $date2 = new Datetime($tableau_trip_data['date_arrivee']);
        $dateArrivee = $date2->format('d/m/Y');

        if(empty($tripData['tour']['destination'])) $destination = $tableau[0]['geographie'];
        else $destination = $tripData['tour']['destination'];

        if (empty($tableau_trip_data["prixsuppsansdevise"])) $sup = 0;
        else $sup = $tableau_trip_data["prixsuppsansdevise"];
        $realPrice = $tableau_trip_data["prix_vente_adulte"]+$sup;

        $datas = array(
            'tour' => [
                'code' => $tableau_trip_data["code_pack"],
                'destination' => $destination,
                'devise' => $tableau_trip_data["code_devise"],
                'deviseSymbole' => $deviseSymbole,
                'themes' => $tripData['tour']['themes'],
    //                'name' => $tableau_trip_data["nom_produit"],
                'name' => $tripData['tour']["name"],
                'level' => $tripData['tour']["level"],
                'duration' => $tableau_trip_data["duree_com"],
                'nmin' => $tableau_trip_data["min_pax"],
                'nmax' => $tableau_trip_data["max_pax"],
                'thumb' => $tripData['tour']["thumb"],
                'idDatePrix' => $session->get('id_date_prix')
            ],
            'date' => [
                'date1' => $tableau_trip_data["date_depart"],
                'date2' => $tableau_trip_data["date_arrivee"],
                'price' => $realPrice,
                'acompte' => $acompte,
                'guaranteed' => $tableau_trip_data["confirmee"],
                'full' => $realPrice
            ]
        );

        $session->set('dataCodeDate', $datas);
        return true;
    }

    /**
     * @param $devise
     * @return string
     */
    private function getDeviseSymbole($devise){
        if(!empty($devise)){
            switch ($devise){
                case 'USD':
                    $deviseSymbole = "$";
                    break;
                case 'GBP':
                    $deviseSymbole = "£";
                    break;
                case 'EUR':
                    $deviseSymbole = "€";
                    break;
                default:
                    $deviseSymbole = "€";
                    break;
            }
        }
        return $deviseSymbole?:'€';
    }
}