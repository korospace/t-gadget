navigator.onLine||showError("Ups, connection lost!",!0);let productsWraper=document.querySelector("#products-wraper"),btnLoadMore=document.querySelector("#load-more"),arrProducts=[];function loadingCard(){for(let e=1;e<=10;e++){htmlToElements(`<a href="" class="loadingCard w-full ${e>6&&e<9?"hidden sm:flex":"flex"} ${e>=9?"hidden lg:flex":"flex"} flex-col rounded-tl-lg rounded-br-lg overflow-hidden opacity-60 animate-pulse">\n            <div class="bg-black w-full flex-1 relative flex justify-center items-center">\n                <img class="img-bground w-full opacity-0" src="${BASE_URL}asset/img/bg-produk.webp">\n            </div>\n            <div class="py-3">\n                <div class="flex">\n                    <span class="bg-black block w-3/5 h-2 mr-2 rounded-md"></span>\n                    <span class="bg-black block w-1/5 h-2 mr-2 rounded-md"></span>\n                    <span class="bg-black block w-1/5 h-2 rounded-md"></span>\n                </div>\n                <div class="flex mt-2">\n                    <span class="bg-black block w-3/5 h-2 rounded-md"></span>\n                </div>\n            </div>\n        </a>`).forEach((e=>{productsWraper.insertBefore(e,productsWraper.lastElementChild)}))}}function doXhr(e,t=null){return new Promise(((r,a)=>{let o=new XMLHttpRequest;o.open("POST",e,!0),o.timeout=3e4,o.ontimeout=()=>(a(Error("Ups, request timeout!")),0),o.send(t),o.onload=()=>{try{r(JSON.parse(o.responseText))}catch(e){a(Error("Ups, server error"))}}}))}loadingCard(),document.querySelectorAll(".img-bground").forEach((e=>{e.onload=()=>{document.querySelector("#divloader").classList.add("hidden")}}));let getLinkSosmed=doXhr(API_URL+"getLinkSosmed");function updateStatistic(e=null,t=null,r=null,a=null){null!==r&&r.preventDefault();let o=null!==t?t.dataset.href:null,n=new FormData;null!==a&&n.append("id",a),null!==e&&n.append("atribut",e),doXhr(API_URL+"updateStatistic",n).catch((e=>{})),null!==o&&("not available"!==o?window.open(o,"blank"):alert("Maaf, lapak belum tersedia"))}getLinkSosmed.then((e=>{document.querySelector("a#tokopedia").setAttribute("data-href",e.tokopedia),document.querySelector("a#shopee").setAttribute("data-href",e.shopee),document.querySelector("a#lazada").setAttribute("data-href",e.lazada),document.querySelector("a#whatsapp").setAttribute("data-href",e.whatsapp)})).catch((e=>{})),!0===NewVisitor&&updateStatistic("pengunjung");let sectionContent=document.querySelector("section#content"),burgerCategory=document.querySelector("#burger-category"),categoriesContainer=document.querySelector("#categories-container"),categoriesWraper=document.querySelector("#categories-wraper"),elCategory="";for(let e=0;e<10;e++)elCategory+=`<span class="w-36 min-h-full flex flex-col justify-center px-6 md:px-8 ${e>0?"border-l border-tgadget-200":""} cursor-pointer opacity-90">\n        <div class="w-full flex items-center">\n            <span class="bg-tgadget-1000 w-3/5 h-1 sm:h-1.5 mr-2 animate-pulse rounded-sm"></span>\n            <span class="bg-tgadget-1000 w-1/5 h-1 sm:h-1.5 mr-2 animate-pulse rounded-sm"></span>\n            <span class="bg-tgadget-1000 w-1/5 h-1 sm:h-1.5 animate-pulse rounded-sm"></span>\n        </div>\n        <div class="w-full flex items-center mt-2">\n            <span class="bg-tgadget-1000 w-4/5 h-1 sm:h-1.5 mr-2 animate-pulse rounded-sm"></span>\n        </div>\n    </span>`,categoriesWraper.innerHTML=elCategory;burgerCategory.addEventListener("click",(()=>{burgerCategory.classList.toggle("bg-tgadget-200"),"sm-411:h-0 sm-411:border-0 sm-411:overflow-hidden".split(" ").forEach(((e,t)=>{setTimeout((()=>{categoriesContainer.classList.toggle(e)}),2===t?300:0)})),categoriesWraper.classList.toggle("sm-411:hidden")}));let getCategories=doXhr(API_URL+"getCategories");getCategories.then((e=>{elCategory='<span class="bg-tgadget-100 min-w-max min-h-full block flex jusify-center items-center px-6 md:px-8 border-t border-tgadget-200 cursor-pointer opacity-80 hover:opacity-100">\n            semua kategori\n        </span>',e.sort(((e,t)=>e.kategori.length-t.kategori.length)).forEach((e=>{elCategory+=`<span class="min-w-max min-h-full block flex jusify-center items-center px-6 md:px-8 border-t border-l border-tgadget-200 cursor-pointer opacity-80 hover:opacity-100">\n                    ${e.kategori}\n                </span>`,categoriesWraper.innerHTML=elCategory})),categoriesWraper.querySelectorAll("span").forEach((e=>{e.addEventListener("click",(e=>{categoriesWraper.querySelectorAll("span").forEach((e=>{e.classList.remove("bg-tgadget-100")})),e.target.classList.toggle("bg-tgadget-100"),"Semua Kategori"!==e.target.innerText?(btnLoadMore.setAttribute("data-filterby","kategori"),btnLoadMore.setAttribute("data-filterval",e.target.innerText.toLowerCase()),funcGetProducts(0,"kategori",e.target.innerText.toLowerCase())):(btnLoadMore.removeAttribute("data-filterby"),btnLoadMore.removeAttribute("data-filterval"),cleanCard("productCard"),loadingCard(),funcGetProducts(0,!1,!1),scrollToTopOfContent())}))}))})).catch((e=>{showError(e.message,!0)}));let inputKeyword=document.querySelector("#input-keyword"),sugestionsWraper=document.querySelector("#sugestions-wraper"),searchIcon=document.querySelector("label[for=input-keyword] img"),keywords=[],getKeywords=doXhr(API_URL+"getKeywords");getKeywords.then((e=>{e.map((e=>e.keyword.split("|"))).map((e=>e.map((e=>keywords.push(e))))),keywords=keywords.sort(((e,t)=>e.length-t.length)),document.querySelectorAll("li.loadingSugestion").forEach((e=>{e.remove()}))})).catch((e=>{showError(e.message,!0)})),inputKeyword.addEventListener("keyup",(()=>{""===inputKeyword.value?(searchIcon.style.opacity="1",searchIcon.src=BASE_URL+"asset/img/search.svg",sugestionsWraper.innerHTML=""):(searchIcon.style.opacity="0.8",searchIcon.src=BASE_URL+"asset/img/cancel.svg",createSugestions(inputKeyword.value))}));let createSugestions=e=>{let t="";if(keywords.length<=0)for(let e=0;e<6;e++)t+='<li class="loadingSugestion w-full flex items-center px-3 py-4 sm:py-6 text-left cursor-pointer hover:bg-gray-200" style="border-bottom:1px solid rgba(49,53,59,0.4);">\n                <span class="bg-gray-400 w-full h-1.5 animate-pulse rounded-sm opacity-80"></span>\n            </li>';else keywords.forEach((r=>{r.includes(e)&&(t+=`<li class="liSugestion w-full block px-3 py-4 sm:py-6 text-left cursor-pointer hover:bg-gray-200" style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${r}">${r}</li>`)})),t+=`<li class="liSugestion w-full block px-3 py-4 sm:py-6 text-left cursor-pointer hover:bg-gray-200" style="border-bottom:1px solid rgba(49,53,59,0.4);" data-value="${e}">cari "${e}"</li>`;sugestionsWraper.innerHTML=t};function clearInputKeyword(){inputKeyword.value="",searchIcon.style.opacity="1",searchIcon.src=BASE_URL+"asset/img/search.svg",sugestionsWraper.innerHTML=""}window.addEventListener("click",(e=>{e.target.classList.contains("liSugestion")?(sugestionsWraper.innerHTML="",categoriesWraper.querySelectorAll("span").forEach((e=>{e.classList.remove("bg-tgadget-100")})),btnLoadMore.setAttribute("data-filterby","keyword"),btnLoadMore.setAttribute("data-filterval",e.target.dataset.value),funcGetProducts(0,"keyword",e.target.dataset.value)):clearInputKeyword()}));let functCountDown="",containerCountD=document.querySelector("#countdown-container"),imageCountD=document.querySelector("#countdown-img"),getCountDown=doXhr(API_URL+"getCountDown");function closeCountDown(e){e.target.classList.contains("close")&&(clearInterval(functCountDown),containerCountD.classList.add("hidden"))}getCountDown.then((e=>{let t=1===e.day.length?"0"+e.day:e.day,r=1===e.month.length?"0"+e.month:e.month,a=1===e.year.length?"0"+e.year:e.year;functCountDown=setInterval((()=>(()=>{const e=new Date(`${a}-${r}-${t}T00:00`).getTime()-(new Date).getTime();document.querySelector("span#day").innerHTML=Math.floor(e/864e5),document.querySelector("span#hour").innerHTML=Math.floor(e%864e5/36e5),document.querySelector("span#minute").innerHTML=Math.floor(e%36e5/6e4),document.querySelector("span#second").innerHTML=Math.floor(e%6e4/1e3)})()),1e3),imageCountD.src=e.imgurl,containerCountD.classList.remove("hidden"),imageCountD.onload=()=>{imageCountD.previousElementSibling.remove()}})).catch((e=>{}));let getBanners=doXhr(API_URL+"getBanners"),glideTrackDesktop=document.querySelector("#glide-track-desktop .glide__slides"),glideTrackMobile=document.querySelector("#glide-track-mobile .glide__slides");function funcGetProducts(e=0,t=!1,r=!1){let a=new FormData;a.append("offset",e),a.append("limit",10),t&&(a.append("filterBy",t),a.append("filterVal",r),cleanCard("productCard"),loadingCard(),scrollToTopOfContent()),showError("",!1),doXhr(API_URL+"getProductsWithLimit",a).then((e=>{e.length<=9?(btnLoadMore.innerText="no more product",setTimeout((()=>{btnLoadMore.classList.add("z-min-1"),btnLoadMore.classList.add("opacity-0"),btnLoadMore.classList.remove("opacity-80")}),1e3)):(btnLoadMore.innerText="load more",btnLoadMore.classList.remove("z-min-1"),btnLoadMore.classList.remove("opacity-0"),btnLoadMore.classList.add("opacity-80")),"keyword"===t&&e.length<=0&&showError("Sory, product not found!",!0),e.forEach((e=>{htmlToElements(`<a href="" class="productCard bg-white relative w-full h-full flex flex-col rounded-tl-lg rounded-br-lg overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);" onclick="cardOnClick(event,${e.id});">\n                    <span class="bg-black absolute z-30 top-0 right-0 px-2 py-1 text-tgadget-1000 text-xs sm-411:text-sm sm:text-xs" style="min-width: max-content;">Rp ${createHarga(e.harga)}</span>\n                    <div class="w-full flex-1 relative flex justify-center items-center">\n                        <img class="img-bground w-full" src="${BASE_URL}asset/img/bg-produk.webp">\n                        <img class="absolute w-8 sm:w-12 opacity-80 imgLoading" src="${BASE_URL}asset/img/loading.svg">\n                        <div class="bg-white w-full absolute z-20">\n                            <img class="imgProduk w-full" src="${e.imgurl}" alt="${e.nama}">\n                        </div>\n                    </div>\n                    <div class="bg-tgadget-1000 px-3 pt-3 pb-2 text-xs sm-411:text-base sm:text-sm md:text-base md-911:text-sm text-left text-black border-4 border-tgadget-1000">\n                        <span class="w-full" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">${e.nama}</span>\n                    </div>\n                </a>`).forEach((e=>{productsWraper.insertBefore(e,productsWraper.lastElementChild)})),insertArray(e)})),rmImgSpinner(),cleanCard("loadingCard")})).catch((e=>{}))}function htmlToElements(e){var t=document.createElement("template");return t.innerHTML=e,t.content.childNodes}function insertArray(e){if(0==arrProducts.length)arrProducts.push(e);else{!arrProducts.find((t=>t.id==e.id))&&arrProducts.push(e)}}function createHarga(e){let t=1,r="",a="";for(let a=[...e].length-1;a>=0;a--)4==t?(r+="."+[...e][a],t=1):r+=[...e][a],t++;for(let e=r.length-1;e>=0;e--)a+=r[e];return a}function rmImgSpinner(){document.querySelectorAll("img.imgProduk").forEach((e=>{e.onload=()=>{e.parentElement.previousElementSibling.remove()}}))}function cleanCard(e){document.querySelectorAll(`.${e}`).forEach((e=>{e.remove()}))}function scrollToTopOfContent(){window.scrollTo({top:sectionContent.offsetTop})}getBanners.then((e=>{let t="",r="";e.forEach((e=>{t+=`<img src="${e.imgurl}" class="img-banner w-full h-full">`,r+=`<img src="${e.imgurl_mobile}" class="img-banner w-full h-full">`})),glideTrackDesktop.innerHTML=t,glideTrackMobile.innerHTML=r;let a={type:"carousel",focusAt:"center",autoplay:5e3,animationTimingFunc:"ease-in-out",animationDuration:1e3,gap:0,perView:1};new Glide("#glide_desktop",a).mount(),new Glide("#glide_mobile",a).mount(),document.querySelectorAll(".img-banner").forEach((e=>{e.onload=()=>{document.querySelectorAll(".bg-wraper").forEach((e=>{e.classList.remove("bg-black"),e.classList.remove("animate-pulse"),e.classList.remove("opacity-0")}))}}));let o=document.querySelectorAll(".glide__arrow--left"),n=document.querySelectorAll(".glide__arrow--right");document.querySelectorAll(".glide").forEach((e=>{e.addEventListener("mouseenter",(()=>{o.forEach((e=>{e.classList.remove("opacity-0"),e.classList.add("-translate-x-12")})),n.forEach((e=>{e.classList.remove("opacity-0"),e.classList.add("translate-x-12")}))})),e.addEventListener("mouseleave",(()=>{o.forEach((e=>{e.classList.add("opacity-0"),e.classList.remove("-translate-x-12")})),n.forEach((e=>{e.classList.add("opacity-0"),e.classList.remove("translate-x-12")}))}))}))})).catch((e=>{})),funcGetProducts(),btnLoadMore.addEventListener("click",(e=>{let t=document.querySelectorAll(".productCard").length,r=void 0!==btnLoadMore.dataset.filterby&&btnLoadMore.dataset.filterby,a=void 0!==btnLoadMore.dataset.filterval&&btnLoadMore.dataset.filterval;e.target.innerHTML=`<img class="w-6" src="${BASE_URL}asset/img/loading.svg"/>`,funcGetProducts(t,r,a)}));let modalsDetail=document.querySelector("#modals-detail"),btnClose=modalsDetail.querySelector("#btn-close"),detailContainer=modalsDetail.querySelector("#detail-container"),leftSide=modalsDetail.querySelector("#left-side"),rightSide=modalsDetail.querySelector("#right-side");function cardOnClick(e,t){updateStatistic(null,null,e,t);let r=arrProducts.find((e=>e.id==t));modalsDetail.querySelector(".img-product").src=r.imgurl,modalsDetail.querySelector("#stok").innerText=1==r.stok?"ready":"habis",modalsDetail.querySelector("#product-name").innerText=r.nama,modalsDetail.querySelector("#price").innerText=createHarga(r.harga),modalsDetail.querySelector("#description").innerText=r.deskripsi,modalsDetail.querySelector("#isipaket ul").innerHTML=createLi(r.isipaket),modalsDetail.querySelector("#fitur ul").innerHTML=createLi(r.fitur),modalsDetail.querySelector("#spesifikasi ul").innerHTML=createLi(r.spesifikasi),""!==r.linktp&&(buyContainer.querySelector("#link-tokped-wraper").classList.remove("hidden"),buyContainer.querySelector("#link-tokped").innerText=r.linktp,buyContainer.querySelector("#btn-link-tokped").setAttribute("data-href",r.linktp),buyContainer.querySelector("#btn-link-tokped").setAttribute("onclick",`updateStatistic('tokopedia',this,event,${r.id});`)),""!==r.linksp&&(buyContainer.querySelector("#link-shopee-wraper").classList.remove("hidden"),buyContainer.querySelector("#link-shopee").innerText=r.linksp,buyContainer.querySelector("#btn-link-shopee").setAttribute("data-href",r.linksp),buyContainer.querySelector("#btn-link-shopee").setAttribute("onclick",`updateStatistic('shopee',this,event,${r.id});`)),""!==r.linklz&&(buyContainer.querySelector("#link-lazada-wraper").classList.remove("hidden"),buyContainer.querySelector("#link-lazada").innerText=r.linklz,buyContainer.querySelector("#btn-link-lazada").setAttribute("data-href",r.linklz),buyContainer.querySelector("#btn-link-lazada").setAttribute("onclick",`updateStatistic('lazada',this,event,'${r.linklz}',${r.id});`)),""!==r.linkwa&&(buyContainer.querySelector("#link-wa-wraper").classList.remove("hidden"),buyContainer.querySelector("#link-wa").innerText=r.linkwa,buyContainer.querySelector("#btn-link-wa").setAttribute("data-href",r.linkwa),buyContainer.querySelector("#btn-link-wa").setAttribute("onclick",`updateStatistic('whatsapp',this,event,'${r.linkwa}',${r.id});`)),document.body.classList.add("overflow-hidden"),modalsDetail.classList.toggle("hidden"),setTimeout((()=>{detailContainer.classList.remove("delay-500"),btnClose.classList.add("delay-500"),leftSide.classList.add("delay-500"),rightSide.classList.add("delay-500"),detailContainer.classList.toggle("h-6/7"),btnClose.classList.toggle("opacity-0"),leftSide.classList.toggle("opacity-0"),rightSide.classList.toggle("opacity-0")}),50)}function createLi(e){let t="";return e.split("|").forEach((e=>{t+=`<li>${e}</li>`})),t}modalsDetail.addEventListener("click",(e=>{e.target.classList.contains("close")&&(document.body.classList.remove("overflow-hidden"),btnClose.classList.remove("delay-500"),leftSide.classList.remove("delay-500"),rightSide.classList.remove("delay-500"),detailContainer.classList.add("delay-500"),btnClose.classList.toggle("opacity-0"),leftSide.classList.toggle("opacity-0"),rightSide.classList.toggle("opacity-0"),detailContainer.classList.toggle("h-6/7"),setTimeout((()=>{modalsDetail.classList.toggle("hidden"),rightSide.classList.contains("top-20")&&doUpAndDown()}),900))}));let buyContainer=document.querySelector("#buy-container"),bgOuter=buyContainer.querySelector("#bg-outer");function openLinkForBuy(){buyContainer.classList.remove("hidden"),setTimeout((()=>{bgOuter.classList.remove("scale-90"),bgOuter.classList.remove("opacity-0")}),50)}buyContainer.addEventListener("click",(e=>{e.target.classList.contains("close")&&(bgOuter.classList.add("scale-90"),bgOuter.classList.add("opacity-0"),setTimeout((()=>{buyContainer.classList.add("hidden")}),300),buyContainer.querySelectorAll(".links-wraper").forEach((e=>{e.classList.add("hidden")})))}));let btnUpAndDown=document.querySelector("#upAndDown"),descriptionWraper=document.querySelector("#description-wraper"),doUpAndDown=()=>{btnUpAndDown.classList.toggle("rotate-180"),rightSide.classList.toggle("top-20"),descriptionWraper.classList.toggle("sm:block"),descriptionWraper.classList.toggle("hidden"),setTimeout((()=>{descriptionWraper.classList.toggle("sm:opacity-100"),descriptionWraper.classList.toggle("opacity-0")}),50)};