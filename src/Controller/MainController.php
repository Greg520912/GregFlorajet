<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\FormFactoryInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Form\BookingType;

use App\Service\Nebula;
use App\Service\Zoho;
use App\Service\Saga;
use App\Service\MailJet;

use DateTime;

class MainController extends AbstractController
{
    protected $formFactory, $nebula, $zoho, $saga, $params, $mailer;

    /**
     * @param FormFactoryInterface $formFactory
     */
    public function __construct(FormFactoryInterface $formFactory, ParameterBagInterface $params)
    {
        $this->formFactory = $formFactory;
        $this->params = $params;

        $this->nebula = new Nebula($this->params);
        $this->zoho = new Zoho($this->params);
        $this->saga = new Saga($this->params);
        $this->mailer = new MailJet($this->params);
    }

    /**
     * @Route("/", name="app_home")
     */
    public function index(Request $request): Response
    {
        locale_set_default('fr_FR');
        $session = $request->getSession();

        $session->set('marque', ucfirst(strtolower($this->params->get('marque'))));

        if($this->initialize($request)){
            $validation = $session->get('validation');
            if(!isset($validation)) $session->set('validation',false);
        }elseif(empty($session->get('id_date_prix'))){
            $this->rerouteVersSite($request);
        }

        $formBooking = $this->formFactory->create(BookingType::class,null);
        $formBooking->handleRequest($request);

        if ($formBooking->isSubmitted()) {
            // Récupère les informations entrées dans le formulaire par le client
            $formData = $request->request->all();

            if(isset($formData['booking'])){
                $bookingDatas = $formData['booking'];
                $validation = 'checked';
                if(!isset($bookingDatas['validDEVIS']) || $bookingDatas['validDEVIS']!='on') $validation = '';
                if(!isset($bookingDatas['validCDV']) || $bookingDatas['validCDV']!='on') $validation = '';
                if(!isset($bookingDatas['validPAYS']) || $bookingDatas['validPAYS']!='on') $validation = '';
                if(!isset($bookingDatas['validCHARTE']) || $bookingDatas['validCHARTE']!='on') $validation = '';
                if(!isset($bookingDatas['validREGLEMENT']) || $bookingDatas['validREGLEMENT']!='on') $validation = '';

                if(empty($bookingDatas['leaderPas']['numPas'])) $bookingDatas['leaderPas']['numPas'] = '1';

                $bookingDatas['marque'] = $session->get('marque');
                $bookingDatas['full_price'] = $session->get('prix_total');
                $bookingDatas['prix_total'] = $session->get('prix_total');
                $bookingDatas['advance'] = $session->get('advance');
                $session->set('full_price',$session->get('prix_total'));

                $session->set('booking', $bookingDatas);

                $this->_calculPrestationsObligatoires($request);
                $this->_calculDevis($request);

                // Envoi vers Zoho
                $data = $this->bookTrip($session->get('booking'), $session->get('dataCodeDate'), $session->get('id_date_prix'),$request);
                $session->set('zoho', $data);

                $session->set('validation', $validation);
            }
        }

        $tel = $this->params->get('tel');
        $telLien = 'tel:+33'. substr(str_replace(' ','',$tel),1);

        return $this->render(
            'main/index.html.twig', [
                'booking' => $formBooking->createView(),
                'sesbooking' => $session->get('booking'),
                'tripData' => $session->get('dataCodeDate'),
                'infos' => $this->_info($request),
                'validation' => $session->get('validation'),
                'urlAide' => $this->params->get('url_aide'),
                'urlClient' => $this->params->get('url_client'),
                'tel' => $tel,
                'telLien' => $telLien
            ]);
    }

    /**
     * @param Request $request
     * @return bool
     */
    private function initialize(Request $request)
    {
        locale_set_default('fr_FR');
        $session = $request->getSession();
        if(($devise = $request->get('devise')) && ($id_date_prix = $request->get('id_date_prix')) && ($marque = $request->get('agence'))){
            $session->clear();
            $session->set('step','index');
            $session->set('devise',$devise);
            $session->set('id_date_prix',$id_date_prix);
            $session->set('marque',$marque);
            $session->set('id_production',$this->params->get('production'));
            $session->set('booking',[]);
            $session->set('detail_devis',[]);
            $session->set('assurances',[]);
            $session->set('production',$this->params->get('production'));
            $session->set('coef_acompte',$this->params->get('coef_acompte'));

            if(empty($session->get('prestations_obligatoires')))
                $this->nebula->getPrestationsObligatoires($session->get('id_date_prix'),$session->get('id_production'),$request);
            if(empty($session->get('liste_assurances')))
                $this->nebula->getAssurances($request);
            if(empty($session->get('dataCodeDate'))) {
                $produit = $this->nebula->getProduit($session->get('id_date_prix'), $session->get('devise'), $request);
                $dataCodeDate = $this->setDataCodeDate($produit,$session->get('devise'),$request);
                $session->set('dataCodeDate', $dataCodeDate);
                $this->setSessionDatas($request);
            }

            if($session->get('nb_adults') < 1){
                $session->set('nb_adults', 1);
                $session->set('nb_children', 0);
            }
            $request->setSession($session);

            return true;
        }
        if(empty($session->get('id_date_prix'))){
            $session->clear();
            echo '
                <div class="text-center">
		            <h4>
		            Votre session a expirée ou l\'adresse demandée n\'est pas valide
		            <br/>Vous allez être redirigé vers le site <a href="'.$this->params->get('url_site').'">'.$this->params->get('marque').'</a>
		            </h4>
	            </div>
            ';
            $response = new Response();
            $response->setStatusCode(200);
            $response->headers->set('Refresh', '7; url='.$this->params->get('url_site'));
            $response->send();
            die;
        }
        if(empty($session->get('dataCodeDate'))) { $this->setSessionDatas($request); }
        return false;
    }

    /**
     * @param $tableau
     * @param Request $request
     * @return void
     * @throws \Exception
     */
    private function setDataCodeDate($produit,$devise,Request $request){
        $session = $request->getSession();
        $tableau_trip_data = [];

        // Pour chaque tableau d'info de produit
        foreach ($produit as $date_prix_devise){
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
        $result = $this->saga->get($tableau_trip_data["code_pack"],$tableau_trip_data["date_depart"]);
        $tripData = json_decode($result, true);

        $date = new DateTime($tableau_trip_data["date_depart"]);
        $dateDepart = $date->format('d/m/Y');
        $date2 = new Datetime($tableau_trip_data['date_arrivee']);
        $dateArrivee = $date2->format('d/m/Y');

        if(empty($tripData['tour']['destination'])) $destination = $produit[0]['geographie'];
        else $destination = $tripData['tour']['destination'];

        if (empty($tableau_trip_data["prixsuppsansdevise"])) $sup = 0;
        else $sup = $tableau_trip_data["prixsuppsansdevise"];
        $realPrice = $tableau_trip_data["prix_vente_adulte"]+$sup;

        $datas = [
            'tour' => [
                'code' => $tableau_trip_data['code_pack'],
                'destination' => $destination,
                'devise' => $tableau_trip_data['code_devise'],
                'deviseSymbole' => $deviseSymbole,
                'themes' => $tripData['tour']['themes'],
                'name' => $tripData['tour']['name'],
                'level' => $tripData['tour']['level'],
                'duration' => $tableau_trip_data['duree_com'],
                'nmin' => $tableau_trip_data['min_pax'],
                'nmax' => $tableau_trip_data['max_pax'],
                'thumb' => $tripData['tour']['thumb'],
                'idDatePrix' => $session->get('id_date_prix')
            ],
            'date' => [
                'date1' => $tableau_trip_data['date_depart'],
                'date2' => $tableau_trip_data['date_arrivee'],
                'price' => $realPrice,
                'acompte' => $acompte,
                'guaranteed' => $tableau_trip_data['confirmee'],
                'full' => $realPrice,
            ],
        ];

        return $datas;
    }

    /**
     * @param $request
     * @return void
     */
    private function setSessionDatas(Request $request){
        $session = $request->getSession();
        $dataCodeDate = $session->get('dataCodeDate');

        $d = explode('-',$dataCodeDate['date']['date1']);
        $date = $d[0]."-".$d[2]."-".$d[1];

        $type_pack = implode(' - ',$dataCodeDate['tour']['themes']);

        $type= $dataCodeDate['tour']['themes'][0];
        if(!empty($dataCodeDate['tour']['themes'][1])) $activite = $dataCodeDate['tour']['themes'][1];
        else $activite = '-';

        $full_price = ($dataCodeDate['date']['price']);
        $prixTTC = $session->get('prix_TTC');
        $advance = round($full_price * $session->get('coef_acompte'));

        $session->set('lib_pack', $dataCodeDate['tour']['name']);
        $session->set('pays_pack', $dataCodeDate['tour']['destination']);
        $session->set('dt_deb', $dataCodeDate['date']['date1']);
        $session->set('dt_fin', $dataCodeDate['date']['date2']);
        $session->set('prix_TTC', $dataCodeDate['date']['price']);
        $session->set('advance', $dataCodeDate['date']['acompte']);
        $session->set('prix_total', 0);
        $session->set('niveau', $dataCodeDate['tour']['level']);
        $session->set('nb_jours', $dataCodeDate['tour']['duration']);
        $session->set('type_pack', $type_pack);
        $session->set('type', $type);
        $session->set('activite', $activite);
        $session->set('cod_pack', $dataCodeDate['tour']['code']);
        $session->set('thumb', $dataCodeDate['tour']['thumb']);
        $session->set('themes', $dataCodeDate['tour']['themes']);
        $session->set('prix_total', $full_price);
        $session->set('assurance_rapatriement',round($prixTTC * $session->get('taux_assurance_rapatriement')));
        $session->set('assurance_multirisque', round($prixTTC * $session->get('taux_assurance_multirisque')));
        $session->set('assurance_premium', round($prixTTC * $session->get('taux_assurance_premium')));
        $session->set('assurance_multirisque_epidemie', round($prixTTC * $session->get('taux_assurance_multirisque_epidemie')));
        $session->set('assurance_premium_epidemie', round($prixTTC * $session->get('taux_assurance_premium_epidemie')));
        $session->set('total_assurances', 0);
        $session->set('prix_total_calcule', 0);
        $session->set('assurances',array());
        $session->set('advance', $advance);
        $session->set('thumb', $dataCodeDate['tour']['thumb']);

        return true;
    }

    /**
     * @param Request $request
     * @return void
     */
    private function rerouteVersSite(Request $request){
        $session = $request->getSession();
        $session->clear();
        echo '
                <div class="text-center">
                    <h3>
                    Votre demande n\'est pas valide
                    <br/>Vous allez être redirigé vers le site <a href="'.$this->params->get('url_site').'">Atalante</a>
                    </h3>
                </div>
            ';
        $response = new Response();
        $response->setStatusCode(200);
        $response->headers->set('Refresh', '7; url='.$this->params->get('url_site'));
        $response->send();
        die;
    }

    /**
     * @param Request $request
     * @return array
     */
    private function _info(Request $request)
    {
        //$this->_calculPrix($request);
        $session = $request->getSession();
        $booking = $session->get('booking');
        if(isset($booking['passengers']) && is_array($booking['passengers'])) {
            $this->_calculPrestationsObligatoires($request);
        }
        $this->_calculDevis($request);
        // Récupération de la session
        $session = $request->getSession();
        return array(
            'leader' => $request->get('nomPass'),
            'context' => $session->get('context'),
            'context_paiement' => $session->get('context_paiement'),
            'context_paiement_quick_booking' => $session->get('context_paiement_quick_booking'),
            'dtDeb' => $session->get('dt_deb'),
            'dtFin' => $session->get('dt_fin'),
            'prixTTC' => $session->get('prix_TTC'),
            'full_price' => $session->get('prix_total'),
            'libPack' => $session->get('lib_pack'),
            'paysPack' => $session->get('pays_pack'),
            'niveau' => $session->get('niveau'),
            'nbJours' => $session->get('nb_jours'),
            'typePack' => $session->get('type_pack'),
            'type' => $session->get('type'),
            'activite' => $session->get('activite'),
            'codPack' => $session->get('cod_pack'),
            'nbAdults' => $session->get('nb_adults'),
            'nbChildren' => $session->get('nb_children'),
            'advance' => $session->get('advance'),
            'totalAssurance' => $session->get('total_assurances'),
            'ArrayPaxAssurances' => $session->get('pax_assurances'),
            'ArrayAssurances' => $session->get('assurances'),
            'fraisDossier' => $session->get('frais_dossier'),
            'totalFraisDossier' => $session->get('total_frais_dossier'),
            'reductions' => $session->get('reductions'),
            'prestations' => $session->get('prestations'),
            'detailDevis' => $session->get('detail_devis'),
            'booking' => $session->get('booking'),
            'thumb' => $session->get('thumb')
        );
    }

    /**
     * @param $request
     * @return void
     */
    private function _calculPrestationsObligatoires($request){
        $session = $request->getSession();

        $bookingDatas = $session->get('booking');
        $detail_devis = $session->get('detail_devis');

        $totalReductions = 0;
        $totalPrestations = 0;
        $total_frais_dossier = 0;

        $prestationsObligatoires = $session->get('prestations_obligatoires');
        $reductionsEnfants = $session->get('reductions_enfants');
        if(!is_array($prestationsObligatoires)) $prestationsObligatoires = array();
        if(!is_array($reductionsEnfants)) $reductionsEnfants = array();

        $prestations = array();
        $reductions = array();

        if(isset($bookingDatas['passengers']) && is_array($bookingDatas['passengers'])){
            foreach ($bookingDatas['passengers'] as $k => $v){
                if(isset($bookingDatas['passengers'][$k]['dtNaissPas']) && !empty($bookingDatas['passengers'][$k]['dtNaissPas']) && isset($bookingDatas['passengers'][$k]['qualite']) && isset($bookingDatas['passengers'][$k]['nomPas']) && isset($bookingDatas['passengers'][$k]['prenomPas'])){
                    $bookingDatas['passengers'][$k]['cn'] = $bookingDatas['passengers'][$k]['qualite'].' '. $bookingDatas['passengers'][$k]['nomPas'].' '. $bookingDatas['passengers'][$k]['prenomPas'].' ';
                    if($k == 1){
                        $bookingDatas['passengers'][$k]['leaderPax'] = 1;
                        $bookingDatas['passengers'][$k]['isChild'] = 0;
                    }else{
                        if(stristr($bookingDatas['passengers'][$k]['qualite'],'enfant')) $bookingDatas['passengers'][$k]['isChild'] = 1;
                        else $bookingDatas['passengers'][$k]['isChild'] = 0;
                        $bookingDatas['passengers'][$k]['leaderPax'] = 0;
                    }

                    $ann = DateTime::createFromFormat('d/m/Y',$bookingDatas['passengers'][$k]['dtNaissPas']);
                    $dep = DateTime::createFromFormat('Y-m-d',$session->get('dt_deb'));
                    $age = $ann->diff($dep);
                    $age = intval($age->format('%y'));

                    $bookingDatas['passengers'][$k]['ageDateDepart'] = $age;

                    $detail_devis['pax'][$k]['cn'] = $bookingDatas['passengers'][$k]['cn'];
                    $detail_devis['pax'][$k]['ageDateDepart'] = $bookingDatas['passengers'][$k]['ageDateDepart'];
                    $detail_devis['pax'][$k]['reductions'] = array();
                    $detail_devis['pax'][$k]['prestations'] = array();

                    $detail_devis['pax'][$k]['prestations'][] = array('code' => $session->get('cod_pack'),'libelle' => $session->get('lib_pack'), 'prix_unit' => $session->get('prix_TTC'));

                    if(empty($bookingDatas['passengers'][$k]['assurance'])) $bookingDatas['passengers'][$k]['assurance'] = 'aucune';
                    if(empty($detail_devis['pax'][$k])){
                        $detail_devis['pax'][$k] = $bookingDatas['passengers'][$k];
                        $detail_devis['pax'][$k]['choix_assurance'] = 'aucune';
                    }else{
                        $detail_devis['pax'][$k]['choix_assurance'] = $bookingDatas['passengers'][$k]['assurance'];
                    }
                    foreach ($reductionsEnfants as $reduction)
                    {
                        if(empty($reduction['AgeMini'])) $reduction['AgeMini'] = 1;
                        if(empty($reduction['AgeMaxi'])) $reduction['AgeMaxi'] = 150;
                        $key = $reduction['AgeMini'] . '-' . $reduction['AgeMaxi'];
                        // Match réduction/passager (âge)
                        if($age >= intval($reduction['AgeMini']) && $age <= intval($reduction['AgeMaxi'])){
                            // prix : prix Exception si renseigné sinon prix par défaut
                            if(!empty($reduction['PrixPrestaException'])) $reduc = $reduction['PrixPrestaException'] < 0 ? $reduction['PrixPrestaException'] : $reduction['PrixPresta'];
                            else $reduc = $reduction['PrixPresta'];
                            $reduc = number_format($reduc);
                            $numPas = $k;
                            //$numPas = $detail_devis['pax'][$k]['numPas'];
                            $cn = $detail_devis['pax'][$k]['cn'];
                            $reductions[$key]['libelle'] = $reduction['lib_prest'];
                            $reductions[$key]['prix_unit'] = $reduc;
                            if(array_key_exists($key,$reductions)){
                                if(empty($reductions[$key]['nb'])) $reductions[$key]['nb'] = 1;
                                else $reductions[$key]['nb']++;
                                if(empty($reductions[$key]['prix_total'])) $reductions[$key]['prix_total'] = $reduc;
                                else $reductions[$key]['prix_total'] += $reduc;
                                $reductions[$key]['pax'][$numPas] = array('cn' => $cn);
                            }
                            else {
                                $reductions[$key]['nb'] = 1;
                                $reductions[$key]['value'] = $reduc;
                                $reductions[$key]['prix_total'] = $reduc;
                                $reductions[$key]['prix'] = $reduc;
                                $reductions[$key]['pax'] = array($numPas=> array('cn' => $cn));
                            }
                            $detail_devis['pax'][$k]['reductions'][] = array('montant' => $reduc);
                        }
                    }
                    foreach($prestationsObligatoires as $prestation)
                    {
                        $key = $prestation['code_prest'];
                        // Match prestation/passager (âge)
                        if(empty($prestation['AgeMini'])) $prestation['AgeMini'] = 1;
                        if(empty($prestation['AgeMaxi'])) $prestation['AgeMaxi'] = 150;
                        if($age >= intval($prestation['AgeMini']) && $age <= intval($prestation['AgeMaxi'])){

                            $prix = $prestation['PrixPrestaException'] > 0 ? $prestation['PrixPrestaException'] : $prestation['PrixPresta'];
                            $prix = number_format($prix);
                            $totalPrestations += $prix;
                            $prestations[$key]['prix_unit'] = $prix;
                            $prestations[$key]['libelle'] = $prestation['lib_prest'];
                            if(array_key_exists($key, $prestations)){
                                if(empty($prestations[$key]['nb'])) $prestations[$key]['nb'] = 1;
                                else $prestations[$key]['nb']++;
                                if(empty($prestations[$key]['prix_total'])) $prestations[$key]['prix_total'] = $prix;
                                else $prestations[$key]['prix_total'] += $prix;
                            }
                            else{
                                $prestations[$key]['nb'] = 1;
                                $prestations[$key]['prix_total'] = $prix;
                            }

                            if($prestation['code_prest'] == 'FRAIS_INSCRI') $total_frais_dossier += $prix;

                            // $detailPax['prestations'][] = array('code' => $prestation['nomprest'],'libelle' => $prestation['libelleprest'], 'prix_unit' => $prix);
                            $detail_devis['pax'][$k]['prestations'][] = array('code' => $prestation['code_prest'],'libelle' => $prestation['lib_prest'], 'prix_unit' => $prix);
                        }
                    }
                }
            }
            $session->set('reductions',$reductions);
            $session->set('total_reductions',$totalReductions);
            $session->set('prestations',$prestations);
            $session->set('total_prestations',$totalPrestations);

            $detail_devis['reductions'] = $reductions;
            $detail_devis['prestations'] = $prestations;

            $session->set('total_frais_dossier', $total_frais_dossier);
        }
        $session->set('detail_devis',$detail_devis);

    }

    /**
     * @param Request $request
     * @return void
     */
    private function _calculDevis(Request $request)
    {
        // Récupération de la session
        $session = $request->getSession();
        $detailDevis = $session->get('detail_devis');
        $booking = $session->get('booking');
        $coef_acompte = $this->params->get('coef_acompte');

        if(isset($detailDevis['pax']) && is_array($detailDevis['pax'])){
            // Calcul de l'assiette (base de prix pour calcul assurance) / passager
            // Total du montant des prestations
            $totalDevis = 0;
            foreach($detailDevis['pax'] as $numPas => $pax)
            {
                $assiette = 0;
                $totalPax = 0;
                if (isset($pax['prestations'])) {
                    foreach ($pax['prestations'] as $prestation) {
                        // sauf frais d'inscription
                        if ($prestation['code'] !== 'FRAIS_INSCRI') {
                            $assiette += $prestation['prix_unit'];
                        }
                        $totalPax += $prestation['prix_unit'];
                        $totalDevis += $prestation['prix_unit'];
                    }
                }
                if (isset($pax['reductions'])) {
                    foreach ($pax['reductions'] as $reduction) {
                        $assiette += $reduction['montant'];
                        $totalPax += $reduction['montant'];
                        $totalDevis += $reduction['montant'];
                    }
                }
                $detailDevis['pax'][$numPas]['assiette'] = $assiette;

                // Calcul des assurances pour le pax
                $detailDevis['pax'][$numPas]['montant_assurance_multirisque'] = round($assiette * $session->get('taux_assurance_multirisque'));
                $detailDevis['pax'][$numPas]['montant_assurance_premium'] = round($assiette * $session->get('taux_assurance_premium'));
                $detailDevis['pax'][$numPas]['montant_assurance_multirisque_epidemie'] = round($assiette * $session->get('taux_assurance_multirisque_epidemie'));
                $detailDevis['pax'][$numPas]['montant_assurance_premium_epidemie'] = round($assiette * $session->get('taux_assurance_premium_epidemie'));
                $detailDevis['pax'][$numPas]['montant_assurance_aucune'] = 0;

                $assuranceKey = 'montant_assurance_' . $detailDevis['pax'][$numPas]['choix_assurance'];
                $montantAssurance = $detailDevis['pax'][$numPas][$assuranceKey];
                $totalPax += $montantAssurance;
                $totalDevis += $montantAssurance;
                $detailDevis['pax'][$numPas]['montant_total_pax'] = $totalPax;
            }

            // $totalDevis += $session->get('total_frais_dossier');
            $detailDevis['montant_total_devis'] = $totalDevis;
            $advance = round($totalDevis * $coef_acompte);
            $detailDevis['montant_acompte_devis'] = $advance;
            $detailDevis['advance'] = $advance;
            $detailDevis['montant_frais_dossier'] = $session->get('total_frais_dossier');

            $session->set('detail_devis',$detailDevis);
            // Total
            $session->set('prix_total', $totalDevis);
            // Acompte
            $session->set('advance', $advance);
        }
    }

    /**
     * @param $request
     * @return void
     */
    public function checkDevisPassengers($request){
        $session = $request->getSession();
        $booking = $session->get('booking');
        $detail_devis = $session->get('detail_devis');
        if(isset($detail_devis['pax']) && isset($booking['passengers'])){
            foreach ($booking['passengers'] as $id => $r){
                if(!isset($detail_devis['pax'][$id])) unset($booking['passengers'][$id]);
            }
            foreach ($detail_devis['pax'] as $id => $r){
                if(!isset($booking['passengers'][$id])) unset($detail_devis['pax'][$id]);
            }
        }
        $session->set('booking',$booking);
        $session->set('detail_devis',$detail_devis);
    }

    /**
     * Enregistrement de la réservation
     * @param array $formData
     * @return array
     */
    private function bookTrip($formData, $dataCodeDate, $id_date_prix,$request)
    {
        $session = $request->getSession();
        // 1ère étape : création de l'individu qui effectue la réservation s'il n'existe pas
        $individu = $this->zoho->getOrCreateIndividu($formData);

        // 2ème étape : création du dossier de la réservation
        $dossier = $this->zoho->createDossier($individu, $formData, $dataCodeDate,$request);

        // 3ème étape : Créer id vente pour le lier au dossier
        $vente = $this->zoho->getIdVenteByIdDossier($dossier);

        // 6ème étape : Créer et ajoute dans zoho les infos et remarques - curl*1
        // $note = $this->addNote($dossier, $formData, $dataCodeDate);
        $note = $this->zoho->addNote_async($dossier, $formData, $dataCodeDate,$request);

        //7 ème étape : création des différents passDossier
        $data = $this->zoho->createOthersSuiviDossier($dossier, $individu, $formData, $vente);

        //Liaison ligne de vente au dossier - curl*2
        $products = $this->zoho->getproductsbyidsale($vente);
        if ($this->checkIfNewSale($products)) $this->zoho->addlignevente($id_date_prix, $dataCodeDate["tour"]["devise"], $dossier, $formData["nbAdults"]);

        // 4ème étape : Lie l'id_vente avec le pax leader - curl*1
        $paxleadsale = $this->zoho->leadPassengerSaleLink_async($individu, $vente);

        // 5ème étape : création des passagers et les lier à la vente - curl*2*passengers
        $pax = $this->zoho->createPassengersDossier_parallel($dossier, $individu, $formData, $vente);
        
//        echo "<pre>";
//        var_dump($individu);
//        var_dump($dossier);
//        die;

        return $data;
    }

    /**
     * @param $products
     * @return bool
     */
    private function checkIfNewSale($products){
        $saleUpdate = 'non';
        foreach ($products as $product){
            if (!is_array($product)) continue;
            if ($product[0]['product']['Product_Code'] == 'NEW-SALE') $saleUpdate = 'oui';
        }
        if ($saleUpdate == 'oui') return true;
        else return false;
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

    // Actions Ajax -----------------------------------------------------------------------------------

    /**
     * @Route("/info-title", name="info_title")
     * @param Request $request
     * @return Response
     */
    public function infoTitleAction(Request $request): Response
    {
        $infos = $this->_info($request);
        return $this->render('main/inc/inc.info-title.twig', array(
            'infos'     => $infos,
        ));
    }

    /**
     * @Route("/app_infos", name="app_infos")
     * @param Request $request
     * @return Response
     */
    public function infoAction(Request $request) :Response
    {
        $infos = $this->_info($request);
        return $this->render('main/inc/inc.info.twig', array(
            'infos'     => $infos,
        ));
    }

    /**
     * @Route("/app_pax", name="app_pax")
     * @param Request $request
     * @return Response
     */
    public function paxAction(Request $request)
    {
        // Récupération de la session
        $session = $request->getSession();
        $booking = $session->get('booking');
        $detail_devis = $session->get('detail_devis');
        if ($request->isXMLHttpRequest()) {
            if ($request->isMethod('POST')) {
                foreach($request->request->get('categories') as $key=>$value){
                    if(empty($value)) $value = 0;
                    if($key == 'adult') $session->set('nb_adults',$value);
                    if($key == 'child') $session->set('nb_children',$value);
                }
            }
            $data = $this->_info($request);
            return new JsonResponse($data);
        }
        return new Response('This is not ajax!', 400);
    }

    /**
     * @Route("/app_updatesession", name="app_updatesession")
     * @param Request $request
     * @return Response
     */
    public function updateSessionAction(Request $request){
        $session = $request->getSession();
        if ($request->isXMLHttpRequest()) {
            if ($request->isMethod('POST')) {
                $s = $request->request->get('categories');
                if($s['id'] != 'del'){
                    if(empty($s['valeur'])) $s['valeur'] = '';
                    $explode = explode('_',$s['id']);
                    $datas = $session->get($explode[0]);
                    if(empty($datas)) $datas = array();
                    $pointeur = &$datas;
                    foreach ($explode as $n){
                        if($n != $explode[0]) $pointeur = &$pointeur[$n];
                    }
                    $pointeur = $s['valeur'];
                    $session->set($explode[0],$datas);
                    if($explode[0] == 'nbAdults') $session->set('nb_adults',$datas);
                    if($explode[0] == 'nbChildren') $session->set('nb_children',$datas);
                    return new JsonResponse($s['id'].' = '. serialize($s['valeur']));
                }else{
                    $this->checkDevisPassengers($request);
                    $session = $request->getSession();

                    $booking = $session->get('booking');
                    $detail_devis = $session->get('detail_devis');

                    if(isset($booking['passengers']) && is_array($booking['passengers'])){
                        $nba = $booking['nbAdults'];
                        $nbc = $booking['nbChildren'];
                        $cpteA = 0;
                        $cpteC = 0;
                        $action = "RAS";
                        foreach ($booking['passengers'] as $id => $r){
                            if($r['isChild'] == 0) $cpteA ++;
                            if($r['isChild'] == 1) $cpteC ++;
                            if( ($cpteA > $nba && $r['isChild'] == 0) || ($cpteC > $nbc && $r['isChild'] == 1)){
                                unset($booking['passengers'][$id], $detail_devis['pax'][$id]);
                                $action = "deleted";
                            }
                        }
                        $session->set('detail_devis',$detail_devis);
                        $session->set('booking', $booking);
                        $session->remove('assurances');
                        return new JsonResponse('Passenger = '.$action);
                    }
                    return new JsonResponse('Passengers = NOT deleted');
                }
            }
        }
        return new Response('This is not ajax!');
    }

    /**
     * @Route("/app_infos_assurances", name="app_infos_assurances")
     * @param Request $request
     * @return Response
     */
    public function infosAssurancesAction(Request $request)
    {
        $session = $request->getSession();
        $infos = $this->_info($request);
        $booking = $session->get('booking');
        $detail_devis = $session->get('detail_devis');
        $validation = $session->get('validation');

//        if ($request->isXMLHttpRequest()) {
            return $this->render('main/inc/inc.infos-assurances.twig', array(
                'infos' => $infos,
                'detail_devis' => $detail_devis,
                'booking' => $booking,
                'validation' => $validation
            ));
//        }
//        return new Response('This is not ajax!', 400);
    }

    /**
     * @Route("/app_step_assurances", name="app_step_assurances")
     * @param Request $request
     * @return Response
     */
    public function stepAssurancesAction(Request $request)
    {
        $session = $request->getSession();
        $bookingDatas = $session->get('booking');
        $detail_devis = $session->get('detail_devis');

        $complet = true;
        if(isset($bookingDatas['passengers']) && is_array($bookingDatas['passengers'])){
            $noms = array('qualite','nomPas','prenomPas','dtNaissPas');
            foreach ($bookingDatas['passengers'] as $k => $r){
                if(empty($bookingDatas['passengers'][$k]['numPas'])) $bookingDatas['passengers'][$k]['numPas'] = $k;
                foreach ($noms as $champ){
                    if(!isset($bookingDatas['passengers'][$k][$champ]) || $bookingDatas['passengers'][$k][$champ] == '' || $bookingDatas['passengers'][$k][$champ] == null){
                        $complet = false;
                    }
                }
            }
            if($complet === false) return new Response(false,200);

            foreach ($bookingDatas['passengers'] as $k => $v){
                if(empty($detail_devis['pax'][$k])) $detail_devis['pax'][$k] = $bookingDatas['passengers'][$k];
                if(empty($bookingDatas['passengers'][$k]['isChild'])) $bookingDatas['passengers'][$k]['isChild'] = 0;
                if($k == 1) $bookingDatas['passengers'][$k]['leaderPax'] = 1;
                else $bookingDatas['passengers'][$k]['leaderPax'] = 0;

                $detail_devis['pax'][$k]['leaderPax'] = $bookingDatas['passengers'][$k]['leaderPax'];
                $detail_devis['pax'][$k]['vars'] = $k;
                $detail_devis['pax'][$k]['isChild'] = $bookingDatas['passengers'][$k]['isChild'];
                $detail_devis['pax'][$k]['numPas'] = intval($k);
                $bookingDatas['passengers'][$k]['numPas'] = intval($k);
                $detail_devis['pax'][$k]['nomPas'] = $bookingDatas['passengers'][$k]['nomPas'];
                $detail_devis['pax'][$k]['prenomPas'] = $bookingDatas['passengers'][$k]['prenomPas'];

                $bookingDatas['passengers'][$k]['cn'] = $bookingDatas['passengers'][$k]['qualite'].' '. $bookingDatas['passengers'][$k]['nomPas'].' '. $bookingDatas['passengers'][$k]['prenomPas'].' ';

                $ann = DateTime::createFromFormat('d/m/Y',$bookingDatas['passengers'][$k]['dtNaissPas']);
                $dep = DateTime::createFromFormat('Y-m-d',$session->get('dt_deb'));
                $age = $ann->diff($dep);
                $age = intval($age->format('%y'));

                $bookingDatas['passengers'][$k]['ageDateDepart'] = $age;

                $detail_devis['pax'][$k]['cn'] = $bookingDatas['passengers'][$k]['cn'];
                $detail_devis['pax'][$k]['qualite'] = $bookingDatas['passengers'][$k]['qualite'];
                $detail_devis['pax'][$k]['ageDateDepart'] = $bookingDatas['passengers'][$k]['ageDateDepart'];
                $detail_devis['pax'][$k]['dtNaissPas'] = $bookingDatas['passengers'][$k]['dtNaissPas'];
                $detail_devis['pax'][$k]['reductions'] = array();
                $detail_devis['pax'][$k]['prestations'] = array();
                $detail_devis['pax'][$k]['prestations'][] = array('code' => $session->get('cod_pack'),'libelle' => $session->get('lib_pack'), 'prix_unit' => $session->get('prix_TTC'));

                if(empty($bookingDatas['passengers'][$k]['choix_assurance'])) $bookingDatas['passengers'][$k]['choix_assurance'] = 'aucune';
                if(empty($bookingDatas['passengers'][$k]['assurance'])) $bookingDatas['passengers'][$k]['assurance'] = 'aucune';
                if(empty($detail_devis['pax'][$k]['choix_assurance'])) $detail_devis['pax'][$k]['choix_assurance'] = $bookingDatas['passengers'][$k]['choix_assurance'];
                if(empty($detail_devis['pax'][$k]['assurance'])) $detail_devis['pax'][$k]['assurance'] = $bookingDatas['passengers'][$k]['assurance'];

                $detail_devis['pax'][$k]['assurance'] = $detail_devis['pax'][$k]['choix_assurance'];
            }
            $session->set('booking',$bookingDatas);
            $session->set('detail_devis',$detail_devis);

            return $this->render(
                'main/inc/inc.assurances.twig',
                array(
                    'booking' => $bookingDatas,
                    'url_ass_multi' => $this->params->get('url_ass_multi'),
                    'url_ass_prem' => $this->params->get('url_ass_prem'),
                    'url_ass_multi_epi' => $this->params->get('url_ass_multi_epi'),
                    'url_ass_prem_epi' => $this->params->get('url_ass_prem_epi'),
                    'detailDevis' => $detail_devis
                )
            );
        }else {
            return new Response(false, 200);
        }
    }

    /**
     * @Route("/app_assurances", name="app_assurances")
     * @param Request $request
     * @return JsonResponse|Response
     *
     * A voir pour supprimer
     */
    public function assurancesAction(Request $request)
    {
        // Récupération de la session
        $session = $request->getSession();
        $coef_acompte = $this->params->get('coef_acompte');

        if ($request->isMethod('POST')) {
            $prixTTC = $session->get('prix_TTC');
            $totalAssurances = 0;
            $paxAssurances = array();
            $assurances = array(
                'rapatriement' => array('nb' => 0, 'total' => 0),
                'premium' => array('nb' => 0, 'total' => 0),
                'premium_epidemie' => array('nb' => 0, 'total' => 0),
                'multirisque' => array('nb' => 0, 'total' => 0),
                'multirisque_epidemie' => array('nb' => 0, 'total' => 0),
                'aucune' => array('nb' => 0, 'total' => 0)
            );
            $booking = $session->get('booking');
            $detailDevis = $session->get('detail_devis');
            $ass = $request->request->get('assurances');
            if(is_array($ass)){
                foreach($request->request->get('assurances') as $assurance)
                {
                    $numpPas = $assurance['numpas'];
                    $choixAssurance = $assurance['assurance'];
                    $assurances[$assurance['assurance']]['nb']++;
                    $detailDevis['pax'][$numpPas]['choix_assurance'] = $choixAssurance;
                    $booking['passengers'][$numpPas]['assurance'] = $choixAssurance;
                }
            }
            $nbPax = $session->get('nb_adults') + $session->get('nb_children');
            $full_price = $session->get('prix_TTC') * $nbPax;
            $full_price += $totalAssurances;
            //$full_price += $session->get('total_frais_dossier');

            $session->set('total_assurances', $totalAssurances);
            $session->set('prix_total', $full_price);
            $advance = round($full_price * $coef_acompte);

            $session->set('advance', $advance);
            $detailDevis['advance'] = $advance;

            $session->set('pax_assurances',$paxAssurances);
            $session->set('assurances',$assurances);

            //$this->_calculPrix($request);
            $session->set('detail_devis',$detailDevis);
            $session->set('booking',$booking);

            if(isset($booking['passengers']) && is_array($booking['passengers'])) {
                $this->_calculPrestationsObligatoires($request);
            }
            $this->_calculDevis($request);
        }
        $data = $this->_info($request);
        return new JsonResponse($data);

        return new Response('This is not ajax!', 400);
    }

     /**
     * @Route("/app_step_validation", name="app_step_validation")
     * @param Request $request
     * @return Response
     */
    public function stepValidationAction(Request $request)
    {
        $session = $request->getSession();
        $marque = $this->params->get('marque');
        $booking = $session->get('booking');
        $detail_devis = $session->get('detail_devis');
        $validation = $session->get('validation');
        $complet = true;
        if(isset($booking['passengers']) && is_array($booking['passengers'])) {
            $noms = array('qualite', 'nomPas', 'prenomPas', 'dtNaissPas');
            foreach ($booking['passengers'] as $k => $r) {
                if (empty($booking['passengers'][$k]['numPas'])) $booking['passengers'][$k]['numPas'] = $k;
                foreach ($noms as $champ) {
                    if (!isset($booking['passengers'][$k][$champ]) || $booking['passengers'][$k][$champ] == '' || $booking['passengers'][$k][$champ] == null) {
                        $complet = false;
                    }
                }
            }
            if ($complet === false) return new Response(false, 200);
            else {
                $tel = $this->params->get('tel');
                $telLien = 'tel:+33'. substr(str_replace(' ','',$tel),1);
                return $this->render('main/inc/inc.validation.twig',
                    array(
                        'detail' => $detail_devis,
                        'booking' => $booking,
                        'url_charte' => $this->params->get('url_charte'),
                        'url_cgv' => $this->params->get('url_cgv'),
                        'url_conseil' => $this->params->get('url_conseil'),
                        'validation' => $validation,
                        'marque' => ucfirst(strtolower($marque)),
                        'urlAide' => $this->params->get('url_aide'),
                        'urlClient' => $this->params->get('url_client'),
                        'tel' => $tel,
                        'telLien' => $telLien
                    )
                );
            }
        }
        return new Response('');
    }

    /**
     * @Route("/app_topayment", name="app_topayment")
     * @param Request $request
     * @return Response
     */
    public function toPaymentAction(Request $request){
        $session = $request->getSession();
        $booking = $session->get('booking');
        $detail = $session->get('detail_devis')?:[];
        $validation = $session->get('validation');
        $tel = $this->params->get('tel');
        $telLien = 'tel:+33'. substr(str_replace(' ','',$tel),1);

        return $this->render('main/inc/inc.topayment.twig', array(
            'booking' => $booking,
            'marque' => strtolower($this->params->get('marque')),
            'agence' => $this->params->get('agence'),
            'validation' => $validation,
            'detail' => $detail,
            'urlAide' => $this->params->get('url_aide'),
            'urlClient' => $this->params->get('url_client'),
            'tel' => $tel,
            'telLien' => $telLien
        ));
    }

    // Fin Actions Ajax -------------------------------------------------------------------------------

    /**
     * @Route("/testMail", name="testMail")
     * @return void
     */
    public function testMailer() :Response
    {
        $datas = [
            'to' => $this->params->get('mailer_admin'),
            'to_name' => $this->params->get('mailer_admin'),
            'subject' => 'Test Mailjet => BiAtalante',
            'body' => 'Email de test via Mailjet',
        ];
        $this->mailer->sendMail($datas);
        return new Response('Email envoyé');
    }
}
