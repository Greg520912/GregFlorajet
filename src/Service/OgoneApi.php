<?php

namespace App\Service;

use DateTime;

use OnlinePayments\Sdk\Domain\Customer;
use OnlinePayments\Sdk\Domain\PaymentStatusOutput;
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
use OnlinePayments\Sdk\Domain\PaymentDetailsResponse;
use OnlinePayments\Sdk\Domain\PaymentOutput;
use OnlinePayments\Sdk\Domain\CreatePaymentResponse;
use OnlinePayments\Sdk\Domain\CreatedPaymentOutput;

use OnlinePayments\Sdk\Domain\PageCustomization;
use OnlinePayments\Sdk\Domain\ContactDetails;
use Symfony\Component\HttpFoundation\Request;

class OgoneApi
{
    protected $zoho, $params;

    const
        ogone_base_url          = 'https://payment.',
        ogone_url               = 'https://payment.preprod.direct.worldline-solutions.com',
        ogone_pspid             = 'Altai1',
        ogone_psw               = 'daniel.rouaix@tourism-it.comA1234',
        ogone_cle_api           = '39833AAD7716EBF4F19E',
        ogone_cle_api_secrete   = '4BFEC8F17495E346B4558654EE499B738AE9DD3B84C426B69C755E21804E6A83FEBC399AB38CC2334681BC6D61827CCC8C2CA25F12873F709FA62CB97570EB81',
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


    public function initialise($request, $token, $param){
        $session = $request->getSession();
        $connection = new DefaultConnection();
        $proxyConfiguration = null;
        $communicatorConfiguration = new CommunicatorConfiguration(
            self::ogone_cle_api,
            self::ogone_cle_api_secrete,
            self::ogone_url,
            'OnlinePayments'
        );
        $communicator = new Communicator($connection, $communicatorConfiguration);
        $client = new Client($communicator);
        $merchantClient = $client->merchant(self::ogone_pspid);
        $hostedCheckoutClient = $merchantClient->hostedCheckout();
        $createHostedCheckoutRequest = new CreateHostedCheckoutRequest();

        $order = new Order();
        $amountOfMoney = new AmountOfMoney();
        $amountOfMoney->setCurrencyCode("EUR");
        $amountOfMoney->setAmount($token->price * 100);
        $customer = new Customer();
        $customer->setMerchantCustomerId(self::ogone_pspid);
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

        $pageCustomization = new PageCustomization();
        $pageCustomization->setTemplate(self::ogone_template);

        $hostedCheckoutSpecificInput = new HostedCheckoutSpecificInput();
        $hostedCheckoutSpecificInput->setLocale("fr_FR");
        $hostedCheckoutSpecificInput->setReturnUrl($param['returnURL']);

        $createHostedCheckoutRequest->setOrder($order);
        $createHostedCheckoutRequest->setPageCustomization($pageCustomization);
        $createHostedCheckoutRequest->setHostedCheckoutSpecificInput($hostedCheckoutSpecificInput);

        $createHostedCheckoutResponse = $client->merchant(self::ogone_pspid)->hostedCheckout()->createHostedCheckout($createHostedCheckoutRequest);
        $hostedCheckoutStatus = $client->merchant(self::ogone_pspid)->hostedCheckout()->getHostedCheckout($createHostedCheckoutResponse->getHostedCheckoutId());

        $retour = [
            'idVente' => $token->id_vente,
            'idIndividu' => $token->id_individu,
            'idPaymentZoho' => $param['paiement'],
            'numDos' => $token->numDos,
            'merchandId' => self::ogone_pspid,
            'merchantReference' => $createHostedCheckoutResponse->getMerchantReference(),
            'hostedCheckoutId' => $createHostedCheckoutResponse->getHostedCheckoutId(),
            'RETURNMAC' => $createHostedCheckoutResponse->getReturnMAC(),
            'url_ogone' => $createHostedCheckoutResponse->getRedirectURL(),
            'hostedCheckoutStatus' => $hostedCheckoutStatus->getStatus()
        ];
        $session->set('retourApi', $retour);
        return $retour;
    }

    public function getPaymentResult(Request $request){
        $listeStatus = array(
            'PAYMENT_CREATED' => 'PAYMENT_CREATED',
            'IN_PROGRESS' => 'IN_PROGRESS',
            'CANCELLED_BY_CONSUMER' => 'Cancelled',
            'SUCCESSFUL' => 'Accepted',
            'REJECTED' => 'Denied',
            'STATUS_UNKNOWN' => 'STATUS_UNKNOWN'
        );

        $session = $request->getSession();
        $retourApi = $session->get('retourApi');
        $hostedCheckoutId = $retourApi['hostedCheckoutId'];
        
        $merchantId = self::ogone_pspid;
        $apiKey = self::ogone_cle_api;
        $apiSecret = self::ogone_cle_api_secrete;
        $apiEndpoint = self::ogone_url;
        $connection = new DefaultConnection();
        $communicatorConfiguration = new CommunicatorConfiguration(
            $apiKey,
            $apiSecret,
            $apiEndpoint,
            'OnlinePayments'
        );
        $communicator = new Communicator($connection, $communicatorConfiguration);
        $client = new Client($communicator);

        $hostedCheckoutStatus = $client->merchant($merchantId)->hostedCheckout()->getHostedCheckout($hostedCheckoutId);
        $getPayment = $hostedCheckoutStatus->getCreatedPaymentOutput();
        $payment = $getPayment->getPayment();

        return array(
            'status' => $listeStatus[$getPayment->getPaymentStatusCategory()]?:'ERROR',
            'code' => $payment->getStatusOutput()->getStatusCode()?:0
        );
    }

    public function getParams($request, $token){
        $tok = $token->price.$token->id_individu.$token->numDos.$token->marque.$token->id_date_prix;
        $tok = hash(self::ogone_sha, $tok);

        // Renvoi à la fonction pour créer et récupérer un id_paiement de zoho
        $paiement = $this->zoho->createPayment($token->price, $token->id_individu, $token->numDos, $tok, $token->devise);

        // Création des URL à envoyer en tant que param
        $url = "https://$_SERVER[HTTP_HOST]$_SERVER[SCRIPT_URL]";

        $returnURL = $url.'_back?dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price.'&pr='.$token->price;
        $acceptURL = $url.'_back?stat=Accepted&dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price.'&pr='.$token->price;
        $declineURL = $url.'_back?stat=Denied&dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price;
        $cancelURL = $url.'_back?stat=Denied&dt='.$token->id_date_prix.'&file='.$token->numDos.'&qte='.$token->quantity.'&idV='.$token->id_vente.'&full='.$token->full_price;

        $complus = 'confirm-payment?file='.$token->numDos;
        $paramplus = 'confirm-payment?file='.$token->numDos;

        // Création du tableau des param à renvoyer au controller
        $param = array (
            'paiement' => $paiement,
            'returnURL' => $returnURL,
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