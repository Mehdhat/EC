// Cart Array: Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart Function
function addToCart(productName, price) {
    const product = { name: productName, price: price, quantity: 1 };

    // Check if product already exists in the cart
    const productInCart = cart.find(item => item.name === productName);
    if (productInCart) {
        productInCart.quantity += 1;  // Increase quantity if already in cart
    } else {
        cart.push(product);  // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart.`);
    loadCartItems();  // Reload cart items to reflect the updated cart
}

// Remove from Cart Function
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        // If the product is found in the cart, reduce the quantity
        const product = cart[productIndex];
        product.quantity -= 1;

        if (product.quantity === 0) {
            // If quantity reaches 0, remove the product from the cart
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
        loadCartItems();  // Reload cart items to reflect changes
    }
}

// Load Cart Items on Cart Page
function loadCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous content
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p>Your cart is empty. Please <a href="home.html">add some products</a> to proceed.</p>`;
        document.getElementById('proceed-checkout').style.display = 'none';  // Hide proceed button if cart is empty
        return;
    }

    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('flex', 'justify-between', 'items-center', 'py-4', 'border-b');

        productDiv.innerHTML = `
            <div>
                <p>${item.name} - ${item.price} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="addToCart('${item.name}', ${item.price})" class="px-2 py-1 bg-green-600 text-white rounded">+</button>
                <button onclick="removeFromCart('${item.name}')" class="px-2 py-1 bg-red-600 text-white rounded">-</button>
            </div>
        `;
        cartItemsDiv.appendChild(productDiv);

        // Calculate total price
        totalPrice += item.price * item.quantity;
    });

    // Display total price
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('text-right', 'mt-4');
    totalDiv.innerHTML = `<strong>Total: ${totalPrice.toFixed(2)}</strong>`;
    cartItemsDiv.appendChild(totalDiv);
}

// Proceed to Checkout
function proceedToCheckout() {
    alert("Proceeding to checkout...");
    window.location.href = "checkout.html"; // Redirect to checkout page
}

// Load Order Summary on Checkout Page
function loadOrderSummary() {
    const orderSummaryDiv = document.getElementById('order-summary');
    orderSummaryDiv.innerHTML = ''; // Clear previous content
    let totalPrice = 0;

    if (cart.length === 0) {
        orderSummaryDiv.innerHTML = `<p>Your cart is empty. Please <a href="home.html">add some products</a> to proceed.</p>`;
        document.getElementById('confirm-order').style.display = 'none';  // Hide confirm button if cart is empty
        return;
    }

    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `${item.name} - ${item.price} x ${item.quantity}`;
        orderSummaryDiv.appendChild(productDiv);
        totalPrice += item.price * item.quantity;
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: ${totalPrice.toFixed(2)}</strong>`;
    orderSummaryDiv.appendChild(totalDiv);
}

// Confirm Order
function confirmOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some products to confirm your order.");
    } else {
        alert("Thank you! Your order has been confirmed.");
        localStorage.clear(); // Clear the cart after order confirmation
        window.location.href = "home.html"; // Redirect to home or thank-you page
    }
}

// Load appropriate cart or order summary based on the page
if (window.location.pathname.includes('cart.html')) {
    loadCartItems();  // Load cart items if on the cart page
} else if (window.location.pathname.includes('checkout.html')) {
    loadOrderSummary();  // Load order summary if on the checkout page
}
