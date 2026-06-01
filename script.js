
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
const roles = ['Data Engineer', 'Data Scientist', 'AI Engineer'];
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

// CHATBOT 

const FAQ = [
  {
    keys: ['who is','about trishad','introduce','tell me about','himself','background'],
    answer: "Trishad Phogole is a <strong>Data Engineer & Data Scientist</strong> based in South Africa with over one year of hands-on experience in data science, data engineering, and business intelligence. He builds scalable data pipelines, deploys ML models, and delivers data-driven insights that improve operational efficiency."
  },
  {
    keys: ['experience','work','job','momo','mtn','mintek','employer','company'],
    answer: "Trishad has worked at two organisations:<br><br><strong>MoMo from MTN</strong> — Data BI & Analytics Graduate (December 2025 – Present, Hybrid). He builds and maintains data pipelines in Microsoft Fabric, designs KPI dashboards, and automates SFTP file transfers using WinSCP, ingesting 100+ files daily.<br><br><strong>Mintek</strong> — Data Scientist Intern (March 2025 – November 2025, Full-time). He developed and deployed ML models, designed KPI dashboards, executed ETL processes integrating SharePoint and SQL data, and translated complex data into actionable business insights."
  },
  {
    keys: ['education','degree','university','limpopo','honours','bsc','study','studied','school'],
    answer: "Trishad's educational background:<br>• <strong>BSc Honours in Computer Science</strong> — University of Limpopo (2024)<br>• <strong>BSc in Mathematical Sciences (Statistics & Computer Science)</strong> — University of Limpopo (2020–2023)<br>• <strong>National Senior Certificate (Matric)</strong> — Kgagatlou Secondary School (2015–2019)"
  },
  {
    keys: ['certification','certificate','qualified','coursera','udemy','aws','ifrs','basel','power bi'],
    answer: "Trishad holds 9 professional certifications:<br>• Data Analyst Professional Certificate — Coursera (2025)<br>• Data Science Professional Certificate — Coursera (2025)<br>• Machine Learning Professional Certificate — Coursera (2025)<br>• Data Engineering Professional Certificate — Coursera (2025)<br>• AWS Cloud Practitioner Essentials — Coursera (2025)<br>• IFRS9 Expected Credit Loss Model Development — Udemy (2025)<br>• Credit Risk Modeling & Scoring with ML — Udemy (2025)<br>• Basel Accords (II, III, V): Risk Management — Udemy (2025)<br>• Microsoft Power BI: Beginner to Advanced — Udemy (2024)"
  },
  {
    keys: ['skill','skills','language','tools','technology','technologies','use','uses','python','sql','power bi','spark','fabric','pytorch','tensorflow','scikit'],
    answer: "Trishad's key skills include:<br>• <strong>Languages:</strong> Python (Pandas, NumPy, Matplotlib, TensorFlow, Keras, PyTorch, Scikit-learn), SQL<br>• <strong>Data & BI:</strong> Power BI, Microsoft Fabric, Apache Spark, WinSCP<br>• <strong>Cloud & Infra:</strong> Power Automate, Git, GitHub<br>• <strong>Databases:</strong> MySQL, SQL Server<br>• <strong>ML / AI:</strong> TensorFlow & Keras, Scikit-Learn, PyTorch"
  },
  {
    keys: ['project','projects','portfolio','machine learning','power bi','sql','work he has done'],
    answer: "Trishad has 13 projects across three categories:<br><br><strong>ML / Data Science:</strong> Loan Default Prediction (XGBoost), Credit Score Classification, Disease Prediction System (SVM), Customer Segmentation (K-Means), Boston Housing Price Predictor, Udemy Courses EDA.<br><br><strong>Power BI:</strong> Car Sales Performance Dashboard, Sales Performance Dashboard, HR Analytics Dashboard.<br><br><strong>SQL:</strong> Library Management System, Retail Sales Analysis, Data Analyst Job Market Analysis.<br><br>View them all on his <a href='https://github.com/TrishadKano' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>GitHub</a>."
  },
  {
    keys: ['contact','email','reach','message','get in touch','hire','available'],
    answer: "You can connect with Trishad via:<br>💼 <a href='https://linkedin.com/in/trishad-phogole-48a75b23b' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>LinkedIn</a><br>💻 <a href='https://github.com/TrishadKano' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>GitHub</a><br>💬 <a href='https://wa.me/27818872945' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>WhatsApp</a><br><br>Or use the <strong>Contact form</strong> on this page!"
  },
  {
    keys: ['location','based','south africa','where','country','city','limpopo','johannesburg'],
    answer: "Trishad is based in <strong>South Africa</strong>, currently working in a hybrid role at MoMo from MTN (MTN Group FinTech)."
  },
  {
    keys: ['linkedin','github','social','link','profile','whatsapp'],
    answer: "You can find Trishad on:<br>💼 <a href='https://linkedin.com/in/trishad-phogole-48a75b23b' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>LinkedIn</a><br>💻 <a href='https://github.com/TrishadKano' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>GitHub</a>"
  },
  {
    keys: ['data engineer','data science','pipeline','etl','ml','machine learning','analytics','bi'],
    answer: "Trishad specialises in <strong>data engineering and data science</strong>. He builds scalable data pipelines in Microsoft Fabric, automates ETL workflows, deploys machine learning models, and creates interactive Power BI dashboards — bridging the gap between raw data and actionable business insight."
  },
  {
    keys: ['hello','hi','hey','good morning','good afternoon','howzit','greet'],
    answer: "Hello! 👋 I'm Trishad's portfolio assistant. I can tell you about his experience, skills, certifications, projects, or how to contact him. What would you like to know?"
  },
  {
    keys: ['thank','thanks','appreciate','helpful'],
    answer: "You're welcome! 😊 Feel free to ask anything else or connect with Trishad directly on LinkedIn or WhatsApp."
  }
];
 
// ── CHATBOT ──────────────────────────────────────────
const chatFab     = document.getElementById('chatFab');
const chatWindow  = document.getElementById('chatWindow');
const chatClose   = document.getElementById('chatClose');
const chatMessages= document.getElementById('chatMessages');
const chatInput   = document.getElementById('chatInput');
const chatSend    = document.getElementById('chatSend');
const chatPing    = document.getElementById('chatPing');
const chatIconOpen  = document.getElementById('chatIconOpen');
const chatIconClose = document.getElementById('chatIconClose');
 
let chatOpen = false;
 
function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle('open', chatOpen);
  chatIconOpen.classList.toggle('hidden', chatOpen);
  chatIconClose.classList.toggle('hidden', !chatOpen);
  if (chatOpen) {
    chatPing.classList.add('hidden');
    if (chatMessages.children.length === 0) {
      setTimeout(() => addBotWithSuggestions(
        "Hi there! 👋 I'm Trishad's assistant. Ask me anything about his experience, skills, certifications, or projects — or pick a quick question below!",
        ['Who is Trishad?','Experience','Skills','Certifications','Projects','Contact','Location']
      ), 350);
    }
    setTimeout(() => chatInput.focus(), 200);
  }
}
 
chatFab.addEventListener('click', toggleChat);
chatClose.addEventListener('click', toggleChat);
 
function timeNow() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
 
function showTyping() {
  const el = document.createElement('div');
  el.className = 'chat-msg bot';
  el.id = 'typingIndicator';
  el.innerHTML = `<div class="chat-typing"><span></span><span></span><span></span></div>`;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return el;
}
 
function addBot(text) {
  const el = document.createElement('div');
  el.className = 'chat-msg bot';
  el.innerHTML = `<div class="chat-bubble">${text}</div>`;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
 
function addBotWithSuggestions(text, suggestions) {
  const el = document.createElement('div');
  el.className = 'chat-msg bot';
  const suggHTML = suggestions.map(s =>
    `<button class="sugg-btn" onclick="askFAQ('${s}')">${s}</button>`
  ).join('');
  el.innerHTML = `
    <div>
      <div class="chat-bubble">${text}</div>
      <div class="chat-suggestions" style="margin-top:8px">${suggHTML}</div>
    </div>`;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
 
function addUser(text) {
  const el = document.createElement('div');
  el.className = 'chat-msg user';
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text; // textContent prevents XSS
  el.appendChild(bubble);
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
 
function getFAQAnswer(input) {
  const q = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.keys.some(k => q.includes(k))) return faq.answer;
  }
  return "I'm not sure about that, but you can connect with Trishad directly on <a href='https://linkedin.com/in/trishad-phogole-48a75b23b' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>LinkedIn</a> or via <a href='https://wa.me/27818872945' target='_blank' rel='noopener noreferrer' style='color:var(--teal)'>WhatsApp</a>. He'd love to hear from you! 😊";
}
 
function askFAQ(q) {
  addUser(q);
  chatSend.disabled = true;
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    addBot(getFAQAnswer(q));
    chatSend.disabled = false;
  }, 550);
}
 
function handleChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  addUser(text);
  chatSend.disabled = true;
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    addBot(getFAQAnswer(text));
    chatSend.disabled = false;
    chatInput.focus();
  }, 550);
}
 
chatSend.addEventListener('click', handleChat);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleChat(); });