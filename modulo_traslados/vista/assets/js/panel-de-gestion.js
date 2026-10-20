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
    dashboard: "Panel Principal",
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
      location.href = "/sigsm/servicios_comunes/vista_general/index.php";
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

    const selectCategoria = document.getElementById("categoria_traslado");
    const secPaciente = document.getElementById("seccion_paciente");
    const secLogistica = document.getElementById("seccion_logistica");
    const inputCi = document.getElementById("ci_paciente");
    const selectMovilidad = document.getElementById("tipo_movilidad");
    const inputDetalle = document.getElementById("detalle_carga");

    if (selectCategoria) {
      selectCategoria.addEventListener("change", function () {
        const cat = this.value;
        inputCi.required = false;
        selectMovilidad.required = false;
        inputDetalle.required = false;

        if (cat === "PACIENTE") {
          secPaciente.classList.remove("d-none");
          secLogistica.classList.add("d-none");
          inputCi.required = true;
          selectMovilidad.required = true;
        } else {
          secPaciente.classList.add("d-none");
          secLogistica.classList.remove("d-none");
          inputDetalle.required = true;
        }
      });
    }

    function filtrarVehiculosCompatibles() {
      const cat = document.getElementById("categoria_traslado")?.value;
      const movilidad = document.getElementById("tipo_movilidad")
        ? document.getElementById("tipo_movilidad").value
        : "NO_APLICA";
      const reqUti = document.getElementById("requiere_soporte_uti")
        ? document.getElementById("requiere_soporte_uti").checked
        : false;

      const selectVehiculo = document.getElementById("vehiculo_select");
      if (!selectVehiculo) return;

      const opciones = selectVehiculo.querySelectorAll(
        'option:not([value=""])',
      );
      let vehiculosValidos = 0;

      opciones.forEach((opt) => {
        let esCompatible = true;
        if (cat === "PACIENTE") {
          if (reqUti && opt.getAttribute("data-uti") == "0")
            esCompatible = false;
          if (
            movilidad === "SILLA_RUEDAS" &&
            opt.getAttribute("data-sr") == "0"
          )
            esCompatible = false;
          if (movilidad === "CAMILLA" && opt.getAttribute("data-cam") == "0")
            esCompatible = false;
        } else if (cat === "MATERIAL_BIOLOGICO") {
          if (opt.getAttribute("data-bio") == "0") esCompatible = false;
        } else if (cat === "EQUIPAMIENTO" || cat === "INSUMOS") {
          if (opt.getAttribute("data-ins") == "0") esCompatible = false;
        }

        if (esCompatible) {
          opt.disabled = false;
          opt.text = opt.text.replace(" (No compatible)", "");
          vehiculosValidos++;
        } else {
          opt.disabled = true;
          if (!opt.text.includes("(No compatible)"))
            opt.text += " (No compatible)";
        }
      });

      if (
        selectVehiculo.selectedIndex > 0 &&
        selectVehiculo.options[selectVehiculo.selectedIndex].disabled
      ) {
        selectVehiculo.value = "";
      }

      document
        .getElementById("vehiculo_warning")
        ?.classList.toggle("d-none", vehiculosValidos > 0);
    }

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

      if (currentStep === 3) filtrarVehiculosCompatibles();

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
    // Función para mostrar alertas elegantes en pantalla (reemplaza a los alert() del navegador)
    function mostrarAlerta(mensaje, tipo = "danger") {
      const container = document.getElementById("form-alert-container");
      if (!container) return;

      const icono =
        tipo === "success"
          ? "bi-check-circle-fill"
          : "bi-exclamation-triangle-fill";

      container.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show d-flex align-items-center mt-4 mb-3" role="alert">
          <i class="bi ${icono} me-2 fs-5"></i>
          <div>${mensaje}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
      `;

      // Si es un éxito, la alerta desaparece sola después de 5 segundos
      if (tipo === "success") {
        setTimeout(() => {
          container.innerHTML = "";
        }, 5000);
      }
    }

    // Función de Validación Mejorada
    // Función para mostrar alertas elegantes en pantalla (reemplaza a los alert() del navegador)
    function mostrarAlerta(mensaje, tipo = "danger") {
      const container = document.getElementById("form-alert-container");
      if (!container) return;

      const icono =
        tipo === "success"
          ? "bi-check-circle-fill"
          : "bi-exclamation-triangle-fill";

      container.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show d-flex align-items-center mb-3" role="alert">
          <i class="bi ${icono} me-2 fs-5"></i>
          <div>${mensaje}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
      `;

      // Si es un éxito, la alerta desaparece sola después de 5 segundos
      if (tipo === "success") {
        setTimeout(() => {
          container.innerHTML = "";
        }, 5000);
      }
    }

    // Función de Validación Mejorada
    function validateCurrentStep() {
      const currentPanel = formWizard.querySelector(
        `.wizard-panel[data-step="${currentStep}"]`,
      );
      const inputs = currentPanel.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );
      let isValid = true;

      // 1. Validación base de HTML5 (campos vacíos)
      inputs.forEach((input) => {
        if (!input.checkValidity() || input.value.trim() === "") {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      // 2. Validaciones Específicas por Paso
      if (currentStep === 2) {
        const cat = document.getElementById("categoria_traslado")?.value;
        if (cat === "PACIENTE") {
          const ciInput = document.getElementById("ci_paciente");
          if (ciInput && ciInput.value) {
            // Limpia todo lo que no sea número y verifica que tenga al menos 7 u 8 dígitos
            const ciLimpia = ciInput.value.replace(/[^0-9]/g, "");
            if (ciLimpia.length < 7 || ciLimpia.length > 8) {
              isValid = false;
              ciInput.classList.add("is-invalid");
              document.getElementById("feedback-ci").textContent =
                "La cédula debe contener 7 u 8 números.";
            } else {
              ciInput.value = ciLimpia; // formatea el input para enviarlo limpio al servidor
            }
          }
        }
      }

      if (currentStep === 4) {
        const fechaInput = currentPanel.querySelector('input[name="fecha"]');
        if (fechaInput && fechaInput.value) {
          // Evitar que programen traslados en el pasado (ayer o antes)
          const fechaSeleccionada = fechaInput.value;
          const fechaHoy = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD local

          if (fechaSeleccionada < fechaHoy) {
            isValid = false;
            fechaInput.classList.add("is-invalid");
            fechaInput.nextElementSibling.textContent =
              "No puede programar un traslado en una fecha pasada.";
          }
        }
      }

      // Si algo falló, mostramos un aviso rápido
      if (!isValid) {
        mostrarAlerta(
          "Por favor, revise los campos marcados en rojo.",
          "warning",
        );
      } else {
        document.getElementById("form-alert-container").innerHTML = ""; // Limpiar alertas previas
      }

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

    // Acción botón Guardar (Submit final mejorado)
    formWizard.addEventListener("submit", (e) => {
      e.preventDefault();

      if (validateCurrentStep()) {
        const formData = new FormData(formWizard);
        formData.append("accion", "guardar");

        const btnSubmit = document.getElementById("btnSubmitForm");
        const textoOriginal = btnSubmit.innerHTML;
        btnSubmit.innerHTML =
          '<span class="spinner-border spinner-border-sm me-2"></span> GUARDANDO...';
        btnSubmit.disabled = true;

        fetch("../controlador/traslado_controlador.php", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.disabled = false;

            if (data.status === "success") {
              // ALERTA VISUAL DE ÉXITO (Sin popup del navegador)
              mostrarAlerta(
                "¡Traslado guardado y asignado exitosamente!",
                "success",
              );

              formWizard.reset();
              currentStep = 1;
              updateWizard();

              // Redirigir a la vista de tabla suavemente
              setTimeout(() => {
                document.querySelector('[data-view="traslados"]').click();
                cargarTraslados();
              }, 1500); // Esperamos 1.5s para que vea el mensaje verde antes de cambiar de pantalla
            } else {
              // ERROR DESDE EL SERVIDOR
              mostrarAlerta("Error del servidor: " + data.mensaje, "danger");
            }
          })
          .catch((err) => {
            console.error(err);
            mostrarAlerta("Error de conexión. Verifica la consola.", "danger");
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.disabled = false;
          });
      }
    });
  }
  /* --- CARGA DINÁMICA DE TRASLADOS DESDE LA BD --- */
  cargarTraslados();

  function cargarTraslados() {
    // Apuntamos al Controlador Maestro y le decimos qué acción queremos
    fetch("../controlador/traslado_controlador.php?accion=listar")
      .then((respuesta) => {
        if (!respuesta.ok)
          throw new Error("Error en la respuesta del servidor");
        return respuesta.json();
      })
      .then((datos) => {
        const tbody = document.getElementById("tabla-traslados-body");
        if (!tbody) return;

        tbody.innerHTML = "";

        if (datos.length === 0) {
          tbody.innerHTML =
            '<tr><td colspan="10" class="text-center text-muted py-4">No hay traslados registrados.</td></tr>';
          return;
        }

        datos.forEach((t) => {
          let claseEstado = "b-prep";
          let textoEstado = t.estado || "Pendiente";
          const estadoMin = textoEstado.toLowerCase();

          if (estadoMin.includes("camino") || estadoMin.includes("transito"))
            claseEstado = "b-transito";
          else if (estadoMin.includes("completado"))
            claseEstado = "b-completado";
          else if (estadoMin.includes("asignado")) claseEstado = "b-programado";
          else if (estadoMin.includes("cancelado")) claseEstado = "badge-red"; // Puedes definir esta clase en tu CSS

          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td><strong>AMB-${t.id_traslado || "N/A"}</strong></td>
            <td>${t.fecha || ""} ${t.hora || ""}</td>
            <td>${t.conductor || "-"}</td>
            <td>${t.enfermero || "-"}</td>
            <td>${t.paciente_elemento || "-"}</td>
            <td><span class="badge-tipo-traslado">${t.tipo_traslado || "Paciente"}</span></td>
            <td>${t.vehiculo || "-"}</td>
            <td>${t.destino || "-"}</td>
            <td>
              <span class="badge-estado ${claseEstado}">${textoEstado.replace("_", " ")}</span>
            </td>
            <td>
              <button class="btn-eye" title="Ver detalles">
                <i class="bi bi-eye-fill"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error consultando BD:", error);
        const tbody = document.getElementById("tabla-traslados-body");
        if (tbody)
          tbody.innerHTML =
            '<tr><td colspan="10" class="text-center text-danger py-4"><i class="bi bi-exclamation-triangle"></i> Error al cargar los datos desde el servidor.</td></tr>';
      });
  }
});
