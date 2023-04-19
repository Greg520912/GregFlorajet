<?php

namespace App\Controller;

use App\Form\BookingType;

use App\Service\Zoho;
use App\Service\Ogone;
use App\Service\ShaComposer;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PaymentController extends AbstractController{

    protected $zoho, $ogone, $shaComposer;

    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
        $this->ogone = new Ogone($this->params);
        $this->shaComposer = new ShaComposer($this->params);
        $this->zoho = new Zoho($this->params);
    }

    /**
     * @Route("/app_gopayment", name="app_gopayment")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function goPaymentAction(Request $request){
        $session = $request->getSession();
        $marque = $this->params->get('marque');
        $bookingDatas = $session->get('booking');
        $detail_devis = $session->get('detail_devis');
        $data = $session->get('zoho');
        $dataCodeDate = $session->get('dataCodeDate');
        $data['booking']['leaderPas']["nomPas"] = preg_replace(array( '#[\\s-]+#', '#[^A-Za-z0-9. -]+#' ), '_', $this->cleanString($data['booking']['leaderPas']["nomPas"]));
        $data['booking']['leaderPas']["prenomPas"] = preg_replace(array( '#[\\s-]+#', '#[^A-Za-z0-9. -]+#' ), '_', $this->cleanString($data['booking']['leaderPas']["prenomPas"]));
        $data['booking']['leaderPas']["username"] = $data['booking']['leaderPas']["emailDom"];
        $data['booking']['leaderPas']["email"] = $data['booking']['leaderPas']["emailDom"];
        $infos['id_vente'] = $data['id_vente'];
        $infos['marque'] = strtolower($marque);
        $infos['leaderpax'] = $data['booking']['leaderPas'];
        $infos['id_individu'] = $data['individu'];
        $infos['id_date_prix'] = $session->get('id_date_prix');
        $infos['devise'] = $dataCodeDate["tour"]["devise"];
        $infos['numDos'] = $data['dossier'];
        $infos['prix_base'] = $dataCodeDate["date"]["price"];
        $infos['price'] = $detail_devis["montant_acompte_devis"];
        $infos['quantity'] = $data['booking']["nbAdults"] + $data['booking']["nbChildren"];
        $infos['full_price'] = $detail_devis["montant_total_devis"];
        $token = base64_encode(json_encode($infos));
        return $this->redirectToRoute('app_payment', array('token' => $token));
    }

    /**
     * @Route("/payment", name="app_payment")
     * @param Request $request
     * @return Response
     */
    public function paymentAction(Request $request)
    {
        $token = json_decode(base64_decode($request->query->get('token')));

        // Appel Ogone et webservice de Zoho pour créer un id de paiement et l'enregistrer dans zoho
        $param = $this->ogone->get($request, $token->price, $token->id_individu, $token->numDos, $token->marque, $token->id_date_prix, $token->devise, $token->quantity, $token->id_vente, $token->full_price);
        $shaIn = $this->shaComposer->get($token->price, $token->leaderpax, $param, $token->devise);

        // Envoie des paramètres au TPE et page paiement
        return $this->render('main/payment.twig',
            array(
                'montant' => $token->price * 100,
                'id_paiement' => $param['paiement'],
                'sha' => $shaIn,
                'prenomPas' => $token->leaderpax->prenomPas,
                'nomPas' => $token->leaderpax->nomPas,
                'email' => $token->leaderpax->username,
                'acceptURL' => $param['acceptURL'],
                'declineURL' => $param['declineURL'],
                'cancelURL' => $param['cancelURL'],
                'complus' => $param['complus'],
                'paramplus' => $param['paramplus'],
                'id_date_prix' => $token->id_date_prix,
                'devise' => $token->devise,
                'urlogone' => $this->params->get('url_ogone'),
                'pspid' => $this->params->get('ogone_pspid'),
                'template' => $this->params->get('ogone_template'),
                'url_site' => $this->params->get('url_site'),
                'marque' => $this->params->get('marque'),
            )
        );
    }

    // TODO suite ! Vérifier usage fonctions !

    /**
     * Page de retour OGONE
     * @Route("/payment_back", name="app_payment_back")
     * @param Request $request
     * @return Response
     */
    public function paymentBackAction(Request $request){
        $session = $request->getSession();

        $stat = $request->query->get('stat'); // Status du paiement (Accepted / Denied)
        $status = $request->query->get('STATUS'); // Status du paiement (5 == Accepted / Denied / 1 == cancelled)
        $paiement = $request->query->get('orderID'); // ID Paiement Zoho
        $pay_id = $request->query->get('PAYID'); // ID paiement Ogone
        $id_date_prix = $request->query->get('dt');
        $price = $request->query->get('pr');
        $numDos = $request->query->get('file'); // ID Dossier Zoho

        if (empty($pay_id) OR $pay_id === ' ') $pay_id = 'PAY-ID Empty';

        // Appel le webservice Zoho pour la validation du paiement en attente
        $this->zoho->validationPayment($paiement, $status, $pay_id, $stat);
        $this->zoho->updatedossier($numDos);

        $session->set('stat', $stat);
        $session->set('status', $status);
        $session->set('pay_id', $pay_id);
        $session->set('id_paiement', $paiement);
        $session->set('id_date_prix', $id_date_prix);
        $session->set('montant_paye', $price);

        // Reroute vers returnPaymentAction() pour empecher les clients de créer plusieurs paiement s'ils réactualisent la page
        // Et pour cacher les param de retour de paiement
        return $this->redirectToRoute('app_return_payment');
    }

    /**
     * @Route("/return_payment", name="app_return_payment")
     * @param Request $request
     * @return Response
     */
    public function returnPaymentAction(Request $request){
        $session = $request->getSession();

        $booking = $session->get('booking');
        $zoho = $session->get('zoho');
        $dataCodeDate = $session->get('dataCodeDate');

        $return = 'KO';
        if($session->get('stat')=='Accepted') $return = 'OK';

        $param = array();
        $param['return'] = $return;
        $param['idTransfertMerc'] = $session->get('id_paiement');
        $param['nbPax'] = $session->get('nb_adults') + $session->get('nb_children');
        $param['numdos'] = $zoho['dossier'];
        $param['numPas'] = $this->generateNumPas($booking['leaderPas']['nomPas'],$booking['leaderPas']['numPas']);
        $param['id'] = $booking['leaderPas']['emailDom'];
        $param['full_price'] = $session->get('prix_total');
        $param['advance'] = round($param['full_price'] * 0.3);
        $param['villeClient'] = $booking['leaderPas']['villeFr'];
        $param['paysClient'] = $booking['leaderPas']['codPays'];
        $param['codePostalClient'] = $booking['leaderPas']['codePostal'];
        $param['codPack'] = $dataCodeDate['tour']['code'];
        $param['paysPack'] = $dataCodeDate['tour']['destination'];
        $param['libPack'] = $dataCodeDate['tour']['name'];
        $param['prixTTC'] = $dataCodeDate['date']['price'];
        $param['dtDeb'] = $dataCodeDate['date']['date1'];
        $param['dtFin'] = $dataCodeDate['date']['date2'];
        $param['status'] = $session->get('stat');
        $param['pay_id'] = $session->get('pay_id');
        $param['ref'] = $session->get('id_paiement');
        $param['id_date_prix'] = $session->get('id_date_prix');
        $param['paye'] = $session->get('montant_paye');

        $booking = $this->formFactory->create(BookingType::class,null);
        $booking->handleRequest($request);

        return $this->render(
            'main/payment-back.twig',
            array(
                'booking' => $booking->createView(),
                'params' => $param,
                'marque' => ucfirst(strtolower($this->params->get('marque'))),
                'url_site' => $this->params->get('url_site'),
                'nom_site' => str_replace('https://','',$this->params->get('url_site')),
            )
        );
    }

    /**
     * @param $devise
     * @return string
     */
    private function getDeviseSymbole($devise){
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
                $deviseSymbole = "£";
                break;
        }
        return $deviseSymbole;
    }

    /**
     * @param $products
     * @return bool
     */
    function checkIfNewSale($products){
        $saleUpdate = 'non';
        foreach ($products as $product){
            if (!is_array($product)) continue;
            if ($product[0]['product']['Product_Code'] == 'NEW-SALE') $saleUpdate = 'oui';
        }
        if ($saleUpdate == 'oui') return true;
        else return false;
    }

    /**
     * @param $nomPas
     * @param $num
     * @return string
     */
    public function generateNumPas($nomPas, $num = 1)
    {
        $numPas = strtoupper(substr($this->cleanString($nomPas), 0, 5));
        $numPas .= date('ymd');
        $numPas .= "_";
        $numPas .= $num + 1000;
        return $numPas;
    }

    /**
     * Page de retour OGONE
     * @Route("/confirm_payment", name="app_confirm_payment")
     * @param Request $request
     * @return Response
     */
    public function confirmPaymentAction(Request $request){
        $status = $request->query->get('STATUS'); // Status du paiement (5 et 9 == Accepted / Denied / 1 == cancelled)
        $paiement = $request->query->get('orderID'); // ID Paiement Zoho
        $pay_id = $request->query->get('PAYID'); // ID paiement Ogone
        $numDos = $request->query->get('file'); // ID Dossier Zoho

        if ($status == 5 OR $status == 9) {
            $stat = 'Accepted';
        } else if ($status == 1) {
            $stat = 'Cancelled';
        } else {
            $stat = 'Denied';
        }
        if (!$pay_id OR $pay_id == '' OR $pay_id == ' ') $pay_id = $paiement;

        // Appel le webservice Zoho pour la validation du paiement en attente
        $this->zoho->validationPayment($paiement, $status, $pay_id, $stat);
        $this->zoho->updatedossier($numDos);
    }

    /**
     * @param $str
     * @param $encoding
     * @return array|string|string[]
     */
    public function cleanString($str, $encoding='utf-8')
    {
        // transformer les caractères accentués en entités HTML
        $str = htmlentities($str, ENT_NOQUOTES, $encoding);

        // remplacer les entités HTML pour avoir juste le premier caractères non accentués
        // Exemple : "&ecute;" => "e", "&Ecute;" => "E", "Ã " => "a" ...
        $str = preg_replace('#&([A-za-z])(?:acute|grave|cedil|circ|orn|ring|slash|th|tilde|uml);#', '\1', $str);

        // Remplacer les ligatures tel que : Œ, Æ ...
        // Exemple "Å“" => "oe"
        $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str);
        // Supprimer tout le reste
        $str = preg_replace('#&[^;]+;#', '', $str);
        // Supprimer les espaces
        $str = str_replace(' ', '', $str);

        return $str;
    }
}
