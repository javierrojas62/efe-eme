// ========== SLIDER INFINITO DE CLIENTES ==========
const track = document.querySelector("#clients-track");
const items = Array.from(track.children);

// Duplicar TODO el contenido para crear el loop infinito
items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
});

// Calcular el ancho total de UN set de items (no duplicados)
let totalWidth = 0;
items.forEach(item => {
    totalWidth += item.offsetWidth + 60; // 60 es el gap
});

// Animación infinita que se reinicia suavemente
gsap.to(track, {
    x: -totalWidth,
    duration: 10, // Ajusta la velocidad aquí (más bajo = más rápido)
    ease: "none",
    repeat: -1,
    modifiers: {
        x: function(x) {
            // Esto hace que cuando llegue al final, vuelva al inicio sin salto visual
            return (parseFloat(x) % totalWidth) + "px";
        }
    }
});

// Pausar al hacer hover (mejora UX)
const slider = document.querySelector('.clients-slider');
slider.addEventListener('mouseenter', () => {
    gsap.globalTimeline.pause();
});

slider.addEventListener('mouseleave', () => {
    gsap.globalTimeline.resume();
});

// ========== BANNER DE IMÁGENES ==========
const slides = document.querySelectorAll('.slides img');
let currentSlide = 0;

function changeSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Cambiar cada 4 segundos
setInterval(changeSlide, 4000);

// ========== ANIMACIONES AL SCROLL (OPCIONAL) ==========
// Detectar cuando los elementos entran en la vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a todos los bloques
document.querySelectorAll('.block').forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(30px)';
    block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(block);
});

// ========== SMOOTH SCROLL PARA ENLACES ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========== PERFORMANCE: Lazy loading para imágenes ==========
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores antiguos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}