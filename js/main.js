document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initActiveNavigation();
    initTypingEffect();
});

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

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
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

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

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const originalText = titleElement.innerHTML;
    const nameSpan = titleElement.querySelector('.highlight');

    if (nameSpan) {
        const name = nameSpan.textContent;
        const beforeName = originalText.split('<span class="highlight">')[0];
        const afterName = originalText.split('</span>')[1];
        titleElement.innerHTML = beforeName;

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

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#F5EFE0';
        navbar.style.boxShadow = '0 1px 8px rgba(44,36,22,0.12)';
    } else {
        navbar.style.backgroundColor = '#F5EFE0';
        navbar.style.boxShadow = 'none';
    }
});

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
