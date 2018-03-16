<?php

use Phalcon\Http\Response;

class JsonResponse extends Response {
    
    public function __construct($content = '', $code = null, $status = null) {
        parent::__construct(json_encode($content), $code, $status);
        
        $this->setHeader('Content-Type', 'application/json');
    }
}
