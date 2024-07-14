<?php

namespace App\Service;

use App\Entity\Source;
use App\Entity\DatabaseService;
use PDO;

class SourceService
{
    private $pdo;

    public function __construct(string $dsn, string $user, string $password)
    {
        try {
            $this->pdo = new PDO($dsn, $user, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw new \RuntimeException('Connection error: ' . $e->getMessage());
        }
    }

    public function getAllSources(): array
    {
        $stmt = $this->pdo->query('SELECT id, name FROM source');
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sources = [];
        foreach ($results as $result) {
            $source = new Source();
            $source->setId($result['id']);
            $source->setName($result['name']);
            $sources[] = $source;
        }

        return $sources;
    }
}