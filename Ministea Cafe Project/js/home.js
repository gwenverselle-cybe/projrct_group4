// 1. HERO SLIDER CLASS
class HeroSlider {
    constructor(selector, duration = 4000) {
        this.container = document.querySelector(selector);
        if (!this.container) return;
        this.slides = this.container.querySelectorAll('.hero-slide');
        this.currentIndex = 0;
        this.duration = duration;
        this.timer = null;
        this.init();
    }
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) this.start();
                else this.stop();
            });
        }, { threshold: 0.3 });
        observer.observe(this.container);
    }
    showNextSlide() {
        this.slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.slides[this.currentIndex].classList.add('active');
    }
    start() { if (!this.timer) this.timer = setInterval(() => this.showNextSlide(), this.duration); }
    stop() { clearInterval(this.timer); this.timer = null; }
}

// 2. DATA & CAROUSEL LOGIC
const drinksData = [
    { img: "images/CoffeePicture.jpg", title: "Caramel Macchiato", desc: "Rich espresso with creamy milk." },
    { img: "images/CoffeePicture.jpg", title: "Matcha Latte", desc: "Authentic Japanese matcha." },
    { img: "images/CoffeePicture.jpg", title: "Iced Americano", desc: "Bold shots of premium espresso." },
    { img: "images/CoffeePicture.jpg", title: "Classic Espresso", desc: "Pure, bold espresso shot." },
    { img: "images/CoffeePicture.jpg", title: "Vanilla Latte", desc: "Smooth espresso with vanilla." },
    { img: "images/CoffeePicture.jpg", title: "Cappuccino", desc: "Classic espresso with foam." }
];

let currentSet = 0;
const cardsPerSet = 3;

function updateCarousel() {
    const cardContainer = document.getElementById('cardContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    if (!cardContainer) return;

    const start = currentSet * cardsPerSet;
    const end = Math.min(start + cardsPerSet, drinksData.length);
    cardContainer.innerHTML = drinksData.slice(start, end).map(drink => `
        <div class="drink-card">
            <img src="${drink.img}" alt="${drink.title}">
            <div class="drink-info">
                <h3>${drink.title}</h3>
                <p>${drink.desc}</p>
            </div>
        </div>
    `).join('');

    const totalSets = Math.ceil(drinksData.length / cardsPerSet);
    if (prevBtn) prevBtn.disabled = currentSet === 0;
    if (nextBtn) nextBtn.disabled = currentSet >= totalSets - 1;

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSets; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === currentSet ? 'active' : ''}`;
            dot.onclick = () => { currentSet = i; updateCarousel(); };
            dotsContainer.appendChild(dot);
        }
    }
    setTimeout(() => cardContainer.classList.add('show'), 10);
}

// 3. MAIN INITIALIZER 
window.initHome = function() {
    console.log("Home scripts initialized.");
    
    new HeroSlider('.hero-section');

    const pb = document.getElementById('prevBtn');
    const nb = document.getElementById('nextBtn');
    
    if (pb) pb.onclick = () => { if(currentSet > 0) { currentSet--; updateCarousel(); } };
    if (nb) nb.onclick = () => { if(currentSet < Math.ceil(drinksData.length/cardsPerSet)-1) { currentSet++; updateCarousel(); } };
    currentSet = 0;
    updateCarousel();
};