<?php

namespace App\Service;

use PDO;
use PDOException;

class DatabaseService
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

    public function getPdo(): PDO
    {
        return $this->pdo;
    }
}