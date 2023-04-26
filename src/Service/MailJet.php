<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class MailJet
{

    protected $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    public function sendMail($datas){
        $datas = (object) $datas;

        if(empty($datas->from)) $datas->from = $this->params->get('mailer_from');
        if(empty($datas->from_name)) $datas->from_name = $this->params->get('mailer_from_name');

        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => $datas->from,
                        'Name' => $datas->from_name,
                    ],
                    'To' => [
                        [
                            'Email' => $datas->to,
                            'Name' => $datas->to_name,
                        ]
                    ],
                    'Subject' => $datas->subject,
                    'HTMLPart' => $datas->body,
                ]
            ]
        ];

        $ch = curl_init();

        curl_setopt_array($ch, [
            CURLOPT_URL => $this->params->get('mailer_url'),
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => json_encode($body),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_USERPWD => $this->params->get('mailer_user').":".$this->params->get('mailer_password'),
            ]
        );

        $server_output = curl_exec($ch);
        curl_close ($ch);

        //        $response = json_decode($server_output);

        //        if ($response->Messages[0]->Status == 'success') {
        //             echo "Email sent successfully.";
        //        }else{
        //             echo "Email not sent.";
        //        }

        return $server_output;
    }
}

