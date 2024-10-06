// Toggle mobile menu visibility
document.getElementById('menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Toggle categories dropdown visibility
const categoriesBtn = document.getElementById('categories-btn');
const categoriesDropdown = document.getElementById('categories-dropdown');

categoriesBtn.addEventListener('click', function() {
    categoriesDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('#categories-btn')) {
        if (!categoriesDropdown.classList.contains('hidden')) {
            categoriesDropdown.classList.add('hidden');
        }
    }
});

// Function to simulate adding a product to the cart
function addToCart() {
    alert("Product added to cart!");
    // Here you would typically send an AJAX request to your backend to update the cart
 }
 
 // Function to simulate removing a product from the cart
 function removeFromCart() {
    alert("Product removed from cart!");
    // Here you would typically send an AJAX request to your backend to update the cart
 }
 
 function addToCart(name, price, image) {
    // Get the existing cart from localStorage or create a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new product to the cart
    cart.push({ name: name, price: price, image: image });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);
}
 // Function to display items in the cart
 function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    
    cartContainer.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = `
                <div class="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                        <div>
                            <h3 class="text-lg font-semibold">${item.name}</h3>
                            <p class="text-gray-600">Price: ${item.price}</p>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove</button>
                </div>
            `;
            cartContainer.innerHTML += cartItem;
        });

        calculateTotal();
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Re-render cart
}

// Function to calculate total price
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Call the function when the page loads
window.onload = displayCartItems;