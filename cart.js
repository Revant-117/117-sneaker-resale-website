// Cart System - Complete Version
let cart = JSON.parse(localStorage.getItem('117-cart')) || [];

// Global Functions - Define these first so they're available immediately
window.addToCart = function(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
    alert(`${product.name} added to cart!`);
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

window.updateQuantity = function(id, newQty) {
    const item = cart.find(item => item.id === id);
    if (item && newQty > 0) {
        item.quantity = newQty;
        updateCart();
    }
};

// Core Functions
function updateCart() {
    localStorage.setItem('117-cart', JSON.stringify(cart));
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    container.innerHTML = cart.length ? cart.map(item => `
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
    `).join('') : '<p class="text-gray-400 py-4">Your cart is empty</p>';

    document.getElementById('cart-total').textContent = 
        '₹' + cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Make renderCart available globally
window.renderCart = renderCart;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-white', 'border-b-2', 'border-green-500');
            link.classList.remove('text-gray-300');
        }
    });
}); 