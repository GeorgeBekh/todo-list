<?php

use Phalcon\Db;
use Phalcon\Db\Adapter;

class UserService {

    private const TABLE_NAME = 'users';

    private $database;

    public function __construct(Adapter $database) {
        $this->database = $database;
    }

    public function findOneByLogin(string $login) : ?User {
        $user = $this->database->fetchOne(
            'SELECT * FROM ' . self::TABLE_NAME . ' WHERE login = :login',
            Db::FETCH_ASSOC,
            ['login' => $login]
        );
        
        if (empty($user)) {
            return null;
        }
        
        return new User($user['login'], $user['password'], $user['salt'], $user['id']);
    }

    public function addUser(User $user) : void {
        try {
            $this->database->insert(
                self::TABLE_NAME,
                [$user->getLogin(), $user->getHashedPassword(), $user->getSalt()],
                ['login', 'password', 'salt']
            );
        } catch (\PDOException $e) {
            if ($e->getCode() === '23505') {
                throw new UserAlreadyExistsException();
            }

            throw $e;
        }
    }
}
