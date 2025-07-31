// Filter System JavaScript
console.log('Filter system loading...');

// Product data array
const products = [
    { id: 1, name: 'Adidas Samba OG', brand: 'Adidas', price: 22000, sizes: [7, 8, 9, 10, 11, 12] },
    { id: 2, name: 'New Balance 530 - White', brand: 'New Balance', price: 26999, sizes: [10, 11, 12] },
    { id: 3, name: 'Yeezy Boost 350 V2', brand: 'Yeezy', price: 18000, sizes: [9, 10, 11, 12, 13] },
    { id: 4, name: 'Balenciaga Defender - Black', brand: 'Balenciaga', price: 99999, sizes: [7, 8, 9, 10, 11] },
    { id: 1005, name: 'Adidas Tokyo', brand: 'Adidas', price: 8999, sizes: [8, 9, 10, 11] },
    { id: 1006, name: 'New Balance 740 V2', brand: 'New Balance', price: 8999, sizes: [7, 8, 9, 10] },
    { id: 1007, name: 'Nike Air Max Dn8', brand: 'Nike', price: 16999, sizes: [7, 8, 9, 10, 11] },
    { id: 1008, name: 'Converse X Tyle The Creator', brand: 'Converse', price: 14999, sizes: [7, 8, 9, 10] },
    { id: 1009, name: 'Maison Margiela Sprinter Shell', brand: 'Maison Margiela', price: 109999, sizes: [7, 8, 9, 10] },
    { id: 1010, name: 'Louis Vuitton Trainers', brand: 'Louis Vuitton', price: 133999, sizes: [8, 9, 10] },
    { id: 11, name: 'Adidas Gazelle - Red', brand: 'Adidas', price: 7899, sizes: [6, 7, 8, 9, 10, 11] },
    { id: 1012, name: 'New Balance 5060', brand: 'New Balance', price: 16999, sizes: [8, 9, 10] },
    { id: 1013, name: 'Nike Zoom Vomero 5', brand: 'Nike', price: 11999, sizes: [8, 9, 10, 11] },
    { id: 1014, name: 'Veja Campo', brand: 'Veja', price: 11999, sizes: [7, 8, 9, 10] },
    { id: 1015, name: 'Asics Gel 1130', brand: 'Asics', price: 8999, sizes: [6, 7, 8, 9, 10], image: 'https://limitededt.in/cdn/shop/files/1203A610-020_1.jpg?v=1750414314' },
    { id: 1016, name: 'New Balance 990 V6', brand: 'New Balance', price: 10999, sizes: [8, 9, 10] },
    { id: 1017, name: 'Adidas Campus 00s', brand: 'Adidas', price: 10999, sizes: [7, 8, 9, 10] },
    { id: 1018, name: 'Van Knu Skool', brand: 'Vans', price: 8999, sizes: [7, 8, 9, 10, 11] },
    { id: 1019, name: 'Nike SB Force 58', brand: 'Nike', price: 4999, sizes: [6, 7, 8, 9, 10] },
    { id: 1020, name: 'Nike Dunk Low Retro', brand: 'Nike', price: 11999, sizes: [7, 8, 9, 10, 11, 12] },
    { id: 1021, name: 'Air Jordan Spizike Low', brand: 'Jordan', price: 13999, sizes: [7, 8, 9, 10] },
    { id: 1022, name: 'Balenciaga Runner', brand: 'Balenciaga', price: 109999, sizes: [8, 9, 10, 11] },
    { id: 1023, name: 'Balenciaga Xpander', brand: 'Balenciaga', price: 109999, sizes: [8, 9, 10, 11] },
    { id: 7, name: 'Nike Air Jordan 1 Travis Scott', brand: 'Jordan', price: 46999, sizes: [7, 8, 9, 10] },
    { id: 8, name: 'On Cloudmonster - White/Blue', brand: 'On', price: 14999, sizes: [8, 10] },
    { id: 9, name: 'Burberry Arthur Vintage - Black', brand: 'Burberry', price: 119999, sizes: [7, 8, 9, 10, 11] },
    { id: 10, name: 'Lacoste AGLT23', brand: 'Lacoste', price: 24999, sizes: [7, 8, 9, 10] },
    { id: 12, name: 'Adidas Stan Smith - White', brand: 'Adidas', price: 6999, sizes: [7, 8, 9, 10] },
    { id: 13, name: 'Birkenstock Milano Natural Leather', brand: 'Birkenstock', price: 7999, sizes: [6, 7, 8, 9, 10] },
    { id: 15, name: 'HOKA Clifton 9', brand: 'HOKA', price: 22999, sizes: [7, 8, 9, 10, 11] },
    { id: 16, name: 'Balenciaga Speed Knit Sock', brand: 'Balenciaga', price: 122999, sizes: [8, 9, 10] },
    { id: 17, name: 'Adidas SL72 OG', brand: 'Adidas', price: 8999, sizes: [7, 8, 9, 10] },
    { id: 18, name: 'Air Jordan 1 Chicago Lost&Found', brand: 'Jordan', price: 22999, sizes: [9, 10] },
    { id: 19, name: 'CROCS Salehe Bembury - Black', brand: 'CROCS', price: 8999, sizes: [7, 8, 9, 10] },
    { id: 20, name: 'Air Jordan 3 Mocha', brand: 'Jordan', price: 42999, sizes: [7, 8, 9, 10, 11] },
    { id: 21, name: 'Nike Air Max 97 Pure Platinum', brand: 'Nike', price: 19999, sizes: [7, 8, 9, 10] },
    { id: 22, name: 'Balenciaga 3XL', brand: 'Balenciaga', price: 98999, sizes: [8, 9, 10] },
    { id: 23, name: 'Yeezy 350 V2 - Pirate Black', brand: 'Yeezy', price: 16999, sizes: [7, 8, 9, 10, 11] },
    { id: 24, name: 'Nike Air Force - 1\'07', brand: 'Nike', price: 7999, sizes: [7, 8, 9, 10] },
    { id: 25, name: 'Yeezy 700 V3 - Copper Fade', brand: 'Yeezy', price: 24999, sizes: [7, 8, 9, 10] },
    { id: 26, name: 'Adidas Adizero Adios Pro 4', brand: 'Adidas', price: 71999, sizes: [8, 9, 10, 11] },
    { id: 27, name: 'Adidas Forum Low CL', brand: 'Adidas', price: 12999, sizes: [7, 8, 9, 10, 11] },
    { id: 28, name: 'Nike Dior Jordan - Low', brand: 'Jordan', price: 15999, sizes: [9, 10, 11] },
    { id: 29, name: 'BALLY Saber Loafers - Black', brand: 'BALLY', price: 58999, sizes: [8, 9, 10] },
    { id: 30, name: 'Balmain Unicorn Sneakers - Black', brand: 'Balmain', price: 100000, sizes: [8, 9, 10, 11] },
    { id: 31, name: 'Nike Air Force 1 - Women', brand: 'Nike', price: 9599, sizes: [6, 7, 8, 9] },
    { id: 32, name: 'Yeezy 700 V3 Arzareth', brand: 'Yeezy', price: 9999, sizes: [8, 9, 10, 11] },
    { id: 33, name: 'Nike Dunk Low - Off White & Retro', brand: 'Nike', price: 8999, sizes: [7, 8, 9, 10] },
    { id: 34, name: 'Nike Dunk Low - Aster Pink', brand: 'Nike', price: 7999, sizes: [6, 7, 8, 9] },
    { id: 35, name: 'Adidas Feroza Mercedes AMG', brand: 'Adidas', price: 10999, sizes: [7, 8, 9, 10, 11] },
    { id: 36, name: 'Nike Alphafly 3', brand: 'Nike', price: 22999, sizes: [8, 9, 10, 11] },
    { id: 37, name: 'PUMA Speedcat OG - Red & White', brand: 'PUMA', price: 9999, sizes: [7, 8, 9, 10] },
    { id: 1019, name: 'Nike Air Force 1 X Ambush', brand: 'Nike', price: 43999, sizes: [7, 8, 9, 10, 11, 12] },
    { id: 1021, name: 'Nike Air Max 90', brand: 'Nike', price: 9999, sizes: [7, 8, 9, 10] },
    { id: 1020, name: 'Jordan 4 Retro Bred', brand: 'Jordan', price: 24999, sizes: [8, 9, 10] },
    { id: 38, name: 'Scarosso Renato Loafers', brand: 'Scarosso', price: 49999, sizes: [9, 10, 11] },
    { id: 39, name: 'Yeezy 450 Utility Black', brand: 'Yeezy', price: 11999, sizes: [7, 8, 9, 10] },
    { id: 40, name: 'Yeezy Slide Slate Grey', brand: 'Yeezy', price: 8999, sizes: [8, 9, 10] },
    { id: 20001, name: 'Nike Air Mag Back to the Future', brand: 'Nike', price: 3000000, sizes: [7, 8, 9, 10], image: 'https://images.stockx.com/images/Nike-Air-Mag-Back-To-The-Future-BTTF-2016-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1738193358' },
    { id: 20002, name: 'Nike SB Dunk Low Pigeon', brand: 'Nike', price: 89999, sizes: [9, 10, 11], image: 'https://image.goxip.com/j1DaRu8RiWGT5QMLMXQX7Ct4t-g=/fit-in/500x500/filters:format(jpg):quality(80):fill(white)/https:%2F%2Fimages.stockx.com%2Fimages%2FNike-Dunk-SB-Low-Staple-NYC-Pigeon-Product.jpg' },
    { id: 20003, name: 'Converse Run Star', brand: 'Converse', price: 13999, sizes: [6, 7, 8, 9, 10], image: 'https://images-cdn.ubuy.co.in/63f6c4f158513f2392533c21-new-converse-run-star-hike-hi-shoes.jpg' },
];

// Filter state
let filterState = {
    minPrice: 0,
    maxPrice: 720000,
    selectedBrands: [],
    selectedSizes: [],
    sortBy: 'default',
    searchTerm: ''
};

// Initialize filters
function initializeFilters() {
    // Price range sliders
    const priceMinSlider = document.getElementById('price-min');
    const priceMaxSlider = document.getElementById('price-max');
    const minPriceDisplay = document.getElementById('min-price');
    const maxPriceDisplay = document.getElementById('max-price');

    // Update price displays
    function updatePriceDisplays() {
        minPriceDisplay.textContent = filterState.minPrice.toLocaleString();
        maxPriceDisplay.textContent = filterState.maxPrice.toLocaleString();
    }

    // Price min slider
    priceMinSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value <= filterState.maxPrice) {
            filterState.minPrice = value;
            updatePriceDisplays();
            applyFilters();
        }
    });

    // Price max slider
    priceMaxSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value >= filterState.minPrice) {
            filterState.maxPrice = value;
            updatePriceDisplays();
            applyFilters();
        }
    });

    // Brand filters
    document.querySelectorAll('.brand-filter').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                filterState.selectedBrands.push(e.target.value);
            } else {
                filterState.selectedBrands = filterState.selectedBrands.filter(brand => brand !== e.target.value);
            }
            applyFilters();
        });
    });

    // Size filters
    document.querySelectorAll('.size-filter').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                filterState.selectedSizes.push(parseInt(e.target.value));
            } else {
                filterState.selectedSizes = filterState.selectedSizes.filter(size => size !== parseInt(e.target.value));
            }
            applyFilters();
        });
    });

    // Sort select
    document.getElementById('sort-select').addEventListener('change', (e) => {
        filterState.sortBy = e.target.value;
        applyFilters();
    });

    // Reset filters
    document.getElementById('reset-filters').addEventListener('click', () => {
        resetFilters();
    });

    // Toggle filters
    document.getElementById('toggle-filters').addEventListener('click', () => {
        const panel = document.getElementById('filter-panel');
        panel.classList.toggle('hidden');
    });

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        filterState.searchTerm = e.target.value.toLowerCase();
        applyFilters();
    });

    updatePriceDisplays();
}

// Apply filters
function applyFilters() {
    let filteredProducts = products.filter(product => {
        // Price filter
        if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
            return false;
        }

        // Brand filter
        if (filterState.selectedBrands.length > 0 && !filterState.selectedBrands.includes(product.brand)) {
            return false;
        }

        // Size filter
        if (filterState.selectedSizes.length > 0) {
            const hasMatchingSize = filterState.selectedSizes.some(size => product.sizes.includes(size));
            if (!hasMatchingSize) {
                return false;
            }
        }

        // Search filter
        if (filterState.searchTerm && !product.name.toLowerCase().includes(filterState.searchTerm)) {
            return false;
        }

        return true;
    });

    // Sort products
    filteredProducts = sortProducts(filteredProducts);

    // Update display
    updateProductDisplay(filteredProducts);
}

// Sort products
function sortProducts(products) {
    switch (filterState.sortBy) {
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
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h4').textContent;
        const product = products.find(p => p.name === productName);
        
        if (product && filteredProducts.includes(product)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide "no results" message
    const noResultsMsg = document.getElementById('no-results');
    if (filteredProducts.length === 0) {
        if (!noResultsMsg) {
            const msg = document.createElement('div');
            msg.id = 'no-results';
            msg.className = 'col-span-full text-center py-8 text-gray-400';
            msg.innerHTML = '<i class="fas fa-search text-4xl mb-4"></i><p class="text-xl">No products match your filters</p>';
            document.querySelector('.grid').appendChild(msg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Reset all filters
function resetFilters() {
    // Reset price sliders
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 720000;
    filterState.minPrice = 0;
    filterState.maxPrice = 720000;

    // Reset brand checkboxes
    document.querySelectorAll('.brand-filter').forEach(checkbox => {
        checkbox.checked = false;
    });
    filterState.selectedBrands = [];

    // Reset size checkboxes
    document.querySelectorAll('.size-filter').forEach(checkbox => {
        checkbox.checked = false;
    });
    filterState.selectedSizes = [];

    // Reset sort
    document.getElementById('sort-select').value = 'default';
    filterState.sortBy = 'default';

    // Reset search
    document.getElementById('search-input').value = '';
    filterState.searchTerm = '';

    // Update displays
    document.getElementById('min-price').textContent = '0';
    document.getElementById('max-price').textContent = '720000';

    // Apply filters
    applyFilters();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFilters);
} else {
    initializeFilters();
}

console.log('Filter system loaded successfully!'); 