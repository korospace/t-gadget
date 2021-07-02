<section class="pt-32 mysm:pt-20 flex-1 flex flex-col justify-between items-center overflow-auto">
    
    <!-- banner -->
    <!-- <div id="banner-container" class="px-5 mymd:px-10 pt-2 sm:pt-3 w-full transition-all duration-500">
        
        <div class="glide mysm2:h-32 mysm:h-44 sm:h-72.5 flex justify-center items-center rounded-md overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);">
            <div class="glide__track relative z-30" data-glide-el="track">
                <div class="glide__slides flex items-center">
                </div>
            </div>
            <img src="<?= BASE_URL; ?>asset/img/loading.svg" class="loadingBanner absolute z-20 w-8 sm:w-12 opacity-80">
            <img src="<?= BASE_URL; ?>asset/img/banner.webp" class="bannerTumbal absolute z-10 w-full h-24 mysm2:h-32 mysm:h-44 sm:h-auto opacity-0">
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                    <img class="w-full transform translate-x-1.5 sm:translate-x-2.5" src="<?= BASE_URL; ?>asset/img/arrowleft-y.png">
                </button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                    <img class="w-full transform -translate-x-1.5 sm:-translate-x-2.5" src="<?= BASE_URL; ?>asset/img/arrowright-y.png">
                </button>
            </div>
        </div>

    </div> -->

    <!-- Products -->
    <div id="produk-container" class="relative z-20 px-5 mymd:px-10 mt-8 mb-24 sm:mb-32 w-full">
        <div id="produk-wraper" class="w-full grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
            
        </div>
    </div>

    <!-- Products Not-found -->
    <div id="notfound" class="hidden mt-14 mb-8 w-40 mysm:w-52 opacity-80">
        <img src="<?= BASE_URL; ?>asset/img/notfound.webp" class="w-full">
        <h1 class="mt-6 font-extrabold text-lg mysm:text-xl text-center">Ups, Product Not Found</h1>
    </div>

    <!-- Footer -->
    <div id="footer" class="bg-footer relative pt-10 px-5 mymd:px-10 w-full">
        <div id="div-load-more" class="absolute -top-16 sm:-top-20 left-0 right-0 flex justify-center">
            <a id="btn-load-more" class="opacity-80 hover:opacity-100 focus:opacity-100" onclick="loadMore(this,event);" href="">
                <h1 class="border-b-2 border-black text-sm sm:text-xl text-black">load more</h1>
                <img class="w-6 sm:w-10 hidden opacity-80" src="<?= BASE_URL; ?>asset/img/loading.svg">
            </a>
        </div>
        <div class="w-full flex flex-col mysm:flex-row justify-between items-center">
            <div>
                <div class="flex items-center text-3xl mysm:text-2xl sm:text-3xl md:text-4xl font-bold">
                    <img class="w-12 mysm:w-9 md:w-12" src="<?= BASE_URL; ?>asset/img/logo-t-min.webp" alt="t-gadgetid">
                    <span class="ml-2">t-gadgetid</span>
                </div>
                <div class="mt-4 flex text-myyellow text-md mysm:text-xs sm:text-sm md:text-base tracking-wide">
                    <a class="px-2 py-1 mr-1 mysm:mr-0.5 sm:mr-1 opacity-80 hover:opacity-100 hover:bg-btn-kategori focus:bg-btn-kategori rounded-md" href="<?= BASE_URL; ?>home/">home</a>
                    <a class="px-2 py-1 mr-1 mysm:mr-0.5 sm:mr-1 opacity-80 hover:opacity-100 hover:bg-btn-kategori focus:bg-btn-kategori rounded-md" href="<?= BASE_URL; ?>home/">testimoni</a>
                    <a class="px-2 py-1 mr-1 mysm:mr-0.5 sm:mr-1 opacity-80 hover:opacity-100 hover:bg-btn-kategori focus:bg-btn-kategori rounded-md" href="<?= BASE_URL; ?>home/">about</a>
                </div>
            </div>
            <a class="contact-link bg-black px-2.5 sm:px-4 py-1.5 sm:py-2 hidden mysm:inline border-2 border-myyellow text-myyellow text-xs sm:text-sm md:text-base tracking-widest opacity-80 hover:opacity-100 rounded-sm" style="box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);"  data-atribut="whatsapp" data-href="https://mywa.link/3xwr4ga2" href="">contact us</a>
        </div>
        <div class="mt-4 w-full py-8 flex flex-col justify-between items-center" style="border-top: 0.8px solid rgba(255, 185, 3,0.5);">
            <h1 class="text-xs sm:text-sm text-myyellow opacity-80 tracking-wide">Copyright © 2020-<?= date("Y"); ?> T-GadgetID</h1>
            <div class="mt-4 flex items-center">
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStat(this,event,'https://www.tokopedia.com/t-gadgetid/product','tokopedia');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/tokopediav2.svg">
                </a>
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStat(this,event,'','shopee');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/shopeev2.svg">
                </a>
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStat(this,event,'','lazada');">
                    <img class="w-4 sm:w-5.5 md:w-7" src="<?= BASE_URL; ?>asset/img/lazadav2.svg">
                </a>
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStat(this,event,'https://mywa.link/3xwr4ga2','whatsapp');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/whatsappv2.svg">
                </a>
            </div>

        </div>
    </div>
</section>

<!-- Count-Down -->
<div id="popup-container" class="bg-testi-clicked close px-16 hidden z-min1 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center" onclick="closePopup(this,event);">
    <div id="popup-wraper" class="relative w-72">
        <div id="close-popup" class="bg-myyellow close absolute z-30 -top-2 mysm:-top-3 -right-2 mysm:-right-3 w-6 mysm:w-8 p-2 rounded-full cursor-pointer" onclick="closePopup(this,event);">
            <img class="w-full close" src="<?= BASE_URL; ?>asset/img/cancel.svg">
        </div>
        <div id="bg-img-popup" class="bg-myyellow p-0.5 w-full rounded-tl-xl rounded-tr-xl rounded-b-md">
            <div id="img-popup-wraper" class="relative w-full flex items-center justify-center rounded-tl-xl rounded-tr-xl rounded-b-md border-2 border-black overflow-hidden">
                <img id="popup-height" class="relative z-min1 w-full opacity-0" src="<?= BASE_URL; ?>asset/img/popup.webp">
                <img id="popup-height" class="absolute z-10 w-10 opacity-80" src="<?= BASE_URL; ?>asset/img/loading.svg">
                <img id="img-popup" class="absolute z-20 w-full" src="">
            </div>
        </div>
        <div id="bg-countdowb" class="bg-myyellow mt-2 w-full p-0.5 rounded-md">
            <div class="w-full flex border-2 border-black h-auto py-1 mysm2:py-2 rounded-md">
                <div class="flex-1 flex flex-col text-center border-r border-black" style="border-color: rgba(0,0,0,0.3);">
                    <span class="text-xs mysm2:text-md sm:text-2xl text-bold" id="day">0</span>
                    <span class="text-myxs2 mysm2:text-myxs sm:text-sm opacity-90">hari</span>
                </div>
                <div class="flex-1 flex flex-col text-center border-r border-black" style="border-color: rgba(0,0,0,0.3);">
                    <span class="text-xs mysm2:text-md sm:text-2xl text-bold" id="hour">0</span>
                    <span class="text-myxs2 mysm2:text-myxs sm:text-sm opacity-90">jam</span>
                </div>
                <div class="flex-1 flex flex-col text-center border-r border-black" style="border-color: rgba(0,0,0,0.3);">
                    <span class="text-xs mysm2:text-md sm:text-2xl text-bold" id="minute">0</span>
                    <span class="text-myxs2 mysm2:text-myxs sm:text-sm opacity-90">menit</span>
                </div>
                <div class="flex-1 flex flex-col text-center ">
                    <span class="text-xs mysm2:text-md sm:text-2xl text-bold" id="second">0</span>
                    <span class="text-myxs2 mysm2:text-myxs sm:text-sm opacity-90">detik</span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modals Box Detail Product -->
<div id="detail-container" class="bg-testi-clicked hidden z-min1 pt-16 fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-end" style="backdrop-filter: blur(4px);-webkit-backdrop-filter: blur(8px);">
    <!-- detail wraper -->
    <div id="detail-wraper" class="bg-gradient-to-r from-yellow-500 to-myyellow relative z-20 w-full h-0 flex flex-col sm:flex-row rounded-tl-xl rounded-tr-xl transition-all duration-300 overflow-hidden">
        <!-- close -->
        <div id="close-detail" class="close absolute z-30 top-0 right-0 w-10 p-3 opacity-0 hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer" onclick="closeDetail();">
            <img class="w-full close" src="<?= BASE_URL; ?>asset/img/cancel.svg">
        </div>
        <!-- image -->
        <div id="img-wraper" class="w-full sm:w-1/2 h-full px-0 sm:px-5 mymd:px-10 pt-0 sm:pt-10 md:pt-14 opacity-0 transition-all duration-300 box-border overflow-hidden">
            <div class="bg-white relative w-full h-full sm:h-auto mt-10 sm:mt-0 rounded-tl-xl rounded-tr-xl sm:rounded-tr-none overflow-hidden" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);">
                <img id="img-product" class="w-full" src="<?= BASE_URL; ?>asset/img/bgproduk.webp">
                <div id="bg-scroll" class="bg-testi-clicked absolute top-0 bottom-0 left-0 right-0 opacity-0 transition-all duration-300" onclick="zoomProduct(this);"></div>
            </div>
        </div>
        <!-- descrption -->
        <div id="deskription-wraper1" class="pt-0 sm:pt-10 md:pt-14 fixed sm:static bottom-0 w-full sm:w-auto sm:flex-1 h-0 sm:h-full opacity-0 transition-all duration-300 overflow-hidden">
            <div id="deskription-wraper2" class="bg-gradient-to-r from-yellow-500 sm:from-transparent to-myyellow sm:to-transparent w-full h-full rounded-t-xl sm:rounded-t-none overflow-hidden">
                <div id="swipe" class="w-full flex sm:hidden justify-center pt-1 sm:pt-0 pb-5 sm:pb-0 opacity-100 sm:opacity-0">
                    <div id="arrow" class="w-max transform rotate-180 transition-all duration-300 py-0.5 px-1.5 rounded-sm cursor-pointer" style="box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.3);">
                        <img id="img-product" class="w-3 opacity-70" src="<?= BASE_URL; ?>asset/img/down-arrow.svg">
                    </div>
                </div>
                <div id="deskription-wraper3" class="pr-5 mymd:pr-10 pl-5 sm:pl-3 mymd:pl-0 w-full h-full overflow-auto">
                    <div id="bag-1" class="w-full h-auto mb-3 mysm:mb-4 ">
                        <h1 id="status" class="bg-black w-max text-myyellow text-xs lg:text-sm tracking-wide px-2 py-1">lorem</h1>
                        <h1 id="nama" class="mt-3 mysm:mt-4 text-lg md:text-xl lg:text-2xl font-bold tracking-wide opacity-80" style="font-family: lato;">lorem</h1>
                        <h1 id="harga" class="mt-1.5 mysm:mt-2 text-sm md:text-md lg:text-lg tracking-widest opacity-90" style="font-family: lato;">lorem</h1>
                        <button class="bg-yellow-600 mt-4 py-2 md:py-3 mb-4 mysm:mb-6 w-full capitalize rounded-md md:rounded-lg opacity-90 hover:opacity-100 focus:outline-none" style="box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);" onclick="linkBuy();">
                            <h1 class="opacity-80 text-sm md:text-md lg:text-lg">pesan sekarang</h1>
                        </button>
                    </div>
                    <div id="bag-2" class="pb-5 mymd:pb-10 text-sm sm:text-base">
                        <div id="wraper">
                            <h1 id="text-deskripsi" class="font-bold tracking-wide text-justify opacity-80" style="text-indent: 10%;font-family: lato;"></h1>
                            <h1 class="mt-3 text-extrabold">Isi paket :</h1>
                            <h1 id="isipaket" class="font-bold tracking-wide text-justify opacity-80" style="font-family: lato;">
                                <ul class="list-inside list-square"></ul>
                            </h1>
                            <h1 class="mt-3 text-extrabold">Fitur :</h1>
                            <h1 id="fitur" class="font-bold tracking-wide text-justify opacity-80" style="font-family: lato;">
                                <ul class="list-inside list-square"></ul>
                            </h1>
                            <h1 class="mt-3 text-extrabold">Spesifikasi :</h1>
                            <h1 id="spesifikasi" class="font-bold tracking-wide text-justify opacity-80" style="font-family: lato;">
                                <ul class="list-inside list-square"></ul>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>

    <!-- link for buy -->
    <div id="buy-container" class="bg-testi-clicked fixed z-min1 top-0 bottom-0 left-0 right-0 close flex justify-center items-center opacity-0" onclick="closeBuy(this,event);">
        <div id="buy-wraper1" class="bg-gradient-to-r from-yellow-500 to-myyellow mx-3 w-24 p-1 rounded-md transition-all duration-700 delay-100 opacity-0">
            <div id="buy-wraper2" class="p-2 w-full h-full border-2 border-black rounded-md flex flex-col items-center">
                <h1 class="mt-2 text-center w-max opacity-80">Pesan via :</h1>
                <div class="w-full flex mt-8">
                    <div class="bg-black flex-1 flex items-center rounded-md px-2 py-2.5 overflow-hidden">
                        <img class="w-8 mr-3" src="<?= BASE_URL; ?>asset/img/tokopediav2.svg">
                        <div id="link-tokped" class="link text-myyellow text-xs" style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;"></div>
                    </div>
                    <div id="btn-link-tokped" class="bg-yellow-600 ml-1 w-10 flex justify-center items-center rounded-md opacity-90 hover:opacity-100 cursor-pointer" style="box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);">
                        <img class="w-6 transform -rotate-90 opacity-60" src="<?= BASE_URL; ?>asset/img/down-arrow-white.svg">
                    </div>
                </div>
                <div class="w-full flex mt-3">
                    <div class="bg-black flex-1 flex items-center rounded-md px-2 py-2.5 overflow-hidden">
                        <img class="w-8 mr-3" src="<?= BASE_URL; ?>asset/img/shopeev2.svg">
                        <div id="link-shopee" class="link text-myyellow text-xs" style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;"></div>
                    </div>
                    <div id="btn-link-shopee" class="bg-yellow-600 ml-1 w-10 flex justify-center items-center rounded-md opacity-90 hover:opacity-100 cursor-pointer" style="box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);">
                        <img class="w-6 transform -rotate-90 opacity-60" src="<?= BASE_URL; ?>asset/img/down-arrow-white.svg">
                    </div>
                </div>
                <div class="w-full flex mt-3">
                    <div class="bg-black flex-1 flex items-center rounded-md px-2 py-2.5 overflow-hidden">
                        <img class="w-8 mr-3" src="<?= BASE_URL; ?>asset/img/lazadav2.svg">
                        <div id="link-lazada" class="link text-myyellow text-xs" style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;"></div>
                    </div>
                    <div id="btn-link-lazada" class="bg-yellow-600 ml-1 w-10 flex justify-center items-center rounded-md opacity-90 hover:opacity-100 cursor-pointer" style="box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);">
                        <img class="w-6 transform -rotate-90 opacity-60" src="<?= BASE_URL; ?>asset/img/down-arrow-white.svg">
                    </div>
                </div>
                <div class="w-full flex mt-3">
                    <div class="bg-black flex-1 flex items-center rounded-md px-2 py-2.5 overflow-hidden">
                        <img class="w-8 mr-3" src="<?= BASE_URL; ?>asset/img/whatsappv2.svg">
                        <div id="link-wa" class="link text-myyellow text-xs" style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;"></div>
                    </div>
                    <div id="btn-link-wa" class="bg-yellow-600 ml-1 w-10 flex justify-center items-center rounded-md opacity-90 hover:opacity-100 cursor-pointer" style="box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);">
                        <img class="w-6 transform -rotate-90 opacity-60" src="<?= BASE_URL; ?>asset/img/down-arrow-white.svg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>