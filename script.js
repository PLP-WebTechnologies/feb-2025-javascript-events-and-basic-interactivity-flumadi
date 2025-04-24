// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const clickButton = document.getElementById('click-button');
    const hoverArea = document.getElementById('hover-area');
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    const secretArea = document.getElementById('secret-area');
    const colorChanger = document.getElementById('color-changer');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryImage = document.getElementById('gallery-image');
    const imageCounter = document.getElementById('image-counter');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const validationForm = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthMeterFill = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text');

    // Image gallery setup
    const images = [
        { src: 'https://images.unsplash.com/photo-1642079003624-5a12dd46837b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Beside River' },
        { src: 'https://images.unsplash.com/photo-1627401315191-f565b13d479a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Green & yellow trees' },
        { src: 'https://images.unsplash.com/photo-1629022258084-1344bff06e8c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'OFern Plant' },
        { src: 'https://images.unsplash.com/photo-1642079003624-5a12dd46837b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Pink flower tree' },
        { src: 'https://images.unsplash.com/photo-1652541008580-273613d8d8cd?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Yellow rose' }
    ];
    let currentImageIndex = 0;

    // Color changer setup
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;

    // 1. Event Handling Experiments
    
    // Click button interaction
    clickButton.addEventListener('click', function() {
        this.textContent = 'Nice click!';
        this.style.backgroundColor = '#e74c3c';
        
        setTimeout(() => {
            this.textContent = 'Try Clicking Me!';
            this.style.backgroundColor = '#3498db';
        }, 1500);
    });

    // Hover area interaction
    hoverArea.addEventListener('mouseenter', function() {
        this.innerHTML = '<p>You found me! 👋</p>';
        this.style.backgroundColor = '#f39c12';
    });

    hoverArea.addEventListener('mouseleave', function() {
        this.innerHTML = '<p>Move your mouse over this box</p>';
        this.style.backgroundColor = '#f1c40f';
    });

    // Keypress detection
    keypressInput.addEventListener('input', function(e) {
        if (e.target.value.length > 0) {
            keypressOutput.textContent = `You typed: "${e.target.value}"`;
        } else {
            keypressOutput.textContent = 'Start typing to see magic...';
        }
    });

    // Secret feature (long press or double click)
    let pressTimer;
    let secretActivated = false;

    secretArea.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretArea.innerHTML = '<p>Long press detected! 🎉</p>';
            secretArea.classList.add('activated');
            secretActivated = true;
            
            setTimeout(() => {
                secretArea.innerHTML = '<p>Psst... try double-clicking or holding me down</p>';
                secretArea.classList.remove('activated');
                secretActivated = false;
            }, 2000);
        }, 1000);
    });

    secretArea.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });

    secretArea.addEventListener('dblclick', function() {
        if (!secretActivated) {
            this.innerHTML = '<p>Double click! ✨</p>';
            this.classList.add('activated');
            
            setTimeout(() => {
                this.innerHTML = '<p>Psst... try double-clicking or holding me down</p>';
                this.classList.remove('activated');
            }, 2000);
        }
    });

    // 2. Interactive Components
    
    // Color changing button
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1} of ${colors.length}`;
        
        setTimeout(() => {
            this.textContent = 'Change My Color';
        }, 1000);
    });

    // Image gallery functionality
    function updateGallery() {
        galleryImage.style.opacity = 0;
        
        setTimeout(() => {
            galleryImage.src = images[currentImageIndex].src;
            galleryImage.alt = images[currentImageIndex].alt;
            imageCounter.textContent = `Photo ${currentImageIndex + 1} of ${images.length}`;
            galleryImage.style.opacity = 1;
        }, 200);
    }

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    });

    // Initialize gallery
    updateGallery();

    // Accordion functionality
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all accordion items
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Open first accordion by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].classList.add('active');
        accordionHeaders[0].nextElementSibling.style.maxHeight = 
            accordionHeaders[0].nextElementSibling.scrollHeight + 'px';
    }

    // 3. Form Validation
    
    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        // Update strength meter
        strengthMeterFill.style.width = `${strength.percentage}%`;
        strengthMeterFill.style.backgroundColor = strength.color;
        
        // Update strength text
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
    });

    function checkPasswordStrength(password) {
        const length = password.length;
        let strength = 0;
        let text = 'Too weak';
        let color = '#e74c3c'; // Red
        
        // Length checks
        if (length > 0) strength += 20;
        if (length >= 4) strength += 20;
        if (length >= 8) strength += 30;
        if (length >= 12) strength += 30;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        // Determine strength level
        if (strength >= 80) {
            text = 'Strong';
            color = '#2ecc71'; // Green
        } else if (strength >= 50) {
            text = 'Medium';
            color = '#f1c40f'; // Yellow
        } else if (strength > 0) {
            text = 'Weak';
        } else {
            text = '';
        }
        
        return {
            percentage: strength,
            text: text,
            color: color
        };
    }

    // Form submission handler
    validationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name';
            nameInput.classList.add('shake');
            isValid = false;
            
            setTimeout(() => {
                nameInput.classList.remove('shake');
            }, 400);
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('shake');
            isValid = false;
            
            setTimeout(() => {
                emailInput.classList.remove('shake');
            }, 400);
        } else {
            emailError.textContent = '';
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('shake');
            isValid = false;
            
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 400);
        } else {
            passwordError.textContent = '';
        }
        
        // If form is valid
        if (isValid) {
            alert('Thanks for submitting the form!');
            this.reset();
            strengthMeterFill.style.width = '0';
            strengthText.textContent = 'Password strength';
            strengthText.style.color = '#7f8c8d';
        }
    });

    // Real-time validation feedback
    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            nameError.textContent = '';
        }
    });

    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value === '' || emailRegex.test(this.value)) {
            emailError.textContent = '';
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length >= 8) {
            passwordError.textContent = '';
        }
    });
});