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
        $produit = json_decode($response, true);

        return $produit;
    }
}