// Simple Cart System - Bulletproof Version
console.log('Cart.js loading...');

// Test if the script is loading
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart.js: DOM loaded successfully');
    
    // Test if cart link exists
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
        console.log('Cart.js: Cart link found ✓');
        cartLink.style.border = '2px solid red'; // Temporary visual indicator
    } else {
        console.error('Cart.js: Cart link NOT found!');
    }
    
    // Test if cart count element exists
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        console.log('Cart.js: Cart count element found ✓');
    } else {
        console.error('Cart.js: Cart count element NOT found!');
    }
});

// Initialize cart from localStorage
let cart = [];
try {
    const savedCart = localStorage.getItem('117-cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    console.log('Cart loaded from localStorage:', cart);
} catch (error) {
    console.error('Error loading cart from localStorage:', error);
    cart = [];
}

// Simple notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#00ff00' : '#ff0000'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Simple addToCart function
function addToCart(product) {
    console.log('Adding to cart:', product);
    if (!product || !product.id) {
        console.error('Invalid product data:', product);
        showNotification('Error: Invalid product data', 'error');
        return;
    }
    // Check if product already exists
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} quantity updated in cart!`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showNotification(`${product.name} added to cart!`);
    }
    try {
        localStorage.setItem('117-cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage');
    } catch (error) {
        console.error('Error saving cart:', error);
        showNotification('Error saving to cart', 'error');
        return;
    }
    updateCartCount();
    // Visual feedback
    const button = event && event.target ? event.target : null;
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.backgroundColor = '#00ff00';
        button.style.color = '#000000';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 1000);
    }
}

// Remove item from cart
function removeFromCart(id) {
    console.log('Removing from cart, id:', id);
    const item = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    
    if (item) {
        showNotification(`${item.name} removed from cart`);
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('117-cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
    
    updateCartCount();
    
    // If on cart page, re-render
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Update item quantity
function updateQuantity(id, newQuantity) {
    console.log('Updating quantity, id:', id, 'new quantity:', newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        showNotification(`${item.name} quantity updated to ${newQuantity}`);
        
        // Save to localStorage
        try {
            localStorage.setItem('117-cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
        
        updateCartCount();
        
        // If on cart page, re-render
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Updating cart count to:', count);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach((element) => {
        if (element) {
            element.textContent = count;
        }
    });
}

// Render cart page
function renderCart() {
    console.log('Rendering cart...');
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!container) {
        console.log('Cart container not found');
        return;
    }
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-400 py-4">Your cart is empty</p>';
        if (totalElement) totalElement.textContent = '₹0';
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Generate cart HTML
    const cartHTML = cart.map(item => `
        <div class="cart-item pb-6" data-id="${item.id}">
            <div class="flex items-start">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg mr-4">
                <div class="flex-1">
                    <h3 class="font-bold text-lg">${item.name}</h3>
                    <p class="text-gray-400 mb-2">₹${item.price.toLocaleString('en-IN')}</p>
                    <div class="flex items-center space-x-3">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="bg-gray-800 px-3 py-1 rounded-l hover:bg-gray-700">
                            -
                        </button>
                        <span class="px-4 py-1 bg-gray-900">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                                class="bg-gray-800 px-3 py-1 rounded-r hover:bg-gray-700">
                            +
                        </button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" 
                        class="text-red-500 hover:text-red-400 ml-4">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = cartHTML;
    if (totalElement) totalElement.textContent = '₹' + total.toLocaleString('en-IN');
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.renderCart = renderCart;
window.showNotification = showNotification;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing cart...');
    updateCartCount();
    
    // If on cart page, render cart
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    
    console.log('Cart system initialized successfully');
});

console.log('Cart.js loaded successfully!'); 