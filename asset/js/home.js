window.addEventListener("load",(function(){testimoniLoadingState(),document.querySelector("#divloader").classList.add("hidden"),document.querySelector("body").classList.remove("overflow-hidden"),gsap.from("#home #main-text",{duration:.7,y:-20,opacity:0}),gsap.from("#home #second-text",{duration:.7,delay:.2,y:-20,opacity:0}),gsap.from("#home #buttons-wraper",{duration:.7,delay:.4,y:-20,opacity:0}),runCservice(),navigator.onLine||showError("Ups, connection lost!",!0)}));let navHrefs=document.querySelectorAll("a.href-navigator");navHrefs.forEach((e=>{e.addEventListener("click",(e=>{if("product"===e.target.innerHTML)return!1;e.preventDefault();let t=e.target,o=e.target.getAttribute("href");navHrefs.forEach((e=>{e.classList.remove("nav-href-active")})),"buttons-wraper"===t.parentElement.getAttribute("id")?document.querySelector(`a.href-${o}`).classList.add("nav-href-active"):(t.classList.add("nav-href-active"),doBurger()),document.querySelectorAll("#container section").forEach((e=>{e.classList.add("opacity-0"),setTimeout((()=>{e.classList.remove("flex"),e.classList.add("hidden")}),200)})),setTimeout((()=>{let e=document.querySelector(`#container section#${o}`);e.classList.remove("hidden"),e.classList.add("flex"),setTimeout((()=>{e.classList.remove("opacity-0"),"about"==o&&(gsap.from("#about #left-side",{duration:.7,delay:.3,x:-16,opacity:0}),gsap.from("#about #right-side",{duration:.7,delay:.3,x:16,opacity:0})),"testimoni"==o&&(gsap.from("#testimoni #main-text",{duration:.7,delay:.3,y:-20,opacity:0}),gsap.from("#testimoni #second-text",{duration:.7,delay:.3,y:-20,opacity:0}),gsap.from("#testimonies-wraper",{duration:.7,delay:.3,y:20,opacity:0}),testiAutoScroll())}),100)}),200)}))}));let sections=document.querySelectorAll("main section");function doBurger(){sections.forEach((e=>{e.classList.toggle("opacity-0")})),document.querySelector("#burgerOpen").classList.toggle("translate-x-20"),document.querySelector("#burgerClose").classList.toggle("translate-x-20"),["w-0","w-full","sm:w-1/2"].forEach((e=>{document.querySelector("#nav-href").classList.toggle(e)}));let[e,t]=["hidden","opacity-0"];document.querySelector("#href-wraper").classList.toggle(e),setTimeout((()=>{document.querySelector("#href-wraper").classList.toggle(t)}),300);let o=1;document.querySelector("#sosmed-wraper").classList.toggle(e),document.querySelectorAll("#sosmed-wraper a").forEach((e=>{o++,setTimeout((()=>{e.classList.toggle("opacity-0"),e.classList.toggle("translate-x-28")}),100*o)}))}function runCservice(){let e=!1,t=document.querySelector("#cservice-href"),o=document.querySelector("#cservice-message");setTimeout((()=>{o.classList.remove("opacity-0"),setTimeout((()=>{e||o.classList.add("opacity-0")}),8e3)}),3e3),t.addEventListener("mouseenter",(()=>{e=!0,o.classList.remove("opacity-0"),o.querySelector("span").innerHTML="Kami aktif 24 jam!"})),t.addEventListener("mouseleave",(()=>{e=!1,o.classList.add("opacity-0")}))}function aboutArrow(e){e.classList.toggle("rotate-90"),e.classList.toggle("-rotate-90");let t=document.querySelector("#content-wraper"),o=document.querySelector(`#${e.dataset.target}`);t.scrollTo({top:o.offsetTop,behavior:"smooth"}),"right-side"===e.dataset.target?(e.setAttribute("data-target","left-side"),gsap.from("#about #right-side",{duration:.7,delay:.3,x:16,opacity:0})):(e.setAttribute("data-target","right-side"),gsap.from("#about #left-side",{duration:.7,delay:.3,x:-16,opacity:0}))}function getDataFromApi(e,t=null){return new Promise(((o,s)=>{let a=new XMLHttpRequest,r=new FormData;null!==t&&r.append("atribut",t),a.open("POST",e,!0),a.timeout=3e4,a.send(r),a.ontimeout=()=>(s(Error("Ups, request timeout")),0),a.onload=()=>{try{o(JSON.parse(a.responseText))}catch(e){s(Error("Ups, server error"))}}}))}let getLinkSosmed=getDataFromApi(API_URL+"getLinkSosmed");function updateStatistic(e,t=null,o=null){null!==o&&o.preventDefault();let s=null!==t?t.dataset.href:null;getDataFromApi(API_URL+"updateStatistic/",e).catch((e=>{})),null!==s&&("not available"!==s?window.open(s,"blank"):alert("Maaf, lapak belum tersedia"))}getLinkSosmed.then((e=>{document.querySelector("a#tokopedia").setAttribute("data-href",e.tokopedia),document.querySelector("a#shopee").setAttribute("data-href",e.shopee),document.querySelector("a#lazada").setAttribute("data-href",e.lazada),document.querySelectorAll("a.whatsapp").forEach((t=>{t.setAttribute("data-href",e.whatsapp)}))})).catch((e=>{})),!0===NewVisitor&&updateStatistic("pengunjung");let getTesti=getDataFromApi(`${API_URL}getTestimonies/`);getTesti.then((e=>{let t="";e.forEach(((e,o)=>{t+=`<div class="bg-tgadget-1000 relative ${o>=6?"flex md:hidden":""} ${o>=8?"flex sm:hidden":""} flex items-center justify-center transition rounded-sm md:rounded opacity-80 overflow-hidden">\n                <div class="eyeWraper w-full h-full absolute z-20 flex justify-center items-center cursor-pointer opacity-0 hover:opacity-100" style="background: rgba(0,0,0,0.6);">\n                    <img src="${BASE_URL}asset/img/eye.svg" class="w-8 md:w-10 transition duration-300">\n                </div>\n                <img src="${BASE_URL}asset/img/bg-testi.webp" class="w-full opacity-0">\n                <img src="${BASE_URL}asset/img/loading.svg" class="loadingImg w-12 sm:w-16 absolute opacity-80">\n                <img src="${e.imgurl}" class="img-testi block absolute z-10 w-full h-full cursor-pointer">\n            </div>`})),testimoniesWraper.innerHTML=t})).catch((e=>{testimoniLoadingState("notfound.webp",`${e.message}`)})).finally((()=>{document.querySelectorAll("img.img-testi").forEach((e=>{e.onload=()=>{e.parentElement.classList.remove("opacity-80"),e.previousElementSibling.remove()}}));let e=document.querySelectorAll(".eyeWraper"),t=document.querySelector("#img-preview"),o=document.querySelector("#preview-wraper");e.forEach((e=>{e.addEventListener("click",(e=>{e.target.classList.contains("eyeWraper")&&(o.classList.remove("hidden"),t.src=e.target.nextElementSibling.nextElementSibling.src,gsap.from("#img-preview",{duration:.3,opacity:0,scale:.2}))}))})),o.addEventListener("click",(e=>{e.target.classList.contains("not-close-preview")||(t.src="",o.classList.add("hidden"))}))}));let testiIsScrolled=!1,testimoniesWraper=document.querySelector("#testimoni #testimonies-wraper");function testimoniLoadingState(e="loading.svg",t="please wait..."){let o="";for(let s=0;s<9;s++)o+=`<div class="relative block ${s>=6?"md:hidden":""} ${s>=8?"sm:hidden":""} transition rounded-sm md:rounded overflow-hidden opacity-80">\n            <div class="bg-tgadget-1000 w-full h-full absolute flex flex-col justify-center items-center">\n                <img src="${BASE_URL}asset/img/${e}" class="loadingImg w-12 sm:w-16 opacity-80">\n                <span class="mt-6 font-extrabold text-md">${t}</span>\n            </div>\n            <img src="${BASE_URL}asset/img/bg-testi.webp" class="w-full opacity-0">\n        </div>`;testimoniesWraper.innerHTML=o}function testiAutoScroll(){testiIsScrolled||(testiIsScrolled=!0,setTimeout((()=>{testimoniesWraper.scrollTo({top:testimoniesWraper.firstElementChild.nextElementSibling.offsetTop,behavior:"smooth"}),setTimeout((()=>{testimoniesWraper.scrollTo({top:testimoniesWraper.firstElementChild.offsetTop,behavior:"smooth"})}),1e3)}),2e3))}