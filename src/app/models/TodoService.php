<?php

use Phalcon\Db;
use Phalcon\Db\Adapter;

class TodoService {
    
    private const TABLE_NAME = 'todo';

    private $database;
    
    public function __construct(Adapter $database) {
        $this->database = $database;
    }
        
    public function addOne(TodoItem $item) : bool {
        return $this->database->insert(
            self::TABLE_NAME,
            [$item->getId(), $item->getUserId(), $item->getTitle(), $item->getChecked() ? 'true' : 'false'],
            ['id', 'user_id', 'title', 'checked']
        );
    }
    
    public function findByUserId(int $userId) : array {
        $result = $this->database->fetchAll(
            'SELECT * FROM ' . self::TABLE_NAME . ' WHERE user_id = :userId',
            Db::FETCH_ASSOC,
            ['userId' => $userId]
        );
        
        foreach ($result as $index => $item) {
            $result[$index] = $this->convertToObject($item);
        }
        
        return $result;
    }
    
    public function findOneByIdAndUserId(string $id, int $userId) : ?TodoItem {
        $item = $this->database->fetchOne(
            'SELECT * FROM ' . self::TABLE_NAME . ' WHERE id = :id AND user_id = :userId',
            Db::FETCH_ASSOC,
            ['id' => $id, 'userId' => $userId]
        );
        
        if (empty($item)) {
            return null;
        }
        
        return $this->convertToObject($item);
    }
    
    private function convertToObject($item) {
        return new TodoItem($item['id'], $item['user_id'], $item['title'], $item['checked']);
    }
}
