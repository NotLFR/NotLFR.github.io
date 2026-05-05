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
