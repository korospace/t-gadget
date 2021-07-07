<?php

class produk extends BaseController{
    public function index(){
        $data['code']       = '031020';
        $data['title']      = 'produk';
        $data['NewVisitor'] = 'false';
        
        if(!isset($_SESSION['NewVisitor'])){
            $data['NewVisitor']     = 'true';
            $_SESSION['NewVisitor'] = true; 
        }

        $this->view('Layout/header',$data);
        $this->view('Produk/index');
        $this->view('Layout/footer',$data);
    }
}
?>