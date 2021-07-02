 
    <script src="<?= BASE_URL; ?>asset/js/jquery-3.5.1.min.js"></script>

    <?php if($data['title'] == 'home') : ?>
        <script src="<?= BASE_URL; ?>asset/js/gsap.min.js"></script>
        <script src="<?= BASE_URL; ?>asset/js/home.js"></script>
    <?php else : ?>
        <script src="<?= BASE_URL; ?>asset/js/glide.min.js"></script>
        <script src="<?= BASE_URL; ?>asset/js/produk.js"></script>
    <?php endif; ?>
</body>
</html>