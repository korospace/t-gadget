<?php

class home extends BaseController{
    public function index(){
        $data['code']       = '031020';
        $data['title']      = 'home';
        $data['NewVisitor'] = 'false';
        
        if(!isset($_SESSION['NewVisitor'])){
            $data['NewVisitor']     = 'true';
            $_SESSION['NewVisitor'] = true; 
        }

        $this->view('Layout/header',$data);
        $this->view('Home/index');
        $this->view('Layout/footer',$data);
    }
}
?>