const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import MongoDB routes
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

// Import existing database for fallback
const Database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize fallback database
const db = new Database();

// Enhanced CORS configuration for frontend access
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001', 
        'https://your-portfolio.vercel.app',
        'https://portfolio-saivignesh.vercel.app',
        'https://saivignesh49032.github.io'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
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

// MongoDB Connection (optional - falls back to JSON if not available)
const connectDB = async () => {
    try {
        if (process.env.DB_CONNECTION_STRING) {
            const conn = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return true;
        } else {
            console.log('MongoDB not configured, using JSON fallback');
            return false;
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Falling back to JSON database');
        return false;
    }
};

// Connect to MongoDB (optional)
let mongoConnected = false;
connectDB().then(connected => {
    mongoConnected = connected;
});

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: mongoConnected ? 'MongoDB' : 'JSON',
        environment: process.env.NODE_ENV || 'development'
    });
});

// MongoDB API Routes (if connected)
if (process.env.DB_CONNECTION_STRING) {
    app.use('/api/projects', projectRoutes);
    app.use('/api/auth', authRoutes);
} else {
    // Add auth routes even without MongoDB for fallback
    app.use('/api/auth', authRoutes);
}

// Fallback JSON API Routes (existing functionality)
app.get('/api/portfolio', (req, res) => {
    try {
        const data = db.loadData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }
});

// Skills API
app.get('/api/skills', (req, res) => {
    try {
        const data = db.loadData();
        res.json(data.skills || []);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

app.post('/api/skills', (req, res) => {
    try {
        const skill = req.body;
        skill.id = Date.now();
        const data = db.loadData();
        data.skills.push(skill);
        db.saveData(data);
        res.json(skill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ error: 'Failed to create skill' });
    }
});

app.put('/api/skills/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedSkill = req.body;
        const data = db.loadData();
        const skillIndex = data.skills.findIndex(skill => skill.id === id);
        
        if (skillIndex === -1) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        data.skills[skillIndex] = { ...updatedSkill, id };
        db.saveData(data);
        res.json(data.skills[skillIndex]);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ error: 'Failed to update skill' });
    }
});

app.delete('/api/skills/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = db.loadData();
        const skillIndex = data.skills.findIndex(skill => skill.id === id);
        
        if (skillIndex === -1) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        data.skills.splice(skillIndex, 1);
        db.saveData(data);
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ error: 'Failed to delete skill' });
    }
});

// Projects API
app.get('/api/projects', (req, res) => {
    try {
        const data = db.loadData();
        res.json(data.projects || []);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

app.post('/api/projects', (req, res) => {
    try {
        const project = req.body;
        project.id = Date.now();
        const data = db.loadData();
        data.projects.push(project);
        db.saveData(data);
        res.json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

app.put('/api/projects/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedProject = req.body;
        const data = db.loadData();
        const projectIndex = data.projects.findIndex(project => project.id === id);
        
        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        data.projects[projectIndex] = { ...updatedProject, id };
        db.saveData(data);
        res.json(data.projects[projectIndex]);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = db.loadData();
        const projectIndex = data.projects.findIndex(project => project.id === id);
        
        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        data.projects.splice(projectIndex, 1);
        db.saveData(data);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Personal Info API
app.get('/api/personal-info', (req, res) => {
    try {
        const data = db.loadData();
        res.json(data.personalInfo || {});
    } catch (error) {
        console.error('Error fetching personal info:', error);
        res.status(500).json({ error: 'Failed to fetch personal info' });
    }
});

app.put('/api/personal-info', (req, res) => {
    try {
        const personalInfo = req.body;
        const data = db.loadData();
        data.personalInfo = { ...data.personalInfo, ...personalInfo };
        db.saveData(data);
        res.json(data.personalInfo);
    } catch (error) {
        console.error('Error updating personal info:', error);
        res.status(500).json({ error: 'Failed to update personal info' });
    }
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin panel
app.get('/admin-panel', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-panel.html'));
});

// Explicit routes for static files
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
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
    res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        message: err.message 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Database: ${mongoConnected ? 'MongoDB' : 'JSON Fallback'}`);
        console.log(`CORS enabled for frontend access`);
    });
}

// Export for Vercel
module.exports = app;