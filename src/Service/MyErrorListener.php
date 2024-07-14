<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

use Symfony\Component\HttpKernel\EventListener\ErrorListener;


class MyErrorListener implements EventSubscriberInterface
{
    protected $mailer, $params;

    /**
     * @param ParameterBagInterface $params
     */
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
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

            $response = new Response();
            $response->setStatusCode(200);
            $response->headers->set('Refresh', '7; url='.$this->params->get('app_article_list'));
            $response->send();
            die;

        }
    }

}
