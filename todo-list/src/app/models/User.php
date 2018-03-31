<?php

class User {
    
    private $login;
    private $hashedPassword;
    private $salt;
    private $id;
    
    public function __construct(
        string $login,
        string $hashedPassword,
        string $salt,
        ?int $id = null
    ) {
        $this->login = $login;
        $this->hashedPassword = $hashedPassword;
        $this->salt = $salt;
        $this->id = $id;
    }
    
    public function getLogin() : string {
        return $this->login;
    }
    
    public function getHashedPassword() : string {
        return $this->hashedPassword;
    }
    
    public function getSalt() : string {
        return $this->salt;
    }
    
    public function getId() : ?int {
        return $this->id;
    }
}
