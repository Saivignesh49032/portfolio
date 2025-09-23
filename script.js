// ===== PORTFOLIO SCRIPT =====

// Global variables
let isDarkMode = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initializing...');
    
    // Add touch-friendly interactions for mobile
    addTouchInteractions();
    
    // Initialize mobile navigation immediately
    initializeMobileNavigation();
    
    // Initialize portfolio directly
    initializePortfolio();
});

// ===== TOUCH INTERACTIONS =====
function addTouchInteractions() {
    // Add touch feedback for buttons and interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .skill-card, .project-card, .social-link, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}


// ===== PORTFOLIO INITIALIZATION =====
function initializePortfolio() {
    console.log('Portfolio initializing...');
    
    // Use static data from data.js
    const data = window.portfolioData;
    console.log('Static data loaded:', data);
    console.log('Services in static data:', data.services);
    
    // Initialize all components
    initializeThemeToggle();
    initializeNavigation();
    initializeScrollEffects();
    initializeEmailService();
    initializeContactForm();
    initializeFreelanceForm();
    initializeWhatsAppWidget();
    initializeScrollProgress();
    initializeBackToTop();
    initializeCopyEmail();
    initializeMobileNavigation();
    renderPortfolioContent();
    
    console.log('Portfolio initialized successfully!');
    
    // Add a subtle entrance animation to the main content
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
}

// ===== DATA REFRESH MECHANISM =====
// No longer needed - using static data

// Removed - using static data

// Removed - using static data

// ===== DATA LOADING =====
// Removed - using static data from data.js

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    console.log('Initializing theme toggle...');
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    isDarkMode = savedTheme === 'dark';
    
    // Apply initial theme
    updateTheme();
    
    // Add click event listener
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isDarkMode = !isDarkMode;
        updateTheme();
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        console.log('Theme toggled to:', isDarkMode ? 'dark' : 'light');
    });
    
    function updateTheme() {
        if (isDarkMode) {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Initialize sticky navbar
    initializeStickyNavbar();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== STICKY NAVBAR =====
function initializeStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add scrolled class for styling when scrolled
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    function requestTick() {
        requestAnimationFrame(updateNavbar);
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.skill-card, .project-card, .stat, .skill-category');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale, .animate-bounce').forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Add scroll-triggered animations to sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Hide scroll indicator when scrolling
    let scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }
}

// ===== CONTENT RENDERING =====
function renderPortfolioContent() {
    console.log('Rendering portfolio content...');
    
    // Initialize typewriter effect
    initializeTypewriterEffect();
    
    // Render skills section
    renderSkillsSection();
    
    // Render projects section
    renderProjectsSection();
    
    // Render services section
    renderServicesSection();
    
    console.log('Portfolio content rendered successfully!');
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Store the original HTML content
    const originalHTML = heroTitle.innerHTML;
    
    // Create a simple typewriter effect that preserves HTML
    const textParts = [
        "Hi, I'm ",
        '<span class="highlight">Sai Vignesh S P</span>'
    ];
    
    // Clear content and add typewriter class
    heroTitle.innerHTML = '';
    heroTitle.classList.add('typewriter');
    
    let currentPart = 0;
    let currentChar = 0;
    
    const typeWriter = () => {
        if (currentPart < textParts.length) {
            const part = textParts[currentPart];
            
            if (currentChar < part.length) {
                if (currentPart === 0) {
                    // For the first part, type character by character
                    heroTitle.innerHTML += part.charAt(currentChar);
                } else {
                    // For the second part (highlighted), add it all at once
                    heroTitle.innerHTML += part;
                    currentChar = part.length;
                }
                currentChar++;
                setTimeout(typeWriter, 100);
            } else {
                // Move to next part
                currentPart++;
                currentChar = 0;
                setTimeout(typeWriter, 200);
            }
        } else {
            // Typing complete, remove cursor
            setTimeout(() => {
                heroTitle.classList.remove('typewriter');
            }, 1000);
        }
    };
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1500);
}

function renderSkillsSection() {
    console.log('Rendering skills section...');
    
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) {
        console.error('Skills grid not found!');
        return;
    }
    
    // Clear existing content
    skillsGrid.innerHTML = '';
    
    // Check if data is available
    if (!window.portfolioData || !window.portfolioData.skills) {
        skillsGrid.innerHTML = '<p class="no-content">No skills data available. Please check the data file.</p>';
        return;
    }
    
    const skills = window.portfolioData.skills;
    console.log('Skills data:', skills);
    
    if (skills.length === 0) {
        skillsGrid.innerHTML = '<p class="no-content">No skills available. Add some skills in the admin panel!</p>';
        return;
    }
    
    skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.style.animationDelay = `${index * 0.1}s`;
            skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon || 'fas fa-code'}"></i>
                </div>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
                <div class="skill-level">
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 0%" data-width="${skill.percentage}%"></div>
                    </div>
                <div class="skill-percentage">${skill.percentage}%</div>
                </div>
            `;
            skillsGrid.appendChild(skillCard);
        });
    
    // Animate skill bars
    setTimeout(() => {
        animateSkillBars();
    }, 500);
}

function renderProjectsSection() {
    console.log('Rendering projects section...');
    
    const spotlightContainer = document.getElementById('spotlight-project');
    const projectsContainer = document.getElementById('projects-container');
    
    if (!spotlightContainer || !projectsContainer) {
        console.error('Projects containers not found!');
        return;
    }
    
    // Clear existing content
    spotlightContainer.innerHTML = '';
    projectsContainer.innerHTML = '';
    
    // Check if data is available
    if (!window.portfolioData || !window.portfolioData.projects) {
        spotlightContainer.innerHTML = '<p class="no-content">No projects data available. Please check the data file.</p>';
        projectsContainer.innerHTML = '<p class="no-content">No projects data available. Please check the data file.</p>';
        return;
    }
    
    const projects = window.portfolioData.projects;
    console.log('Projects data:', projects);
    
    if (projects.length === 0) {
        spotlightContainer.innerHTML = '<p class="no-content">No projects available. Add some projects in the admin panel!</p>';
        projectsContainer.innerHTML = '<p class="no-content">No projects available. Add some projects in the admin panel!</p>';
        return;
    }
    
    // Find the first featured project for spotlight
    const featuredProject = projects.find(project => project.featured) || projects[0];
    
    // Render spotlight project
    if (featuredProject) {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'spotlight-project';
        spotlightCard.innerHTML = `
            <div class="spotlight-header">
                <h3 class="spotlight-title-text">
                    ${featuredProject.title}
                    ${featuredProject.featured ? '<span class="spotlight-badge">⭐ Featured</span>' : ''}
                </h3>
                <p class="spotlight-category">${featuredProject.category}</p>
                <p class="spotlight-description">${featuredProject.description}</p>
            </div>
            <div class="spotlight-content">
                <div class="spotlight-tech">
                    ${featuredProject.technologies.map(tech => `<span class="spotlight-tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="spotlight-links">
                    ${featuredProject.github ? `<a href="${featuredProject.github}" target="_blank" class="spotlight-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${featuredProject.demo ? `<a href="${featuredProject.demo}" target="_blank" class="spotlight-link secondary"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `;
        spotlightContainer.appendChild(spotlightCard);
    }
    
    // Render all projects
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-item';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectCard.setAttribute('data-category', project.category.toLowerCase().replace(/\s+/g, '-'));
        projectCard.setAttribute('data-featured', project.featured);
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">
                    ${project.title}
                    ${project.featured ? '<span class="project-badge">⭐ Featured</span>' : ''}
                </h3>
                <p class="project-category">${project.category}</p>
            </div>
            <div class="project-content">
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link secondary"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
    
    // Initialize interactive features
    initializeProjectFilters();
    initializeViewToggle();
    updateProjectStats();
}

// Initialize project filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const featured = item.getAttribute('data-featured') === 'true';
                
                let show = false;
                
                switch (filter) {
                    case 'all':
                        show = true;
                        break;
                    case 'featured':
                        show = featured;
                        break;
                    case 'ml':
                        show = category.includes('machine-learning') || category.includes('ai');
                        break;
                    case 'web':
                        show = category.includes('web');
                        break;
                    case 'data':
                        show = category.includes('data');
                        break;
                }
                
                if (show) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Initialize view toggle
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const projectsContainer = document.getElementById('projects-container');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const view = button.getAttribute('data-view');
            
            // Update container class
            projectsContainer.className = `projects-container ${view}`;
        });
    });
}

// Update project statistics
function updateProjectStats() {
    const projects = window.portfolioData.projects || [];
    const featuredProjects = projects.filter(project => project.featured);
    const allTechnologies = new Set();
    const allCategories = new Set();
    
    projects.forEach(project => {
        project.technologies.forEach(tech => allTechnologies.add(tech));
        allCategories.add(project.category);
    });
    
    // Animate counters
    animateCounter('total-projects', projects.length);
    animateCounter('featured-count', featuredProjects.length);
    animateCounter('technologies-count', allTechnologies.size);
    animateCounter('categories-count', allCategories.size);
}

// Animate counter numbers
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 30);
}

// ===== SERVICES RENDERING =====
function renderServicesSection() {
    console.log('Rendering services section...');
    
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) {
        console.error('Services grid not found!');
        return;
    }
    
    // Check if services are already hardcoded in HTML
    const existingServices = servicesGrid.querySelectorAll('.service-hexagon');
    if (existingServices.length > 0) {
        console.log('Services already exist in HTML, setting up interactions');
        setupServiceInteractions();
        // Hide refresh button since services are already loaded
        const refreshBtn = document.getElementById('refresh-services-btn');
        if (refreshBtn) {
            refreshBtn.style.display = 'none';
        }
        return;
    }
    
    // Clear existing content only if no hardcoded services
    servicesGrid.innerHTML = '';
    
    // Check if data is available
    if (!window.portfolioData) {
        console.log('No portfolio data found');
        servicesGrid.innerHTML = '<p class="no-content">No portfolio data available. Please check the data file.</p>';
        return;
    }
    
    if (!window.portfolioData.services) {
        console.log('No services array found in portfolio data');
        servicesGrid.innerHTML = '<p class="no-content">No services data available. Please check the data file.</p>';
        return;
    }
    
    const services = window.portfolioData.services;
    console.log('Services data:', services);
    console.log('Number of services:', services.length);
    
    if (services.length === 0) {
        servicesGrid.innerHTML = '<p class="no-content">No services available. Add some services in the admin panel!</p>';
        // Show refresh button
        const refreshBtn = document.getElementById('refresh-services-btn');
        if (refreshBtn) {
            refreshBtn.style.display = 'inline-flex';
        }
        return;
    }
    
    // Hide refresh button if services are loaded
    const refreshBtn = document.getElementById('refresh-services-btn');
    if (refreshBtn) {
        refreshBtn.style.display = 'none';
    }
    
    services.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = `service-card animate-on-scroll ${service.featured ? 'featured' : ''}`;
        serviceCard.style.animationDelay = `${index * 0.1}s`;
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon || 'fas fa-cog'}"></i>
            </div>
            <h3>${service.title} ${service.featured ? '<span class="featured-badge">⭐</span>' : ''}</h3>
            <p>${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

// ===== SERVICE INTERACTIONS =====
function setupServiceInteractions() {
    const hexagons = document.querySelectorAll('.service-hexagon');
    const overlay = document.createElement('div');
    overlay.className = 'service-overlay';
    document.body.appendChild(overlay);
    
    hexagons.forEach(hexagon => {
        hexagon.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close any open service
            document.querySelectorAll('.service-hexagon').forEach(h => h.classList.remove('active'));
            overlay.classList.remove('active');
            
            // Open clicked service
            hexagon.classList.add('active');
            overlay.classList.add('active');
        });
    });
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
        document.querySelectorAll('.service-hexagon').forEach(h => h.classList.remove('active'));
        overlay.classList.remove('active');
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.service-hexagon').forEach(h => h.classList.remove('active'));
            overlay.classList.remove('active');
        }
    });
}

// ===== ANIMATIONS =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// ===== EMAIL SERVICE INITIALIZATION =====
function initializeEmailService() {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('form-subject');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send email using Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'aa700310-fe6c-4bb6-a5e5-b9696827c78a',
                    name: name,
                    email: email,
                    subject: `Portfolio Contact: ${subject}`,
                    message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
                    from_name: name,
                    reply_to: email,
                    to: 'saivignesh1857@gmail.com'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
            } else {
                throw new Error(result.message || 'Failed to send email');
            }
            
        } catch (error) {
            console.error('Email sending error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== FREELANCE FORM =====
function initializeFreelanceForm() {
    const freelanceForm = document.getElementById('freelance-form');
    if (!freelanceForm) return;
    
    freelanceForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const clientName = formData.get('clientName');
        const clientEmail = formData.get('clientEmail');
        const projectType = formData.get('projectType');
        const budgetRange = formData.get('budgetRange');
        const projectDescription = formData.get('projectDescription');
        
        // Validation
        if (!clientName || !clientEmail || !projectType || !projectDescription) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(clientEmail)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.disabled = true;
        
        try {
            // Send email using Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'aa700310-fe6c-4bb6-a5e5-b9696827c78a',
                    name: clientName,
                    email: clientEmail,
                    subject: `New Freelance Request: ${projectType}`,
                    message: `New freelance request from your portfolio:

Client Name: ${clientName}
Email: ${clientEmail}
Project Type: ${projectType}
Budget Range: ${budgetRange || 'Not specified'}

Project Description:
${projectDescription}

---
Sent from portfolio freelance request form`,
                    from_name: clientName,
                    reply_to: clientEmail,
                    to: 'saivignesh1857@gmail.com'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Thank you! Your freelance request has been submitted successfully. I\'ll get back to you within 24 hours!', 'success');
                this.reset();
            } else {
                throw new Error(result.message || 'Failed to submit request');
            }
            
        } catch (error) {
            console.error('Freelance request error:', error);
            showNotification('Failed to submit request. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== WHATSAPP WIDGET =====
function initializeWhatsAppWidget() {
    const whatsappChat = document.getElementById('whatsapp-chat');
    const whatsappClose = document.getElementById('whatsapp-close');
    const whatsappSend = document.getElementById('whatsapp-send');
    const whatsappContactBtn = document.getElementById('whatsapp-contact-btn');
    const actionButtons = document.querySelectorAll('.whatsapp-action-btn');
    
    if (!whatsappChat) return;
    
    // Contact section WhatsApp button - opens chat directly
    if (whatsappContactBtn) {
        whatsappContactBtn.addEventListener('click', () => {
            whatsappChat.classList.add('active');
        });
    }
    
    // Close chat
    whatsappClose.addEventListener('click', () => {
        whatsappChat.classList.remove('active');
    });
    
    // Handle action button clicks
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-message');
            addUserMessage(message);
            
            // Auto-respond based on message
            setTimeout(() => {
                addBotResponse(message);
            }, 1000);
        });
    });
    
    // Handle WhatsApp send button
    whatsappSend.addEventListener('click', () => {
        const messages = document.querySelectorAll('.whatsapp-message.user-message');
        let finalMessage = '';
        
        if (messages.length > 0) {
            // Get the last user message
            const lastMessage = messages[messages.length - 1];
            finalMessage = lastMessage.querySelector('p').textContent;
        } else {
            finalMessage = 'Hi! I\'m interested in your services.';
        }
        
        // Open WhatsApp with pre-filled message
        openWhatsApp(finalMessage);
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!whatsappChat.contains(e.target) && !whatsappContactBtn.contains(e.target)) {
            whatsappChat.classList.remove('active');
        }
    });
}

function addUserMessage(message) {
    const messagesContainer = document.querySelector('.whatsapp-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'whatsapp-message user-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotResponse(userMessage) {
    const messagesContainer = document.querySelector('.whatsapp-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'whatsapp-message bot-message';
    
    let response = '';
    
    if (userMessage.includes('website')) {
        response = 'Great! I can help you build a modern, responsive website. I specialize in React, Node.js, and modern web technologies. What type of website do you need?';
    } else if (userMessage.includes('AI/ML')) {
        response = 'Excellent! I love working on AI/ML projects. I can help with machine learning models, data analysis, computer vision, and NLP solutions. What specific AI solution do you need?';
    } else if (userMessage.includes('project')) {
        response = 'Perfect! I\'d love to discuss your project. I can help with web development, AI/ML solutions, mobile apps, and technical consulting. What\'s your project about?';
    } else if (userMessage.includes('consulting')) {
        response = 'I\'d be happy to provide technical consulting! I can help with architecture decisions, technology selection, code reviews, and technical guidance. What do you need help with?';
    } else {
        response = 'Thanks for your interest! I\'m here to help with your development needs. Feel free to ask me anything about web development, AI/ML, or technical consulting.';
    }
    
    messageDiv.innerHTML = `<p>${response}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function openWhatsApp(message) {
    const phoneNumber = '7899522804'; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the chat widget
    const whatsappChat = document.getElementById('whatsapp-chat');
    if (whatsappChat) {
        whatsappChat.classList.remove('active');
    }
    
    // Show success notification
    showNotification('Opening WhatsApp...', 'success');
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});


// ===== PIN AUTHENTICATION SYSTEM =====
const ADMIN_PIN = '260104';

// Initialize PIN authentication
function initializePinAuth() {
    const adminLink = document.getElementById('admin-link');
    const pinModal = document.getElementById('pin-modal');
    const pinForm = document.getElementById('pin-form');
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    const pinModalClose = document.getElementById('pin-modal-close');

    // Show PIN modal when admin link is clicked
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPinModal();
        });
    }

    // Handle PIN form submission
    if (pinForm) {
        pinForm.addEventListener('submit', handlePinSubmit);
    }

    // Close modal when close button is clicked
    if (pinModalClose) {
        pinModalClose.addEventListener('click', hidePinModal);
    }

    // Close modal when clicking outside
    if (pinModal) {
        pinModal.addEventListener('click', function(e) {
            if (e.target === pinModal) {
                hidePinModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !pinModal.classList.contains('hidden')) {
            hidePinModal();
        }
    });
}

function showPinModal() {
    const pinModal = document.getElementById('pin-modal');
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    
    if (pinModal) {
        pinModal.classList.remove('hidden');
        // Hide any previous error
        if (pinError) {
            pinError.classList.add('hidden');
            pinError.style.display = 'none';
        }
        // Focus on PIN input
        setTimeout(() => {
            if (pinInput) {
                pinInput.focus();
            }
        }, 100);
    }
}

function hidePinModal() {
    const pinModal = document.getElementById('pin-modal');
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    
    if (pinModal) {
        pinModal.classList.add('hidden');
        // Clear input and error
        if (pinInput) {
            pinInput.value = '';
        }
        if (pinError) {
            pinError.classList.add('hidden');
            pinError.style.display = 'none';
        }
    }
}

function handlePinSubmit(e) {
    e.preventDefault();
    
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error');
    const enteredPin = pinInput.value;
    
    // Hide previous error
    if (pinError) {
        pinError.classList.add('hidden');
        pinError.style.display = 'none';
    }
    
    if (enteredPin === ADMIN_PIN) {
        // Correct PIN - set authentication and redirect to admin
        sessionStorage.setItem('adminAuthenticated', 'true');
        window.location.href = 'admin.html';
    } else {
        // Incorrect PIN - show error
        if (pinError) {
            pinError.classList.remove('hidden');
            pinError.style.display = 'block';
        }
        if (pinInput) {
            pinInput.value = '';
            pinInput.focus();
            
            // Add shake animation
            pinInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                pinInput.style.animation = '';
            }, 500);
        }
    }
}

// ===== SCROLL PROGRESS BAR =====
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Throttled scroll event for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Throttled scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(toggleBackToTop);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== COPY EMAIL BUTTON =====
function initializeCopyEmail() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (!copyEmailBtn) return;
    
    const email = 'saivignesh1857@gmail.com';
    
    copyEmailBtn.addEventListener('click', async () => {
        try {
            // Use modern clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            // Visual feedback
            copyEmailBtn.classList.add('copied');
            showNotification('Email copied to clipboard!', 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy email:', err);
            showNotification('Failed to copy email', 'error');
        }
    });
}

// ===== MOBILE NAVIGATION =====
function initializeMobileNavigation() {
    console.log('Initializing mobile navigation...');
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Mobile menu elements found:', {
        toggle: !!mobileMenuToggle,
        menu: !!navMenu,
        links: navLinks.length
    });
    
    if (!mobileMenuToggle || !navMenu) {
        console.error('Mobile menu elements not found!');
        return;
    }
    
    // Toggle mobile menu function
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('Mobile menu closed');
        } else {
            // Open menu
            mobileMenuToggle.classList.add('active');
            navMenu.classList.add('active');
            document.body.classList.add('menu-open');
            console.log('Mobile menu opened');
        }
    }
    
    // Toggle mobile menu on button click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Mobile menu toggle clicked');
        toggleMobileMenu();
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            console.log(`Nav link ${index} clicked, closing menu`);
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                console.log('Clicked outside menu, closing');
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            console.log('Escape key pressed, closing menu');
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            console.log('Window resized to desktop, closing menu');
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    console.log('Mobile navigation initialized successfully');
    
    // Fallback: Simple click handler for mobile menu
    setTimeout(() => {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            console.log('Adding fallback mobile menu handler');
            
            toggle.addEventListener('click', function() {
                console.log('Fallback mobile menu clicked');
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
    }, 1000);
}

// Initialize PIN authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePinAuth();
});
