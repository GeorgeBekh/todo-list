<?php

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha512;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\ValidationData;

class SecurityService {

    const TOKEN_TTL = 14400; //4 hours

    private $login;
    private $userService;
    private $secret;

    public function __construct($secret, UserService $userService) {
        $this->secret = $secret;
        $this->userService = $userService;
    }

    public function authenticate(string $token) : bool {
        try {
            $jwtToken = (new Parser())->parse((string) $token);
        } catch (\Exception $e) {
            return false;
        }

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
            ->sign($signer, $this->secret)
            ->getToken();
        
        return (string) $token;
    }
    
    public function isAuthenticated () : bool {
        return (bool) $this->login;
    }
    
    private function tokenIsValid(Token $token) {
        $data = new ValidationData(time());

        return $token->validate($data) && $token->verify(new Sha512(), $this->secret);
    }
}
