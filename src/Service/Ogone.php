<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

use App\Service\Zoho;

class Ogone
{
    protected $zoho, $params;

    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
        $this->zoho = new Zoho($this->params);
    }

    /**
     * @param $request
     * @param $price
     * @param $id_individu
     * @param $numDos
     * @param $marque
     * @param $id_date_prix
     * @param $devise
     * @param $quantity
     * @param $id_vente
     * @param $full_price
     * @return array
     */
    public function get($request, $price, $id_individu, $numDos, $marque, $id_date_prix, $devise, $quantity, $id_vente, $full_price){
        $token = $price.$id_individu.$numDos.$marque.$id_date_prix;
        $token = hash($this->params->get('ogone_sha'), $token);

        // Renvoi à la fonction pour créer et récupérer un id_paiement de zoho
        $paiement = $this->zoho->createPayment($price, $id_individu, $numDos, $token, $devise);

        // Création des URL à envoyer en tant que param
        $url = "https://$_SERVER[HTTP_HOST]$_SERVER[SCRIPT_URL]";

        $acceptURL = $url.'_back?stat=Accepted&dt='.$id_date_prix.'&file='.$numDos.'&qte='.$quantity.'&idV='.$id_vente.'&full='.$full_price.'&pr='.$price;
        $declineURL = $url.'_back?stat=Denied&dt='.$id_date_prix.'&file='.$numDos.'&qte='.$quantity.'&idV='.$id_vente.'&full='.$full_price;
        $cancelURL = $url.'_back?stat=Denied&dt='.$id_date_prix.'&file='.$numDos.'&qte='.$quantity.'&idV='.$id_vente.'&full='.$full_price;

        $complus = 'confirm-payment?file='.$numDos;
        $paramplus = 'confirm-payment?file='.$numDos;

        // Création du tableau des param à renvoyer au controller
        $param = array (
            'paiement' => $paiement,
            'acceptURL' => $acceptURL,
            'declineURL' => $declineURL,
            'cancelURL' => $cancelURL,
            'complus' => $complus,
            'paramplus' => $paramplus
        );
        return $param;
    }

    /**
     * @param $price
     * @param $leaderpax
     * @param $param
     * @param $devise
     * @return string
     */
    public function shaGet($price, $leaderpax, $param, $devise){
        $parameters = $this->shaAddParameter($price, $param['paiement'], $leaderpax, $param['acceptURL'],$param['declineURL'],$param['cancelURL'], $devise, $param['complus'], $param['paramplus']);
        $shaString = $this->shaCompose($parameters);
        $shaIn = $this->shaSecure($shaString);
        return $shaIn;
    }

    /**
     * Crée tableau comprenant les paramètres envoyés au TPE et composant le shasign
     * @param $price
     * @param $orderid
     * @param $leaderpax
     * @param $acceptURL
     * @param $declineURL
     * @param $cancelURL
     * @param $devise
     * @param $complus
     * @param $paramplus
     * @return array
     */
    public function shaAddParameter($price, $orderid, $leaderpax, $acceptURL, $declineURL, $cancelURL, $devise, $complus, $paramplus){
        $parameters = array(
            'AMOUNT' => $price * 100,
            'CURRENCY' => $devise,
            'LANGUAGE' => 'fr_FR',
            'ORDERID' => $orderid,
            'PSPID' => $this->params->get('ogone_pspid'),
            'ACCEPTURL' => $acceptURL,
            'DECLINEURL' => $declineURL,
            'CANCELURL' => $cancelURL,
            'COMPLUS' => $complus,
            'PARAMPLUS' => $paramplus,
            'ECOM_BILLTO_POSTAL_NAME_FIRST' => $leaderpax->prenomPas,
            'ECOM_BILLTO_POSTAL_NAME_LAST' => $leaderpax->nomPas,
            'EMAIL' => $leaderpax->username,
            'TP' =>  $this->params->get('ogone_template'),
        );
        return $parameters;
    }

    /**
     * @param $parameters
     * @return string
     */
    public function shaCompose($parameters){
        // Passphrase récupérée dans les informations techniques du site de configuration du TPE
        $passphrase = $this->params->get('ogone_sha_in');

        // Range par ordre alphabétique les paramètres envoyé au sha
        ksort($parameters);
        // compose SHA string
        // 1: nom du paramètre en majuscule ; 2: valeur du paramètre ; 3 : passphrase
        $shaString = '';
        foreach ($parameters as $key => $value) {
            $shaString .= $key . '=' . $value . $passphrase;
        }

        return $shaString;
    }

    /**
     * Fonction qui hash le string du sha composé plus haut dans la fonction compose(), pour qu'il corresponde au sha construit par le TPE
     * @param $shaString
     * @return string
     */
    public function shaSecure($shaString){
        $shaIn = hash($this->params->get('ogone_sha'), $shaString);
        return $shaIn;
    }
}