// 1. Inicialización Temprana del Tema Unificado
(function initTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

// 2. Lógica de Interfaz atada al DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  /* --- Sincronizar el checkbox de Dark Mode al cargar --- */
  const darkModeToggle = document.getElementById("cfg-darkmode");

  if (darkModeToggle) {
    // Leer estado actual de la clave unificada "theme"
    darkModeToggle.checked = localStorage.getItem("theme") === "dark";

    /* Evento para el cambio manual de Dark Mode */
    darkModeToggle.addEventListener("change", function () {
      const isDark = this.checked;
      if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
    });

    /* Escuchar cambios desde otras ventanas en tiempo real */
    window.addEventListener("storage", (e) => {
      if (e.key === "theme") {
        const isDark = e.newValue === "dark";
        darkModeToggle.checked = isDark; // Sincroniza el botón visualmente

        if (isDark) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      }
    });
  }

  /* --- Navigation (Sidebar) --- */
  const navLinks = document.querySelectorAll(".nav-link-custom");
  const topbarTitle = document.getElementById("topbar-title");

  // Mapeo de identificadores a títulos para el breadcrumb
  const sectionTitles = {
    dashboard: "Dashboard",
    traslados: "Gestión de Traslados",
    "nuevo-traslado": "Nuevo Traslado",
    seguimiento: "Seguimiento de Traslados",
    recursos: "Gestión de Recursos",
    configuracion: "Configuración",
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remover active de todos los enlaces
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Ocultar todas las vistas
      document
        .querySelectorAll(".view")
        .forEach((v) => v.classList.remove("active"));

      // Mostrar la vista objetivo
      const target = this.getAttribute("data-view");
      const viewElement = document.getElementById("view-" + target);
      if (viewElement) {
        viewElement.classList.add("active");
      }

      // --- ACTUALIZAR EL TÍTULO DEL TOPBAR ---
      if (topbarTitle && sectionTitles[target]) {
        topbarTitle.textContent = sectionTitles[target];
      }

      // Cerrar sidebar en dispositivos móviles
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("open");
      }
    });
  });

  /* --- Tabs inside Recursos --- */
  const tabPills = document.querySelectorAll(".tab-pill");
  tabPills.forEach((pill) => {
    pill.addEventListener("click", function () {
      // Activar pill
      tabPills.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");

      // Mostrar panel
      const targetTab = this.getAttribute("data-tab");
      document
        .querySelectorAll(".tab-content-panel")
        .forEach((t) => t.classList.remove("active"));

      const panel = document.getElementById(targetTab);
      if (panel) {
        panel.classList.add("active");
      }
    });
  });

  /* --- Botón Volver/Logout --- */
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      location.href = "../../index.html";
    });
  }

  /* --- Toggle del Sidebar (Mobile y Escritorio) --- */
  const mobileToggle = document.getElementById("mobileToggle");
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");

  if (mobileToggle && sidebar && main) {
    mobileToggle.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        // En móvil: despliega o esconde el menú lateral
        sidebar.classList.toggle("open");
      } else {
        // En escritorio: contrae el menú y ajusta el contenedor principal
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
      }
    });
  }
  /* --- LÓGICA DEL FORMULARIO WIZARD --- */
  const formWizard = document.getElementById("formNuevoTraslado");

  if (formWizard) {
    let currentStep = 1;
    const totalSteps = 4;

    const panels = formWizard.querySelectorAll(".wizard-panel");
    const stepsIndicators = document.querySelectorAll(
      "#view-nuevo-traslado .wizard-step",
    );

    const btnPrev = document.getElementById("btnPrevStep");
    const btnNext = document.getElementById("btnNextStep");
    const btnSubmit = document.getElementById("btnSubmitForm");

    // Función para actualizar la vista de los pasos
    function updateWizard() {
      // Mostrar y ocultar paneles
      panels.forEach((panel) => {
        if (parseInt(panel.getAttribute("data-step")) === currentStep) {
          panel.classList.remove("d-none");
        } else {
          panel.classList.add("d-none");
        }
      });

      // Actualizar bolitas de progreso superiores
      stepsIndicators.forEach((step, index) => {
        if (index < currentStep) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });

      // Ajustar botones inferiores
      btnPrev.disabled = currentStep === 1;

      if (currentStep === totalSteps) {
        btnNext.classList.add("d-none");
        btnSubmit.classList.remove("d-none");
      } else {
        btnNext.classList.remove("d-none");
        btnSubmit.classList.add("d-none");
      }
    }

    // Función para validar que los datos del paso actual estén completos
    function validateCurrentStep() {
      const currentPanel = formWizard.querySelector(
        `.wizard-panel[data-step="${currentStep}"]`,
      );
      const inputs = currentPanel.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      return isValid;
    }

    // Limpiar alertas rojas apenas el usuario empieza a corregir el campo
    formWizard.addEventListener("input", (e) => {
      if (e.target.classList.contains("is-invalid")) {
        e.target.classList.remove("is-invalid");
      }
    });

    // Acción botón Siguiente
    btnNext.addEventListener("click", () => {
      if (validateCurrentStep()) {
        currentStep++;
        updateWizard();
      }
    });

    // Acción botón Anterior
    btnPrev.addEventListener("click", () => {
      currentStep--;
      updateWizard();
    });

    // Acción botón Guardar (Submit final)
    formWizard.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita recargar la página

      if (validateCurrentStep()) {
        // --- AQUÍ RECOPILAMOS LOS DATOS PARA LA BASE DE DATOS ---
        const formData = new FormData(formWizard);
        const dataParaBaseDeDatos = Object.fromEntries(formData.entries());

        console.log(
          "Datos capturados listos para enviar:",
          dataParaBaseDeDatos,
        );

        /* 
          Aquí iría tu lógica Fetch/AJAX para enviar 'dataParaBaseDeDatos' al backend (Node, PHP, Python, etc.)
          Ejemplo:
          fetch('/api/traslados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataParaBaseDeDatos)
          })
        */

        // Feedback al usuario y reinicio del formulario
        alert(
          "¡Traslado validado y listo para guardar! (Revisa la consola para ver el JSON)",
        );

        formWizard.reset();
        currentStep = 1;
        updateWizard();

        // Opcional: Redirigir a la vista de "Traslados"
        document.querySelector('[data-view="traslados"]').click();
      }
    });
  }
});
