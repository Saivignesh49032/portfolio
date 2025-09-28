const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'portfolio.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.', {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (filePath.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        } else if (filePath.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
        }
    }
}));

// Serve static files from public folder
app.use(express.static('public'));

// Helper functions
function readData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading data file:', error);
    }
    
    // Return default data structure
    return {
        skills: [
            { id: 1, name: "Python", description: "Data analysis, machine learning, and automation", percentage: 85, icon: "fab fa-python", category: "Programming" },
            { id: 2, name: "JavaScript", description: "Frontend and backend development", percentage: 80, icon: "fab fa-js", category: "Programming" },
            { id: 3, name: "React", description: "Modern UI development", percentage: 75, icon: "fab fa-react", category: "Frontend" },
            { id: 4, name: "Node.js", description: "Server-side JavaScript", percentage: 70, icon: "fab fa-node-js", category: "Backend" }
        ],
        projects: [
            { id: 1, title: "AI Chatbot", description: "Intelligent conversational AI", technologies: ["Python", "TensorFlow", "NLP"], github: "https://github.com/example", demo: "https://demo.example.com", featured: true },
            { id: 2, title: "E-commerce Platform", description: "Full-stack e-commerce solution", technologies: ["React", "Node.js", "MongoDB"], github: "https://github.com/example", demo: "https://demo.example.com", featured: false }
        ],
        personalInfo: {
            name: "Sai Vignesh S P",
            title: "AI/ML Engineer & Software Developer",
            email: "saivignesh1857@gmail.com",
            phone: "+91 78995 22804",
            location: "Devalapura, Bangalore Rural, Karnataka",
            bio: "Passionate about transforming innovative ideas into real-world tech solutions. Specializing in Artificial Intelligence, Machine Learning, and Full-Stack Development."
        }
    };
}

function writeData(data) {
    try {
        // Ensure data directory exists
        const dataDir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data file:', error);
        return false;
    }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all data
app.get('/api/portfolio', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }
});

// Skills API
app.get('/api/skills', (req, res) => {
    try {
        const data = readData();
        res.json(data.skills || []);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

app.post('/api/skills', (req, res) => {
    try {
        const data = readData();
        const newSkill = {
            id: Date.now(),
            ...req.body
        };
        data.skills = data.skills || [];
        data.skills.push(newSkill);
        
        if (writeData(data)) {
            res.json(newSkill);
        } else {
            res.status(500).json({ error: 'Failed to save skill' });
        }
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ error: 'Failed to add skill' });
    }
});

app.put('/api/skills/:id', (req, res) => {
    try {
        const data = readData();
        const skillId = parseInt(req.params.id);
        const skillIndex = data.skills.findIndex(skill => skill.id === skillId);
        
        if (skillIndex !== -1) {
            data.skills[skillIndex] = { ...data.skills[skillIndex], ...req.body };
            if (writeData(data)) {
                res.json(data.skills[skillIndex]);
            } else {
                res.status(500).json({ error: 'Failed to update skill' });
            }
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ error: 'Failed to update skill' });
    }
});

app.delete('/api/skills/:id', (req, res) => {
    try {
        const data = readData();
        const skillId = parseInt(req.params.id);
        data.skills = data.skills.filter(skill => skill.id !== skillId);
        
        if (writeData(data)) {
            res.json({ message: 'Skill deleted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to delete skill' });
        }
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ error: 'Failed to delete skill' });
    }
});

// Projects API
app.get('/api/projects', (req, res) => {
    try {
        const data = readData();
        res.json(data.projects || []);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

app.post('/api/projects', (req, res) => {
    try {
        const data = readData();
        const newProject = {
            id: Date.now(),
            ...req.body
        };
        data.projects = data.projects || [];
        data.projects.push(newProject);
        
        if (writeData(data)) {
            res.json(newProject);
        } else {
            res.status(500).json({ error: 'Failed to save project' });
        }
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
});

app.put('/api/projects/:id', (req, res) => {
    try {
        const data = readData();
        const projectId = parseInt(req.params.id);
        const projectIndex = data.projects.findIndex(project => project.id === projectId);
        
        if (projectIndex !== -1) {
            data.projects[projectIndex] = { ...data.projects[projectIndex], ...req.body };
            if (writeData(data)) {
                res.json(data.projects[projectIndex]);
            } else {
                res.status(500).json({ error: 'Failed to update project' });
            }
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    try {
        const data = readData();
        const projectId = parseInt(req.params.id);
        data.projects = data.projects.filter(project => project.id !== projectId);
        
        if (writeData(data)) {
            res.json({ message: 'Project deleted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to delete project' });
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

app.patch('/api/projects/:id/toggle-featured', (req, res) => {
    try {
        const data = readData();
        const projectId = parseInt(req.params.id);
        const projectIndex = data.projects.findIndex(project => project.id === projectId);
        
        if (projectIndex !== -1) {
            data.projects[projectIndex].featured = !data.projects[projectIndex].featured;
            if (writeData(data)) {
                res.json(data.projects[projectIndex]);
            } else {
                res.status(500).json({ error: 'Failed to toggle featured status' });
            }
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error('Error toggling project featured status:', error);
        res.status(500).json({ error: 'Failed to toggle project featured status' });
    }
});

// Personal Info API
app.get('/api/personal-info', (req, res) => {
    try {
        const data = readData();
        res.json(data.personalInfo || {});
    } catch (error) {
        console.error('Error fetching personal info:', error);
        res.status(500).json({ error: 'Failed to fetch personal info' });
    }
});

app.put('/api/personal-info', (req, res) => {
    try {
        const data = readData();
        data.personalInfo = { ...data.personalInfo, ...req.body };
        
        if (writeData(data)) {
            res.json(data.personalInfo);
        } else {
            res.status(500).json({ error: 'Failed to update personal info' });
        }
    } catch (error) {
        console.error('Error updating personal info:', error);
        res.status(500).json({ error: 'Failed to update personal info' });
    }
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Explicit routes for static files
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/admin-api.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-api.js'));
});

app.get('/admin-new.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-new.js'));
});

app.get('/data.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.js'));
});

app.get('/profilepic.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'profilepic.jpg'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Simple server running on port ${PORT}`);
    console.log(`Data file: ${DATA_FILE}`);
    
    // Initialize data file if it doesn't exist
    const data = readData();
    writeData(data);
    console.log('Data initialized successfully');
});
