// Load cart from localStorage or initialize an empty array
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
    alert(`${productName} has been added to your cart.`);
}