// Simple Cart System with Server Compatibility
console.log('Cart.js loading...');

// Check if we're in a server environment
const isServerEnvironment = window.location.protocol === 'https:' || window.location.protocol === 'http:';
console.log('Server environment detected:', isServerEnvironment);

// Initialize cart from localStorage
let cart = [];
try {
    const savedCart = localStorage.getItem('117-cart');
    console.log('Raw saved cart:', savedCart);
    cart = savedCart ? JSON.parse(savedCart) : [];
    console.log('Cart loaded from localStorage:', cart);
} catch (error) {
    console.error('Error loading cart from localStorage:', error);
    cart = [];
}

// Simple addToCart function
function addToCart(product) {
    console.log('Adding to cart:', product);
    
    if (!product || !product.id) {
        console.error('Invalid product data:', product);
        alert('Error: Invalid product data');
        return;
    }
    
    // Check if product already exists
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('Updated existing item quantity to:', existingItem.quantity);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        console.log('Added new item to cart');
    }
    
    console.log('Current cart after adding:', cart);
    
    // Save to localStorage with error handling
    try {
        localStorage.setItem('117-cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage successfully');
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        
        // Fallback: try to save to sessionStorage
        try {
            sessionStorage.setItem('117-cart', JSON.stringify(cart));
            console.log('Cart saved to sessionStorage as fallback');
        } catch (sessionError) {
            console.error('Error saving to sessionStorage:', sessionError);
            alert('Error saving to cart. Please try again.');
            return;
        }
    }
    
    // Update cart count display
    updateCartCount();
    
    // Show success message
    alert(product.name + ' added to cart!');
}

// Remove item from cart
function removeFromCart(id) {
    console.log('Removing from cart, id:', id);
    cart = cart.filter(item => item.id !== id);
    
    // Save to localStorage with fallback
    try {
        localStorage.setItem('117-cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        try {
            sessionStorage.setItem('117-cart', JSON.stringify(cart));
        } catch (sessionError) {
            console.error('Error saving to sessionStorage:', sessionError);
        }
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
        
        // Save to localStorage with fallback
        try {
            localStorage.setItem('117-cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
            try {
                sessionStorage.setItem('117-cart', JSON.stringify(cart));
            } catch (sessionError) {
                console.error('Error saving to sessionStorage:', sessionError);
            }
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
    console.log('Found cart count elements:', cartCountElements.length);
    
    cartCountElements.forEach((element, index) => {
        console.log(`Updating cart count element ${index}:`, element);
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing cart...');
    console.log('Current cart at initialization:', cart);
    console.log('Page URL:', window.location.href);
    console.log('Protocol:', window.location.protocol);
    
    updateCartCount();
    
    // If on cart page, render cart
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    
    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-white', 'border-b-2', 'border-green-500');
            link.classList.remove('text-gray-300');
        }
    });
});

console.log('Cart.js loaded successfully!'); 