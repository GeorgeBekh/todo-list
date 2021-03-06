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
       'controller' => 'authentication', 
       'action' => 'registration', 
    ]
);

$router->add(
    $baseUrl . 'login', 
    [
       'controller' => 'authentication', 
       'action' => 'login', 
    ]
);

$router->add(
    $baseUrl . 'user', 
    [
       'controller' => 'authentication', 
       'action' => 'info', 
    ]
);

$router->add(
    $baseUrl . 'todo/', 
    [
       'controller' => 'todo', 
       'action' => 'getAll', 
    ]
);

$router->add(
    $baseUrl . 'todo/(\d+)/', 
    [
       'controller' => 'todo', 
       'action' => 'item',
       'id' => 1
    ]
);

$router->notFound(
    [
        'controller' => 'index',
        'action'     => 'notFound',
    ]
);

$router->handle();
