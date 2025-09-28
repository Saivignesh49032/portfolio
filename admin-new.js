// ===== ADMIN PANEL SCRIPT =====

// Global variables
let currentEditingId = null;
let skills = [];
let projects = [];
let personalInfo = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin panel initializing...');
    
    // Check authentication status
    checkAuthentication();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Admin panel initialized successfully!');
});

// ===== AUTHENTICATION =====
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    
    if (isAuthenticated) {
        showAdminPanel();
    } else {
        // Redirect to main page if not authenticated
        window.location.href = 'index.html';
    }
}

async function showAdminPanel() {
    try {
        // Test API connection
        await window.adminAPI.healthCheck();
        console.log('API connection successful');
        
        // Load data and update overview
        await loadData();
        updateOverview();
    } catch (error) {
        console.error('Failed to connect to API:', error);
        showError('Failed to connect to server. Please check if the server is running.');
    }
}

function logout() {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = 'index.html';
}

// ===== DATA MANAGEMENT =====
async function loadData() {
    try {
        console.log('Loading data from API...');
        
        // Load all data in parallel
        const [skillsData, projectsData, personalData] = await Promise.all([
            window.adminAPI.getSkills(),
            window.adminAPI.getProjects(),
            window.adminAPI.getPersonalInfo()
        ]);
        
        skills = skillsData;
        projects = projectsData;
        personalInfo = personalData;
        
        console.log('Data loaded successfully:', { skills, projects, personalInfo });
        
        // Render all sections
        renderSkillsSection();
        renderProjectsSection();
        renderPersonalInfoSection();
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load data from server');
    }
}

function updateOverview() {
    const skillsCount = skills.length;
    const projectsCount = projects.length;
    const featuredProjectsCount = projects.filter(p => p.featured).length;
    
    document.getElementById('skills-count').textContent = skillsCount;
    document.getElementById('projects-count').textContent = projectsCount;
    document.getElementById('featured-count').textContent = featuredProjectsCount;
}

// ===== SKILLS MANAGEMENT =====
function renderSkillsSection() {
    const skillsContainer = document.getElementById('skills-list');
    skillsContainer.innerHTML = '';
    
    skills.forEach(skill => {
        const skillElement = createSkillElement(skill);
        skillsContainer.appendChild(skillElement);
    });
}

function createSkillElement(skill) {
    const div = document.createElement('div');
    div.className = 'skill-item';
    div.innerHTML = `
        <div class="skill-info">
            <h4>${skill.name}</h4>
            <p>${skill.category}</p>
            <div class="skill-level">
                <div class="level-bar">
                    <div class="level-fill" style="width: ${skill.level}%"></div>
                </div>
                <span>${skill.level}%</span>
            </div>
        </div>
        <div class="skill-actions">
            <button onclick="editSkill(${skill.id})" class="btn-edit">Edit</button>
            <button onclick="deleteSkill(${skill.id})" class="btn-delete">Delete</button>
        </div>
    `;
    return div;
}

async function handleSkillSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const skillData = {
        name: formData.get('skillName'),
        level: formData.get('skillLevel'),
        category: formData.get('skillCategory')
    };
    
    try {
        if (currentEditingId) {
            // Update existing skill
            await window.adminAPI.updateSkill(currentEditingId, skillData);
            showSuccess('Skill updated successfully!');
        } else {
            // Add new skill
            await window.adminAPI.addSkill(skillData);
            showSuccess('Skill added successfully!');
        }
        
        // Reload data and reset form
        await loadData();
        event.target.reset();
        currentEditingId = null;
        document.getElementById('skill-form').style.display = 'none';
        
    } catch (error) {
        console.error('Error saving skill:', error);
        showError('Failed to save skill: ' + error.message);
    }
}

async function editSkill(id) {
    const skill = skills.find(s => s.id === id);
    if (!skill) return;
    
    // Populate form with skill data
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillLevel').value = skill.level;
    document.getElementById('skillCategory').value = skill.category;
    
    currentEditingId = id;
    document.getElementById('skill-form').style.display = 'block';
    document.getElementById('skill-form').scrollIntoView({ behavior: 'smooth' });
}

async function deleteSkill(id) {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
        await window.adminAPI.deleteSkill(id);
        showSuccess('Skill deleted successfully!');
        await loadData();
    } catch (error) {
        console.error('Error deleting skill:', error);
        showError('Failed to delete skill: ' + error.message);
    }
}

// ===== PROJECTS MANAGEMENT =====
function renderProjectsSection() {
    const projectsContainer = document.getElementById('projects-list');
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
}

function createProjectElement(project) {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/300x200/3b82f6/ffffff?text=Project'">
            ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
        <div class="project-info">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>` : ''}
                ${project.live ? `<a href="${project.live}" target="_blank" class="project-link">Live Demo</a>` : ''}
            </div>
        </div>
        <div class="project-actions">
            <button onclick="editProject(${project.id})" class="btn-edit">Edit</button>
            <button onclick="toggleFeatured(${project.id})" class="btn-feature">
                ${project.featured ? 'Unfeature' : 'Feature'}
            </button>
            <button onclick="deleteProject(${project.id})" class="btn-delete">Delete</button>
        </div>
    `;
    return div;
}

async function handleProjectSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const projectData = {
        title: formData.get('projectTitle'),
        description: formData.get('projectDescription'),
        image: formData.get('projectImage'),
        technologies: formData.get('projectTechnologies'),
        github: formData.get('projectGithub'),
        live: formData.get('projectLive'),
        category: formData.get('projectCategory'),
        featured: formData.get('projectFeatured') === 'on'
    };
    
    try {
        if (currentEditingId) {
            // Update existing project
            await window.adminAPI.updateProject(currentEditingId, projectData);
            showSuccess('Project updated successfully!');
        } else {
            // Add new project
            await window.adminAPI.addProject(projectData);
            showSuccess('Project added successfully!');
        }
        
        // Reload data and reset form
        await loadData();
        event.target.reset();
        currentEditingId = null;
        document.getElementById('project-form').style.display = 'none';
        
    } catch (error) {
        console.error('Error saving project:', error);
        showError('Failed to save project: ' + error.message);
    }
}

async function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    // Populate form with project data
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectTechnologies').value = project.technologies.join(', ');
    document.getElementById('projectGithub').value = project.github || '';
    document.getElementById('projectLive').value = project.live || '';
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectFeatured').checked = project.featured;
    
    currentEditingId = id;
    document.getElementById('project-form').style.display = 'block';
    document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });
}

async function toggleFeatured(id) {
    try {
        await window.adminAPI.toggleProjectFeatured(id);
        showSuccess('Project featured status updated!');
        await loadData();
    } catch (error) {
        console.error('Error toggling featured status:', error);
        showError('Failed to update featured status: ' + error.message);
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
        await window.adminAPI.deleteProject(id);
        showSuccess('Project deleted successfully!');
        await loadData();
    } catch (error) {
        console.error('Error deleting project:', error);
        showError('Failed to delete project: ' + error.message);
    }
}

// ===== PERSONAL INFO MANAGEMENT =====
function renderPersonalInfoSection() {
    // Populate form with current personal info
    document.getElementById('personalName').value = personalInfo.name || '';
    document.getElementById('personalTitle').value = personalInfo.title || '';
    document.getElementById('personalBio').value = personalInfo.bio || '';
    document.getElementById('personalEmail').value = personalInfo.email || '';
    document.getElementById('personalPhone').value = personalInfo.phone || '';
    document.getElementById('personalLocation').value = personalInfo.location || '';
    document.getElementById('personalResume').value = personalInfo.resume || '';
    document.getElementById('personalGithub').value = personalInfo.social?.github || '';
    document.getElementById('personalLinkedin').value = personalInfo.social?.linkedin || '';
    document.getElementById('personalTwitter').value = personalInfo.social?.twitter || '';
}

async function handlePersonalSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const personalData = {
        name: formData.get('personalName'),
        title: formData.get('personalTitle'),
        bio: formData.get('personalBio'),
        email: formData.get('personalEmail'),
        phone: formData.get('personalPhone'),
        location: formData.get('personalLocation'),
        resume: formData.get('personalResume'),
        social: {
            github: formData.get('personalGithub'),
            linkedin: formData.get('personalLinkedin'),
            twitter: formData.get('personalTwitter')
        }
    };
    
    try {
        await window.adminAPI.updatePersonalInfo(personalData);
        showSuccess('Personal information updated successfully!');
        await loadData();
    } catch (error) {
        console.error('Error updating personal info:', error);
        showError('Failed to update personal information: ' + error.message);
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Form submissions
    document.getElementById('skill-form').addEventListener('submit', handleSkillSubmit);
    document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
    document.getElementById('personal-form').addEventListener('submit', handlePersonalSubmit);
    
    // Toggle form visibility
    document.getElementById('add-skill-btn').addEventListener('click', () => {
        document.getElementById('skill-form').style.display = 'block';
        document.getElementById('skill-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('add-project-btn').addEventListener('click', () => {
        document.getElementById('project-form').style.display = 'block';
        document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Cancel buttons
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('form').style.display = 'none';
            e.target.closest('form').reset();
            currentEditingId = null;
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
