<?php

class home extends BaseController{
    public function index(){
        $data['title']   = 'home';
        $data['visitor'] = 'false';
        
        if(!isset($_SESSION['visitor'])){
            $data['visitor']     = 'true';
            $_SESSION['visitor'] = true; 
        }

        $this->view('Layout/header',$data);
        $this->view('Components/navbar-home');
        $this->view('Home/index');
        $this->view('Layout/footer',$data);
    }
}
?>