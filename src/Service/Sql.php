<?php

namespace App\Service;

use Doctrine\DBAL\Driver\AbstractMySQLDriver;
use Doctrine\DBAL\Driver\ExceptionConverterDriver;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Driver\Exception;

use InvalidArgumentException;
use PDO;

use function constant;
use function defined;

class Sql extends AbstractMySQLDriver implements ExceptionConverterDriver
{

    /**
     * @param array $params
     * @param $username
     * @param $password
     * @param array $driverOptions
     * @return PDO
     * @throws Exception
     */
    public function connect(array $params, $username = null, $password = null, array $driverOptions = [])
    {
        $host = $params['host'] ?? null;
        $port = $params['port'] ?? null;
        $dbname = $params['dbname'] ?? null;
        $unixSocket = $params['unix_socket'] ?? null;
        $charset = $params['charset'] ?? null;

        if (isset($params['driverOptions'][PDO::MYSQL_ATTR_SSL_CA])) {
            $driverOptions[PDO::MYSQL_ATTR_SSL_CA] = $params['driverOptions'][PDO::MYSQL_ATTR_SSL_CA];
        }

        $dsn = $this->getDsn($host, $port, $dbname, $unixSocket);

        try {
            $conn = new PDO($dsn, $username, $password, $driverOptions);
        } catch (\PDOException $e) {
            throw Exception::new($e);
        }

        if (isset($params['defaultTableOptions'])) {
            $sql = 'SET SESSION sql_mode = CONCAT(@@sql_mode, ",", :modes)';
            $stmt = $conn->prepare($sql);
            $stmt->execute(['modes' => $params['defaultTableOptions']]);
        }

        if (! empty($charset)) {
            $sql = 'SET NAMES ' . $conn->quote($charset);
            $sql .= isset($driverOptions[PDO::MYSQL_ATTR_INIT_COMMAND]) ? ',' . $driverOptions[PDO::MYSQL_ATTR_INIT_COMMAND] : '';
            $stmt = $conn->prepare($sql);
            $stmt->execute();
        }

        return $conn;
    }

    /**
     * @return \Doctrine\DBAL\Platforms\MySQLPlatform
     */
    public function getDatabasePlatform()
    {
        return new \Doctrine\DBAL\Platforms\MySQLPlatform();
    }

    /**
     * @param \Doctrine\DBAL\Connection $conn
     * @param AbstractPlatform $platform
     * @return \Doctrine\DBAL\Schema\MySQLSchemaManager
     */
    public function getSchemaManager(\Doctrine\DBAL\Connection $conn, \Doctrine\DBAL\Platforms\AbstractPlatform $platform)
    {
        return new \Doctrine\DBAL\Schema\MySqlSchemaManager($conn, $platform);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'pdo_mysql';
    }

    /**
     * @param \Doctrine\DBAL\Connection $conn
     * @return bool|mixed|string|null
     */
    public function getDatabase(\Doctrine\DBAL\Connection $conn)
    {
        $params = $conn->getParams();

        return isset($params['dbname']) ? $params['dbname'] : null;
    }

    /**
     * @param $version
     * @return \Doctrine\DBAL\Platforms\AbstractMySQLPlatform|AbstractPlatform|\Doctrine\DBAL\Platforms\MariaDb1027Platform|\Doctrine\DBAL\Platforms\MySQL57Platform|\Doctrine\DBAL\Platforms\MySQL80Platform|\Doctrine\DBAL\Platforms\MySqlPlatform
     */
    public function createDatabasePlatformForVersion($version)
    {
        return $this->getDatabasePlatform();
    }
    /**
     * {@inheritdoc}
     */
    public function getExceptionConverter()
    {
        // Return an instance of a class that implements the ExceptionConverter interface.
        // For example:
         return new MyExceptionConverter();
    }
    /**
     * Constructs the DSN for a MySQL PDO connection.
     *
     * @param string|null $host
     * @param int|null    $port
     * @param string|null $dbname
     * @param string|null $unixSocket
     *
     * @return string The DSN.
     *
     * @throws \Doctrine\DBAL\Driver\Exception if an error occurred while constructing the DSN.
     */
    private function getDsn($host, $port, $dbname, $unixSocket)
    {
        if (empty($host) && empty($unixSocket)) {
            throw new InvalidArgumentException('Either the host or unix_socket configuration option must be present.');
        }

        if (isset($unixSocket)) {
            return 'mysql:unix_socket=' . $unixSocket . ';dbname=' . $dbname;
        }

        $dsn = 'mysql:';
        if (isset($host)) {
            $dsn .= 'host=' . $host . ';';
        }
        if (isset($port)) {
            $dsn .= 'port=' . $port . ';';
        }
        if (isset($dbname)) {
            $dsn .= 'dbname=' . $dbname . ';';
        }

        return $dsn;
    }
}