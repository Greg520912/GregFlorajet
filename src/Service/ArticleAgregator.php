<?php

namespace App\Service;

use App\Service\DatabaseService;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use App\Service\Curl;
use PDO;


class ArticleAgregator
{
 /*   protected $curl, $databaseService, $params;

    /*
     * @param $this->curl

    public function __construct(ParameterBagInterface $params)
    public function __construct()
    {
    //    $this->curl = new Curl();
    //    $this->params = $params;
    //    $this->databaseService = new DatabaseService();
    }*/
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function appendDatabase($request)
    {
        $pdo = $this->databaseService->getPdo();
        $stmt = $pdo->query('SELECT * FROM article');
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $this->json($results);
      //  return json_decode($response, true);
    }



    public function appendRss($sourceId, $rssUrl)
    {
        // Charger le flux RSS
        $rss = simplexml_load_file($rssUrl);

        if ($rss === false) {
            die('Erreur lors du chargement du flux RSS');
        }

        // Initialiser un tableau pour stocker les articles
        $articles = [];

        // Parcourir chaque item du flux RSS
        foreach ($rss->channel->item as $item) {
            $articles[] = [
                'name' => (string)$item->title,
                'content' => (string)$item->description,
                // Extraire et formater la date de publication
                'publishedAt' => $this->formatRssDate((string) $item->pubDate), // Appel à une fonction pour formater la date

            ];
        }

        // Préparer les requêtes pour vérifier l'existence et insérer les articles
        $checkStmt = $this->pdo->prepare('SELECT COUNT(*) FROM article WHERE name = :name');
        $insertStmt = $this->pdo->prepare('INSERT INTO article (source_id, name, content, publishedAt) VALUES (:source_id, :name, :content, :publishedAt)');

        foreach ($articles as $article) {
            // Vérifier si un article avec le même nom existe déjà
            $checkStmt->bindValue(':name', $article['name'], PDO::PARAM_STR);
            $checkStmt->execute();
            $exists = $checkStmt->fetchColumn();

            if ($exists == 0) {
                $insertStmt->bindValue(':source_id', $sourceId, PDO::PARAM_INT);
                $insertStmt->bindValue(':name', $article['name'], PDO::PARAM_STR);
                $insertStmt->bindValue(':content', $article['content'], PDO::PARAM_LOB);
                $insertStmt->bindValue(':publishedAt', $article['publishedAt'], PDO::PARAM_STR);
                $insertStmt->execute();
            }
        }
    }

    // Fonction pour formater la date du flux RSS en format français
    private function formatRssDate($pubDate)
    {
        // Convertir la date du format RSS en objet DateTime
        $datetime = \DateTime::createFromFormat('D, d M Y H:i:s O', $pubDate);

        // Formater la date en DD-MM-YY
        $formattedDate = $datetime->format('d-m-yy');

        return $formattedDate;
    }

}