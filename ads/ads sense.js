/**
 * Google AdSense Implementation
 * Place this file in your ads/ directory
 * Replace 'ca-pub-4065644595354253' with your actual AdSense publisher ID
 */

// AdSense Configuration
const adSenseConfig = {
    publisherId: 'ca-pub-4065644595354253', // Replace with your AdSense Publisher ID
    enableAutoAds: true,
    adUnits: {
        // Define your ad units
        homeLeaderboard: {
            adSlot: '1234567890', // Replace with your ad slot ID
            adFormat: 'auto',
            adWidth: 728,
            adHeight: 90,
            containerId: 'adSection1'
        },
        productDetail: {
            adSlot: '1234567891',
            adFormat: 'auto',
            adWidth: 300,
            adHeight: 250,
            containerId: 'adMonetagSection'
        },
        blogSidebar: {
            adSlot: '1234567892',
            adFormat: 'vertical',
            adWidth: 300,
            adHeight: 600,
            containerId: 'adSidebarSection'
        },
        inArticle: {
            adSlot: '1234567893',
            adFormat: 'in-article',
            adWidth: 300,
            adHeight: 250,
            containerId: 'adInArticleSection'
        }
    }
};

// Initialize AdSense
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Google AdSense...');
    
    // Check if AdSense script is loaded
    if (typeof adsbygoogle !== 'undefined') {
        initializeAdSense();
    } else {
        // If not loaded yet, wait for it
        const checkAdSense = setInterval(function() {
            if (typeof adsbygoogle !== 'undefined') {
                clearInterval(checkAdSense);
                initializeAdSense();
            }
        }, 500);
        
        // Timeout after 10 seconds
        setTimeout(function() {
            clearInterval(checkAdSense);
            if (typeof adsbygoogle === 'undefined') {
                console.error('AdSense script failed to load');
                showAdPlaceholders();
            }
        }, 10000);
    }
    
    // Also initialize when window loads
    window.addEventListener('load', function() {
        setTimeout(initializeAdSense, 1000);
    });
});

// Main initialization function
function initializeAdSense() {
    try {
        // Enable auto ads if configured
        if (adSenseConfig.enableAutoAds) {
            (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: adSenseConfig.publisherId,
                enable_page_level_ads: true
            });
            console.log('AdSense auto ads enabled');
        }
        
        // Initialize specific ad units based on page
        initializePageSpecificAds();
        
        // Track ad performance
        setupAdTracking();
        
        console.log('AdSense initialization complete');
    } catch (error) {
        console.error('Error initializing AdSense:', error);
        showAdPlaceholders();
    }
}

// Initialize ads based on current page
function initializePageSpecificAds() {
    const currentPage = window.location.pathname;
    
    // Homepage ads
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
        initializeHomepageAds();
    }
    
    // Product detail page ads
    if (currentPage.includes('product.html')) {
        initializeProductDetailAds();
    }
    
    // Blog page ads
    if (currentPage.includes('blog/')) {
        initializeBlogAds();
    }
    
    // Affiliate page ads
    if (currentPage.includes('affiliate/')) {
        initializeAffiliatePageAds();
    }
}

// Homepage specific ads
function initializeHomepageAds() {
    console.log('Initializing homepage ads');
    
    // Leaderboard ad after 2 rows of products
    setTimeout(function() {
        const leaderboardContainer = document.getElementById('adSection1');
        if (leaderboardContainer) {
            insertAdSenseAd(leaderboardContainer, {
                adSlot: adSenseConfig.adUnits.homeLeaderboard.adSlot,
                adFormat: adSenseConfig.adUnits.homeLeaderboard.adFormat,
                adWidth: adSenseConfig.adUnits.homeLeaderboard.adWidth,
                adHeight: adSenseConfig.adUnits.homeLeaderboard.adHeight
            });
        }
    }, 1500);
    
    // Insert additional ads after every 8 products
    insertAdsBetweenProducts();
}

// Product detail page ads
function initializeProductDetailAds() {
    console.log('Initializing product detail page ads');
    
    // Monetag section ad
    setTimeout(function() {
        const monetagContainer = document.querySelector('.ad-monetag');
        if (monetagContainer) {
            insertAdSenseAd(monetagContainer, {
                adSlot: adSenseConfig.adUnits.productDetail.adSlot,
                adFormat: adSenseConfig.adUnits.productDetail.adFormat,
                adWidth: adSenseConfig.adUnits.productDetail.adWidth,
                adHeight: adSenseConfig.adUnits.productDetail.adHeight
            });
        }
    }, 2000);
}

// Blog page ads
function initializeBlogAds() {
    console.log('Initializing blog page ads');
    
    // Leaderboard ad at top
    setTimeout(function() {
        const leaderboardContainer = document.querySelector('.ad-home');
        if (leaderboardContainer) {
            insertAdSenseAd(leaderboardContainer, {
                adSlot: adSenseConfig.adUnits.homeLeaderboard.adSlot,
                adFormat: adSenseConfig.adUnits.homeLeaderboard.adFormat,
                adWidth: adSenseConfig.adUnits.homeLeaderboard.adWidth,
                adHeight: adSenseConfig.adUnits.homeLeaderboard.adHeight
            });
        }
    }, 1000);
    
    // In-article ads
    setTimeout(function() {
        insertInArticleAds();
    }, 2500);
    
    // Sidebar ad (if exists)
    setTimeout(function() {
        const sidebarContainer = document.getElementById('adSidebarSection');
        if (sidebarContainer) {
            insertAdSenseAd(sidebarContainer, {
                adSlot: adSenseConfig.adUnits.blogSidebar.adSlot,
                adFormat: adSenseConfig.adUnits.blogSidebar.adFormat,
                adWidth: adSenseConfig.adUnits.blogSidebar.adWidth,
                adHeight: adSenseConfig.adUnits.blogSidebar.adHeight
            });
        }
    }, 3000);
}

// Affiliate page ads
function initializeAffiliatePageAds() {
    console.log('Initializing affiliate page ads');
    
    // Leaderboard ad
    setTimeout(function() {
        const leaderboardContainer = document.querySelector('.ad-home');
        if (leaderboardContainer) {
            insertAdSenseAd(leaderboardContainer, {
                adSlot: adSenseConfig.adUnits.homeLeaderboard.adSlot,
                adFormat: adSenseConfig.adUnits.homeLeaderboard.adFormat,
                adWidth: adSenseConfig.adUnits.homeLeaderboard.adWidth,
                adHeight: adSenseConfig.adUnits.homeLeaderboard.adHeight
            });
        }
    }, 1000);
    
    // Square ad in monetag section
    setTimeout(function() {
        const monetagContainer = document.querySelector('.ad-monetag');
        if (monetagContainer) {
            insertAdSenseAd(monetagContainer, {
                adSlot: adSenseConfig.adUnits.productDetail.adSlot,
                adFormat: adSenseConfig.adUnits.productDetail.adFormat,
                adWidth: adSenseConfig.adUnits.productDetail.adWidth,
                adHeight: adSenseConfig.adUnits.productDetail.adHeight
            });
        }
    }, 2000);
}

// Insert AdSense ad into container
function insertAdSenseAd(container, adConfig) {
    if (!container || !adConfig) return;
    
    // Clear placeholder
    container.innerHTML = '';
    
    // Create ad element
    const adElement = document.createElement('ins');
    adElement.className = 'adsbygoogle';
    adElement.style.display = 'block';
    adElement.setAttribute('data-ad-client', adSenseConfig.publisherId);
    adElement.setAttribute('data-ad-slot', adConfig.adSlot);
    adElement.setAttribute('data-ad-format', adConfig.adFormat);
    adElement.setAttribute('data-full-width-responsive', 'true');
    
    if (adConfig.adWidth && adConfig.adHeight) {
        adElement.style.width = adConfig.adWidth + 'px';
        adElement.style.height = adConfig.adHeight + 'px';
        adElement.setAttribute('data-ad-width', adConfig.adWidth);
        adElement.setAttribute('data-ad-height', adConfig.adHeight);
    }
    
    // Add to container
    container.appendChild(adElement);
    
    // Push to AdSense
    try {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense ad inserted:', adConfig.adSlot);
    } catch (error) {
        console.error('Error pushing AdSense ad:', error);
        showAdPlaceholder(container, 'AdSense ad failed to load');
    }
}

// Insert ads between products on homepage
function insertAdsBetweenProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;
    
    const productCards = productsContainer.querySelectorAll('.product-card');
    
    // Insert ads after every 8 products (2 rows of 4)
    for (let i = 8; i < productCards.length; i += 8) {
        if (productCards[i - 1]) {
            const adContainer = document.createElement('div');
            adContainer.className = 'ad-section ad-inserted';
            adContainer.style.margin = '40px 0';
            
            productCards[i - 1].after(adContainer);
            
            // Insert ad after a delay
            setTimeout(function() {
                insertAdSenseAd(adContainer, {
                    adSlot: adSenseConfig.adUnits.homeLeaderboard.adSlot,
                    adFormat: adSenseConfig.adUnits.homeLeaderboard.adFormat,
                    adWidth: adSenseConfig.adUnits.homeLeaderboard.adWidth,
                    adHeight: adSenseConfig.adUnits.homeLeaderboard.adHeight
                });
            }, 1000 + (i * 100));
        }
    }
}

// Insert ads within blog articles
function insertInArticleAds() {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;
    
    const paragraphs = articleContent.querySelectorAll('p');
    
    // Insert ads after 3rd and 6th paragraphs
    const insertPoints = [3, 6];
    
    insertPoints.forEach((point, index) => {
        if (paragraphs[point]) {
            const adContainer = document.createElement('div');
            adContainer.className = 'ad-section ad-in-article';
            adContainer.style.margin = '30px 0';
            adContainer.style.textAlign = 'center';
            
            paragraphs[point].after(adContainer);
            
            setTimeout(function() {
                insertAdSenseAd(adContainer, {
                    adSlot: adSenseConfig.adUnits.inArticle.adSlot,
                    adFormat: adSenseConfig.adUnits.inArticle.adFormat,
                    adWidth: adSenseConfig.adUnits.inArticle.adWidth,
                    adHeight: adSenseConfig.adUnits.inArticle.adHeight
                });
            }, 1500 + (index * 1000));
        }
    });
}

// Show placeholder if ads fail to load
function showAdPlaceholders() {
    console.log('Showing ad placeholders');
    
    const adContainers = document.querySelectorAll('.ad-section, .ad-placeholder-container');
    
    adContainers.forEach(container => {
        if (!container.querySelector('ins')) {
            showAdPlaceholder(container, 'Advertisement');
        }
    });
}

function showAdPlaceholder(container, text) {
    if (!container) return;
    
    container.innerHTML = `
        <div class="ad-placeholder">
            <div class="placeholder-content">
                <p>${text}</p>
                <small>Ad will display here</small>
            </div>
        </div>
    `;
    
    // Add CSS for placeholder
    if (!document.querySelector('#adPlaceholderStyle')) {
        const style = document.createElement('style');
        style.id = 'adPlaceholderStyle';
        style.textContent = `
            .ad-placeholder {
                background-color: #f8f9fa;
                border: 2px dashed #dee2e6;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                min-height: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ad-placeholder .placeholder-content p {
                margin: 0;
                font-weight: 500;
                color: #6c757d;
            }
            
            .ad-placeholder .placeholder-content small {
                color: #adb5bd;
                font-size: 12px;
            }
            
            .ad-in-article .ad-placeholder {
                min-height: 250px;
                max-width: 300px;
                margin: 0 auto;
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup ad tracking and analytics
function setupAdTracking() {
    // Track ad impressions
    document.addEventListener('adsbygoogle', function(event) {
        console.log('AdSense event:', event);
        
        if (event.detail && event.detail.slot) {
            // Log ad impression
            logAdImpression(event.detail.slot.getSlotElementId());
            
            // Track in analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'ad_impression', {
                    'ad_network': 'adsense',
                    'ad_slot': event.detail.slot.getSlotElementId()
                });
            }
        }
    });
    
    // Track ad clicks
    document.addEventListener('click', function(event) {
        const adElement = event.target.closest('ins.adsbygoogle');
        if (adElement) {
            console.log('AdSense ad clicked');
            
            // Track in analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'ad_click', {
                    'ad_network': 'adsense',
                    'ad_format': adElement.getAttribute('data-ad-format')
                });
            }
        }
    });
}

function logAdImpression(adSlot) {
    // You can implement your own impression tracking here
    // For example, send to your analytics server
    console.log('Ad impression logged:', adSlot);
}

// Refresh ads on certain events
function refreshAds() {
    if (typeof adsbygoogle !== 'undefined') {
        try {
            adsbygoogle = window.adsbygoogle || [];
            adsbygoogle.push({});
            console.log('AdSense ads refreshed');
        } catch (error) {
            console.error('Error refreshing ads:', error);
        }
    }
}

// Public API for manual control
window.AdSenseManager = {
    refresh: refreshAds,
    initialize: initializeAdSense,
    insertAd: insertAdSenseAd,
    config: adSenseConfig
};

// Auto-refresh ads on category filter changes
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn, .filter-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Refresh ads after content changes
            setTimeout(refreshAds, 1000);
        });
    });
    
    // Refresh ads on page transitions (for SPA-like behavior)
    window.addEventListener('popstate', function() {
        setTimeout(refreshAds, 500);
    });
});

// Error handling for ad blockers
window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('adsbygoogle')) {
        console.warn('AdSense might be blocked by ad blocker');
        showAdPlaceholders();
    }
});

// Check if ads are being blocked
setTimeout(function() {
    const adElements = document.querySelectorAll('ins.adsbygoogle');
    let adsLoaded = false;
    
    adElements.forEach(ad => {
        if (ad.offsetHeight > 0 || ad.offsetWidth > 0) {
            adsLoaded = true;
        }
    });
    
    if (!adsLoaded && adElements.length > 0) {
        console.warn('AdSense ads may be blocked');
        showAdPlaceholders();
    }
}, 5000);