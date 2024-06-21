<?php

namespace App\Service;

use DateTime;

use OnlinePayments\Sdk\Domain\Customer;
use OnlinePayments\Sdk\Domain\PersonalInformation;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use App\Service\Zoho;


use OnlinePayments\Sdk\DefaultConnection;
use OnlinePayments\Sdk\CommunicatorConfiguration;
use OnlinePayments\Sdk\Communicator;
use OnlinePayments\Sdk\Client;
use OnlinePayments\Sdk\ProxyConfiguration;

use OnlinePayments\Sdk\Domain\CreateHostedCheckoutRequest;
use OnlinePayments\Sdk\Domain\Order;
use OnlinePayments\Sdk\Domain\AmountOfMoney;

use OnlinePayments\Sdk\Domain\HostedCheckoutSpecificInput;

use Exception;
use OnlinePayments\Sdk\ApiException;
use OnlinePayments\Sdk\ClientTestCase;
use OnlinePayments\Sdk\Domain\Address;
use OnlinePayments\Sdk\Domain\PersonalName;
use OnlinePayments\Sdk\Domain\CreateHostedCheckoutResponse;
use OnlinePayments\Sdk\Domain\GetHostedCheckoutResponse;
use OnlinePayments\Sdk\Domain\PaymentProductFilter;
use OnlinePayments\Sdk\Domain\PaymentProductFiltersHostedCheckout;

use OnlinePayments\Sdk\Domain\PageCustomization;

class OgoneApi
{
    protected $zoho, $params;

    const
        ogone_base_url          = 'https://payment.',
        ogone_url               = 'https://payment.preprod.direct.worldline-solutions.com',
        ogone_pspid             = 'Altai1',
        ogone_psw               = 'daniel.rouaix@tourism-it.comA1234',
        ogone_cle_api           = '06292F79CE45489154C0',
        ogone_cle_api_secrete   = '7DCB25D9FA9AE2001ED902D842C3C71D6B7DB01DA0EDE64102E02DFCB1D4CCB6BF6B62E67FDBCA077A43EF8B2ED3A9675557AB5CED003E889F32CAF6A2933496',
        ogone_webhooks          = 'A9C444FF3405566FE2E2',
        ogone_webhooks_secret   = '388E1073903270B5516F58FA6E3E2FF4DD183BCBCF8285C69D96F980F24A56FE2CB34E5A0B7B7BDBF98D0BEFFAA58BE10E38FFA6BA6A45025A981A20A4D44F23',
        ogone_sha_in            = '5768cab7-930e-4903-8c90-d3c35359d002',
        ogone_sha_out           = 'daniel.rouaix@tourism-it.comA1234',
        ogone_sha               = 'sha256',
        ogone_template          = 'https://logos.tourism-it.com/media/ogone/atalante/2023/modele.html';


    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
        $this->zoho = new Zoho($this->params);
    }


    public function initialise($request, $token){
        $connection = new DefaultConnection();
        $merchantId = self::ogone_pspid;
        $apiKey = self::ogone_cle_api;
        $apiSecret = self::ogone_cle_api_secrete;
        $apiEndpoint = self::ogone_url;
        $integrator = self::ogone_pspid;

        $proxyConfiguration = null;
        $communicatorConfiguration = new CommunicatorConfiguration(
            $apiKey,
            $apiSecret,
            $apiEndpoint,
            'OnlinePayments'
        );
        $communicator = new Communicator($connection, $communicatorConfiguration);
        $client = new Client($communicator);
        $merchantClient = $client->merchant($merchantId);

        $hostedCheckoutClient = $merchantClient->hostedCheckout();
        $createHostedCheckoutRequest = new CreateHostedCheckoutRequest();
        $order = new Order();

        $amountOfMoney = new AmountOfMoney();
        $amountOfMoney->setCurrencyCode("EUR");
        $amountOfMoney->setAmount($token->price * 100);

        $customer = new Customer();
        // $customer->setMerchantCustomerId($token->id_individu);
        $customer->setMerchantCustomerId($merchantId);


        $billingAddress = new Address();
        $billingAddress->setCountryCode("FR");

        $customer->setBillingAddress($billingAddress);

        $personalInformation = new PersonalInformation();

        $personalName = new PersonalName();
        $personalName->setFirstName($token->leaderpax->prenomPas);
        $personalName->setSurname($token->leaderpax->nomPas);
        $personalName->setTitle($token->leaderpax->qualite);

        $personalInformation->setName($personalName);
        $personalInformation->setGender($token->leaderpax->qualite);

        $date = (new DateTime)::createFromFormat('d/m/Y', $token->leaderpax->dtNaissPas);
        if($date != false) $personalInformation->setDateOfBirth($date->format('Ymd'));

        $customer->setPersonalInformation($personalInformation);
        $order->setCustomer($customer);

        $order->setAmountOfMoney($amountOfMoney);

        $createHostedCheckoutRequest->setOrder($order);

        $pageCustomization = new PageCustomization();
        $pageCustomization->setTemplate(self::ogone_template);
        $createHostedCheckoutRequest->setPageCustomization($pageCustomization);

        $hostedCheckoutSpecificInput = new HostedCheckoutSpecificInput();
        $hostedCheckoutSpecificInput->setLocale("fr_FR");
        $hostedCheckoutSpecificInput->setVariant("100");

        $hostedCheckoutSpecificInput->setPaymentProductFilters(new PaymentProductFiltersHostedCheckout());
        $hostedCheckoutSpecificInput->getPaymentProductFilters()->setExclude(new PaymentProductFilter());
        $hostedCheckoutSpecificInput->getPaymentProductFilters()->getExclude()->setProducts(array(120));

        $hostedCheckoutSpecificInput->setReturnUrl('https://dev.iterphp74.tourism-it.com/daniel/');

//        $hostedCheckoutSpecificInput->setCancelUrl('');
//        $hostedCheckoutSpecificInput->setDeclineUrl('');
//        $hostedCheckoutSpecificInput->setDeniedUrl('');

        $createHostedCheckoutRequest->setHostedCheckoutSpecificInput($hostedCheckoutSpecificInput);
        $createHostedCheckoutResponse = $client->merchant($merchantId)->hostedCheckout()->createHostedCheckout($createHostedCheckoutRequest);

        $RETURNMAC = $createHostedCheckoutResponse->getReturnMAC();
        $hostedCheckoutId = $createHostedCheckoutResponse->getHostedCheckoutId();
        $partialRedirectURL = $createHostedCheckoutResponse->getPartialRedirectURL();

        //$url_ogone = self::ogone_base_url . $partialRedirectURL;

        $redirectUrl = $createHostedCheckoutResponse->getRedirectURL();
        $url_ogone = $redirectUrl;

        $retour = [
            'hostedCheckoutId' => $hostedCheckoutId,
            'RETURNMAC' => $RETURNMAC,
            'url_ogone' => $url_ogone
        ];

//        echo "<pre>";
//        var_dump($url_ogone);
//        die;

        return $retour;
    }


    public function getParams($request, $retourApi, $token){
        $tok = $token->price.$token->id_individu.$token->numDos.$token->marque.$token->id_date_prix;
        $tok = hash(self::ogone_sha, $tok);

        // Renvoi à la fonction pour créer et récupérer un id_paiement de zoho
        $paiement = $this->zoho->createPayment($token->price, $token->id_individu, $token->numDos, $tok, $token->devise);

        // Création des URL à envoyer en tant que param
        $url = "https://$_SERVER[HTTP_HOST]$_SERVER[SCRIPT_URL]";

        $acceptURL = $url.'_back?stat=Accepted&dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price.'&pr='.$token->price.'&hostedCheckoutId='.$retourApi['hostedCheckoutId'].'&RETURNMAC='.$retourApi['RETURNMAC'];
        $declineURL = $url.'_back?stat=Denied&dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price.'&hostedCheckoutId='.$retourApi['hostedCheckoutId'].'&RETURNMAC='.$retourApi['RETURNMAC'];
        $cancelURL = $url.'_back?stat=Denied&dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price.'&hostedCheckoutId='.$retourApi['hostedCheckoutId'].'&RETURNMAC='.$retourApi['RETURNMAC'];

        $complus = 'confirm-payment?file='.$token->numDos;
        $paramplus = 'confirm-payment?file='.$token->numDos;

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
    public function shaGet($token, $param){
        $parameters = $this->shaAddParameter($token->price, $param['paiement'], $token->leaderpax, $param['acceptURL'],$param['declineURL'],$param['cancelURL'], $token->devise, $param['complus'], $param['paramplus']);
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
            'PSPID' => self::ogone_pspid,
            'ACCEPTURL' => $acceptURL,
            'DECLINEURL' => $declineURL,
            'CANCELURL' => $cancelURL,
            'COMPLUS' => $complus,
            'PARAMPLUS' => $paramplus,
            'ECOM_BILLTO_POSTAL_NAME_FIRST' => $leaderpax->prenomPas,
            'ECOM_BILLTO_POSTAL_NAME_LAST' => $leaderpax->nomPas,
            'EMAIL' => $leaderpax->username,
            'TP' =>  self::ogone_template,
        );
        return $parameters;
    }

    /**
     * @param $parameters
     * @return string
     */
    public function shaCompose($parameters){
        // Passphrase récupérée dans les informations techniques du site de configuration du TPE
        $passphrase = self::ogone_sha_in;

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
        $shaIn = hash(self::ogone_sha, $shaString);
        return $shaIn;
    }
}