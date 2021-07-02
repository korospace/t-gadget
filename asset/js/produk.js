
// ... URL ...
const API_URL  = $('span#api-url').data('url');
const BASE_URL = $('span#base-url').data('url');

/* 
    Windows on load
*/
window.addEventListener('load',function() {

    // ... remove loading animation
    document.querySelector('#divloader').classList.add('hidden');
    document.querySelector('body').classList.remove('overflow-hidden');
});

/* 
    API - get all data
*/
function getDataFromApi(url){
    return new Promise((resolve,rejected) => {
        let xhr  = new XMLHttpRequest();
        let code = new FormData();
        
        xhr.open('POST',url,true);

        code.append('code','031020');
        
        xhr.send(code);

        xhr.onload = () => {
            try{
                resolve(JSON.parse(xhr.responseText));
            }
            catch(err){
                rejected(Error("server error")); 
            }
        }
    })
}

/* 
... Count-down
*/
let resCountDown    = getDataFromApi(API_URL+'getCountDown');
let imageCountD     = document.querySelector('#img-popup');
let containerCountD = document.querySelector('#popup-container');
let doCountDown     = '';

resCountDown
    .then((result) => {
        let date = result.tgl.split('/');
        
        const countDown = () => {
            const dateX = new Date(`${date[2]}-${date[1]}-${date[0]}T00:00`).getTime();
            const now   = new Date().getTime();
            const gap   = dateX - now;
            
            document.querySelector('span#day').innerHTML    = Math.floor(gap/(1000*60*60*24)); 
            document.querySelector('span#hour').innerHTML   = Math.floor((gap%(1000*60*60*24))/(1000*60*60)); 
            document.querySelector('span#minute').innerHTML = Math.floor((gap%(1000*60*60))/(1000*60)); 
            document.querySelector('span#second').innerHTML = Math.floor((gap%(1000*60))/(1000)); 
        }
        
        doCountDown = setInterval(()=>countDown(), 1000);
        
        // .. open count-down
        imageCountD.src = result.imgurl;
        containerCountD.style.zIndex = '10002';
        containerCountD.classList.remove('hidden');
        containerCountD.classList.remove('z-min1');
        
    });

// .. close count-down
function closePopup(e,event){
    if(event.target.classList.contains('close')){
        clearInterval(doCountDown);
        containerCountD.style.zIndex = '-1';
        containerCountD.classList.add('hidden');
        containerCountD.classList.add('z-min1');
    }
}
    

/* 
    Categories
*/
let resCategories = getDataFromApi(API_URL+'getCategories');
resCategories
    .then( categories => {

        let btnCategories    = document.querySelector('#btn-kategori');
        let categoriesWraper = document.querySelector('#kategori-wraper');
        let divCategories    = categoriesWraper.querySelector('div');
        let el = `<span class="min-w-max h-full px-4 sm:px-6 md:px-8 flex jusify-center items-center border-b-2 md:border-b-4 border-myyellow cursor-pointer" href="semua kategori" onclick="catOnClick(this);">
            <h1 class="opacity-80 hover:opacity-100">semua kategori</h1>
        </span>`;

        categories.forEach( categoriy => {
            el += `<span class="min-w-max h-full px-4 sm:px-6 md:px-8 flex jusify-center items-center opacity-80 hover:opacity-100 cursor-pointer" href="${categoriy.kategori}" onclick="catOnClick(this);">
                <h1 class="opacity-80 hover:opacity-100">${categoriy.kategori}</h1>
            </span>`
            divCategories.innerHTML = el;
        });

        // .. btnCategories ONCLICK
        btnCategories.addEventListener('click', () => {
            categoriesRise();
        });

        // .. categories RISE
        if(window.innerWidth <= 411)categoriesRise();
        function categoriesRise(){
            btnCategories.classList.toggle('bg-btn-kategori');
            'border-t pb-0.5 h-12 sm:h-17 md:h-20 h-0'.split(' ').forEach(e => {
                categoriesWraper.classList.toggle(e);
            })
            divCategories.classList.toggle('hidden');
            divCategories.classList.toggle('opacity-0');
            setTimeout(() => {
                categoriesWraper.classList.toggle('overflow-hidden');
            }, 100);
        }
        
    });

    // .. categoriy ONCLICK
    function catOnClick(thisEl){
        'border-b-2 md:border-b-4 border-myyellow'.split(' ').forEach(cls => {
            document.querySelectorAll('#kategori-wraper span').forEach(span => {
                span.classList.remove(cls);
            })
        });
        'border-b-2 md:border-b-4 border-myyellow'.split(' ').forEach(cls => {
            thisEl.classList.add(cls)
        })
    }



/*
.. ARRAY Master
*/
let arrMaster = {
    arrKategori : [],
    arrKeyword : [],
    arrProduk : [],
}

/*
.. CREATE Array
*/
let arrkat = [];
function createArray(value,arrName){
    // if(arrMaster[arrName].length == 0){
    //     arrMaster[arrName].push(value);
    // }else{        
    //     let isExist = arrMaster[arrName].find(aN => {
    //         value == aN;
    //     });

    //     if(!isExist)arrMaster[arrName].push(value);
    // }
}

/* 
    Product - get all
*/
let resProducts = getDataFromApi(API_URL+'getProduk');

resProducts
    .then((products) => {
        products.forEach(produk => {
            produk.keyword.split('|').forEach(key => {
                createArray(key,'arrKeyword');
                arrkat.push(key);
            })
        });
        console.log(arrMaster.arrKeyword);
        console.log(arrkat);
    });
