<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Home | 8 Bit Bazaar</title>
    <meta name="author" content="" />
    <meta name="description" content="Website of old products">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css" />
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
            <span class="welcome-title">Welcome to 8 Bit Bazaar!</span>
            <span class="welcome-subtitle">Here you can find everything you love from old times.</span>
        </div>
        <div class="cards">
            <div class="card">
                <img src="images/Cul-ars-vidgames-954038980.webp" alt="img" class="card-image">
                <div class="card-content">
                    <h2 class="card-title">RETRO RAID</h2>
                    <p class="card-subtitle">Level up your collection!</p>
                </div>
            </div>
            <div class="card">
                <img src="images/y2ZOW9.png" alt="img" class="card-image">
                <div class="card-content">
                    <h2 class="card-title">VINTAGE QUEST</h2>
                    <p class="card-subtitle">Discover classic adventures!</p>
                </div>
            </div>
            <div class="card">
                <img src="images/metroid.webp" alt="img" class="card-image">
                <div class="card-content">
                    <h2 class="card-title">GAME LEGACY</h2>
                    <p class="card-subtitle">Get the icons of history!</p>
                </div>
            </div>
        </div>
        <div class="description2">
            <div class="description2-element-1">
                <span class="material-symbols-outlined">
                    local_shipping
                </span>
                <span>
                    <h3>Free Shipping</h3>
                    <p>Free shipping on all orders</p>
                </span>
            </div>
            <div class="description2-element-2">
                <span class="material-symbols-outlined">
                    support_agent
                </span>
                <span>
                    <h3>Support 24/7</h3>
                    <p>Support 24 hours a day</p>
                </span>
            </div>
            <div class="description2-element-3">
                <span class="material-symbols-outlined">
                    replay
                </span>
                <span>
                    <h3>30 Days Returns</h3>
                    <p>30 days free returns</p>
                </span>
            </div>
            <div class="description2-element-3">
                <span class="material-symbols-outlined">
                    star
                </span>
                <span>
                    <h3>High Quality</h3>
                    <p>Best quality products</p>
                </span>
            </div>
        </div>
        <h2 class="featured-deals-title">Featured Deals</h2>
        <div class="featured-deals">
            <div class="product" id="product1">
                <div class="product-image-container">
                    <img class="product-image" src="images/products/product1.webp">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-detail">
                    <span class="product-title">Donkey Kong Classics</span>
                    <div class="product-price">
                        <span class="product-price-old">$ 35.99</span>
                        <span class="product-price-new">$ 25.99</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('product1')">Add to cart</button>
                </div>
            </div>
            <div class="product" id="product2">
                <div class="product-image-container">
                    <img class="product-image" src="images/products/product2.jpg">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-detail">
                    <span class="product-title">The Legend of Zelda</span>
                    <div class="product-price">
                        <span class="product-price-old">$ 47.99</span>
                        <span class="product-price-new">$ 39.99</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('product2')">Add to cart</button>
                </div>
            </div>
            <div class="product" id="product3">
                <div class="product-image-container">
                    <img class="product-image" src="images/products/product3.webp">
                    <img src="images/hot-deal.png" alt="Hot Deal" class="hot-deal">
                </div>
                <div class="product-detail">
                    <span class="product-title">Mario Bros</span>
                    <div class="product-price">
                        <span class="product-price-old">$ 26.99</span>
                        <span class="product-price-new">$ 19.99</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('product3')">Add to cart</button>
                </div>
            </div>
        </div>
        <div class="newsletter">
            <h2>Newsletter</h2>
            <p>Subscribe to our newsletter to receive the last deals</p>
            <form action="subscribe.php" method="get">
                <label class="input-label" for="emailAddress">Email</label>
                <input class="input-box" type="email" name="emailAddress" id="emailAddress" required />
                <button class="input-button" type="submit">Subscribe</button>
            </form>
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