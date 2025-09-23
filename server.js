const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Data file path
const dataFile = path.join(__dirname, 'data', 'portfolio.json');

// Default portfolio data
const defaultData = {
    personalInfo: {
        name: "Sai Vignesh S P",
        title: "Full Stack Developer & UI/UX Designer",
        bio: "Passionate developer creating beautiful, functional web experiences with modern technologies.",
        email: "saivignesh1857@gmail.com",
        phone: "+91 7899522804",
        location: "Chennai, India",
        resume: "resume.pdf"
    },
    
    skills: [
        { name: "JavaScript", percentage: 90, category: "Frontend", description: "Modern ES6+ JavaScript with async/await, modules, and advanced features" },
        { name: "React", percentage: 85, category: "Frontend", description: "React hooks, context API, state management, and component architecture" },
        { name: "Node.js", percentage: 80, category: "Backend", description: "Server-side JavaScript with Express, REST APIs, and middleware" },
        { name: "Python", percentage: 75, category: "Backend", description: "Python programming with Flask, Django, and data science libraries" },
        { name: "HTML/CSS", percentage: 95, category: "Frontend", description: "Semantic HTML5, CSS3, Flexbox, Grid, and responsive design" },
        { name: "MongoDB", percentage: 70, category: "Database", description: "NoSQL database design, queries, indexing, and aggregation" },
        { name: "Express.js", percentage: 75, category: "Backend", description: "Web application framework for Node.js with routing and middleware" },
        { name: "Git", percentage: 80, category: "Tools", description: "Version control, branching strategies, and collaborative development" }
    ],
    
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, payment integration, and admin dashboard.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            github: "https://github.com/yourusername/ecommerce",
            live: "https://your-ecommerce-demo.com",
            featured: true,
            category: "Full Stack"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
            technologies: ["Vue.js", "Firebase", "CSS3"],
            github: "https://github.com/yourusername/taskapp",
            live: "https://your-taskapp-demo.com",
            featured: true,
            category: "Frontend"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
            technologies: ["JavaScript", "API Integration", "Chart.js"],
            github: "https://github.com/yourusername/weather",
            live: "https://your-weather-demo.com",
            featured: false,
            category: "Frontend"
        },
        {
            id: 4,
            title: "Blog CMS",
            description: "A content management system for blogs with markdown support, SEO optimization, and comment system.",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
            technologies: ["Next.js", "Prisma", "PostgreSQL"],
            github: "https://github.com/yourusername/blog-cms",
            live: "https://your-blog-demo.com",
            featured: false,
            category: "Full Stack"
        }
    ],
    
    services: [
        {
            id: 1,
            title: "Web Development",
            icon: "fas fa-code",
            description: "Custom web applications built with modern technologies and best practices.",
            features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Cross-browser Compatibility"],
            price: "Starting at $500"
        },
        {
            id: 2,
            title: "UI/UX Design",
            icon: "fas fa-paint-brush",
            description: "Beautiful and intuitive user interfaces that enhance user experience.",
            features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
            price: "Starting at $300"
        },
        {
            id: 3,
            title: "Mobile App Development",
            icon: "fas fa-mobile-alt",
            description: "Native and cross-platform mobile applications for iOS and Android.",
            features: ["React Native", "Flutter", "Native Development", "App Store Optimization"],
            price: "Starting at $800"
        },
        {
            id: 4,
            title: "E-commerce Solutions",
            icon: "fas fa-shopping-cart",
            description: "Complete e-commerce platforms with payment integration and admin panels.",
            features: ["Payment Gateway Integration", "Inventory Management", "Order Tracking", "Analytics Dashboard"],
            price: "Starting at $1000"
        },
        {
            id: 5,
            title: "API Development",
            icon: "fas fa-server",
            description: "RESTful APIs and microservices for scalable backend solutions.",
            features: ["RESTful Design", "Authentication", "Rate Limiting", "Documentation"],
            price: "Starting at $400"
        },
        {
            id: 6,
            title: "Database Design",
            icon: "fas fa-database",
            description: "Efficient database design and optimization for better performance.",
            features: ["Schema Design", "Query Optimization", "Data Migration", "Backup Solutions"],
            price: "Starting at $350"
        },
        {
            id: 7,
            title: "Cloud Solutions",
            icon: "fas fa-cloud",
            description: "Cloud deployment and infrastructure management for scalable applications.",
            features: ["AWS/Azure/GCP", "Docker Containers", "CI/CD Pipeline", "Monitoring"],
            price: "Starting at $600"
        },
        {
            id: 8,
            title: "Technical Consulting",
            icon: "fas fa-lightbulb",
            description: "Expert advice on technology choices and architecture decisions.",
            features: ["Technology Assessment", "Code Review", "Performance Analysis", "Best Practices"],
            price: "Starting at $200/hour"
        }
    ],
    
    experience: [
        {
            company: "Tech Solutions Inc.",
            position: "Senior Full Stack Developer",
            duration: "2022 - Present",
            description: "Leading development of web applications and mentoring junior developers.",
            technologies: ["React", "Node.js", "AWS", "MongoDB"]
        },
        {
            company: "Digital Agency",
            position: "Frontend Developer",
            duration: "2020 - 2022",
            description: "Developed responsive websites and user interfaces for various clients.",
            technologies: ["Vue.js", "JavaScript", "CSS3", "Figma"]
        }
    ],
    
    education: [
        {
            degree: "Bachelor of Technology",
            field: "Computer Science",
            institution: "Anna University",
            year: "2016 - 2020",
            gpa: "8.5/10"
        }
    ]
};

// Load data from file or create with default data
function loadData() {
    try {
        if (fs.existsSync(dataFile)) {
            const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            console.log('Data loaded from file');
            return data;
        } else {
            console.log('No data file found, creating with default data');
            saveData(defaultData);
            return defaultData;
        }
    } catch (error) {
        console.error('Error loading data:', error);
        return defaultData;
    }
}

// Save data to file
function saveData(data) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        console.log('Data saved to file');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Reload data from file
function reloadData() {
    try {
        portfolioData = loadData();
        console.log('Data reloaded from file');
    } catch (error) {
        console.error('Error reloading data:', error);
    }
}

// Initialize data
let portfolioData = loadData();

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve CSS with proper headers
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

// Serve JS files with proper headers
app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/data.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'data.js'));
});

app.get('/web3-email.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'web3-email.js'));
});

// Serve image files
app.get('/profilepic.jpg', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, 'profilepic.jpg'));
});

app.get('/admin.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'admin.js'));
});

app.get('/admin-styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'admin-styles.css'));
});

// API Routes
app.get('/api/portfolio', (req, res) => {
    console.log('Portfolio API called');
    // Reload data to ensure fresh data
    reloadData();
    console.log('Services count in API response:', portfolioData.services ? portfolioData.services.length : 'No services array');
    console.log('Skills count in API response:', portfolioData.skills ? portfolioData.skills.length : 'No skills array');
    res.json(portfolioData);
});

// Test endpoint to check data loading
app.get('/api/test', (req, res) => {
    console.log('Test API called');
    reloadData();
    res.json({
        skillsCount: portfolioData.skills ? portfolioData.skills.length : 0,
        projectsCount: portfolioData.projects ? portfolioData.projects.length : 0,
        servicesCount: portfolioData.services ? portfolioData.services.length : 0,
        dataFile: dataFile,
        fileExists: fs.existsSync(dataFile)
    });
});

app.put('/api/portfolio', (req, res) => {
    try {
        portfolioData = req.body;
        saveData(portfolioData);
        res.json({ success: true, message: 'Portfolio data updated successfully' });
    } catch (error) {
        console.error('Error updating portfolio data:', error);
        res.status(500).json({ success: false, message: 'Error updating portfolio data' });
    }
});

// Skills CRUD
app.get('/api/skills', (req, res) => {
    res.json(portfolioData.skills || []);
});

app.post('/api/skills', (req, res) => {
    try {
        const newSkill = { ...req.body, id: Date.now() };
        portfolioData.skills.push(newSkill);
        saveData(portfolioData);
        res.json({ success: true, skill: newSkill });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding skill' });
    }
});

app.put('/api/skills/:id', (req, res) => {
    try {
        const skillId = parseInt(req.params.id);
        const skillIndex = portfolioData.skills.findIndex(skill => skill.id === skillId);
        if (skillIndex !== -1) {
            portfolioData.skills[skillIndex] = { ...req.body, id: skillId };
            saveData(portfolioData);
            res.json({ success: true, skill: portfolioData.skills[skillIndex] });
        } else {
            res.status(404).json({ success: false, message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating skill' });
    }
});

app.delete('/api/skills/:id', (req, res) => {
    try {
        const skillId = parseInt(req.params.id);
        portfolioData.skills = portfolioData.skills.filter(skill => skill.id !== skillId);
        saveData(portfolioData);
        res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting skill' });
    }
});

// Projects CRUD
app.get('/api/projects', (req, res) => {
    res.json(portfolioData.projects || []);
});

app.post('/api/projects', (req, res) => {
    try {
        const newProject = { ...req.body, id: Date.now() };
        portfolioData.projects.push(newProject);
        saveData(portfolioData);
        res.json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding project' });
    }
});

app.put('/api/projects/:id', (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        const projectIndex = portfolioData.projects.findIndex(project => project.id === projectId);
        if (projectIndex !== -1) {
            portfolioData.projects[projectIndex] = { ...req.body, id: projectId };
            saveData(portfolioData);
            res.json({ success: true, project: portfolioData.projects[projectIndex] });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating project' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        portfolioData.projects = portfolioData.projects.filter(project => project.id !== projectId);
        saveData(portfolioData);
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting project' });
    }
});

// Services CRUD
app.get('/api/services', (req, res) => {
    res.json(portfolioData.services || []);
});

app.post('/api/services', (req, res) => {
    try {
        const newService = { ...req.body, id: Date.now() };
        portfolioData.services.push(newService);
        saveData(portfolioData);
        res.json({ success: true, service: newService });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding service' });
    }
});

app.put('/api/services/:id', (req, res) => {
    try {
        const serviceId = parseInt(req.params.id);
        const serviceIndex = portfolioData.services.findIndex(service => service.id === serviceId);
        if (serviceIndex !== -1) {
            portfolioData.services[serviceIndex] = { ...req.body, id: serviceId };
            saveData(portfolioData);
            res.json({ success: true, service: portfolioData.services[serviceIndex] });
        } else {
            res.status(404).json({ success: false, message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating service' });
    }
});

app.delete('/api/services/:id', (req, res) => {
    try {
        const serviceId = parseInt(req.params.id);
        portfolioData.services = portfolioData.services.filter(service => service.id !== serviceId);
        saveData(portfolioData);
        res.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting service' });
    }
});

// Fallback route for all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
    console.log(`🌐 Portfolio accessible at http://localhost:${PORT}/`);
});