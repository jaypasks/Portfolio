document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeImageModal();
    initializeImageLoading();
    initializeKeyboardNavigation();
    initializeDarkMode();
});

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

function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;

    modal.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
    });

    const modalImg = document.getElementById('modalImage');
    if (modalImg) {
        modalImg.addEventListener('load', function() { this.style.opacity = '1'; });
        modalImg.addEventListener('loadstart', function() { this.style.opacity = '0.5'; });
    }
}

function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (!modal || !modalImg || !img) return;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modalImg.src = img.src;
    modalImg.alt = img.alt;

    setTimeout(() => { modal.style.opacity = '1'; }, 10);

    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;

    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('imageModal');
        if (!modal || modal.style.display === 'none') return;

        switch(event.key) {
            case 'Escape': closeModal(); break;
            case 'ArrowLeft': navigateImage('prev'); break;
            case 'ArrowRight': navigateImage('next'); break;
        }
    });
}

function navigateImage(direction) {
    const currentModalImg = document.getElementById('modalImage');
    const allImages = document.querySelectorAll('.screenshot-img');
    if (!currentModalImg || !allImages.length) return;

    let currentIndex = -1;
    allImages.forEach((img, index) => {
        if (img.src === currentModalImg.src) currentIndex = index;
    });

    if (currentIndex === -1) return;

    const nextIndex = direction === 'next'
        ? (currentIndex + 1) % allImages.length
        : (currentIndex - 1 + allImages.length) % allImages.length;

    currentModalImg.src = allImages[nextIndex].src;
    currentModalImg.alt = allImages[nextIndex].alt;
}

function initializeImageLoading() {
    const images = document.querySelectorAll('.screenshot-img');
    images.forEach(img => {
        img.addEventListener('loadstart', function() { this.style.opacity = '0.5'; });
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        img.addEventListener('error', function() {
            this.style.opacity = '1';
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiNEREREREQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwQzE0LjQ3NzIgMTAgMTAgMTQuNDc3MiAxMCAyMEMxMCAyNS41MjI4IDE0LjQ3NzIgMzAgMjAgMzBDMjUuNTIyOCAzMCAzMCAyNS41MjI4IDMwIDIwQzMwIDE0LjQ3NzIgMjUuNTIyOCAxMCAyMCAxMFpNMjAgMjhDMTUuNTgxNyAyOCAxMiAyNC40MTgzIDEyIDIwQzEyIDE1LjU4MTcgMTUuNTgxNyAxMiAyMCAxMkMyNC40MTgzIDEyIDI4IDE1LjU4MTcgMjggMjBDMjggMjQuNDE4MyAyNC40MTgzIDI4IDIwIDI4WiIgZmlsbD0iI0RERERERCIvPgo8L3N2Zz4KPC9zdmc+';
            this.alt = 'Image not available';
        });
    });
}

function handleResize() {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'block') {
        const modalImg = document.getElementById('modalImage');
        if (modalImg) {
            modalImg.style.maxHeight = (window.innerHeight * 0.9) + 'px';
            modalImg.style.maxWidth = (window.innerWidth * 0.9) + 'px';
        }
    }
}

window.addEventListener('resize', handleResize);

function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        document.body.classList.toggle('light-theme', savedTheme === 'light');
    } else if (systemPrefersDark) {
        document.body.classList.add('dark-theme');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-theme', e.matches);
            document.body.classList.remove('light-theme');
        }
    });

    syncWithMainPortfolioTheme();
}

function syncWithMainPortfolioTheme() {
    const referrer = document.referrer;
    if (referrer.includes('index.html') || referrer.endsWith('/')) {
        const mainTheme = localStorage.getItem('theme');
        if (mainTheme) {
            document.body.classList.toggle('dark-theme', mainTheme === 'dark');
            document.body.classList.toggle('light-theme', mainTheme === 'light');
        }
    }
}

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

window.openModal = openModal;
window.closeModal = closeModal;
window.toggleDarkMode = toggleDarkMode;
