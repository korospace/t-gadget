<?php

class Api_model{
    public $db;
    
    public function __construct()
    {
        $this->db = new Database;
    }

    /* 
        CountDown - get data
    */
    public function getCountDown(){
        $this->db->query("SELECT * FROM popup");
        return $this->db->singleResult();
    }
    public function getPopup(){
        $this->db->query("SELECT * FROM popup");
        return $this->db->singleResult();
    }

    /* 
        Testimonies - get data
    */
    public function getTestimonies(){
        $this->db->query("SELECT * FROM testimoni ORDER BY id DESC");
        return $this->db->multiResult();
    }

    /* 
        Testimonies - update data 
    */
    public function testimoni($imgUrl){
        if($imgUrl !== null){
            $this->db->query("INSERT INTO testimoni VALUES(0,:imgurl)");
            $this->db->bind('imgurl',$imgUrl);
            $this->db->execute();
        }else{
            $this->db->query("SELECT * FROM testimoni ORDER BY id DESC");
            return $this->db->multiResult();
        }
    }

    /* 
        Banners - get data
    */
    public function getBanners(){
        $this->db->query("SELECT * FROM spanduk ORDER BY id DESC");
        return $this->db->multiResult();
    }

    /* 
        Banners - edit data
    */
    public function spanduk($imgUrl){
        if($imgUrl !== null){
            $this->db->query("INSERT INTO spanduk VALUES(0,:imgurl)");
            $this->db->bind('imgurl',$imgUrl);
            $this->db->execute();
        }else{
            $this->db->query("SELECT * FROM spanduk ORDER BY id DESC");
            return $this->db->multiResult();
        }
    }

    /* 
        Get Admin
    */
    public function getAdmin($username = null){
        if($username){
            $this->db->query("SELECT * FROM admin WHERE username = :username");
            $this->db->bind('username',$username);
        }else{
            $this->db->query("SELECT * FROM admin");
        }
        return $this->db->singleResult();
    }

    /* 
        PRODUK - get data
    */
    public function getProducts(){
        $this->db->query("SELECT * FROM produk ORDER BY id DESC");
        return $this->db->multiResult();
    }

    /* 
        Get Detil Produk
    */
    public function getDetilProduk($id,$namaProduk){
        if($namaProduk !== null)
        {
            $this->db->query("SELECT * FROM produk WHERE nama = :namaProduk");
            $this->db->bind('namaProduk',$namaProduk);    
        }
        else
        {
            $this->db->query("SELECT * FROM produk WHERE id = :id");
            $this->db->bind('id',$id);
        }
        return $this->db->singleResult();
    }

    /* 
        Get Partly Produk
    */
    public function getPartlyProduk($offset,$kategori,$keyword){
        if($kategori !== ""){
            if($offset != null){
                $this->db->query("SELECT * FROM produk WHERE kategori=:kategori LIMIT 5 OFFSET $offset");
            }else{
                $this->db->query("SELECT * FROM produk WHERE kategori=:kategori LIMIT 10");
            }
            $this->db->bind('kategori',$kategori);
        }
        else if($keyword !== ""){
            if($offset != null){
                $this->db->query("SELECT * FROM produk WHERE keyword LIKE :keyword LIMIT 5 OFFSET $offset");
            }else{
                $this->db->query("SELECT * FROM produk WHERE keyword LIKE :keyword LIMIT 10");
            }
            $this->db->bind('keyword',"%$keyword%");
        }
        else{
            if($offset != null){
                $this->db->query("SELECT * FROM produk LIMIT 5 OFFSET $offset");
            }else{
                $this->db->query("SELECT * FROM produk LIMIT 10");
            }
        }
        return $this->db->multiResult();
    }

    /* 
        Get Kategori Produk
    */
    public function getKategori(){
        $this->db->query("SELECT kategori FROM produk");
        return $this->db->multiResult();
    }

    /* 
        Edit Popup
    */
    public function editPopup($data,$imgUrl){

        $this->db->query("UPDATE popup SET imgUrl = :imgUrl, tgl = :tgl WHERE id = :id");
        
        $this->db->bind('id',$data['id']);
        $this->db->bind('imgUrl',$imgUrl);
        $this->db->bind('tgl',$data['tgl']);

        $this->db->execute();
    }
    
    /* 
        Edit Admin
    */
    public function editAdmin($data){
        $passLama = $this->getAdmin(null)['PASSWORD'];

        $this->db->query("UPDATE admin SET username = :username, PASSWORD = :password WHERE id = :id");
        
        $this->db->bind('id',$data['id']);
        $this->db->bind('username',$data['username']);
        if($data['password'] === $passLama){
            $this->db->bind('password',$data['password']);
        }else{
            $this->db->bind('password',password_hash($data['password'],PASSWORD_DEFAULT));
        }

        $this->db->execute();
        return 'edit berhasil!!';
    }

    /* 
        Edit Produk
    */
    public function tambahEditProduk($data,$imgUrl,$id){
        $status = '';
        $fotoPath = BASE_URL.'asset/img/imgProduk/default.jpg';
        
        if($imgUrl !== null){
            $this->db->query("UPDATE produk SET imgurl=:imgUrl WHERE id=:id");
            $this->db->bind('id',$data['id']);
            $this->db->bind('imgUrl',$imgUrl);
        }
        else
        {
            if($id !== null){
                $this->db->query("UPDATE produk SET 
                    nama=:nama,
                    harga=:harga,
                    kategori=:kategori,
                    isipaket=:isipaket,
                    spesifikasi=:spesifikasi,
                    fitur=:fitur,
                    deskripsi=:deskripsi,
                    keyword=:keyword,
                    stok=:stok,
                    linktp=:linktp,
                    linksp=:linksp,
                    linklz=:linklz WHERE id=:id"
                );

                $this->db->bind('id',$data['id']);
                $this->db->bind('nama',$data['nama_produk']);
                $this->db->bind('harga',$data['harga_produk']);
                $this->db->bind('kategori',$data['kategori']);
                $this->db->bind('isipaket',$data['isipaket']);
                $this->db->bind('spesifikasi',$data['spesifikasi']);
                $this->db->bind('fitur',$data['fitur']);
                $this->db->bind('deskripsi',$data['deskripsi']);
                $this->db->bind('keyword',$data['keyword']);
                $this->db->bind('stok',$data['stok']);
                $this->db->bind('linktp',$data['linktp']);
                $this->db->bind('linksp',$data['linksp']);
                $this->db->bind('linklz',$data['linklz']);
                $status = 'edit berhasil!!';            
            }else{
                $this->db->query("INSERT INTO produk VALUES (0,:nama,:harga,:kategori,:isipaket,:spesifikasi,:fitur,:deskripsi,'$fotoPath',:keyword,0,:stok,0,:linktp,0,:linksp,0,:linklz,0)");

                $this->db->bind('nama',$data['nama_produk']);
                $this->db->bind('harga',$data['harga_produk']);
                $this->db->bind('kategori',$data['kategori']);
                $this->db->bind('isipaket',$data['isipaket']);
                $this->db->bind('spesifikasi',$data['spesifikasi']);
                $this->db->bind('fitur',$data['fitur']);
                $this->db->bind('deskripsi',$data['deskripsi']);
                $this->db->bind('keyword',$data['keyword']);
                $this->db->bind('stok',$data['stok']);
                $this->db->bind('linktp',$data['linktp']);
                $this->db->bind('linksp',$data['linksp']);
                $this->db->bind('linklz',$data['linklz']);
                $status = 'berhasil ditambah!!';            
            }
        }
        
        $this->db->execute();
        return $status;
    }

    /* 
        Statistik - get data
    */
    public function getStatistic(){
        $this->db->query("SELECT count(nama) AS nilai FROM produk");
        $jmlProduk['atribut'] =  "jmlProduk";
        $jmlProduk['nilai']   =  $this->db->multiResult()[0]['nilai'];
        
        $this->db->query("SELECT atribut,nilai FROM statistik");
        $statistik   = $this->db->multiResult();
        $statistik[] = $jmlProduk;
        
        return $statistik;
    }

    /* 
        Statistik - update
    */
    public function updateStatistic($atribut,$id){
        // .. product statistic
        if($id != null){
            $this->db->query("UPDATE produk SET dilihat = dilihat+1 WHERE id=:id");
            $this->db->bind('id',$id);
            $this->db->execute();
        }
        // .. visitors and etc
        else{
            $this->db->query("UPDATE statistik SET nilai = nilai+1 WHERE atribut=:atribut");
            $this->db->bind('atribut',$atribut);
            $this->db->execute();
            
            return "success update statistic !";
        }
    }
    
    /* 
    Delete Data
    */
    public function deleteData($id,$table){
        $this->db->query("DELETE FROM $table WHERE id = :id");
        $this->db->bind('id',$id);
        return $this->db->execute();
    }

}

?>