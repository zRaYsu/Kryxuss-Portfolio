document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 150);
    });
    
    const navButtons = document.querySelectorAll('.icon-button[data-section]');
    const sections = document.querySelectorAll('.section');
    
    function showActiveSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-section') === sectionId) {
                button.classList.add('active');
            }
        });
    }
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showActiveSection(sectionId);
            
            const iconContainer = this.querySelector('.icon-container');
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            iconContainer.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const numberOfParticles = 30;
        
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const brightness = Math.random() * 50 + 50;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.filter = `brightness(${brightness}%)`;
            
            const colors = ['#9c77ff', '#6a11cb', '#2575fc', '#4e44ce'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = randomColor;
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    window.addEventListener('resize', createParticles);
    
    function checkHomeSection() {
        const homeSection = document.getElementById('home');
        if (homeSection.classList.contains('active')) {
            document.body.classList.add('home-active');
        } else {
            document.body.classList.remove('home-active');
        }
    }
    
    navButtons.forEach(button => {
        button.addEventListener('click', checkHomeSection);
    });
    

    checkHomeSection();

    const aboutLink = document.getElementById('about-link');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            showActiveSection('about');
            checkHomeSection();
        });
    }
});
