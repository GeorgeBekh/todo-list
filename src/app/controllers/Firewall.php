<?php

use Phalcon\Dispatcher;
use Phalcon\Events\Event;
use Phalcon\Http\Request;

class Firewall {
    
    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher) {
        /* @var $request Request */
        $request = $dispatcher->getDI()->get('request');
        $token = $request->getHeader('User-Authentication');

        if (empty($token)) {
            return;
        }
        
        /* @var $securityService SecurityService */
        $securityService = $dispatcher->getDI()->get('securityService');

        $securityService->authenticate($token);
    }
    
}
