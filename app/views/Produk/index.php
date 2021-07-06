<section class="flex-1 flex flex-col items-center overflow-auto">
    
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
    <div id="produk-container" class="pt-16 relative z-20 px-5 mymd:px-10 mt-8 mb-24 sm:mb-32 w-full transition-all duration-300">
        <div id="produk-wraper" class="w-full grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
            <a></a>
        </div>
    </div>

    <!-- Products Not-found -->
    <div id="notfound" class="hidden h-full flex flex-col justify-center items-center opacity-80" style="min-height: 100vh;">
        <img src="<?= BASE_URL; ?>asset/img/notfound.webp" class="w-40 mysm:w-52">
        <h1 class="mt-6 font-extrabold text-lg mysm:text-xl text-center">Ups, Product Not Found</h1>
    </div>

    <!-- Footer -->
    <div id="footer" class="bg-footer relative pt-10 px-5 mymd:px-10 w-full">

        <!-- load more -->
        <div id="div-load-more" class="hidden absolute -top-16 sm:-top-20 left-0 right-0 flex justify-center">
            <a id="btn-load-more" class="opacity-80 hover:opacity-100 focus:opacity-100" href="">
                <h1 class="border-b-2 border-black text-sm sm:text-xl text-black transition-all duration-300">load more</h1>
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
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('tokopedia',event,'https://www.tokopedia.com/t-gadgetid/product');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/tokopediav2.svg">
                </a>
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('shopee',event,'not available');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/shopeev2.svg">
                </a>
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('lazada',event,'not available');">
                    <img class="w-4 sm:w-5.5 md:w-7" src="<?= BASE_URL; ?>asset/img/lazadav2.svg">
                </a>
                <a href="" class="contact-link ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('whatsapp',event,'https://mywa.link/3xwr4ga2');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/whatsappv2.svg">
                </a>
            </div>

        </div>
    </div>
</section>


