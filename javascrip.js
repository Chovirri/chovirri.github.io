
/**
 * TIME CAPSULE LOGIC
 * Handles gallery navigation, text animations, and context-aware audio.
 */

// --- DATA ---
// Aquí definimos los "Momentos". Cada uno tiene imagen, texto, fecha y audio.
// Nota: Usamos enlaces de ejemplo. Para audio real, reemplaza 'src' con tus archivos locales .mp3
const moments = [
    {
        id: 1,
        // Foto brindis / Cena
        image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1920&auto=format&fit=crop',
        date: '14 de Febrero, 2023',
        text: '"Por los momentos que no necesitan palabras, solo una mirada."',
        // Piano suave
        audioSrc: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7314a40866.mp3?filename=piano-moment-11634.mp3', 
        musicLabel: 'Piano & Jazz Suave'
    },
    {
        id: 2,
        // Caminata bosque/parque
        image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?q=80&w=1920&auto=format&fit=crop',
        date: 'El Viaje de Otoño',
        text: '"Caminar a tu lado hace que cualquier camino se sienta como el hogar."',
        // Guitarra acústica
        audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitar-loop-f-91bpm-132687.mp3',
        musicLabel: 'Acústico Natural'
    },
    {
        id: 3,
        // Noche / Ciudad
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
        date: 'Bajo las estrellas',
        text: '"El universo es inmenso, pero mi mundo entero cabe en este abrazo."',
        // Ambiente lo-fi / nocturno
        audioSrc: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=night-ambience-17064.mp3',
        musicLabel: 'Ambiente Nocturno'
    }
];

// --- SELECTORS ---
const landingScreen = document.getElementById('landing');
const galleryScreen = document.getElementById('gallery');
const enterBtn = document.getElementById('enter-btn');
const audioPlayer = document.getElementById('audio-player');

const slideBg = document.getElementById('slide-bg');
const slideDate = document.getElementById('slide-date');
const slideText = document.getElementById('slide-text');
const musicLabel = document.getElementById('music-label');
const textContainer = document.querySelector('.text-card');

const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

// --- STATE ---
let currentIndex = 0;
let isPlaying = false;

// --- INITIALIZATION ---
enterBtn.addEventListener('click', enterTimeCapsule);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function enterTimeCapsule() {
    // Fade out landing
    landingScreen.style.opacity = '0';
    
    setTimeout(() => {
        landingScreen.classList.remove('active');
        galleryScreen.classList.add('active');
        
        // Start first slide
        loadSlide(0);
    }, 1500);
}

function loadSlide(index) {
    const moment = moments[index];

    // 1. Fade out content slightly
    textContainer.classList.remove('fade-up-active');
    slideBg.style.opacity = '0.5'; // Dip to black briefly

    setTimeout(() => {
        // 2. Change Image
        slideBg.style.backgroundImage = `url('${moment.image}')`;
        slideBg.style.opacity = '1';

        // 3. Change Text
        slideDate.textContent = moment.date;
        slideText.textContent = moment.text;
        musicLabel.textContent = moment.musicLabel;

        // 4. Change Audio
        // Solo cambiamos si la fuente es diferente para evitar cortes si fuera la misma
        if (audioPlayer.src !== moment.audioSrc) {
            changeAudio(moment.audioSrc);
        }

        // 5. Fade content back in
        textContainer.classList.add('fade-up-active');

    }, 500);
}

function changeAudio(src) {
    // Fade out audio logic (simulated volume drop)
    let fadeOut = setInterval(() => {
        if (audioPlayer.volume > 0.1) {
            audioPlayer.volume -= 0.1;
        } else {
            clearInterval(fadeOut);
            // Switch track
            audioPlayer.src = src;
            audioPlayer.volume = 0;
            audioPlayer.play().catch(e => console.log("Interacción requerida para audio:", e));
            
            // Fade in
            let fadeIn = setInterval(() => {
                if (audioPlayer.volume < 0.9) {
                    audioPlayer.volume += 0.1;
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
        }
    }, 100);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % moments.length;
    loadSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + moments.length) % moments.length;
    loadSlide(currentIndex);
}

// Preload images for smoothness
moments.forEach(m => {
    const img = new Image();
    img.src = m.image;
});
