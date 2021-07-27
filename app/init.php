<?php 

spl_autoload_register(function($file){
    require_once 'core/'.$file.'.php';
});

// define('BASE_URL','http://localhost/t-gadget/');
define('BASE_URL','https://t-gadget.herokuapp.com/');

// define('API_URL' ,'http://localhost/t-gadgetapi/');
define('API_URL' ,'https://t-gadgetapi.000webhostapp.com/');

?>