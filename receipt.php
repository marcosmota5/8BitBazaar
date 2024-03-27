<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Checkout | 8 Bit Bazaar</title>
    <meta name="author" content="" />
    <meta name="description" content="Website of old products">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/style-receipt.css" />
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
    <main class="main-content-receipt">
        <!-- php code that receives the form data and store it in variables -->
        <?php

        $contactName = $_GET['name'];
        $contactPhoneNumber = $_GET['phone-number'];
        $contactAddressType = $_GET['address-type'];
        $contactStreetAddress = $_GET['street-address'];
        $contactSuiteApt = $_GET['suite-apt'];
        $contactProvince = $_GET['province'];
        $contactPostalCode = $_GET['postal-code'];

        // Set the default timezone to EST
        date_default_timezone_set('America/Toronto');

        // Get the current date and time in EST
        $orderDateTime = date('Y-m-d H:i:s');

        // Generate a random order number
        $orderNumber = mt_rand(100000, 999999);
        ?>
        <!-- Receipt section that displays the order details -->
        <div class="receipt">
            <h2>8 Bit Bazaar</h2>
            <br>
            <h3>Your order has been received!</h3>
            <p>Please, check the details below.</p>
            <br>
            <br>
            <!-- Receipt details section -->
            <div class="receipt-details">
                <h4>Order Details:</h4>
                <ul>
                    <li>Date time of the order: <?php echo $orderDateTime; ?></li>
                    <li>Order number: <?php echo $orderNumber; ?></li>
                </ul>
                <h4>Items:</h4>
                <ul>
                    <li style='display: none;' id="product1">Donkey Kong Classics. Value: <span class="price-new">$ 25.99</span></li>
                    <li style='display: none;' id="product2">The Legend of Zelda. Value: <span class="price-new">$ 39.99</span></li>
                    <li style='display: none;' id="product3">Mario Bros. Value: <span class="price-new">$ 19.99</span></li>
                    <li style='display: none;' id="product4">Super Bomberman 3. Value: <span class="price-new">$ 39.99</span></li>
                    <li style='display: none;' id="product5">Super Mario Kart. Value: <span class="price-new">$ 28.99</span></li>
                </ul>
                <h4>Total: <span id="total-value">$ 0</span></h4>
                <h4>Contact Information:</h4>
                <ul>
                    <li>Name: <?php echo $contactName; ?></li>
                    <li>Phone Number: <?php echo $contactPhoneNumber; ?></li>
                    <li>Address Type: <?php echo $contactAddressType; ?></li>
                    <li>Street Address: <?php echo $contactStreetAddress; ?></li>
                    <li>Suite/Apt: <?php echo $contactSuiteApt; ?></li>
                    <li>Province: <?php echo $contactProvince; ?></li>
                    <li>Postal Code: <?php echo $contactPostalCode; ?></li>
                </ul>
                <br>
            </div>
            <p>Thank you for your order!</p>
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
    <script>
        updateReceiptItems();
    </script>
</body>

</html>