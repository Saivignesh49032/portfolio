// Web3Forms Email Service Integration
// This file handles email functionality for the portfolio using Web3Forms

class Web3EmailService {
    constructor() {
        this.isInitialized = false;
        this.web3formsConfig = {
            accessKey: 'aa700310-fe6c-4bb6-a5e5-b9696827c78a',
            email: 'saivignesh1857@gmail.com',
            endpoint: 'https://api.web3forms.com/submit'
        };
    }

    async initialize() {
        try {
            // Initialize Web3Forms service
            console.log('Initializing Web3Forms Email Service...');
            this.isInitialized = true;
            console.log('Web3Forms email service initialized successfully');
        } catch (error) {
            console.error('Error initializing email service:', error);
        }
    }

    async sendEmail(formData) {
        if (!this.isInitialized) {
            await this.initialize();
        }

        try {
            const response = await fetch(this.web3formsConfig.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: this.web3formsConfig.accessKey,
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    from_name: formData.name,
                    reply_to: formData.email,
                    to: this.web3formsConfig.email
                })
            });

            const result = await response.json();
            
            if (result.success) {
                console.log('Email sent successfully via Web3Forms');
                return {
                    success: true,
                    messageId: result.messageId || Date.now().toString()
                };
            } else {
                console.error('Web3Forms error:', result.message);
                return {
                    success: false,
                    error: result.message || 'Failed to send email'
                };
            }
        } catch (error) {
            console.error('Error sending email via Web3Forms:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async sendContactForm(data) {
        const { name, email, subject, message } = data;
        
        const formData = {
            name: name,
            email: email,
            subject: `Portfolio Contact: ${subject}`,
            message: `
New contact form submission from your portfolio:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from portfolio contact form
            `.trim()
        };

        return await this.sendEmail(formData);
    }

    async sendFreelanceRequest(data) {
        const { clientName, clientEmail, projectType, budgetRange, projectDetails } = data;
        
        const formData = {
            name: clientName,
            email: clientEmail,
            subject: `Freelance Request: ${projectType}`,
            message: `
New freelance request from your portfolio:

Client Name: ${clientName}
Email: ${clientEmail}
Project Type: ${projectType}
Budget Range: ${budgetRange || 'Not specified'}

Project Details:
${projectDetails}

---
Sent from portfolio freelance request form
            `.trim()
        };

        return await this.sendEmail(formData);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Web3EmailService;
} else {
    window.Web3EmailService = Web3EmailService;
}
