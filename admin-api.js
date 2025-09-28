// Admin API Client
class AdminAPI {
    constructor() {
        this.baseURL = window.location.origin;
        console.log('AdminAPI baseURL:', this.baseURL);
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/api${endpoint}`;
        console.log(`Making API request to: ${url}`);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            console.log('Request config:', config);
            const response = await fetch(url, config);
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            const data = await response.json();
            console.log('Response data:', data);
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            console.error('Error details:', error.message);
            throw error;
        }
    }

    // Skills API
    async getSkills() {
        return this.request('/skills');
    }

    async addSkill(skillData) {
        return this.request('/skills', {
            method: 'POST',
            body: JSON.stringify(skillData)
        });
    }

    async updateSkill(id, skillData) {
        return this.request(`/skills/${id}`, {
            method: 'PUT',
            body: JSON.stringify(skillData)
        });
    }

    async deleteSkill(id) {
        return this.request(`/skills/${id}`, {
            method: 'DELETE'
        });
    }

    // Projects API
    async getProjects() {
        return this.request('/projects');
    }

    async addProject(projectData) {
        return this.request('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }

    async updateProject(id, projectData) {
        return this.request(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(projectData)
        });
    }

    async deleteProject(id) {
        return this.request(`/projects/${id}`, {
            method: 'DELETE'
        });
    }

    async toggleProjectFeatured(id) {
        return this.request(`/projects/${id}/toggle-featured`, {
            method: 'PATCH'
        });
    }

    // Personal Info API
    async getPersonalInfo() {
        return this.request('/personal-info');
    }

    async updatePersonalInfo(personalData) {
        return this.request('/personal-info', {
            method: 'PUT',
            body: JSON.stringify(personalData)
        });
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }
}

// AdminAPI class is ready for initialization
