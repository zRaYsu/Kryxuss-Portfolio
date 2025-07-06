document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
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

    // Listeners para imágenes de proyectos (DarkLegacyMC y Squid Game)
    console.log('Buscando elementos de imágenes...');
    const dlmcImg = document.getElementById('dlmc-img');
    const squidgameImg = document.getElementById('squidgame-img');
    
    console.log('dlmcImg encontrado:', dlmcImg);
    console.log('squidgameImg encontrado:', squidgameImg);
    
    if (dlmcImg) {
        console.log('Agregando listener a DarkLegacy imagen');
        dlmcImg.addEventListener('click', function(e) {
            console.log('¡Click en DarkLegacy imagen detectado!');
            e.preventDefault();
            
            const ip = 'play.darklegacy.es';
            
            // Mostrar tooltip inmediatamente
            let tooltip = document.createElement('div');
            tooltip.className = 'ip-tooltip';
            tooltip.innerText = 'Copiando IP...';
            dlmcImg.parentElement.style.position = 'relative';
            dlmcImg.parentElement.appendChild(tooltip);
            
            // Intentar copiar al portapapeles
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(ip).then(() => {
                    tooltip.innerText = '¡IP copiada al portapapeles!';
                    console.log('IP copiada:', ip);
                }).catch(err => {
                    console.error('Error al copiar:', err);
                    tooltip.innerText = 'IP: ' + ip + ' (copia manualmente)';
                });
            } else {
                // Fallback para navegadores que no soportan clipboard API
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = ip;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    tooltip.innerText = '¡IP copiada al portapapeles!';
                    console.log('IP copiada con fallback:', ip);
                } catch (err) {
                    console.error('Error con fallback:', err);
                    tooltip.innerText = 'IP: ' + ip + ' (copia manualmente)';
                }
            }
            
            setTimeout(() => {
                if (tooltip.parentElement) {
                    tooltip.remove();
                }
            }, 2000);
        });
    } else {
        console.error('No se encontró la imagen dlmc-img');
    }

    if (squidgameImg) {
        console.log('Agregando listener a Squid Game imagen');
        squidgameImg.addEventListener('click', function(e) {
            console.log('¡Click en Squid Game imagen detectado!');
            e.preventDefault();
            window.open('https://zraysu.github.io/SquidGame-x-DarkLegacy/', '_blank');
        });
    } else {
        console.error('No se encontró la imagen squidgame-img');
    }

    // Función de prueba para verificar que las imágenes funcionan
    window.testImageClicks = function() {
        console.log('Probando clicks en imágenes...');
        const dlmcImg = document.getElementById('dlmc-img');
        const squidgameImg = document.getElementById('squidgame-img');
        
        if (dlmcImg) {
            console.log('Simulando click en DarkLegacy...');
            dlmcImg.click();
        }
        
        if (squidgameImg) {
            console.log('Simulando click en Squid Game...');
            squidgameImg.click();
        }
    };

    console.log('Script cargado completamente. Puedes ejecutar testImageClicks() en la consola para probar.');
});
