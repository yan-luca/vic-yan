// Configurações
const startDate = new Date('2022-05-15');
let currentSlideIndex = 0;
let slides = [];
let isAutoplay = true;
let autoplayInterval;
const autoplayDelay = 4000; // 4 segundos

// Formatos de imagem suportados
const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// Lista de imagens (adicione aqui os nomes dos seus arquivos de imagem)
// Ou deixe vazio para carregar automaticamente da pasta images
const imageList = [
    // Exemplo: 'foto1.jpg', 'foto2.png', 'foto3.jpeg'
    // Se deixar vazio, o script tentará carregar automaticamente
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
        let imagesToLoad = [];
        
        // Se imageList estiver vazio, tenta carregar automaticamente da pasta images
        if (imageList.length === 0) {
            imagesToLoad = await discoverImages();
        } else {
            imagesToLoad = imageList;
        }
        
        if (imagesToLoad.length === 0) {
            loading.style.display = 'none';
            noImages.style.display = 'block';
            return;
        }
        
        // Carregar e validar imagens
        for (const imageName of imagesToLoad) {
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

// Função para descobrir imagens automaticamente
async function discoverImages() {
    // Lista de possíveis nomes de imagens comuns
    const commonNames = [];
    
    // Gerar alguns nomes possíveis
    for (let i = 1; i <= 50; i++) {
        imageFormats.forEach(format => {
            commonNames.push(`foto${i}.${format}`);
            commonNames.push(`image${i}.${format}`);
            commonNames.push(`img${i}.${format}`);
            commonNames.push(`${i}.${format}`);
        });
    }
    
    // Adicionar alguns nomes comuns
    const commonFileNames = [
        'foto', 'image', 'img', 'pic', 'picture', 'photo'
    ];
    
    commonFileNames.forEach(name => {
        imageFormats.forEach(format => {
            commonNames.push(`${name}.${format}`);
        });
    });
    
    return commonNames;
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
            // Silenciosamente ignora imagens que não existem
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
