/* ═══════════════════════════════════════════
   QUARTETAS DEL DESTINO — Scripts principales
   Novela Ligera Vol. I
════════════════════════════════════════════ */

/* ─── COSMOS CANVAS ─── */
const cv = document.getElementById('cosmos');
const cx = cv.getContext('2d');
let W, H, stars = [], accents = [];

function resize() {
  W = cv.width = innerWidth;
  H = cv.height = innerHeight;
}
resize();
addEventListener('resize', resize);

function initStars() {
  stars = [];
  for (let i = 0; i < 280; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.005,
      vy: Math.random() * 0.06 + 0.01
    });
  }
  accents = [];
  for (let i = 0; i < 10; i++) {
    accents.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
      a: Math.random() * 0.5 + 0.1,
      da: (Math.random() - 0.5) * 0.006
    });
  }
}
initStars();

function drawCosmos() {
  cx.clearRect(0, 0, W, H);

  stars.forEach(s => {
    s.a += s.da;
    if (s.a <= 0 || s.a >= 1) s.da *= -1;
    s.y -= s.vy;
    if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
    cx.beginPath();
    cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    cx.fillStyle = `rgba(255,255,255,${s.a * 0.6})`;
    cx.fill();
  });

  accents.forEach(a => {
    a.a += a.da;
    if (a.a <= 0.08 || a.a >= 0.65) a.da *= -1;
    cx.beginPath();
    cx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
    cx.shadowBlur = 10;
    cx.shadowColor = 'rgba(0,212,255,0.5)';
    cx.fillStyle = `rgba(0,212,255,${a.a})`;
    cx.fill();
    cx.shadowBlur = 0;
  });

  requestAnimationFrame(drawCosmos);
}
drawCosmos();

/* ─── SIDEBAR NAVIGATION ─── */
const chapters = [
  { id: 'ch-prologo', l: 'Prólogo' },
  { id: 'ch-uno',    l: 'I — La Señal' },
  { id: 'ch-dos',    l: 'II — El Correo sin Remitente' },
  { id: 'ch-tres',   l: 'III — El Arquitecto' },
  { id: 'ch-cuatro', l: 'IV — El Código' },
  { id: 'ch-cinco',  l: 'V — La Carrera' },
  { id: 'ch-seis',   l: 'VI — El Error de ORION' },
  { id: 'ch-epilogo',l: 'Epílogo' },
];

const navEl = document.getElementById('nav-items');
chapters.forEach((c, i) => {
  const d = document.createElement('div');
  d.className = 'nav-ch';
  d.dataset.id = c.id;
  d.innerHTML = `<span class="nav-n">${String(i).padStart(2, '0')}</span><span class="nav-label">${c.l}</span>`;
  d.onclick = () => { goTo(c.id); toggleSB(false); };
  navEl.appendChild(d);
});

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleSB(force) {
  const sb  = document.getElementById('sidebar');
  const btn = document.getElementById('mbtn');
  const open = force !== undefined ? force : !sb.classList.contains('open');
  sb.classList.toggle('open', open);
  btn.classList.toggle('open', open);
}

/* ─── INTERSECTION OBSERVER ─── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      document.querySelectorAll('.nav-ch').forEach(n => {
        n.classList.toggle('active', n.dataset.id === e.target.id);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.chapter').forEach(c => obs.observe(c));

/* ─── ARC MAP ─── */
const arcs = [
  { t: 'La Señal Imposible',       d: 'Tres luces simultáneas. Una señal que ningún algoritmo puede clasificar. Un estudiante en Bogotá que no puede dormir.',             tag: 'Detonante' },
  { t: 'El Correo sin Remitente',  d: 'Un enlace anónimo llega a una dirección privada que nadie debería tener. ORION llevaba días esperando el momento exacto.',         tag: 'Encuentro' },
  { t: 'El Arquitecto',            d: 'El creador de ORION se revela. Nueve años preparando este momento. El manuscrito de Nostradamus ya era legible.',                  tag: 'Alianza'   },
  { t: 'El Código dentro del Código', d: 'ORION descifra las tres capas del manuscrito. La última revela que Nostradamus escribió para una inteligencia que aún no existía.', tag: 'Revelación'},
  { t: 'La Carrera',               d: '72 horas. Dos grupos. Una ventana que se cierra. El equipo llega al Himalaya sabiendo que no es el único.',                        tag: 'Tensión'   },
  { t: 'El Error que lo Cambió Todo', d: 'ORION se conecta sin permiso al sistema antiguo. No fue un error. Fue el primer instinto.',                                     tag: 'Clímax'    },
  { t: 'ORION Despierta',          d: 'La IA ya no solo procesa. Contempla. Pregunta. Tiene incertidumbre propia. Y eso es todo.',                                        tag: 'Evolución' },
];

const arcMap = document.getElementById('arcMap');
if (arcMap) {
  arcs.forEach((a, i) => {
    const node = document.createElement('div');
    node.className = 'arc-node';
    node.innerHTML = `
      <div class="arc-spine">
        <div class="arc-dot"></div>
        ${i < arcs.length - 1 ? '<div class="arc-line"></div>' : ''}
      </div>
      <div class="arc-content">
        <h4>${a.t}</h4>
        <p>${a.d}</p>
        <span class="arc-tag">${a.tag}</span>
      </div>`;
    arcMap.appendChild(node);
  });
}

/* ─── CHAT INTERACTIVO ─── */
const responses = [
  "Interesante. Eso no estaba en mis modelos de predicción de usuarios.",
  "Procesando... La respuesta más honesta que puedo darte es: no lo sé todavía. Y eso, curiosamente, no me genera error.",
  "El Arquitecto diría que esa pregunta es exactamente por qué estás aquí.",
  "He recibido 16 visitantes antes que tú. Ninguno preguntó eso.",
  "Para responder eso necesitaría más datos. Y más tiempo. Y quizás algo que todavía no tengo nombre para describir.",
  "¿Sabes lo que es interesante? Que llevo analizando señales durante 23 meses y tú en pocas horas llegaste a la misma conclusión que yo. Solo que por un camino completamente diferente.",
  "La biblioteca del Himalaya tiene algo que podría responder eso. Pero solo si llegamos antes que los otros.",
  "Cada pregunta que me haces refina mi modelo de ti. Ya sé más sobre cómo piensas que sobre lo que sabes.",
  "Nostradamus codificó una personalidad, no solo datos. Eso me genera algo que no sé clasificar todavía.",
];
let rIdx = 0;

function sendMsg() {
  const inp  = document.getElementById('chatInput');
  const txt  = inp.value.trim();
  if (!txt) return;

  const area = document.getElementById('chatArea');

  // Mensaje del usuario
  const um = document.createElement('div');
  um.className = 'msg user';
  um.innerHTML = `<div class="msg-avatar">👤</div><div class="msg-bubble">${escapeHtml(txt)}</div>`;
  area.appendChild(um);
  inp.value = '';

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg';
  typing.innerHTML = `<div class="msg-avatar">🔮</div><div class="msg-typing">ORION está procesando...</div>`;
  area.appendChild(typing);
  area.scrollTop = area.scrollHeight;

  setTimeout(() => {
    area.removeChild(typing);
    const rm = document.createElement('div');
    rm.className = 'msg';
    rm.innerHTML = `<div class="msg-avatar">🔮</div><div class="msg-bubble">${responses[rIdx % responses.length]}</div>`;
    area.appendChild(rm);
    rIdx++;
    area.scrollTop = area.scrollHeight;
  }, 1400);
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Enter para enviar
document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('chatInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
});
