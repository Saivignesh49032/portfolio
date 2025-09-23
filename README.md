# Portfolio Website with Backend

A modern, responsive portfolio website with a Node.js backend for persistent data management.

## Features

- 🎨 **Modern Design**: Clean, responsive design with dark/light mode toggle
- 🚀 **Backend API**: Node.js/Express server for persistent data storage
- 📱 **Admin Panel**: Easy-to-use admin interface for managing content
- ⚡ **Real-time Updates**: Changes in admin panel reflect immediately on portfolio
- 🎯 **Featured Projects**: Special layout for highlighting best projects
- 📊 **Skills Management**: Add, edit, and delete skills with progress bars
- 💼 **Project Showcase**: Comprehensive project management with categories
- 📝 **Personal Info**: Manage personal information and contact details

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with CSS Grid and Flexbox
- Font Awesome icons
- Smooth animations and transitions

### Backend
- Node.js with Express.js
- RESTful API endpoints
- JSON file-based data storage
- CORS enabled for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin.html (PIN: 260104)

## API Endpoints

### Portfolio Data
- `GET /api/portfolio` - Get all portfolio data
- `GET /api/skills` - Get all skills
- `GET /api/projects` - Get all projects

### Skills Management
- `POST /api/skills` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Projects Management
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Personal Information
- `PUT /api/personal` - Update personal information

## Admin Panel Usage

1. **Access Admin Panel**
   - Go to http://localhost:3000/admin.html
   - Enter PIN: `260104`

2. **Manage Skills**
   - Add new skills with name, description, percentage, icon, and category
   - Edit existing skills
   - Delete skills you no longer need

3. **Manage Projects**
   - Add projects with title, description, technologies, GitHub/Demo links
   - Mark projects as "Featured" for special display
   - Organize by categories (Machine Learning, Web Development, etc.)

4. **Update Personal Info**
   - Modify your name, title, description, contact information
   - Update social media links

## Project Structure

```
portfolio/
├── server.js              # Backend server
├── package.json           # Dependencies
├── index.html             # Main portfolio page
├── admin.html             # Admin panel
├── script.js              # Frontend JavaScript
├── admin.js               # Admin panel JavaScript
├── styles.css             # Main stylesheet
├── portfolio-data.js      # Default data (fallback)
├── data/
│   └── portfolio.json     # Persistent data storage
└── README.md              # This file
```

## Data Storage

The application uses a JSON file (`data/portfolio.json`) for persistent storage. This file is automatically created with default data if it doesn't exist.

## Customization

### Adding New Skill Categories
Edit the admin panel HTML to add new categories in the skill category dropdown.

### Modifying Project Categories
Update the project category options in the admin panel.

### Styling Changes
Modify `styles.css` to customize the appearance. The design uses CSS custom properties for easy theming.

## Deployment

### Local Development
The application runs on `http://localhost:3000` by default.

### Production Deployment
1. Set the `PORT` environment variable for production
2. Ensure the `data` directory is writable
3. Consider using a proper database for production use

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in server.js or set PORT environment variable
   - Kill existing processes using the port

2. **Data not saving**
   - Check file permissions for the `data` directory
   - Ensure the server has write access

3. **Admin panel not loading**
   - Verify the backend server is running
   - Check browser console for errors

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own portfolio.

---

**Created by Sai Vignesh S P**  
*AI/ML Engineer & Software Developer*