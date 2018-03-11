<?php

use Phalcon\Http\Response;

class IndexController extends ControllerBase
{

    public function notFoundAction()
    {
        return new Response(json_encode('404'), 404);
    }

}

