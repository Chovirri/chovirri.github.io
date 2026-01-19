
/**
 * TIME CAPSULE CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica para index.html (Menú) ---
    const introScreen = document.getElementById('intro-screen');
    const menuScreen = document.getElementById('menu-screen');
    const openBtn = document.getElementById('open-capsule-btn');
    const bgMusic = document.getElementById('bg-music');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            // 1. Animación de salida del intro
            introScreen.style.opacity = '0';
            
            // 2. Intentar reproducir música (requiere interacción usuario)
            if(bgMusic) {
                bgMusic.volume = 0.3;
                bgMusic.play().catch(e => console.log("Audio autoplay prevented"));
            }

            setTimeout(() => {
                // 3. Ocultar intro, mostrar menú
                introScreen.classList.remove('active');
                introScreen.classList.add('hidden');
                
                menuScreen.classList.remove('hidden');
                
                // Pequeño delay para que el display:block se aplique antes de la opacidad
                setTimeout(() => {
                    menuScreen.classList.add('active');
                }, 50);
            }, 1000); // 1s coincide con la transición CSS
        });
    }

    // --- Lógica para páginas internas (Galerías) ---
    
    // 1. Detección de Scroll para animaciones (Scroll Reveal)
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    if (scrollElements.length > 0) {
        const observerOptions = {
            threshold: 0.15, // Se activa cuando el 15% del elemento es visible
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: dejar de observar si solo queremos que aparezca una vez
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        scrollElements.forEach(el => observer.observe(el));
    }

    // 2. Mensaje consola para modo fantasma
    const ghostContainer = document.querySelector('.ghost-container');
    if (ghostContainer) {
        console.log("Galería en modo espera. Listo para recibir imágenes.");
    }

});
