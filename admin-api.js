// Admin API Client
class AdminAPI {
    constructor() {
        this.baseURL = window.location.origin;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/api${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
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

// Make API available globally
window.adminAPI = new AdminAPI();
