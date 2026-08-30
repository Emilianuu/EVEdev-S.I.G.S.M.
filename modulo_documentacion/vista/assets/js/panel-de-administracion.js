// ── Datos fijos de demostración (sin backend) ──────────────────────
let hcCounter = 4029;

const docs = [
  {
    id: "HC-4029",
    paciente: "Ana María Rodríguez",
    ci: "1.948.328-9",
    nacimiento: "14 de Abril de 1959 (65 años)",
    tipo: "Epicrisis de Alta",
    fecha: "24 Oct 2026, 08:32",
    estado: "aprobado",
    tituloVisor: "EPICRISIS MÉDICA DE ALTA",
    resumenHeading: "Resumen de Egreso",
    resumenText:
      "La paciente, de 65 años de edad, habiendo ingresado el día 10 de octubre del corriente por cuadro clínico compatible con afección respiratoria aguda, evoluciona favorablemente bajo tratamiento indicado. Se otorga alta médica con control en policlínica externa.",
    listHeading: "Prescripciones al Egreso",
    listItems: [
      "Amoxicilina 875mg cada 12 horas por 7 días.",
      "Reposo relativo por 5 días en domicilio.",
    ],
    audit: [
      { label: "Carga de Documento completada", who: "Dr. Daniel Muñoz", when: "24 Oct, 08:32", tone: "gray" },
      { label: "Asignado para Validación de Firma", who: "Depto. Archivo Clínico", when: "24 Oct, 08:35", tone: "amber" },
      { label: "Documento aprobado", who: "Dr. Daniel Muñoz", when: "24 Oct, 09:10", tone: "green" },
    ],
  },
  {
    id: "HC-4028",
    paciente: "Carlos Eduardo Sosa",
    ci: "3.829.112-4",
    nacimiento: "2 de Enero de 1978 (48 años)",
    tipo: "Informe Radiológico",
    fecha: "23 Oct 2026, 15:10",
    estado: "pendiente",
    tituloVisor: "INFORME RADIOLÓGICO",
    resumenHeading: "Hallazgos",
    resumenText:
      "Estudio de tórax sin alteraciones pleuroparenquimatosas agudas. Silueta cardíaca de tamaño conservado. Se sugiere control evolutivo según criterio clínico.",
    listHeading: "Observaciones",
    listItems: ["Pendiente de firma del médico radiólogo de guardia."],
    audit: [
      { label: "Carga de Documento completada", who: "Lic. Mesa Central", when: "23 Oct, 15:10", tone: "gray" },
      { label: "Asignado para Validación de Firma", who: "Depto. Archivo Clínico", when: "23 Oct, 15:12", tone: "amber" },
    ],
  },
  {
    id: "HC-4027",
    paciente: "Mercedes Varela",
    ci: "4.103.882-1",
    nacimiento: "19 de Julio de 1990 (36 años)",
    tipo: "Análisis de Sangre",
    fecha: "23 Oct 2026, 11:05",
    estado: "revision",
    tituloVisor: "ANÁLISIS DE SANGRE",
    resumenHeading: "Resultados",
    resumenText:
      "Hemograma completo y perfil metabólico dentro de parámetros normales. Se adjuntan valores de referencia comparados con estudio previo del paciente.",
    audit: [
      { label: "Carga de Documento completada", who: "Lic. Laboratorio Central", when: "23 Oct, 11:05", tone: "gray" },
      { label: "En revisión por médico tratante", who: "Dra. Patricia Núñez", when: "23 Oct, 14:20", tone: "amber" },
    ],
  },
  {
    id: "HC-4026",
    paciente: "Juan Pedro Gómez",
    ci: "2.778.441-5",
    nacimiento: "5 de Marzo de 1965 (61 años)",
    tipo: "Consentimiento Quirúrgico",
    fecha: "22 Oct 2026, 18:40",
    estado: "rechazado",
    tituloVisor: "CONSENTIMIENTO INFORMADO QUIRÚRGICO",
    resumenHeading: "Detalle",
    resumenText:
      "Formulario de consentimiento para procedimiento quirúrgico programado. Rechazado por falta de firma del segundo testigo requerido por protocolo institucional.",
    listHeading: "Motivo de rechazo",
    listItems: ["Falta firma de testigo. Debe reingresarse con el formulario completo."],
    audit: [
      { label: "Carga de Documento completada", who: "Enf. Mesa Central", when: "22 Oct, 18:40", tone: "gray" },
      { label: "Documento rechazado", who: "Dr. Daniel Muñoz", when: "22 Oct, 19:02", tone: "red" },
    ],
  },
  {
    id: "HC-4025",
    paciente: "Lucía Fernández",
    ci: "3.204.771-2",
    nacimiento: "28 de Noviembre de 1982 (43 años)",
    tipo: "Historia Clínica",
    fecha: "22 Oct 2026, 09:15",
    estado: "aprobado",
    tituloVisor: "HISTORIA CLÍNICA",
    resumenHeading: "Resumen",
    resumenText:
      "Actualización de historia clínica con antecedentes personales, familiares y evolución de controles periódicos. Sin datos de alarma en la consulta actual.",
    audit: [
      { label: "Carga de Documento completada", who: "Dr. Daniel Muñoz", when: "22 Oct, 09:15", tone: "gray" },
      { label: "Documento aprobado", who: "Dr. Daniel Muñoz", when: "22 Oct, 09:40", tone: "green" },
    ],
  },
  {
    id: "HC-4024",
    paciente: "Roberto Silva",
    ci: "2.991.340-6",
    nacimiento: "11 de Junio de 1971 (55 años)",
    tipo: "Reporte de Guardia",
    fecha: "21 Oct 2026, 20:03",
    estado: "pendiente",
    tituloVisor: "REPORTE DE GUARDIA",
    resumenHeading: "Resumen de Guardia",
    resumenText:
      "Ingreso por guardia con cuadro de dolor abdominal. Se indican estudios complementarios y se deja en observación para reevaluación en las próximas horas.",
    audit: [
      { label: "Carga de Documento completada", who: "Dr. de Guardia", when: "21 Oct, 20:03", tone: "gray" },
    ],
  },
];

const statusMeta = {
  aprobado: { label: "Aprobado", cls: "badge-green" },
  pendiente: { label: "Pendiente", cls: "badge-amber" },
  revision: { label: "En Revisión", cls: "badge-blue" },
  rechazado: { label: "Rechazado", cls: "badge-red" },
};

let currentDocId = null;

// ── Dark Mode Logic (EVE Style) ────────────────────────────────────
function toggleDarkMode(isDark) {
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}

// ── Navegación entre pantallas de nivel superior ───────────────────
function showTop(id) {
  ["view-portal", "view-login", "app-shell"].forEach((v) => {
    const el = document.getElementById(v);
    if (el) el.style.display = "none";
  });
  const target = document.getElementById(id);
  if (!target) return;
  if (id === "app-shell" || id === "view-login") {
    target.style.display = "flex";
  } else {
    target.style.display = "block";
  }
}

function doLogin() {
  const u = document.getElementById("login-user").value;
  const p = document.getElementById("login-pass").value;
  if (!u || !p) {
    alert("Ingrese usuario y contraseña.");
    return;
  }
  showTop("app-shell");
  setAdminView("view-dashboard");
}

function logout() {
  window.location.href = "../../index.html";
}

// ── Sidebar (vistas internas del panel) ─────────────────────────────
function setAdminView(id) {
  document
    .querySelectorAll("#main-content .view")
    .forEach((v) => v.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  const titles = {
    "view-dashboard": "Panel Principal",
    "view-documentos": "Documentos Clínicos",
    "view-nuevo-doc": "Nuevo Documento",
    "view-documento-detalle": "Visualizador de Documento",
    "view-generar-qr": "Generador de Accesos QR",
    "view-configuracion": "Configuración",
  };
  document.getElementById("topbar-title").textContent = titles[id] || "";

  const navMap = {
    "view-dashboard": "nav-inicio",
    "view-documentos": "nav-documentos",
    "view-generar-qr": "nav-generar-qr",
    "view-configuracion": "nav-configuracion",
  };
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  if (navMap[id]) {
    const navEl = document.getElementById(navMap[id]);
    if (navEl) navEl.classList.add("active");
  }

  if (id === "view-documentos") renderDocumentosTable();
  if (id === "view-dashboard") renderDashboard();
  if (id === "view-generar-qr") initQr();

  if (window.innerWidth <= 768) closeMobileSidebar();
}

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

// ── Dashboard ────────────────────────────────────────────────────────
function renderDashboard() {
  const total = docs.length;
  const pendientes = docs.filter(
    (d) => d.estado === "pendiente" || d.estado === "revision",
  ).length;
  const aprobados = docs.filter((d) => d.estado === "aprobado").length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-pendientes").textContent = pendientes;
  document.getElementById("stat-aprobados").textContent = aprobados;

  const tbody = document.getElementById("dash-doc-table");
  tbody.innerHTML = docs
    .slice(0, 4)
    .map(
      (d) => `
    <tr onclick="openDocumento('${d.id}')" style="cursor:pointer">
      <td><strong>#${d.id}</strong></td>
      <td>${d.paciente}</td>
      <td>${d.tipo}</td>
      <td>${badgeHtml(d.estado)}</td>
    </tr>`,
    )
    .join("");

  const hoy = new Date().toLocaleDateString("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  document.getElementById("dash-date").textContent =
    hoy.charAt(0).toUpperCase() + hoy.slice(1);
}

function badgeHtml(estado) {
  const m = statusMeta[estado] || statusMeta.pendiente;
  return `<span class="badge-hc ${m.cls}"><i class="bi bi-circle-fill" style="font-size:.45rem;"></i> ${m.label}</span>`;
}

// ── Documentos Clínicos ─────────────────────────────────────────────
function renderDocumentosTable() {
  const tbody = document.getElementById("admin-doc-list-table");
  if (!tbody) return;
  tbody.innerHTML = docs
    .map(
      (d) => `
    <tr>
      <td><strong>#${d.id}</strong></td>
      <td>
        <div style="font-weight:600;">${d.paciente}</div>
        <div style="font-size:0.76rem;color:var(--hc-gray-400);">CI ${d.ci}</div>
      </td>
      <td>${d.tipo}</td>
      <td style="color:var(--hc-gray-500);font-size:0.82rem;">${d.fecha}</td>
      <td>${badgeHtml(d.estado)}</td>
      <td>
        <div class="actions" style="justify-content:flex-end;">
          <button class="btn-hc btn-hc-ghost btn-xs" title="Ver" onclick="openDocumento('${d.id}')"><i class="bi bi-eye"></i></button>
          <button class="btn-hc btn-hc-ghost btn-xs" title="Descargar"><i class="bi bi-download"></i></button>
        </div>
      </td>
    </tr>`,
    )
    .join("");

  document.getElementById("doc-count-label").textContent =
    `Mostrando 1-${docs.length} de ${docs.length} documentos`;
}

// ── Nuevo Documento ──────────────────────────────────────────────────
function saveDoc() {
  const paciente = document.getElementById("nd-paciente").value.trim();
  const ci = document.getElementById("nd-ci").value.trim();
  const tipo = document.getElementById("nd-tipo").value;
  const estado = document.getElementById("nd-estado").value;
  const contenido = document.getElementById("nd-contenido").value.trim();

  if (!paciente || !ci || !tipo) {
    alert("Complete paciente, cédula y tipo de documento.");
    return;
  }

  hcCounter += 1;
  const nuevo = {
    id: `HC-${hcCounter}`,
    paciente,
    ci,
    nacimiento: "—",
    tipo,
    fecha: new Date().toLocaleDateString("es-UY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + ", " + new Date().toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" }),
    estado,
    tituloVisor: tipo.toUpperCase(),
    resumenHeading: "Contenido",
    resumenText: contenido || "Sin contenido adicional cargado.",
    audit: [
      { label: "Carga de Documento completada", who: "Dr. Daniel Muñoz", when: "recién", tone: "gray" },
    ],
  };
  docs.unshift(nuevo);

  ["nd-paciente", "nd-ci", "nd-contenido"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  document.getElementById("nd-tipo").value = "";
  document.getElementById("nd-estado").value = "pendiente";

  showToast("Documento guardado correctamente", "bi-check-circle");
  setAdminView("view-documentos");
}

// ── Visualizador de Documento ────────────────────────────────────────
function openDocumento(id) {
  currentDocId = id;
  const d = docs.find((x) => x.id === id);
  if (!d) return;

  document.getElementById("dd-title").textContent = `${d.tipo} — ${d.paciente}`;

  let html = `<h3>${d.tituloVisor}</h3>`;
  html += `<h4>${d.resumenHeading}</h4><p>${d.resumenText}</p>`;
  if (d.listHeading && d.listItems) {
    html += `<h4>${d.listHeading}</h4><ul>${d.listItems.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  }
  document.getElementById("dd-content").innerHTML = html;

  document.getElementById("dd-patient").innerHTML = `
    <div class="patient-field"><p class="pf-label">Nombre</p><p class="pf-value">${d.paciente}</p></div>
    <div class="patient-field"><p class="pf-label">Cédula de Identidad</p><p class="pf-value">CI ${d.ci}</p></div>
    <div class="patient-field"><p class="pf-label">Fecha de Nacimiento</p><p class="pf-value">${d.nacimiento}</p></div>
  `;

  renderAudit(d);
  setAdminView("view-documento-detalle");
}

function renderAudit(d) {
  document.getElementById("dd-audit").innerHTML = d.audit
    .map(
      (a) => `
    <div class="timeline-item">
      <div class="timeline-dot ${a.tone}"></div>
      <div>
        <p class="timeline-title">${a.label}</p>
        <p class="timeline-sub">Por ${a.who} — ${a.when}</p>
      </div>
    </div>`,
    )
    .join("");
}

function setEstado(id, estado) {
  const d = docs.find((x) => x.id === id);
  if (!d) return;
  d.estado = estado;
  d.audit.push({
    label: estado === "aprobado" ? "Documento aprobado" : "Documento rechazado",
    who: "Dr. Daniel Muñoz",
    when: "recién",
    tone: estado === "aprobado" ? "green" : "red",
  });
  renderAudit(d);
  renderDashboard();
  showToast(
    estado === "aprobado" ? "Documento aprobado" : "Documento rechazado",
    estado === "aprobado" ? "bi-check-circle" : "bi-x-circle",
  );
}

// ── Generador de Accesos QR ──────────────────────────────────────────
function getPacientesUnicos() {
  const map = {};
  docs.forEach((d) => {
    if (!map[d.ci]) {
      map[d.ci] = { paciente: d.paciente, ci: d.ci, nacimiento: d.nacimiento, count: 0 };
    }
    map[d.ci].count += 1;
  });
  return Object.values(map);
}

function initQr() {
  const select = document.getElementById("qr-paciente");
  const pacientes = getPacientesUnicos();
  select.innerHTML = pacientes
    .map((p) => `<option value="${p.ci}">${p.paciente}</option>`)
    .join("");
  document.getElementById("qr-result").style.display = "none";
  document.getElementById("qr-empty").style.display = "block";
  renderQrDocs();
}

function renderQrDocs() {
  const ci = document.getElementById("qr-paciente").value;
  document.getElementById("qr-ci").value = ci;
  const docsPaciente = docs.filter((d) => d.ci === ci);
  document.getElementById("qr-docs-list").innerHTML = docsPaciente
    .map(
      (d, i) => `
    <div class="form-check mb-2">
      <input class="form-check-input qr-doc-check" type="checkbox" value="${d.id}" id="qr-doc-${d.id}" ${i === 0 ? "checked" : ""}>
      <label class="form-check-label" for="qr-doc-${d.id}" style="font-size:0.85rem">${d.tipo} (#${d.id})</label>
    </div>`,
    )
    .join("");
}

function generarQr() {
  const ci = document.getElementById("qr-paciente").value;
  const pacienteDoc = docs.find((d) => d.ci === ci);
  const paciente = pacienteDoc ? pacienteDoc.paciente : "";
  const seleccionados = document.querySelectorAll(".qr-doc-check:checked").length;

  if (seleccionados === 0) {
    alert("Seleccione al menos un documento para incluir en el QR.");
    return;
  }

  document.getElementById("qr-empty").style.display = "none";
  document.getElementById("qr-result").style.display = "block";
  document.getElementById("qr-result-paciente").textContent = `Paciente: ${paciente}`;
  document.getElementById("qr-result-desc").textContent =
    `Acceso restringido a ${seleccionados} documento${seleccionados > 1 ? "s" : ""} clínico${seleccionados > 1 ? "s" : ""}`;

  showToast("Código QR generado correctamente", "bi-qr-code");
}

// ── Toast ────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, icon) {
  const el = document.getElementById("toast");
  el.innerHTML = `<i class="bi ${icon || "bi-info-circle"}"></i> ${msg}`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

// ── Init ────────────────────────────────------------------------------
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sidebar-overlay")
    .addEventListener("click", function () {
      closeMobileSidebar();
    });
    
  // Load Dark Mode Preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const chk = document.getElementById('cfg-darkmode');
    if(chk) chk.checked = true;
  }

  renderDashboard();
  renderDocumentosTable();
});
