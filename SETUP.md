# 🚀 Portfolio Setup Guide

## 📋 **API Configuration Required**

To enable all features, you need to configure the following APIs in `config.js`:

### **1. Google Analytics** 📊
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your portfolio
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Update `GA_MEASUREMENT_ID` in `config.js`

### **2. Calendly Integration** 📅
1. Go to [Calendly](https://calendly.com/)
2. Create your account and set up your availability
3. Get your username and event type
4. Update `CALENDLY_USERNAME` and `CALENDLY_EVENT_TYPE` in `config.js`

### **3. Weather API** 🌤️
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Update `WEATHER_API_KEY` in `config.js`
5. Change `WEATHER_CITY` to your preferred city

### **4. News API** 📰
1. Go to [NewsAPI](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key
4. Update `NEWS_API_KEY` in `config.js`

### **5. GitHub API** 🐙
- No API key needed for public data
- Just update `GITHUB_USERNAME` in `config.js` to your GitHub username

## 🎯 **Features Included**

### **✅ Search Functionality**
- Real-time search through skills and projects
- Modal-based search interface
- Keyboard navigation support
- Click to scroll to sections

### **✅ Calendly Integration**
- "Book Meeting" button in hero section
- Popup modal with Calendly widget
- Responsive design
- Easy configuration

### **✅ Live Data Section**
- **Weather**: Current weather conditions
- **Tech News**: Latest technology news
- **GitHub Stats**: Your GitHub statistics
- Real-time data updates

### **✅ Google Analytics**
- Page view tracking
- Button click tracking
- Scroll depth tracking
- Custom event tracking

### **✅ Enhanced UI/UX**
- Search toggle in navigation
- Live Data section
- Responsive design
- Error handling for API failures

## 🔧 **Configuration Steps**

1. **Copy the template**:
   ```bash
   cp config.js config.local.js
   ```

2. **Update your API keys** in `config.local.js`

3. **Update the script reference** in `index.html`:
   ```html
   <script src="config.local.js"></script>
   ```

4. **Test each feature**:
   - Search functionality
   - Calendly booking
   - Live data loading
   - Analytics tracking

## 🚨 **Important Notes**

- **API Keys**: Never commit real API keys to version control
- **Rate Limits**: Free APIs have rate limits
- **CORS**: Some APIs may require CORS proxy for local development
- **Fallbacks**: All features have fallback UI for API failures

## 📱 **Mobile Support**

All features are fully responsive and work on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🎨 **Customization**

You can easily customize:
- Search categories
- Live data sources
- Analytics events
- UI styling
- API endpoints

## 🔍 **Troubleshooting**

### **Search not working?**
- Check if `data.js` is loaded
- Verify search input is focused
- Check browser console for errors

### **APIs not loading?**
- Verify API keys are correct
- Check network requests in browser dev tools
- Ensure APIs are accessible from your domain

### **Calendly not opening?**
- Verify Calendly username and event type
- Check if Calendly script is loaded
- Test Calendly URL directly

## 🚀 **Deployment**

1. **GitHub Pages**: All features work with static hosting
2. **Vercel**: Compatible with serverless deployment
3. **Netlify**: Works with static site generation
4. **Custom Domain**: Update any hardcoded URLs

## 📈 **Analytics Setup**

After configuring Google Analytics:
1. Go to your GA dashboard
2. Check Real-time reports
3. Verify events are being tracked
4. Set up custom goals and conversions

## 🎯 **Next Steps**

1. Configure all APIs
2. Test all features
3. Customize styling
4. Deploy to your hosting platform
5. Monitor analytics

---

**Need help?** Check the browser console for error messages and verify all API keys are correctly configured.
