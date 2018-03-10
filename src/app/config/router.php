<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$router->setDefaultController('index');
$router->setDefaultAction('index');

$baseUrl = '/api/';

$router->add($baseUrl . 'test', [
   'controller' => 'demo', 
   'action' => 'index', 
]);

$router->notFound(
    [
        'controller' => 'index',
        'action'     => 'notFound',
    ]
);

$router->handle();

$di->set('router', $router);
