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
         
        $hashedPassword = password_hash($request['password'] . $salt, PASSWORD_BCRYPT);

        /* @var $db Phalcon\Db\Adapter\Pdo\Postgresql */
        $db = $this->di->get('db');
        $db->insert(
            'users',
            [$request['login'], $hashedPassword, $salt],
            ['login', 'password', 'salt']
        );
        
        return new Phalcon\Http\Response('', 200);
    }
    
    public function loginAction() {
        $request = $this->request->getJsonRawBody(true);
        
        if (!$this->loginRequestIsValid($request)) {
            return new Phalcon\Http\Response('', 400);
        }
        
        /* @var $db Phalcon\Db\Adapter\Pdo\Postgresql */
        $db = $this->di->get('db');
        $user = $db->fetchOne(
            'SELECT * FROM users WHERE login = :login',
            Phalcon\Db::FETCH_ASSOC,
            ['login' => $request['login']]
        );
        
        if (empty($user)) {
            return new Phalcon\Http\Response('', 400); 
        }
        
        $passwordValid = password_verify(
            $request['password'] . $user['salt'],
            $user['password']
        );
        
        if (!$passwordValid) {
            return new Phalcon\Http\Response('', 400); 
        }
        
        $this->session->start();
        $this->session->set('user', ['id' => $user['id']]);
        
        $userView = [
            'id' => $user['id'],
            'login' => $user['login']
        ];
        
        return new Phalcon\Http\Response(json_encode($userView), 200); 
    }
    
    private function registrationRequestIsValid($request) {
        $fieldsEmpty = empty($request['login']) || empty($request['password']);
        $loginValid = $this->validateEmail($request['login']);
        
        return $loginValid && !$fieldsEmpty;
    }
    
    private function loginRequestIsValid($request) {
        $fieldsEmpty = empty($request['login']) || empty($request['password']);
        $loginValid = $this->validateEmail($request['login']);
        
        return $loginValid && !$fieldsEmpty;
    }
    
    private function validateEmail($email) {
        return (bool) preg_match('/^.+@.+/', $email);
    }
}
