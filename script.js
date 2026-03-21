// 1. Mobile Navbar & Scroll Effect
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if(navLinks.classList.contains('active')) hamburger.innerHTML = '<i class="fas fa-times"></i>';
    else hamburger.innerHTML = '<i class="fas fa-bars"></i>';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// 2. Cinematic Hero Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
// Change background every 6 seconds for cinematic pacing
setInterval(nextSlide, 6000);

// 3. Scroll Reveal Animations
function reveal() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });

    // Handle Navbar active states via Scroll Spy
    const sections = document.querySelectorAll('section');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger initially

// 4. Animated Counters (Company Overview)
const counters = document.querySelectorAll('.counter');
let counted = false;

const startCounters = () => {
    const statsSection = document.querySelector('.stats-grid');
    if(!statsSection) return;
    
    if (statsSection.getBoundingClientRect().top < window.innerHeight && !counted) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 50; // Speed control

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        counted = true;
    }
}
window.addEventListener('scroll', startCounters);

// 5. Projects Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-target')).classList.add('active');
    });
});

// 6. WhatsApp Inquiry Form Submission
const form = document.getElementById('whatsappForm');
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Format the message for WhatsApp
        const waText = `*New Inquiry for Janak Tech Solutions*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Message:* ${message}`;
        
        // Company WhatsApp Number (Use target international code formatting)
        const targetNumber = '18001234567'; // Number provided in requirements
        
        // Create WhatsApp API link
        const waLink = `https://wa.me/${targetNumber}?text=${waText}`;
        
        // Open link in new tab
        window.open(waLink, '_blank');
        
        // Optional: Reset form
        form.reset();
    });
}
