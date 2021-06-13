<nav class="fixed top-0 w-full text-myyellow" style="z-index:10001;">
    <div class="bg-black relative py-5 pl-5 mymd:pl-10 pr-5 mymd:pr-10 w-full flex justify-between items-center" style="z-index:10000;">
        <!-- logo -->
        <a class="hidden sm:inline w-28 md:w-36" href="">
            <img class="w-full" src="<?= BASE_URL; ?>asset/img/logo-text.webp" alt="t-gadgetid logo">
        </a>
        <!-- btn-kategori -->
        <span id="btn-kategori" class="hidden mysm:inline ml-0 sm:ml-6 md:ml-8 mr-2 md:mr-4 px-2 py-1 text-xs md:text-sm rounded-sm cursor-pointer opacity-90 hover:opacity-100">kategori</span>
        <!-- search -->
        <div class="relative flex-1 overflow-visible" style="color: rgba(49,53,59,0.96);">
            <div class="bg-white relative border-2 border-myyellow rounded-sm overflow-hidden">
                <input id="keyword" class="block px-3 py-1 w-full text-xs sm:text-sm outline-none" type="text" autocomplete="off" placeholder="cari produk">
                <label class="bg-myyellow absolute top-0 bottom-0 right-0 block p-0.5 sm:p-0 w-8 sm:w-10 cursor-pointer" for="keyword">
                    <img class="p-1 w-full h-full opacity-80 hover:opacity-100" src="<?= BASE_URL; ?>asset/img/search.svg">
                </label>
            </div>
            <ul id="items-keyword" class="absolute mt-1 block w-full bg-white text-xs sm:text-sm rounded-sm overflow-auto" style="max-height: 200px;box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.3);"></ul>
        </div>
        <div class="flex">
            <a class="ml-4 sm:ml-6 md:ml-8 w-4 md:w-5 opacity-80 hover:opacity-100 focus:opacity-100" href="<?= BASE_URL; ?>home/">
                <img class="w-full" src="<?= BASE_URL; ?>asset/img/home.svg">
            </a>
            <a class="ml-3 md:ml-4 w-4 md:w-5 opacity-80 hover:opacity-100 focus:opacity-100" href="<?= BASE_URL; ?>home/">
                <img class="w-full" src="<?= BASE_URL; ?>asset/img/testimoni.webp">
            </a>
            <a class="ml-3 md:ml-4 w-4 md:w-5 opacity-80 hover:opacity-100 focus:opacity-100" href="<?= BASE_URL; ?>home/">
                <img class="w-full" src="<?= BASE_URL; ?>asset/img/about.svg">
            </a>
        </div>
    </div>

    <!-- Categories -->
    <div id="kategori-wraper" class="bg-black w-full h-0 overflow-auto transition-all duration-300" style="border-color: rgba(255, 185, 3,0.3);">
        <div class="hidden opacity-0 px-5 mymd:px-10 min-w-max h-full flex text-myxs sm:text-xs md:text-sm capitalize tracking-wide transition-all duration-300">
            <span class="min-w-max h-full px-4 sm:px-6 md:px-8 flex jusify-center items-center border-b-2 md:border-b-4 border-myyellow cursor-pointer" href="semua kategori" onclick="catOnClick(this,event);"><h1 class="opacity-80 hover:opacity-100">semua kategori</h1></span>
        </div>
    </div>

</nav>