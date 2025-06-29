// Simple Cart System - Guaranteed to Work
console.log('Cart.js loading...');

// Global cart array
let cart = [];

// Load cart from localStorage
function loadCart() {
    try {
        const saved = localStorage.getItem('117-cart');
        if (saved) {
            cart = JSON.parse(saved);
            console.log('Cart loaded:', cart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('117-cart', JSON.stringify(cart));
        console.log('Cart saved');
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Show notification
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
        font-family: Arial, sans-serif;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Add to cart function
function addToCart(product) {
    console.log('Adding to cart:', product);
    
    if (!product || !product.id || !product.name || !product.price) {
        showNotification('Error: Invalid product data', 'error');
        return;
    }
    
    // Check if product already exists
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} quantity updated!`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            size: product.size || null
        });
        showNotification(`${product.name} added to cart!`);
    }
    
    saveCart();
    updateCartCount();
    
    // Visual feedback
    const button = event.target;
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

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    showNotification('Item removed from cart');
    
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Update quantity
function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        showNotification(`${item.name} quantity updated`);
        
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty', 'error');
        return;
    }
    
    cart = [];
    localStorage.removeItem('117-cart');
    updateCartCount();
    showNotification('Cart cleared successfully!');
    
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = count;
        }
    });
}

// Render cart page
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-400 py-4">Your cart is empty</p>';
        if (totalElement) totalElement.textContent = '₹0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const cartHTML = cart.map(item => `
        <div class="cart-item pb-6" data-id="${item.id}">
            <div class="flex items-start">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg mr-4">
                <div class="flex-1">
                    <h3 class="font-bold text-lg">${item.name}</h3>
                    <p class="text-gray-400 mb-2">₹${item.price.toLocaleString('en-IN')}</p>
                    ${item.size ? `<p class='text-gray-300 mb-2'>Size: ${item.size}</p>` : ''}
                    <div class="flex items-center space-x-3">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="bg-gray-800 px-3 py-1 rounded-l hover:bg-gray-700">-</button>
                        <span class="px-4 py-1 bg-gray-900">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                                class="bg-gray-800 px-3 py-1 rounded-r hover:bg-gray-700">+</button>
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

// Initialize
function initialize() {
    console.log('Initializing cart...');
    loadCart();
    updateCartCount();
    
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    
    console.log('Cart initialized successfully!');
}

// Make functions globally available IMMEDIATELY
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.renderCart = renderCart;
window.showNotification = showNotification;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

console.log('Cart.js loaded successfully!'); 