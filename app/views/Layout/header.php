<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="theme-color" content="#0000">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>T-gadgetID | <?= $data['title']; ?></title>
        <link rel="shortcut icon" href="<?= BASE_URL ?>asset/img/logo-t-min.webp" type="image/x-icon">

        <!-- css -->
        <style>
            @font-face {
                font-family: 'bebas';
                src: url('<?= BASE_URL ?>asset/font/BebasNeue-Regular.ttf');
            }
            @font-face {
                font-family: 'lato';
                src: url('<?= BASE_URL ?>asset/font/Lato-Light.ttf');
            }
        </style>
        
        <?php if($data['title'] == 'home') : ?>
            <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/dist/home.css">
        <?php else : ?>
            <link rel="stylesheet" href="<?= BASE_URL ?>asset/css/glide.core.min.css">
            <link rel="stylesheet" href="<?= BASE_URL ?>asset/css/glide.theme.min.css">
            <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/dist/product.css">
        <?php endif; ?>
        
    </head>
    <body class="bg-tgadget-1000 h-screen flex flex-col" style="<?= ($data['title'] == 'home') ? 'background-image: url('.BASE_URL.'asset/img/bg-body.webp);' : '' ?>">

        <!-- 
            Windows Load animation 
        -->
        <div id="divloader" class="bg-black fixed w-screen h-screen flex justify-center items-center" style="z-index: 10003;">
            <img src="<?= BASE_URL; ?>asset/img/logo-t-min.webp" class="animate-pulse">
        </div>

        <!-- 
            Error
        -->
        <div id="diverror" class="bg-tgadget-1000 hidden fixed w-screen h-screen flex justify-center items-center" style="z-index: 10000;">
            <div class="mt-14 mb-8 w-40 mysm:w-52 opacity-80">
                <img src="<?= BASE_URL; ?>asset/img/notfound.webp" class="w-full">
                <h1 class="mt-6 font-extrabold text-lg mysm:text-xl text-center"></h1>
            </div>
        </div>