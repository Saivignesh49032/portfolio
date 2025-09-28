const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
const db = new Database();

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

// API Routes

// Get all data
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
        const skills = db.getSkills();
        res.json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

app.post('/api/skills', (req, res) => {
    try {
        const skill = db.addSkill(req.body);
        if (skill) {
            res.json(skill);
        } else {
            res.status(400).json({ error: 'Failed to add skill' });
        }
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ error: 'Failed to add skill' });
    }
});

app.put('/api/skills/:id', (req, res) => {
    try {
        const skill = db.updateSkill(req.params.id, req.body);
        if (skill) {
            res.json(skill);
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
        const success = db.deleteSkill(req.params.id);
        if (success) {
            res.json({ message: 'Skill deleted successfully' });
        } else {
            res.status(404).json({ error: 'Skill not found' });
        }
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ error: 'Failed to delete skill' });
    }
});

// Projects API
app.get('/api/projects', (req, res) => {
    try {
        const projects = db.getProjects();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

app.post('/api/projects', (req, res) => {
    try {
        const project = db.addProject(req.body);
        if (project) {
            res.json(project);
        } else {
            res.status(400).json({ error: 'Failed to add project' });
        }
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
});

app.put('/api/projects/:id', (req, res) => {
    try {
        const project = db.updateProject(req.params.id, req.body);
        if (project) {
            res.json(project);
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
        const success = db.deleteProject(req.params.id);
        if (success) {
            res.json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

app.patch('/api/projects/:id/toggle-featured', (req, res) => {
    try {
        const project = db.toggleProjectFeatured(req.params.id);
        if (project) {
            res.json(project);
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
        const personalInfo = db.getPersonalInfo();
        res.json(personalInfo);
    } catch (error) {
        console.error('Error fetching personal info:', error);
        res.status(500).json({ error: 'Failed to fetch personal info' });
    }
});

app.put('/api/personal-info', (req, res) => {
    try {
        const personalInfo = db.updatePersonalInfo(req.body);
        if (personalInfo) {
            res.json(personalInfo);
        } else {
            res.status(400).json({ error: 'Failed to update personal info' });
        }
    } catch (error) {
        console.error('Error updating personal info:', error);
        res.status(500).json({ error: 'Failed to update personal info' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
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
    console.log(`Server running on port ${PORT}`);
    console.log(`Database initialized at: ${db.dataFile}`);
});
