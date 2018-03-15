<?php

use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;

class IndexController extends Controller
{

    public function notFoundAction() {
        return new Response(json_encode('404'), 404);
    }

    public function forbiddenAction() {
        return new Response(json_encode('403'), 403);
    }

}

