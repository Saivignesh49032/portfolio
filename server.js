const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'portfolio.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
        personalInfo: {
            name: "Sai Vignesh S P",
            title: "AI/ML Engineer & Software Developer",
            description: "Passionate about transforming innovative ideas into real-world tech solutions. Specializing in Artificial Intelligence, Machine Learning, and Full-Stack Development.",
            location: "Devalapura, Bangalore Rural, Karnataka",
            email: "saivignesh1857@gmail.com",
            phone: "+91 78995 22804",
            linkedin: "https://www.linkedin.com/in/sai-vignesh-s-p-2a0a571b6/",
            github: "https://github.com/Saivignesh49032"
        },
        about: {
            intro: "An innovative AI/ML and Software Engineer with a deep passion for transforming complex problems into intelligent solutions. I specialize in building machine learning models, developing scalable applications, and creating user-centric experiences that make a real impact.",
            education: {
                degree: "B.E. in Artificial Intelligence and Machine Learning",
                institution: "SEA College of Engineering and Technology",
                year: "2026"
            },
            stats: [
                { number: "3+", label: "Projects" },
                { number: "2+", label: "Years Learning" },
                { number: "5+", label: "Technologies" }
            ]
        },
        skills: [
            {
                id: 1,
                name: "Python",
                description: "Data analysis, machine learning, and automation",
                percentage: 85,
                icon: "fab fa-python",
                category: "Programming"
            },
            {
                id: 2,
                name: "JavaScript",
                description: "Frontend and backend development with modern frameworks",
                percentage: 80,
                icon: "fab fa-js-square",
                category: "Programming"
            },
            {
                id: 3,
                name: "Machine Learning",
                description: "Building and deploying ML models for real-world applications",
                percentage: 75,
                icon: "fas fa-brain",
                category: "AI/ML"
            },
            {
                id: 4,
                name: "React",
                description: "Building dynamic and responsive user interfaces",
                percentage: 70,
                icon: "fab fa-react",
                category: "Frontend"
            },
            {
                id: 5,
                name: "Node.js",
                description: "Server-side JavaScript development and API creation",
                percentage: 65,
                icon: "fab fa-node-js",
                category: "Backend"
            },
            {
                id: 6,
                name: "Data Science",
                description: "Analyzing data and extracting meaningful insights",
                percentage: 70,
                icon: "fas fa-chart-line",
                category: "Data"
            }
        ],
        projects: [
            {
                id: 1,
                title: "Smart Study Timetable Generator",
                description: "An intelligent ML model that generates personalized study schedules using Random Forest Regressor, optimizing study time based on individual learning patterns and preferences. Features adaptive scheduling and performance tracking.",
                technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
                github: "https://github.com/Saivignesh49032/smart-study-timetable",
                demo: "https://smart-timetable-demo.com",
                featured: true,
                category: "Machine Learning"
            },
            {
                id: 2,
                title: "E-Commerce Analytics Dashboard",
                description: "A comprehensive dashboard for analyzing e-commerce data with real-time visualizations, customer behavior insights, and sales forecasting using advanced data science techniques.",
                technologies: ["Python", "Streamlit", "Plotly", "Pandas", "Scikit-learn"],
                github: "https://github.com/Saivignesh49032/ecommerce-dashboard",
                demo: "https://ecommerce-dashboard-demo.com",
                featured: true,
                category: "Data Science"
            },
            {
                id: 3,
                title: "Portfolio Website",
                description: "A responsive and modern portfolio website built with HTML, CSS, and JavaScript, featuring dark mode, smooth animations, and a clean design that showcases my work effectively.",
                technologies: ["HTML", "CSS", "JavaScript", "Font Awesome"],
                github: "https://github.com/Saivignesh49032/portfolio",
                demo: "https://saivignesh-portfolio.com",
                featured: false,
                category: "Web Development"
            }
        ],
        services: [
            {
                id: 1,
                title: "Machine Learning Solutions",
                description: "Custom ML models and AI solutions tailored to your business needs. From data preprocessing to model deployment.",
                icon: "fas fa-brain",
                category: "AI/ML",
                features: [
                    "Custom ML model development",
                    "Data preprocessing and analysis",
                    "Model training and optimization",
                    "Deployment and monitoring",
                    "Performance evaluation"
                ],
                price: "$75-150/hour",
                featured: true
            },
            {
                id: 2,
                title: "Web Development",
                description: "Full-stack web applications with modern technologies. Responsive, fast, and user-friendly interfaces.",
                icon: "fas fa-code",
                category: "Development",
                features: [
                    "Frontend development (React, Vue, Angular)",
                    "Backend development (Node.js, Python, PHP)",
                    "Database design and optimization",
                    "API development and integration",
                    "Deployment and maintenance"
                ],
                price: "$50-100/hour",
                featured: true
            },
            {
                id: 3,
                title: "Data Science Consulting",
                description: "Transform your data into actionable insights. Statistical analysis, visualization, and business intelligence.",
                icon: "fas fa-chart-line",
                category: "Data Science",
                features: [
                    "Data analysis and visualization",
                    "Statistical modeling",
                    "Business intelligence dashboards",
                    "Data pipeline development",
                    "Predictive analytics"
                ],
                price: "$60-120/hour",
                featured: false
            },
            {
                id: 4,
                title: "AI Training & Workshops",
                description: "Comprehensive training programs on AI, ML, and data science. From beginner to advanced levels.",
                icon: "fas fa-graduation-cap",
                category: "Training",
                features: [
                    "Customized training programs",
                    "Hands-on workshops",
                    "Project-based learning",
                    "Certification preparation",
                    "Ongoing support and mentoring"
                ],
                price: "$100-200/session",
                featured: false
            }
        ],
        competencies: [
            {
                category: "Programming Languages",
                skills: ["Python", "JavaScript", "Java", "C++", "SQL"]
            },
            {
                category: "AI/ML Technologies",
                skills: ["Machine Learning", "Deep Learning", "Data Science", "NLP", "Computer Vision"]
            },
            {
                category: "Web Technologies",
                skills: ["HTML/CSS", "React", "Node.js", "Express", "MongoDB"]
            },
            {
                category: "Tools & Frameworks",
                skills: ["Git", "Docker", "AWS", "TensorFlow", "Pandas"]
            }
        ]
    };
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    console.log('Default data file created');
}

// Helper function to read data
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return null;
    }
}

// Helper function to write data
function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// Routes

// Get all portfolio data
app.get('/api/portfolio', (req, res) => {
    console.log('Portfolio API called');
    const data = readData();
    if (data) {
        console.log('Services count in API response:', data.services ? data.services.length : 'No services');
        res.json(data);
    } else {
        console.log('Failed to read data');
        res.status(500).json({ error: 'Failed to read portfolio data' });
    }
});

// Get skills
app.get('/api/skills', (req, res) => {
    const data = readData();
    if (data && data.skills) {
        res.json(data.skills);
    } else {
        res.status(500).json({ error: 'Failed to read skills data' });
    }
});

// Add skill
app.post('/api/skills', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const newSkill = {
        id: Date.now(),
        ...req.body
    };
    
    data.skills.push(newSkill);
    
    if (writeData(data)) {
        res.json(newSkill);
    } else {
        res.status(500).json({ error: 'Failed to save skill' });
    }
});

// Update skill
app.put('/api/skills/:id', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const skillId = parseInt(req.params.id);
    const skillIndex = data.skills.findIndex(skill => skill.id === skillId);
    
    if (skillIndex === -1) {
        return res.status(404).json({ error: 'Skill not found' });
    }
    
    data.skills[skillIndex] = { ...data.skills[skillIndex], ...req.body };
    
    if (writeData(data)) {
        res.json(data.skills[skillIndex]);
    } else {
        res.status(500).json({ error: 'Failed to update skill' });
    }
});

// Delete skill
app.delete('/api/skills/:id', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const skillId = parseInt(req.params.id);
    data.skills = data.skills.filter(skill => skill.id !== skillId);
    
    if (writeData(data)) {
        res.json({ message: 'Skill deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete skill' });
    }
});

// Get projects
app.get('/api/projects', (req, res) => {
    const data = readData();
    if (data && data.projects) {
        res.json(data.projects);
    } else {
        res.status(500).json({ error: 'Failed to read projects data' });
    }
});

// Add project
app.post('/api/projects', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const newProject = {
        id: Date.now(),
        ...req.body
    };
    
    data.projects.push(newProject);
    
    if (writeData(data)) {
        res.json(newProject);
    } else {
        res.status(500).json({ error: 'Failed to save project' });
    }
});

// Update project
app.put('/api/projects/:id', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const projectId = parseInt(req.params.id);
    const projectIndex = data.projects.findIndex(project => project.id === projectId);
    
    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    
    data.projects[projectIndex] = { ...data.projects[projectIndex], ...req.body };
    
    if (writeData(data)) {
        res.json(data.projects[projectIndex]);
    } else {
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const projectId = parseInt(req.params.id);
    data.projects = data.projects.filter(project => project.id !== projectId);
    
    if (writeData(data)) {
        res.json({ message: 'Project deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Get services
app.get('/api/services', (req, res) => {
    const data = readData();
    if (data && data.services) {
        res.json(data.services);
    } else {
        res.status(500).json({ error: 'Failed to read services data' });
    }
});

// Add service
app.post('/api/services', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const newService = {
        id: Date.now(),
        ...req.body
    };
    
    data.services.push(newService);
    
    if (writeData(data)) {
        res.json(newService);
    } else {
        res.status(500).json({ error: 'Failed to save service' });
    }
});

// Update service
app.put('/api/services/:id', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const serviceId = parseInt(req.params.id);
    const serviceIndex = data.services.findIndex(service => service.id === serviceId);
    
    if (serviceIndex === -1) {
        return res.status(404).json({ error: 'Service not found' });
    }
    
    data.services[serviceIndex] = { ...data.services[serviceIndex], ...req.body };
    
    if (writeData(data)) {
        res.json(data.services[serviceIndex]);
    } else {
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// Delete service
app.delete('/api/services/:id', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const serviceId = parseInt(req.params.id);
    data.services = data.services.filter(service => service.id !== serviceId);
    
    if (writeData(data)) {
        res.json({ message: 'Service deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

// Update personal info
app.put('/api/personal', (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    data.personalInfo = { ...data.personalInfo, ...req.body };
    
    if (writeData(data)) {
        res.json(data.personalInfo);
    } else {
        res.status(500).json({ error: 'Failed to update personal info' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
    console.log(`🌐 Portfolio accessible at http://localhost:${PORT}/`);
});

module.exports = app;
