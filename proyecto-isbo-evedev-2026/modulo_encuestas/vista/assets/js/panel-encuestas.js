// ── Datos de encuestas ────────────────────────────────────────────
const surveys = [
  {
    title: "Encuesta de Satisfacción General",
    icon: "bi-star",
    iconClass: "ic-amber",
    desc: "Ayúdenos a mejorar",
    duration: "3–5 min",
    responses: 156,
    avg: 4.3,
    satisfaction: 86,
    status: "active",
    lastResponse: "29/5/2026",
  },
  {
    title: "Satisfacción – Usuarios Trasplantados",
    icon: "bi-heart",
    iconClass: "ic-pink",
    desc: "Encuesta para pacientes trasplantados",
    duration: "5–7 min",
    responses: 42,
    avg: 4.7,
    satisfaction: 94,
    status: "active",
    lastResponse: "28/5/2026",
  },
  {
    title: "Evolución de Programas FNR",
    icon: "bi-award",
    iconClass: "ic-purple",
    desc: "Fondo Nacional de Recursos",
    duration: "4–6 min",
    responses: 78,
    avg: 4.2,
    satisfaction: 84,
    status: "active",
    lastResponse: "27/5/2026",
  },
  {
    title: "Calidad de Atención",
    icon: "bi-clipboard-check",
    iconClass: "ic-teal",
    desc: "Evalúe la atención recibida",
    duration: "2–4 min",
    responses: 39,
    avg: 4.5,
    satisfaction: 90,
    status: "active",
    lastResponse: "26/5/2026",
  },
];

// ── Navegación entre vistas principales ──────────────────────────
function showView(id) {
  ["view-home", "patient-area", "view-login", "app-shell"].forEach((v) => {
    const el = document.getElementById(v);
    if (el) el.style.display = "none";
  });
  const target = document.getElementById(id);
  if (!target) return;
  if (id === "patient-area") {
    target.style.display = "block";
  } else if (id === "view-login") {
    target.style.display = "block";
  } else {
    target.style.display = "flex";
  }
}

// ── Vistas del panel admin ────────────────────────────────────────
function setAdminView(id) {
  document
    .querySelectorAll("#main-content .view")
    .forEach((v) => v.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  const titles = {
    "view-dashboard": "Dashboard",
    "view-survey-results": "Resultados de Encuestas",
  };
  document.getElementById("topbar-title").textContent = titles[id] || "";

  const navMap = {
    "view-dashboard": "nav-dashboard",
    "view-survey-results": "nav-surveys",
  };
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  if (navMap[id]) document.getElementById(navMap[id])?.classList.add("active");

  if (window.innerWidth <= 768) closeMobileSidebar();
}

// ── Pantallas del área de paciente ───────────────────────────────
function showPatientScreen(id) {
  document
    .querySelectorAll(".patient-screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
}

function updatePatientLabel(label) {
  document.getElementById("patient-screen-label").textContent = label;
}

function setSurveyTitle(title) {
  document.getElementById("ps-survey-form-title").textContent = title;
}

// ── Estrellas ─────────────────────────────────────────────────────
function setStars(containerId, val) {
  const stars = document.querySelectorAll(`#${containerId} span`);
  stars.forEach((s, i) => s.classList.toggle("active", i < val));
}

// ── Login ─────────────────────────────────────────────────────────
function doLogin() {
  const u = document.getElementById("login-user").value;
  const p = document.getElementById("login-pass").value;
  if (u && p) {
    showView("app-shell");
    setAdminView("view-dashboard");
  } else {
    alert("Ingrese usuario y contraseña.");
  }
}

// ── Sidebar ───────────────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  const mc = document.getElementById("main-content");
  const overlay = document.getElementById("sidebar-overlay");

  if (window.innerWidth <= 768) {
    const isOpen = sb.classList.contains("mobile-open");
    if (isOpen) {
      closeMobileSidebar();
    } else {
      sb.classList.add("mobile-open");
      overlay.classList.add("visible");
    }
  } else {
    sb.classList.toggle("collapsed");
    mc.classList.toggle("collapsed");
  }
}

function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("mobile-open");
  document.getElementById("sidebar-overlay").classList.remove("visible");
}

// ── Render tarjetas de resultados (admin) ─────────────────────────
function renderSurveyCards() {
  const container = document.getElementById("admin-survey-cards");
  if (!container) return;

  const progressColors = [
    "var(--hc-blue)",
    "var(--hc-green)",
    "var(--hc-blue)",
    "var(--hc-teal)",
  ];

  container.innerHTML = surveys
    .map(
      (s, i) => `
    <div class="col-xl-6">
      <div class="survey-result-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px;">
          <h4>${s.title}</h4>
          <span class="badge-hc badge-green">Activa</span>
        </div>
        <p class="meta"><i class="bi bi-calendar3 me-1"></i>Última respuesta: ${s.lastResponse}</p>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <div class="survey-stat-mini">
              <p class="label">Respuestas</p>
              <p class="val">${s.responses}</p>
            </div>
          </div>
          <div class="col-6">
            <div class="survey-stat-mini">
              <p class="label">Promedio</p>
              <p class="val"><span class="star">★</span> ${s.avg}</p>
            </div>
          </div>
        </div>
        <div class="hc-progress mb-1">
          <div class="hc-progress-bar" style="width:${s.satisfaction}%;background:${progressColors[i]};"></div>
        </div>
        <p style="font-size:0.73rem;color:var(--hc-gray-400);margin:0 0 12px;">${s.satisfaction}% de satisfacción</p>
        <button class="btn-hc btn-hc-secondary btn-sm w-100" style="justify-content:center;">Ver detalles</button>
      </div>
    </div>
  `,
    )
    .join("");
}

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sidebar-overlay")
    .addEventListener("click", function () {
      closeMobileSidebar();
    });

  renderSurveyCards();
});
