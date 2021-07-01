<?php

class home extends BaseController{
    public function index(){
        $data['title'] = 'home';
        $data['visitor'] = '';
        
        if(!isset($_SESSION['visitor'])){
            $_SESSION['visitor'] = true; 
            $data['visitor'] = 'pengunjung';
        }

        $this->view('Layout/header',$data);
        $this->view('Components/navbar-home');
        $this->view('Home/index');
        $this->view('Layout/footer',$data);
    }
}
?>