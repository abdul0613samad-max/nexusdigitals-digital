// Affiliate products functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Affiliate module loaded');
    
    // Track affiliate link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href*="amazon"]') || e.target.closest('a[href*="noon"]');
        
        if (link && (link.href.includes('amazon.com') || link.href.includes('noon.com'))) {
            // In a real implementation, you would track this click
            // For example: send to Google Analytics or your tracking system
            console.log('Affiliate link clicked:', link.href);
            
            // You could add tracking parameters here
            // link.href = addTrackingParams(link.href);
        }
    });
    
    // Function to add tracking parameters to affiliate links
    function addTrackingParams(url) {
        // This is where you would add your affiliate tracking parameters
        // For example: ?tag=yourtag-20 for Amazon
        const trackingParams = '?tag=nexusdigitals-20';
        
        if (url.includes('amazon.com') && !url.includes('tag=')) {
            return url + (url.includes('?') ? '&' : '?') + 'tag=nexusdigitals-20';
        }
        
        if (url.includes('noon.com')) {
            // Add Noon tracking parameters if needed
            return url;
        }
        
        return url;
    }
    
    // Load affiliate products based on page
    function loadAffiliateProducts() {
        const page = window.location.pathname;
        
        if (page.includes('amazon.html')) {
            // Already handled in amazon.html
        } else if (page.includes('noon.html')) {
            // Already handled in noon.html
        }
    }
    
    // Initialize
    loadAffiliateProducts();
});