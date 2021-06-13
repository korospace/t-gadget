<?php

class BaseController{
    public function view($url,$data = ""){
        require_once 'app/views/'.$url.'.php';
    }
    public function model($file){
        require_once 'app/models/'.$file.'.php';
        return new $file;
    }
}

?>