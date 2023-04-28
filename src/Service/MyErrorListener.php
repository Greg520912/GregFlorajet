<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

use Symfony\Component\HttpKernel\EventListener\ErrorListener;

use App\Service\MailJet;

class MyErrorListener implements EventSubscriberInterface
{
    protected $mailer, $params;

    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
        $this->mailer = new MailJet($this->params);
    }

    /**
     * @return string[]
     */
    public static function getSubscribedEvents()
    {
        return [
            'kernel.exception' => 'onKernelException',
        ];
    }

    /**
     * @param ExceptionEvent $event
     * @return void
     */
    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();
        if (
            $exception instanceof HttpExceptionInterface
            && (
                $exception->getStatusCode() == 500
            )
        )
        {
            $datas = [
                'to' => $this->params->get('mailer_admin'),
                'to_name' => $this->params->get('mailer_admin'),
                'from' => $this->params->get('mailer_from'),
                'from_name' => 'Admin-BiAtalante',
                'subject' => 'Erreur '.$exception->getStatusCode().' => BiAtalante',
                'body' => $exception->getMessage(),
            ];
            $this->mailer->sendMail($datas);

            echo '
                <div class="text-center">
                    <h3>
                    Votre demande n\'est pas valide
                    <br/>Vous allez être redirigé vers le site <a href="'.$this->params->get('url_app').'">Atalante</a>
                    </h3>
                </div>
            ';
            $response = new Response();
            $response->setStatusCode(200);
            $response->headers->set('Refresh', '7; url='.$this->params->get('url_app'));
            $response->send();
            die;

        }
    }

}
