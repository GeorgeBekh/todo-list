<?php

class TodoItem {
    
    private $id;
    private $userId;
    private $title;
    private $checked;
    
    public function __construct(
        int $id,
        int $userId,
        string $title = '',
        bool $checked = false
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->title = $title;
        $this->checked = $checked;
    }
    
    public function getId() : int {
        return $this->id;
    }
    
    public function getUserId() : int {
        return $this->userId;
    }
    
    public function getTitle() : string {
        return $this->title;
    }
    
    public function getChecked() : bool {
        return $this->checked;
    }
}
