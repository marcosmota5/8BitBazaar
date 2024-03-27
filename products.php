<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Products | 8 Bit Bazaar</title>
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
            <span class="welcome-title">Products</span>
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
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product2')">Add to cart</button>
                </div>
            </div>
            <div class="product">
                <div class="product-image-wrapper">
                    <img src="images/products/product3.webp" alt="Product Image" class="product-image">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-details">
                    <h2 class="product-name">Mario Bros.</h2>
                    <p class="type">NES cartridge</p>
                    <div class="price">
                        <span class="price-old">$ 26.99</span>
                        <span class="price-new">$ 19.99</span>
                    </div>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product3')">Add to cart</button>
                </div>
            </div>
            <div class="product">
                <div class="product-image-wrapper">
                    <img src="images/products/product4.jpg" alt="Product Image" class="product-image">
                </div>
                <div class="product-details">
                    <h2 class="product-name">Super Bomberman 3</h2>
                    <p class="type">SNES cartridge</p>
                    <div class="price">
                        <span class="price-new">$ 39.99</span>
                    </div>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product4')">Add to cart</button>
                </div>
            </div>
            <div class="product">
                <div class="product-image-wrapper">
                    <img src="images/products/product5.jpg" alt="Product Image" class="product-image">
                </div>
                <div class="product-details">
                    <h2 class="product-name">Super Mario Kart</h2>
                    <p class="type">SNES cartridge</p>
                    <div class="price">
                        <span class="price-new">$ 28.99</span>
                    </div>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button class="add-to-cart-btn" onclick="addToCart('product5')">Add to cart</button>
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