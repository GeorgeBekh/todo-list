<?php

use Phalcon\Mvc\Controller;
use Phalcon\Db\Adapter\Pdo\Postgresql;

class ApiController extends Controller
{
    public function registrationAction() {
        $request = $this->request->getJsonRawBody(true);
        
        if (!$this->registrationRequestIsValid($request)) {
            return new Phalcon\Http\Response('', 400);
        }

        $salt = base64_encode(random_bytes(6));
         
        $hashedPassword = $this->hashPassword($request['password'], $salt);
        
        /* @var $db Phalcon\Db\Adapter\Pdo\Postgresql */
        $db = $this->di->get('db');
        $db->insert(
            'users',
            [$request['login'], $request['password'], $salt],
            ['login', 'password', 'salt']
        );
        
        return new Phalcon\Http\Response('', 200);
    }
    
    private function registrationRequestIsValid($request) {
        $fieldsEmpty = empty($request['login']) || empty($request['password']);
        $loginValid = (bool) strpos($request['login'], '@');
        
        return $loginValid && !$fieldsEmpty;
    }
    
    private function hashPassword($password, $salt) {
        $hashOptions = [
            'cost' => 10,
            'salt' => $salt
        ];
        
        return password_hash($password . $salt, PASSWORD_BCRYPT, $hashOptions);
    }
}
