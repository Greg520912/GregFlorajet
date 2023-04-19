<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBag;

use DateTime;

use App\Service\Curl;
use App\Service\Zoho;

class Ogone
{
    protected $zoho, $curl, $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
        $this->zoho = new Zoho($this->params);
        $this->curl = new Curl();
    }

    public function get($request, $price, $id_individu, $numDos, $marque, $id_date_prix, $devise, $quantity, $id_vente, $full_price){
        $token = $price.$id_individu.$numDos.$marque.$id_date_prix;
        $token = hash($this->params->get('ogone_sha'), $token);

        // Renvoi à la fonction pour créer et récupérer un id_paiement de zoho
        $paiement = $this->zoho->createPayment($price, $id_individu, $numDos, $token, $devise);

        // Création des URL à envoyer en tant que param
        $url = "https://$_SERVER[HTTP_HOST]$_SERVER[SCRIPT_URL]";

        $acceptURL = $url.'-back?stat=Accepted&dt='.$id_date_prix.'&file='.$numDos.'&qte='.$quantity.'&idV='.$id_vente.'&full='.$full_price.'&pr='.$price;
        $declineURL = $url.'-back?stat=Denied&dt='.$id_date_prix.'&file='.$numDos.'&qte='.$quantity.'&idV='.$id_vente.'&full='.$full_price;
        $cancelURL = $url.'-back?stat=Denied&dt='.$id_date_prix.'&file='.$numDos.'&qte='.$quantity.'&idV='.$id_vente.'&full='.$full_price;

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
}