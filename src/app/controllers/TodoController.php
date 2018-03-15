<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;

class TodoController extends Controller
{

    /** @var User */
    private $user;
    /** @var TodoService */
    private $todoService;

    public function beforeExecuteRoute(Dispatcher $dispatcher)
    {
        $this->todoService = $this->getDI()->get('todoService');
        $this->user = $this->getDI()->get('securityService')->getCurrentUser();
        
        if (empty($this->user)) {
            $this->dispatcher->forward(
                [
                    "controller" => "index",
                    "action"     => "forbidden",
                ]
            );
        }
    }
    
    public function getAllAction() {
        $items = $this->todoService->findByUserId($this->user->getId());
        $result = [];
        
        foreach ($items as $item) {
            $result[] = [
                'id' => $item->getId(),
                'title' => $item->getTitle(),
                'checked' => $item->getChecked(),
            ];
        }
        
        return new JsonResponse($result);
    }
    
    public function itemAction() {
        $id = $this->dispatcher->getParam('id');
        
        if ($this->request->isPost()) {
            return $this->addItem($id);
        }
        
        return $this->getItem($id);
    }
    
    private function addItem(string $id) {
        $request = $this->request->getJsonRawBody(true);
        
        if (empty($request['title'])) {
            return new JsonResponse('', 400);
        }
        
        $this->todoService->addOne(new TodoItem($id, $this->user->getId(), $request['title'], false));
        
        return new JsonResponse('', 201);
    }
    
    private function getItem(string $id) {
        return new JsonResponse('', 405);
    }
}
