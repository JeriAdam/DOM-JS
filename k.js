if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var g = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < g.length; i++) {
        var button = g[i]
        button.addEventListener('click', removeCartItem)
    }

    var a = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < a.length; i++) {
        var input = a[i]
        input.addEventListener('change', quantityChanged)
    }

    var b = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < b.length; i++) {
        var button = b[i]
        button.addEventListener('click', addToCartClicked)
    }
    var h = document.getElementsByClassName('f')
    for (var i = 0; i < h.length; i++) {
        var button = h[i]
        button.addEventListener('click', addToCartClicked)
    }


    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var d = event.target
    d.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var heart = shopItem.getElementsByClassName('f')[0]
    addItemToCart(title, price, imageSrc,heart)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>

            <div class="f">
        <span class="heartbox"></span>
    <div class="heartbox"> <input type="checkbox" class="checkbox" id="checkbox" />
    <label for="checkbox"> <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
            <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2" />
            <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />
            <g id="heartgroup7" opacity="0" transform="translate(7 6)">
                <circle id="heart1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                <circle id="heart2" fill="#8CE8C3" cx="5" cy="2" r="2" />
            </g>
            <g id="heartgroup6" opacity="0" transform="translate(0 28)">
                <circle id="heart1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                <circle id="heart2" fill="#91D2FA" cx="3" cy="2" r="2" />
            </g>
            <g id="heartgroup3" opacity="0" transform="translate(52 28)">
                <circle id="heart2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                <circle id="heart1" fill="#8CE8C3" cx="4" cy="2" r="2" />
            </g>
            <g id="heartgroup2" opacity="0" transform="translate(44 6)">
                <circle id="heart2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                <circle id="heart1" fill="#CC8EF5" cx="2" cy="2" r="2" />
            </g>
            <g id="heartgroup5" opacity="0" transform="translate(14 50)">
                <circle id="heart1" fill="#91D2FA" cx="6" cy="5" r="2" />
                <circle id="heart2" fill="#91D2FA" cx="2" cy="2" r="2" />
            </g>
            <g id="heartgroup4" opacity="0" transform="translate(35 50)">
                <circle id="heart1" fill="#F48EA7" cx="6" cy="5" r="2" />
                <circle id="heart2" fill="#F48EA7" cx="2" cy="2" r="2" />
            </g>
            <g id="heartgroup1" opacity="0" transform="translate(24)">
                <circle id="heart1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                <circle id="heart2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
            </g>
        </g>
    </svg> </label> <input type="checkbox" class="checkbox" id="checkbox_2" />
    </div>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartRow.getElementsByClassName('f')[0].addEventListener('change', quantityChanged)
    
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total}


    function heartIcon(event) {
        var a = event.target
        a.style.backgroundColor = 'red';      
    }
    function Heart() {
        var c = document.getElementsByClassName('f')
        for (var i = 0; i < c.length; i++) {
            var button = c[i]
            button.setAttribute("class", "heartbox");
        }
    }