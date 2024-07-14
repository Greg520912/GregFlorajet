<?php

namespace App\Controller;

use App\Service\DatabaseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DatabaseController extends AbstractController
{
    private $databaseService;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
    }

    /**
    * @Route("/app_bdd", name="app_bdd")
    */
    public function index(): Response
    {
        $a = new ArticleAgregator();
        $a->appendRss('Le Monde', 'http://www.lemonde.fr/rss/une.xml');
        $a->appendDatabase();

        foreach ($a as $article) {
            echo sprintf('<h2>%s</h2><em>%s</em><p>%s</p>',
                $article->name,
                $article->sourceName,
                $article->content
            );
        }
    }
}