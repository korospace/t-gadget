
// .. loading cards
let productsWraper = document.querySelector('#products-wraper');
let btnLoadMore    = document.querySelector('#load-more');
let arrProducts    = [];

function loadingCard(){
    for (let i = 1; i <= 10; i++) {
        let rawCard = `<a href="" class="loadingCard w-full ${(i>6&&i<9) ? 'hidden sm:flex' : 'flex'} ${(i>=9) ? 'hidden lg:flex' : 'flex'} flex-col rounded-tl-lg rounded-br-lg overflow-hidden opacity-60 animate-pulse">
            <div class="bg-black w-full flex-1 relative flex justify-center items-center">
                <img class="w-full opacity-0" src="${BASE_URL}asset/img/bg-produk.webp">
            </div>
            <div class="py-3">
                <div class="flex">
                    <span class="bg-black block w-3/5 h-2 mr-2 rounded-md"></span>
                    <span class="bg-black block w-1/5 h-2 mr-2 rounded-md"></span>
                    <span class="bg-black block w-1/5 h-2 rounded-md"></span>
                </div>
                <div class="flex mt-2">
                    <span class="bg-black block w-3/5 h-2 rounded-md"></span>
                </div>
            </div>
        </a>`;
    
        htmlToElements(rawCard).forEach(e => {
            productsWraper.insertBefore(e,productsWraper.lastElementChild);
        });
    }
}
loadingCard();

/* 
    window on load
*/
window.onload = () => {
    // .. if network disconnect
    if(!navigator.onLine){
        showError("Ups, connection lost!",true);
    }
    // .. remove loading page
    document.querySelector('#divloader').classList.add('hidden');
    // .. get data from api
    doGetLink();
    doGetCategories();
    doGetKeywords();
    doGetCountdown();
    doGetBanners();
    funcGetProducts();
}

/* 
    API - do xhr
*/
function doXhr(url,params = null){
    return new Promise((resolve,rejected) => {
        let xhr    = new XMLHttpRequest();

        if(params !== null){
            xhr.open('POST',url,true);
            xhr.send(params);
        }
        else{
            xhr.open('GET',url,true);
            xhr.send();
        }
        
        xhr.timeout   = 30000;
        
        xhr.ontimeout = () => { 
            rejected(Error("Ups, request timeout!")); 
            return 0;
        }

        xhr.onload = () => {
            if(xhr.status == 200 || xhr.status == 202){
                resolve(JSON.parse(xhr.responseText));
            }
            else{
                rejected(JSON.parse(xhr.responseText)); 
            };
        }
    })
}

/* 
    GET LINK SOSMED
*/
function doGetLink(){
    let getLinkSosmed = doXhr(API_URL+'get/linkSosmed');

    getLinkSosmed
    .then((resLinkSosmed) => {
        document.querySelector('a#tokopedia').setAttribute('data-href',resLinkSosmed.tokopedia);
        document.querySelector('a#shopee').setAttribute('data-href',resLinkSosmed.shopee);
        document.querySelector('a#lazada').setAttribute('data-href',resLinkSosmed.lazada);
        document.querySelector('a#whatsapp').setAttribute('data-href',resLinkSosmed.whatsapp);
    })
    .catch((err) => {
        console.log({"method":"getLinkSosmed","status" : err.status,"error"  : err.message});
    });
}

/* 
    Update statistic
*/
function updateStatistic(atribut = null,thisEl = null,event = null,id = null){
    (event !== null) ? event.preventDefault() : '';

    let sosmedLink = (thisEl !== null) ? thisEl.dataset.href : null;
    let params     = new FormData;

    if(id !== null){
        params.append("id",id);
    }
    if(atribut !== null){
        params.append("atribut",atribut);
    }

    let result = doXhr(API_URL+'update/statistic',params);

    result.catch((err) => {
        console.log({"method":"updateStatistic","status" : err.status,"error"  : err.message});
    });

    if(sosmedLink !== null){
        (sosmedLink !== 'not available') ? window.open(sosmedLink,'blank') : alert('Maaf, lapak belum tersedia');
    }
}

/* 
    New visitor
*/
if(NewVisitor === true){
    updateStatistic('pengunjung');
}

//////////////////////////////////////////////
/////////       Categories         ///////////
//////////////////////////////////////////////
let sectionContent      = document.querySelector('section#content');
let burgerCategory      = document.querySelector('#burger-category');
let categoriesContainer = document.querySelector('#categories-container');
let categoriesWraper    = document.querySelector('#categories-wraper');
let elCategory          = "";

// .. loading animation - categories
for (let i = 0; i < 10; i++) {
    elCategory += `<span class="w-36 min-h-full flex flex-col justify-center px-6 md:px-8 ${(i > 0) ? 'border-l border-tgadget-200' : ''} cursor-pointer opacity-90">
        <div class="w-full flex items-center">
            <span class="bg-tgadget-1000 w-3/5 h-1 sm:h-1.5 mr-2 animate-pulse rounded-sm"></span>
            <span class="bg-tgadget-1000 w-1/5 h-1 sm:h-1.5 mr-2 animate-pulse rounded-sm"></span>
            <span class="bg-tgadget-1000 w-1/5 h-1 sm:h-1.5 animate-pulse rounded-sm"></span>
        </div>
        <div class="w-full flex items-center mt-2">
            <span class="bg-tgadget-1000 w-4/5 h-1 sm:h-1.5 mr-2 animate-pulse rounded-sm"></span>
        </div>
    </span>`;

    categoriesWraper.innerHTML = elCategory;
}

// .. burger-category on click
burgerCategory.addEventListener('click', () => {
    burgerCategory.classList.toggle('bg-tgadget-200');

    'sm:h-0 sm:border-0 sm:overflow-hidden'.split(' ').forEach((className,i) => {
        setTimeout(() => {
            categoriesContainer.classList.toggle(className); 
        }, (i===2) ? 300 : 0);
    });

    categoriesWraper.classList.toggle('sm:hidden');

});

// .. get datas of categories
function doGetCategories(){
    let getCategories = doXhr(API_URL+'get/categories');

    getCategories
    .then(resCategories => {
        
        // .. create span category
        elCategory = `<span class="bg-tgadget-100 min-w-max min-h-full block flex jusify-center items-center px-6 md:px-8 border-t border-tgadget-200 cursor-pointer opacity-80 hover:opacity-100">
            semua kategori
        </span>`;

        resCategories
            .sort((a,b) => a.kategori.length - b.kategori.length)
            .forEach( c => {
                elCategory += `<span class="min-w-max min-h-full block flex jusify-center items-center px-6 md:px-8 border-t border-l border-tgadget-200 cursor-pointer opacity-80 hover:opacity-100">
                    ${c.kategori}
                </span>`;

                categoriesWraper.innerHTML = elCategory;
            });
        
        // .. categories on click
        categoriesWraper.querySelectorAll('span').forEach(category => {
            category.addEventListener('click', (el) => {
                
                // .. add mark to clicked span
                categoriesWraper.querySelectorAll('span').forEach(el => {
                    el.classList.remove('bg-tgadget-100');
                });
                el.target.classList.toggle('bg-tgadget-100');

                // .. add data filter to btn load-more
                if(el.target.innerText !== 'Semua Kategori'){
                    btnLoadMore.setAttribute('data-filterby','kategori');
                    btnLoadMore.setAttribute('data-filterval',el.target.innerText.toLowerCase());
                    funcGetProducts(0,'kategori',el.target.innerText.toLowerCase());
                }
                else{
                    btnLoadMore.removeAttribute('data-filterby');
                    btnLoadMore.removeAttribute('data-filterval');
                    cleanCard('productCard');
                    loadingCard();
                    funcGetProducts(0,false,false);
                    scrollToTopOfContent();
                }

            });
        });

    })
    .catch(err => {
        console.log({"method":"getCategories","status" : err.status,"error"  : err.message});
        showError("Ups, server error",true);
    });  
}

//////////////////////////////////////////////
//////////     Search Produk       ///////////
//////////////////////////////////////////////
let inputKeyword     = document.querySelector('#input-keyword'); 
let sugestionsWraper = document.querySelector('#sugestions-wraper');
let searchIcon       = document.querySelector('label[for=input-keyword] img');
let keywords         = [];

// .. get datas of keyword
function doGetKeywords(){
    let getKeywords  = doXhr(API_URL+'get/keywords');

    getKeywords
    .then(resKeywords => {
        resKeywords
            .map( k => k.keyword.split('|') )
            .map( k => k.map( keyword => keywords.push(keyword) ) );

        keywords = keywords.sort( (a,b) => a.length - b.length );

        document.querySelectorAll('li.loadingSugestion').forEach(e => {
            e.remove();
        });
    })
    .catch(err => {
        console.log({"method":"getKeywords","status" : err.status,"error"  : err.message});
        showError("Ups, server error",true);
    });
}

// .. input keyword on typing
inputKeyword.addEventListener('keyup',() => {

    if(inputKeyword.value === ""){
        searchIcon.style.opacity = '1';
        searchIcon.src = BASE_URL+'asset/img/search.svg';
        sugestionsWraper.innerHTML = "";
    }else{
        searchIcon.style.opacity = '0.8';
        searchIcon.src = BASE_URL+'asset/img/cancel.svg';
        createSugestions(inputKeyword.value);
    }

});

// .. insert sugestions into wraper
let createSugestions = (words) => {
    
    let elSugetion  = '';
    if(keywords.length <= 0){
        for (let i = 0; i < 6; i++) {
            elSugetion += `<li class="loadingSugestion w-full flex items-center px-3 py-4 sm:py-6 text-left cursor-pointer hover:bg-gray-200" style="border-bottom:1px solid rgba(49,53,59,0.4);">
                <span class="bg-gray-400 w-full h-1.5 animate-pulse rounded-sm opacity-80"></span>
            </li>`;
        }
    }else{
        keywords.forEach(keyword => {
            if(keyword.includes(words)){
                elSugetion += `<li class="liSugestion w-full block px-3 py-4 sm:py-6 text-left cursor-pointer hover:bg-gray-200" style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${keyword}">${keyword}</li>`;
            }
        });
        elSugetion += `<li class="liSugestion w-full block px-3 py-4 sm:py-6 text-left cursor-pointer hover:bg-gray-200" style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${words}">cari "${words}"</li>`;
    }

    sugestionsWraper.innerHTML = elSugetion;
    
}

// .. sugestion on click
window.addEventListener('click',(el) => {
    if(el.target.classList.contains('liSugestion')){
        sugestionsWraper.innerHTML = "";
        categoriesWraper.querySelectorAll('span').forEach(el => {
            el.classList.remove('bg-tgadget-100');
        });
        btnLoadMore.setAttribute('data-filterby','keyword');
        btnLoadMore.setAttribute('data-filterval',el.target.dataset.value);
        funcGetProducts(0,'keyword',el.target.dataset.value);
    }else{
        clearInputKeyword();
    }
});

// .. cancel on click
function clearInputKeyword(){
    inputKeyword.value       = ""
    searchIcon.style.opacity = '1';
    searchIcon.src = BASE_URL+'asset/img/search.svg';
    sugestionsWraper.innerHTML = "";
}

//////////////////////////////////////////////
////////////     Count-Down       ////////////
//////////////////////////////////////////////
let functCountDown  = '';
let containerCountD = document.querySelector('#countdown-container');
let imageCountD     = document.querySelector('#countdown-img');

function doGetCountdown(){
    let getCountDown    = doXhr(API_URL+'get/countDown');

    getCountDown
    .then((res) => {

        let day   = (res.day.length === 1) ? '0'+res.day : res.day;
        let month = (res.month.length === 1) ? '0'+res.month : res.month;
        let year  = (res.year.length === 1) ? '0'+res.year : res.year;

        // .. count-down algorithim
        const countDown = () => {
            const dateX = new Date(`${year}-${month}-${day}T00:00`).getTime();
            const now   = new Date().getTime();
            const gap   = dateX - now;
            
            document.querySelector('span#day').innerHTML    = Math.floor(gap/(1000*60*60*24)); 
            document.querySelector('span#hour').innerHTML   = Math.floor((gap%(1000*60*60*24))/(1000*60*60)); 
            document.querySelector('span#minute').innerHTML = Math.floor((gap%(1000*60*60))/(1000*60)); 
            document.querySelector('span#second').innerHTML = Math.floor((gap%(1000*60))/(1000)); 
        }
        
        functCountDown = setInterval(()=>countDown(), 1000);
        
        // .. open count-down
        imageCountD.src = res.imgurl;
        containerCountD.classList.remove('hidden');

        imageCountD.onload = () => {
            imageCountD.previousElementSibling.remove();
        }
    })
    .catch(err => {
        console.log({"method":"getCountDown","status" : err.status,"error"  : err.message});
    });
}

// .. close count-down
function closeCountDown(event){
    if(event.target.classList.contains('close')){
        clearInterval(functCountDown);
        containerCountD.classList.add('hidden');
    }
}

//////////////////////////////////////////////
/////////         Banners          ///////////
//////////////////////////////////////////////

function doGetBanners(){
    let getBanners = doXhr(API_URL+'get/banners');
    
    getBanners
    .then((res) => {
        let glideTrackDesktop = document.querySelector('#glide-track-desktop .glide__slides');
        let glideTrackMobile  = document.querySelector('#glide-track-mobile .glide__slides');
        let bannerDesktop = ``; 
        let bannerMobile  = ``; 
        
        res.forEach( (banner) => {
            bannerDesktop += `<img src="${banner.imgurl}" class="img-banner w-full h-full">`; 
            bannerMobile  += `<img src="${banner.imgurl_mobile}" class="img-banner w-full h-full">`; 
        });
    
        glideTrackDesktop.innerHTML = bannerDesktop;
        glideTrackMobile.innerHTML  = bannerMobile;
    
        let option = {
            type: 'carousel',
            focusAt: 'center',
            autoplay: 5000,
            animationTimingFunc: 'ease-in-out',
            animationDuration: 1000,
            gap: 0,
            perView: 1
        }
    
        new Glide('#glide_desktop', option).mount();
        new Glide('#glide_mobile', option).mount();
    
        // .. remove skeleton loaders
        document.querySelectorAll('.img-banner').forEach(e => {
            e.onload = () => {
                document.querySelectorAll('.bg-wraper').forEach(e => {
                    e.classList.remove('bg-black');
                    e.classList.remove('animate-pulse');
                    e.classList.remove('opacity-0');
                });
                document.querySelector('#glide_desktop').classList.add('shadow-card');
                document.querySelector('#glide_mobile').classList.add('shadow-card');
            };
        });
    
        // Banner Service - Hover
        let glidArrowLeft  = document.querySelectorAll('.glide__arrow--left');
        let glidArrowRight = document.querySelectorAll('.glide__arrow--right');
        document.querySelectorAll('.glide').forEach(e => {
            e.addEventListener('mouseenter',() => {
                glidArrowLeft.forEach(el => {
                    el.classList.remove('opacity-0');
                    el.classList.add('-translate-x-12');
                });
                glidArrowRight.forEach(el => {
                    el.classList.remove('opacity-0');
                    el.classList.add('translate-x-12');
                });
            })
            e.addEventListener('mouseleave',() => {
                glidArrowLeft.forEach(el => {
                    el.classList.add('opacity-0');
                    el.classList.remove('-translate-x-12');
                });
                glidArrowRight.forEach(el => {
                    el.classList.add('opacity-0');
                    el.classList.remove('translate-x-12');
                });
            })
        });
        
    })
    .catch(err => {
        console.log({"method":"getBanners","status" : err.status,"error"  : err.message});
        showError("Ups, server error",true);
    });
}

//////////////////////////////////////////////
////////////       Product        ////////////
//////////////////////////////////////////////

// .. get products
function funcGetProducts(offset = 0,filterBy = false, filterVal = false){

    let endpoint = '';

    if(filterBy){
        endpoint = API_URL+'get/products/'+offset+'/10/'+filterBy+'/'+filterVal;

        // .. cleaning card
        cleanCard('productCard');

        // .. loading card
        loadingCard();

        // .. scroll to top
        scrollToTopOfContent();
    }
    else{
        endpoint = API_URL+'get/products/'+offset+'/10';
    }

    showError("", false);

    let getProducts = doXhr(endpoint);
    getProducts
        .then(resProducts => {

            // .. load-more rise or not
            if(resProducts.length <= 9){
                btnLoadMore.innerText = 'no more product';
                setTimeout(() => {
                    btnLoadMore.classList.add('z-min-1');
                    btnLoadMore.classList.add('opacity-0');
                    btnLoadMore.classList.remove('opacity-80');
                }, 1000);
            }
            else{
                btnLoadMore.innerText = 'load more';
                btnLoadMore.classList.remove('z-min-1');
                btnLoadMore.classList.remove('opacity-0');
                btnLoadMore.classList.add('opacity-80');
            }

            if(filterBy === 'keyword'){
                if(resProducts.length <= 0){
                    showError("Sory, product not found!", true);
                }
            }
            
            resProducts.forEach(e => {
                let rawCards = `<a href="" class="productCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden shadow-card" onclick="cardOnClick(event,${e.id});">
                    <span class="bg-black absolute z-30 top-0 right-0 px-2 py-1 text-tgadget-1000 text-xs sm-411:text-sm sm:text-xs" style="min-width: max-content;">Rp ${createHarga(e.harga)}</span>
                    <div class="w-full flex-1 relative flex justify-center items-center">
                        <img class="img-bground w-full" src="${BASE_URL}asset/img/bg-produk.webp">
                        <img class="absolute w-8 sm:w-12 opacity-80 imgLoading" src="${BASE_URL}asset/img/loading.svg">
                        <div class="bg-white w-full absolute z-20">
                            <img class="imgProduk w-full" src="${e.imgurl}" alt="${e.nama}">
                        </div>
                    </div>
                    <div class="bg-tgadget-1000 px-2 py-1 text-xs sm-411:text-base sm:text-sm md:text-base md-911:text-sm text-left text-black border-4 border-tgadget-1000">
                        <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${e.nama}</span>
                    </div>
                </a>`

                htmlToElements(rawCards).forEach(e => {
                    productsWraper.insertBefore(e,productsWraper.lastElementChild);
                });

                insertArray(e);
            });

            // .. remove img spinner
            rmImgSpinner();
            
            // .. remove loading card
            cleanCard('loadingCard');
        })
        .catch(err => {
            console.log({"method":"getProducts","status" : err.status,"error"  : err.message});
            showError("Ups, server error",true);
        });

}

// btn-LoadMore on click
btnLoadMore.addEventListener('click',(el) => {
    let totalCard = document.querySelectorAll('.productCard').length;
    let filterBy  = (btnLoadMore.dataset.filterby !== undefined) ? btnLoadMore.dataset.filterby : false;
    let filterVal = (btnLoadMore.dataset.filterval !== undefined) ? btnLoadMore.dataset.filterval : false;
    el.target.innerHTML = `<img class="w-6" src="${BASE_URL}asset/img/loading.svg"/>`

    funcGetProducts(totalCard,filterBy,filterVal);
});

// .. HTML TO ELEMENT 
function htmlToElements(html) {
    var template       = document.createElement('template');
    template.innerHTML = html;

    return template.content.childNodes;
}

// .. Insert arrProducts
function insertArray(data){
    if(arrProducts.length == 0){
        arrProducts.push(data);
    }else{        
        let isExist = arrProducts.find(e => e.id == data.id);

        (!isExist) ? arrProducts.push(data) : '';
    }
}

// .. Modif price
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

// .. remove img-spinner
function rmImgSpinner(){
    document.querySelectorAll('img.imgProduk').forEach(e => {
        e.onload = () => {
            e.parentElement.previousElementSibling.remove();
        };
    });
}

// .. cleaning card
function cleanCard(className){
    document.querySelectorAll(`.${className}`).forEach(e => {
        e.remove();
    });
}

// .. scroll to top of content
function scrollToTopOfContent(){
    window.scrollTo({
        top: sectionContent.offsetTop,
    });
}

// .. card on click
let modalsDetail    = document.querySelector('#modals-detail');
let btnClose        = modalsDetail.querySelector('#btn-close');
let detailContainer = modalsDetail.querySelector('#detail-container');
let leftSide        = modalsDetail.querySelector('#left-side');
let rightSide       = modalsDetail.querySelector('#right-side');

function cardOnClick(event,id){
    
    // .. update column dilihat
    updateStatistic(null,null,event,id);

    // .. find product from array products
    let product = arrProducts.find(e => e.id == id);

    // .. insert stok
    modalsDetail.querySelector('.img-product').src = product.imgurl;
    modalsDetail.querySelector('#stok').innerText = (product.stok == 1) ? 'ready' : 'habis';
    modalsDetail.querySelector('#product-name').innerText = product.nama;
    modalsDetail.querySelector('#price').innerText = createHarga(product.harga);
    modalsDetail.querySelector('#description').innerText = product.deskripsi;
    modalsDetail.querySelector('#isipaket ul').innerHTML = createLi(product.isipaket);
    modalsDetail.querySelector('#fitur ul').innerHTML = createLi(product.fitur);
    modalsDetail.querySelector('#spesifikasi ul').innerHTML = createLi(product.spesifikasi);

    // .. insert link
    if(product.linktp !== ''){
        buyContainer.querySelector('#link-tokped-wraper').classList.remove('hidden');
        buyContainer.querySelector('#link-tokped').innerText = product.linktp;
        buyContainer.querySelector('#btn-link-tokped').setAttribute('data-href',product.linktp);
        buyContainer.querySelector('#btn-link-tokped').setAttribute('onclick',`updateStatistic('tokopedia',this,event,${product.id});`);
    }
    if(product.linksp !== ''){
        buyContainer.querySelector('#link-shopee-wraper').classList.remove('hidden');
        buyContainer.querySelector('#link-shopee').innerText = product.linksp;
        buyContainer.querySelector('#btn-link-shopee').setAttribute('data-href',product.linksp);
        buyContainer.querySelector('#btn-link-shopee').setAttribute('onclick',`updateStatistic('shopee',this,event,${product.id});`);
    }
    if(product.linklz !== ''){
        buyContainer.querySelector('#link-lazada-wraper').classList.remove('hidden');
        buyContainer.querySelector('#link-lazada').innerText = product.linklz;
        buyContainer.querySelector('#btn-link-lazada').setAttribute('data-href',product.linklz);
        buyContainer.querySelector('#btn-link-lazada').setAttribute('onclick',`updateStatistic('lazada',this,event,'${product.linklz}',${product.id});`);
    }
    if(product.linkwa !== ''){
        buyContainer.querySelector('#link-wa-wraper').classList.remove('hidden');
        buyContainer.querySelector('#link-wa').innerText = product.linkwa;
        buyContainer.querySelector('#btn-link-wa').setAttribute('data-href',product.linkwa);
        buyContainer.querySelector('#btn-link-wa').setAttribute('onclick',`updateStatistic('whatsapp',this,event,'${product.linkwa}',${product.id});`);
    }

    // .. open modals detail
    document.body.classList.add('overflow-hidden');
    modalsDetail.classList.toggle('hidden');
    setTimeout(() => {
        detailContainer.classList.remove('delay-500');
        btnClose.classList.add('delay-500');
        leftSide.classList.add('delay-500');
        rightSide.classList.add('delay-500');
        detailContainer.classList.toggle('h-6/7');
        btnClose.classList.toggle('opacity-0');
        leftSide.classList.toggle('opacity-0');
        rightSide.classList.toggle('opacity-0');
    }, 50);

};

function createLi(data){
    let el = '';
    data.split('|').forEach(e => {
        el += `<li>${e}</li>`;
    });
    return el;
}

// .. close modals detail
modalsDetail.addEventListener('click',(e) => {
    if(e.target.classList.contains('close')){
        document.body.classList.remove('overflow-hidden');
        btnClose.classList.remove('delay-500');
        leftSide.classList.remove('delay-500');
        rightSide.classList.remove('delay-500');
        detailContainer.classList.add('delay-500');
        btnClose.classList.toggle('opacity-0');
        leftSide.classList.toggle('opacity-0');
        rightSide.classList.toggle('opacity-0');
        detailContainer.classList.toggle('h-6/7');
        setTimeout(() => {
            modalsDetail.classList.toggle('hidden');
            if(rightSide.classList.contains('top-20')){
                doUpAndDown();
            }
        }, 900);
    }
});

// .. modals link for buy
let buyContainer = document.querySelector('#buy-container');
let bgOuter      = buyContainer.querySelector('#bg-outer');

function openLinkForBuy(){
    buyContainer.classList.remove('hidden');
    setTimeout(() => {
        bgOuter.classList.remove('scale-90');
        bgOuter.classList.remove('opacity-0');
    }, 50);
}

buyContainer.addEventListener('click',(e) => {
    if(e.target.classList.contains('close')){
        bgOuter.classList.add('scale-90');
        bgOuter.classList.add('opacity-0');
        setTimeout(() => {
            buyContainer.classList.add('hidden');
        }, 300);
        buyContainer.querySelectorAll('.links-wraper').forEach(e => {
            e.classList.add('hidden');
        });
    }
});

// .. btn up and down
let btnUpAndDown         = document.querySelector('#upAndDown');
let descriptionWraper = document.querySelector('#description-wraper');

let doUpAndDown = () => {
    btnUpAndDown.classList.toggle('rotate-180');
    rightSide.classList.toggle('top-20');
    descriptionWraper.classList.toggle('sm:block');
    descriptionWraper.classList.toggle('hidden');
    setTimeout(() => {
        descriptionWraper.classList.toggle('sm:opacity-100');
        descriptionWraper.classList.toggle('opacity-0');
    }, 50);
};

//////////////////////////////////////////////
////////////      Dummy Data      ////////////
//////////////////////////////////////////////

// let resKeywords = [
//     {
//         "keyword": "adaptor asus for netbook|charger laptop asus"
//     },
//     {
//         "keyword": "adaptor laptop ACER |charger laptop ACER"
//     },
//     {
//         "keyword": "K24 Numeric Keypad Numpad LED| numpad USB|numpad usb|numpad merek k24"
//     },
//     {
//         "keyword": "keypad merek etmakit|numpad bluetooth|keypad bluetooth|keypad wireless|numpad merek Etmakit"
//     }];

// let resCategories = [
//     {
//         "kategori": "pc interface"
//     },
//     {
//         "kategori": "pc rakitan"
//     },
//     {
//         "kategori": "adapter"
//     },
//     {
//         "kategori": "workstation server"
//     },
//     {
//         "kategori": "ssd"
//     },
//     {
//         "kategori": "cooler"
//     },
//     {
//         "kategori": "sound card"
//     },
//     {
//         "kategori": "batre laptop"
//     },
//     {
//         "kategori": "Keypad"
//     },
//     {
//         "kategori": "keyboard"
//     },
//     {
//         "kategori": "charger laptop"
//     }
// ];