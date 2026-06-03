// ── Data ─────────────────────────────────────────────────────────
const docs = [
  {
    title: "Indicaciones para IVE",
    category: "IVE",
    desc: "Indicaciones previas al procedimiento",
    date: "15/05/2026",
    status: "published",
  },
  {
    title: "Consentimiento informado IVE",
    category: "IVE",
    desc: "Formulario de consentimiento",
    date: "10/05/2026",
    status: "published",
  },
  {
    title: "Preparación para ecocardiograma",
    category: "Cardiología",
    desc: "Instrucciones previas al estudio",
    date: "20/05/2026",
    status: "published",
  },
  {
    title: "Post-operatorio cirugía general",
    category: "Procedimientos Quirúrgicos",
    desc: "Cuidados tras la cirugía",
    date: "18/05/2026",
    status: "published",
  },
  {
    title: "Preparación para tomografía",
    category: "Estudios Imagenológicos",
    desc: "Indicaciones para TAC",
    date: "12/05/2026",
    status: "draft",
  },
];

const categoryColors = {
  IVE: "badge-pink",
  Cardiología: "badge-red",
  "Procedimientos Quirúrgicos": "badge-purple",
  "Estudios Imagenológicos": "badge-blue",
  "Nefrología y Trasplante": "badge-teal",
  "Información General": "badge-gray",
};

// ── View navigation ───────────────────────────────────────────────
function showView(id) {
  ["view-home", "patient-area", "view-login", "app-shell"].forEach((v) => {
    const el = document.getElementById(v);
    if (el) el.style.display = "none";
  });
  const target = document.getElementById(id);
  if (target) target.style.display = id === "app-shell" ? "flex" : "flex";
  if (id === "view-home") {
    target.style.display = "flex";
  }
  if (id === "patient-area") {
    target.style.display = "block";
  }
  if (id === "view-login") {
    target.style.display = "block";
  }
  if (id === "app-shell") {
    target.style.display = "flex";
  }
}

function setAdminView(id) {
  document
    .querySelectorAll("#main-content .view")
    .forEach((v) => v.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  const titles = {
    "view-dashboard": "Dashboard",
    "view-manage-docs": "Gestión de Documentos",
    "view-new-doc": "Nuevo Documento",
    "view-survey-results": "Resultados de Encuestas",
  };
  document.getElementById("topbar-title").textContent = titles[id] || "";

  const navMap = {
    "view-dashboard": "nav-dashboard",
    "view-manage-docs": "nav-docs",
    "view-new-doc": "nav-new-doc",
    "view-survey-results": "nav-surveys",
  };
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  if (navMap[id]) document.getElementById(navMap[id])?.classList.add("active");

  // En móvil, cerrar sidebar al navegar
  if (window.innerWidth <= 768) {
    closeMobileSidebar();
  }
}

// ── Patient screens ───────────────────────────────────────────────
function showPatientScreen(id) {
  document
    .querySelectorAll(".patient-screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
}
function updatePatientLabel(label) {
  document.getElementById("patient-screen-label").textContent = label;
}
function setDocListTitle(cat) {
  document.getElementById("ps-doc-list-title").textContent = cat;
  const items = docs.filter((d) => d.category === cat || cat === "IVE");
  const container = document.getElementById("ps-doc-list-items");
  if (!container) return;
  if (items.length === 0) {
    container.innerHTML =
      '<p style="color:var(--hc-gray-400);font-size:0.85rem;padding:16px;">No hay documentos en esta categoría.</p>';
    return;
  }
  container.innerHTML = items
    .map(
      (d) => `
    <div class="doc-row" onclick="openQr('${d.title}')">
      <div class="doc-icon ic-blue"><i class="bi bi-file-earmark-text"></i></div>
      <div class="doc-body">
        <p class="doc-title">${d.title}</p>
        <p class="doc-sub">${d.desc}</p>
      </div>
      <button class="btn-hc btn-hc-secondary btn-xs" style="margin-left:auto;flex-shrink:0;" onclick="event.stopPropagation();openQr('${d.title}')"><i class="bi bi-qr-code"></i> QR</button>
    </div>
  `,
    )
    .join("");
}
function setSurveyTitle(title) {
  document.getElementById("ps-survey-form-title").textContent = title;
}

// ── Login ─────────────────────────────────────────────────────────
function doLogin() {
  const u = document.getElementById("login-user").value;
  const p = document.getElementById("login-pass").value;
  if (u && p) {
    showView("app-shell");
    renderDocTable();
  } else {
    alert("Ingrese usuario y contraseña.");
  }
}

// ── Sidebar toggle ────────────────────────────────────────────────
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
  const sb = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sb.classList.remove("mobile-open");
  overlay.classList.remove("visible");
}

// ── Admin doc table ───────────────────────────────────────────────
function renderDocTable() {
  const tbody = document.getElementById("admin-doc-list-table");
  if (!tbody) return;
  tbody.innerHTML = docs
    .map(
      (d) => `
    <tr>
      <td>
        <div style="font-weight:600;font-size:0.87rem;">${d.title}</div>
        <div style="font-size:0.75rem;color:var(--hc-gray-400);">${d.desc}</div>
      </td>
      <td><span class="badge-hc ${categoryColors[d.category] || "badge-gray"}">${d.category}</span></td>
      <td style="color:var(--hc-gray-500);font-size:0.82rem;">${d.date}</td>
      <td>${
        d.status === "published"
          ? '<span class="badge-hc badge-green"><i class="bi bi-circle-fill" style="font-size:.45rem;"></i> Publicado</span>'
          : '<span class="badge-hc badge-amber"><i class="bi bi-circle-fill" style="font-size:.45rem;"></i> Borrador</span>'
      }</td>
      <td>
        <div class="actions" style="justify-content:flex-end;">
          <button class="btn-hc btn-hc-ghost btn-xs" onclick="openQr('${d.title}')"><i class="bi bi-qr-code"></i></button>
          <button class="btn-hc btn-hc-ghost btn-xs"><i class="bi bi-pencil"></i></button>
          <button class="btn-hc btn-hc-danger btn-xs"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

// ── QR modal ──────────────────────────────────────────────────────
function openQr(title) {
  document.getElementById("qr-modal-title").textContent = title;
  document.getElementById("qr-modal-desc").textContent =
    "Escanee este código para acceder al documento desde cualquier dispositivo";
  document.getElementById("qr-modal").classList.add("open");
}
function closeQr() {
  document.getElementById("qr-modal").classList.remove("open");
}

// ── Star ratings ──────────────────────────────────────────────────
function setStars(containerId, val) {
  const stars = document.querySelectorAll(`#${containerId} span`);
  stars.forEach((s, i) => s.classList.toggle("active", i < val));
}

// ── Save doc (stub) ───────────────────────────────────────────────
function saveDoc() {
  alert("Documento guardado correctamente.");
  setAdminView("view-manage-docs");
}

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  // Cerrar QR al hacer clic en el overlay
  document.getElementById("qr-modal").addEventListener("click", function (e) {
    if (e.target === this) closeQr();
  });

  // Cerrar sidebar móvil al hacer clic en el overlay
  document
    .getElementById("sidebar-overlay")
    .addEventListener("click", function () {
      closeMobileSidebar();
    });
});
