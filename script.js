
// ── LOADER ──────────────────────────────────────────
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPct = document.getElementById('loaderPct');
let pct = 0;
const loaderInterval = setInterval(() => {
  pct += Math.random() * 15;
  if (pct >= 100) { pct = 100; clearInterval(loaderInterval); setTimeout(() => loader.classList.add('hidden'), 300); }
  loaderBar.style.width = pct + '%';
  loaderPct.textContent = Math.floor(pct) + '%';
}, 80);

// ── CUSTOM CURSOR ────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.skill-card,.project-card,.certification-card,.exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
});

// ── TYPEWRITER ───────────────────────────────────────
const roles = ['Data Engineer', 'Data Scientist'];
let ri = 0, ci = 0, deleting = false;
const typeTarget = document.getElementById('typeTarget');
function type() {
  const word = roles[ri];
  if (!deleting) {
    typeTarget.innerHTML = word.substring(0, ci + 1) + '<span class="type-cursor"></span>';
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1500); return; }
  } else {
    typeTarget.innerHTML = word.substring(0, ci - 1) + '<span class="type-cursor"></span>';
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
setTimeout(type, 1800);

// ── NAVBAR SCROLL ────────────────────────────────────
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// ── ACTIVE NAV (FIXED) ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.link');

const sectionVisibility = {};

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    sectionVisibility[entry.target.id] = entry.intersectionRatio;
  });

  // Find the section with the highest visibility
  let mostVisibleSection = null;
  let maxRatio = 0;

  for (const id in sectionVisibility) {
    if (sectionVisibility[id] > maxRatio) {
      maxRatio = sectionVisibility[id];
      mostVisibleSection = id;
    }
  }

  if (mostVisibleSection) {
    navLinks.forEach(l => l.classList.remove('active'));
    const active = document.querySelector(
      `.link a[href="#${mostVisibleSection}"]`
    );
    if (active) active.parentElement.classList.add('active');
  }
}, {
  threshold: [0.25, 0.4, 0.6, 0.75]
});

sections.forEach(section => obs.observe(section));

// ── REVEAL ON SCROLL ─────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNTER ANIMATION ────────────────────────────────
const countEls = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.count;
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        e.target.textContent = Math.floor(current) + (target > 10 ? '+' : '');
      }, 40);
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
countEls.forEach(el => countObs.observe(el));

// ── SKILLS FILTER ────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
        card.style.display = '';
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
  });
});

// ── PROJECT TABS ─────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── HAMBURGER ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); });
});

// ── SMOOTH SCROLL ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── FORM SUBMIT ──────────────────────────────────────
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  const btn = this.querySelector('.form-submit-btn');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    success.style.display = 'block';
    this.reset();
    setTimeout(() => success.style.display = 'none', 4000);
  }, 2000);
});