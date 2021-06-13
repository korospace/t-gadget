<!doctype html>
<html lang="en">
<head>
    <link rel="shortcut icon" href="<?= BASE_URL ?>asset/img/logo-t-min.webp" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>T-gadgetID | <?= $data['title']; ?></title>
    <meta name="theme-color" content="#0000">
    <meta charset="utf-8">

    <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/css/tailwind.css">
    <?php if($data['title'] == 'home') : ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/css/home.css">
    <?php else : ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/css/glide.core.min.css">
        <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/css/glide.theme.min.css">
        <link rel="stylesheet" href="<?= BASE_URL ?>asset/tailwind/css/produk.css">
    <?php endif; ?>
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
</head>
<body class="h-screen flex flex-col <?= ($data['title'] == 'home') ? 'bg-black' : 'bg-myyellow' ?>">
    
    <!-------- 
        Url
    --------->
    <span id="api-url" class="hidden" data-url="<?= API_URL; ?>"></span>
    <span id="base-url" class="hidden" data-url="<?= BASE_URL; ?>"></span>
    
    <!---------------- 
        new visitor
    ----------------->
    <div id="newVisitor" data-visitor="<?= $data['visitor']; ?>"></div>

    <!-----------------
        Windows Load
    ------------------>
    <div id="divloader" class="bg-black fixed w-screen h-screen flex justify-center items-center" style="z-index: 10003;">
        <img src="<?= BASE_URL; ?>asset/img/logo-t-min.webp" class="animate-pulse">
    </div>