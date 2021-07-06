
<div id="popup-container" class="bg-testi-clicked close px-16 hidden z-min1 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center" onclick="closeCountDown(this,event);">
    <div id="popup-wraper" class="relative w-72">
        <div id="close-popup" class="bg-myyellow close absolute z-30 -top-2 mysm:-top-3 -right-2 mysm:-right-3 w-6 mysm:w-8 p-2 rounded-full cursor-pointer" onclick="closeCountDown(this,event);">
            <img class="w-full close" src="<?= BASE_URL; ?>asset/img/cancel.svg">
        </div>
        <div id="bg-img-popup" class="bg-myyellow p-0.5 w-full rounded-tl-xl rounded-tr-xl rounded-b-md">
            <div id="img-popup-wraper" class="relative w-full flex items-center justify-center rounded-tl-xl rounded-tr-xl rounded-b-md border-2 border-black overflow-hidden">
                <img id="popup-height" class="relative z-min1 w-full opacity-0" src="<?= BASE_URL; ?>asset/img/popup.webp">
                <img id="popup-height" class="loadingImg absolute z-10 w-10 opacity-80" src="<?= BASE_URL; ?>asset/img/loading.svg">
                <Image id="img-popup" class="absolute z-20 w-full" src="" placeholder="blur" />
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