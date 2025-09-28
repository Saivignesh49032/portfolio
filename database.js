const fs = require('fs');
const path = require('path');

class Database {
    constructor() {
        this.dataDir = path.join(__dirname, 'data');
        this.dataFile = path.join(this.dataDir, 'portfolio.json');
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Create data directory if it doesn't exist
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }

        // Initialize with default data if file doesn't exist
        if (!fs.existsSync(this.dataFile)) {
            const defaultData = {
                skills: [
                    {
                        id: 1,
                        name: "Python",
                        level: 90,
                        category: "Programming Languages"
                    },
                    {
                        id: 2,
                        name: "JavaScript",
                        level: 85,
                        category: "Programming Languages"
                    },
                    {
                        id: 3,
                        name: "Machine Learning",
                        level: 88,
                        category: "AI/ML"
                    },
                    {
                        id: 4,
                        name: "React",
                        level: 82,
                        category: "Frontend"
                    },
                    {
                        id: 5,
                        name: "Node.js",
                        level: 80,
                        category: "Backend"
                    }
                ],
                projects: [
                    {
                        id: 1,
                        title: "AI Chatbot System",
                        description: "Intelligent conversational AI chatbot with natural language processing capabilities.",
                        image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=AI+Chatbot",
                        technologies: ["Python", "TensorFlow", "NLP", "Flask"],
                        github: "https://github.com/example/ai-chatbot",
                        live: "https://example.com/ai-chatbot",
                        featured: true,
                        category: "ai"
                    },
                    {
                        id: 2,
                        title: "E-commerce Platform",
                        description: "Full-stack e-commerce platform with modern UI and secure payment integration.",
                        image: "https://via.placeholder.com/400x300/10b981/ffffff?text=E-commerce",
                        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                        github: "https://github.com/example/ecommerce",
                        live: "https://example.com/ecommerce",
                        featured: true,
                        category: "web"
                    },
                    {
                        id: 3,
                        title: "Data Analysis Dashboard",
                        description: "Interactive dashboard for data visualization and business intelligence.",
                        image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Dashboard",
                        technologies: ["Python", "Pandas", "Plotly", "Django"],
                        github: "https://github.com/example/dashboard",
                        live: "https://example.com/dashboard",
                        featured: false,
                        category: "data"
                    }
                ],
                personalInfo: {
                    name: "Sai Vignesh S P",
                    title: "AI/ML Engineer & Software Developer",
                    email: "saivignesh49032@gmail.com",
                    phone: "+91 9876543210",
                    location: "Chennai, India",
                    bio: "Passionate about transforming innovative ideas into real-world tech solutions. Specializing in Artificial Intelligence, Machine Learning, and Full-Stack Development.",
                    resume: "https://github.com/Saivignesh49032/portfolio/raw/main/Sai_Vignesh_Resume%20%283%29.pdf",
                    social: {
                        github: "https://github.com/Saivignesh49032",
                        linkedin: "https://linkedin.com/in/sai-vignesh-49032",
                        twitter: "https://twitter.com/saivignesh"
                    }
                }
            };
            this.saveData(defaultData);
        }
    }

    loadData() {
        try {
            const data = fs.readFileSync(this.dataFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    saveData(data) {
        try {
            fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }

    // Skills CRUD
    getSkills() {
        const data = this.loadData();
        return data ? data.skills : [];
    }

    addSkill(skill) {
        const data = this.loadData();
        if (!data) return false;

        const newSkill = {
            id: Date.now(),
            name: skill.name,
            level: parseInt(skill.level),
            category: skill.category
        };

        data.skills.push(newSkill);
        return this.saveData(data) ? newSkill : false;
    }

    updateSkill(id, skillData) {
        const data = this.loadData();
        if (!data) return false;

        const skillIndex = data.skills.findIndex(skill => skill.id === parseInt(id));
        if (skillIndex === -1) return false;

        data.skills[skillIndex] = {
            ...data.skills[skillIndex],
            name: skillData.name,
            level: parseInt(skillData.level),
            category: skillData.category
        };

        return this.saveData(data) ? data.skills[skillIndex] : false;
    }

    deleteSkill(id) {
        const data = this.loadData();
        if (!data) return false;

        const skillIndex = data.skills.findIndex(skill => skill.id === parseInt(id));
        if (skillIndex === -1) return false;

        data.skills.splice(skillIndex, 1);
        return this.saveData(data);
    }

    // Projects CRUD
    getProjects() {
        const data = this.loadData();
        return data ? data.projects : [];
    }

    addProject(project) {
        const data = this.loadData();
        if (!data) return false;

        const newProject = {
            id: Date.now(),
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies.split(',').map(tech => tech.trim()),
            github: project.github,
            live: project.live,
            featured: project.featured === 'true',
            category: project.category
        };

        data.projects.push(newProject);
        return this.saveData(data) ? newProject : false;
    }

    updateProject(id, projectData) {
        const data = this.loadData();
        if (!data) return false;

        const projectIndex = data.projects.findIndex(project => project.id === parseInt(id));
        if (projectIndex === -1) return false;

        data.projects[projectIndex] = {
            ...data.projects[projectIndex],
            title: projectData.title,
            description: projectData.description,
            image: projectData.image,
            technologies: projectData.technologies.split(',').map(tech => tech.trim()),
            github: projectData.github,
            live: projectData.live,
            featured: projectData.featured === 'true',
            category: projectData.category
        };

        return this.saveData(data) ? data.projects[projectIndex] : false;
    }

    deleteProject(id) {
        const data = this.loadData();
        if (!data) return false;

        const projectIndex = data.projects.findIndex(project => project.id === parseInt(id));
        if (projectIndex === -1) return false;

        data.projects.splice(projectIndex, 1);
        return this.saveData(data);
    }

    toggleProjectFeatured(id) {
        const data = this.loadData();
        if (!data) return false;

        const projectIndex = data.projects.findIndex(project => project.id === parseInt(id));
        if (projectIndex === -1) return false;

        data.projects[projectIndex].featured = !data.projects[projectIndex].featured;
        return this.saveData(data) ? data.projects[projectIndex] : false;
    }

    // Personal Info CRUD
    getPersonalInfo() {
        const data = this.loadData();
        return data ? data.personalInfo : {};
    }

    updatePersonalInfo(personalData) {
        const data = this.loadData();
        if (!data) return false;

        data.personalInfo = {
            ...data.personalInfo,
            ...personalData
        };

        return this.saveData(data) ? data.personalInfo : false;
    }
}

module.exports = Database;
