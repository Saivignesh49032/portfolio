// ===== CONFIGURATION FILE =====
// Replace these with your actual API keys and configuration

const CONFIG = {
    // Google Analytics
    GA_MEASUREMENT_ID: 'GA_MEASUREMENT_ID', // Replace with your Google Analytics ID
    
    // Calendly Integration
    CALENDLY_USERNAME: 'your-username', // Replace with your Calendly username
    CALENDLY_EVENT_TYPE: '30min', // Replace with your event type
    
    // Weather API (Weatherstack)
    WEATHER_API_KEY: 'a449d7a4dcb886f4a7700a13f0fa318b', // Your Weatherstack API key
    WEATHER_CITY: 'Chennai', // Your city
    
    // News API
    NEWS_API_KEY: 'your-news-api-key', // Get free key from newsapi.org
    
    // GitHub API (No key needed for public data)
    GITHUB_USERNAME: 'Saivignesh49032', // Your GitHub username
    
    // Search Configuration
    SEARCH_MIN_LENGTH: 2,
    SEARCH_DELAY: 300, // milliseconds
    
    // Analytics Configuration
    SCROLL_TRACKING_INTERVAL: 25, // Track every 25% scroll
};

// Make config available globally
window.CONFIG = CONFIG;
