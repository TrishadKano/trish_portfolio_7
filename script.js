
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

// ── INSTANT PROJECT LOAD ────────────────────────────
document.querySelectorAll('.link a[href="#projects"]').forEach(link => {
  link.addEventListener('click', () => {

    // Force nav active immediately
    navLinks.forEach(l => l.classList.remove('active'));
    link.parentElement.classList.add('active');

    // Force default project tab
    const firstTabBtn = document.querySelector('.tab-btn');
    const firstTabContent = document.querySelector('.tab-content');

    if (firstTabBtn && firstTabContent) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      firstTabBtn.classList.add('active');
      firstTabContent.classList.add('active');
    }
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

// ── CHATBOT ──────────────────────────────────────────
const TRISHAD_CONTEXT = `You are Trishad's AI assistant on his personal portfolio website. Answer questions about Trishad Phogole concisely and professionally. Here is everything you know about him:

NAME: Trishad Phogole
TITLE: Data Engineer & Data Scientist

CURRENT ROLE:
- Data BI & Analytics Graduate at MoMo from MTN (MTN Group FinTech), December 2025 – Present, Hybrid
- Builds and maintains data pipelines and automation workflows in Microsoft Fabric environment
- Designs interactive KPI dashboards for MoMo services
- Automates secure SFTP file transfers using WinSCP (100+ files daily)
- Reduced manual data processing time by 100%, improved data reliability by 95%

PREVIOUS ROLE:
- Data Scientist Intern at Mintek, March 2025 – November 2025
- Deployed ML models achieving up to 20% improvement via A/B testing
- Designed KPI dashboards (reduced manual reporting time by 40%)
- Executed ETL processes improving data consistency by 95%
- Leveraged SQL for large dataset analysis with 99% data accuracy

EDUCATION:
- BSc Honours in Computer Science, University of Limpopo, 2024
- BSc Mathematical Sciences (Statistics & Computer Science), University of Limpopo, 2020–2023
- National Senior Certificate, Kgagatlou Secondary School, 2015–2019

SKILLS:
Languages: Python (Pandas, NumPy, Matplotlib, Seaborn, TensorFlow, Keras, PyTorch, Scikit-learn), SAS
Data & BI: Power BI (DAX, interactive dashboards), Microsoft Fabric, Apache Spark, Apache Kafka, WinSCP
Cloud & Infra: Power Automate, Git, GitHub, Linux (Ubuntu), Oracle VM VirtualBox, AWS, Microsoft Azure
Databases: MySQL, SQL Server, PostgreSQL
ML / AI: TensorFlow & Keras, Scikit-Learn, PyTorch

PROJECTS (13 total):
1. Stock Price Prediction – LSTM neural networks for time series forecasting
2. Credit Card Fraud Detection – Logistic Regression fraud classification system
3. Disease Prediction System – SVM model deployed via Streamlit app
4. Customer Segmentation – K-Means clustering with PCA
5. Boston Housing Price Predictor – Regression model
6. Udemy Courses EDA – Exploratory data analysis with visualisations
7. Car Sales Performance Dashboard – Interactive Power BI dashboard (live demo available)
8. Sales Performance Dashboard – Regional Power BI dashboard (live demo available)
9. HR Analytics Dashboard – Workforce insights Power BI dashboard (live demo available)
10. Library Management System – Relational SQL database with stored procedures
11. Retail Sales Analysis – Advanced SQL with window functions
12. Data Analyst Job Market Analysis – SQL exploration of job listings

CERTIFICATIONS (9):
- Data Analyst Professional Certificate – Coursera 2025
- Data Science Professional Certificate – Coursera 2025
- Machine Learning Professional Certificate – Coursera 2025
- Data Engineering Professional Certificate – Coursera 2025
- AWS Cloud Practitioner Essentials – Coursera 2025
- IFRS9 Expected Credit Loss Model Development – Udemy 2025
- Credit Risk Modeling & Scoring with ML – Udemy 2025
- Basel Accords (II, III, V): Risk Management and Banking Regulations – Udemy 2025
- Microsoft Power BI: Beginner to Advanced – Udemy 2024

CONTACT:
- LinkedIn: linkedin.com/in/trishad-phogole-48a75b23b
- GitHub: github.com/TrishadKano
- WhatsApp: +27 81 887 2945

Keep answers short (2-4 sentences max). Be warm, professional, and enthusiastic about data. If asked something outside Trishad's profile, politely say you can only speak about Trishad.`;

const chatFab      = document.getElementById('chatFab');
const chatWindow   = document.getElementById('chatWindow');
const chatClose    = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const chatIconEl   = document.getElementById('chatIcon');
const closeIconEl  = document.getElementById('closeIcon');
const fabPing      = document.querySelector('.chat-fab-ping');

let chatOpen = false;
let chatHistory = [];
let isBotTyping = false;

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle('open', chatOpen);
  chatIconEl.classList.toggle('hidden', chatOpen);
  closeIconEl.classList.toggle('hidden', !chatOpen);
  if (fabPing) fabPing.classList.add('hidden');
  if (chatOpen) { chatInput.focus(); scrollToBottom(); }
}

chatFab.addEventListener('click', toggleChat);
chatClose.addEventListener('click', toggleChat);

function scrollToBottom() {
  setTimeout(() => { chatMessages.scrollTop = chatMessages.scrollHeight; }, 50);
}

function appendMsg(role, text) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + role;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;
  div.appendChild(bubble);
  chatMessages.appendChild(div);
  scrollToBottom();
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'chatTyping';
  div.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(div);
  scrollToBottom();
  return div;
}

function removeTyping() {
  const t = document.getElementById('chatTyping');
  if (t) t.remove();
}

// Remove suggestion buttons after first use
function clearSuggestions() {
  const sugg = chatMessages.querySelector('.chat-suggestions');
  if (sugg) sugg.remove();
}

document.querySelectorAll('.sugg-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.dataset.q);
  });
});

async function sendMessage(text) {
  if (!text || isBotTyping) return;
  clearSuggestions();
  appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });
  chatInput.value = '';
  isBotTyping = true;
  chatSend.disabled = true;

  const typingEl = showTyping();

  try {
    const res = await fetch('https://portfolio-chatbot-proxy.vercel.app/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: TRISHAD_CONTEXT,
        messages: chatHistory
      })
    });

    const data = await res.json();
    removeTyping();

    const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response right now. Please try again!";
    appendMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    removeTyping();
    appendMsg('bot', "Oops, something went wrong. Please check your connection and try again.");
  }

  isBotTyping = false;
  chatSend.disabled = false;
  chatInput.focus();
}

chatSend.addEventListener('click', () => sendMessage(chatInput.value.trim()));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(chatInput.value.trim()); });

// Register chatbot elements with the cursor hover effect
document.querySelectorAll('.chat-fab,.chat-send,.sugg-btn,.chat-input,.chat-header-close').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
});
