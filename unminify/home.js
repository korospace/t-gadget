
/* 
    Windows on load
*/
window.addEventListener('load',function() {

    // .. if network is disconected.
    if(!navigator.onLine){
        showError("Ups, connection lost!",true);
    }

    doGetLinkSosmed();
    doGetTesti();

    // .. remove loading animation
    document.querySelector('#divloader').classList.add('hidden');
    document.querySelector('body').classList.remove('overflow-hidden');

    // .. Landing-element at Home section
    gsap.from("#home #main-text", {duration: 0.7, y: -20, opacity: 0});
    gsap.from("#home #second-text", {duration: 0.7,delay: 0.2, y: -20, opacity: 0});
    gsap.from("#home #buttons-wraper", {duration: 0.7,delay: 0.4, y: -20, opacity: 0});
    
    // .. CService 
    runCservice();
    
});

/* 
    testimoni loading state
*/ 
let testiIsScrolled    = false;
let testimoniesWraper  = document.querySelector('#testimoni #testimonies-wraper'); 

function testimoniLoadingState(imgName = 'loading.svg',msg = 'please wait...'){
    let el = '';
    for (let i = 0; i < 9; i++) {
        el += `<div class="relative block ${ (i>=6) ? 'md:hidden' : '' } ${ (i>=8) ? 'sm:hidden' : '' } transition rounded-sm md:rounded overflow-hidden opacity-80">
            <div class="bg-tgadget-1000 w-full h-full absolute flex flex-col justify-center items-center">
                <img src="${BASE_URL}asset/img/${imgName}" class="loadingImg w-12 sm:w-16 opacity-80">
                <span class="mt-6 font-extrabold text-md" style="text-align:center;">${msg}</span>
            </div>
            <img src="${BASE_URL}asset/img/bg-testi.webp" class="w-full opacity-0">
        </div>`;
    }

    testimoniesWraper.innerHTML = el;
}

testimoniLoadingState();

/* 
    Navbar's Href ONCLICK
*/
let navHrefs = document.querySelectorAll('a.href-navigator');

navHrefs.forEach( href => {
    href.addEventListener('click',el => {
        if(el.target.innerHTML === 'product'){
            return false;
        }
        el.preventDefault();

        let thisHref      = el.target;
        let thisHrefValue = el.target.getAttribute('href');

        // 1. remove marker from all hrefs
        navHrefs.forEach( href => {
            href.classList.remove("nav-href-active");
        });
        
        // 2. add marker to clicked href
        if(thisHref.parentElement.getAttribute('id') === 'buttons-wraper'){
            document.querySelector(`a.href-${thisHrefValue}`).classList.add("nav-href-active");
        }
        else{
            thisHref.classList.add("nav-href-active");

            // 3. close navbar in mobile view
            doBurger();
        }

        // 4. hide all section
        document.querySelectorAll('#container section').forEach( section => {
            section.classList.add('opacity-0');
            setTimeout(() => {
                section.classList.remove('flex');
                section.classList.add('hidden');
            }, 200);
        });

        // 5. show section target
        setTimeout(() => {
            let sectionTarget = document.querySelector(`#container section#${thisHrefValue}`);
            sectionTarget.classList.remove('hidden');
            sectionTarget.classList.add('flex');
            setTimeout(() => {
                sectionTarget.classList.remove('opacity-0');

                // 6. landing element at about page
                if(thisHrefValue == 'about'){
                    gsap.from("#about #left-side", {duration: 0.7,delay:0.3, x: -16, opacity: 0});
                    gsap.from("#about #right-side", {duration: 0.7,delay:0.3, x: 16, opacity: 0});
                }
            
                // 7. auto scroll images testi
                if(thisHrefValue == 'testimoni'){
                    gsap.from("#testimoni #main-text", {duration: 0.7,delay:0.3, y: -20, opacity: 0});
                    gsap.from("#testimoni #second-text", {duration: 0.7,delay:0.3, y: -20, opacity: 0});
                    gsap.from("#testimonies-wraper", {duration: 0.7,delay:0.3, y: 20, opacity: 0});
                    testiAutoScroll();
                }
            }, 100);
        }, 200);
        
    });
});

/* 
    Burgers ONCLICK
*/
let sections = document.querySelectorAll('main section'); 
function doBurger(){
    
    sections.forEach(section => {
        section.classList.toggle('opacity-0');
    });

    document.querySelector('#burgerOpen').classList.toggle('translate-x-20');
    document.querySelector('#burgerClose').classList.toggle('translate-x-20');

    ['w-0','w-full','sm:w-1/2'].forEach( className => {
        document.querySelector('#nav-href').classList.toggle(className);
    });

    let [a,b] = ['hidden','opacity-0'];

    document.querySelector('#href-wraper').classList.toggle(a);
    setTimeout(() => {
        document.querySelector('#href-wraper').classList.toggle(b);
    }, 300);
    
    let i =1;
    document.querySelector('#sosmed-wraper').classList.toggle(a);
    document.querySelectorAll('#sosmed-wraper a').forEach((link) => {
        i++;
        setTimeout(() => {
            link.classList.toggle("opacity-0");
            link.classList.toggle("translate-x-28");
        }, 100*i);
    });
}

/* 
    Cservice
*/
function runCservice(){
    let csIsHover       = false;
    let cService        = document.querySelector('#cservice-href');
    let cServiceMessage = document.querySelector('#cservice-message');
    
    // Customer Service - Rising
    setTimeout(() => {
        cServiceMessage.classList.remove('opacity-0');
        setTimeout(() => {
            if(!csIsHover){
                cServiceMessage.classList.add('opacity-0');
            }
        }, 8000);
    }, 3000);
    
    // Customer Service - Hover
    cService.addEventListener('mouseenter',() => {
        csIsHover=true;
        cServiceMessage.classList.remove('opacity-0');
        cServiceMessage.querySelector('span').innerHTML = 'Kami aktif 24 jam!';
    })
    cService.addEventListener('mouseleave',() => {
        csIsHover=false;
        cServiceMessage.classList.add('opacity-0');
    })
}

function aboutArrow(el){
    
    el.classList.toggle('rotate-90');
    el.classList.toggle('-rotate-90');

    let contentWraper = document.querySelector('#content-wraper');
    let targetElement = document.querySelector(`#${el.dataset.target}`);

    contentWraper.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth"
    });

    if(el.dataset.target === 'right-side'){
        el.setAttribute('data-target','left-side');
        gsap.from("#about #right-side", {duration: 0.7,delay:0.3, x: 16, opacity: 0});
    }else{
        el.setAttribute('data-target','right-side');
        gsap.from("#about #left-side", {duration: 0.7,delay:0.3, x: -16, opacity: 0});
    }
}

/* 
    GET data api
*/
function getDataFromApi(url,method = null){
    return new Promise((resolve,rejected) => {
        let xhr  = new XMLHttpRequest();
        let data = new FormData();

        if(method == 'PUT'){
            xhr.open('PUT',url,true);
        }
        else{
            xhr.open('GET',url,true);
        }
        
        xhr.setRequestHeader('api-key', API_KEY);
        xhr.send(data);
        xhr.timeout   = 30000;
        xhr.ontimeout = () => {
            rejected(Error("Ups, request timeout")); 
            return 0;
        }
        xhr.onload = () => {
            let result = JSON.parse(xhr.responseText);
            if(xhr.status == 200 || xhr.status == 202){
                resolve(result);
            }
            else{
                rejected(Error(result.message)); 
            };
        }
    })
}

/* 
    GET LINK SOSMED
*/
function doGetLinkSosmed(){
    getDataFromApi(API_URL+'get/socialmedia')
        .then((resLinkSosmed) => {
            let data = resLinkSosmed.data;
            document.querySelector('a#tokopedia')  .setAttribute('data-href',data.tokopedia);
            document.querySelector('a#shopee')     .setAttribute('data-href',data.shopee);
            document.querySelector('a#lazada')     .setAttribute('data-href',data.lazada);
            document.querySelectorAll('a.whatsapp').forEach(e => {
                e.setAttribute('data-href',data.whatsapp);
            });
        })
        .catch((err) => {
            console.log({"method":"doGetLinkSosmed","error":err.message});
        });
}

/* 
    Update statistic
*/
function updateStatistic(column,thisEl = null,event = null){
    (event !== null) ? event.preventDefault() : '';

    let sosmedLink = (thisEl !== null) ? thisEl.dataset.href : null;
    let response   = getDataFromApi(API_URL+'update/statistic?storename='+column,'PUT');

    response.catch((err) => {
        console.log({"method":"updateStatistic","error":err.message});
    });

    if(sosmedLink !== null){
        (sosmedLink !== 'not available') ? window.open(sosmedLink,'blank') : alert('Maaf, lapak belum tersedia');
    }
}

/* 
    New visitor
*/
if(NewVisitor === true){
    updateStatistic('ourwebsite');
}

/* 
    GET testimoni images
*/

function doGetTesti(){
    getDataFromApi(`${API_URL}get/testimonies`)
    .then((resTesti) => {
        let data = resTesti.data;
        
        let el   = '';
        data.forEach((testi,i) => {
            el += `<div class="bg-tgadget-1000 relative ${(i>=6) ? 'flex md:hidden' : ''} ${(i>=8) ? 'flex sm:hidden' : ''} flex items-center justify-center transition rounded-sm md:rounded opacity-80 overflow-hidden">
                <div class="eyeWraper w-full h-full absolute z-20 flex justify-center items-center cursor-pointer opacity-0 hover:opacity-100" style="background: rgba(0,0,0,0.6);">
                    <img src="${BASE_URL}asset/img/eye.svg" class="w-8 md:w-10 transition duration-300">
                </div>
                <img src="${BASE_URL}asset/img/bg-testi.webp" class="w-full opacity-0">
                <img src="${BASE_URL}asset/img/loading.svg" class="loadingImg w-12 sm:w-16 absolute opacity-80">
                <img src="${testi.img}" class="img-testi block absolute z-10 w-full h-full cursor-pointer">
            </div>`;
        });

        testimoniesWraper.innerHTML = el;

    })
    .catch((err) => {
        console.log({"method":"getTesti","error":err.message});
        testimoniLoadingState('notfound.webp',`${err.message}`);
    })
    .finally(() => {

        // .. remove loading images
        document.querySelectorAll('img.img-testi').forEach(e => {
            e.onload = () => {
                e.parentElement.classList.remove('opacity-80');
                e.previousElementSibling.remove();
            };
        });

        // .. Open preview testimonie
        let eyeWrapers    = document.querySelectorAll('.eyeWraper');
        let imgPreview    = document.querySelector('#img-preview');
        let previewWraper = document.querySelector('#preview-wraper');
        
        eyeWrapers.forEach(eyeWraper => {
            eyeWraper.addEventListener('click',(e) => {
                if(e.target.classList.contains('eyeWraper')){

                    previewWraper.classList.remove('hidden');
                    
                    imgPreview.src = e.target.nextElementSibling.nextElementSibling.src;
                    gsap.from("#img-preview", {duration: 0.3, opacity: 0, scale:0.2});
                }
            });
        });

        // .. Close preview testimonie
        previewWraper.addEventListener('click',(e) => {
            if(!e.target.classList.contains('not-close-preview')){
                imgPreview.src = '';
                previewWraper.classList.add('hidden');
            }
        });

    });
}

/* 
    auto scroll at testi 
*/
function testiAutoScroll(){
    if(!testiIsScrolled){
        testiIsScrolled = true;
        setTimeout(() => {
            testimoniesWraper.scrollTo({
                top: testimoniesWraper.firstElementChild.nextElementSibling.offsetTop,
                behavior: "smooth"
            });
            setTimeout(() => {
                testimoniesWraper.scrollTo({
                    top: testimoniesWraper.firstElementChild.offsetTop,
                    behavior: "smooth"
                });
            }, 1000);
        }, 2000);
    }
}
