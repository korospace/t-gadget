<?php 

spl_autoload_register(function($file){
    require_once 'core/'.$file.'.php';
});

define('BASE_URL','http://localhost/t-gadget/');

define('API_URL' ,'http://localhost/api-tgadget/');

define('API_KEY' ,'64140c0d0d2e6');

?>