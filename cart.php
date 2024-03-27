<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cart | 8 Bit Bazaar</title>
    <meta name="author" content="" />
    <meta name="description" content="Website of old products">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/style-shopping-cart.css" />
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
        <h1 class="cart-title">Shopping Cart</h1>
        <div class="cart-items">
            <div class="cart-item" id="product1" style="display: none">
                <div class="delete-button" onclick="deleteCartItem('product1')">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div class="cart-item-image-wrapper">
                    <img src="images/products/product1.webp" alt="Cart Item Image" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <h2 class="cart-item-name">Donkey Kong Classics</h2>
                </div>
                <div class="cart-item-price">
                    <span class="cart-item-price-new">$ 25.99</span>
                </div>
            </div>
            <div class="cart-item" id="product2" style="display: none">
                <div class="delete-button" onclick="deleteCartItem('product2')">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div class="cart-item-image-wrapper">
                    <img src="images/products/product2.jpg" alt="Cart Item Image" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <h2 class="cart-item-name">The Legend of Zelda</h2>
                </div>
                <div class="cart-item-price">
                    <span class="cart-item-price-new">$ 39.99</span>
                </div>
            </div>
            <div class="cart-item" id="product3" style="display: none">
                <div class="delete-button" onclick="deleteCartItem('product3')">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div class="cart-item-image-wrapper">
                    <img src="images/products/product3.webp" alt="Cart Item Image" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <h2 class="cart-item-name">Mario Bros.</h2>
                </div>
                <div class="cart-item-price">
                    <span class="cart-item-price-new">$ 19.99</span>
                </div>
            </div>
            <div class="cart-item" id="product4" style="display: none">
                <div class="delete-button" onclick="deleteCartItem('product4')">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div class="cart-item-image-wrapper">
                    <img src="images/products/product4.jpg" alt="Cart Item Image" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <h2 class="cart-item-name">Super Bomberman 3</h2>
                </div>
                <div class="cart-item-price">
                    <span class="cart-item-price-new">$ 39.99</span>
                </div>
            </div>
            <div class="cart-item" id="product5" style="display: none">
                <div class="delete-button" onclick="deleteCartItem('product5')">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div class="cart-item-image-wrapper">
                    <img src="images/products/product5.jpg" alt="Cart Item Image" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <h2 class="cart-item-name">Super Mario Kart</h2>
                </div>
                <div class="cart-item-price">
                    <span class="cart-item-price-new">$ 28.99</span>
                </div>
            </div>

        </div>
        <h2 class="cart-total">Total: <span id="total-value">$ 0</span></h2>
        <form action="checkout.php" id="form-checkout">
            <input class="proceed-to-checkout-btn" type="submit" value="Proceed to Checkout" />
        </form>

    </main>
            <!-- Page-level footer -->
            <footer>
            <?php
            include("includes/footer.php");
            ?>
        </footer>
    <!-- Add the javascript file that has some scripts -->
    <script src="scripts/scripts.js"></script>
    <script>
        updateCartItems();
    </script>
</body>

</html>