
// ... remove loading animation
setTimeout(() => {
    document.querySelector('#divloader').classList.add('hidden');
    document.querySelector('body').classList.remove('overflow-hidden');
}, 400);

/*
.. Object of array
*/
let arrMaster = {
    arrKategori : [],
    arrKeyword : [],
    arrProduk : [],
}

/*
.. Create Array
*/
function createArray(xx,arrName){
    if(arrMaster[arrName].length == 0){
        arrMaster[arrName].push(xx);
    }else{        
        let sama = false;

        arrMaster[arrName].forEach(aN => {
            if(arrName == 'arrProduk'){
                if(xx.id == aN.id)sama = true;
            }else{
                if(xx == aN)sama = true;
            }
        });

        if(!sama)arrMaster[arrName].push(xx);
    }
}

/*
.. Get data
*/
function getData(method){
    $.ajax({
        url: API_URL+method,
        method: 'post',
        data: {code:'031020'},
        success: (dataBack) => {
            let response = JSON.parse(dataBack);
            if(method=='spanduk')createBanner(response);
            if(method=='getKategori')getCategory(response);
            if(method=='getKeyword')getKeyword(response);
            if(method=='getPopup')getPopup(response);
        }
    });
}

/*
.. Banner On Hover
*/
$("div.glide").mouseenter(()=>$('.glide__arrow').toggleClass('active'));
$("div.glide").mouseleave(()=>$('.glide__arrow').toggleClass('active'));

/*
.. Categories Container Rise
*/
if(window.innerWidth <= 411)categoryRise();
function categoryRise(){
    // container up/down
    $('#btn-kategori').toggleClass('bg-btn-kategori');
    $("#kategori-wraper").toggleClass('border-t pb-0.5 h-12 sm:h-17 md:h-20 h-0');
    // span rise/hide
    let [a,b,c] = ['hidden','opacity-0','opened']
    if($("#kategori-wraper div").hasClass('opaned'))[a,b,c] = [b,a,c];
    $("#kategori-wraper div").toggleClass(a,c);
    setTimeout(()=>$("#kategori-wraper div").toggleClass(b,c), 300);
}

/*
.. Bth Category On Click
*/
$('#btn-kategori').click(()=>categoryRise());

/*
.. Get Category Produk
*/
getData('getKategori');
function getCategory(response){
    // .. create Array Kategori 
    response.forEach(r=>createArray(r.kategori,'arrKategori'));
    // .. Create Categori Wraper
    insertCategory(arrMaster['arrKategori']);
}

/*
.. Insert Category
*/
function insertCategory(arrKategori){
    arrKategori.forEach(e=>$('nav #kategori-wraper div').append(`<span class="min-w-max h-full px-4 sm:px-6 md:px-8 flex jusify-center items-center opacity-80 hover:opacity-100 cursor-pointer" href="${e}" onclick="catOnClick(this,event);"><h1 class="opacity-80 hover:opacity-100">${e}</h1></span>`));
}

/*
.. Categories On Click
*/
let kategori = "";
function catOnClick(e,event,logoSearch = false,lC = false){
    // Remove active class
    listCLicked = lC;
    $('#kategori-wraper span').removeClass('border-b-2 md:border-b-4 border-myyellow');
    if(logoSearch)return 0;
    event.preventDefault();
    // Clear Search
    clearSearchInput();
    // Add active class
    let classAdd = ['border-b-2','md:border-b-4','border-myyellow'];
    classAdd.forEach(cA=>e.classList.add(cA));
    // Get product by category
    ($('#btn-load-more').parent().hasClass('hidden')) ? $('#btn-load-more').parent().removeClass('hidden') : '';
    (e.getAttribute('href') !== 'semua kategori') ? kategori = e.getAttribute('href') : kategori = '';
    (keyword !== '') ? keyword = '' : '';
    getPartlyProduk();
}

/*
.. Get Keyword
*/
getData('getKeyword');
function getKeyword(response){
    // .. create Array keyword 
    response.forEach(r => {
        r.keyword.split('|').forEach(rK => {
            createArray(rK,'arrKeyword');
        })
    });
}

/*
.. List Keyword On Click
*/
let keyword = "";
let listCLicked = false;
function listOnClick(e){
    catOnClick('','',true,true);
    $('input#keyword').val(e.dataset.value);
    ($('#btn-load-more').parent().hasClass('hidden')) ? $('#btn-load-more').parent().removeClass('hidden') : '';
    keyword = e.dataset.value;
    (kategori !== '') ? kategori = '' : '';
    getPartlyProduk();
}

/*
.. Hide List of Keyword 
*/
$(window).click(function(){
    $('#items-keyword').html("");
    $('#kategori-wraper').removeClass('overflow-hidden').addClass('overflow-auto');
});

/*
.. Clear Word in Input 
*/
function clearSearchInput(){
    $('input#keyword').val('');
    $('label[for=keyword] img').attr('src',BASE_URL+'asset/img/search.svg').css('opacity','1');
}

/*
.. Btn-Search On Click 
*/
$('label[for=keyword]').click(function(){
    clearSearchInput();
    ($('#btn-load-more').parent().hasClass('hidden')) ? $('#btn-load-more').parent().removeClass('hidden') : '';
    if(listCLicked){
        catOnClick('','',true,false);
        $('#kategori-wraper span:nth-child(1)').addClass('border-b-2 md:border-b-4 border-myyellow').removeClass('opacity-80 hover:opacity-100');
        (keyword !== '') ? keyword = '' : '';
        (kategori !== '') ? kategori = '' : '';
        getPartlyProduk();
    }
});

/*
.. Search Produk
*/
$('input#keyword').keyup(function(){
    
    // .. Create list of datalist
    let el = '';
    if($(this).val() == ""){
        $('#items-keyword').html("");
        $('#kategori-wraper').removeClass('overflow-hidden').addClass('overflow-auto');
        $('label[for=keyword] img').attr('src',BASE_URL+'asset/img/search.svg').css('opacity','1');
        return 0;
    }else{
        arrMaster['arrKeyword'].forEach(e => {
            if(e.includes($(this).val()))el += `<li class="block w-full text-left px-3 py-3 sm:py-6 cursor-pointer hover:bg-btn-kategori"  style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${e}" onclick="listOnClick(this);">${e}</li>`;
        });
        $('label[for=keyword] img').attr('src',BASE_URL+'asset/img/cancel.svg').css('opacity','0.8');
        $('#kategori-wraper').removeClass('overflow-auto').addClass('overflow-hidden');
    }

    $('#items-keyword').html(el);
    $('#items-keyword').append(`<li class="block w-full text-left px-3 py-3 sm:py-6 cursor-pointer hover:bg-btn-kategori"  style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${$(this).val()}" onclick="listOnClick(this);">cari "${$(this).val()}"</li>`);
});

/*
.. Get Partly Produk
*/
function getPartlyProduk(){
    if(!$('#produk-container').hasClass('mt-8 mb-24 sm:mb-32'))$('#produk-container').addClass('mt-8 mb-24 sm:mb-32');
    if(!$('#notfound').hasClass('hidden'))$('#notfound').addClass('hidden');
    if(!$('#div-load-more').hasClass('hidden'))$('#div-load-more').addClass('hidden');
    createLoadingCard();
    doAjaxProduct();
    
}
getPartlyProduk(null,null);

/* 
... Load More Produk
*/
function loadMore(e,event){
    event.preventDefault();
    e.firstElementChild.classList.toggle('hidden');
    e.lastElementChild.classList.toggle('hidden');
    doAjaxProduct($('#produk-wraper a').length,e);
}

/*
.. Create Loading Card
*/        
function createLoadingCard(){
    let el = '';
    let x = 0;
    if(window.innerWidth >= 1024)x = 5;
    else if(window.innerWidth <= 1024 && window.innerWidth >= 641)x = 4;
    else x = 2;
    for (let i = 0; i < x; i++) {
        el += elementCard();
    }
    $('#produk-wraper').html(el);

}

/*
.. Get Partly Produk
*/
function doAjaxProduct(offset = null,e=null){
    $.ajax({
        url: API_URL+'getPartlyProduk/',
        data:{
            code:'031020',
            offset:offset,
            kategori:kategori,
            keyword:keyword,
        },
        method: 'post',
        success: (dataBack) => {
            let response = JSON.parse(dataBack);
            
            if(e !== null){
                e.firstElementChild.classList.toggle('hidden');
                e.lastElementChild.classList.toggle('hidden');
                if(response.length <= 0){
                    e.firstElementChild.innerHTML = 'No More Product';
                    e.firstElementChild.classList.remove('border-b-2');
                    setTimeout(() => {
                        e.firstElementChild.innerHTML = 'load more';
                        e.firstElementChild.classList.add('border-b-2');
                        e.parentElement.classList.add('hidden');
                    }, 2000);
                    return 0;
                }
            }else{
                if(response.length < 10){    
                    if(!$('#div-load-more').hasClass('hidden')){
                        $('#div-load-more').addClass('hidden')
                    }
                }
                if(response.length >= 10){    
                    $('#div-load-more').removeClass('hidden');
                }
            }

            createProdukCard(response,response.length);
        }
    });
}

/*
.. Create Product 
*/
function createProdukCard(response,totProduk){
    response.forEach(r => {
        // .. create Array Produk 
        createArray(r,'arrProduk');
        // .. modif harga
        let harga = createHarga(r.harga);
        // .. Create Produk Card
        $('#produk-wraper').append(elementCard(r.id,harga,r.imgurl,r.nama));
    });
    // remove loading card
    $('.loadingCard').remove();
    // alert not found
    if(totProduk <= 0){    
        $('#notfound').removeClass('hidden');
        $('#produk-container').removeClass('mt-8 mb-24 sm:mb-32');
    }
}

/*
.. Create Card ELement 
*/
function elementCard(id = null, harga = null,img = null, nama = null){
    let hargax = '';let namax = '';
    (harga != null) ? hargax = harga : hargax = '000.000'; 
    (nama != null) ? namax = nama : namax = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit';
    return `<a href="" class="${(id == null) ? 'loadingCard' : ''} bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);" data-id="${id}" ${(id !== null) ? 'onclick="cardClick(this,event);"' : ''}><span class="span-harga bg-black px-2 py-1 absolute z-30 top-0 right-0 text-myyellow text-myxs mysm:text-sm sm:text-xs" style="min-width: max-content;">Rp ${hargax}</span><div class="relative p-3 mymd:p-4 img-wraper w-full flex-1 flex justify-center items-center"><img class="w-full" src="${BASE_URL}asset/img/bgproduk.webp" alt=""><img src="${BASE_URL}asset/img/loading.svg" class="absolute w-8 sm:w-12 opacity-80"><div class="bg-white w-full absolute ${(img !== null) ? 'z-20' : 'z-min1'}"><img class="w-full" src="${img}" alt="${namax}"></div></div><div class="name-wraper bg-myyellow px-3 pt-3 pb-2 text-myxs mysm2:text-xs mysm:text-base sm:text-sm md:text-base mymd:text-sm text-left text-black"><span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${namax}</span></div></a>`
}

/*
.. Create Price 
*/
function createHarga(rHarga){
    let j = 1;
    let hargav2 = '';
    let hargav3 = '';
    for(let i = [...rHarga].length-1;i >= 0; i--){
        if(j==4){
            hargav2 += '.'+[...rHarga][i];j=1;
        }else{
            hargav2 += [...rHarga][i];
        }
        j++;
    }
    for(let i = hargav2.length-1;i >= 0; i--){
        hargav3 += hargav2[i];
    }
    return hargav3;
}

/* 
... Close Popup
*/
function closePopup(e,event){
    if(event.target.classList.contains('close')){
        $('#popup-container').css('z-index','-1').addClass('hidden z-min1')
    }
}

/* 
... Countdown Popup
*/
getData('getPopup');
function getPopup(response){
    let dateTarget = response.tgl.split('/');
        
    const countDown = () => {
        const countDate = new Date(`${dateTarget[2]}-${dateTarget[1]}-${dateTarget[0]}T00:00`).getTime();
        const now = new Date().getTime();
        const gap = countDate - now;
        $('span#day').html(Math.floor(gap/(1000*60*60*24)));
        $('span#hour').html(Math.floor((gap%(1000*60*60*24))/(1000*60*60)));
        $('span#minute').html(Math.floor((gap%(1000*60*60))/(1000*60)));
        $('span#second').html(Math.floor((gap%(1000*60))/(1000)));
    }

    setInterval(()=>countDown(), 1000);

    setTimeout(() => {   
        $('#popup-container').css('z-index','10002').removeClass('hidden z-min1');
        $('#img-popup').attr('src',response.imgurl);
    }, 2000);
}

/* 
... Card On Click
*/
let linktp = '';
let linksp = '';
let linklz = '';
let linkwa = 'https://mywa.link/3xwr4ga2';
function cardClick(e,event){
    event.preventDefault();
    // update data dilihat
    updateStat(null,null,null,'dilihat',e.dataset.id);
    // open modal box
    $('#detail-container').toggleClass('hidden z-min1 z-10002');
    $('section').toggleClass('overflow-hidden overflow-auto');
    setTimeout(() => {
        $('#detail-wraper').toggleClass('h-0 h-full');
        setTimeout(() => {
            resizeDescBag1();
            $('#close-detail').removeClass('opacity-0').addClass('opacity-70');
            $('#img-wraper').removeClass('opacity-0');
            $('#deskription-wraper1').removeClass('opacity-0');
        }, 300);
    }, 20);
    // get detil
    arrMaster['arrProduk'].forEach(p=>{
        if(p.id === e.dataset.id){
            $('#img-product').attr('src',p.imgurl);
            let status = "";
            (p.stok === '1') ? status = 'Ready stok' : status = 'Stok habis';
            $('#status').html(status);
            $('#nama').html(p.nama);
            $('#harga').html("Rp. "+createHarga(p.harga));
            $('#text-deskripsi').html(p.deskripsi);
            let isipaket = '';
            p.isipaket.split('|').forEach(e =>isipaket += `<li>${e}</li>`);
            $('#isipaket ul').html(isipaket);
            let fitur = '';
            p.fitur.split('|').forEach(e =>fitur += `<li>${e}</li>`);
            $('#fitur ul').html(fitur);
            let spesifikasi = '';
            p.spesifikasi.split('|').forEach(e =>spesifikasi += `<li>${e}</li>`);
            $('#spesifikasi ul').html(spesifikasi);
            (p.linktp !== '') ? linktp = p.linktp : linktp = 'saat ini tidak tersedia';
            (p.linktp !== '') ? $('#btn-link-tokped').attr('onclick',`updateStat(el=null,event=null,'${p.linktp}','tokopedia','${p.id}');`) : $('#btn-link-tokped').attr('onclick','return alert("maaf, saat ini barang tidak tersedia di tokopedia");');
            (p.linksp !== '') ? linksp = p.linksp : linksp = 'saat ini tidak tersedia';
            (p.linksp !== '') ? $('#btn-link-shopee').attr('onclick',`updateStat(el=null,event=null,'${p.linksp}','shopee','${p.id}');`) : $('#btn-link-shopee').attr('onclick','return alert("maaf, saat ini barang tidak tersedia di shopee");');
            (p.linklz !== '') ? linklz = p.linklz : linklz ='saat ini tidak tersedia';
            (p.linklz !== '') ? $('#btn-link-lazada').attr('onclick',`updateStat(el=null,event=null,'${p.linklz}','lazada','${p.id}');`) : $('#btn-link-lazada').attr('onclick','return alert("maaf, saat ini barang tidak tersedia di lazada");');
            (linkwa !== '') ? $('#btn-link-wa').attr('onclick',`updateStat(el=null,event=null,'${linkwa}','whatsapp','${p.id}');`) : $('#btn-link-wa').attr('onclick','return alert("maaf, saat ini barang tidak tersedia di whatsapp");');
        }
    });

    if(window.innerWidth <= 640){
        document.querySelector('#deskription-wraper3 #bag-2').style.height = document.querySelector('#deskription-wraper3 #bag-2 #wraper').clientHeight+50+"px"; 
    }
    
}

/* 
... Close Card
*/
function closeDetail(){
    zoomClicked = false; 
    $('#close-detail').removeClass('opacity-70').addClass('opacity-0');
    $('#img-wraper').addClass('opacity-0');
    $('#deskription-wraper1').addClass('opacity-0');
    setTimeout(() => {
        $('#detail-wraper').toggleClass('h-0 h-full');
        setTimeout(() => {
            $('#detail-container').toggleClass('hidden z-min1 z-10002');
            $('section').toggleClass('overflow-hidden overflow-auto');
        }, 300);
    }, 300);
    descriptionDown();
    if(window.innerWidth <= 640){
        document.querySelector('#deskription-wraper1').style.height = "50px"; 
    }
}

/* 
... Swipe on click
*/
$('#swipe').on('click',function(){
    if(!document.querySelector('#deskription-wraper2').classList.contains('active')){
        $('#deskription-wraper1').css('height','75%');
        $('#bg-scroll').removeClass('opacity-0');
        $('#arrow').removeClass('rotate-180');
        document.querySelector('#deskription-wraper2').classList.add('active');
        if(zoomClicked)zoomClicked = false;        
    }
    else{
        descriptionDown();
    }
});

function descriptionDown(){
    resizeDescBag1();
    $('#bg-scroll').addClass('opacity-0');
    $('#arrow').addClass('rotate-180');
    document.querySelector('#deskription-wraper2').classList.remove('active');
}

function resizeDescBag1(){
    if(window.innerWidth <= 640){
        document.querySelector('#deskription-wraper1').style.height = document.querySelector('#deskription-wraper3 #bag-1').clientHeight+document.querySelector('#deskription-wraper2 #swipe').clientHeight+"px"; 
    }
}

/* 
... zoom product image
*/
let zoomClicked = false;
function zoomProduct(e){
    if(window.innerWidth>641)return 0;
    if(!zoomClicked){
        document.querySelector('#deskription-wraper1').style.height = document.querySelector('#deskription-wraper2 #swipe').clientHeight+"px"; 
        $('#bg-scroll').addClass('opacity-0');
        $('#arrow').addClass('rotate-180');
        document.querySelector('#deskription-wraper2').classList.remove('active');
        zoomClicked = true;
    }else{
        document.querySelector('#deskription-wraper1').style.height = document.querySelector('#deskription-wraper3 #bag-1').clientHeight+document.querySelector('#deskription-wraper2 #swipe').clientHeight+"px"; 
        zoomClicked = false;        
    }
}

/* 
... link for buy
*/
function linkBuy(){
    $('#buy-container').removeClass('z-min1 opacity-0').addClass('z-30');
    $('#buy-wraper1').removeClass('opacity-0 w-24').addClass('w-72');
    $('#link-tokped').html(linktp);
    $('#link-shopee').html(linksp);
    $('#link-lazada').html(linklz);
    $('#link-wa').html(linkwa);
}

/* 
... close buy
*/
function closeBuy(e,event){
    if(!event.target.classList.contains('close'))return 0;
    $('#buy-container').removeClass('z-30').addClass('z-10 opacity-0');
    $('#buy-wraper1').removeClass('w-72').addClass('opacity-0 w-24');
    $('#link-tokped').html('');
    $('#link-shopee').html('');
    $('#link-lazada').html('');
    $('#link-wa').html('');
}

/*
.. Set Banner Min Height
*/
document.querySelector('.glide').style.height = document.querySelector('.bannerTumbal').clientHeight+'px';

/*
.. Create Banner
*/
getData('spanduk');
function createBanner(response){
    response.forEach(r=>$('.glide__track .glide__slides').append(`<div class="glide__slide">
            <img src="${r.imgurl}" class="w-full h-28 mysm2:h-32 mysm:h-44 sm:h-auto">
        </div>`));

    var glide = new Glide('.glide', {
        type: 'carousel',
        focusAt: 'center',
        autoplay: 5000,
        animationTimingFunc: 'ease-in-out',
        animationDuration: 1000,
        gap: 0,
        perView: 1
    });

    glide.mount();
}


/* 
    Banner
*/
let glide = document.querySelector('.glide');

// .. Set Banner Min Height
glide.style.height = document.querySelector('.bannerTumbal').clientHeight+'px';

// .. Insert banner img
let resBanners = getDataFromApi(API_URL+'/getBanners');

resBanners.then( (banners) => {
    
    console.log(banners);
    
    banners.forEach( (banner) => {
        $('.glide__track .glide__slides').append(`<div class="glide__slide">
            <img src="${banner.imgurl}" class="w-full h-28 mysm2:h-32 mysm:h-44 sm:h-auto">
        </div>`)
    });

    new Glide('.glide', {
        type: 'carousel',
        focusAt: 'center',
        autoplay: 5000,
        animationTimingFunc: 'ease-in-out',
        animationDuration: 1000,
        gap: 0,
        perView: 1
    }).mount();

    // .. Banner On Hover
    let divGlide   = document.querySelector('div.glide');
    let glideArrow = document.querySelectorAll('.glide__arrow');

    divGlide.addEventListener('mouseenter', () => {
        glideArrow.forEach( e => {
            e.classList.toggle('active');
        });
    });
    divGlide.addEventListener('mouseleave', () => {
        glideArrow.forEach( e => {
            e.classList.toggle('active');
        });
    });
});