
// ... URL ...
const API_URL  = $('span#api-url').data('url');
const BASE_URL = $('span#base-url').data('url');

/* 
    Window on LOAD
*/
window.addEventListener('load', () => {
    // ... remove loading animation
    document.querySelector('#divloader').classList.add('hidden');
    document.querySelector('body').classList.remove('overflow-hidden');
    if(!navigator.onLine){
        showError("Ups, connection lost!",true);
    }
});

/* 
    API - get all data
*/
function getDataFromApi(url){
    return new Promise((resolve,rejected) => {
        let xhr  = new XMLHttpRequest();
        let code = new FormData();
        
        xhr.open('POST',url,true);
        
        xhr.timeout   = 60000;
        xhr.ontimeout = () => { 
            rejected(Error("Ups, request timeout!")); 
            return 0;
        }

        code.append('code','031020');
        
        xhr.send(code);

        xhr.onload = () => {
            try{
                resolve(JSON.parse(xhr.responseText));
            }
            catch(err){
                rejected(Error("Ups, server error!")); 
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

        imageCountD.onload = () => {
            imageCountD.previousElementSibling.remove();
        }
        
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
.. ARRAY Master
*/
let arrMaster = {
    arrCategories : [],
    arrKeywords   : [],
    arrProducts   : [],
}

/*
.. CREATE Array
*/
function createArray(value,arrName){
    if(arrMaster[arrName].length == 0){
        arrMaster[arrName].push(value);
    }else{        
        let isExist = arrMaster[arrName].find(el => value == el);

        (!isExist) ? arrMaster[arrName].push(value) : '';
    }
}

/* 
    Product - get all
*/

// .. create loading card
let productsWraper = document.querySelector('#produk-wraper');
let lastCard       = productsWraper.lastElementChild;
let total = 10;
if(window.innerWidth < 1024) total = 8;
if(window.innerWidth < 640) total  = 4;

for (let i = 1; i <= total; i++) {
    let rawCard = `<a href="" class="loadingCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);">
        <span class="span-harga bg-black px-2 py-1 absolute z-30 top-0 right-0 text-myyellow text-myxs mysm:text-sm sm:text-xs" style="min-width: max-content;">Rp 000.000</span>
        <div class="relative p-3 mymd:p-4 img-wraper w-full flex-1 flex justify-center items-center">
            <img class="w-full animate-pulse" src="${BASE_URL}asset/img/bgproduk.webp" alt="">
            <img src="${BASE_URL}asset/img/loading.svg" class="absolute w-8 sm:w-12 opacity-80">
        </div>
        <div class="name-wraper bg-myyellow px-3 pt-3 pb-2 text-myxs mysm2:text-xs mysm:text-base sm:text-sm md:text-base mymd:text-sm text-left text-black">
            <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">Please wait . . .</span>
        </div>
    </a>`;

    htmlToElements(rawCard).forEach(e => {
        productsWraper.insertBefore(e,lastCard);
    });
}

let resProducts = getDataFromApi(API_URL+'getProduk');
let divLoadMore = document.querySelector('#div-load-more');
let btnLoadMore = divLoadMore.querySelector('a');

resProducts
    .then((products) => {

        /* 
            Create array
        */
        products.forEach(product => {
            // Array categories
            createArray(product.kategori,'arrCategories');
            // Array keywords
            product.keyword.split('|').forEach(key => {
                createArray(key,'arrKeywords');
            });
            // Array products
            createArray(product,'arrProducts');
        });

        /* 
            Categories
        */
        let btnCategories    = document.querySelector('#btn-kategori');
        let categoriesWraper = document.querySelector('#kategori-wraper');
        let divCategories    = categoriesWraper.querySelector('div');
        let category         = "";
        
        // .. create span category
        let el = `<span class="min-w-max h-full block border-b-2 md:border-b-4 border-myyellow cursor-pointer" href="semua kategori">
            <h1 class="h-full flex jusify-center items-center px-4 sm:px-6 md:px-8 opacity-80 hover:opacity-100">semua kategori</h1>
        </span>`;

        arrMaster.arrCategories
            .sort((a,b) => a.length - b.length)
            .forEach( categoriy => {
                el += `<span class="min-w-max h-full block opacity-80 hover:opacity-100 cursor-pointer" href="${categoriy}">
                    <h1 class="h-full flex jusify-center items-center px-4 sm:px-6 md:px-8 opacity-80 hover:opacity-100">${categoriy}</h1>
                </span>`
                divCategories.innerHTML = el;
            });

        // .. btnCategories ONCLICK
        btnCategories.addEventListener('click', () => {
            categoriesRise();
        });

        // .. categories RISE
        if(window.innerWidth <= 411){
            categoriesRise();
            document.querySelector('section').classList.remove('pt-16');
            document.querySelector('section').classList.add('pt-32');
            document.querySelector('#produk-container').classList.remove('mt-8');
            document.querySelector('#produk-container').classList.add('mt-4');
        };

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

        // .. span category ONCLICK
        divCategories.querySelectorAll('span').forEach(span => {
            span.addEventListener('click',(e) =>{
                let thisSpan = e.target.parentElement;
                category     = thisSpan.getAttribute('href');
                btnLoadMore.setAttribute('data-loadby','kategori');

                'border-b-2 md:border-b-4 border-myyellow'.split(' ').forEach(cls => {
                    document.querySelectorAll('#kategori-wraper span').forEach(span => {
                        span.classList.remove(cls);
                    })
                });
                'border-b-2 md:border-b-4 border-myyellow'.split(' ').forEach(cls => {
                    thisSpan.classList.add(cls)
                });

                createCardByCategory(0,category);
            })
        })

        /*
            Search Produk
        */
        let inputKeyword = document.querySelector('input#keyword'); 
        let keysWraper   = document.querySelector('#items-keyword');
        let searchIcon   = document.querySelector('label[for=keyword] img');
        let keyword      = "";
        
        // .. input ON SEARCH
        inputKeyword.addEventListener('keyup',() => {
            let el = '';

            if(inputKeyword.value === ""){
                keysWraper.innerHTML = "";
                searchIcon.style.opacity = '1';
                searchIcon.src = BASE_URL+'asset/img/search.svg';
            }else{
                arrMaster.arrKeywords
                    .sort((a,b) => a.length - b.length)
                    .forEach(key => {
                        if(key.includes(inputKeyword.value)){
                            el += `<li class="keyword-list block w-full text-left px-3 py-3 sm:py-6 cursor-pointer hover:bg-btn-kategori"  style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${key}">${key}</li>`;
                        }
                    });
                searchIcon.style.opacity = '0.8';
                searchIcon.src = BASE_URL+'asset/img/cancel.svg';
                el += `<li class="keyword-list block w-full text-left px-3 py-3 sm:py-6 cursor-pointer hover:bg-btn-kategori"  style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${inputKeyword.value}">Cari "${inputKeyword.value}"</li>`;
            }
            keysWraper.innerHTML = el;
        });

        // .. keyword list ON CLICK
        window.addEventListener('click',(e) => {
            if(!e.target.classList.contains('inputKeyword')){
                keysWraper.innerHTML = "";
            }
            if(e.target.classList.contains('keyword-list')){
                keyword = e.target.dataset.value;
                keysWraper.innerHTML = "";
                inputKeyword.value   = keyword;
                btnLoadMore.setAttribute('data-loadby','keyword');
                'border-b-2 md:border-b-4 border-myyellow'.split(' ').forEach(cls => {
                    document.querySelectorAll('#kategori-wraper span').forEach(span => {
                        span.classList.remove(cls);
                    })
                });
                createCardByKeyword(0,keyword);
            }
        });

        // .. cancel ON CLICK
        searchIcon.addEventListener('click', () => {
            keysWraper.innerHTML     = "";
            searchIcon.style.opacity = '1';
            searchIcon.src       = BASE_URL+'asset/img/search.svg';
            inputKeyword.value   = "";
            category = 'semua kategori';
            createCardByCategory(0,'semua kategori');
            btnLoadMore.setAttribute('data-loadby','kategori');
            'border-b-2 md:border-b-4 border-myyellow'.split(' ').forEach(cls => {
                divCategories.firstElementChild.classList.add(cls);
            });
        });
        
        /*
            Product Card
        */
        // .. create card by nothing
        function createProductCard(start = 0){
            let end = start+9;

            // .. loadMore rise or not
            if(arrMaster.arrProducts.length <= 10){
                btnLoadMore.querySelector('h1').classList.add('hidden');
            }
            else if(arrMaster.arrProducts[start] === undefined){
                btnLoadMore.querySelector('h1').innerText = 'No More Product';
                setTimeout(() => {
                    btnLoadMore.querySelector('h1').classList.add('opacity-0');
                    setTimeout(() => {
                        btnLoadMore.querySelector('h1').innerText = 'load more';
                        btnLoadMore.querySelector('h1').classList.add('hidden');
                    }, 300);
                }, 1000);
                return 0;
            }
            else{
                btnLoadMore.querySelector('h1').classList.remove('hidden');
                btnLoadMore.querySelector('h1').classList.remove('opacity-0');
            }

            arrMaster.arrProducts.forEach((e,i) => {
                if(i >= start && i <= end){
                    let rawCards = `<a href="" class="productCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);" data-id="${e.id}" onclick="cardClick(this,event);">
                        <span class="span-harga bg-black px-2 py-1 absolute z-30 top-0 right-0 text-myyellow text-myxs mysm:text-sm sm:text-xs" style="min-width: max-content;">Rp ${createHarga(e.harga)}</span>
                        <div class="relative p-3 mymd:p-4 img-wraper w-full flex-1 flex justify-center items-center">
                            <img class="w-full animate-pulse" src="${BASE_URL}asset/img/bgproduk.webp" alt="">
                            <img src="${BASE_URL}asset/img/loading.svg" class="absolute w-8 sm:w-12 opacity-80 imgLoading">
                            <div class="bg-white w-full absolute z-20">
                                <Image placeholder="blur" class="imgProduk w-full" src="${e.imgurl}" alt="${e.nama}" />
                            </div>
                        </div>
                        <div class="name-wraper bg-myyellow px-3 pt-3 pb-2 text-myxs mysm2:text-xs mysm:text-base sm:text-sm md:text-base mymd:text-sm text-left text-black">
                            <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${e.nama}</span>
                        </div>
                    </a>`

                    htmlToElements(rawCards).forEach(e => {
                        productsWraper.insertBefore(e,lastCard);
                    });
                }

            });
            stopLoadingImg();

        }
        createProductCard();
        
        // .. create card by kategori
        function createCardByCategory(start = 0,category){
            let end      = start+9;
            let filtered = arrMaster.arrProducts.filter(e => {
                if(category !== 'semua kategori'){
                    return e.kategori === category;
                }else{
                    return e;
                }
            });

            // .. loadMore rise or not
            if(filtered.length <= 10){
                btnLoadMore.querySelector('h1').classList.add('hidden');
            }
            else if(filtered[start] === undefined){
                btnLoadMore.querySelector('h1').innerText = 'No More Product';
                setTimeout(() => {
                    btnLoadMore.querySelector('h1').classList.add('opacity-0');
                    setTimeout(() => {
                        btnLoadMore.querySelector('h1').innerText = 'load more';
                        btnLoadMore.querySelector('h1').classList.add('hidden');
                    }, 300);
                }, 1000);
                return 0;
            }
            else{
                btnLoadMore.querySelector('h1').classList.remove('hidden');
                btnLoadMore.querySelector('h1').classList.remove('opacity-0');
            }

            // .. clean card
            if(start == 0){
                document.querySelectorAll('.productCard').forEach(e => e.remove());
            }

            filtered.forEach((e,i) => {
                if(i >= start && i <= end){
                    let rawCards = `<a href="" class="productCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);" data-id="${e.id}" onclick="cardClick(this,event);">
                        <span class="span-harga bg-black px-2 py-1 absolute z-30 top-0 right-0 text-myyellow text-myxs mysm:text-sm sm:text-xs" style="min-width: max-content;">Rp ${createHarga(e.harga)}</span>
                        <div class="relative p-3 mymd:p-4 img-wraper w-full flex-1 flex justify-center items-center">
                            <img class="w-full" src="${BASE_URL}asset/img/bgproduk.webp" alt="">
                            <img src="${BASE_URL}asset/img/loading.svg" class="absolute w-8 sm:w-12 opacity-80 imgLoading">
                            <div class="bg-white w-full absolute z-20">
                                <img class="w-full" src="${e.imgurl}" alt="${e.nama}">
                            </div>
                        </div>
                        <div class="name-wraper bg-myyellow px-3 pt-3 pb-2 text-myxs mysm2:text-xs mysm:text-base sm:text-sm md:text-base mymd:text-sm text-left text-black">
                            <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${e.nama}</span>
                        </div>
                    </a>`

                    htmlToElements(rawCards).forEach(e => {
                        productsWraper.insertBefore(e,lastCard);
                    });
                }

            });
            stopLoadingImg();

        }

        // .. create card by keyword
        function createCardByKeyword(start = 0,keyword){
            let end      = start+9;
            let filtered = arrMaster.arrProducts.filter(e => e.keyword.toLowerCase().includes(keyword.toLowerCase()));

            // .. loadMore rise or not
            if(filtered.length <= 10){
                btnLoadMore.querySelector('h1').classList.add('hidden');
            }
            else if(filtered[start] === undefined){
                btnLoadMore.querySelector('h1').innerText = 'No More Product';
                setTimeout(() => {
                    btnLoadMore.querySelector('h1').classList.add('opacity-0');
                    setTimeout(() => {
                        btnLoadMore.querySelector('h1').innerText = 'load more';
                        btnLoadMore.querySelector('h1').classList.add('hidden');
                    }, 300);
                }, 1000);
                return 0;
            }
            else{
                btnLoadMore.querySelector('h1').classList.remove('hidden');
                btnLoadMore.querySelector('h1').classList.remove('opacity-0');
            }

            // .. clean card
            if(start == 0){
                document.querySelectorAll('.productCard').forEach(e => e.remove());
            }

            filtered.forEach((e,i) => {
                if(i >= start && i <= end){
                    let rawCards = `<a href="" class="productCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);" data-id="${e.id}" onclick="cardClick(this,event);">
                        <span class="span-harga bg-black px-2 py-1 absolute z-30 top-0 right-0 text-myyellow text-myxs mysm:text-sm sm:text-xs" style="min-width: max-content;">Rp ${createHarga(e.harga)}</span>
                        <div class="relative p-3 mymd:p-4 img-wraper w-full flex-1 flex justify-center items-center">
                            <img class="w-full" src="${BASE_URL}asset/img/bgproduk.webp" alt="">
                            <img src="${BASE_URL}asset/img/loading.svg" class="absolute w-8 sm:w-12 opacity-80 imgLoading">
                            <div class="bg-white w-full absolute z-20">
                                <img class="w-full" src="${e.imgurl}" alt="${e.nama}">
                            </div>
                        </div>
                        <div class="name-wraper bg-myyellow px-3 pt-3 pb-2 text-myxs mysm2:text-xs mysm:text-base sm:text-sm md:text-base mymd:text-sm text-left text-black">
                            <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${e.nama}</span>
                        </div>
                    </a>`

                    htmlToElements(rawCards).forEach(e => {
                        productsWraper.insertBefore(e,lastCard);
                    });
                }

            });
            stopLoadingImg();

        }

        // ... btn load more rising
        divLoadMore.classList.remove('hidden');
        // ... btn load more on click
        btnLoadMore.addEventListener('click', (e) => {
            e.preventDefault();
            let loadby = btnLoadMore.dataset.loadby;

            if(loadby === undefined){
                createProductCard(productsWraper.childElementCount-1);
                return 0;
            }
            if(loadby === 'kategori'){
                console.log(category);
                createCardByCategory(productsWraper.childElementCount-1,category);
                return 0;
            }
            if(loadby === 'keyword'){
                createCardByKeyword(productsWraper.childElementCount-1,keyword);
                return 0;
            }

        });
    })
    .catch(err => {
        console.log('message:\n'+err.message);
        showError(err.message,true);
    })
    .finally(()=>{
        // .. remove loading card
        document.querySelectorAll('a.loadingCard').forEach(e => {
            e.remove();
        });
    });


/* 
    STOP loading img
*/
function stopLoadingImg(){
    document.querySelectorAll('img.imgProduk').forEach(e => {
        e.onload = () => {
            e.parentElement.previousElementSibling.remove();
        };
    });
}

/* 
    HTML to ELEMENT
*/
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

/* 
    MODIF price
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

////////////////////////
///// CHEACTSHEET /////
////////////////////////

// CLEAR INTERVAL
// --------------
// let isOffline = setInterval(() => {
//     if(!navigator.onLine){
//         clearInterval(isOffline); 
//     }
// }, 1000);