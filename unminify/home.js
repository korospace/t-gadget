// ... URL ...
const API_URL  = $('span#api-url').data('url');
const BASE_URL = $('span#base-url').data('url');

/* 
    Windows on load
*/
window.addEventListener('load',function() {
    // ... get data testi ...
    getTesti();

    // ... hide link wraper2
    linkWraper2.setAttribute('style',`transform:translateX(${window.innerWidth+768}px)`);

    // ... remove loading animation
    setTimeout(() => {
        document.querySelector('#divloader').classList.add('hidden');
        document.querySelector('body').classList.remove('overflow-hidden');
        
        // ... Landing-element HOME ...
        gsap.from("#home div:nth-child(1)", {duration: 0.7, y: -20, opacity: 0});
        gsap.from("#home h3", {duration: 0.7,delay: 0.2, y: -20, opacity: 0});
        gsap.from("#home .link-wraper a", {duration: 0.7,delay: 0.4, y: -20, opacity: 0});
    }, 400);
    
    // ... Customer Service ...
    setTimeout(() => {
        cServiceMessage.classList.remove('opacity-0');
        setTimeout(() => {
            if(!csIsHover){
                cServiceMessage.classList.add('opacity-0');
            }
        }, 8000);
    }, 3000);
});

/* 
    Customer Service On Hover
*/
let csIsHover  = false;
let cService   = document.querySelector('#cservice');
let cServiceMessage = document.querySelector('#cservice-wraper h4'); 
cService.addEventListener('mouseenter',() => {
    csIsHover=true;
    cServiceMessage.classList.remove('opacity-0');
    cServiceMessage.querySelector('span').innerHTML = 'Kami aktif 24 jam!';
})
cService.addEventListener('mouseleave',() => {
    csIsHover=false;
    cServiceMessage.classList.add('opacity-0');
})

/* 
    Navbar's LINKS
*/
document.querySelectorAll('.link-wraper .hrefSection').forEach( href => {
    href.addEventListener('click',el => {
        el.preventDefault();
        let thisHref      = el.target;
        let thisHrefValue = el.target.getAttribute('href');

        // 1. remove marker from all link
        document.querySelectorAll('.link-wraper a').forEach( a => {
            if(!a.classList.contains('notNavHref')){
                ['text-myyellow','border-b-2','border-myyellow','pb-2','md:pb-1'].forEach( c => {
                    a.classList.remove(c);
                })
            }
        });
        
        // 2. add marker to clicked link
        document.querySelectorAll(`a.href${thisHrefValue}`).forEach( e => {
            if(!e.classList.contains('notNavHref')){
                ['text-myyellow','border-b-2','border-myyellow','pb-2','md:pb-1'].forEach( c => {
                    e.classList.add(c);
                })
            }
        })
        
        // 3. close navbar in mobile view
        closeLinkWraper2();
    
        // 4. hide all section
        document.querySelectorAll('#container section').forEach( s => {
            s.classList.add('opacity-0');
            setTimeout(() => {
                s.classList.remove('flex');
                s.classList.add('hidden');
            }, 200);
        })
    
        // 5. show section target
        setTimeout(() => {
            let sectionTarget = document.querySelector(`#container section#${thisHrefValue}`);
            sectionTarget.classList.remove('hidden');
            sectionTarget.classList.add('flex');
            setTimeout(() => {
                sectionTarget.classList.remove('opacity-0');

                // 6. landing element at about page
                if(thisHrefValue == 'about'){
                    gsap.from("#about #leftAbout", {duration: 0.7,delay:0.3, x: -20, opacity: 0});
                    gsap.from("#about #rightAbout", {duration: 0.7,delay:0.3, x: 20, opacity: 0});
                }
            
                // 7. auto scroll images testi
                if(thisHrefValue == 'testimoni'){
                    testiAutoScroll();
                    gsap.from("#testimoni h1", {duration: 0.7,delay:0.3, y: -20, opacity: 0});
                    gsap.from("#testimoni h2", {duration: 0.7,delay:0.3, y: -20, opacity: 0});
                    gsap.from("#img-wraper", {duration: 0.7,delay:0.3, y: 20, opacity: 0});
                }
            }, 100);
        }, 200);
    
    });
});

let burgerOpen  = document.querySelector('.burgerOpen');
let burgerClose = document.querySelector('.burgerClose'); 
let linkWraper2 = document.querySelector('#link-wraper2');
let elementsOnSection = document.querySelectorAll('#section-wraper >*'); 

/* 
    OPEN Link Wraper 2
*/
function openLinkWraper2(){
    burgerOpen.classList.add('translate-x-40');
    burgerClose.classList.remove('translate-x-40');
    linkWraper2.setAttribute('style','transform:translateX(0px)');
    elementsOnSection.forEach(element => {
        element.classList.add('opacity-0');
    });
    let i =1;
    linkWraper2.querySelectorAll('a').forEach((e) => {
        i++;
        setTimeout(() => {
            e.classList.remove("translate-x-28");
            e.classList.remove("opacity-0");
        }, 100*i);
    });
}

/* 
    CLOSE Link Wraper 2
*/
function closeLinkWraper2(){
    burgerOpen.classList.remove('translate-x-40');
    burgerClose.classList.add('translate-x-40');
    linkWraper2.setAttribute('style',`transform:translateX(${window.innerWidth+768}px)`);
    setTimeout(() => {
        elementsOnSection.forEach(element => {
            element.classList.remove('opacity-0');
        });
    }, 400);
    linkWraper2.querySelectorAll('a').forEach((e) => {
        e.classList.add("translate-x-28");
        e.classList.add("opacity-0");
    });
}

/* 
    GET data api
*/
function getDataFromApi(url,data){
    return new Promise((resolve,rejected) => {
        let xhr  = new XMLHttpRequest();
        
        xhr.open('POST',url,true);

        xhr.timeout = 30000;
        
        xhr.send(data);

        xhr.ontimeout = () => {
            rejected(Error("request timeout")); 
            return 0;
        }

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
    New visitor
*/
let spanNewVisitor = document.querySelector('#newVisitor');
let isNewVisitor   = spanNewVisitor.dataset.visitor;
if(isNewVisitor === 'true'){
    updateStatistic('pengunjung');
}

/* 
    Update statistic
*/
function updateStatistic(atribut,sosmedLink = null){
    let url    = API_URL+'updateStatistic/';
    let params = new FormData();

    params.append('code','031020');
    params.append('atribut',atribut);

    let result = getDataFromApi(url,params);

    result.catch((err) => {
        console.log(`for developer:\n${err}`);
    });

    if(sosmedLink !== null){
        (sosmedLink !== 'not available') ? window.open(sosmedLink,'blank') : alert('Maaf, lapak belum tersedia');
    }
}

/* 
    GET testimoni images
*/
function getTesti(){
    
    let url  = `${API_URL}getTestimonies/`;
    let data = new FormData();

    data.append('code','031020');

    let result = getDataFromApi(url,data);

    result.then((testimonies) => {
        let el = '';
        testimonies.forEach((testimoni,i) => {
            if(i>=6){
                if(i>=8){
                    el += `<div class="relative block sm:hidden transition rounded-sm md:rounded overflow-hidden">
                        <div class="div-see-icon bg-testi-clicked target-close hidden lg:block absolute z-10 top-0 bottom-0 left-0 right-0 px-4 md:px-40 w-full h-full hidden lg:flex justify-center items-center cursor-pointer opacity-0 transition duration-100" onClick="testiClick(this,'desktop');">
                            <img src="${BASE_URL}asset/img/eye.svg" class="target-close w-8 md:w-10 transition duration-300">
                        </div>
                        <img src="${testimoni.imgurl}" class="img-testi block relative z-20 w-full h-full cursor-pointer" onClick="testiClick(this,'mobile');">
                    </div>`;
                }else{
                    el += `<div class="relative block md:hidden transition rounded-sm md:rounded overflow-hidden">
                        <div class="div-see-icon bg-testi-clicked target-close hidden lg:block absolute z-10 top-0 bottom-0 left-0 right-0 px-4 md:px-40 w-full h-full hidden lg:flex justify-center items-center cursor-pointer opacity-0 transition duration-100" onClick="testiClick(this,'desktop');">
                            <img src="${BASE_URL}asset/img/eye.svg" class="target-close w-8 md:w-10 transition duration-300">
                        </div>
                        <img src="${testimoni.imgurl}" class="img-testi block relative z-20 w-full h-full cursor-pointer" onClick="testiClick(this,'mobile');">
                    </div>`;
                }
            }else{
                el += `<div class="relative transition rounded-sm md:rounded overflow-hidden">
                    <div class="div-see-icon bg-testi-clicked target-close absolute z-10 top-0 bottom-0 left-0 right-0 px-4 md:px-40 w-full h-full hidden lg:flex justify-center items-center cursor-pointer opacity-0 transition duration-100" onClick="testiClick(this,'desktop');">
                        <img src="${BASE_URL}asset/img/eye.svg" class="target-close w-8 md:w-10 transition duration-300">
                    </div>
                    <img src="${testimoni.imgurl}" class="img-testi block relative z-20 w-full h-full cursor-pointer" onClick="testiClick(this,'mobile');">
                </div>`;
            }
        });
        document.querySelector('#testimoni #img-wraper').innerHTML = el;
        testiHover();
    })
    .catch((error) => {
        let el = '';
        console.log(`message :\n${error.message}`);

        for (let i = 0; i < 9; i++) {
            if(i>=6){
                if(i>=8){
                    el += `<div class="relative opacity-90 block sm:hidden transition rounded-sm md:rounded overflow-hidden">
                        <div class="bg-myyellow w-full h-full flex flex-col justify-center items-center">
                            <img src="${BASE_URL}asset/img/notfound.webp" class="w-12 sm:w-16 opacity-80">
                            <h1 class="mt-6 font-extrabold text-lg mysm:text-xl text-center opacity-80">${error.message}</h1>
                        </div>
                    </div>`;
                }else{
                    el += `<div class="relative opacity-90 block md:hidden transition rounded-sm md:rounded overflow-hidden">
                        <div class="bg-myyellow w-full h-full flex flex-col justify-center items-center">
                            <img src="${BASE_URL}asset/img/notfound.webp" class="w-12 sm:w-16 opacity-80">
                            <h1 class="mt-6 font-extrabold text-lg mysm:text-xl text-center opacity-80">${error.message}</h1>
                        </div>
                    </div>`;
                }
            }else{
                el += `<div class="relative opacity-90 transition rounded-sm md:rounded overflow-hidden">
                    <div class="bg-myyellow w-full h-full flex flex-col justify-center items-center">
                        <img src="${BASE_URL}asset/img/notfound.webp" class="w-12 sm:w-16 opacity-80">
                        <h1 class="mt-6 font-extrabold text-lg mysm:text-xl text-center opacity-80">${error.message}</h1>
                    </div>
                </div>`;
            }
        }

        document.querySelector('#testimoni #img-wraper').innerHTML = el;
    });
    
}

// ... auto scroll at testi ...
let testiIsScrolled = false;
let testiImgWraper  = document.querySelector('#testimoni #img-wraper'); 
function testiAutoScroll(){
    if(!testiIsScrolled){
        testiIsScrolled = true;
        setTimeout(() => {
            testiImgWraper.scrollTo({
                top: testiImgWraper.firstElementChild.nextElementSibling.offsetTop,
                behavior: "smooth"
            });
            setTimeout(() => {
                testiImgWraper.scrollTo({
                    top: testiImgWraper.firstElementChild.offsetTop - 400,
                    behavior: "smooth"
                });
            }, 1000);
        }, 2000);
    }
}

// .. testi on hover
function testiHover(){
    $('#testimoni #img-wraper img').on({
        mouseenter: function () {
            $(this).prev().removeClass('z-10 opacity-0').addClass('z-30');
        }
    });
    $('#testimoni #img-wraper .div-see-icon').on({
        mouseleave: function () {
            $(this).removeClass('z-30').addClass('z-10 opacity-0');
        }
    });

}

// .. testi on click
function testiClick(e,device){

    document.querySelector('.testi-clicked-wraper').classList.toggle('hidden');
    document.querySelector('section#testimoni').classList.toggle('overflow-hidden');
    document.querySelector('section#testimoni #img-wraper').classList.toggle('overflow-auto');
    document.querySelector('section#testimoni #img-wraper').classList.toggle('overflow-hidden');
    
    if(e !== 'close'){
        if(device == 'desktop'){
            document.querySelector('.testi-clicked-wraper img').src = e.nextElementSibling.src;
        }else{
            document.querySelector('.testi-clicked-wraper img').src = e.src;
        }
        gsap.from(".testi-clicked-wraper img", {duration: 0.3, opacity: 0, scale:0.2});
    }else{
        document.querySelector('.testi-clicked-wraper img').src = "";
    }

}