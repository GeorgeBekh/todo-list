<?php

use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;

class AuthenticationController extends Controller
{
    private const ERR_CODE_WRONG_CREDENTIALS = 'wrongCredentials';
    
    public function registrationAction() {
        $request = $this->request->getJsonRawBody(true);
        
        if (!$this->registrationRequestIsValid($request)) {
            return new JsonResponse('', 400);
        }

        $salt = base64_encode(random_bytes(6));
         
        $hashedPassword = password_hash($request['password'] . $salt, PASSWORD_BCRYPT);

        /* @var $userService UserService */
        $userService = $this->di->get('userService');
        try {
            $userService->addUser(new User($request['login'], $hashedPassword, $salt));
        } catch (\UserAlreadyExistsException $e) {
            return new JsonResponse('userExists', 400);
        }
        
        return new JsonResponse('', 200);
    }
    
    public function loginAction() {
        $request = $this->request->getJsonRawBody(true);
        
        if (!$this->loginRequestIsValid($request)) {
            return new JsonResponse(self::ERR_CODE_WRONG_CREDENTIALS, 400);
        }
        
        /* @var $userService UserService */
        $userService = $this->di->get('userService');
        $user = $userService->findOneByLogin($request['login']);
        
        if (empty($user)) {
            return new JsonResponse(self::ERR_CODE_WRONG_CREDENTIALS, 400); 
        }
        
        $passwordValid = password_verify(
            $request['password'] . $user->getSalt(),
            $user->getHashedPassword()
        );
        
        if (!$passwordValid) {
            return new JsonResponse(self::ERR_CODE_WRONG_CREDENTIALS, 400); 
        }

        $token = $this->di->get('securityService')->generateToken($user->getLogin());
        
        $response = [
            'token' => $token,
        ];
        
        return new JsonResponse($response, 200); 
    }
    
    public function infoAction() {
        $user = $this->di->get('securityService')->getCurrentUser();
        if (!$user) {
            return new JsonResponse('', 403);
        }

        return new JsonResponse([
            'id' => $user->getId(),
            'login' => $user->getLogin(),
        ]);
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
