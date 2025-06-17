// Main JavaScript functionality for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initContactForm();
    initSmoothScrolling();
    initActiveNavigation();
    initTypingEffect();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme, themeIcon);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, icon) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

function validateForm(name, email, subject, message) {
    // Remove any existing error messages
    removeMessages();
    
    let isValid = true;
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showMessage('Please enter a valid name (at least 2 characters).', 'error');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        isValid = false;
    }
    
    // Validate subject
    if (!subject || subject.trim().length < 3) {
        showMessage('Please enter a subject (at least 3 characters).', 'error');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showMessage('Please enter a message (at least 10 characters).', 'error');
        isValid = false;
    }
    
    return isValid;
}

function showMessage(text, type) {
    const contactForm = document.getElementById('contact-form');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

function removeMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => message.remove());
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on load
    updateActiveNav();
}

// Typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const nameSpan = titleElement.querySelector('.highlight');
    
    if (nameSpan) {
        const name = nameSpan.textContent;
        const beforeName = originalText.split('<span class="highlight">')[0];
        const afterName = originalText.split('</span>')[1];
        
        // Clear the title
        titleElement.innerHTML = beforeName;
        
        // Type the name character by character
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < name.length) {
                if (i === 0) {
                    titleElement.innerHTML = beforeName + '<span class="highlight">' + name.charAt(i);
                } else {
                    const currentSpan = titleElement.querySelector('.highlight');
                    currentSpan.textContent += name.charAt(i);
                }
                i++;
            } else {
                titleElement.innerHTML = beforeName + '<span class="highlight">' + name + '</span>' + afterName;
                clearInterval(typeInterval);
            }
        }, 100);
    }
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        }
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'assets/images/profile.jpg',
        'assets/images/about.jpg',
        'assets/images/projects/project1.jpg',
        'assets/images/projects/project2.jpg',
        'assets/images/projects/project3.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();
