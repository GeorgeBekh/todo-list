<?php

use Phalcon\Mvc\Controller;
use Phalcon\Db\Adapter\Pdo\Postgresql;

class ApiController extends Controller
{
    public function registrationAction() {
        /* @var $db Phalcon\Db\Adapter\Pdo\Postgresql */
        $db = $this->di->get('db');
        $db->insert('test', ['asdads']);
        
        var_dump($this->request->getJsonRawBody(true));
    }
}
