<?php

namespace App\Controller;

use App\Entity\Source;
use App\Form\SourceType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SourceController extends AbstractController
{
    /**
     * @Route("/source/new", name="source_new", methods={"GET", "POST"})
     */
    public function new(Request $request): Response
    {
        $source = new Source();
        $form = $this->createForm(SourceType::class, $source);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Gérer la persistance avec PDO
            $this->saveSourcePDO($source);

            return $this->redirectToRoute('source_success');
        }

        return $this->render('source/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    private function saveSourcePDO(Source $source)
    {
        // Connexion à la base de données avec PDO
        $dsn = sprintf('mysql:host=%s;dbname=%s', '127.0.0.1', 'florajet');
        $user = 'greg';
        $password = '!Florajet!';

        $pdo = new \PDO($dsn, $user, $password);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        // Préparation et exécution de la requête d'insertion
        $stmt = $pdo->prepare('INSERT INTO source (name) VALUES (:name)');
        $stmt->bindValue(':name', $source->getName(), \PDO::PARAM_STR);
        $stmt->execute();
    }

    /**
     * @Route("/source/success", name="source_success")
     */
    public function success(): Response
    {
        return $this->render('source/success.html.twig');
    }
}