
<nav class="bg-black z-50 w-screen flex justify-between items-center">
    
    <a href="<?= BASE_URL; ?>" class="pl-8 md:pl-16">
        <img src="<?= BASE_URL; ?>asset/img/logo-text.webp" class="w-32 sm:w-48 h-6 sm:h-8 opacity-90">
    </a>

    <!-- BURGER -->
    <div id="burgers-wraper" class="relative flex md:hidden justify-center items-center py-5 sm:py-6 pr-8 md:pr-16 overflow-hidden">
        
        <!-- burger open -->
        <div id="burgerOpen" class="w-6 h-5 flex md:hidden flex-col justify-between transform transition-transform duration-300 opacity-80 hover:opacity-100 cursor-pointer" onclick="doBurger();">
            <span class="bg-tgadget-1000 w-full h-1"></span>
            <span class="bg-tgadget-1000 w-full h-1"></span>
            <span class="bg-tgadget-1000 w-full h-1"></span>
        </div>
        
        <!-- burger close -->
        <div id="burgerClose" class="w-6 h-5 absolute flex md:hidden flex-col justify-center transform translate-x-20 transition-transform duration-300 opacity-80 hover:opacity-100 cursor-pointer overflow-hidden" onclick="doBurger();">
            <img src="<?= BASE_URL; ?>asset/img/cancel-y.svg" class="w-full">
        </div>
    </div>

    <!-- NAV'S HREF -->
    <div id="nav-href" class="w-0 md:w-96.6 fixed md:static top-14.7 sm:top-16.2 bottom-0 right-0 flex flex-col md:py-6 md:pr-16 transition-w duration-300 overflow-hidden" style="background-image: linear-gradient(to bottom, #000 50%, rgba(0, 0, 0, 0.9));">
        
        <!-- Navbar's Href -->
        <div id="href-wraper" class="h-3/5 md:h-full flex hidden md:flex flex-col md:flex-row justify-between px-8 md:px-0 pt-10 md:pt-0 text-white text-center duration-300 opacity-0 md:opacity-100">
            <a class="href-navigator py-4 md:py-1 text-xl md:text-sm tracking-widest uppercase opacity-90 nav-href-active" href="home" >home</a>
            <a class="href-navigator href-about py-4 md:py-1 text-xl md:text-sm tracking-widest uppercase opacity-90" href="about">about</a>
            <a class="href-navigator href-testimoni py-4 md:py-1 text-xl md:text-sm tracking-widest uppercase opacity-90" href="testimoni">testimoni</a>
            <a class="href-navigator py-4 md:py-1 text-xl md:text-sm tracking-widest uppercase opacity-90" href="<?= BASE_URL; ?>produk/">product</a>
        </div>

        <!-- social media links -->
        <div id="sosmed-wraper" class="w-full flex-1 flex hidden md:hidden items-center">
            <div class="w-full flex justify-between items-center px-10 sm-411:px-16 sm:px-8">
                <a class="w-8 mr-2 transform translate-x-28 transition-all duration-500 opacity-0 cursor-pointer" onclick="updateStatistic('tokopedia',this,event);" id="tokopedia">
                    <img loading="lazy" width="100%" class="transition" src="<?= BASE_URL; ?>/asset/img/tokopedia.svg" alt="tgadget-1000 id">
                </a>
                <a class="w-8 mx-2 transform translate-x-28 transition-all duration-500 opacity-0 cursor-pointer" onclick="updateStatistic('shopee',this,event);" id="shopee">
                    <img loading="lazy" width="100%" class="transition" src="<?= BASE_URL; ?>/asset/img/shopee.svg" alt="tgadget-1000 id">
                </a>
                <a class="w-8 mx-2 transform translate-x-28 transition-all duration-500 opacity-0 cursor-pointer" onclick="updateStatistic('lazada',this,event);" id="lazada">
                    <img loading="lazy" width="100%" class="transition" src="<?= BASE_URL; ?>/asset/img/lazada.svg" alt="t gadget id">
                </a>
                <a class="whatsapp w-8 ml-2 transform translate-x-28 transition-all duration-500 opacity-0 cursor-pointer" onclick="updateStatistic('whatsapp',this,event);">
                    <img loading="lazy" width="100%" class="transition" src="<?= BASE_URL; ?>/asset/img/whatsapp.svg" alt="t gadget id">
                </a>
            </div>
        </div>
    </div>

</nav>

<main id="container" class="w-screen flex-1 flex flex-col overflow-hidden" style="background-color: rgba(0, 0, 0, 0.8);">
    
    <section id="home" class="relative w-full h-full flex flex-col justify-center items-center text-center transition duration-700">
            
        <!-- main text -->
        <div id="main-text" class="flex flex-col md:flex-row justify-center items-center opacity-90">
            <h1 class="pt-0 md:pt-6 pr-0 md:pr-10 text-white text-8xl md:text-6xl md-911:text-7xl lg-1040:text-8xl tracking-widest border-r-0 md:border-r-2 border-tgadget-1000" style="font-family: 'bebas';">
                welcome to</h1>
            <h2 class="pb-8 md:pb-0 pl-0 md:pl-10 text-8xl md:text-6xl md-911:text-7xl lg-1040:text-8xl tracking-wide uppercase border-b-2 md:border-b-0 border-tgadget-1000" style="font-family: 'lato';">
                tgadget</h2>
        </div>
        
        <!-- second text -->
        <h3 id="second-text" class="mt-6 md-911:mt-8 text-white text-lg sm:text-lg lg-1040:text-2xl tracking-wide capitalize opacity-90" style="font-family: 'lato';">
            Kami menjual berbagai macam Aksersoris hp, komputer 
            <br class="block md-911:hidden">
            dan keperluan gadget lainnya
        </h3>
        
        <!-- button -->
        <div id="buttons-wraper" class="flex mt-20">
            <a class="href-navigator active:bg-tgadget-1000 mx-3 px-6 lg-1040:px-8 py-2 lg-1040:py-4 border-2 border-white text-white text-lg lg-1040:text-2xl font-bold tracking-widest uppercase opacity-90 hover:opacity-100 inline md:hidden" style="font-family: 'bebas';" href="about">
                tentang kami
            </a>
            <a class="bg-tgadget-1000 mx-3 px-6 lg-1040:px-8 py-2 lg-1040:py-4 border-2 border-tgadget-1000 text-lg lg-1040:text-2xl font-bold tracking-widest uppercase opacity-90 hover:opacity-100" style="font-family: 'bebas';" href="<?= BASE_URL; ?>produk/">
                lihat produk
            </a>
        </div>

        <!-- Customer Service -->
        <div id="cservice-wraper" class="fixed z-10 bottom-6 right-6 flex items-center">
            <!-- message-cloud -->
            <h4 id="cservice-message" class="bg-gradient-to-r from-tgadget-1000 to-white min-w-max relative flex items-center mr-5 p-1.5 sm:p-2 text-xs sm:text-sm transition-opacity duration-700 rounded-sm sm:rounded opacity-0">
                <span class="text-black">Hai, ada yang bisa saya bantu?</span>
                <div class="bg-white w-5 h-5 absolute -right-4 border-l-2 border-white" style="clip-path: polygon(90% 50%, 0 0, 0 100%);"></div>
            </h4>

            <!-- btn-link -->
            <a id="cservice-href" class="whatsapp w-10 sm:w-16 h-10 sm:h-16 relative flex items-center rounded-full cursor-pointer" onclick="updateStatistic('whatsapp',this,event);">
                <img src="<?= BASE_URL; ?>asset/img/profil-min.webp" class="w-full h-full rounded-full">
                <div class="bg-green-500 w-3 sm:w-4 h-3 sm:h-4 absolute bottom-0 right-0.5 rounded-full">
                    <div class="bg-green-500 w-full h-full rounded-full animate-ping"></div>
                </div>
            </a>
        </div>

    </section>

    <section id="about" class="w-full h-full hidden relative transition-opacity duration-300 overflow-hidden">

        <div id="content-wraper" class="relative w-full h-full block md-911:flex flex-col md-911:flex-row justify-center items-center px-8 md:px-16 overflow-hidden">

            <!-- btn-arrow -->
            <div id="arrow" class="bg-black w-8 sm-411:w-10 h-8 sm-411:h-10 fixed z-50 right-6 bottom-6 block md-911:hidden p-3 sm-411:p-4 transform -rotate-90 transition-transform duration-300 rounded-full opacity-80 active:opacity-100 cursor-pointer" data-target="right-side" onclick="aboutArrow(this);">
                <img src="<?= BASE_URL; ?>asset/img/arrowleft-y.png" class="w-full h-full">
            </div>
            
            <!-- Left side -->
            <div id="left-side" class="w-full md-911:w-auto md-911:flex-1 relative z-10 flex flex-col justify-center md-911:justify-around items-center pr-0 sm:pr-32 md-911:pr-20" style="min-height: 100%;">
                <!-- text -->
                <div id="text-wraper">
                    <h1 class="text-tgadget-1000 text-5xl md:text-6xl md-911:text-5xl lg-1040:text-6xl tracking-wide uppercase opacity-90" style="font-family: 'bebas';">
                        anti</h1>
                    <h2 class="text-tgadget-1000 text-5xl md:text-6xl md-911:text-5xl lg-1040:text-6xl tracking-wide uppercase opacity-90" style="font-family: 'bebas';">
                        rugi-rugi club</h2>
                    <h3 class="text-white text-2xl md:text-4xl md-911:text-2xl lg:text-3xl lg-1040:text-4xl font-extrabold tracking-wide uppercase opacity-90">murah dan bergaransi</h3>
                    <ul class="mt-6 opacity-90 list-disc list-inside text-white">
                        <li class="mt-4 text-xs md:text-sm lg-1040:text-sm text-justify tracking-widest capitalize mb-2">
                            Barang yang kami pasarkan sudah dicek terlebih dahulu, sehingga mutu dan kualitas-nya terjamin.
                        </li>
                        <li class="mt-4 text-xs md:text-sm lg-1040:text-sm text-justify tracking-widest capitalize mb-2">
                            Selain itu, kami menawarkan garansi jika ada kerusakan atau ketidak cocokan barang maka pembeli bisa melakukan komplain.
                        </li>
                        <li class="mt-4 text-xs md:text-sm lg-1040:text-sm text-justify tracking-widest capitalize">
                            Harga yang kami tawarkan tergolong murah karena kami langsung mengambil dari pabrik yang sudah teruji kualitasnya.
                        </li>
                    </ul>
                </div>

                <!-- buttons -->
                <div id="buttons-wraper" class="w-full flex mt-16 md-911:mt-0 text-xs lg-1040:text-sm text-center">
                    <a class="href-navigator active:bg-tgadget-1000 flex-1 mr-2 md-911:mr-4 py-1 border-2 border-white hover:border-tgadget-1000 text-white hover:text-tgadget-1000 tracking-wide capitalize rounded-full" href="testimoni">
                        testimoni</a>
                    <a class="bg-tgadget-1000 flex-1 ml-2 md-911:ml-4 py-1 border-2 border-tgadget-1000 tracking-wide capitalize rounded-full opacity-90 hover:opacity-100" href="<?= BASE_URL; ?>produk/">
                        produk kami</a>
                </div>
            </div>

            <!-- Right side -->
            <div id="right-side" class="w-full md-911:w-auto md-911:flex-1 relative z-10 flex justify-end items-center" style="min-height: 100%;">
                <div id="cards-wraper" class="relative w-full flex justify-center md-911:justify-end items-center">
                    <!-- white line -->
                    <div id="garis" class="absolute z-10 w-72 border-b-2 border-tgadget-1000 opacity-90"></div>
                    
                    <!-- card - instan -->
                    <div class="bg-black relative z-20 h-40 sm:h-48 md-911:h-40 lg-1040:h-48 w-32 sm:w-40 md-911:w-32 lg-1040:w-40 py-2 sm:py-5 md-911:py-2 lg-1040:py-5 pl-3 pr-5 border-2 border-tgadget-1000 transform -translate-x-2" id="instan">
                        <h5 class="text-white text-2xl sm:text-4xl md-911:text-2xl lg-1040:text-4xl tracking-widest" style="font-family: 'bebas';">
                            instan</h5>
                        <p class="text-white text-xs sm:text-sm md-911:text-xs lg-1040:text-sm" style="font-family: 'lato';">
                            Pelayanan kami di jamin cepat, tidak perlu takut pesanan lama diproses</p>
                    </div>
                    <!-- card - murah -->
                    <div class="bg-tgadget-1000 relative z-20 h-40 sm:h-48 md-911:h-40 lg-1040:h-48 w-32 sm:w-40 md-911:w-32 lg-1040:w-40 flex flex-col transform -translate-x-6 translate-y-10" id="murah">
                        <div class="w-full h-4/6 py-2 sm:py-5 md-911:py-2 lg-1040:py-5 pl-3 pr-3">
                            <h5 class="text-white text-2xl sm:text-4xl md-911:text-2xl lg-1040:text-4xl tracking-widest" style="font-family: 'bebas';">
                                murah</h5>
                            <p class="text-xs sm:text-sm md-911:text-xs lg-1040:text-sm" style="font-family: 'lato';">
                                Harga terjangkau karena barang diambil langsung dari pabrik</p>
                        </div>
                        <div class="w-full flex-1">
                            <img src="<?= BASE_URL; ?>asset/img/pabrik-min.webp" class="w-full h-full">
                        </div>
                    </div>
                    <!-- card - berkualitas -->
                    <div class="bg-white relative z-20 h-44 sm:h-48 md-911:h-44 lg-1040:h-52 w-32 sm:w-40 md-911:w-32 lg-1040:w-40 flex flex-col transform -translate-y-10" id="berkualitas">
                        <div class="w-full flex-1">
                            <img src="<?= BASE_URL; ?>asset/img/berkualitas-min.webp" class="w-full h-full">
                        </div>
                        <div class="w-full h-4/6 pl-3 pr-3">
                            <h6 class="text-xl lg-1040:text-2xl font-extrabold tracking-widest" style="font-family: 'bebas';">
                                berkualitas</h6>
                            <p class="text-xs lg-1040:text-sm" style="font-family: 'lato';">
                                Pengecekan di lakukan sebelum barang sampai ke pembeli</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    
    <section id="testimoni" class="w-full h-full relative hidden transition-opaicty duration-300 overflow-auto">
        <div id="content-wraper" class="w-full h-full flex flex-col flex-start lg-1040:justify-center items-center px-8 md:px-16">
            <!-- Main text -->
            <h1 id="main-text" class="mt-14 lg-1040:mt-0 text-tgadget-1000 text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase opacity-90" style="font-family: 'bebas';">
                apa pendapat mereka ?</h1>

            <!-- Second text -->
            <h2 id="second-text" class="max-w-max mb-14 text-white text-xs sm:text-base md:text-xl font-bold tracking-wide opacity-90" style="font-family: 'lato';">
                Testimoni diambil dari lapak kami di Tokopedia</h2>

            <!-- Preview testimoni -->
            <div id="preview-wraper" class="w-full h-full fixed z-40 flex hidden justify-center items-center px-5" style="background-color: rgba(0, 0, 0, 0.8);">
                <img id="img-preview" src="" class="not-close-preview w-full md:w-3/5">
            </div>

            <!-- Testimonies wraper -->
            <div id="testimonies-wraper" class="w-full grid grid-cols-1 sm:grid-cols-2 lg-1040:grid-cols-3 grid-rows-10 sm:grid-rows-4 md:grid-rows-3 lg-1040:grid-rows-2 gap-2 mb-8 md:mb-0 pb-0 md:pb-16 lg-1040:pb-0 overflow-auto sm:overflow-visible"></div>
        </div>
    </section>   

</main>