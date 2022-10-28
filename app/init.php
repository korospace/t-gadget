<?php 

spl_autoload_register(function($file){
    require_once 'core/'.$file.'.php';
});

define('BASE_URL','https://t-gadget.up.railway.app/');

define('API_URL' ,'https://koro-corsanywhere.up.railway.app/https://api-tgadget.up.railway.app/');

define('API_KEY' ,'613efdda28e6d');

?>