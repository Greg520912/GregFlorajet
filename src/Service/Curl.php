<?php

namespace App\Service;

class Curl
{

    /**
     * @param $url
     * @return bool|string|void
     */
    public function get($url){
        try {
            $ch = curl_init();

            if ($ch === false) {
                throw new \Exception('failed to initialize');
            }
            curl_setopt_array($ch, array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_CUSTOMREQUEST => "GET",
            ));
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
     * @param $url
     * @return string|null
     */
    public function asyncGet($url){
        if (!is_array($url) && !empty($url)) $this->url = $url;
        else $this->url = false;
        if($this->url) {
            $output = null;
            $retval = null;
            $cmd = null;
            $cmd .= 'curl -R "' . $url . '"';
            $cmd .= ' > /dev/null 2>&1 &';
            exec($cmd, $output, $retval);
            return $output;
        }else{
            return 'url invalide';
        }
    }

    /**
     * @param $urls
     * @return array|string
     */
    public function parallelGet($urls){
        if (is_array($urls)) $this->urls = $urls;
        else $this->urls = false;

        if($this->urls){
            // Create get requests for each URL
            $mh = curl_multi_init();

            foreach($this->urls as $i => $url)
            {
                $ch[$i] = curl_init($url);
                curl_setopt($ch[$i], CURLOPT_RETURNTRANSFER, 1);
                curl_multi_add_handle($mh, $ch[$i]);
            }

            // Start performing the request
            do {
                $execReturnValue = curl_multi_exec($mh, $runningHandles);
            } while ($execReturnValue == CURLM_CALL_MULTI_PERFORM);

            // Loop and continue processing the request
            while ($runningHandles && $execReturnValue == CURLM_OK)
            {
                // !!!!! changed this if and the next do-while !!!!!

                if (curl_multi_select($mh) != -1)
                {
                    usleep(100);
                }

                do {
                    $execReturnValue = curl_multi_exec($mh, $runningHandles);
                } while ($execReturnValue == CURLM_CALL_MULTI_PERFORM);
            }

            // Check for any errors
            if ($execReturnValue != CURLM_OK)
            {
                trigger_error("Curl multi read error $execReturnValue\n", E_USER_WARNING);
            }

            // Extract the content
            foreach ($urls as $i => $url)
            {
                // Check for errors
                $curlError = curl_error($ch[$i]);

                if ($curlError == "")
                {
                    $responseContent = curl_multi_getcontent($ch[$i]);
                    $res[$i] = $responseContent;
                }
                else
                {
                    return "Curl error on handle $i: $curlError\n";
                }
                // Remove and close the handle
                curl_multi_remove_handle($mh, $ch[$i]);
                curl_close($ch[$i]);
            }

            // Clean up the curl_multi handle
            curl_multi_close($mh);

            // Print the response data
            // return "response data: " . print_r($res, true);
            return $res;
        }else{
            return 'urls invalides';
        }
    }
}