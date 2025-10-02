// ===== STATIC PORTFOLIO DATA =====
// This file contains all the portfolio data for static hosting

window.portfolioData = {
    personalInfo: {
        name: "Sai Vignesh S P",
        title: "AI/ML Engineer & Software Developer",
        bio: "Innovative AI/ML Engineer & Software Developer with a passion for building intelligent and scalable solutions.",
        email: "saivignesh1857@gmail.com",
        phone: "+91 7899522804",
        location: "Chennai, India",
        resume: "resume.pdf"
    },
    
    skills: [
        { name: "JavaScript", percentage: 90, category: "Frontend", description: "Modern ES6+ JavaScript with async/await, modules, and advanced features" },
        { name: "Node.js", percentage: 80, category: "Backend", description: "Server-side JavaScript with Express, REST APIs, and middleware" },
        { name: "Python", percentage: 75, category: "Backend", description: "Python programming with Flask, Django, and data science libraries" },
        { name: "HTML/CSS", percentage: 95, category: "Frontend", description: "Semantic HTML5, CSS3, Flexbox, Grid, and responsive design" },
        { name: "Git", percentage: 80, category: "Tools", description: "Version control, branching strategies, and collaborative development" }
    ],
    
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, payment integration, and admin dashboard.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            github: "https://github.com/yourusername/ecommerce",
            live: "https://your-ecommerce-demo.com",
            featured: true,
            category: "Full Stack"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
            technologies: ["Vue.js", "Firebase", "CSS3"],
            github: "https://github.com/yourusername/taskapp",
            live: "https://your-taskapp-demo.com",
            featured: true,
            category: "Frontend"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
            technologies: ["JavaScript", "API Integration", "Chart.js"],
            github: "https://github.com/yourusername/weather",
            live: "https://your-weather-demo.com",
            featured: false,
            category: "Frontend"
        },
        {
            id: 4,
            title: "Blog CMS",
            description: "A content management system for blogs with markdown support, SEO optimization, and comment system.",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
            technologies: ["Next.js", "Prisma", "PostgreSQL"],
            github: "https://github.com/yourusername/blog-cms",
            live: "https://your-blog-demo.com",
            featured: false,
            category: "Full Stack"
        }
    ],
    
    services: [
        {
            id: 1,
            title: "Web Development",
            icon: "fas fa-code",
            description: "Custom web applications built with modern technologies and best practices.",
            features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Cross-browser Compatibility"],
            price: "Starting at $500"
        },
        {
            id: 2,
            title: "UI/UX Design",
            icon: "fas fa-paint-brush",
            description: "Beautiful and intuitive user interfaces that enhance user experience.",
            features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
            price: "Starting at $300"
        },
        {
            id: 3,
            title: "Mobile App Development",
            icon: "fas fa-mobile-alt",
            description: "Native and cross-platform mobile applications for iOS and Android.",
            features: ["React Native", "Flutter", "Native Development", "App Store Optimization"],
            price: "Starting at $800"
        },
        {
            id: 4,
            title: "E-commerce Solutions",
            icon: "fas fa-shopping-cart",
            description: "Complete e-commerce platforms with payment integration and admin panels.",
            features: ["Payment Gateway Integration", "Inventory Management", "Order Tracking", "Analytics Dashboard"],
            price: "Starting at $1000"
        },
        {
            id: 5,
            title: "API Development",
            icon: "fas fa-server",
            description: "RESTful APIs and microservices for scalable backend solutions.",
            features: ["RESTful Design", "Authentication", "Rate Limiting", "Documentation"],
            price: "Starting at $400"
        },
        {
            id: 6,
            title: "Database Design",
            icon: "fas fa-database",
            description: "Efficient database design and optimization for better performance.",
            features: ["Schema Design", "Query Optimization", "Data Migration", "Backup Solutions"],
            price: "Starting at $350"
        },
        {
            id: 7,
            title: "Cloud Solutions",
            icon: "fas fa-cloud",
            description: "Cloud deployment and infrastructure management for scalable applications.",
            features: ["AWS/Azure/GCP", "Docker Containers", "CI/CD Pipeline", "Monitoring"],
            price: "Starting at $600"
        },
        {
            id: 8,
            title: "Technical Consulting",
            icon: "fas fa-lightbulb",
            description: "Expert advice on technology choices and architecture decisions.",
            features: ["Technology Assessment", "Code Review", "Performance Analysis", "Best Practices"],
            price: "Starting at $200/hour"
        }
    ],
    
    experience: [
        {
            company: "Tech Solutions Inc.",
            position: "Senior Full Stack Developer",
            duration: "2022 - Present",
            description: "Leading development of web applications and mentoring junior developers.",
            technologies: ["React", "Node.js", "AWS", "MongoDB"]
        },
        {
            company: "Digital Agency",
            position: "Frontend Developer",
            duration: "2020 - 2022",
            description: "Developed responsive websites and user interfaces for various clients.",
            technologies: ["Vue.js", "JavaScript", "CSS3", "Figma"]
        }
    ],
    
    education: [
        {
            degree: "Bachelor of Technology",
            field: "Computer Science",
            institution: "Anna University",
            year: "2016 - 2020",
            gpa: "8.5/10"
        }
    ]
};

// Make data available globally
console.log('Static portfolio data loaded:', window.portfolioData);
