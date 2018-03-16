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
            return $this->addOrUpdateItem($id);
        }
        
        if ($this->request->isDelete()) {
            return $this->deleteItem($id);
        }
        
        return $this->getItem($id);
    }
    
    private function addOrUpdateItem(int $id) {
        $request = $this->request->getJsonRawBody(true);
        
        if (empty($request['title']) || !isset($request['checked'])) {
            return new JsonResponse('', 400);
        }
        
        $this->todoService->addOrUpdate(
            new TodoItem($id, $this->user->getId(), $request['title'], $request['checked'])
        );
        
        return new JsonResponse();
    }

    private function deleteItem(int $id) {        
        $result = $this->todoService->delete(
            new TodoItem($id, $this->user->getId())
        );
        
        return new JsonResponse();
    }
    
    private function getItem(string $id) {
        return new JsonResponse('', 501);
    }
}
