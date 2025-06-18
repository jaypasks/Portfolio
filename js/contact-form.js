/**
 * Contact Form with EmailJS Integration
 * Handles form submission and email sending functionality
 */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_wnljfbw',
    templateID: 'template_xkoc4bn',
    publicKey: 'OJ1kYlW1e1q6HwuuN'
};

// Initialize EmailJS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    initializeContactForm();
});

/**
 * Initialize EmailJS with public key
 */
function initializeEmailJS() {
    try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
    }
}

/**
 * Initialize contact form event listeners
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add input validation listeners
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

/**
 * Handle form submission
 * @param {Event} event - Form submission event
 */
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form before submission
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Disable submit button and show loading state
    setSubmitButtonState(submitButton, true);
    
    try {
        // Prepare template parameters
        const templateParams = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim(),
            time: new Date().toLocaleString()
        };
        
        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        
        // Reset form
        form.reset();
        clearAllFieldErrors(form);
        
    } catch (error) {
        console.error('Failed to send email:', error);
        
        // Show error message
        showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        
    } finally {
        // Re-enable submit button
        setSubmitButtonState(submitButton, false);
    }
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateForm(form) {
    let isValid = true;
    
    // Validate name
    const name = form.name.value.trim();
    if (!name || name.length < 2) {
        showFieldError(form.name, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const email = form.email.value.trim();
    if (!isValidEmail(email)) {
        showFieldError(form.email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    const subject = form.subject.value.trim();
    if (!subject || subject.length < 3) {
        showFieldError(form.subject, 'Please enter a subject (at least 3 characters)');
        isValid = false;
    }
    
    // Validate message
    const message = form.message.value.trim();
    if (!message || message.length < 10) {
        showFieldError(form.message, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate individual field
 * @param {Event} event - Blur event
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (field.name) {
        case 'name':
            if (value && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (value && value.length < 3) {
                showFieldError(field, 'Subject must be at least 3 characters');
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
            }
            break;
    }
}

/**
 * Clear field error on input
 * @param {Event} event - Input event
 */
function clearFieldError(event) {
    const field = event.target || event;
    clearFieldError(field);
}

/**
 * Show field error
 * @param {HTMLElement} field - Input field
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error
 * @param {HTMLElement} field - Input field
 */
function clearFieldError(field) {
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Clear all field errors
 * @param {HTMLFormElement} form - The form
 */
function clearAllFieldErrors(form) {
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => clearFieldError(field));
}

/**
 * Set submit button loading state
 * @param {HTMLButtonElement} button - Submit button
 * @param {boolean} isLoading - Loading state
 */
function setSubmitButtonState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        button.classList.remove('loading');
    }
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
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
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Analytics tracking for form submission (optional)
 * @param {string} action - Action type
 */
function trackFormEvent(action) {
    // Add your analytics tracking code here
    console.log('Form event:', action);
}
