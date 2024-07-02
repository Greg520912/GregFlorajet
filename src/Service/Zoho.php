<?php

namespace App\Service;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use DateTime;

use App\Service\Curl;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBag;

/**
 * @ParameterBag("%parameters%")
 */
class Zoho
{

    protected $curl, $params;

    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->curl = new Curl();
        $this->params = $params;
    }

    /**
     * @param $formData
     * @return mixed
     */
    public function getOrCreateIndividu($formData)
    {
        $qualite = urlencode($formData['leaderPas']['qualite']);
        $nom = urlencode($formData['leaderPas']['nomPas']);
        $prenom = urlencode($formData['leaderPas']['prenomPas']);
        $adresse1 = urlencode($formData['leaderPas']['adresse1']);
        $adresse2 = urlencode($formData['leaderPas']['adresse2']);
        $codePostal = urlencode($formData['leaderPas']['codePostal']);
        $ville = urlencode($formData['leaderPas']['villeFr']);
        $code_postal = urlencode($formData['leaderPas']['codePostal']);
        $county = urlencode($formData['leaderPas']['county']);
        $email = $formData['leaderPas']['emailDom'];
        $tel = urlEncode($formData['leaderPas']['telMobile']);
        $date_naissance = $this->dateSqlVersZoho($formData['leaderPas']['dtNaissPas']);
        $pays = $this->code_to_country($formData['leaderPas']['codPays']);
        $pays = urlEncode($pays);

        // Modif date de naissance pour la mettre au format américain demandé par zoho
        $date_naissance = explode('/', $date_naissance);
        $date_naissance = $date_naissance[1] .'/'. $date_naissance[0] .'/'. $date_naissance[2];

        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/GetClientByNameFirstNameEmail/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&Nom=".$nom."&Prenom=".$prenom."&email=".$email;
        $url .= "&street=".$adresse1."&street2=".$adresse2."&city=".$ville."&postal_code=".$code_postal."&phone=".$tel;
        $url .= "&title=".$qualite."&date_of_birth=".$date_naissance."&country=".$pays."&state=".$county."&lead_source=BI";
        $url .= '&version=v2&brand_trigram=ATA';
        
        $reponse = $this->curl->get($url);
        $tableau = json_decode($reponse, true);
        $individu = json_decode($tableau['details']['output'], true);

        return $individu;
    }

    /**
     * @param $individu
     * @param $formData
     * @param $dataCodeDate
     * @param $request
     * @return mixed
     * @throws \Exception
     */
    public function createDossier($individu, $formData,$dataCodeDate,$request)
    {
        $session = $request->getSession();

        // $optionTransport = $session->get('transport')?:'';

        if(isset($formData['transport'])) $optionTransport = $formData['transport'];
        else $formData['transport'] ='';

        if(!isset($optionTransport))$optionTransport='';

        $choixTransport = strtolower($session->get('choixTransport'))?:"";

        if($choixTransport == "option"){
            if($optionTransport == "none" || $optionTransport == "None" ||$optionTransport == "non"|| $optionTransport == "no") $optionTransport ='';
            if($optionTransport == "") $optionTransport = "Sans transport";
        }
        $totalAssurance = $session->get('total_assurance')?:0;
        if(floatval($totalAssurance)>0) $optionAssurance = "Oui";
        else $optionAssurance = "Non";

        $date = new DateTime($dataCodeDate["date"]["date1"]);
        $dateDepart = $date->format('d/m/Y');
        $date2 = new Datetime($dataCodeDate["date"]["date2"]);
        $dateArrivee = $date2->format('d/m/Y');

        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/createnewdossier/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&NumLeadPax=". $individu;
        $url .= "&CanalDeResa=E_resa";
        $url .= "&PaysDestination=".urlencode($dataCodeDate["tour"]["destination"]);
        $url .= "&Nbre_Pax_Devis=".($formData["nbAdults"] + $formData["nbChildren"]);
        $url .= "&Etat=";
        $url .= "&NameDoss=";
        $url .= "&TypeVoyage=";

        $url .= "&optionTransport=". urlencode(ucfirst($optionTransport));
        $url .= "&optionAssurance=". urlencode($optionAssurance);

        $url .= "&CodePack=".$dataCodeDate["tour"]["code"];
        $url .= "&NumDevis=&Langue=FR";
        $url .= "&Marque=".strtoupper($formData['marque']);
        $url .= "&Partenaire=&Type_Devis=";
        $url .= "&NombrePax=".($formData["nbAdults"] + $formData["nbChildren"]);
        $url .= "&DateDepart=".$dateDepart."&DateRetour=".$dateArrivee;
        //$url .= "&BookingAmount=".$formData['prix_total'];
        $url .= "&BookingAmount=".$session->get('prix_total');
        $url .= "&Monnaie=".$dataCodeDate["tour"]["devise"];
        $url .= "&PrefixMARQUE=".strtoupper(substr($formData['marque'],0,3));
        $url .= "&idDatePrix=".$dataCodeDate['tour']['idDatePrix'];
        $url .= "&telMobile=".urlencode($formData['leaderPas']['telMobile']);
        $url .= "&Titreduvoyage=".urlencode($dataCodeDate["tour"]["name"]);
        $response = $this->curl->get($url);
        $tableau = json_decode($response, true);
        if(!empty($tableau['details']['output'])) $id_dossier = json_decode($tableau['details']['output'], true);

//        echo "<pre>";
//        var_dump($url);
//        var_dump($tableau);
//        var_dump($id_dossier);

        return $id_dossier?:'';
    }

    /**
     * @param $id_dossier
     * @return mixed
     */
    public function getIdVenteByIdDossier($id_dossier){
        // Requete Curl ID vente
        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/getidventebyiddossier/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&idDossier=". $id_dossier;
        $response = $this->curl->get($url);
        $tableau = json_decode($response, true);
        $id_vente = json_decode($tableau['details']['output'], true);
        return $id_vente;
    }

    /**
     * @param $dossier
     * @param $formData
     * @param $dataCodeDate
     * @param $request
     * @return mixed
     */
    public function addNote_async($dossier, $formData, $dataCodeDate,$request){
        $session = $request->getSession();
        $coef_acompte = $this->params->get('coef_acompte');

        // Recup les info du voyage et passagers pour les affichers dans la note
        $nbpassagers = ($formData["nbAdults"] + $formData["nbChildren"]);
        $passagers = $formData['passengers'];

        if(!isset($formData["transportCommentaire"])) $formData["transportCommentaire"] ='ND';

        //$acompte = $formData["advance"];
        //$prix_total = $formData["prix_total"];

        $prix_total = $session->get('prix_total');
        $acompte = round($prix_total * $coef_acompte,2);

        $nom = $formData["leaderPas"]["nomPas"];
        $prenom = $formData["leaderPas"]["prenomPas"];
        $mail = $formData["leaderPas"]["emailDom"];
        $tel = $formData["leaderPas"]["telMobile"];

        //$remarques = $formData["remarques"];
        $code_voyage = $dataCodeDate["tour"]["code"];
        $nom_voyage = $dataCodeDate["tour"]["name"];

        $debut = $this->dateSqlVersZoho($dataCodeDate["date"]["date1"]);
        $fin = $this->dateSqlVersZoho($dataCodeDate["date"]["date2"]);
        // Sépare les info en bloc, encode pour enlever les espaces dans l'envoie CURL, puis ajoute urlencodage pour saut à la ligne afin de rendre lisible la note dans zoho
        $n = '%0A';
        $note1 = 'Customer : '.$nom . ' ' . $prenom ;
        $note1 = urlEncode($note1).$n;
        $note2 = 'Email adress : ' . $mail;
        $note2 = urlEncode($note2).$n;
        $note2b = 'Tel : ' . $tel;
        $note2b = urlEncode($note2b).$n;
        $note3 = 'No. of pax : ' . $nbpassagers ;
        $note3 = urlEncode($note3).$n;
        // $note4 = 'Remarque du client : ' . $remarques;
        // $note4 = urlEncode($note4).$n;
        $note5 = 'Deposit : ' . $acompte . ', '  ;
        $note5 = urlEncode($note5).$n;
        $note6 = 'Amount : ' . $prix_total ;
        $note6 = urlEncode($note6).$n;
        $note7 = 'Trip code : ' . $code_voyage . ', ' ;
        $note7 = urlEncode($note7).$n;
        $note8 = 'Trip name : ' . $nom_voyage;
        $note8 = urlEncode($note8).$n;
        $note9 = 'Departure date : ' . $debut . ', ';
        $note9 = urlEncode($note9).$n;
        $note10 = 'Return date : ' . $fin ;
        $note10 = urlEncode($note10).$n;

        // Ajout Daniel
        $note11 = 'villeDepart : ' . $formData["villeDepart"] ;
        $note11 = urlEncode($note11).$n;
        $note12 = 'Commentaire : ' . $formData["commentaire"] ;
        $note12 = urlEncode($note12).$n;

        $note12b = 'transportCommentaire : ' . $formData["transportCommentaire"] ;
        $note12b = urlEncode($note12b).$n;

        $note13 = 'Passengers : ';
        $note13 = urlencode($note13).$n;
        $note = $note1 . $note2 . $note2b .$note3 . $note5 . $note6 . $note7 . $note8 . $note9 . $note10 . $note11 . $note12 . $note12b .$note13;
        if(is_array($passagers)){
            foreach ($passagers as $k => $r){
                if(empty($r['emailDom'])) $r['emailDom'] = '';
                if(empty($r['telMobile'])) $r['telMobile'] = '';
                $ligne = $k.' '.$r['nomPas'].' '.$r['prenomPas'].' '.$r['dtNaissPas'].' '.$r['emailDom'].' '.$r['telMobile'].' '.$r['assurance'];
                $note .= urlencode($ligne).$n;
            }
        }else{ $note .= 'Empty';}
        // Fin

        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/addnote/actions/execute?";
        $url .= "note=".$note;
        $url .= "&auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&title_note=Recap_voyage&module=Deals";
        $url .= "&id=".$dossier;

//        $response = $this->curl->asyncGet($url);
        $response = $this->curl->get($url);
//        echo"<pre>";
//        var_dump($url,$note,$response);
//        die;

        return $response;
    }

    /**
     * @param $dossier
     * @param $request
     * @return mixed
     */
    public function addNote_transport_async($dossier, $request){
        $session = $request->getSession();
        $transport = $session->get('transport')?:'';
        if(!empty($transport) && $transport == "demande"){
            $transportCommentaire = $session->get('transportCommentaire')?:'ND';
            $url = $this->params->get('url_zoho');
            $url .= "/crm/v2/functions/addnote/actions/execute?";
            $url .= "note=Commentaire transport : ".urlEncode($transportCommentaire)."%0A";
            $url .= "&auth_type=apikey";
            $url .= "&zapikey=".$this->params->get('zoho_zapikey');
            $url .= "&title_note=Transport_voyage&module=Deals";
            $url .= "&id=".$dossier;
            $response = $this->curl->get($url);
            return $response;
        }
        return false;
    }

    /**
     * @param $dossier
     * @param $individu
     * @param $formData
     * @param $vente
     * @return array
     */
    public function createOthersSuiviDossier($dossier, $individu, $formData, $vente)
    {
        return array('dossier' => $dossier, 'individu' => $individu, 'booking' => $formData, 'id_vente' => $vente);
    }

    /**
     * @param $individu
     * @param $vente
     * @return mixed
     */
    public function leadPassengerSaleLink_async($individu, $vente){
        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/addpassangersale/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&idSale=". $vente ."&idContact=". $individu;
        $response = $this->curl->asyncGet($url);
        //$tableau_id_vente_pax = json_decode($response, true);
        //$id_vente_pax = json_decode($tableau_id_vente_pax['details']['output'], true);
        return $response;
    }

    /**
     * @param $dossier
     * @param $individu
     * @param $formData
     * @param $vente
     * @return array|void
     */
    public function createPassengersDossier_parallel($dossier, $individu, $formData, $vente)
    {
        if (isset($formData["passengers"])){
            $passengers = $formData["passengers"];
            $pax_id_tab = [];
            $urls = [];
            foreach ($passengers as $type => $pass) {
                if($type > 1){
                    $lastname = urlEncode($pass['nomPas']);
                    $firstname = urlEncode($pass['prenomPas']);
                    $title = $pass['qualite'];
                    $title = urlencode($title);
                    $pays = 'FR';
                    $birthday = $pass['dtNaissPas'];

                    // Modif date de naissance pour la mettre au format américain demandé par zoho
                    $birthday = explode('/', $birthday);
                    $birthday = $birthday[1] .'/'. $birthday[0] .'/'. $birthday[2];

                    // curl request create passagers
                    $url = $this->params->get('url_zoho');
                    $url .= "/crm/v2/functions/GetClientByNameFirstName/actions/execute?auth_type=apikey";
                    $url .= "&zapikey=".$this->params->get('zoho_zapikey');
                    $url .= "&Nom=".$lastname."&Prenom=".$firstname;
                    $url .= "&email=&street=&city=&postal_code=&phone=&title=".$title."&date_of_birth=".$birthday."&country=".$pays."&state=&lead_source=BI";
                    array_push($urls, $url);
                }
            }
            $result = $this->curl->parallelGet($urls);
            $urls=[];
            if(is_array($result)){
                foreach ($result as $k => $r){
                    $temp = json_decode($r,true);
                    $id_pax = json_decode($temp['details']['output'],true);
                    array_push($pax_id_tab, $id_pax);
                    $url = $this->params->get('url_zoho');
                    $url .= "/crm/v2/functions/addpassangersale/actions/execute?auth_type=apikey";
                    $url .= "&zapikey=".$this->params->get('zoho_zapikey');
                    $url .= "&idSale=". $vente ."&idContact=". $id_pax;
                    array_push($urls, $url);
                }
                $result = $this->curl->parallelGet($urls);
            }
            return $pax_id_tab;
        }
    }

    /**
     * @param $id_sale
     * @return mixed
     */
    public function getproductsbyidsale($id_sale){
        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/getproductsbyidsale/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&idSale=".$id_sale;
        $response = $this->curl->get($url);
        $tableau = json_decode($response, true);
        $payments = json_decode($tableau['details']['output'], true);
        return $payments;
    }

    /**
     * @param $id_date_prix
     * @param $devise
     * @param $id_dossier
     * @param $quantite
     * @return bool|string|null
     */
    public function addlignevente($id_date_prix, $devise, $id_dossier, $quantite){
        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/addligneventebyiddossierbyiddateprix/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&Iddateprix=". $id_date_prix ."&Devise=". $devise ."&Iddossier=". $id_dossier ."&quantite=". $quantite;
        $response = $this->curl->get($url);
        return $response;
    }

    /**
     * @param $price
     * @param $id_individu
     * @param $numDos
     * @param $token
     * @param $devise
     * @return mixed
     */
    public function createPayment($price, $id_individu, $numDos, $token, $devise)
    {
        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/createPayment/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&idPax=".$id_individu."&idDossier=".$numDos."&montant=".$price;
        $url .="&cleLink=".$token ."&currency=".$devise."&provenance=BI";
        $url .= "&Brand=".$this->params->get('marque');
        $response = $this->curl->get($url);
        $tableau = json_decode($response, true);
        $id_paiement = json_decode($tableau['details']['output'], true);
        return $id_paiement;
    }

    /**
     * @param $paiement
     * @param $status
     * @param $pay_id
     * @param $stat
     * @return mixed
     */
    public function validationPayment($paiement, $status, $pay_id, $stat,$error=null){
        $stat = urlencode($stat);
        $retour = 'OK';
        if ($stat != 'Accepted') $retour = 'KO';
        $url = $this->params->get('url_zoho');
        $url .= "/crm/v2/functions/UpdatePayment/actions/execute?auth_type=apikey";
        $url .= "&zapikey=".$this->params->get('zoho_zapikey');
        $url .= "&idPayment=". $paiement ."&status=". $stat ."&idTrans=". $pay_id ."&retour=".$retour."&NCERROR=".$error;
        $response = $this->curl->get($url);
        return $response;
    }

    /**
     * @param $idFile
     * @return bool|string|null
     */
    function updatedossier($idFile){
        $url = $this->params->get('url_zoho');
        $url .= '/crm/v2/functions/updatedossier/actions/execute?auth_type=apikey&zapikey=';
        $url .= $this->params->get('zoho_zapikey');
        $url .= '&idDossier='.$idFile;
        $reponse = $this->curl->get($url);
        return $reponse;
    }

    /**
     * @param $date
     * @return mixed|string
     */
    public function dateSqlVersZoho($date){
        $d = explode('-', $date);
        if(isset($d[1])) $date = $d[2] .'/'. $d[1] .'/'. $d[0];
        return $date;
    }

    /**
     * @param $code
     * @return string
     */
    function code_to_country( $code ){
        $code = strtoupper($code);
        $countryList = array(
            'AF' => 'Afghanistan',
            'AX' => 'Aland Islands',
            'AL' => 'Albania',
            'DZ' => 'Algeria',
            'AS' => 'American Samoa',
            'AD' => 'Andorra',
            'AO' => 'Angola',
            'AI' => 'Anguilla',
            'AQ' => 'Antarctica',
            'AG' => 'Antigua and Barbuda',
            'AR' => 'Argentina',
            'AM' => 'Armenia',
            'AW' => 'Aruba',
            'AU' => 'Australia',
            'AT' => 'Austria',
            'AZ' => 'Azerbaijan',
            'BS' => 'Bahamas the',
            'BH' => 'Bahrain',
            'BD' => 'Bangladesh',
            'BB' => 'Barbados',
            'BY' => 'Belarus',
            'BE' => 'Belgium',
            'BZ' => 'Belize',
            'BJ' => 'Benin',
            'BM' => 'Bermuda',
            'BT' => 'Bhutan',
            'BO' => 'Bolivia',
            'BA' => 'Bosnia and Herzegovina',
            'BW' => 'Botswana',
            'BV' => 'Bouvet Island (Bouvetoya)',
            'BR' => 'Brazil',
            'IO' => 'British Indian Ocean Territory (Chagos Archipelago)',
            'VG' => 'British Virgin Islands',
            'BN' => 'Brunei Darussalam',
            'BG' => 'Bulgaria',
            'BF' => 'Burkina Faso',
            'BI' => 'Burundi',
            'KH' => 'Cambodia',
            'CM' => 'Cameroon',
            'CA' => 'Canada',
            'CV' => 'Cape Verde',
            'KY' => 'Cayman Islands',
            'CF' => 'Central African Republic',
            'TD' => 'Chad',
            'CL' => 'Chile',
            'CN' => 'China',
            'CX' => 'Christmas Island',
            'CC' => 'Cocos (Keeling) Islands',
            'CO' => 'Colombia',
            'KM' => 'Comoros the',
            'CD' => 'Congo',
            'CG' => 'Congo the',
            'CK' => 'Cook Islands',
            'CR' => 'Costa Rica',
            'CI' => 'Cote d\'Ivoire',
            'HR' => 'Croatia',
            'CU' => 'Cuba',
            'CY' => 'Cyprus',
            'CZ' => 'Czech Republic',
            'DK' => 'Denmark',
            'DJ' => 'Djibouti',
            'DM' => 'Dominica',
            'DO' => 'Dominican Republic',
            'EC' => 'Ecuador',
            'EG' => 'Egypt',
            'SV' => 'El Salvador',
            'GQ' => 'Equatorial Guinea',
            'ER' => 'Eritrea',
            'EE' => 'Estonia',
            'ET' => 'Ethiopia',
            'FO' => 'Faroe Islands',
            'FK' => 'Falkland Islands (Malvinas)',
            'FJ' => 'Fiji the Fiji Islands',
            'FI' => 'Finland',
            'FR' => 'France',
            'GF' => 'French Guiana',
            'PF' => 'French Polynesia',
            'TF' => 'French Southern Territories',
            'GA' => 'Gabon',
            'GM' => 'Gambia the',
            'GE' => 'Georgia',
            'DE' => 'Germany',
            'GH' => 'Ghana',
            'GI' => 'Gibraltar',
            'GR' => 'Greece',
            'GL' => 'Greenland',
            'GD' => 'Grenada',
            'GP' => 'Guadeloupe',
            'GU' => 'Guam',
            'GT' => 'Guatemala',
            'GG' => 'Guernsey',
            'GN' => 'Guinea',
            'GW' => 'Guinea-Bissau',
            'GY' => 'Guyana',
            'HT' => 'Haiti',
            'HM' => 'Heard Island and McDonald Islands',
            'VA' => 'Holy See (Vatican City State)',
            'HN' => 'Honduras',
            'HK' => 'Hong Kong',
            'HU' => 'Hungary',
            'IS' => 'Iceland',
            'IN' => 'India',
            'ID' => 'Indonesia',
            'IR' => 'Iran',
            'IQ' => 'Iraq',
            'IE' => 'Ireland',
            'IM' => 'Isle of Man',
            'IL' => 'Israel',
            'IT' => 'Italy',
            'JM' => 'Jamaica',
            'JP' => 'Japan',
            'JE' => 'Jersey',
            'JO' => 'Jordan',
            'KZ' => 'Kazakhstan',
            'KE' => 'Kenya',
            'KI' => 'Kiribati',
            'KP' => 'Korea',
            'KR' => 'Korea',
            'KW' => 'Kuwait',
            'KG' => 'Kyrgyz Republic',
            'LA' => 'Lao',
            'LV' => 'Latvia',
            'LB' => 'Lebanon',
            'LS' => 'Lesotho',
            'LR' => 'Liberia',
            'LY' => 'Libyan Arab Jamahiriya',
            'LI' => 'Liechtenstein',
            'LT' => 'Lithuania',
            'LU' => 'Luxembourg',
            'MO' => 'Macao',
            'MK' => 'Macedonia',
            'MG' => 'Madagascar',
            'MW' => 'Malawi',
            'MY' => 'Malaysia',
            'MV' => 'Maldives',
            'ML' => 'Mali',
            'MT' => 'Malta',
            'MH' => 'Marshall Islands',
            'MQ' => 'Martinique',
            'MR' => 'Mauritania',
            'MU' => 'Mauritius',
            'YT' => 'Mayotte',
            'MX' => 'Mexico',
            'FM' => 'Micronesia',
            'MD' => 'Moldova',
            'MC' => 'Monaco',
            'MN' => 'Mongolia',
            'ME' => 'Montenegro',
            'MS' => 'Montserrat',
            'MA' => 'Morocco',
            'MZ' => 'Mozambique',
            'MM' => 'Myanmar',
            'NA' => 'Namibia',
            'NR' => 'Nauru',
            'NP' => 'Nepal',
            'AN' => 'Netherlands Antilles',
            'NL' => 'Netherlands the',
            'NC' => 'New Caledonia',
            'NZ' => 'New Zealand',
            'NI' => 'Nicaragua',
            'NE' => 'Niger',
            'NG' => 'Nigeria',
            'NU' => 'Niue',
            'NF' => 'Norfolk Island',
            'MP' => 'Northern Mariana Islands',
            'NO' => 'Norway',
            'OM' => 'Oman',
            'PK' => 'Pakistan',
            'PW' => 'Palau',
            'PS' => 'Palestinian Territory',
            'PA' => 'Panama',
            'PG' => 'Papua New Guinea',
            'PY' => 'Paraguay',
            'PE' => 'Peru',
            'PH' => 'Philippines',
            'PN' => 'Pitcairn Islands',
            'PL' => 'Poland',
            'PT' => 'Portugal, Portuguese Republic',
            'PR' => 'Puerto Rico',
            'QA' => 'Qatar',
            'RE' => 'Reunion',
            'RO' => 'Romania',
            'RU' => 'Russian Federation',
            'RW' => 'Rwanda',
            'BL' => 'Saint Barthelemy',
            'SH' => 'Saint Helena',
            'KN' => 'Saint Kitts and Nevis',
            'LC' => 'Saint Lucia',
            'MF' => 'Saint Martin',
            'PM' => 'Saint Pierre and Miquelon',
            'VC' => 'Saint Vincent and the Grenadines',
            'WS' => 'Samoa',
            'SM' => 'San Marino',
            'ST' => 'Sao Tome and Principe',
            'SA' => 'Saudi Arabia',
            'SN' => 'Senegal',
            'RS' => 'Serbia',
            'SC' => 'Seychelles',
            'SL' => 'Sierra Leone',
            'SG' => 'Singapore',
            'SK' => 'Slovakia (Slovak Republic)',
            'SI' => 'Slovenia',
            'SB' => 'Solomon Islands',
            'SO' => 'Somalia, Somali Republic',
            'ZA' => 'South Africa',
            'GS' => 'South Georgia and the South Sandwich Islands',
            'ES' => 'Spain',
            'LK' => 'Sri Lanka',
            'SD' => 'Sudan',
            'SR' => 'Suriname',
            'SJ' => 'Svalbard & Jan Mayen Islands',
            'SZ' => 'Swaziland',
            'SE' => 'Sweden',
            'CH' => 'Switzerland, Swiss Confederation',
            'SY' => 'Syrian Arab Republic',
            'TW' => 'Taiwan',
            'TJ' => 'Tajikistan',
            'TZ' => 'Tanzania',
            'TH' => 'Thailand',
            'TL' => 'Timor-Leste',
            'TG' => 'Togo',
            'TK' => 'Tokelau',
            'TO' => 'Tonga',
            'TT' => 'Trinidad and Tobago',
            'TN' => 'Tunisia',
            'TR' => 'Turkey',
            'TM' => 'Turkmenistan',
            'TC' => 'Turks and Caicos Islands',
            'TV' => 'Tuvalu',
            'UG' => 'Uganda',
            'UA' => 'Ukraine',
            'AE' => 'United Arab Emirates',
            'GB' => 'United Kingdom',
            'US' => 'United States of America',
            'UM' => 'United States Minor Outlying Islands',
            'VI' => 'United States Virgin Islands',
            'UY' => 'Uruguay, Eastern Republic of',
            'UZ' => 'Uzbekistan',
            'VU' => 'Vanuatu',
            'VE' => 'Venezuela',
            'VN' => 'Vietnam',
            'WF' => 'Wallis and Futuna',
            'EH' => 'Western Sahara',
            'YE' => 'Yemen',
            'ZM' => 'Zambia',
            'ZW' => 'Zimbabwe'
        );

        if( !$countryList[$code] ) return $code;
        else return $countryList[$code];
    }
}