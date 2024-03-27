document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('open');
    document.querySelector('.overlay-menu').classList.toggle('open');
  });

var sessionCartItems = sessionStorage.getItem("productids");

var cartItems = [];

if (sessionCartItems == null || sessionCartItems == "") {
    sessionStorage.setItem("productids", "");
}
else {
    cartItems = JSON.parse(sessionStorage.getItem("productids"));
}
document.getElementById("cart").setAttribute("data-count", cartItems.length);
function addToCart(productId) {

    // let sessionCartItems = sessionStorage.getItem("productids");

    // let cartItems = [];

    if (sessionCartItems == null || sessionCartItems == "") {
        sessionStorage.setItem("productids", "");
    }
    else {
        cartItems = JSON.parse(sessionStorage.getItem("productids"));
    }


    let itemExist = false;

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i] == productId) {
            itemExist = true;
            break;
        }
    }

    if (!itemExist) {
        cartItems.push(productId);

        sessionStorage.setItem("productids", JSON.stringify(cartItems));

        document.getElementById("cart").setAttribute("data-count", cartItems.length);
    }
}

function updateCartItems() {

    if (sessionCartItems == null || sessionCartItems == "") {
        sessionStorage.setItem("productids", "");
    } else {
        cartItems = JSON.parse(sessionStorage.getItem("productids"));
    }

    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = document.getElementById(cartItems[i]);
        cartItem.style.display = 'flex';

        var prices = cartItem.querySelectorAll('.cart-item-price-new');

        var priceValue = parseFloat(prices[0].textContent.replace('$', '').trim());

        // Add the value to total
        total += priceValue;

    }

    document.getElementById('total-value').innerHTML = "$ " + total.toFixed(2);

    if (total == 0)
    {
        document.getElementById('form-checkout').style.display = 'none';
    }
}

function deleteCartItem(productId) {

    let index = cartItems.indexOf(productId);

    if (index > -1) { // only splice array when item is found
        cartItems.splice(index, 1); // 2nd parameter means remove one item only
    }

    sessionStorage.setItem("productids", JSON.stringify(cartItems));

    document.getElementById(productId).style.display = 'none';
    document.getElementById("cart").setAttribute("data-count", cartItems.length);
    updateCartItems();
}

function updateReceiptItems() {

    if (sessionCartItems == null || sessionCartItems == "") {
        sessionStorage.setItem("productids", "");
    } else {
        cartItems = JSON.parse(sessionStorage.getItem("productids"));
    }

    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = document.getElementById(cartItems[i]);
        cartItem.style.display = 'flex';

        var prices = cartItem.querySelectorAll('.price-new');

        var priceValue = parseFloat(prices[0].textContent.replace('$', '').trim());

        // Add the value to total
        total += priceValue;

    }

    document.getElementById('total-value').innerHTML = "$ " + total.toFixed(2);

    //document.getElementById(productId).style.display = '';

    sessionStorage.setItem("productids", "");

    document.getElementById("cart").setAttribute("data-count", 0);

}