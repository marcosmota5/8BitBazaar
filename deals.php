<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Deals | 8 Bit Bazaar</title>
    <meta name="author" content="" />
    <meta name="description" content="Website of old products">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/style-products.css" />
    <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon" />

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
    <!-- Page-level header -->
    <header>
        <?php
        include("includes/navbar.php");
        ?>
    </header>
    <main>
        <div class="welcome">
            <span class="welcome-title">Deals</span>
        </div>
        <div class="">
            <div class="product">
                <div class="product-image-wrapper">
                    <img src="images/products/product1.webp" alt="Product Image" class="product-image">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-details">
                    <h2 class="product-name">Donkey Kong Classics</h2>
                    <p class="type">NES cartridge</p>
                    <div class="price">
                        <span class="price-old">$ 35.99</span>
                        <span class="price-new">$ 25.99</span>
                    </div>
                    <p class="description">Donkey Kong Classics is a video game collection of the Donkey Kong series, consisting of the games Donkey Kong and Donkey Kong Jr. This compilation is for the Nintendo Entertainment System, which was developed by Nintendo EAD. It was released on October 1988 in the US, three years after the original release of the NES, and August 10, 1989 in Europe. It was never released in Japan. Nothing has changed in gameplay and modes. The only difference is the title screen. It is now a blue color, and the player can switch between the two games and the single and multi-player modes from there. They are exactly the same as the Arcade Classics Series versions of the games. The above text is from the Super Mario Wiki and is available under a Creative Commons license. Attribution must be provided through a list of authors or a link back to the original article. <a href="https://www.mariowiki.com/Donkey_Kong_Classics">Source</a>.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product1')">Add to cart</button>
                </div>
            </div>
            <div class="product">
                <div class="product-image-wrapper">
                    <img src="images/products/product2.jpg" alt="Product Image" class="product-image">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-details">
                    <h2 class="product-name">The Legend of Zelda</h2>
                    <p class="type">NES cartridge</p>
                    <div class="price">
                        <span class="price-old">$ 47.99</span>
                        <span class="price-new">$ 39.99</span>
                    </div>
                    <p class="description">The Legend of Zelda is the first installment of the Zelda series. Its plot centers around a boy named Link, who becomes the central protagonist throughout the series. It originally came out in 1986 for the Famicom Disk System in Japan and internationally on the NES in 1987. It has since been re-released for several systems, including the Nintendo GameCube, the Game Boy Advance, and the Virtual Console. The Japanese version of the game is known as The Hyrule Fantasy: The Legend of Zelda. <a href="https://zelda.fandom.com/wiki/The_Legend_of_Zelda">Source</a>.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product2')">Add to cart</button>
                </div>
            </div>
            <div class="product">
                <div class="product-image-wrapper">
                    <img src="images/products/product3.webp" alt="Product Image" class="product-image">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-details">
                    <h2 class="product-name">Super Mario Bros.</h2>
                    <p class="type">NES cartridge</p>
                    <div class="price">
                        <span class="price-old">$ 26.99</span>
                        <span class="price-new">$ 19.99</span>
                    </div>
                    <p class="description">Super Mario Bros. is a video game released for the Family Computer and Nintendo Entertainment System in 1985. It shifted the gameplay away from its single-screen arcade predecessor, Mario Bros., and instead featured side-scrolling platformer levels. While not the first game of the Super Mario franchise (the first being Donkey Kong), Super Mario Bros. is the most iconic, and it introduced various series staples, including power-ups, classic enemies such as Goombas, and the basic premise of rescuing Princess Peach from Bowser. <a href="https://www.mariowiki.com/Super_Mario_Bros">Source</a>.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product3')">Add to cart</button>
                </div>
            </div>
        </div>
        <!-- Page-level footer -->
        <footer>
            <?php
            include("includes/footer.php");
            ?>
        </footer>
    </main>

    <!-- Add the javascript file that has some scripts -->
    <script src="scripts/scripts.js"></script>
</body>

</html>