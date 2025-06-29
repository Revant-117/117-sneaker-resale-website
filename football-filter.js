// Football Filter System JavaScript
console.log('Football filter system loading...');

// Football product data array
const footballProducts = [
    { id: 105, name: 'Nike Phantom GX - Purple', brand: 'Nike', price: 23999, sizes: [9, 10, 11], category: 'Phantom' },
    { id: 106, name: 'PUMA Ultra - Orange', brand: 'PUMA', price: 9999, sizes: [8, 9, 10, 11], category: 'Ultra' },
    { id: 107, name: 'Nike Air Zoom - White', brand: 'Nike', price: 13999, sizes: [8, 9, 10, 11], category: 'Air Zoom' },
    { id: 108, name: 'Nike Superfly Elite 10', brand: 'Nike', price: 15999, sizes: [7, 8, 9, 10], category: 'Superfly' },
    { id: 109, name: 'Nike Mercurial Vapor 16 - Light Blue', brand: 'Nike', price: 14999, sizes: [9, 10, 11], category: 'Mercurial' },
    { id: 101, name: 'Nike Mercurial Vapor', brand: 'Nike', price: 16999, sizes: [6, 7, 8, 9, 10, 11], category: 'Mercurial' },
    { id: 102, name: 'Nike Mercurial Vapor Pro 16 - Kylian Mbappe', brand: 'Nike', price: 18999, sizes: [7, 8, 9, 10], category: 'Mercurial' },
    { id: 103, name: 'Mizuno Morelia Neo IV Elite', brand: 'Mizuno', price: 29999, sizes: [7, 8, 9, 10, 11], category: 'Morelia' },
    { id: 104, name: 'Adidas Copa Sense - White', brand: 'Adidas', price: 6500, sizes: [7, 8, 9, 10, 11], category: 'Copa' },
    { id: 110, name: 'Adidas Predator Elite', brand: 'Adidas', price: 18999, sizes: [8, 9, 10, 11], category: 'Predator' },
    { id: 111, name: 'Puma Future 7 Ultimate', brand: 'PUMA', price: 21999, sizes: [8, 9, 10], category: 'Future' },
    { id: 112, name: 'New Balance Tekela V4+ Pro', brand: 'New Balance', price: 19999, sizes: [9, 10, 11], category: 'Tekela' },
    { id: 113, name: 'New Balance 442 - Black', brand: 'New Balance', price: 4999, sizes: [6, 7, 8, 9, 10], category: '442' },
    { id: 114, name: 'PUMA King Ultimate - White', brand: 'PUMA', price: 11999, sizes: [7, 8, 9, 10, 11], category: 'King' },
    { id: 115, name: 'Nike Phantom GX - Orange & Black', brand: 'Nike', price: 6999, sizes: [6, 7, 8, 9, 10], category: 'Phantom' },
    { id: 116, name: 'Nike United Mercurial Vapor 16', brand: 'Nike', price: 10999, sizes: [8, 9, 10], category: 'Mercurial' },
    { id: 117, name: 'Adidas X Crazyfast - Green', brand: 'Adidas', price: 5999, sizes: [7, 8, 9, 10], category: 'X' },
    { id: 118, name: 'Nike Zoom Mercurial Superfly 9', brand: 'Nike', price: 8999, sizes: [8, 9, 10, 11], category: 'Superfly' },
    { id: 119, name: 'Mizuno Alpha Elite - Blue', brand: 'Mizuno', price: 11999, sizes: [8, 9, 10], category: 'Alpha' }
];

// Filter state
let filterState = {
    searchTerm: '',
    minPrice: 0,
    maxPrice: 35000,
    selectedBrands: [],
    selectedSizes: [],
    selectedCategories: [],
    sortBy: 'default'
};

// Get unique brands
const brands = [...new Set(footballProducts.map(product => product.brand))];
// Get unique sizes
const sizes = [...new Set(footballProducts.flatMap(product => product.sizes))];
// Get unique categories
const categories = [...new Set(footballProducts.map(product => product.category))];

// Initialize filters
function initializeFilters() {
    console.log('Initializing football filters...');
    
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

    // Populate size checkboxes
    const sizeContainer = document.getElementById('size-filters');
    if (sizeContainer) {
        sizes.forEach(size => {
            const div = document.createElement('div');
            div.className = 'flex items-center mb-2';
            div.innerHTML = `
                <input type="checkbox" id="size-${size}" 
                       class="mr-2 w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500">
                <label for="size-${size}" class="text-sm text-gray-300">${size}</label>
            `;
            sizeContainer.appendChild(div);
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

    // Size checkboxes
    sizes.forEach(size => {
        const checkbox = document.getElementById(`size-${size}`);
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    filterState.selectedSizes.push(size);
                } else {
                    filterState.selectedSizes = filterState.selectedSizes.filter(s => s !== size);
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
    console.log('Applying football filters:', filterState);
    
    let filteredProducts = [...footballProducts];

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

    // Size filter
    if (filterState.selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.sizes.some(size => filterState.selectedSizes.includes(size))
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
    console.log('Resetting football filters...');
    
    // Reset filter state
    filterState = {
        searchTerm: '',
        minPrice: 0,
        maxPrice: 35000,
        selectedBrands: [],
        selectedSizes: [],
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
        maxPriceSlider.value = 35000;
        if (maxPriceDisplay) maxPriceDisplay.textContent = '₹35,000';
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

console.log('Football filter system loaded successfully!'); 