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
    <link rel="stylesheet" href="css/style-checkout.css" />
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
    <main class="main-content-checkout">
        <h1 class="checkout-title">Checkout</h1>
        <form action="receipt.php" method="GET">
            <!-- A div that has the header of the form, including the title of the current page and a reset button.  The actual reset input is hidden and a button is used instead that has the onclick element to click on the input reset, the reason
                             for that is to enable better formatting and controls -->
            <div class="form-header">
                <h2>Contact Information</h2>
                <button class="reset-button" type="button" onclick="document.getElementById('reset-btn').click()"><span class="material-symbols-outlined">
                        restart_alt
                    </span>&nbsp;Reset</button>
                <input style="display:none" type="reset" id="reset-btn" onclick="return confirmReset()">
            </div>
            <!-- All parts below are related to the contact information, such as the name, phone number, address type, street address, suite/apt, city, province, and postal code -->
            <div>
                <label for="name">Name<span class="required">*</span></label>
                <input class="input-box" type="text" id="name" name="name" required><br>
            </div>
            <div>
                <label for="phone-number">Phone Number<span class="required">*</span></label>
                <input class="input-box" type="tel" id="phone-number" name="phone-number" required><br>
            </div>
            <div>
                <label for="address-type">Address Type</label>
                <select class="input-box" id="size" name="address-type" required>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Hotel Room">Hotel Room</option>
                </select><br>
            </div>
            <div>
                <label for="street-address">Street Address<span class="required">*</span></label>
                <input class="input-box" type="text" id="street-address" name="street-address" required><br>
            </div>
            <div>
                <label for="suite-apt">Suite/Apt</label>
                <input class="input-box" type="text" id="suite-apt" name="suite-apt"><br>
            </div>
            <div>
                <label for="city">City<span class="required">*</span></label>
                <input class="input-box" type="text" id="city" name="city" required><br>
            </div>
            <div>
                <label for="province">Province<span class="required">*</span></label>
                <select class="input-box" id="province" name="province" required>
                    <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                </select><br>
            </div>
            <div>
                <label for="postal-code">Postal Code<span class="required">*</span></label>
                <input class="input-box" type="text" id="postal-code" name="postal-code" required><br>
            </div>
            <!-- A div that holds the buttons to navigate to the previous page of the form and to submit the form. The actual submit input is hidden and a button is used instead that has the onclick element to click on the input submit, the reason
                             for that is to enable better formatting and controls -->
            <div class="form-container">
                <button class="submit-button" type="button" onclick="document.getElementById('submit-btn').click()"><span class="material-symbols-outlined">
                        done
                    </span>&nbsp;Submit</button>
                <input style="display:none" type="submit" id="submit-btn">
            </div>
        </form>
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