
<!-- Container -->
<div id="container" class="flex-1 flex flex-col bg-cover bg-fixed bg-no-repeat overflow-hidden" style="background-image: url(<?= BASE_URL; ?>asset/img/bg-min.webp)">
    <div id="section-wraper" class="w-full h-full" style="background-color: rgba(0, 0, 0, .8);">
        
        <!-- Home -->
        <section id="home" class="relative w-full h-full flex flex-col justify-center items-center text-center transition duration-700">
            <div class="flex flex-col md:flex-row justify-center items-center opacity-90">
                <h1 class="pt-0 md:pt-6 pb-3 pr-0 md:pr-10 text-white text-8xl md:text-6xl mymd:text-7xl mylg:text-8xl tracking-widest border-r-0 md:border-r-2 border-myyellow" style="font-family: 'bebas';">
                    welcome to</h1>
                <h2 class="pb-8 md:pb-0 pl-0 md:pl-10 text-8xl md:text-6xl mymd:text-7xl mylg:text-8xl tracking-wide uppercase border-b-2 md:border-b-0 border-myyellow" style="font-family: 'lato';">
                    tgadget</h2>
            </div>
            <h3 class="mt-6 mymd:mt-8 text-white text-lg sm:text-lg mylg:text-2xl tracking-wide capitalize opacity-90" style="font-family: 'lato';">
                Kami menjual berbagai macam Aksersoris hp, komputer <br class="block mymd:hidden">dan keperluan gadget lainnya</h3>
            <div class="link-wraper flex">
                <a href="about" class="hrefabout notNavHref hrefSection hover:bg-black mt-20 mx-3 px-6 mylg:px-8 py-2 mylg:py-4 inline md:hidden text-white text-lg mylg:text-2xl font-bold tracking-widest uppercase border-2 border-white opacity-90" style="font-family: 'bebas';">
                    tentang kami
                </a>
                <a href="<?= BASE_URL; ?>produk/" class="notNavHref bg-myyellow mt-20 mx-3 md:ml-0 px-6 mylg:px-8 py-2 mylg:py-4 text-lg mylg:text-2xl font-bold tracking-widest uppercase border-2 border-myyellow opacity-90 hover:opacity-100" style="font-family: 'bebas';">
                    lihat produk
                </a>
            </div>
            <!-- CService -->
            <div id="cservice-wraper" class=" w-min-max flex items-center fixed z-10 bottom-6 right-6">
                <h4 class="bg-cservice-span mr-5 p-1.5 sm:p-2 relative min-w-max text-xs sm:text-sm flex items-center transition-all duration-700 rounded-sm sm:rounded opacity-0">
                    <span class="text-black">Hai, ada yang bisa saya bantu?</span>
                    <div class="bg-white absolute -right-4 w-5 h-5 border-l-2 border-white" style="clip-path: polygon(90% 50%, 0 0, 0 100%);"></div>
                </h4>
                <a id="cservice" class="relative w-10 sm:w-16 h-10 sm:h-16 flex items-center rounded-full cursor-pointer" onclick="updateStat(this,event,'https://mywa.link/3xwr4ga2','whatsapp');">
                    <img src="<?= BASE_URL; ?>asset/img/profil-min.webp" class="w-full h-full rounded-full">
                    <div class="bg-green-500 absolute bottom-0 right-0.5 w-3 sm:w-4 h-3 sm:h-4 rounded-full"></div>
                </a>
            </div>
        </section> 
        
        <!-- About -->
        <section id="about" class="relative w-full h-full flex flex-col mymd:flex-row justify-center items-center transition duration-300 overflow-hidden">
            <div id="leftAbout" class="h-auto sm:h-2/4 mymd:h-full pt-8 sm:pt-0 pb-24 sm:pb-0 pl-8 md:pl-16 pr-8 md:pr-0 w-full mymd:w-3/5 flex flex-col justify-center">
                <h1 class="text-myyellow text-5xl md:text-6xl mymd:text-5xl mylg:text-6xl tracking-wide uppercase opacity-90" style="font-family: 'bebas';">
                    anti</h1>
                <h2 class="text-myyellow text-5xl md:text-6xl mymd:text-5xl mylg:text-6xl tracking-wide uppercase opacity-90" style="font-family: 'bebas';">
                    rugi-rugi club</h2>
                <h3 class="text-white max-w-max text-2xl md:text-4xl mymd:text-2xl lg:text-3xl mylg:text-4xl font-extrabold tracking-wide uppercase mb-5 md:mb-4 opacity-90">murah dan bergaransi</h3>
                <div class="pl-4 w-96 md:w-4/5 mymd:w-4/5 lg:w-5/6 mylg:w-3/4 mr-0 md:mr-10 lg:mr-0 mb-8 md:mb-24 opacity-90">
                    <ul class="list-disc list-outside">
                        <li style="color: white;">
                            <h4 class="text-white text-xs md:text-sm mylg:text-sm text-justify tracking-widest capitalize mb-2">Barang yang kami pasarkan sudah dicek terlebih dahulu, sehingga mutu dan kualitas-nya terjamin.</h4></li>
                        <li style="color: white;">
                            <h4 class="text-white text-xs md:text-sm mylg:text-sm text-justify tracking-widest capitalize mb-2">Selain itu, kami menawarkan garansi jika ada kerusakan atau ketidak cocokan barang maka pembeli bisa melakukan komplain.</h4></li>
                        <li style="color: white;">
                            <h4 class="text-white text-xs md:text-sm mylg:text-sm text-justify tracking-widest capitalize">Harga yang kami tawarkan tergolong murah karena kami langsung mengambil dari pabrik yang sudah teruji kualitasnya.</h4></li>
                    </ul>
                </div>
                <div class="md:relative w-96 md:w-4/5 mymd:w-4/5 lg:w-5/6 mylg:w-3/4 text-xs mylg:text-sm flex text-center link-wraper">
                    <a href="testimoni" class="hover:bg-black mr-2 mymd:mr-4 py-1 border-2 border-white text-white tracking-wide capitalize flex-1 rounded-full hrefSection notNavHref hreftestimoni">
                        <h4>testimoni</h4></a>
                    <a href="<?= BASE_URL; ?>produk/" class="bg-myyellow ml-2 mymd:ml-4 py-1 border-2 border-myyellow tracking-wide capitalize flex-1 rounded-full opacity-90 hover:opacity-100 notNavHref">
                        <h4>produk kami</h4></a>
                </div>
            </div>
            <div id="rightAbout" class="h-auto sm:h-2/4 mymd:h-full pt-24 sm:pt-0 pb-36 sm:pb-0 pl-6 md:pl-0 pr-14 md:pr-24 w-full mymd:w-auto flex-0 mymd:flex-1 flex justify-center sm:justify-end items-center">
                <div id="card-wraper" class="relative h-10 w-96 flex justify-center items-center shadow-lg">
                    <div id="garis" class="absolute z-10 right-0 w-32 sm:w-72 mymd:w-32 mylg:w-72 border-b-2 border-myyellow opacity-90"></div>
                    <div id="instan" class="bg-black absolute z-20 left-3 sm:-left-20 mymd:left-3 mylg:-left-24 h-40 sm:h-48 mymd:h-40 mylg:h-48 w-32 sm:w-40 mymd:w-32 mylg:w-40 py-2 sm:py-5 mymd:py-2 mylg:py-5 pl-3 pr-5 border-2 border-myyellow opacity-90">
                        <h5 class="text-white text-2xl sm:text-4xl mymd:text-2xl mylg:text-4xl tracking-widest" style="font-family: 'bebas';">
                            instan</h5>
                        <p class="text-white text-xs sm:text-sm mymd:text-xs mylg:text-sm" style="font-family: 'lato';">
                            Pelayanan kami di jamin cepat, tidak perlu takut pesanan lama diproses</p>
                    </div>
                    <div id="murah" class="absolute z-20 left-32 sm:left-16 mymd:left-32 mylg:left-12 -top-8 h-40 sm:h-48 mymd:h-40 mylg:h-48 w-32 sm:w-40 mymd:w-32 mylg:w-40 flex flex-col bg-myyellow">
                        <div class="w-full h-4/6 py-2 sm:py-5 mymd:py-2 mylg:py-5 px-3">
                            <h5 class="text-white text-2xl sm:text-4xl mymd:text-2xl mylg:text-4xl tracking-widest" style="font-family: 'bebas';">
                                murah</h5>
                            <p class="text-xs sm:text-sm mymd:text-xs mylg:text-sm" style="font-family: 'lato';">
                                Harga terjangkau karena barang diambil langsung dari pabrik</p>
                        </div>
                        <div class="w-full flex-1">
                            <img src="<?= BASE_URL; ?>asset/img/pabrik-min.webp" class="w-full h-full">
                        </div>
                    </div>
                    <div id="berkualitas" class="absolute z-20 -right-4 sm:-right-6 -bottom-8 sm:-bottom-12 mymd:-bottom-8 mylg:-bottom-12 h-44 sm:h-48 mymd:h-44 mylg:h-52 w-32 sm:w-40 mymd:w-32 mylg:w-40 flex flex-col bg-white">
                        <div class="w-full flex-1">
                            <img src="<?= BASE_URL; ?>asset/img/berkualitas-min.webp" class="w-full h-full">
                        </div>
                        <div class="w-full h-4/6 px-3">
                            <h6 class="text-xl mylg:text-2xl font-extrabold tracking-widest" style="font-family: 'bebas';">
                                berkualitas</h6>
                            <p class="text-xs mylg:text-sm" style="font-family: 'lato';">
                                Pengecekan di lakukan sebelum barang sampai ke pembeli</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Testimoni -->
        <section id="testimoni" class="relative w-full h-full flex transition duration-300 overflow-auto">
            <div class="wraper-all w-full h-full px-8 md:px-16 flex flex-col flex-start mylg:justify-center items-center">
                <h1 class="mt-14 mylg:mt-0 text-myyellow text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase opacity-90" style="font-family: 'bebas';">
                    apa pendapat mereka ?</h1>
                <h2 class="mb-14 max-w-max text-white text-xs sm:text-base md:text-xl font-bold tracking-wide opacity-90" style="font-family: 'lato';">
                    Testimoni diambil dari lapak kami di Tokopedia</h2>
                <div class="testi-clicked-wraper bg-testi-clicked fixed z-40 px-5 w-full h-full flex hidden justify-center items-center"  onclick="testiClick('close');">
                    <img id="img-testi" src="http://localhost/t-admin/asset/img/imgTesti/60625edff3f06testi3-min.png" class="w-full md:w-3/5">
                </div>
                <div id="img-wraper" class="mb-8 mt:mb-0 pb-0 md:pb-16 mylg:pb-0 w-full grid grid-cols-1 sm:grid-cols-2 mylg:grid-cols-3 grid-rows-10 sm:grid-rows-4 md:grid-rows-3 mylg:grid-rows-2 gap-2 overflow-auto sm:overflow-visible"></div>
            </div>
        </section>   

    </div>
</div>