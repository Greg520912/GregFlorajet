## Installation

1. Importer le code source dans un projet, exemple `florajet`
   `git clone (pour url voir mail) florajet`
2. Dans le projet "florajet" supprimer le fichier composer.lock
3. Exécuter la commande `composer install`

4. Créer une BDD MySQL dédiée au projet et encodée en UTF-8. Ex : ``CREATE DATABASE `florajet` COLLATE 'utf8mb4';``
5. Créer la tables articles : `CREATE TABLE article (
   id INT AUTO_INCREMENT PRIMARY KEY,
   source_id INT NOT NULL,
   name VARCHAR(255) NOT NULL,
   content BLOB NOT NULL,
   publishedAt VARCHAR(255) DEFAULT NULL,
   FOREIGN KEY (source_id) REFERENCES source(id)
   );`
6. Créer la tables source : `CREATE TABLE source (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL
   );`
