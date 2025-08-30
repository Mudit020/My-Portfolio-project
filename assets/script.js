document.addEventListener("DOMContentLoaded", () => {
  // Mobile Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navList = document.querySelector(".nav-list");
  mobileToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    mobileToggle.setAttribute("aria-expanded", navList.classList.contains("active"));
  });

  // Typewriter
  const typewriterEl = document.getElementById("typewriter");
  const words = ["Android Developer", "Web Developer", "AI Enthusiast"];
  let i = 0, j = 0, isDeleting = false;

  function type() {
    const word = words[i];
    typewriterEl.textContent = word.substring(0, j);
    if (!isDeleting) {
      if (j < word.length) { j++; setTimeout(type, 150); } 
      else { isDeleting = true; setTimeout(type, 1000); }
    } else {
      if (j > 0) { j--; setTimeout(type, 50); } 
      else { isDeleting = false; i = (i+1)%words.length; setTimeout(type, 500); }
    }
  }
  type();

  // Reveal on scroll
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    for (const r of reveals) {
      const elementTop = r.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) { r.classList.add("active"); }
    }
  }
  window.addEventListener("scroll", reveal);
  reveal();

  // Skills bar animation
  const bars = document.querySelectorAll(".bar-fill");
  bars.forEach(bar => {
    const val = bar.getAttribute("data-fill");
    setTimeout(() => { bar.style.width = val + "%"; }, 500);
  });

  // Footer Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Contact Form (mailto fallback)
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const mailto = form.dataset.mailto;
    window.location.href = `mailto:${mailto}?subject=Message from ${name}&body=${message}%0D%0AEmail: ${email}`;
    document.getElementById("formStatus").textContent = "Opening email client...";
  });

  // Particles
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const particles = [];
  const numParticles = 80;

  class Particle {
    constructor() {
      this.x = Math.random()*width;
      this.y = Math.random()*height;
      this.size = Math.random()*3+1;
      this.speedX = Math.random()*1-0.5;
      this.speedY = Math.random()*1-0.5;
    }
    update() { this.x += this.speedX; this.y += this.speedY; if(this.x<0||this.x>width) this.speedX*=-1; if(this.y<0||this.y>height) this.speedY*=-1; }
    draw() { ctx.fillStyle = "#00fff7"; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
  }

  for(let i=0;i<numParticles;i++){ particles.push(new Particle()); }
  function animateParticles(){
    ctx.clearRect(0,0,width,height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener("resize", () => { width=canvas.width=window.innerWidth; height=canvas.height=window.innerHeight; });
});
/* =========================
   NEON CURSOR EFFECT
========================= */
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

/* =========================
   ENHANCED TYPEWRITER LOOP
========================= */
const words = ["Web Developer", "Android Dev", "AI Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
const typeElemEnhanced = document.getElementById("typewriter");

function typeEnhanced() {
  if(charIndex < words[wordIndex].length){
    typeElemEnhanced.textContent += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(typeEnhanced, 100);
  } else {
    typeElemEnhanced.classList.add('fade');
    setTimeout(eraseEnhanced, 800);
  }
}

function eraseEnhanced() {
  typeElemEnhanced.textContent = '';
  typeElemEnhanced.classList.remove('fade');
  wordIndex = (wordIndex + 1) % words.length;
  charIndex = 0;
  setTimeout(typeEnhanced, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEnhanced();
});
/* =========================
   HERO NEON PARTICLE BACKGROUND
========================= */
const heroCanvas = document.getElementById('heroParticles');
const heroCtx = heroCanvas.getContext('2d');
let heroParticles = [];

function resizeHeroCanvas() {
  heroCanvas.width = heroCanvas.offsetWidth;
  heroCanvas.height = heroCanvas.offsetHeight;
}
window.addEventListener('resize', resizeHeroCanvas);
resizeHeroCanvas();

class HeroParticle {
  constructor(x, y, radius, speedX, speedY, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  draw() {
    heroCtx.beginPath();
    heroCtx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    heroCtx.fillStyle = this.color;
    heroCtx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x > heroCanvas.width || this.x < 0) this.speedX *= -1;
    if(this.y > heroCanvas.height || this.y < 0) this.speedY *= -1;
  }
}

function initHeroParticles(){
  heroParticles = [];
  for(let i=0; i<80; i++){
    const radius = Math.random()*2+1;
    const x = Math.random()*heroCanvas.width;
    const y = Math.random()*heroCanvas.height;
    const speedX = (Math.random()-0.5)*0.6;
    const speedY = (Math.random()-0.5)*0.6;
    const color = `hsl(${Math.random()*360}, 100%, 50%)`;
    heroParticles.push(new HeroParticle(x,y,radius,speedX,speedY,color));
  }
}
initHeroParticles();

function animateHeroParticles(){
  heroCtx.clearRect(0,0,heroCanvas.width, heroCanvas.height);
  heroParticles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateHeroParticles);
}
animateHeroParticles();
let mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;

  // Bounce off walls
  if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
  if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

  // Mouse interaction: repel particles
  let dx = mouse.x - this.x;
  let dy = mouse.y - this.y;
  let distance = Math.sqrt(dx*dx + dy*dy);
  if (distance < mouse.radius) {
    let angle = Math.atan2(dy, dx);
    let repel = (mouse.radius - distance) / 10;
    this.x -= repel * Math.cos(angle);
    this.y -= repel * Math.sin(angle);
  }
};
// Scroll Progress Indicator
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scrollIndicator").style.width = scrollPercent + "%";
});
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalDemo = document.getElementById("modalDemo");
const modalPreview = document.getElementById("modalPreview");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".project-card .btn.neon").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".project-card");
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector("p").textContent;
    modalPreview.textContent = "Preview content here"; // Can replace with image/video
    modalDemo.href = "#"; // Replace with real demo link
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
document.getElementById('contactForm').addEventListener('submit', function(event){
    event.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(function() {
        document.getElementById('formStatus').innerText = "Message sent successfully!";
        document.getElementById('contactForm').reset();
    }, function(error) {
        document.getElementById('formStatus').innerText = "Failed to send message. Try again.";
        console.error('EmailJS error:', error);
    });
});


