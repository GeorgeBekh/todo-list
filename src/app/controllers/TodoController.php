<?php

use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;

class TodoController extends Controller
{

    private $user;
    
    public function beforeExecuteRoute(Phalcon\Mvc\Dispatcher $dispatcher)
    {
        if (empty($this->user = $this->getDI()->get('securityService')->getCurrentUser())) {
            $this->dispatcher->forward(
                [
                    "controller" => "index",
                    "action"     => "forbidden",
                ]
            );
        }
    }

    
    public function getAction() {


        return new Response($user->getId(), 200);
    }
}
