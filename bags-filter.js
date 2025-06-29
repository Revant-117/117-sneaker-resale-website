// Bags Filter System JavaScript
console.log('Bags filter system loading...');

// Bags product data array
const bagsProducts = [
    { id: 401, name: 'Louis Vuitton CarryAll', brand: 'Louis Vuitton', price: 249999, category: 'Handbag' },
    { id: 402, name: 'BOSS Handbag', brand: 'BOSS', price: 29999, category: 'Handbag' },
    { id: 403, name: 'Louis Vuitton Getaway', brand: 'Louis Vuitton', price: 399999, category: 'Backpack' },
    { id: 404, name: 'Michael Kors Voyager', brand: 'Michael Kors', price: 27999, category: 'Handbag' },
    { id: 405, name: 'COACH Rowan Satchel', brand: 'COACH', price: 16999, category: 'Satchel' },
    { id: 406, name: 'Marc Jacobs TOTE Bag', brand: 'Marc Jacobs', price: 42999, category: 'Tote' },
    { id: 407, name: 'Hermes Gold Madame', brand: 'Hermes', price: 244999, category: 'Handbag' },
    { id: 408, name: 'Kate Spade Bleeker', brand: 'Kate Spade', price: 16999, category: 'Handbag' },
    { id: 409, name: 'Emporio Armani Plaque', brand: 'Emporio Armani', price: 8999, category: 'Handbag' },
    { id: 410, name: 'COACH Signature Charter', brand: 'COACH', price: 37999, category: 'Handbag' },
    { id: 411, name: 'Michael Kors BEX', brand: 'Michael Kors', price: 17999, category: 'Handbag' },
    { id: 412, name: 'BALLY Backpack - Blue', brand: 'BALLY', price: 65000, category: 'Backpack' }
];

// Filter state
let filterState = {
    searchTerm: '',
    minPrice: 0,
    maxPrice: 500000,
    selectedBrands: [],
    selectedCategories: [],
    sortBy: 'default'
};

// Get unique brands
const brands = [...new Set(bagsProducts.map(product => product.brand))];
// Get unique categories
const categories = [...new Set(bagsProducts.map(product => product.category))];

// Initialize filters
function initializeFilters() {
    console.log('Initializing bags filters...');
    
    // Populate brand checkboxes
    const brandContainer = document.getElementById('brand-filters');
    if (brandContainer) {
        brands.forEach(brand => {
            const div = document.createElement('div');
            div.className = 'flex items-center mb-2';
            div.innerHTML = `
                <input type="checkbox" id="brand-${brand.replace(/\s+/g, '-')}" 
                       class="mr-2 w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500">
                <label for="brand-${brand.replace(/\s+/g, '-')}" class="text-sm text-gray-300">${brand}</label>
            `;
            brandContainer.appendChild(div);
        });
    }

    // Populate category checkboxes
    const categoryContainer = document.getElementById('category-filters');
    if (categoryContainer) {
        categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'flex items-center mb-2';
            div.innerHTML = `
                <input type="checkbox" id="category-${category.replace(/\s+/g, '-')}" 
                       class="mr-2 w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500">
                <label for="category-${category.replace(/\s+/g, '-')}" class="text-sm text-gray-300">${category}</label>
            `;
            categoryContainer.appendChild(div);
        });
    }

    // Set up event listeners
    setupEventListeners();
    
    // Initial filter
    applyFilters();
}

// Set up event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterState.searchTerm = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    // Price range sliders
    const minPriceSlider = document.getElementById('min-price');
    const maxPriceSlider = document.getElementById('max-price');
    const minPriceDisplay = document.getElementById('min-price-display');
    const maxPriceDisplay = document.getElementById('max-price-display');

    if (minPriceSlider && maxPriceSlider) {
        minPriceSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            filterState.minPrice = value;
            if (minPriceDisplay) minPriceDisplay.textContent = `₹${value.toLocaleString()}`;
            applyFilters();
        });

        maxPriceSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            filterState.maxPrice = value;
            if (maxPriceDisplay) maxPriceDisplay.textContent = `₹${value.toLocaleString()}`;
            applyFilters();
        });
    }

    // Brand checkboxes
    brands.forEach(brand => {
        const checkbox = document.getElementById(`brand-${brand.replace(/\s+/g, '-')}`);
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    filterState.selectedBrands.push(brand);
                } else {
                    filterState.selectedBrands = filterState.selectedBrands.filter(b => b !== brand);
                }
                applyFilters();
            });
        }
    });

    // Category checkboxes
    categories.forEach(category => {
        const checkbox = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    filterState.selectedCategories.push(category);
                } else {
                    filterState.selectedCategories = filterState.selectedCategories.filter(c => c !== category);
                }
                applyFilters();
            });
        }
    });

    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            filterState.sortBy = e.target.value;
            applyFilters();
        });
    }

    // Reset button
    const resetButton = document.getElementById('reset-filters');
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }

    // Toggle filter panel
    const toggleButton = document.getElementById('toggle-filters');
    const filterPanel = document.getElementById('filter-panel');
    if (toggleButton && filterPanel) {
        toggleButton.addEventListener('click', () => {
            filterPanel.classList.toggle('hidden');
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    }
}

// Apply filters
function applyFilters() {
    console.log('Applying bags filters:', filterState);
    
    let filteredProducts = [...bagsProducts];

    // Search filter
    if (filterState.searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(filterState.searchTerm) ||
            product.brand.toLowerCase().includes(filterState.searchTerm)
        );
    }

    // Price filter
    filteredProducts = filteredProducts.filter(product => 
        product.price >= filterState.minPrice && product.price <= filterState.maxPrice
    );

    // Brand filter
    if (filterState.selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            filterState.selectedBrands.includes(product.brand)
        );
    }

    // Category filter
    if (filterState.selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            filterState.selectedCategories.includes(product.category)
        );
    }

    // Sort products
    filteredProducts = sortProducts(filteredProducts, filterState.sortBy);

    // Update display
    updateProductDisplay(filteredProducts);
    
    // Update results count
    updateResultsCount(filteredProducts.length);
}

// Sort products
function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return products.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return products;
    }
}

// Update product display
function updateProductDisplay(filteredProducts) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Get all product cards
    const allCards = productsGrid.querySelectorAll('.product-card');
    
    // Create a set of filtered product IDs for quick lookup
    const filteredProductIds = new Set(filteredProducts.map(p => p.id.toString()));

    // Show/hide cards based on whether they're in the filtered results
    allCards.forEach(card => {
        const productId = card.getAttribute('data-product-id');
        if (filteredProductIds.has(productId)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // If sorting is applied, we need to reorder the visible cards
    if (filterState.sortBy !== 'default') {
        // Get all visible cards
        const visibleCards = Array.from(allCards).filter(card => 
            card.style.display !== 'none'
        );

        // Create a map of product ID to card for quick lookup
        const cardMap = {};
        visibleCards.forEach(card => {
            const productId = card.getAttribute('data-product-id');
            cardMap[productId] = card;
        });

        // Reorder cards based on filtered products order
        filteredProducts.forEach((product, index) => {
            const card = cardMap[product.id.toString()];
            if (card) {
                // Move the card to the correct position
                if (index === 0) {
                    productsGrid.insertBefore(card, productsGrid.firstChild);
                } else {
                    const prevCard = cardMap[filteredProducts[index - 1].id.toString()];
                    if (prevCard) {
                        productsGrid.insertBefore(card, prevCard.nextSibling);
                    }
                }
            }
        });
    }
}

// Update results count
function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }
}

// Reset all filters
function resetFilters() {
    console.log('Resetting bags filters...');
    
    // Reset filter state
    filterState = {
        searchTerm: '',
        minPrice: 0,
        maxPrice: 500000,
        selectedBrands: [],
        selectedCategories: [],
        sortBy: 'default'
    };

    // Reset search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    // Reset price sliders
    const minPriceSlider = document.getElementById('min-price');
    const maxPriceSlider = document.getElementById('max-price');
    const minPriceDisplay = document.getElementById('min-price-display');
    const maxPriceDisplay = document.getElementById('max-price-display');

    if (minPriceSlider) {
        minPriceSlider.value = 0;
        if (minPriceDisplay) minPriceDisplay.textContent = '₹0';
    }
    if (maxPriceSlider) {
        maxPriceSlider.value = 500000;
        if (maxPriceDisplay) maxPriceDisplay.textContent = '₹5,00,000';
    }

    // Reset all checkboxes
    const checkboxes = document.querySelectorAll('#filter-panel input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    // Reset sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'default';

    // Apply filters
    applyFilters();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFilters);
} else {
    initializeFilters();
}

console.log('Bags filter system loaded successfully!'); 