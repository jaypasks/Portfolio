/**
 * FRASS Screenshots Page JavaScript
 * Handles modal functionality, image loading, and user interactions
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeImageModal();
    initializeImageLoading();
    initializeKeyboardNavigation();
    initializeDarkMode();
});

/**
 * Initialize AOS (Animate On Scroll) library
 */
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

/**
 * Initialize image modal functionality
 */
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (!modal) return;
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Add loading state to modal
    const modalImg = document.getElementById('modalImage');
    if (modalImg) {
        modalImg.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        modalImg.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
    }
}

/**
 * Open modal with image
 * @param {HTMLImageElement} img - The image element that was clicked
 */
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (!modal || !modalImg || !img) return;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Set image source
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    // Add fade-in animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Focus on close button for accessibility
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.focus();
    }
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('imageModal');
    
    if (!modal) return;
    
    // Add fade-out animation
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }, 300);
}

/**
 * Initialize keyboard navigation
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('imageModal');
        
        if (!modal || modal.style.display === 'none') return;
        
        switch(event.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                navigateImage('prev');
                break;
            case 'ArrowRight':
                navigateImage('next');
                break;
        }
    });
}

/**
 * Navigate between images in modal
 * @param {string} direction - 'prev' or 'next'
 */
function navigateImage(direction) {
    const currentModalImg = document.getElementById('modalImage');
    const allImages = document.querySelectorAll('.screenshot-img');
    
    if (!currentModalImg || !allImages.length) return;
    
    // Find current image index
    let currentIndex = -1;
    allImages.forEach((img, index) => {
        if (img.src === currentModalImg.src) {
            currentIndex = index;
        }
    });
    
    if (currentIndex === -1) return;
    
    // Calculate next index
    let nextIndex;
    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % allImages.length;
    } else {
        nextIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    }
    
    // Update modal image
    const nextImg = allImages[nextIndex];
    currentModalImg.src = nextImg.src;
    currentModalImg.alt = nextImg.alt;
}

/**
 * Initialize image loading with error handling
 */
function initializeImageLoading() {
    const images = document.querySelectorAll('.screenshot-img');
    
    images.forEach(img => {
        // Add loading placeholder
        img.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
        
        // Remove loading state when loaded
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        // Handle loading errors
        img.addEventListener('error', function() {
            this.style.opacity = '1';
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiNEREREREQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwQzE0LjQ3NzIgMTAgMTAgMTQuNDc3MiAxMCAyMEMxMCAyNS41MjI4IDE0LjQ3NzIgMzAgMjAgMzBDMjUuNTIyOCAzMCAzMCAyNS41MjI4IDMwIDIwQzMwIDE0LjQ3NzIgMjUuNTIyOCAxMCAyMCAxMFpNMjAgMjhDMTUuNTgxNyAyOCAxMiAyNC40MTgzIDEyIDIwQzEyIDE1LjU4MTcgMTUuNTgxNyAxMiAyMCAxMkMyNC40MTgzIDEyIDI4IDE1LjU4MTcgMjggMjBDMjggMjQuNDE4MyAyNC40MTgzIDI4IDIwIDI4WiIgZmlsbD0iI0RERERERCIvPgo8L3N2Zz4KPC9zdmc+';
            this.alt = 'Image not available';
            console.warn('Failed to load image:', this.dataset.originalSrc || this.src);
        });
    });
}

/**
 * Smooth scroll to top function
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Add scroll-to-top functionality
 */
function initializeScrollToTop() {
    // Create scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.onclick = scrollToTop;
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

/**
 * Initialize lazy loading for images (optional enhancement)
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Handle window resize for responsive adjustments
 */
function handleResize() {
    // Adjust modal size on window resize
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'block') {
        const modalImg = document.getElementById('modalImage');
        if (modalImg) {
            // Recalculate modal image size
            modalImg.style.maxHeight = (window.innerHeight * 0.9) + 'px';
            modalImg.style.maxWidth = (window.innerWidth * 0.9) + 'px';
        }
    }
}

// Add resize listener
window.addEventListener('resize', handleResize);

/**
 * Analytics tracking (optional)
 */
function trackImageView(imageName) {
    // Add your analytics tracking code here
    console.log('Image viewed:', imageName);
}

/**
 * Initialize dark mode functionality
 */
function initializeDarkMode() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        document.body.classList.toggle('light-theme', savedTheme === 'light');
    } else if (systemPrefersDark) {
        document.body.classList.add('dark-theme');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-theme', e.matches);
            document.body.classList.remove('light-theme');
        }
    });

    // Sync with main portfolio theme if available
    syncWithMainPortfolioTheme();
}

/**
 * Sync theme with main portfolio
 */
function syncWithMainPortfolioTheme() {
    // Check if we're coming from the main portfolio
    const referrer = document.referrer;
    if (referrer.includes('index.html') || referrer.endsWith('/')) {
        // Try to get theme from main portfolio's localStorage
        const mainTheme = localStorage.getItem('theme');
        if (mainTheme) {
            document.body.classList.toggle('dark-theme', mainTheme === 'dark');
            document.body.classList.toggle('light-theme', mainTheme === 'light');
        }
    }
}

/**
 * Toggle dark mode (for potential future use)
 */
function toggleDarkMode() {
    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * Export functions for global access
 */
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleDarkMode = toggleDarkMode;
