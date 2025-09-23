// ===== ADMIN PANEL SCRIPT =====

// Global variables
let currentEditingId = null;
const ADMIN_PIN = '260104';

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
    // Load data and update overview
    await loadData();
    updateOverview();
}

function logout() {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = 'index.html';
}

// ===== DATA MANAGEMENT =====
async function loadData() {
    try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        window.portfolioData = data;
        console.log('Portfolio data loaded from backend:', data);
    } catch (error) {
        console.error('Error loading data from backend:', error);
        showAlert('Error loading data from server!', 'error');
    }
}

async function saveData() {
    try {
        // Data is automatically saved through individual API calls
        console.log('Data saved via API calls');
        showAlert('Data saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving data:', error);
        showAlert('Error saving data!', 'error');
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // PIN form
    const pinForm = document.getElementById('pin-form');
    if (pinForm) {
        pinForm.addEventListener('submit', handlePinSubmit);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Skill form
    const skillForm = document.getElementById('skillForm');
    if (skillForm) {
        skillForm.addEventListener('submit', handleSkillSubmit);
    }
    
    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }
    
    // Service form
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleServiceSubmit);
    }
    
    // Personal form
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', handlePersonalSubmit);
    }
}

// ===== TAB MANAGEMENT =====
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Load tab content
    if (tabName === 'skills') {
        loadSkills();
    } else if (tabName === 'projects') {
        loadProjects();
    } else if (tabName === 'services') {
        // Ensure data is loaded before showing services
        if (!window.portfolioData || !window.portfolioData.services) {
            loadData().then(() => {
                loadServices();
            });
        } else {
            loadServices();
        }
    } else if (tabName === 'personal') {
        loadPersonalInfo();
    }
}

// ===== OVERVIEW =====
function updateOverview() {
    const skillsCount = window.portfolioData.skills ? window.portfolioData.skills.length : 0;
    const projectsCount = window.portfolioData.projects ? window.portfolioData.projects.length : 0;
    const servicesCount = window.portfolioData.services ? window.portfolioData.services.length : 0;
    const competenciesCount = window.portfolioData.competencies ? window.portfolioData.competencies.length : 0;
    
    document.getElementById('skills-count').textContent = skillsCount;
    document.getElementById('projects-count').textContent = projectsCount;
    document.getElementById('services-count').textContent = servicesCount;
    document.getElementById('competencies-count').textContent = competenciesCount;
}

// ===== SKILLS MANAGEMENT =====
function showSkillForm() {
    document.getElementById('skill-form').classList.remove('hidden');
    currentEditingId = null;
    document.getElementById('skillForm').reset();
}

function hideSkillForm() {
    document.getElementById('skill-form').classList.add('hidden');
    currentEditingId = null;
}

async function handleSkillSubmit(e) {
    e.preventDefault();
    
    const skillData = {
        name: document.getElementById('skill-name').value,
        description: document.getElementById('skill-description').value,
        percentage: parseInt(document.getElementById('skill-percentage').value),
        icon: document.getElementById('skill-icon').value || 'fas fa-code',
        category: document.getElementById('skill-category').value
    };
    
    try {
        let response;
        if (currentEditingId) {
            // Edit existing skill
            response = await fetch(`/api/skills/${currentEditingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skillData)
            });
        } else {
            // Add new skill
            response = await fetch('/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skillData)
            });
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedSkill = await response.json();
        console.log('Skill saved:', updatedSkill);
        
        // Reload data and refresh UI
        await loadData();
        loadSkills();
        hideSkillForm();
        updateOverview();
        showAlert('Skill saved successfully!', 'success');
        
        // Notify portfolio to refresh
        localStorage.setItem('portfolioRefreshNeeded', 'true');
    } catch (error) {
        console.error('Error saving skill:', error);
        showAlert('Error saving skill!', 'error');
    }
}

function loadSkills() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    
    if (!window.portfolioData.skills || window.portfolioData.skills.length === 0) {
        skillsList.innerHTML = '<p>No skills available. Add some skills!</p>';
        return;
    }
    
    window.portfolioData.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'item-card';
        skillCard.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <p><strong>Level:</strong> ${skill.percentage}% | <strong>Category:</strong> ${skill.category}</p>
            <div class="item-actions">
                <button class="btn btn-primary" onclick="editSkill(${skill.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteSkill(${skill.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        skillsList.appendChild(skillCard);
    });
}

function editSkill(id) {
    const skill = window.portfolioData.skills.find(s => s.id === id);
    if (!skill) return;
    
    currentEditingId = id;
    document.getElementById('skill-name').value = skill.name;
    document.getElementById('skill-description').value = skill.description;
    document.getElementById('skill-percentage').value = skill.percentage;
    document.getElementById('skill-icon').value = skill.icon;
    document.getElementById('skill-category').value = skill.category;
    
    document.getElementById('skill-form').classList.remove('hidden');
}

async function deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill?')) {
        try {
            const response = await fetch(`/api/skills/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            console.log('Skill deleted successfully');
            
            // Reload data and refresh UI
            await loadData();
            loadSkills();
            updateOverview();
            showAlert('Skill deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting skill:', error);
            showAlert('Error deleting skill!', 'error');
        }
    }
}

// ===== PROJECTS MANAGEMENT =====
function showProjectForm() {
    document.getElementById('project-form').classList.remove('hidden');
    currentEditingId = null;
    document.getElementById('projectForm').reset();
}

function hideProjectForm() {
    document.getElementById('project-form').classList.add('hidden');
    currentEditingId = null;
}

async function handleProjectSubmit(e) {
    e.preventDefault();
    
    const projectData = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        technologies: document.getElementById('project-technologies').value.split(',').map(tech => tech.trim()),
        github: document.getElementById('project-github').value,
        demo: document.getElementById('project-demo').value,
        category: document.getElementById('project-category').value,
        featured: document.getElementById('project-featured').checked
    };
    
    try {
        let response;
        if (currentEditingId) {
            // Edit existing project
            response = await fetch(`/api/projects/${currentEditingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData)
            });
        } else {
            // Add new project
            response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData)
            });
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedProject = await response.json();
        console.log('Project saved:', updatedProject);
        
        // Reload data and refresh UI
        await loadData();
        loadProjects();
        hideProjectForm();
        updateOverview();
        showAlert('Project saved successfully!', 'success');
        
        // Notify portfolio to refresh
        localStorage.setItem('portfolioRefreshNeeded', 'true');
    } catch (error) {
        console.error('Error saving project:', error);
        showAlert('Error saving project!', 'error');
    }
}

function loadProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    if (!window.portfolioData.projects || window.portfolioData.projects.length === 0) {
        projectsList.innerHTML = '<p>No projects available. Add some projects!</p>';
        return;
    }
    
    window.portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'item-card';
        projectCard.innerHTML = `
            <h3>${project.title} ${project.featured ? '<span style="color: #f59e0b;">⭐</span>' : ''}</h3>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            <p><strong>Category:</strong> ${project.category}</p>
            <div class="item-actions">
                <button class="btn btn-primary" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        projectsList.appendChild(projectCard);
    });
}

function editProject(id) {
    const project = window.portfolioData.projects.find(p => p.id === id);
    if (!project) return;
    
    currentEditingId = id;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-technologies').value = project.technologies.join(', ');
    document.getElementById('project-github').value = project.github || '';
    document.getElementById('project-demo').value = project.demo || '';
    document.getElementById('project-category').value = project.category;
    document.getElementById('project-featured').checked = project.featured || false;
    
    document.getElementById('project-form').classList.remove('hidden');
}

async function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            console.log('Project deleted successfully');
            
            // Reload data and refresh UI
            await loadData();
            loadProjects();
            updateOverview();
            showAlert('Project deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting project:', error);
            showAlert('Error deleting project!', 'error');
        }
    }
}

// ===== SERVICES MANAGEMENT =====
async function refreshServicesData() {
    try {
        await loadData();
        loadServices();
        updateOverview();
        showAlert('Services data refreshed successfully!', 'success');
    } catch (error) {
        console.error('Error refreshing services data:', error);
        showAlert('Error refreshing services data!', 'error');
    }
}

function showServiceForm() {
    document.getElementById('service-form').classList.remove('hidden');
    currentEditingId = null;
    document.getElementById('serviceForm').reset();
}

function hideServiceForm() {
    document.getElementById('service-form').classList.add('hidden');
    currentEditingId = null;
}

async function handleServiceSubmit(e) {
    e.preventDefault();
    
    const serviceData = {
        title: document.getElementById('service-title').value,
        description: document.getElementById('service-description').value,
        icon: document.getElementById('service-icon').value || 'fas fa-cog',
        category: document.getElementById('service-category').value,
        features: document.getElementById('service-features').value.split('\n').filter(feature => feature.trim()),
        price: document.getElementById('service-price').value,
        featured: document.getElementById('service-featured').checked
    };
    
    try {
        let response;
        if (currentEditingId) {
            // Edit existing service
            response = await fetch(`/api/services/${currentEditingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
        } else {
            // Add new service
            response = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedService = await response.json();
        console.log('Service saved:', updatedService);
        
        // Reload data and refresh UI
        await loadData();
        loadServices();
        hideServiceForm();
        updateOverview();
        showAlert('Service saved successfully!', 'success');
        
        // Notify portfolio to refresh
        localStorage.setItem('portfolioRefreshNeeded', 'true');
    } catch (error) {
        console.error('Error saving service:', error);
        showAlert('Error saving service!', 'error');
    }
}

function loadServices() {
    console.log('Loading services...');
    console.log('Portfolio data:', window.portfolioData);
    
    const servicesList = document.getElementById('services-list');
    if (!servicesList) {
        console.error('Services list element not found!');
        return;
    }
    
    servicesList.innerHTML = '';
    
    if (!window.portfolioData) {
        console.log('No portfolio data found');
        servicesList.innerHTML = '<p>No portfolio data available. Please check the data file.</p>';
        return;
    }
    
    // Initialize services array if it doesn't exist
    if (!window.portfolioData.services) {
        window.portfolioData.services = [];
        console.log('Initialized empty services array');
    }
    
    if (window.portfolioData.services.length === 0) {
        console.log('Services array is empty');
        servicesList.innerHTML = '<p>No services available. Add some services!</p>';
        return;
    }
    
    console.log('Found services:', window.portfolioData.services);
    
    window.portfolioData.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'item-card';
        serviceCard.innerHTML = `
            <h3>${service.title} ${service.featured ? '<span style="color: #f59e0b;">⭐</span>' : ''}</h3>
            <p>${service.description}</p>
            <p><strong>Category:</strong> ${service.category} | <strong>Price:</strong> ${service.price || 'Contact for pricing'}</p>
            <p><strong>Features:</strong></p>
            <ul style="margin-left: 20px; margin-bottom: 1rem;">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="item-actions">
                <button class="btn btn-primary" onclick="editService(${service.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        servicesList.appendChild(serviceCard);
    });
}

function editService(id) {
    const service = window.portfolioData.services.find(s => s.id === id);
    if (!service) return;
    
    currentEditingId = id;
    document.getElementById('service-title').value = service.title;
    document.getElementById('service-description').value = service.description;
    document.getElementById('service-icon').value = service.icon || '';
    document.getElementById('service-category').value = service.category;
    document.getElementById('service-features').value = service.features.join('\n');
    document.getElementById('service-price').value = service.price || '';
    document.getElementById('service-featured').checked = service.featured || false;
    
    document.getElementById('service-form').classList.remove('hidden');
}

async function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        try {
            const response = await fetch(`/api/services/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            console.log('Service deleted successfully');
            
            // Reload data and refresh UI
            await loadData();
            loadServices();
            updateOverview();
            showAlert('Service deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting service:', error);
            showAlert('Error deleting service!', 'error');
        }
    }
}

// ===== PERSONAL INFO MANAGEMENT =====
function loadPersonalInfo() {
    const personalInfo = window.portfolioData.personalInfo;
    if (!personalInfo) return;
    
    document.getElementById('personal-name').value = personalInfo.name || '';
    document.getElementById('personal-title').value = personalInfo.title || '';
    document.getElementById('personal-description').value = personalInfo.description || '';
    document.getElementById('personal-location').value = personalInfo.location || '';
    document.getElementById('personal-email').value = personalInfo.email || '';
    document.getElementById('personal-phone').value = personalInfo.phone || '';
    document.getElementById('personal-linkedin').value = personalInfo.linkedin || '';
    document.getElementById('personal-github').value = personalInfo.github || '';
}

async function handlePersonalSubmit(e) {
    e.preventDefault();
    
    const personalData = {
        name: document.getElementById('personal-name').value,
        title: document.getElementById('personal-title').value,
        description: document.getElementById('personal-description').value,
        location: document.getElementById('personal-location').value,
        email: document.getElementById('personal-email').value,
        phone: document.getElementById('personal-phone').value,
        linkedin: document.getElementById('personal-linkedin').value,
        github: document.getElementById('personal-github').value
    };
    
    try {
        const response = await fetch('/api/personal', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personalData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedPersonal = await response.json();
        console.log('Personal info saved:', updatedPersonal);
        
        // Reload data
        await loadData();
        showAlert('Personal information saved successfully!', 'success');
        
        // Notify portfolio to refresh
        localStorage.setItem('portfolioRefreshNeeded', 'true');
    } catch (error) {
        console.error('Error saving personal info:', error);
        showAlert('Error saving personal information!', 'error');
    }
}

// ===== UTILITY FUNCTIONS =====
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert at the top of the current tab
    const activeTab = document.querySelector('.tab-content.active');
    activeTab.insertBefore(alert, activeTab.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// ===== CONSOLE WELCOME =====
console.log(`
🎨 Admin Panel Loaded Successfully! 🎨

📊 Portfolio Management System
🔧 Skills, Projects, and Personal Info Management
💾 Auto-save to localStorage
🎯 Real-time updates

Happy managing! 🚀
`);

