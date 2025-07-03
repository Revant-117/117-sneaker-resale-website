// favourites.js - Shared Favourites Logic for All Sections
(function() {
    // Use a single global variable to avoid conflicts
    window.favourites = [];

    function loadFavourites() {
        try {
            const saved = localStorage.getItem('117-favourites');
            if (saved) window.favourites = JSON.parse(saved).map(Number);
            else window.favourites = [];
        } catch {
            window.favourites = [];
        }
    }

    function saveFavourites() {
        try { localStorage.setItem('117-favourites', JSON.stringify(window.favourites)); } catch {}
    }

    function isFavourite(productId) {
        return window.favourites.includes(Number(productId));
    }

    window.toggleFavourite = function(event, productId) {
        event.preventDefault();
        loadFavourites();
        const pid = Number(productId);
        const idx = window.favourites.indexOf(pid);
        if (idx === -1) window.favourites.push(pid);
        else window.favourites.splice(idx, 1);
        saveFavourites();
        updateFavouriteIcons();
    };

    function updateFavouriteIcons() {
        document.querySelectorAll('.favourite-btn').forEach(btn => {
            const pid = Number(btn.getAttribute('data-product-id'));
            const icon = btn.querySelector('i');
            if (isFavourite(pid)) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            }
        });
    }

    // Expose updateFavouriteIcons globally for manual refresh if needed
    window.updateFavouriteIcons = updateFavouriteIcons;

    // Initialize on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        loadFavourites();
        updateFavouriteIcons();
    });

    // Listen for storage changes (sync across tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === '117-favourites') {
            loadFavourites();
            updateFavouriteIcons();
        }
    });
})(); 