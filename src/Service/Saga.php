<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class Saga
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
     * @param string $id
     * @param string $date
     * @return array
     */
    function get($id, $date)
    {
        try {
            $url = $this->generateSignature($id, $date);
            $ch = curl_init();
            if ($ch === false) {
                throw new \Exception('failed to initialize');
            }
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            $result = curl_exec($ch);

            if ($result === false) {
                throw new \Exception(curl_error($ch), curl_errno($ch));
            }

            curl_close($ch);
            return $result;

        } catch(\Exception $e) {
            trigger_error(sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(), $e->getMessage()),
                E_USER_ERROR);
        }
    }

    /**
     * @param $id
     * @param $date
     * @return string
     */
    function generateSignature($id, $date)
    {
        $uri = '/api/tours/'.$id.'/dates/'.$date;
        $params = '?user='.$this->params->get('saga_user');
        $key = $this->params->get('saga_key');
        $signature = 'GET '.$uri.$params.'#'.$key;
        $url = $this->params->get('url_saga').$uri.$params.'&signature='.hash('sha256', $signature);
        return $url;
    }

}
