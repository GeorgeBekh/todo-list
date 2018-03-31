<?php

use Phalcon\Db;
use Phalcon\Db\Adapter;

class TodoService {
    
    private const TABLE_NAME = 'todo';

    private $database;
    
    public function __construct(Adapter $database) {
        $this->database = $database;
    }
        
    public function addOrUpdate(TodoItem $item) : bool {
        if ($this->findOneByIdAndUserId($item->getId(), $item->getUserId())) {
            return $this->database->update(
                self::TABLE_NAME,
                ['title', 'checked'],
                [$item->getTitle(), $this->boolToString($item->getChecked())],
                [
                    "conditions" => 'id = ? AND user_id = ?',
                    "bind"       => [$item->getId(), $item->getUserId()],
                ]
            );
        }

        return $this->database->insert(
            self::TABLE_NAME,
            [
                $item->getId(),
                $item->getUserId(),
                $item->getTitle(),
                $this->boolToString($item->getChecked())
            ],
            ['id', 'user_id', 'title', 'checked']
        );
    }
    
    public function delete(TodoItem $item) : bool {
        return $this->database->delete(
            self::TABLE_NAME,
            'id = ? AND user_id = ?',
            [$item->getId(), $item->getUserId()]
        );
    }
    
    public function findByUserId(int $userId) : array {
        $result = $this->database->fetchAll(
            'SELECT * FROM ' . self::TABLE_NAME . ' WHERE user_id = :userId ORDER BY id ASC',
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

    private function boolToString(bool $bool) {
        return $bool ? 'true' : 'false';
    }
    
    private function convertToObject($item) {
        return new TodoItem($item['id'], $item['user_id'], $item['title'], $item['checked']);
    }
}
