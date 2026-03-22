const FORMSUBMIT_EMAIL = 'budyjohnpaul80@gmail.com';

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmission);

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', function(event) {
            clearFieldError(event.target);
        });
    });
}

async function handleFormSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!validateForm(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }

    setSubmitButtonState(submitButton, true);

    try {
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim(),
            _subject: form.subject.value.trim(),
            _captcha: 'false'
        };

        const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let result;
        try {
            result = await response.json();
        } catch (parseError) {
            console.error('FormSubmit response was not JSON. Status:', response.status, response.statusText);
            throw new Error('Invalid response from server');
        }

        console.log('FormSubmit response:', result);

        if (result.success === 'true' || result.success === true) {
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
            form.reset();
            clearAllFieldErrors(form);
        } else {
            console.error('FormSubmit error:', result.message || result);
            throw new Error(result.message || 'Submission failed');
        }

    } catch (error) {
        console.error('Contact form error:', error.message);
        showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');

    } finally {
        setSubmitButtonState(submitButton, false);
    }
}

function validateForm(form) {
    let isValid = true;

    const name = form.name.value.trim();
    if (!name || name.length < 2) {
        showFieldError(form.name, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }

    const email = form.email.value.trim();
    if (!isValidEmail(email)) {
        showFieldError(form.email, 'Please enter a valid email address');
        isValid = false;
    }

    const subject = form.subject.value.trim();
    if (!subject || subject.length < 3) {
        showFieldError(form.subject, 'Please enter a subject (at least 3 characters)');
        isValid = false;
    }

    const message = form.message.value.trim();
    if (!message || message.length < 10) {
        showFieldError(form.message, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }

    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    clearFieldError(field);

    switch (field.name) {
        case 'name':
            if (value && value.length < 2) showFieldError(field, 'Name must be at least 2 characters');
            break;
        case 'email':
            if (value && !isValidEmail(value)) showFieldError(field, 'Please enter a valid email address');
            break;
        case 'subject':
            if (value && value.length < 3) showFieldError(field, 'Subject must be at least 3 characters');
            break;
        case 'message':
            if (value && value.length < 10) showFieldError(field, 'Message must be at least 10 characters');
            break;
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
}

function clearAllFieldErrors(form) {
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => clearFieldError(field));
}

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

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

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

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 5000);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
