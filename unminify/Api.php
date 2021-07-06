<?php

class Api extends BaseController{

    public function index(){}

    /* 
        CountDown - get data
    */
    public function getCountDown(){
        if(isset($_POST['code'])){
            if($_POST['code'] === CODE){
                echo json_encode($this->model('Api_model')->getCountDown());
            }else{
                echo json_encode("getCountDown: wrong code!");
            }
        }else{
            echo json_encode("missing parameter code");
        }
    }

    public function getPopup(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){

                echo json_encode($this->model('Api_model')->getPopup());
            }
        }
    }

    /* 
        Testimonies - get data
    */
    public function getTestimonies(){
        if(isset($_POST['code'])){
            if($_POST['code'] === CODE){
                echo json_encode($this->model('Api_model')->getTestimonies());
            }else{
                echo json_encode("getTestimonies: wrong code!");
            }
        }else{
            echo json_encode("missing parameter code");
        }
    }

    /* 
        Testimonies - update data
    */
    public function testimoni($code = null,$imgUrl = null){
        (isset($_POST['code'])) ? $code = $_POST['code'] : $code = $code;

        if($code === CODE){
            echo json_encode($this->model('Api_model')->testimoni($imgUrl));
        }
    }

    /* 
        Banners - get data
    */
    public function getBanners(){
        if(isset($_POST['code'])){
            if($_POST['code'] === CODE){
                echo json_encode($this->model('Api_model')->getBanners());
            }else{
                echo json_encode("getBanners: wrong code!");
            }
        }else{
            echo json_encode("missing parameter code");
        }
    }

    /* 
        Banners - edit data
    */
    public function spanduk($code = null,$imgUrl = null){
        (isset($_POST['code'])) ? $code = $_POST['code'] : $code = $code;

        if($code === CODE){
            echo json_encode($this->model('Api_model')->spanduk($imgUrl));
        }
    }

    /* 
        Get Admin
    */
    public function getAdmin(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){

                (isset($_POST['username'])) ? $username = $_POST['username'] : $username = null;

                echo json_encode($this->model('Api_model')->getAdmin($username));
            }
        }
    }

    /* 
        PRODUK - get data
    */
    public function getProducts(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){
                echo json_encode($this->model('Api_model')->getProducts());
            }else{
                echo json_encode("getProducts: wrong code!");
            }
        }else{
            echo json_encode("missing parameter code!");
        }
    }

    /* 
        Get Detil Produk
    */
    public function getDetilProduk(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){
                (isset($_POST['namaProduk'])) ? $namaProduk = $_POST['namaProduk'] : $namaProduk = null;

                (isset($_POST['id'])) ? $id = $_POST['id'] : $id = null;
                
                echo json_encode($this->model('Api_model')->getDetilProduk($id,$namaProduk));
            }
        }
    }

    /* 
        Edit Popup
    */
    public function editPopup($post,$imgUrl){
        $this->model('Api_model')->editPopup($post,$imgUrl);
    }

    /* 
        Edit Admin
    */
    public function editAdmin(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){
                echo json_encode($this->model('Api_model')->editAdmin($_POST));
            }
        }
    }

    /* 
        Edit Produk
    */
    public function tambahEditProduk($post = null,$imgUrl = null){

        (isset($_POST['code'])) ? $code = $_POST['code'] : $code = $post['code'];

        if($code === CODE){
            if($imgUrl !== null){
                $this->model('Api_model')->tambahEditProduk($post,$imgUrl,null);
            }else{
                ($_POST['id'] !== "") ? $id = $_POST['id'] : $id = null;
                
                echo json_encode($this->model('Api_model')->tambahEditProduk($_POST,null,$id));
            }
        }
    }

    /* 
        Statistik - get data
    */
    public function getStatistic(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){
                echo json_encode($this->model('Api_model')->getStatistic());
            }else{
                echo json_encode("updateStatistic: wrong code!");
            }
        }else{
            echo json_encode("missing parameter code");
        }
    }

    /* 
        Statistik - update
    */
    public function updateStatistic(){
        if(isset($_POST['code'])){
            if($_POST['code'] === CODE){
                $id      = null;
                $atribut = $_POST['atribut'];
                
                (isset($_POST['id'])) ? $id = $_POST['id'] : '';
                
                $message = $this->model('Api_model')->updateStatistic($atribut,$id);
                echo json_encode($message);
            }else{
                echo json_encode("updateStatistic: wrong code!");
            }
        }else{
            echo json_encode("missing parameter code");
        }
    }

    /* 
        Upload Foto
    */
    public function uploadFoto(){
        
        // var_dump($_POST);
        // var_dump($_FILES);

        $namaTabel = $_POST['namaTabel'];
        $namaFolder = $_POST['namaFolder'];
        
        if($_FILES[$namaFolder]['error'] !== 4)
        {
            $tmpImg = $_FILES[$namaFolder]['tmp_name'];
            $imgName = uniqid().$_FILES[$namaFolder]['name'];
            $imgUrl = BASE_URL.'asset/img/'.$namaFolder.'/'.$imgName;

            if($namaTabel == 'popup')
            {
                move_uploaded_file($tmpImg, BASE_LINK.$_POST['namaFolder'].'/'.$imgName);
                
                $this->removeImg($_POST['namaFolder'],$_POST['imgLama']);
                
                $this->editPopup($_POST,$imgUrl);
            }
            elseif($namaTabel == 'produk')
            {
                move_uploaded_file($tmpImg, BASE_LINK.$_POST['namaFolder'].'/'.$imgName);
                
                $this->removeImg($_POST['namaFolder'],$_POST['imgLama']);
                
                $this->tambahEditProduk($_POST,$imgUrl);
            }
            else
            {
                move_uploaded_file($tmpImg, BASE_LINK.$_POST['namaFolder'].'/'.$imgName);
                
                if($namaTabel == 'testimoni')
                {
                    $this->testimoni($_POST['code'],$imgUrl);
                }
                if($namaTabel == 'spanduk')
                {
                    $this->spanduk($_POST['code'],$imgUrl);
                }
            }
            
        }
        else
        {
            echo "bukan upload foto";

            if(isset($_POST['tgl'])){
                $imgUrl = $_POST['imgLama'];
                $this->editPopup($_POST,$imgUrl);
            }
        }
        
    }

    /* 
        Remove Foto
    */
    public function removeImg($namaFolder,$imgLama){
        $imgLama = explode('/',$imgLama);
        $imgLama = end($imgLama);

        ($imgLama == 'default.jpg') ? '' : unlink(BASE_LINK.$namaFolder.'/'.$imgLama);
    }

    /* 
        Delete Data
    */
    public function deleteData(){
        if(isset($_POST['code'])){
            if($_POST['code']===CODE){
                $this->removeImg($_POST['folder'],$_POST['imgurl']);

                echo json_encode($this->model('Api_model')->deleteData($_POST['id'],$_POST['table']));
            }
        }
    }
}
?>