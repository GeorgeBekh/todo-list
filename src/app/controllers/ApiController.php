<?php

use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;

class ApiController extends Controller
{
    public function registrationAction() {
        $request = $this->request->getJsonRawBody(true);
        
        if (!$this->registrationRequestIsValid($request)) {
            return new Response('', 400);
        }

        $salt = base64_encode(random_bytes(6));
         
        $hashedPassword = password_hash($request['password'] . $salt, PASSWORD_BCRYPT);

        /* @var $userService UserService */
        $userService = $this->di->get('userService');
        $userService->addUser(new User($request['login'], $hashedPassword, $salt));
        
        return new Response('', 200);
    }
    
    public function loginAction() {
        $request = $this->request->getJsonRawBody(true);
        
        if (!$this->loginRequestIsValid($request)) {
            return new Response('', 400);
        }
        
        /* @var $userService UserService */
        $userService = $this->di->get('userService');
        $user = $userService->findOneByLogin($request['login']);
        
        if (empty($user)) {
            return new Response('', 400); 
        }
        
        $passwordValid = password_verify(
            $request['password'] . $user->getSalt(),
            $user->getHashedPassword()
        );
        
        if (!$passwordValid) {
            return new Response('', 400); 
        }

        $token = $this->di->get('securityService')->generateToken($user->getLogin());
        
        $response = [
            'user' => [
                'id' => $user->getId(),
                'login' => $user->getLogin(),
            ],
            'token' => $token,
        ];
        
        return new Response(json_encode($response), 200); 
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
