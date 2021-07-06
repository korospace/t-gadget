 
    <script>
        // ... URL ...
        const API_URL    = "<?= API_URL; ?>";
        const BASE_URL   = "<?= BASE_URL; ?>";
        const CODE       = "<?= $data['code']; ?>";
        const NewVisitor = "<?= $data['NewVisitor']; ?>";

        // Window on offline
        window.onoffline = () => {
            showError("Ups, connection lost!",true);
        };
        window.ononline = () => {
            showError("",false);
        };

        // Show error page
        function showError(msg,showOrNot){
            if(showOrNot === true){
                document.querySelector('#diverror').classList.remove('hidden');
            }else{
                document.querySelector('#diverror').classList.add('hidden');
            }
            document.querySelector('#diverror h1').innerText = msg;
        }
    </script>

    <?php if($data['title'] == 'home') : ?>
        <script src="<?= BASE_URL; ?>asset/js/gsap.min.js"></script>
        <script src="<?= BASE_URL; ?>asset/js/home.js"></script>
    <?php else : ?>
        <script src="<?= BASE_URL; ?>asset/js/jquery-3.5.1.min.js"></script>
        <script src="<?= BASE_URL; ?>asset/js/glide.min.js"></script>
        <script src="<?= BASE_URL; ?>asset/js/produk.js"></script>
    <?php endif; ?>
</body>
</html>