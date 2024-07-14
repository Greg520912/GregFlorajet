<?php

namespace App\Controller;

use App\Entity\Article;
use App\Form\ArticleType;
use App\Service\ArticleAgregator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class ArticleController extends AbstractController
{

    private $pdo;

    public function __construct()
    {
        $dsn = sprintf('mysql:host=%s;dbname=%s', '127.0.0.1', 'florajet');
        $user = 'greg';
        $password = '!Florajet!';

        $this->pdo = new \PDO($dsn, $user, $password);
    }

    /**
     * @Route("/article/new", name="app_article_new")
     */
    public function new(Request $request): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleType::class, $article);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->saveArticlePDO($article);

            return $this->redirectToRoute('article_success');
        }

        return $this->render('article/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    private function saveArticlePDO(Article $article)
    {
        $stmt = $this->pdo->prepare('INSERT INTO article (source_id, name, content, publishedAt) VALUES (:source_id, :name, :content, :publishedAt)');

        $sourceId = $article->getSourceId();
        $name = $article->getName();
        $content = $article->getContent();
        $publishedAt = $article->getPublishedAt(); // Assuming this is a string

        $stmt->bindParam(':source_id', $sourceId, \PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, \PDO::PARAM_STR);
        $stmt->bindParam(':content', $content, \PDO::PARAM_LOB);
        $stmt->bindParam(':publishedAt', $publishedAt, \PDO::PARAM_STR);

        $stmt->execute();
    }

    /**
     * @Route("/article/success", name="article_success")
     */
    public function success(): Response
    {
        return $this->render('article/success.html.twig');
    }

    /**
     * @Route("/articles", name="app_article_list")
     */
    public function list(Request $request): Response
    {
        $page = $request->query->getInt('page', 1);
        $limit = 6;

        // Récupérer l'ID de la source sélectionnée depuis la requête
        $selectedSourceId = $request->query->get('sourceId');

        // Récupérer les articles paginés en fonction de sourceId
        if (!empty($selectedSourceId)) {
            $articles = $this->getArticles($page, $limit, $selectedSourceId);
        } else {
            // Si sourceId n'est pas spécifié, récupérer tous les articles
            $articles = $this->getArticles($page, $limit);
        }

        // Récupérer le nombre total d'articles pour le calcul de totalPages
        $totalArticles = $this->getTotalArticles($selectedSourceId);

        // Calculer le nombre total de pages en fonction du nombre d'articles
        $totalPages = ceil($totalArticles / $limit);

        // Récupérer la liste des sources avec PDO
        $sources = $this->getSources();

        return $this->render('article/list.html.twig', [
            'articles' => $articles,
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'sources' => $sources,
            'selectedSourceId' => $selectedSourceId, // Passer l'ID de la source sélectionnée au template
        ]);
    }

    private function getArticles(int $page, int $limit, string $sourceId = null): array
    {
        $offset = ($page - 1) * $limit;

        $a = new ArticleAgregator($this->pdo);

        $a->appendRss(1, 'http://www.lemonde.fr/rss/une.xml');

        $sql = '
        SELECT article.id, article.source_id, article.name AS article_name, article.content, article.publishedAt, source.name AS source_name
        FROM article
        INNER JOIN source ON article.source_id = source.id
        ';

        // Si $sourceId est spécifié, ajouter une condition WHERE pour filtrer par source_id
        if ($sourceId !== null) {
            $sql .= ' WHERE article.source_id = :source_id ';
        }

        $sql .= ' ORDER BY article.id DESC LIMIT :limit OFFSET :offset';

        $stmt = $this->pdo->prepare($sql);

        // Utiliser des variables pour bindValue
        $limitParam = $limit;
        $offsetParam = $offset;

        $stmt->bindValue(':limit', $limitParam, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offsetParam, \PDO::PARAM_INT);

        // Si $sourceId est spécifié, lier la valeur à :source_id
        if ($sourceId !== null) {
            $sourceIdParam = $sourceId;
            $stmt->bindValue(':source_id', $sourceIdParam, \PDO::PARAM_INT);
        }

        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }

    private function getTotalArticles(?string $sourceId = null): int
    {
        // Construire la requête SQL pour compter les articles avec ou sans filtre de source
        $sql = 'SELECT COUNT(*) FROM article';

        // Si $sourceId est spécifié et non vide, ajouter une condition WHERE pour filtrer par source_id
        if (!empty($sourceId)) {
            $sql .= ' WHERE source_id = :source_id ';
        }

        $stmt = $this->pdo->prepare($sql);

        // Si $sourceId est spécifié et non vide, lier la valeur à :source_id
        if (!empty($sourceId)) {
            $stmt->bindValue(':source_id', $sourceId, \PDO::PARAM_INT);
        }

        $stmt->execute();

        return (int) $stmt->fetchColumn();
    }

    private function getSources(): array
    {
        // Récupérer la liste des sources depuis la base de données
        $stmt = $this->pdo->query('SELECT id, name FROM source');
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}