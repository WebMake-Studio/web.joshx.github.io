document.addEventListener('contextmenu', e => e.preventDefault());

// ── ACTIVE NAV ──────────────────────────────────────────────
document.querySelectorAll('nav a').forEach(a => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  if (a.getAttribute('href') === current) a.classList.add('active');
});

// ── SEQUENTIAL FADE-IN ───────────────────────────────────────
function initSequentialFade() {
  const els = document.querySelectorAll(
    'section, .card:not(.card-disabled), .social-item, .info-card, .form-card, footer'
  );
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = `fadeInUp 0.5s ease-out forwards ${i * 0.08}s`;
  });
}

document.addEventListener('DOMContentLoaded', initSequentialFade);

// ── PARTICLES ────────────────────────────────────────────────
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const COLORS = ['#ff2a2a', '#ff5555', '#1a6fff', '#4d9fff', '#ffffff'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x       = Math.random() * W;
      this.y       = init ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
      this.size    = Math.random() * 1.6 + 0.3;
      this.speedX  = (Math.random() - 0.5) * 0.3;
      this.speedY  = (Math.random() - 0.5) * 0.3;
      this.color   = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha   = Math.random() * 0.55 + 0.1;
      this.life    = 0;
      this.maxLife = Math.random() * 450 + 200;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10 || this.life > this.maxLife) {
        this.reset();
      }
    }
    draw() {
      const p    = this.life / this.maxLife;
      const fade = p < 0.1 ? p / 0.1 : p > 0.85 ? (1 - p) / 0.15 : 1;
      ctx.save();
      ctx.globalAlpha  = this.alpha * fade;
      ctx.fillStyle    = this.color;
      ctx.shadowColor  = this.color;
      ctx.shadowBlur   = 5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particles = Array.from({ length: 110 }, () => {
    const p = new Particle();
    p.life = Math.random() * p.maxLife;
    return p;
  });

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}
