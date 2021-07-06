<?php

class produk extends BaseController{
    public function index(){
        $data['title']   = 'produk';
        $data['visitor'] = 'false';
        
        if(!isset($_SESSION['visitor'])){
            $data['visitor']     = 'true';
            $_SESSION['visitor'] = true; 
        }

        $this->view('Layout/header',$data);
        $this->view('Components/navbar-produk');
        $this->view('Produk/index');
        $this->view('Components/countdown');
        $this->view('Components/modaldetail');
        $this->view('Layout/footer',$data);
    }
}
?>