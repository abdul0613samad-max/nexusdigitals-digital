// Main JavaScript for homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const productsContainer = document.getElementById('productsContainer');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const loadMoreBtn = document.getElementById('loadMore');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // State variables
    let currentCategory = 'all';
    let currentProducts = [];
    let productsToShow = 8;
    let allProducts = window.productsData || [];
    
    // Initialize
    initializePage();
    
    // Functions
    function initializePage() {
        // Load initial products
        filterProductsByCategory('all');
        renderProducts();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize mobile menu
        initializeMobileMenu();
        
        // Load ads after page load
        setTimeout(loadAds, 1000);
    }
    
    function setupEventListeners() {
        // Category filter buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                filterProductsByCategory(category);
                renderProducts();
                
                // Reset products to show count
                productsToShow = 8;
            });
        });
        
        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                productsToShow += 4;
                renderProducts();
                
                // Hide button if all products are shown
                if (productsToShow >= currentProducts.length) {
                    loadMoreBtn.style.display = 'none';
                }
            });
        }
        
        // Category links in dropdown
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
                
                // Filter products
                filterProductsByCategory(category);
                renderProducts();
            });
        });
    }
    
    function initializeMobileMenu() {
        if (!mobileMenuBtn) return;
        
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile nav if it doesn't exist
            let mobileNav = document.querySelector('.mobile-nav');
            
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                const navContent = `
                    <ul class="mobile-nav-links">
                        <li><a href="index.html" class="active">Home</a></li>
                        <li><a href="blog/index.html">Blog</a></li>
                        <li class="mobile-dropdown">
                            <a href="#" class="mobile-category-toggle">Shop <i class="fas fa-chevron-down"></i></a>
                            <div class="mobile-category-links">
                                <a href="#chargers" class="category-link" data-category="chargers">Chargers</a>
                                <a href="#cables" class="category-link" data-category="cables">Cables</a>
                                <a href="#earbuds" class="category-link" data-category="earbuds">Earbuds</a>
                                <a href="#powerbank" class="category-link" data-category="powerbank">Powerbanks</a>
                            </div>
                        </li>
                        <li><a href="affiliate/amazon.html">Amazon</a></li>
                        <li><a href="affiliate/noon.html">Noon</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                `;
                
                mobileNav.innerHTML = navContent;
                document.body.appendChild(mobileNav);
                
                // Add event listeners to mobile category links
                mobileNav.querySelectorAll('.category-link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const category = this.getAttribute('data-category');
                        
                        // Update active button
                        categoryButtons.forEach(btn => btn.classList.remove('active'));
                        document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
                        
                        // Filter products
                        filterProductsByCategory(category);
                        renderProducts();
                        
                        // Close mobile menu
                        mobileNav.classList.remove('active');
                    });
                });
                
                // Mobile dropdown toggle
                const mobileCategoryToggle = mobileNav.querySelector('.mobile-category-toggle');
                if (mobileCategoryToggle) {
                    mobileCategoryToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        const categoryLinks = this.nextElementSibling;
                        categoryLinks.style.display = categoryLinks.style.display === 'block' ? 'none' : 'block';
                        this.querySelector('i').classList.toggle('fa-chevron-down');
                        this.querySelector('i').classList.toggle('fa-chevron-up');
                    });
                }
            }
            
            // Toggle mobile nav
            mobileNav.classList.toggle('active');
            
            // Change menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    function filterProductsByCategory(category) {
        currentCategory = category;
        
        if (category === 'all') {
            currentProducts = [...allProducts];
        } else {
            currentProducts = allProducts.filter(product => product.category === category);
        }
    }
    
    function renderProducts() {
        if (!productsContainer) return;
        
        // Get products to display
        const productsToDisplay = currentProducts.slice(0, productsToShow);
        
        // Clear container
        productsContainer.innerHTML = '';
        
        // Check if there are products
        if (productsToDisplay.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <h3>No products found in this category</h3>
                    <p>Please check back later or browse other categories.</p>
                </div>
            `;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }
        
        // Render products
        productsToDisplay.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
        
        // Show/hide load more button
        if (loadMoreBtn) {
            if (productsToShow >= currentProducts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
        
        // Insert ads after every 2 rows (assuming 4 products per row)
        insertAds();
    }
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        
        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const whatsappMessage = `Hi, I'm interested in ${product.name} (PKR ${product.price})`;
        const whatsappLink = `https://wa.me/971501234567?text=${encodeURIComponent(whatsappMessage)}`;
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${discount > 0 ? `<span class="product-badge">${discount}% OFF</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description.substring(0, 70)}...</p>
                <div class="product-price">
                    PKR ${product.price}
                    ${product.originalPrice ? `<span class="product-original-price">PKR ${product.originalPrice}</span>` : ''}
                </div>
                <a href="product.html?id=${product.id}" class="btn btn-view">View Details</a>
            </div>
        `;
        
        return card;
    }
    
    function insertAds() {
        // This is where you would insert AdSense ads after every 2 rows
        // For now, we'll simulate it with placeholders
        const productCards = productsContainer.querySelectorAll('.product-card');
        
        // Clear any existing ads (except the first one which is hardcoded in HTML)
        const existingAds = productsContainer.querySelectorAll('.ad-inserted');
        existingAds.forEach(ad => ad.remove());
        
        // Insert ads after every 8 products (2 rows of 4)
        for (let i = 2; i < productCards.length; i += 2) {
            const adElement = document.createElement('div');
            adElement.className = 'ad-section ad-inserted';
            adElement.innerHTML = `
                <div class="ad-placeholder">
                    <p>Ad Space (728x90)</p>
                    <small>AdSense/Ad Network Advertisement</small>
                </div>
            `;
            
            // Insert after the 8th product
            if (productCards[i - 1]) {
                productCards[i - 1].after(adElement);
            }
        }
    }
    
    function loadAds() {
        // This function would load actual AdSense/Ad network ads
        // For now, we'll just log to console
        console.log('Loading ads...');
        
        // Simulate ad loading
        const adPlaceholders = document.querySelectorAll('.ad-placeholder');
        adPlaceholders.forEach((placeholder, index) => {
            // In a real implementation, you would insert the ad code here
            // For demonstration, we'll just change the text after a delay
            setTimeout(() => {
                placeholder.innerHTML = `
                    <p>Advertisement</p>
                    <small>Ad loaded successfully</small>
                `;
            }, 500 + (index * 300));
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});