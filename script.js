/* ========================================
   PORTFOLIO INTERACTIONS
   ======================================== */

// Mobile Menu Toggle
const menubar = document.querySelector('#menu');
const navbar = document.querySelector('.navbar');

menubar.addEventListener('click', () => {
    menubar.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menubar.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Sticky Header
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to images on hover
const heroImage = document.querySelector('.home-image img');
const aboutImage = document.querySelector('.about-image img');

if (heroImage) {
    heroImage.addEventListener('mouseenter', () => {
        heroImage.style.animationPlayState = 'paused';
    });
    
    heroImage.addEventListener('mouseleave', () => {
        heroImage.style.animationPlayState = 'running';
    });
}

if (aboutImage) {
    aboutImage.addEventListener('mouseenter', () => {
        aboutImage.style.animationPlayState = 'paused';
    });
    
    aboutImage.addEventListener('mouseleave', () => {
        aboutImage.style.animationPlayState = 'running';
    });
}

// ========================================
// EMAIL SENDING FUNCTIONALITY
// ========================================

// Initialize EmailJS (Replace with your public key)
// Sign up at https://www.emailjs.com/ to get your credentials
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = {
            from_name: contactForm.querySelector('input[name="name"]').value,
            from_email: contactForm.querySelector('input[name="email"]').value,
            phone: contactForm.querySelector('input[name="phone"]').value,
            subject: contactForm.querySelector('input[name="subject"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value,
            to_email: 'abhinaygajula133@gmail.com'
        };
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Using EmailJS to send email
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS credentials
            const response = await emailjs.send(
                'YOUR_SERVICE_ID', 
                'YOUR_TEMPLATE_ID',
                formData
            );
            
            // Success
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            
            // Show success message
            showFormMessage('success', 'Message sent successfully! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
        } catch (error) {
            // Error
            console.error('EmailJS Error:', error);
            
            submitBtn.textContent = 'Failed! Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
            
            showFormMessage('error', 'Failed to send message. Please try again or email me directly.');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Function to show form messages
function showFormMessage(type, message) {
    let messageDiv = document.querySelector('.form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
    }
    
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.className = 'form-message';
        messageDiv.textContent = '';
    }, 5000);
}

// Alternative: Direct mailto link (works without any service)
const mailtoLink = document.getElementById('mailto-link');

if (mailtoLink) {
    mailtoLink.addEventListener('click', (e) => {
        const subject = encodeURIComponent('Portfolio Contact');
        const body = encodeURIComponent('Hi Abhinay,\n\nI visited your portfolio and would like to get in touch.\n\n');
        window.location.href = `mailto:abhinaygajula133@gmail.com?subject=${subject}&body=${body}`;
    });
}

// WhatsApp Quick Contact
const whatsAppBtn = document.getElementById('whatsapp-btn');

if (whatsAppBtn) {
    whatsAppBtn.addEventListener('click', () => {
        // Replace with your phone number
        const phoneNumber = '919876543210'; // Example: +91 9876543210
        const message = encodeURIComponent('Hi Abhinay, I visited your portfolio!');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========================================
// PARALLAX EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// TYPEWRITER EFFECT FOR HERO
// ========================================

const typewriterElement = document.querySelector('.text-animation h2');

if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let index = 0;
    
    const typeWriter = () => {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after a delay
    setTimeout(typeWriter, 1500);
}

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// PRELOADER (Optional)
// ========================================

window.addEventListener('load', () => {
    // Add a slight delay for smooth page load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initial body opacity for preloader
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "cfac72fb-4c10-4aa8-9362-fbee4d184b8c");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
