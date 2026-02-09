/**
 * Monetag Ad Network Implementation
 * Place this file in your ads/ directory
 * Configure with your Monetag settings
 */

// Monetag Configuration
const monetagConfig = {
    // Basic configuration
    enabled: true,
    siteId: 'YOUR_SITE_ID', // Replace with your Monetag Site ID
    adUnits: {
        // Define your ad units
        leaderboard: {
            zoneId: '123456', // Replace with your zone ID
            format: '728x90',
            containerClass: 'ad-home'
        },
        rectangle: {
            zoneId: '123457',
            format: '300x250',
            containerClass: 'ad-monetag'
        },
        mobileLeaderboard: {
            zoneId: '123458',
            format: '320x50',
            containerClass: 'ad-mobile'
        },
        inFeed: {
            zoneId: '123459',
            format: 'responsive',
        },
        stickyFooter: {
            zoneId: '123460',
            format: '320x50',
            containerClass: 'ad-sticky-footer',
            sticky: true
        }
    },
    // Targeting settings
    targeting: {
        pageType: 'default',
        category: 'technology',
        keywords: ['mobile accessories', 'tech gadgets', 'electronics'],
        // User targeting (if available)
        userLocation: '',
        userDevice: ''
    },
    // Display settings
    display: {
        maxAdsPerPage: 5,
        minDistanceBetweenAds: 300, // pixels
        loadTimeout: 5000, // ms
        refreshInterval: 30000 // ms
    }
};

// Initialize Monetag
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Monetag Ad Network...');
    
    // Check if Monetag is already loaded
    if (typeof monetag !== 'undefined') {
        initializeMonetag();
    } else {
        // Wait for Monetag to load
        const checkMonetag = setInterval(function() {
            if (typeof monetag !== 'undefined') {
                clearInterval(checkMonetag);
                initializeMonetag();
            }
        }, 500);
        
        // Timeout after 10 seconds
        setTimeout(function() {
            clearInterval(checkMonetag);
            if (typeof monetag === 'undefined') {
                console.error('Monetag script failed to load');
                showMonetagPlaceholders();
            }
        }, 10000);
    }
    
    // Initialize on window load as well
    window.addEventListener('load', function() {
        setTimeout(initializeMonetag, 1500);
    });
});

// Main initialization function
function initializeMonetag() {
    if (!monetagConfig.enabled) {
        console.log('Monetag is disabled in configuration');
        return;
    }
    
    try {
        // Configure Monetag
        monetag('configure', {
            siteId: monetagConfig.siteId,
            // Add any additional configuration options
        });
        
        // Set targeting parameters
        setTargetingParameters();
        
        // Initialize page-specific ads
        initializePageMonetagAds();
        
        // Setup refresh intervals
        setupAdRefresh();
        
        // Track ad performance
        setupMonetagTracking();
        
        console.log('Monetag initialization complete');
    } catch (error) {
        console.error('Error initializing Monetag:', error);
        showMonetagPlaceholders();
    }
}

// Set targeting parameters
function setTargetingParameters() {
    if (typeof monetag !== 'undefined') {
        // Page type targeting
        const currentPage = window.location.pathname;
        let pageType = 'default';
        
        if (currentPage.includes('product.html')) {
            pageType = 'product';
        } else if (currentPage.includes('blog/')) {
            pageType = 'blog';
        } else if (currentPage.includes('affiliate/')) {
            pageType = 'affiliate';
        } else if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
            pageType = 'home';
        }
        
        monetagConfig.targeting.pageType = pageType;
        
        // Set targeting
        monetag('targeting', {
            page_type: pageType,
            category: monetagConfig.targeting.category,
            keywords: monetagConfig.targeting.keywords.join(',')
        });
    }
}

// Initialize ads based on current page
function initializePageMonetagAds() {
    const currentPage = window.location.pathname;
    
    // Homepage ads
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
        initializeHomepageMonetagAds();
    }
    
    // Product detail page ads
    if (currentPage.includes('product.html')) {
        initializeProductDetailMonetagAds();
    }
    
    // Blog page ads
    if (currentPage.includes('blog/')) {
        initializeBlogMonetagAds();
    }
    
    // Affiliate page ads
    if (currentPage.includes('affiliate/')) {
        initializeAffiliateMonetagAds();
    }
    
    // Sticky footer ad for all pages
    initializeStickyFooterAd();
}

// Homepage Monetag ads
function initializeHomepageMonetagAds() {
    console.log('Initializing homepage Monetag ads');
    
    // Leaderboard ad
    setTimeout(function() {
        const leaderboardContainers = document.querySelectorAll('.ad-home');
        leaderboardContainers.forEach((container, index) => {
            if (index === 0) { // Only first instance
                insertMonetagAd(container, monetagConfig.adUnits.leaderboard);
            }
        });
    }, 1000);
    
    // In-feed ads between products
    setTimeout(function() {
        insertInFeedAds();
    }, 2000);
}

// Product detail page Monetag ads
function initializeProductDetailMonetagAds() {
    console.log('Initializing product detail Monetag ads');
    
    // Rectangle ad in monetag section
    setTimeout(function() {
        const monetagContainers = document.querySelectorAll('.ad-monetag');
        monetagContainers.forEach(container => {
            insertMonetagAd(container, monetagConfig.adUnits.rectangle);
        });
    }, 1500);
}

// Blog page Monetag ads
function initializeBlogMonetagAds() {
    console.log('Initializing blog page Monetag ads');
    
    // Leaderboard ad
    setTimeout(function() {
        const leaderboardContainers = document.querySelectorAll('.ad-home');
        leaderboardContainers.forEach(container => {
            insertMonetagAd(container, monetagConfig.adUnits.leaderboard);
        });
    }, 1000);
    
    // Rectangle ad
    setTimeout(function() {
        const rectangleContainers = document.querySelectorAll('.ad-monetag');
        rectangleContainers.forEach(container => {
            insertMonetagAd(container, monetagConfig.adUnits.rectangle);
        });
    }, 2000);
    
    // In-article ads
    setTimeout(function() {
        insertBlogInArticleAds();
    }, 3000);
}

// Affiliate page Monetag ads
function initializeAffiliateMonetagAds() {
    console.log('Initializing affiliate page Monetag ads');
    
    // Leaderboard ad
    setTimeout(function() {
        const leaderboardContainers = document.querySelectorAll('.ad-home');
        leaderboardContainers.forEach(container => {
            insertMonetagAd(container, monetagConfig.adUnits.leaderboard);
        });
    }, 1000);
    
    // Rectangle ad
    setTimeout(function() {
        const rectangleContainers = document.querySelectorAll('.ad-monetag');
        rectangleContainers.forEach(container => {
            insertMonetagAd(container, monetagConfig.adUnits.rectangle);
        });
    }, 2000);
}

// Sticky footer ad
function initializeStickyFooterAd() {
    if (!monetagConfig.adUnits.stickyFooter) return;
    
    // Only show on mobile
    if (window.innerWidth <= 768) {
        setTimeout(function() {
            createStickyFooterAd();
        }, 3000);
    }
}

// Create sticky footer ad container
function createStickyFooterAd() {
    // Check if already exists
    if (document.querySelector('.ad-sticky-footer')) return;
    
    const stickyContainer = document.createElement('div');
    stickyContainer.className = 'ad-sticky-footer';
    stickyContainer.style.position = 'fixed';
    stickyContainer.style.bottom = '0';
    stickyContainer.style.left = '0';
    stickyContainer.style.width = '100%';
    stickyContainer.style.zIndex = '9998';
    stickyContainer.style.backgroundColor = 'white';
    stickyContainer.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
    stickyContainer.style.textAlign = 'center';
    stickyContainer.style.padding = '10px';
    
    document.body.appendChild(stickyContainer);
    
    // Insert ad
    insertMonetagAd(stickyContainer, monetagConfig.adUnits.stickyFooter);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#666';
    
    closeButton.addEventListener('click', function() {
        stickyContainer.style.display = 'none';
        // Store preference in localStorage
        localStorage.setItem('hideStickyAd', 'true');
    });
    
    stickyContainer.appendChild(closeButton);
    
    // Check user preference
    if (localStorage.getItem('hideStickyAd') === 'true') {
        stickyContainer.style.display = 'none';
    }
}

// Insert Monetag ad into container
function insertMonetagAd(container, adUnit) {
    if (!container || !adUnit || !monetagConfig.enabled) return;
    
    // Clear placeholder
    container.innerHTML = '';
    
    // Create ad container with Monetag attributes
    container.setAttribute('data-monetag-zone', adUnit.zoneId);
    container.setAttribute('data-monetag-format', adUnit.format);
    container.setAttribute('data-monetag-responsive', 'true');
    
    // Set container dimensions
    if (adUnit.format === '728x90') {
        container.style.minHeight = '90px';
    } else if (adUnit.format === '300x250') {
        container.style.minHeight = '250px';
        container.style.maxWidth = '300px';
        container.style.margin = '0 auto';
    } else if (adUnit.format === '320x50') {
        container.style.minHeight = '50px';
    }
    
    // Call Monetag to display ad
    try {
        if (typeof monetag !== 'undefined') {
            monetag('display', container);
            console.log('Monetag ad inserted:', adUnit.zoneId);
            
            // Track impression
            logMonetagImpression(adUnit.zoneId);
        } else {
            throw new Error('Monetag not loaded');
        }
    } catch (error) {
        console.error('Error inserting Monetag ad:', error);
        showMonetagPlaceholder(container, 'Monetag advertisement');
    }
}

// Insert in-feed ads between products
function insertInFeedAds() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;
    
    const productCards = productsContainer.querySelectorAll('.product-card');
    let adCount = 0;
    const maxAds = 2; // Maximum in-feed ads
    
    // Insert ads after every 6 products
    for (let i = 6; i < productCards.length && adCount < maxAds; i += 6) {
        if (productCards[i - 1]) {
            const adContainer = document.createElement('div');
            adContainer.className = 'ad-section';
            adContainer.style.margin = '30px 0';
            adContainer.style.clear = 'both';
            
            productCards[i - 1].after(adContainer);
            
            // Insert ad after a delay
            setTimeout(function() {
                insertMonetagAd(adContainer, monetagConfig.adUnits.inFeed);
            }, 1000 + (adCount * 500));
            
            adCount++;
        }
    }
}

// Insert ads within blog articles
function insertBlogInArticleAds() {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;
    
    const headings = articleContent.querySelectorAll('h2, h3');
    let adCount = 0;
    const maxAds = 2;
    
    // Insert ads after every 2nd heading
    headings.forEach((heading, index) => {
        if ((index + 1) % 2 === 0 && adCount < maxAds) {
            const adContainer = document.createElement('div');
            adContainer.className = 'ad-section ad-in-article-monetag';
            adContainer.style.margin = '30px 0';
            adContainer.style.textAlign = 'center';
            
            heading.after(adContainer);
            
            setTimeout(function() {
                insertMonetagAd(adContainer, monetagConfig.adUnits.rectangle);
            }, 1500 + (adCount * 1000));
            
            adCount++;
        }
    });
}

// Show placeholder if Monetag fails
function showMonetagPlaceholders() {
    console.log('Showing Monetag placeholders');
    
    const monetagContainers = document.querySelectorAll('[data-monetag-zone], .ad-monetag, .ad-section');
    
    monetagContainers.forEach(container => {
        if (!container.querySelector('.monetag-loaded')) {
            showMonetagPlaceholder(container, 'Monetag Advertisement');
        }
    });
}

function showMonetagPlaceholder(container, text) {
    if (!container) return;
    
    container.innerHTML = `
        <div class="monetag-placeholder">
            <div class="placeholder-content">
                <p>${text}</p>
                <small>Advertisement by Monetag</small>
            </div>
        </div>
    `;
    
    // Add CSS for placeholder
    if (!document.querySelector('#monetagPlaceholderStyle')) {
        const style = document.createElement('style');
        style.id = 'monetagPlaceholderStyle';
        style.textContent = `
            .monetag-placeholder {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                min-height: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            
            .monetag-placeholder .placeholder-content p {
                margin: 0;
                font-weight: 500;
                font-size: 16px;
            }
            
            .monetag-placeholder .placeholder-content small {
                opacity: 0.8;
                font-size: 12px;
                display: block;
                margin-top: 5px;
            }
            
            .ad-monetag .monetag-placeholder {
                min-height: 250px;
                max-width: 300px;
                margin: 0 auto;
            }
            
            .ad-sticky-footer .monetag-placeholder {
                min-height: 50px;
                padding: 10px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup ad refresh intervals
function setupAdRefresh() {
    if (monetagConfig.display.refreshInterval > 0) {
        setInterval(function() {
            if (typeof monetag !== 'undefined') {
                monetag('refresh');
                console.log('Monetag ads refreshed');
            }
        }, monetagConfig.display.refreshInterval);
    }
}

// Setup Monetag tracking
function setupMonetagTracking() {
    // Listen for Monetag events
    document.addEventListener('monetag', function(event) {
        if (event.detail && event.detail.type) {
            console.log('Monetag event:', event.detail.type);
            
            switch (event.detail.type) {
                case 'adLoaded':
                    logMonetagImpression(event.detail.zoneId);
                    break;
                case 'adClicked':
                    logMonetagClick(event.detail.zoneId);
                    break;
                case 'adError':
                    console.error('Monetag ad error:', event.detail.error);
                    break;
            }
        }
    });
    
    // Track clicks on Monetag ads
    document.addEventListener('click', function(event) {
        const monetagAd = event.target.closest('[data-monetag-zone]');
        if (monetagAd) {
            console.log('Monetag ad clicked');
            
            // Track in analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'ad_click', {
                    'ad_network': 'monetag',
                    'ad_zone': monetagAd.getAttribute('data-monetag-zone')
                });
            }
        }
    });
}

function logMonetagImpression(zoneId) {
    // Implement your impression tracking
    console.log('Monetag impression logged:', zoneId);
    
    // Example: Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', {
            'ad_network': 'monetag',
            'ad_zone': zoneId
        });
    }
}

function logMonetagClick(zoneId) {
    console.log('Monetag click logged:', zoneId);
}

// Public API for manual control
window.MonetagManager = {
    refresh: function() {
        if (typeof monetag !== 'undefined') {
            monetag('refresh');
        }
    },
    initialize: initializeMonetag,
    insertAd: insertMonetagAd,
    config: monetagConfig
};

// Handle page transitions and content changes
document.addEventListener('DOMContentLoaded', function() {
    // Refresh ads on category filter changes
    const categoryButtons = document.querySelectorAll('.category-btn, .filter-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(function() {
                if (typeof monetag !== 'undefined') {
                    monetag('refresh');
                }
            }, 1000);
        });
    });
    
    // Handle dynamic content loading
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Check for new ad containers
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        const adContainers = node.querySelectorAll ? 
                            node.querySelectorAll('[data-monetag-zone], .ad-section') : [];
                        adContainers.forEach(container => {
                            if (container.getAttribute('data-monetag-zone')) {
                                insertMonetagAd(container, {
                                    zoneId: container.getAttribute('data-monetag-zone'),
                                    format: container.getAttribute('data-monetag-format') || 'responsive'
                                });
                            }
                        });
                    }
                });
            }
        });
    });
    
    // Start observing the body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Handle responsive ad changes
window.addEventListener('resize', function() {
    // Refresh ads on resize (for responsive ads)
    setTimeout(function() {
        if (typeof monetag !== 'undefined') {
            monetag('refresh');
        }
    }, 300);
});

// Check for ad blockers
setTimeout(function() {
    const monetagContainers = document.querySelectorAll('[data-monetag-zone]');
    let monetagLoaded = false;
    
    monetagContainers.forEach(container => {
        if (container.offsetHeight > 10 || container.querySelector('iframe')) {
            monetagLoaded = true;
        }
    });
    
    if (!monetagLoaded && monetagContainers.length > 0) {
        console.warn('Monetag ads may be blocked by ad blocker');
        showMonetagPlaceholders();
    }
}, 5000);

// GDPR/Consent Management
function setMonetagConsent(consent) {
    if (typeof monetag !== 'undefined') {
        if (consent) {
            monetag('consent', 'grant');
            console.log('Monetag consent granted');
        } else {
            monetag('consent', 'revoke');
            console.log('Monetag consent revoked');
        }
    }
}

// Initialize consent based on user preference
function initializeConsent() {
    const userConsent = localStorage.getItem('adConsent');
    if (userConsent !== null) {
        setMonetagConsent(userConsent === 'true');
    } else {
        // Show consent dialog if not set
        showConsentDialog();
    }
}

function showConsentDialog() {
    // Implement your consent dialog here
    // This is a basic example
    const consentDialog = document.createElement('div');
    consentDialog.className = 'consent-dialog';
    consentDialog.innerHTML = `
        <div class="consent-content">
            <h3>Advertising Consent</h3>
            <p>We use advertising to support our website. Please choose your preference:</p>
            <div class="consent-buttons">
                <button class="btn-consent-accept">Accept All</button>
                <button class="btn-consent-reject">Reject All</button>
            </div>
            <p><small>You can change your preference anytime in settings.</small></p>
        </div>
    `;
    
    document.body.appendChild(consentDialog);
    
    // Add event listeners
    consentDialog.querySelector('.btn-consent-accept').addEventListener('click', function() {
        setMonetagConsent(true);
        localStorage.setItem('adConsent', 'true');
        consentDialog.remove();
    });
    
    consentDialog.querySelector('.btn-consent-reject').addEventListener('click', function() {
        setMonetagConsent(false);
        localStorage.setItem('adConsent', 'false');
        consentDialog.remove();
        showMonetagPlaceholders();
    });
    
    // Add CSS for consent dialog
    const style = document.createElement('style');
    style.textContent = `
        .consent-dialog {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            padding: 20px;
            z-index: 10000;
            max-width: 400px;
        }
        
        .consent-content h3 {
            margin-top: 0;
            color: #333;
        }
        
        .consent-buttons {
            display: flex;
            gap: 10px;
            margin: 20px 0;
        }
        
        .btn-consent-accept, .btn-consent-reject {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
        }
        
        .btn-consent-accept {
            background: #667eea;
            color: white;
        }
        
        .btn-consent-reject {
            background: #e2e8f0;
            color: #4a5568;
        }
    `;
    document.head.appendChild(style);
}

// Initialize consent on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeConsent, 2000);
});