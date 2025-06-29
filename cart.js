// Cart System for GitHub Pages - Enhanced Version
(function() {
    'use strict';
    
    console.log('Cart.js loading...');
    
    // Global cart variable
    let cart = [];
    
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
    console.log('GitHub Pages detected:', isGitHubPages);
    
    // Initialize cart from localStorage
    function initializeCart() {
        try {
            const savedCart = localStorage.getItem('117-cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                console.log('Cart loaded from localStorage:', cart);
            } else {
                console.log('No saved cart found, starting with empty cart');
                cart = [];
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            cart = [];
        }
    }
    
    // Test localStorage availability
    function testLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            console.log('localStorage is available ✓');
            return true;
        } catch (error) {
            console.error('localStorage is NOT available!', error);
            return false;
        }
    }
    
    // Simple notification function
    function showNotification(message, type = 'success') {
        try {
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
        } catch (error) {
            console.error('Error showing notification:', error);
            alert(message); // Fallback to alert
        }
    }
    
    // Enhanced addToCart function
    function addToCart(product, event) {
        console.log('Adding to cart:', product);
        
        // Validate product data
        if (!product || !product.id || !product.name || !product.price) {
            console.error('Invalid product data:', product);
            showNotification('Error: Invalid product data', 'error');
            return false;
        }
        
        try {
            // Check if product already exists
            const existingItem = cart.find(item => item.id === product.id && (!product.size || item.size === product.size));
            if (existingItem) {
                existingItem.quantity += 1;
                showNotification(`${product.name} quantity updated in cart!`);
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    ...(product.size ? { size: product.size } : {})
                });
                showNotification(`${product.name} added to cart!`);
            }
            
            // Save to localStorage
            if (testLocalStorage()) {
                try {
                    localStorage.setItem('117-cart', JSON.stringify(cart));
                    console.log('Cart saved to localStorage');
                } catch (storageError) {
                    console.error('Error saving cart to localStorage:', storageError);
                    showNotification('Warning: Cart may not persist between sessions', 'error');
                }
            }
            
            updateCartCount();
            
            // Visual feedback
            if (event && event.target) {
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
            
            return true;
        } catch (error) {
            console.error('Error in addToCart:', error);
            showNotification('Error adding item to cart', 'error');
            return false;
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
        if (testLocalStorage()) {
            try {
                localStorage.setItem('117-cart', JSON.stringify(cart));
            } catch (error) {
                console.error('Error saving cart:', error);
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
            showNotification(`${item.name} quantity updated to ${newQuantity}`);
            
            // Save to localStorage
            if (testLocalStorage()) {
                try {
                    localStorage.setItem('117-cart', JSON.stringify(cart));
                } catch (error) {
                    console.error('Error saving cart:', error);
                }
            }
            
            updateCartCount();
            
            // If on cart page, re-render
            if (window.location.pathname.includes('cart.html')) {
                renderCart();
            }
        }
    }
    
    // Clear entire cart
    function clearCart() {
        console.log('Clearing entire cart');
        
        if (cart.length === 0) {
            showNotification('Cart is already empty', 'error');
            return;
        }
        
        cart = [];
        showNotification('Cart cleared successfully!');
        
        // Clear from localStorage
        if (testLocalStorage()) {
            try {
                localStorage.removeItem('117-cart');
                console.log('Cart cleared from localStorage');
            } catch (error) {
                console.error('Error clearing cart from localStorage:', error);
            }
        }
        
        updateCartCount();
        
        // If on cart page, re-render
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
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
                        ${item.size ? `<p class='text-gray-300 mb-2'>Size: <span class='font-semibold'>${item.size}</span></p>` : ''}
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
    
    // Initialize when DOM is ready
    function initialize() {
        console.log('DOM loaded, initializing cart...');
        
        // Test localStorage
        testLocalStorage();
        
        // Initialize cart
        initializeCart();
        
        // Update cart count
        updateCartCount();
        
        // If on cart page, render cart
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
        
        console.log('Cart system initialized successfully');
    }
    
    // Make functions globally available
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
})(); 