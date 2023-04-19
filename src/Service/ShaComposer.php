<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ShaComposer
{
    protected $params;

    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    /**
     * @param $price
     * @param $leaderpax
     * @param $param
     * @param $devise
     * @return string
     */
    public function get($price, $leaderpax, $param, $devise){
        $parameters = $this->addParameter($price, $param['paiement'], $leaderpax, $param['acceptURL'],$param['declineURL'],$param['cancelURL'], $devise, $param['complus'], $param['paramplus']);
        $shaString = $this->compose($parameters);
        $shaIn = $this->secureSha($shaString);
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
    public function addParameter($price, $orderid, $leaderpax, $acceptURL, $declineURL, $cancelURL, $devise, $complus, $paramplus){
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

    public function compose($parameters){
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
    public function secureSha($shaString){
        $shaIn = hash($this->params->get('ogone_sha'), $shaString);
        return $shaIn;
    }
}