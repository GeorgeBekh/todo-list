<?php

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha512;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\ValidationData;

class SecurityService {
    
    const SECRET = 'someSecret'; //TODO: get from env
    const TOKEN_TTL = 14400; //4 hours
    
    private $login;
    private $userService;
    
    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function authenticate(string $token) : bool {
        $jwtToken = (new Parser())->parse((string) $token);
        
        if (!$this->tokenIsValid($jwtToken)) {
            return false;
        }

        if (!($login = $jwtToken->getClaim('login'))) {
            return false;
        }
        
        $this->login = $login;
        
        return true;
    }
    
    public function getCurrentUser() : ?User {
        if (!$this->isAuthenticated()) {
            return null;
        }
        
        return $this->userService->findOneByLogin($this->login);
    }
    
    public function generateToken(string $login) : string {
        $signer = new Sha512();

        $token = (new Builder())->setIssuedAt(time())
            ->setExpiration(time() + self::TOKEN_TTL)
            ->set('login', $login)
            ->sign($signer, self::SECRET)
            ->getToken();
        
        return (string) $token;
    }
    
    public function isAuthenticated () : bool {
        return (bool) $this->login;
    }
    
    private function tokenIsValid(Token $token) {
        $data = new ValidationData(time());

        return $token->validate($data) && $token->verify(new Sha512(), self::SECRET);
    }
}
