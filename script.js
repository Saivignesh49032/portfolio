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
    
    // Initialize all components first
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
    initializePinAuth();
    initializeTimelineAnimations();
    initializeAllInteractiveFeatures();
    
    // Try to load data from backend
    loadPortfolioData().then((data) => {
        console.log('Data loaded successfully from backend:', data);
        renderPortfolioContent();
        
        // Add a subtle entrance animation to the main content
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
        
        console.log('Portfolio initialized successfully!');
    }).catch((error) => {
        console.log('Backend not available, using static data:', error.message);
        
        // Use static data from data.js
        if (window.portfolioData) {
            console.log('Using static portfolio data:', window.portfolioData);
            renderPortfolioContent();
        } else {
            console.log('No static data available, using hardcoded fallback');
            // Ensure hero section shows name even without data
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.innerHTML = `Hi, I'm <span class="highlight">Sai Vignesh S P</span>`;
            }
        }
        
        console.log('Portfolio initialized with static data!');
    });
    
    // Set up periodic refresh to check for admin changes
    setInterval(async () => {
        try {
            const response = await fetch('/api/portfolio');
            if (response.ok) {
                const newData = await response.json();
                if (JSON.stringify(newData) !== JSON.stringify(window.portfolioData)) {
                    console.log('Data changed, refreshing portfolio...');
                    window.portfolioData = newData;
                    renderPortfolioContent();
                }
            }
        } catch (error) {
            console.log('Error checking for updates:', error.message);
        }
    }, 5000); // Check every 5 seconds
}

// ===== DATA REFRESH MECHANISM =====
// No longer needed - using static data

// Removed - using static data

// Removed - using static data

// ===== DATA LOADING =====
async function loadPortfolioData() {
    try {
        console.log('Fetching portfolio data from backend...');
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        window.portfolioData = data;
        console.log('Portfolio data loaded from backend:', data);
        console.log('Services count:', data.services ? data.services.length : 'No services array');
        console.log('Skills count:', data.skills ? data.skills.length : 'No skills array');
        return data;
    } catch (error) {
        console.error('Error loading portfolio data from backend:', error);
        // Always try to use backend data, don't fall back to static data
        console.log('Retrying backend data fetch...');
        // Retry once more
        try {
            const response = await fetch('/api/portfolio');
            if (response.ok) {
                const data = await response.json();
                window.portfolioData = data;
                console.log('Portfolio data loaded from backend on retry:', data);
                return data;
            }
        } catch (retryError) {
            console.error('Retry also failed:', retryError);
        }
        throw error;
    }
}

// ===== DATA REFRESH =====
async function refreshPortfolioData() {
    try {
        console.log('Refreshing portfolio data...');
        const data = await loadPortfolioData();
        
        // Re-render all sections with fresh data
        renderSkillsSection();
        renderProjectsSection();
        renderServicesSection();
        
        console.log('Portfolio data refreshed successfully');
        return data;
    } catch (error) {
        console.error('Error refreshing portfolio data:', error);
    }
}

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
    
    // Update hero section with dynamic data
    updateHeroSection();
    
    // Initialize typewriter effect (disabled for now)
    // initializeTypewriterEffect();
    
    // Render skills section
    renderSkillsSection();
    
    // Render projects section
    renderProjectsSection();
    
    // Render services section
    renderServicesSection();
    
    console.log('Portfolio content rendered successfully!');
}

// ===== HERO SECTION UPDATE =====
function updateHeroSection() {
    console.log('Updating hero section...');
    console.log('Portfolio data:', window.portfolioData);
    
    const personalInfo = window.portfolioData?.personalInfo;
    console.log('Personal info:', personalInfo);
    
    if (!personalInfo) {
        console.log('No personal info found, using fallback');
        // Use fallback data
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `Hi, I'm <span class="highlight">Sai Vignesh S P</span>`;
        }
        return;
    }
    
    // Update hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        console.log('Updating hero title with:', personalInfo.name);
        heroTitle.innerHTML = `Hi, I'm <span class="highlight">${personalInfo.name}</span>`;
    } else {
        console.log('Hero title element not found!');
    }
    
    // Update hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = personalInfo.title || 'AI/ML Engineer & Software Developer';
    }
    
    // Update hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.textContent = personalInfo.bio || 'Passionate about transforming innovative ideas into real-world tech solutions. Specializing in Artificial Intelligence, Machine Learning, and Full-Stack Development.';
    }
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Get the name from the data
    const name = window.portfolioData?.personalInfo?.name || 'Sai Vignesh S P';
    
    // First, ensure the name is visible immediately
    heroTitle.innerHTML = `Hi, I'm <span class="highlight">${name}</span>`;
    
    // Store the original HTML content
    const originalHTML = heroTitle.innerHTML;
    
    // Create a simple typewriter effect that preserves HTML
    const textParts = [
        "Hi, I'm ",
        `<span class="highlight">${name}</span>`
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
                     ${project.github ? `<a href="${project.github}" target="_blank" class="project-link github"><i class="fab fa-github"></i> GitHub</a>` : ''}
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
    console.log('Checking for existing services...', existingServices.length);
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

// ===== TIMELINE ANIMATIONS =====
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== INTERACTIVE FEATURES =====

// Custom Cursor
function initializeCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorOutline = cursor.querySelector('.cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic], .interactive-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Mouse Trail Effect
function initializeMouseTrail() {
    const trail = document.getElementById('mouse-trail');
    let trailElements = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const trailElement = document.createElement('div');
        trailElement.className = 'trail-dot';
        trailElement.style.cssText = `
            position: absolute;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.8;
            transition: all 0.3s ease;
        `;
        
        trail.appendChild(trailElement);
        trailElements.push(trailElement);
        
        if (trailElements.length > maxTrailLength) {
            const oldElement = trailElements.shift();
            oldElement.style.opacity = '0';
            setTimeout(() => oldElement.remove(), 300);
        }
        
        // Fade out trail elements
        trailElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'scale(0)';
            }, index * 50);
        });
    });
}

// Magnetic Effect
function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                element.style.transform = 'translate(0, 0)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// 3D Tilt Effect
function initializeTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Interactive Text Effects
function initializeTextEffects() {
    const interactiveTexts = document.querySelectorAll('.interactive-text');
    
    interactiveTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
        });
        
        text.addEventListener('mouseleave', () => {
            text.style.textShadow = 'none';
        });
    });
}

// Button Ripple Effect
function initializeRippleEffect() {
    const buttons = document.querySelectorAll('.interactive-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = button.querySelector('.btn-ripple');
            if (ripple) {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 600);
            }
        });
    });
}

// Floating Shapes Animation
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Random movement
        setInterval(() => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 5000 + (index * 1000));
    });
}

// Scroll-triggered Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Interactive Grid Hover Effects
function initializeGridInteractions() {
    const gridElements = document.querySelectorAll('.interactive-grid .skill-card, .interactive-grid .project-card');
    
    gridElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-8px) scale(1.05)';
            element.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
            element.style.boxShadow = 'none';
        });
    });
}

// Timeline Interactive Effects
function initializeTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.interactive-timeline .timeline-item');
    const featureItems = document.querySelectorAll('.interactive-timeline .feature-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.02)';
            item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'none';
        });
    });
}

// Parallax Effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.interactive-card, .interactive-text');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Sound Effects (Optional)
function initializeSoundEffects() {
    const interactiveElements = document.querySelectorAll('.interactive-btn, .interactive-card, .interactive-social');
    
    // Create audio context for subtle sound effects
    let audioContext;
    
    function createSound(frequency, duration) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            createSound(800, 0.1);
        });
    });
}

// Initialize all interactive features
function initializeAllInteractiveFeatures() {
    initializeCustomCursor();
    initializeMouseTrail();
    initializeMagneticEffect();
    initializeTiltEffect();
    initializeTextEffects();
    initializeRippleEffect();
    initializeFloatingShapes();
    initializeScrollAnimations();
    initializeGridInteractions();
    initializeTimelineInteractions();
    initializeParallaxEffect();
    // initializeSoundEffects(); // Uncomment for sound effects
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

// ===== AUTO REFRESH =====
function initializeAutoRefresh() {
    console.log('Auto refresh disabled - manual refresh only');
    // Completely disabled auto-refresh to prevent excessive API calls
}

// Initialize PIN authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePinAuth();
});
