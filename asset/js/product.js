/* URL's declaration at views/Layout/footer.php */

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
    API - do xhr
*/
function doXhr(url,data = null){
    return new Promise((resolve,rejected) => {
        let xhr    = new XMLHttpRequest();
        let params = new FormData();

        xhr.open('POST',url,true);
        
        xhr.timeout   = 30000;
        xhr.ontimeout = () => { 
            rejected(Error("Ups, request timeout!")); 
            return 0;
        }

        if(data === null){
            params.append('code','031020');
        }else{
            params = data;
        }

        xhr.send(params);

        xhr.onload = () => {
            try{
                resolve(JSON.parse(xhr.responseText));
            }
            catch(err){
                rejected(Error("Ups, server error")); 
            }
        }
    })
}

//////////////////////////////////////////////
/////////       Categories         ///////////
//////////////////////////////////////////////
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

    'sm-411:h-0 sm-411:border-0 sm-411:overflow-hidden'.split(' ').forEach((className,i) => {
        setTimeout(() => {
            categoriesContainer.classList.toggle(className); 
        }, (i===2) ? 300 : 0);
    });

    categoriesWraper.classList.toggle('sm-411:hidden');
    document.querySelector('section#content').classList.toggle('sm-411:pt-24');

});

// .. get datas of categories
let getCategories = doXhr(API_URL+'getCategories');
// let getCategories = doXhr('getCategories');

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
                }

            });
        });

    })
    .catch(err => {
        console.log(`getCategories msg:\n${err}`);
        showError(err.message,true);
    });  

//////////////////////////////////////////////
//////////     Search Produk       ///////////
//////////////////////////////////////////////
let inputKeyword     = document.querySelector('#input-keyword'); 
let sugestionsWraper = document.querySelector('#sugestions-wraper');
let searchIcon       = document.querySelector('label[for=input-keyword] img');
let keywords         = [];

// .. get datas of keyword
let getKeywords  = doXhr(API_URL+'getKeywords');

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
        console.log(`getKeywords msg:\n${err.message}`);
        showError(err.message,true);
    });

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
// let getCountDown    = doXhr(API_URL+'getCountDown');
let getCountDown    = doXhr('getCountDown');

getCountDown
    .then((resCountDown) => {

        let date = resCountDown.tgl.split('/');
        
        // .. count-down algorithim
        const countDown = () => {
            const dateX = new Date(`${date[2]}-${date[1]}-${date[0]}T00:00`).getTime();
            const now   = new Date().getTime();
            const gap   = dateX - now;
            
            document.querySelector('span#day').innerHTML    = Math.floor(gap/(1000*60*60*24)); 
            document.querySelector('span#hour').innerHTML   = Math.floor((gap%(1000*60*60*24))/(1000*60*60)); 
            document.querySelector('span#minute').innerHTML = Math.floor((gap%(1000*60*60))/(1000*60)); 
            document.querySelector('span#second').innerHTML = Math.floor((gap%(1000*60))/(1000)); 
        }
        
        functCountDown = setInterval(()=>countDown(), 1000);
        
        // .. open count-down
        imageCountD.src = resCountDown.imgurl;
        containerCountD.classList.remove('hidden');

        imageCountD.onload = () => {
            imageCountD.previousElementSibling.remove();
        }
    })
    .catch(err => {
        console.log('getCountDown:\n'+err.message);
    });

// .. close count-down
function closeCountDown(event){
    if(event.target.classList.contains('close')){
        clearInterval(functCountDown);
        containerCountD.classList.add('hidden');
    }
}

//////////////////////////////////////////////
////////////       Product        ////////////
//////////////////////////////////////////////
let productsWraper = document.querySelector('#products-wraper');
let btnLoadMore    = document.querySelector('#load-more');

// .. get products
function funcGetProducts(offset = 0,filterBy = false, filterVal = false){

    let params = new FormData;
    params.append('code',CODE);
    params.append('offset',offset);
    params.append('limit',10);
    
    if(filterBy){
        params.append('filterBy',filterBy);
        params.append('filterVal',filterVal);

        // .. cleaning card
        cleanCard('productCard');

        // .. loading card
        loadingCard();
    }

    showError("", false);

    let getProducts = doXhr(API_URL+'getProductsWithLimit',params);
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
                if(resProducts.length <= 0){
                    showError("Sory, product not found!", true);
                }
            }
            else{
                btnLoadMore.innerText = 'load more';
                btnLoadMore.classList.remove('z-min-1');
                btnLoadMore.classList.remove('opacity-0');
                btnLoadMore.classList.add('opacity-80');
            }
            
            resProducts.forEach(e => {
                let rawCards = `<a href="" class="productCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);" data-id="${e.id}" onclick="cardOnClick(this,event);">
                    <span class="bg-black absolute z-30 top-0 right-0 px-2 py-1 text-tgadget-1000 text-xs sm-411:text-sm sm:text-xs" style="min-width: max-content;">Rp ${createHarga(e.harga)}</span>
                    <div class="w-full flex-1 relative flex justify-center items-center">
                        <img class="w-full" src="${BASE_URL}asset/img/bg-produk.webp">
                        <img class="absolute w-8 sm:w-12 opacity-80 imgLoading" src="${BASE_URL}asset/img/loading.svg">
                        <div class="bg-white w-full absolute z-20">
                            <img class="imgProduk w-full" src="${e.imgurl}" alt="${e.nama}">
                        </div>
                    </div>
                    <div class="bg-tgadget-1000 px-3 pt-3 pb-2 text-xs sm-411:text-base sm:text-sm md:text-base md-911:text-sm text-left text-black">
                        <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${e.nama}</span>
                    </div>
                </a>`

                htmlToElements(rawCards).forEach(e => {
                    productsWraper.insertBefore(e,productsWraper.lastElementChild);
                });
            });

            // .. remove img spinner
            rmImgSpinner();
            
            // .. remove loading card
            cleanCard('loadingCard');
        })
        .catch(err => {
            console.log(`getProducst msg:\n${err.message}`);
            // showError(err.message,true);
        });

}
funcGetProducts();

// btn-LoadMore on click
btnLoadMore.addEventListener('click',(el) => {
    let totalCard = document.querySelectorAll('.productCard').length;
    let filterBy  = (btnLoadMore.dataset.filterby !== undefined) ? btnLoadMore.dataset.filterby : false;
    let filterVal = (btnLoadMore.dataset.filterval !== undefined) ? btnLoadMore.dataset.filterval : false;
    el.target.innerHTML = `<img class="w-6" src="${BASE_URL}asset/img/loading.svg"/>`

    funcGetProducts(totalCard,filterBy,filterVal);
});

// .. loading cards
function loadingCard(){
    for (let i = 1; i <= 10; i++) {
        let rawCard = `<a href="" class="loadingCard w-full ${(i>6&&i<9) ? 'hidden sm:flex' : 'flex'} ${(i>=9) ? 'hidden lg:flex' : 'flex'} flex-col rounded-tl-lg rounded-br-lg overflow-hidden opacity-60 animate-pulse">
            <div class="bg-black w-full flex-1 relative flex justify-center items-center">
                <img class="w-full opacity-0" src="${BASE_URL}asset/img/bg-produk.webp" alt="">
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

// .. HTML TO ELEMENT 
function htmlToElements(html) {
    var template       = document.createElement('template');
    template.innerHTML = html;

    return template.content.childNodes;
}

// .. Insert arrProducts
function insertArray(value){
    if(arrProducts.length == 0){
        arrProducts.push(value);
    }else{        
        let isExist = arrProducts.find(e => value.id == e.id);

        (!isExist) ? arrProducts.push(value) : '';
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