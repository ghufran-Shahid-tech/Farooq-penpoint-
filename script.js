// Navigation scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
}

// Smooth scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }
}

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Typed.js initialization
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#typed-text', {
    strings: ["Books...", "Gifts...", "Printing...", "Events...", "Decorations..."],
    typeSpeed: 90,
    backSpeed: 50,
    loop: true,
    backDelay: 1500,
    startDelay: 500
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Section animations
gsap.utils.toArray("section").forEach((sec, i) => {
  gsap.from(sec.querySelector('.section-title'), {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: sec,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Service cards stagger animation
gsap.from(".service-card", {
  opacity: 0,
  y: 60,
  duration: 0.8,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%"
  }
});

// Why cards stagger animation
gsap.from(".why-card", {
  opacity: 0,
  scale: 0.8,
  duration: 0.6,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".why-grid",
    start: "top 80%"
  }
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
  const target = parseInt(stat.getAttribute('data-target'));
  
  ScrollTrigger.create({
    trigger: stat,
    start: "top 85%",
    onEnter: () => {
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out"
      });
    },
    once: true
  });
});

// Booking form handling with WhatsApp and Email integration
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;
  
  // Create WhatsApp message
  const whatsappMessage = `*New Booking Request*%0A%0A` +
    `*Name:* ${name}%0A` +
    `*Phone:* ${phone}%0A` +
    `*Email:* ${email || 'Not provided'}%0A` +
    `*Service:* ${service}%0A` +
    `*Message:* ${message || 'No additional message'}%0A%0A` +
    `Sent from Farooq PenPoint Website`;
  
  // Create Email subject and body
  const emailSubject = `Service Booking: ${service}`;
  const emailBody = `Dear Farooq,%0D%0A%0D%0A` +
    `I would like to book the following service:%0D%0A%0D%0A` +
    `Name: ${name}%0D%0A` +
    `Phone: ${phone}%0D%0A` +
    `Service: ${service}%0D%0A` +
    `Message: ${message || 'No additional details'}%0D%0A%0D%0A` +
    `Best regards,%0D%0A${name}`;
  
  // Show options to user
  const choice = confirm(
    "Booking Received! Choose OK to send via WhatsApp, or Cancel to send via Email."
  );
  
  if (choice) {
    // Open WhatsApp
    window.open(
      `https://wa.me/923089856139?text=${whatsappMessage}`,
      '_blank'
    );
  } else {
    // Open Email
    window.open(
      `mailto:farooqqaiser258@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`,
      '_blank'
    );
  }
  
  // Reset form
  this.reset();
  
  // Show success animation
  showNotification('Booking Submitted Successfully!', 'success');
});

// Notification function
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #25d366, #128c7e);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// 3D Tilt effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Magnetic button effect
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Parallax effect for shapes
window.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    const xOffset = (0.5 - x) * speed;
    const yOffset = (0.5 - y) * speed;
    shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});
