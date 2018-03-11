<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$di->set('router', $router);

$router->setDefaultController('index');
$router->setDefaultAction('index');

$baseUrl = '/api/';

$router->add(
    $baseUrl . 'registration', 
    [
       'controller' => 'api', 
       'action' => 'registration', 
    ]
);

$router->notFound(
    [
        'controller' => 'index',
        'action'     => 'notFound',
    ]
);

$router->handle();
