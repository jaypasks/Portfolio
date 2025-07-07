/**
 * Neumorphism Theme Toggle Functionality
 * Handles light/dark mode switching with neumorphism design
 */

// Theme management
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Update toggle icon
        this.updateToggleIcon();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateToggleIcon();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation class for smooth transition
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    updateToggleIcon() {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
                this.themeToggle.setAttribute('aria-label', 'Switch to light mode');
                this.themeToggle.setAttribute('title', 'Switch to light mode');
            } else {
                icon.className = 'fas fa-moon';
                this.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                this.themeToggle.setAttribute('title', 'Switch to dark mode');
            }
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Smooth theme transition styles
const themeTransitionStyles = `
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *:before,
    .theme-transitioning *:after {
        transition: all 0.3s ease !important;
        transition-delay: 0 !important;
    }
`;

// Add transition styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = themeTransitionStyles;
document.head.appendChild(styleSheet);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
