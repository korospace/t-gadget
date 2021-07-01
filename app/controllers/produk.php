<?php

class produk extends BaseController{
    public function index(){
        $data['title'] = 'produk';
        $data['visitor'] = '';
        
        if(!isset($_SESSION['visitor'])){
            $_SESSION['visitor'] = true; 
            $data['visitor'] = 'pengunjung';
        }

        $this->view('Layout/header',$data);
        $this->view('Components/navbar-produk');
        $this->view('Produk/index');
        $this->view('Layout/footer',$data);
    }
}
?>