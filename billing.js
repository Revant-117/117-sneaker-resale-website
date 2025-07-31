// Billing page script
console.log('Billing.js loading...');

let cart = [];

// Load cart from localStorage
function loadCart() {
    try {
        const saved = localStorage.getItem('117-cart');
        if (saved) {
            cart = JSON.parse(saved);
            console.log('Cart loaded for billing:', cart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
}

// Show notification (reused from cart.js)
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

// Render order summary
function renderOrderSummary() {
    const summaryEl = document.getElementById('order-summary');
    if (!summaryEl) return;

    if (cart.length === 0) {
        summaryEl.innerHTML = '<p class="text-gray-400">Your cart is empty.</p>';
        return;
    }

    const itemsHTML = cart.map(item => {
        const lineTotal = item.price * item.quantity;
        return `
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded"/>
                    <span>${item.name} x ${item.quantity}</span>
                </div>
                <span>₹${lineTotal.toLocaleString('en-IN')}</span>
            </div>
        `;
    }).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    summaryEl.innerHTML = `
        ${itemsHTML}
        <hr class="border-gray-700 my-4">
        <div class="flex justify-between font-bold">
            <span>Total:</span>
            <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
    `;
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    // Basic validation (HTML5 handles required)

    if (cart.length === 0) {
        showNotification('Cannot place order: Cart is empty!', 'error');
        return;
    }

    // Simulate order placement
    showNotification('Order placed successfully!');

    // Clear cart and storage
    cart = [];
    localStorage.removeItem('117-cart');

    // Disable form
    const form = document.getElementById('billing-form');
    if (form) {
        Array.from(form.elements).forEach(el => el.disabled = true);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderOrderSummary();
    const form = document.getElementById('billing-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    console.log('Billing.js initialized');
});