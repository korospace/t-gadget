<nav class="w-full fixed top-0 text-tgadget-1000" style="z-index:10001;">
    
    <div class="bg-black w-full relative flex justify-between items-center pl-3 sm:pl-5 md-911:pl-10 pr-5 md-911:pr-10 py-5" style="z-index:10000;">
        <!-- logo -->
        <a class="w-28 md:w-36 hidden sm:inline" href="">
            <img class="w-full" src="<?= BASE_URL; ?>asset/img/logo-text.webp" alt="t-gadgetid logo">
        </a>

        <!-- burger-kategori -->
        <span id="burger-category" class="hover:bg-tgadget-200 hidden sm-411:inline sm:ml-6 md:ml-8 mr-2 md:mr-4 px-2 py-1 text-sm rounded-sm cursor-pointer opacity-90 hover:opacity-100">kategori</span>

        <div class="relative flex-1 overflow-visible" style="color: rgba(49,53,59,0.96);">
            <!-- input keyword -->
            <div class="bg-white relative border-2 border-tgadget-1000 rounded-sm overflow-hidden">
                <input id="input-keyword" class="inputKeyword block px-3 py-1 w-full text-xs sm:text-sm outline-none" type="text" autocomplete="off" placeholder="cari produk">
                <label for="input-keyword" class="bg-tgadget-1000 w-8 sm:w-10 absolute top-0 bottom-0 right-0 block cursor-pointer" onclick="clearInputKeyword();">
                    <img class="w-full h-full p-1 opacity-80 hover:opacity-100" src="<?= BASE_URL; ?>asset/img/search.svg">
                </label>
            </div>

            <!-- keywords sugestion -->
            <ul id="sugestions-wraper" class="bg-white w-full absolute block mt-1 text-xs sm:text-sm rounded-sm overflow-auto" style="max-height: 200px;box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);"></ul>
        </div>

        <!-- btn-links -->
        <div class="flex">
            <a class="w-4 md:w-5 ml-4 sm:ml-6 md:ml-8 opacity-80 hover:opacity-100 active:opacity-100" href="<?= BASE_URL; ?>home/">
                <img class="w-full" src="<?= BASE_URL; ?>asset/img/home.svg">
            </a>
            <a class="w-4 md:w-5 ml-3 md:ml-4 opacity-80 hover:opacity-100 focus:opacity-100" href="<?= BASE_URL; ?>home/">
                <img class="w-full" src="<?= BASE_URL; ?>asset/img/testimoni.webp">
            </a>
            <a class="w-4 md:w-5 ml-3 md:ml-4 opacity-80 hover:opacity-100 focus:opacity-100" href="<?= BASE_URL; ?>home/">
                <img class="w-full" src="<?= BASE_URL; ?>asset/img/about.svg">
            </a>
        </div>
    </div>

    <!-- Categories -->
    <div id="categories-container" class="bg-black w-full h-full sm-411:h-0 absolute py-0.5 sm-411:border-0 transition-all duration-300 overflow-auto sm-411:overflow-hidden box-border" style="border-color: rgba(255, 185, 3,0.3);">
        <div id="categories-wraper" class="min-w-max min-h-full flex sm-411:hidden text-xs sm:text-sm capitalize tracking-wide">
            
        </div>
    </div>

</nav>

<main class="flex-1 w-full">

    <section id="content" class="w-full min-h-screen flex flex-col items-center pt-40 sm-411:pt-24 pb-10 px-5 md-911:px-10 transition-padding duration-300">

        <!-- products -->
        <div id="products-wraper" class="w-full grid gap-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
            <a></a>
        </div>

        <!-- load more -->
        <div id="load-more" class="relative z-min-1 mt-10 border-b-2 border-black opacity-80 hover:opacity-100 active:opacity-100 transition-opacity duration-300 cursor-pointer">
            load more
        </div>

    </section>

    <section id="footer" class="relative w-full flex flex-col items-center pt-8 px-5 md-911:px-10" style="z-index:10001;background-image: linear-gradient(to bottom, rgba(0,0,0,0), #000)">
        
        <!-- top-footer -->
        <div class="w-full flex flex-col sm-411:flex-row justify-between items-center">
            <div>
                <div class="flex items-center text-3xl sm-411:text-2xl sm:text-3xl md:text-4xl font-bold">
                    <img class="w-12 sm-411:w-9 md:w-12" src="<?= BASE_URL; ?>asset/img/logo-t-min.webp" alt="t-gadgetid">
                    <span class="ml-2 opacity-80">t-gadgetid</span>
                </div>
                <div class="mt-4 flex text-tgadget-1000 text-md sm-411:text-xs sm:text-sm md:text-base tracking-wide">
                    <a class="px-2 py-1 mr-1 sm-411:mr-0.5 sm:mr-1 opacity-80 hover:opacity-100 hover:bg-tgadget-100 active:bg-tgadget-100 rounded-md" href="<?= BASE_URL; ?>home/">home</a>
                    <a class="px-2 py-1 mr-1 sm-411:mr-0.5 sm:mr-1 opacity-80 hover:opacity-100 hover:bg-tgadget-100 active:bg-tgadget-100 rounded-md" href="<?= BASE_URL; ?>home/">testimoni</a>
                    <a class="px-2 py-1 mr-1 sm-411:mr-0.5 sm:mr-1 opacity-80 hover:opacity-100 hover:bg-tgadget-100 active:bg-tgadget-100 rounded-md" href="<?= BASE_URL; ?>home/">about</a>
                </div>
            </div>
            <a class="bg-black px-2.5 sm:px-4 py-1.5 sm:py-2 hidden sm-411:inline border-2 border-tgadget-1000 text-tgadget-1000 text-xs sm:text-sm md:text-base tracking-widest opacity-80 hover:opacity-100 rounded-sm" style="box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);" href="">contact us</a>
        </div>

        <!-- bottom-footer -->
        <div class="w-full flex flex-col justify-between items-center mt-4 py-8 border-t border-tgadget-200">
            <h1 class="text-xs sm:text-sm opacity-80 tracking-wide">Copyright © 2020-<?= date("Y"); ?> T-GadgetID</h1>
            <div class="flex items-center mt-4">
                <a href="" class="ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('tokopedia',event,'https://www.tokopedia.com/t-gadgetid/product');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/tokopediav2.svg">
                </a>
                <a href="" class="ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('shopee',event,'not available');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/shopeev2.svg">
                </a>
                <a href="" class="ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('lazada',event,'not available');">
                    <img class="w-4 sm:w-5.5 md:w-7" src="<?= BASE_URL; ?>asset/img/lazadav2.svg">
                </a>
                <a href="" class="ml-1 p-2 opacity-80 hover:opacity-100" onclick="updateStatistic('whatsapp',event,'https://mywa.link/3xwr4ga2');">
                    <img class="w-4 sm:w-5 md:w-6" src="<?= BASE_URL; ?>asset/img/whatsappv2.svg">
                </a>
            </div>

        </div>
    </section>

</main>

<div id="countdown-container" class="close hidden fixed w-screen h-screen flex justify-center items-center px-16" onclick="closeCountDown(event);" style="z-index: 10002;background-color: rgba(0,0,0,0.8);">
    <div id="countdown-wraper" class="relative w-72">
        
        <!-- close-countdown -->
        <div id="close-countdown" class="close bg-tgadget-1000 w-6 sm-411:w-8 absolute z-30 -top-2 sm-411:-top-3 -right-2 sm-411:-right-3 p-2 rounded-full cursor-pointer" onclick="closeCountDown(event);">
            <img class="w-full close" src="<?= BASE_URL; ?>asset/img/cancel.svg">
        </div>
        
        <!-- img-countdown -->
        <div id="bg-countdown-img" class="bg-tgadget-1000 w-full p-0.5 rounded-tl-xl rounded-tr-xl rounded-b-md">
            <div id="countdown-img-wraper" class="w-full relative flex items-center justify-center rounded-tl-xl rounded-tr-xl rounded-b-md border-2 border-black overflow-hidden">
                <img class="w-full relative opacity-0" src="<?= BASE_URL; ?>asset/img/bg-countdown.webp">
                <img class="w-10 absolute z-10 opacity-80" src="<?= BASE_URL; ?>asset/img/loading.svg">
                <img class="w-full absolute z-20" id="countdown-img" src="">
            </div>
        </div>

        <!-- date-countdown -->
        <div id="bg-countdown-date" class="bg-tgadget-1000 w-full mt-2 p-0.5 rounded-md">
            <div class="w-full h-auto flex py-1 sm-411:py-2 border-2 border-black rounded-md">
                <div class="flex-1 flex flex-col border-r border-black text-center" style="border-color: rgba(0,0,0,0.3);">
                    <span id="day" class="text-xs sm-411:text-md sm:text-2xl text-bold">0</span>
                    <span class="text-xs opacity-90">hari</span>
                </div>
                <div class="flex-1 flex flex-col border-r border-black text-center" style="border-color: rgba(0,0,0,0.3);">
                    <span id="hour" class="text-xs sm-411:text-md sm:text-2xl text-bold">0</span>
                    <span class="text-xs opacity-90">jam</span>
                </div>
                <div class="flex-1 flex flex-col border-r border-black text-center" style="border-color: rgba(0,0,0,0.3);">
                    <span id="minute" class="text-xs sm-411:text-md sm:text-2xl text-bold">0</span>
                    <span class="text-xs opacity-90">menit</span>
                </div>
                <div class="flex-1 flex flex-col text-center">
                    <span id="second" class="text-xs sm-411:text-md sm:text-2xl text-bold">0</span>
                    <span class="text-xs opacity-90">detik</span>
                </div>
            </div>
        </div>

    </div>
</div>