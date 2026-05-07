// ---- parallax ----
const parallaxEls = document.querySelectorAll('[data-parallax]');

function applyParallax() {
  const sy = window.scrollY;
  parallaxEls.forEach(el => {
    const rate = parseFloat(el.dataset.parallax);
    el.style.setProperty('--py', `${sy * rate}px`);
  });
}

window.addEventListener('scroll', applyParallax, { passive: true });
applyParallax();

// ---- hero mouse parallax ----
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero__bg');
const heroContent = document.querySelector('.hero__content');
const heroOrb1 = document.querySelector('.hero__orb--1');
const heroOrb2 = document.querySelector('.hero__orb--2');

if (heroSection) {
  const mouse = { x: 0, y: 0 };
  const lerped = { x: 0, y: 0 };
  let heroRaf = null;

  function tickHero() {
    const e = 0.075;
    lerped.x += (mouse.x - lerped.x) * e;
    lerped.y += (mouse.y - lerped.y) * e;

    if (heroBg) heroBg.style.transform = `translateY(var(--py, 0px)) translate(${lerped.x * 30}px, ${lerped.y * 15}px)`;
    if (heroContent) heroContent.style.transform = `translate(${lerped.x * -9}px, ${lerped.y * -5}px)`;
    if (heroOrb1) heroOrb1.style.transform = `translate(${lerped.x * -22}px, ${lerped.y * -12}px)`;
    if (heroOrb2) heroOrb2.style.transform = `translate(${lerped.x * 16}px, ${lerped.y * 9}px)`;

    if (Math.abs(mouse.x - lerped.x) + Math.abs(mouse.y - lerped.y) > 0.0005) {
      heroRaf = requestAnimationFrame(tickHero);
    } else {
      heroRaf = null;
    }
  }

  heroSection.addEventListener('mousemove', ev => {
    const r = heroSection.getBoundingClientRect();
    mouse.x = (ev.clientX - r.left - r.width / 2) / (r.width / 2);
    mouse.y = (ev.clientY - r.top - r.height / 2) / (r.height / 2);
    heroSection.style.setProperty('--mx', `${((ev.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    heroSection.style.setProperty('--my', `${((ev.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    if (!heroRaf) heroRaf = requestAnimationFrame(tickHero);
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    mouse.x = 0;
    mouse.y = 0;
    if (!heroRaf) heroRaf = requestAnimationFrame(tickHero);
  });
}

// ---- reveal on scroll ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ---- live clock in topbar ----
const timeStamp = document.getElementById('time-stamp');

function updateTime() {
  if (!timeStamp) return;
  timeStamp.textContent = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

updateTime();
setInterval(updateTime, 1000);

// ---- footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
