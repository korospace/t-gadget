<?php

class produk extends BaseController{

    public function index(){
        $data['code']       = $this->getSecretCode();
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

    public function getSecretCode(){

        $handle = curl_init();
        
        $url = API_URL.'getSecretCode';
        
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        
        $output = curl_exec($handle);
        
        curl_close($handle);
        
        return $output;
    }           
}
?>