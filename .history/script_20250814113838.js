// Configurações
const startDate = new Date('2022-05-15');
let currentSlideIndex = 0;
let slides = [];
let isAutoplay = true;
let autoplayInterval;
const autoplayDelay = 4000; // 4 segundos

// Formatos de imagem suportados
const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// IMPORTANTE: No GitHub Pages, você DEVE listar manualmente suas imagens aqui
// O GitHub Pages não permite descoberta automática de arquivos por segurança
const imageList = [
    // Suas fotos (organizadas cronologicamente):
    '20220330_205428.jpg',
    'IMG-20220412-WA0014.jpg',
    'IMG-20220422-WA0011.jpg',
    'IMG-20220424-WA0016.jpg',
    'IMG-20220501-WA0048.jpg',
    'IMG-20220610-WA0003.jpg',
    'IMG-20220619-WA0008.jpg',
    'IMG-20220626-WA0062.jpg',
    'IMG-20220626-WA0071.jpg',
    'IMG-20220724-WA0056.jpg',
    'IMG-20220818-WA0011.jpg',
    '20220912_113155.jpg',
    '20220912_141717.jpg',
    'IMG-20220925-WA0011.jpg',
    'IMG-20221030-WA0012.jpg',
    'IMG-20221201-WA0009.jpg',
    'IMG-20221203-WA0001.jpg',
    '20230128_180709.jpg',
    'IMG-20230216-WA0000.jpg',
    '20230506_192135.jpg',
    '20230521_122653.jpg',
    '20230603_172531.jpg',
    '20230608_000824.jpg',
    '20230707_173940.jpg',
    '20230714_174535.jpg',
    '20230714_174624(0).jpg',
    '20230714_175502.jpg',
    '20230715_223103.jpg',
    '20230716_163837.jpg',
    '20230716_164612.jpg',
    '20230822_182113.jpg',
    '20230823_160356.jpg',
    '20230917_160911.jpg',
    '20230917_164506.jpg',
    '20230928_182321.jpg',
    '20231224_211740.jpg',
    '20240215_161409.jpg',
    '20240215_163658.jpg',
    '20240215_164804.jpg',
    '20240510_144636.jpg',
    'Screenshot_20240515_131250_Photos.jpg',
    'Screenshot_20240515_131302_Photos.jpg',
    '20240612_190503.jpg',
    '20240615_191854.jpg',
    '20240817_175401.jpg',
    '20240817_175604.jpg',
    '20240824_204941.jpg',
    '20240924_184110.jpg',
    '20240924_184135.jpg',
    '20241025_224054.jpg',
    '20241201_185904.jpg',
    '20250322_204125.jpg',
    '20250522_200536.jpg',
    '20250612_185640.jpg',
    '20250716_202833.jpg'
    
    // ⚠️  ATENÇÃO: Se deixar vazio, a página mostrará as instruções de como adicionar fotos
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCounter();
    loadImages();
    
    // Atualizar contador a cada segundo
    setInterval(updateCounter, 1000);
    
    // Controles de teclado
    document.addEventListener('keydown', handleKeyPress);
});

// Função para atualizar o contador de tempo
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
}

// Função para carregar imagens
async function loadImages() {
    const slidesWrapper = document.getElementById('slidesWrapper');
    const loading = document.getElementById('loading');
    const noImages = document.getElementById('noImages');
    
    try {
        // No GitHub Pages, só funciona com lista manual
        if (imageList.length === 0) {
            loading.style.display = 'none';
            noImages.style.display = 'block';
            return;
        }
        
        // Carregar e validar imagens da lista manual
        for (const imageName of imageList) {
            await loadImage(imageName);
        }
        
        if (slides.length === 0) {
            loading.style.display = 'none';
            noImages.style.display = 'block';
            return;
        }
        
        loading.style.display = 'none';
        setupSlideshow();
        
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        loading.style.display = 'none';
        noImages.style.display = 'block';
    }
}

// Função para carregar uma imagem específica
function loadImage(imageName) {
    return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = function() {
            slides.push({
                src: `images/${imageName}`,
                name: imageName,
                caption: getImageCaption(imageName)
            });
            resolve();
        };
        
        img.onerror = function() {
            console.warn(`❌ Imagem não encontrada: images/${imageName}`);
            console.warn('💡 Verifique se o nome está correto e se o arquivo existe na pasta images/');
            resolve();
        };
        
        img.src = `images/${imageName}`;
    });
}

// Função para gerar legenda da imagem
function getImageCaption(imageName) {
    // Remove a extensão e formata o nome
    const nameWithoutExtension = imageName.replace(/\.[^/.]+$/, "");
    return nameWithoutExtension.replace(/[_-]/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

// Função para configurar o slideshow
function setupSlideshow() {
    const slidesWrapper = document.getElementById('slidesWrapper');
    const dotsContainer = document.getElementById('dotsContainer');
    
    // Limpar conteúdo existente
    slidesWrapper.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Criar slides
    slides.forEach((slide, index) => {
        // Criar slide
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.innerHTML = `
            <img src="${slide.src}" alt="${slide.caption}" loading="lazy">
            <div class="slide-caption">${slide.caption}</div>
        `;
        slidesWrapper.appendChild(slideDiv);
        
        // Criar dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Atualizar contador total
    document.getElementById('totalSlides').textContent = slides.length;
    
    // Mostrar primeiro slide
    showSlide(0);
    
    // Iniciar autoplay
    if (isAutoplay) {
        startAutoplay();
    }
}

// Função para mostrar slide específico
function showSlide(index) {
    const slideElements = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Esconder todos os slides
    slideElements.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Mostrar slide atual
    if (slideElements[index]) {
        slideElements[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    currentSlideIndex = index;
    document.getElementById('currentSlide').textContent = index + 1;
}

// Função para ir para slide específico
function goToSlide(index) {
    showSlide(index);
    restartAutoplay();
}

// Função para mudar slide
function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    
    if (newIndex >= slides.length) {
        showSlide(0);
    } else if (newIndex < 0) {
        showSlide(slides.length - 1);
    } else {
        showSlide(newIndex);
    }
    
    restartAutoplay();
}

// Função para iniciar autoplay
function startAutoplay() {
    if (slides.length <= 1) return;
    
    autoplayInterval = setInterval(() => {
        changeSlide(1);
    }, autoplayDelay);
}

// Função para parar autoplay
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Função para reiniciar autoplay
function restartAutoplay() {
    stopAutoplay();
    if (isAutoplay) {
        startAutoplay();
    }
}

// Função para alternar autoplay
function toggleAutoplay() {
    isAutoplay = !isAutoplay;
    const button = document.getElementById('playPauseBtn');
    
    if (isAutoplay) {
        startAutoplay();
        button.textContent = '⏸️';
    } else {
        stopAutoplay();
        button.textContent = '▶️';
    }
}

// Função para alternar fullscreen
function toggleFullscreen() {
    const slideshow = document.querySelector('.slideshow-container');
    
    if (!document.fullscreenElement) {
        slideshow.requestFullscreen().catch(err => {
            console.log(`Erro ao entrar em fullscreen: ${err.message}`);
        });
        slideshow.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        slideshow.classList.remove('fullscreen');
    }
}

// Função para lidar com teclas pressionadas
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
        case ' ':
            e.preventDefault();
            toggleAutoplay();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
                document.querySelector('.slideshow-container').classList.remove('fullscreen');
            }
            break;
    }
}

// Detectar saída do fullscreen
document.addEventListener('fullscreenchange', () => {
    const slideshow = document.querySelector('.slideshow-container');
    if (!document.fullscreenElement) {
        slideshow.classList.remove('fullscreen');
    }
});

// Pausar autoplay quando a aba não estiver ativa
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoplay();
    } else if (isAutoplay) {
        startAutoplay();
    }
});

// Pausar autoplay ao passar o mouse sobre o slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slideshow = document.querySelector('.slideshow-container');
    
    slideshow.addEventListener('mouseenter', () => {
        if (isAutoplay) stopAutoplay();
    });
    
    slideshow.addEventListener('mouseleave', () => {
        if (isAutoplay) startAutoplay();
    });
});
