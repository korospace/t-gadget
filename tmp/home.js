let imgTestiScrolled = false;

window.addEventListener('load',function() {
    // ... create testi ...
    getTesti();
    
    // ... hide link wraper2
    document.querySelector("#link-wraper2").setAttribute('style',`transform:translateX(${window.innerWidth+768}px)`);

    // ... Landing-element HOME ...
    gsap.from("#home div:nth-child(1)", {duration: 0.7, y: -20, opacity: 0});
    gsap.from("#home h3", {duration: 0.7,delay: 0.2, y: -20, opacity: 0});
    gsap.from("#home .link-wraper a", {duration: 0.7,delay: 0.4, y: -20, opacity: 0});
    
    // ... Customer Service ...
    setTimeout(() => {
        document.querySelector('#cservice-wraper h4').classList.remove('opacity-0');
        setTimeout(() => {
            if(!csHover){
                document.querySelector('#cservice-wraper h4').classList.add('opacity-0');
            }
        }, 8000);
    }, 3000);
});

// ... Customer Service On Hover ...
let csHover = false;
$("#cservice").on({
    mouseenter: function () {
        csHover=true;
        document.querySelector('#cservice-wraper h4 span').innerHTML = 'Kami aktif 24 jam!';
        document.querySelector('#cservice-wraper h4').classList.remove('opacity-0');
    },
    mouseleave: function () {
        csHover=false;
        document.querySelector('#cservice-wraper h4').classList.add('opacity-0');
    }
});

// ... Links at Navbar ...
$('.link-wraper a.hrefSection').on('click',function(e){
    e.preventDefault();

    // 1. remove marker from all link
    $('.link-wraper a').each(function(){
        if(!$(this).hasClass('notNavHref')){
            $(this).removeClass('text-myyellow border-b-2 border-myyellow pb-2 md:pb-1');
        }
    });
    
    // 2. add marker to clicked link
    $(`a.href${$(this).attr('href')}`).each(function(){
        if(!$(this).hasClass('notNavHref')){
            $(this).addClass('text-myyellow border-b-2 border-myyellow pb-2 md:pb-1')
        }
    });
    
    // 3. close navbar in mobile view
    burgerClose(document.querySelector('.burgerClose'),'');

    // 4. hide all section
    $('#container section').each(function(){
        $(this).addClass('opacity-0');
        setTimeout(() => {
            $(this).removeClass('flex').addClass('hidden');
        }, 200);
    })

    // 5. show clicked section
    setTimeout(() => {
        $(`#container section#${$(this).attr('href')}`).removeClass('hidden').addClass('flex');
        setTimeout(() => {
            $(`#container section#${$(this).attr('href')}`).removeClass('opacity-0');
        }, 100);
    }, 200);

    if($(this).attr('href') == 'about'){
        gsap.from("#about #leftAbout", {duration: 0.7,delay:0.3, x: -20, opacity: 0});
        gsap.from("#about #rightAbout", {duration: 0.7,delay:0.3, x: 20, opacity: 0});
    }

    // 6. auto scroll images testi
    if($(this).attr('href') == 'testimoni'){
        imgTestiAutoScroll();
        gsap.from("#testimoni h1", {duration: 0.7,delay:0.3, y: -20, opacity: 0});
        gsap.from("#testimoni h2", {duration: 0.7,delay:0.3, y: -20, opacity: 0});
        gsap.from("#img-wraper", {duration: 0.7,delay:0.3, y: 20, opacity: 0});
    }
});

// ... auto scroll images testi ...
function imgTestiAutoScroll(){
    if(!imgTestiScrolled){
        imgTestiScrolled = true;
        setTimeout(() => {
            document.querySelector('#testimoni #img-wraper').scrollTo({
                top: document.querySelector('#testimoni #img-wraper').firstElementChild.nextElementSibling.offsetTop,
                behavior: "smooth"
            });
            setTimeout(() => {
                document.querySelector('#testimoni #img-wraper').scrollTo({
                    top: document.querySelector('#testimoni #img-wraper').firstElementChild.offsetTop - 400,
                    behavior: "smooth"
                });
            }, 1000);
        }, 2000);
    }
}

// ... open navbar ...
function burgerOpen(t,event){
    t.classList.add('translate-x-40');
    document.querySelector('.burgerClose').classList.remove('translate-x-40');
    document.querySelector('#link-wraper2').setAttribute('style','transform:translateX(0px)');
    document.querySelectorAll('#section-wraper >*').forEach(element => {
        element.classList.add('opacity-0');
    });
    let i =1;
    document.querySelectorAll('#link-wraper2 a').forEach(function(e){
        i++;
        setTimeout(() => {
            e.classList.remove("translate-x-28");
            e.classList.remove("opacity-0");
        }, 100*i);
    });
}

// ... close navbar ...
function burgerClose(t,event){
    t.classList.add('translate-x-40');
    document.querySelector('.burgerOpen').classList.remove('translate-x-40');
    document.querySelector('#link-wraper2').setAttribute('style',`transform:translateX(${window.innerWidth+768}px)`);
    setTimeout(() => {
        document.querySelectorAll('#section-wraper >*').forEach(element => {
            element.classList.remove('opacity-0');
        });
    }, 400);
    document.querySelectorAll('#link-wraper2 a').forEach(function(e){
        e.classList.add("translate-x-28");
        e.classList.add("opacity-0");
    });
}

function getTesti(){
    $.ajax({
        url: API_URL+'testimoni/',
        method:'post',
        data:{code:'031020'},
        success:(databack) =>{
            let response = jQuery.parseJSON(databack);
            let el = '';
            response.forEach((r,i) => {
                if(i>=6){
                    if(i>=8){
                        el += `<div class="relative block sm:hidden transition rounded-sm md:rounded overflow-hidden">
                            <div class="div-see-icon bg-testi-clicked target-close hidden lg:block absolute z-10 top-0 bottom-0 left-0 right-0 px-4 md:px-40 w-full h-full hidden lg:flex justify-center items-center cursor-pointer opacity-0 transition duration-100" onClick="testiClick(this,'desktop');">
                                <img src="${BASE_URL}asset/img/eye.svg" class="target-close w-8 md:w-10 transition duration-300">
                            </div>
                            <img src="${r.imgurl}" class="img-testi block relative z-20 w-full h-full cursor-pointer" onClick="testiClick(this,'mobile');">
                        </div>`;
                    }else{
                        el += `<div class="relative block md:hidden transition rounded-sm md:rounded overflow-hidden">
                            <div class="div-see-icon bg-testi-clicked target-close hidden lg:block absolute z-10 top-0 bottom-0 left-0 right-0 px-4 md:px-40 w-full h-full hidden lg:flex justify-center items-center cursor-pointer opacity-0 transition duration-100" onClick="testiClick(this,'desktop');">
                                <img src="${BASE_URL}asset/img/eye.svg" class="target-close w-8 md:w-10 transition duration-300">
                            </div>
                            <img src="${r.imgurl}" class="img-testi block relative z-20 w-full h-full cursor-pointer" onClick="testiClick(this,'mobile');">
                        </div>`;
                    }
                }else{
                    el += `<div class="relative transition rounded-sm md:rounded overflow-hidden">
                        <div class="div-see-icon bg-testi-clicked target-close absolute z-10 top-0 bottom-0 left-0 right-0 px-4 md:px-40 w-full h-full hidden lg:flex justify-center items-center cursor-pointer opacity-0 transition duration-100" onClick="testiClick(this,'desktop');">
                            <img src="${BASE_URL}asset/img/eye.svg" class="target-close w-8 md:w-10 transition duration-300">
                        </div>
                        <img src="${r.imgurl}" class="img-testi block relative z-20 w-full h-full cursor-pointer" onClick="testiClick(this,'mobile');">
                    </div>`;
                }
            });
            $('#testimoni #img-wraper').html(el);
            testiHover();
        }
    });
}

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