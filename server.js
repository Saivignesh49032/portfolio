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
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        }
    }
}));

// Data file path
const dataFile = path.join(__dirname, 'data', 'portfolio.json');

// Default portfolio data
const defaultData = {
    personalInfo: {
        name: "Sai Vignesh S P",
        title: "AI/ML Engineer & Software Developer",
        bio: "Passionate developer creating beautiful, functional web experiences with modern technologies.",
        email: "saivignesh1857@gmail.com",
        phone: "+91 7899522804",
        location: "Chennai, India",
        resume: "resume.pdf"
    },
    
    skills: [
        { id: 1, name: "JavaScript", percentage: 90, category: "Frontend", description: "Modern ES6+ JavaScript with async/await, modules, and advanced features", icon: "fab fa-js-square" },
        { id: 2, name: "React", percentage: 85, category: "Frontend", description: "React hooks, context API, state management, and component architecture", icon: "fab fa-react" },
        { id: 3, name: "Node.js", percentage: 80, category: "Backend", description: "Server-side JavaScript with Express, REST APIs, and middleware", icon: "fab fa-node-js" },
        { id: 4, name: "Python", percentage: 75, category: "Backend", description: "Python programming with Flask, Django, and data science libraries", icon: "fab fa-python" },
        { id: 5, name: "HTML/CSS", percentage: 95, category: "Frontend", description: "Semantic HTML5, CSS3, Flexbox, Grid, and responsive design", icon: "fab fa-html5" },
        { id: 6, name: "MongoDB", percentage: 70, category: "Database", description: "NoSQL database design, queries, indexing, and aggregation", icon: "fas fa-database" }
    ],
    
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features user authentication, product listings, shopping cart, and order processing.",
            technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe API"],
            github: "https://github.com/Saivignesh49032/e-commerce-platform",
            live: "https://e-commerce-platform-live.vercel.app",
            image: "https://via.placeholder.com/400x250/FF5733/FFFFFF?text=E-Commerce",
            category: "Full Stack",
            featured: true
        },
        {
            id: 2,
            title: "AI Chat Application",
            description: "An intelligent chat application powered by machine learning algorithms. Features real-time messaging, sentiment analysis, and smart responses.",
            technologies: ["Python", "Flask", "TensorFlow", "WebSocket", "Redis"],
            github: "https://github.com/Saivignesh49032/ai-chat-app",
            live: "https://ai-chat-app.vercel.app",
            image: "https://via.placeholder.com/400x250/4ECDC4/FFFFFF?text=AI+Chat",
            category: "AI/ML",
            featured: true
        },
        {
            id: 3,
            title: "Task Management System",
            description: "A comprehensive task management system with team collaboration features, project tracking, and deadline management.",
            technologies: ["Vue.js", "Node.js", "PostgreSQL", "Socket.io", "JWT"],
            github: "https://github.com/Saivignesh49032/task-manager",
            live: "https://task-manager-demo.vercel.app",
            image: "https://via.placeholder.com/400x250/45B7D1/FFFFFF?text=Task+Manager",
            category: "Web App",
            featured: false
        }
    ],
    
    services: [
        {
            id: 1,
            title: "Web Development",
            description: "Building responsive and high-performance web applications using modern frameworks.",
            icon: "fas fa-laptop-code",
            category: "Development",
            features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Cross-browser Compatibility"],
            price: "Starting at $500",
            featured: true
        },
        {
            id: 2,
            title: "Machine Learning Solutions",
            description: "Developing AI and ML solutions to solve complex business problems and automate processes.",
            icon: "fas fa-brain",
            category: "AI/ML",
            features: ["Data Analysis", "Predictive Modeling", "Natural Language Processing", "Computer Vision"],
            price: "Starting at $1000",
            featured: true
        },
        {
            id: 3,
            title: "Mobile App Development",
            description: "Creating native and cross-platform mobile applications for iOS and Android platforms.",
            icon: "fas fa-mobile-alt",
            category: "Mobile",
            features: ["Native Development", "Cross-platform", "App Store Optimization", "Push Notifications"],
            price: "Starting at $800",
            featured: false
        }
    ]
};

// Load data from file or create default
let portfolioData = { ...defaultData };

function loadData() {
    try {
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf8');
            portfolioData = JSON.parse(data);
            console.log('Data loaded from file');
        } else {
            // Create data directory if it doesn't exist
            const dataDir = path.dirname(dataFile);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            saveData();
            console.log('Default data created');
        }
    } catch (error) {
        console.error('Error loading data:', error);
        portfolioData = { ...defaultData };
    }
}

function saveData() {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(portfolioData, null, 2));
        console.log('Data saved to file');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function reloadData() {
    try {
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf8');
            portfolioData = JSON.parse(data);
            console.log('Data reloaded from file');
        }
    } catch (error) {
        console.error('Error reloading data:', error);
    }
}

// Load data on startup
loadData();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

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

app.get('/admin.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'admin.js'));
});

app.get('/admin-styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'admin-styles.css'));
});

app.get('/profilepic.jpg', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, 'profilepic.jpg'));
});

// API Routes
app.get('/api/portfolio', (req, res) => {
    reloadData(); // Ensure fresh data
    res.json(portfolioData);
});

// Skills CRUD
app.get('/api/skills', (req, res) => {
    res.json(portfolioData.skills || []);
});

app.post('/api/skills', (req, res) => {
    try {
        const newSkill = { 
            ...req.body, 
            id: Date.now() 
        };
        portfolioData.skills.push(newSkill);
        saveData();
        reloadData();
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
            saveData();
            reloadData();
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
        saveData();
        reloadData();
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
        const newProject = { 
            ...req.body, 
            id: Date.now() 
        };
        portfolioData.projects.push(newProject);
        saveData();
        reloadData();
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
            saveData();
            reloadData();
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
        saveData();
        reloadData();
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
        const newService = { 
            ...req.body, 
            id: Date.now() 
        };
        portfolioData.services.push(newService);
        saveData();
        reloadData();
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
            saveData();
            reloadData();
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
        saveData();
        reloadData();
        res.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting service' });
    }
});

// Personal Info CRUD
app.get('/api/personal', (req, res) => {
    res.json(portfolioData.personalInfo || {});
});

app.put('/api/personal', (req, res) => {
    try {
        portfolioData.personalInfo = { ...portfolioData.personalInfo, ...req.body };
        saveData();
        reloadData();
        res.json({ success: true, personalInfo: portfolioData.personalInfo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating personal info' });
    }
});

// Fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
    console.log(`🌐 Portfolio accessible at http://localhost:${PORT}/`);
    console.log(`🔧 Admin panel accessible at http://localhost:${PORT}/admin`);
});