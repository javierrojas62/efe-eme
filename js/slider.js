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
            duration: 30, // Ajusta la velocidad aquí
            ease: "none",
            repeat: -1,
            modifiers: {
                x: function(x) {
                    // Esto hace que cuando llegue al final, vuelva al inicio sin salto
                    return (parseFloat(x) % totalWidth) + "px";
                }
            }
        });

        // Pausar al hacer hover (opcional pero recomendado)
        const slider = document.querySelector('.clients-slider');
        slider.addEventListener('mouseenter', () => {
            gsap.globalTimeline.pause();
        });
        
        slider.addEventListener('mouseleave', () => {
            gsap.globalTimeline.resume();
        });

        //Banner

const slides = document.querySelectorAll('.slides img');
let i = 0;

setInterval(() => {
  slides[i].classList.remove('active');
  i = (i + 1) % slides.length;
  slides[i].classList.add('active');
}, 4000);
//Animación
