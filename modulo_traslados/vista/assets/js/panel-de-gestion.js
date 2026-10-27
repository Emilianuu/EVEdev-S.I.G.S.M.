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
    darkModeToggle.checked = localStorage.getItem("theme") === "dark";
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

    window.addEventListener("storage", (e) => {
      if (e.key === "theme") {
        const isDark = e.newValue === "dark";
        darkModeToggle.checked = isDark;
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

      // Actualizar el título del topbar
      if (topbarTitle && sectionTitles[target]) {
        topbarTitle.textContent = sectionTitles[target];
      }

      // Cerrar sidebar en móviles
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("open");
      }
    });
  });

  /* --- Tabs inside Recursos --- */
  const tabPills = document.querySelectorAll(".tab-pill");
  tabPills.forEach((pill) => {
    pill.addEventListener("click", function () {
      tabPills.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");

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
        sidebar.classList.toggle("open");
      } else {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
      }
    });
  }

  /* --- LÓGICA DEL FORMULARIO WIZARD --- */
  const formWizard = document.getElementById("formNuevoTraslado");

  if (formWizard) {
    let currentStep = 1;
    const totalSteps = 3;

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

    function updateWizard() {
      panels.forEach((panel) => {
        if (parseInt(panel.getAttribute("data-step")) === currentStep) {
          panel.classList.remove("d-none");
        } else {
          panel.classList.add("d-none");
        }
      });

      stepsIndicators.forEach((step, index) => {
        if (index < currentStep) step.classList.add("active");
        else step.classList.remove("active");
      });

      btnPrev.disabled = currentStep === 1;
      if (currentStep === totalSteps) {
        btnNext.classList.add("d-none");
        btnSubmit.classList.remove("d-none");
      } else {
        btnNext.classList.remove("d-none");
        btnSubmit.classList.add("d-none");
      }
    }

    function mostrarAlerta(mensaje, tipo = "danger") {
      const container = document.getElementById("form-alert-container");
      if (!container) return;
      const icono =
        tipo === "success"
          ? "bi-check-circle-fill"
          : "bi-exclamation-triangle-fill";
      container.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show d-flex align-items-center mt-4 mb-3" role="alert"><i class="bi ${icono} me-2 fs-5"></i><div>${mensaje}</div><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
      if (tipo === "success")
        setTimeout(() => {
          container.innerHTML = "";
        }, 5000);
    }

    function validateCurrentStep() {
      const currentPanel = formWizard.querySelector(
        `.wizard-panel[data-step="${currentStep}"]`,
      );
      const inputs = currentPanel.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.checkValidity() || input.value.trim() === "") {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (currentStep === 2) {
        const cat = selectCategoria?.value;
        if (cat === "PACIENTE" && inputCi && inputCi.value) {
          const ciLimpia = inputCi.value.replace(/[^0-9]/g, "");
          if (ciLimpia.length < 7 || ciLimpia.length > 8) {
            isValid = false;
            inputCi.classList.add("is-invalid");
            document.getElementById("feedback-ci").textContent =
              "La cédula debe contener 7 u 8 números.";
          } else {
            inputCi.value = ciLimpia;
          }
        }
      }

      if (currentStep === 3) {
        const fechaInput = currentPanel.querySelector('input[name="fecha"]');
        if (fechaInput && fechaInput.value) {
          if (fechaInput.value < new Date().toISOString().split("T")[0]) {
            isValid = false;
            fechaInput.classList.add("is-invalid");
          }
        }
      }

      if (!isValid)
        mostrarAlerta("Revise los campos marcados en rojo.", "warning");
      else document.getElementById("form-alert-container").innerHTML = "";

      return isValid;
    }

    formWizard.addEventListener("input", (e) => {
      if (e.target.classList.contains("is-invalid"))
        e.target.classList.remove("is-invalid");
    });

    btnNext.addEventListener("click", () => {
      if (validateCurrentStep()) {
        currentStep++;
        updateWizard();
      }
    });

    btnPrev.addEventListener("click", () => {
      currentStep--;
      updateWizard();
    });

    formWizard.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateCurrentStep()) {
        const formData = new FormData(formWizard);
        formData.append("accion", "guardar");

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
              mostrarAlerta("¡Solicitud registrada correctamente!", "success");
              formWizard.reset();
              currentStep = 1;
              updateWizard();
              setTimeout(() => {
                document.querySelector('[data-view="traslados"]').click();
                cargarSolicitudesPendientes();
              }, 1500);
            } else {
              mostrarAlerta(data.mensaje, "danger");
            }
          })
          .catch((err) => {
            mostrarAlerta("Error de conexión.", "danger");
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.disabled = false;
          });
      }
    });
  }

  /* --- LOGICA DEL MODAL DE ASIGNACIÓN (APROBAR SOLICITUD) --- */
  window.abrirModalAsignacion = function (
    id_solicitud,
    categoria,
    movilidad,
    req_uti,
  ) {
    document.getElementById("modal_id_solicitud").value = id_solicitud;
    const selectVehiculo = document.getElementById("modal_vehiculo_select");
    const opciones = selectVehiculo.querySelectorAll('option:not([value=""])');
    let vehiculosValidos = 0;

    opciones.forEach((opt) => {
      let esCompatible = true;
      if (categoria === "PACIENTE") {
        if (req_uti === 1 && opt.getAttribute("data-uti") == "0")
          esCompatible = false;
        if (movilidad === "SILLA_RUEDAS" && opt.getAttribute("data-sr") == "0")
          esCompatible = false;
        if (movilidad === "CAMILLA" && opt.getAttribute("data-cam") == "0")
          esCompatible = false;
      } else if (
        categoria === "MATERIAL_BIOLOGICO" &&
        opt.getAttribute("data-bio") == "0"
      ) {
        esCompatible = false;
      } else if (
        (categoria === "EQUIPAMIENTO" || categoria === "INSUMOS") &&
        opt.getAttribute("data-ins") == "0"
      ) {
        esCompatible = false;
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

    if (selectVehiculo.options[selectVehiculo.selectedIndex]?.disabled)
      selectVehiculo.value = "";
    document
      .getElementById("modal_vehiculo_warning")
      .classList.toggle("d-none", vehiculosValidos > 0);

    const modalInstance = new bootstrap.Modal(
      document.getElementById("modalAsignarRecursos"),
    );
    modalInstance.show();
  };

  const formAsignar = document.getElementById("formAsignarRecursos");
  if (formAsignar) {
    formAsignar.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formAsignar);
      formData.append("accion", "asignar");

      const btnConf = document.getElementById("btnConfirmarAsignacion");
      const textoOrig = btnConf.innerHTML;
      btnConf.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Asignando...';
      btnConf.disabled = true;

      fetch("../controlador/traslado_controlador.php", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .then((d) => {
          btnConf.innerHTML = textoOrig;
          btnConf.disabled = false;
          if (d.status === "success") {
            bootstrap.Modal.getInstance(
              document.getElementById("modalAsignarRecursos"),
            ).hide();
            formAsignar.reset();
            cargarTraslados();
            cargarSolicitudesPendientes();
          } else {
            document.getElementById("modal-alert-container").innerHTML =
              `<div class="alert alert-danger">${d.mensaje}</div>`;
          }
        })
        .catch((err) => {
          btnConf.innerHTML = textoOrig;
          btnConf.disabled = false;
        });
    });
  }

  /* --- ALERTAS EN PANTALLA PARA SOLICITUDES --- */
  function mostrarAlertaSolicitudes(mensaje, tipo = "success") {
    const container = document.getElementById("alert-solicitudes-container");
    if (!container) return;
    const icono =
      tipo === "success"
        ? "bi-check-circle-fill"
        : "bi-exclamation-triangle-fill";
    container.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show d-flex align-items-center mb-4" role="alert">
                             <i class="bi ${icono} me-2 fs-5"></i><div>${mensaje}</div>
                             <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                           </div>`;
    setTimeout(() => {
      container.innerHTML = "";
    }, 5000);
  }

  /* --- RECHAZAR SOLICITUD (CON MODAL BOOTSTRAP) --- */
  let solicitudARechazar = null;

  window.rechazarSolicitud = function (id) {
    solicitudARechazar = id;
    document.getElementById("rechazo-id-text").textContent = "SOL-" + id;
    const modalRechazo = new bootstrap.Modal(
      document.getElementById("modalConfirmarRechazo"),
    );
    modalRechazo.show();
  };

  const btnConfirmarRechazo = document.getElementById("btnConfirmarRechazo");
  if (btnConfirmarRechazo) {
    btnConfirmarRechazo.addEventListener("click", function () {
      if (!solicitudARechazar) return;

      const btn = this;
      const originalText = btn.innerHTML;
      btn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Rechazando...';
      btn.disabled = true;

      const formData = new FormData();
      formData.append("accion", "rechazar");
      formData.append("id_solicitud", solicitudARechazar);

      fetch("../controlador/traslado_controlador.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          bootstrap.Modal.getInstance(
            document.getElementById("modalConfirmarRechazo"),
          ).hide();

          if (data.status === "success") {
            mostrarAlertaSolicitudes(
              "Solicitud SOL-" +
                solicitudARechazar +
                " rechazada correctamente.",
              "success",
            );
            cargarSolicitudesPendientes();
          } else {
            mostrarAlertaSolicitudes("Error: " + data.mensaje, "danger");
          }
          solicitudARechazar = null;
        })
        .catch((err) => {
          console.error(err);
          btn.innerHTML = originalText;
          btn.disabled = false;
          bootstrap.Modal.getInstance(
            document.getElementById("modalConfirmarRechazo"),
          ).hide();
          mostrarAlertaSolicitudes(
            "Error de conexión al rechazar la solicitud.",
            "danger",
          );
          solicitudARechazar = null;
        });
    });
  }

  /* --- MODIFICAR TRASLADO --- */
  function mostrarAlertaTrasladosTop(mensaje, tipo = "success") {
    const container = document.getElementById("alert-traslados-container");
    if (!container) return;
    const icono =
      tipo === "success"
        ? "bi-check-circle-fill"
        : "bi-exclamation-triangle-fill";
    container.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show d-flex align-items-center mb-3" role="alert">
                             <i class="bi ${icono} me-2 fs-5"></i><div>${mensaje}</div>
                             <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                           </div>`;
    setTimeout(() => {
      container.innerHTML = "";
    }, 5000);
  }

  window.modificarTraslado = function (id) {
    // 1. Obtener datos actuales
    fetch(
      `../controlador/traslado_controlador.php?accion=obtener_traslado&id_traslado=${id}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          document.getElementById("mod_title_id").textContent = id;
          document.getElementById("mod_id_traslado").value = id;
          document.getElementById("mod_estado").value = data.id_estado || "1";
          document.getElementById("mod_vehiculo").value =
            data.id_vehiculo || "";
          document.getElementById("mod_conductor").value =
            data.id_conductor || "";
          document.getElementById("mod_enfermero").value =
            data.id_enfermero || "";

          const modalMod = new bootstrap.Modal(
            document.getElementById("modalModificarTraslado"),
          );
          modalMod.show();
        }
      })
      .catch((err) => alert("Error al cargar los datos del traslado."));
  };

  const formModificar = document.getElementById("formModificarTraslado");
  if (formModificar) {
    formModificar.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = document.getElementById("btnGuardarModificacion");
      const textoOrig = btn.innerHTML;
      btn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Guardando...';
      btn.disabled = true;

      const formData = new FormData(this);
      formData.append("accion", "modificar");

      fetch("../controlador/traslado_controlador.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          btn.innerHTML = textoOrig;
          btn.disabled = false;
          bootstrap.Modal.getInstance(
            document.getElementById("modalModificarTraslado"),
          ).hide();

          if (data.status === "success") {
            mostrarAlertaTrasladosTop(
              "Traslado AMB-" +
                formData.get("id_traslado") +
                " modificado correctamente.",
              "success",
            );
            cargarTraslados(); // Recarga la tabla de arriba
          } else {
            mostrarAlertaTrasladosTop("Error: " + data.mensaje, "danger");
          }
        })
        .catch((err) => {
          btn.innerHTML = textoOrig;
          btn.disabled = false;
          bootstrap.Modal.getInstance(
            document.getElementById("modalModificarTraslado"),
          ).hide();
          mostrarAlertaTrasladosTop(
            "Error de conexión al modificar el traslado.",
            "danger",
          );
        });
    });
  }

  /* --- CANCELAR TRASLADO (CON MODAL) --- */
  let trasladoACancelar = null;

  window.cancelarTraslado = function (id) {
    trasladoACancelar = id;
    document.getElementById("cancel-id-text").textContent = id;
    const modalCancel = new bootstrap.Modal(
      document.getElementById("modalConfirmarCancelacion"),
    );
    modalCancel.show();
  };

  const btnConfirmarCancelacion = document.getElementById(
    "btnConfirmarCancelacion",
  );
  if (btnConfirmarCancelacion) {
    btnConfirmarCancelacion.addEventListener("click", function () {
      if (!trasladoACancelar) return;

      const btn = this;
      const originalText = btn.innerHTML;
      btn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Cancelando...';
      btn.disabled = true;

      const formData = new FormData();
      formData.append("accion", "cancelar");
      formData.append("id_traslado", trasladoACancelar);

      fetch("../controlador/traslado_controlador.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          bootstrap.Modal.getInstance(
            document.getElementById("modalConfirmarCancelacion"),
          ).hide();

          if (data.status === "success") {
            mostrarAlertaTrasladosTop(
              "Traslado AMB-" + trasladoACancelar + " cancelado correctamente.",
              "success",
            );
            cargarTraslados(); // Refresca la tabla
          } else {
            mostrarAlertaTrasladosTop("Error: " + data.mensaje, "danger");
          }
          trasladoACancelar = null;
        })
        .catch((err) => {
          console.error(err);
          btn.innerHTML = originalText;
          btn.disabled = false;
          bootstrap.Modal.getInstance(
            document.getElementById("modalConfirmarCancelacion"),
          ).hide();
          mostrarAlertaTrasladosTop(
            "Error de conexión al cancelar el traslado.",
            "danger",
          );
          trasladoACancelar = null;
        });
    });
  }

  /* --- CARGA DINÁMICA DE TABLAS --- */
  cargarTraslados();
  cargarSolicitudesPendientes();

  function cargarTraslados() {
    fetch("../controlador/traslado_controlador.php?accion=listar")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const tbody = document.getElementById("tabla-traslados-body");
        if (!tbody) return;
        tbody.innerHTML = "";

        if (datos.length === 0) {
          tbody.innerHTML =
            '<tr><td colspan="9" class="text-center text-muted py-4">No hay traslados activos registrados.</td></tr>';
          return;
        }

        datos.forEach((t) => {
          let claseEstado = "b-prep";
          let textoEstado = t.estado || "Pendiente";
          const estadoMin = textoEstado.toLowerCase();

          // 1. Lógica para el color Naranja en el estado "En Camino"
          let estiloNaranja = "";
          if (estadoMin.includes("camino") || estadoMin.includes("transito")) {
            claseEstado = ""; // Quitamos la clase azul por defecto
            estiloNaranja =
              "background-color: #fd7e14; color: white; border: none;"; // Naranja Bootstrap
          } else if (estadoMin.includes("completado"))
            claseEstado = "b-completado";
          else if (estadoMin.includes("asignado")) claseEstado = "b-programado";
          else if (estadoMin.includes("cancelado"))
            claseEstado = "bg-danger text-white";

          tbody.innerHTML += `
            <tr>
              <td><strong>AMB-${t.id_traslado || "N/A"}</strong></td>
              <td>${t.fecha} ${t.hora}</td>
              <td>${t.vehiculo || "-"}</td>
              <td>${t.conductor || "-"}</td>
              <td>${t.enfermero || "-"}</td>
              <td>${t.paciente_elemento || "-"}</td>
              <td>${t.destino || "-"}</td>
              <td><span class="badge-estado ${claseEstado}" style="${estiloNaranja}">${textoEstado.replace("_", " ")}</span></td>
              
              <!-- 2. Botón desplegable de acciones -->
              <td class="text-center">
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-gear-fill"></i> Opciones
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                    <li>
                      <a class="dropdown-item text-info fw-bold" href="#" onclick="verSeguimiento(${t.id_traslado}); return false;">
                        <i class="bi bi-geo-alt-fill me-2"></i> Ver Seguimiento
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item text-primary" href="#" onclick="modificarTraslado(${t.id_traslado}); return false;">
                        <i class="bi bi-pencil-square me-2"></i> Modificar estado
                      </a>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <a class="dropdown-item text-danger" href="#" onclick="cancelarTraslado(${t.id_traslado}); return false;">
                        <i class="bi bi-x-circle me-2"></i> Cancelar viaje
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>`;
        });
      })
      .catch(console.error);
  }

  function cargarSolicitudesPendientes() {
    fetch("../controlador/traslado_controlador.php?accion=listar_pendientes")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const tbody = document.getElementById("tabla-solicitudes-body");
        if (!tbody) return;
        tbody.innerHTML = "";

        if (datos.length === 0) {
          tbody.innerHTML =
            '<tr><td colspan="7" class="text-center text-muted py-4">No hay solicitudes pendientes.</td></tr>';
          return;
        }

        datos.forEach((s) => {
          tbody.innerHTML += `
            <tr>
              <td><strong>SOL-${s.id_solicitud}</strong></td>
              <td>${s.fecha}</td>
              <td><span class="badge-tipo-traslado">${s.categoria_traslado}</span></td>
              <td>${s.paciente_elemento}</td>
              <td>${s.destino}</td>
              <td><small class="text-muted">${s.motivo}</small></td>
              
              <!-- Botón desplegable de acciones para solicitudes -->
              <td class="text-center">
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-list-check"></i> Acciones
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                    <li>
                      <a class="dropdown-item text-success fw-bold" href="#" onclick="abrirModalAsignacion(${s.id_solicitud}, '${s.categoria_traslado}', '${s.tipo_movilidad}', ${s.requiere_soporte_uti}); return false;">
                        <i class="bi bi-check-lg me-2"></i> Aprobar (Asignar)
                      </a>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <a class="dropdown-item text-danger" href="#" onclick="rechazarSolicitud(${s.id_solicitud}); return false;">
                        <i class="bi bi-x-lg me-2"></i> Rechazar
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>`;
        });
      })
      .catch(console.error);
  }
  /* --- CARGA DINÁMICA DEL DASHBOARD --- */
  function cargarDashboard() {
    fetch("../controlador/traslado_controlador.php?accion=datos_dashboard")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "error") return;

        // 1. Actualizar Tarjetas Estadísticas
        const elActivos = document.getElementById("dash-traslados-activos");
        const elDia = document.getElementById("dash-traslados-dia");
        if (elActivos) elActivos.textContent = data.traslados_activos || 0;
        if (elDia) elDia.textContent = data.traslados_dia || 0;

        // 2. Actualizar Lista de Traslados Activos
        const contLista = document.getElementById("dash-lista-activos");
        if (!contLista) return;
        contLista.innerHTML = "";

        if (!data.lista_activos || data.lista_activos.length === 0) {
          contLista.innerHTML =
            '<p class="text-muted text-center py-3 mb-0">No hay traslados activos en este momento.</p>';
          return;
        }

        data.lista_activos.forEach((t) => {
          let estadoTxt = t.estado || "ASIGNADO";
          let estadoMin = estadoTxt.toLowerCase();

          // Lógica de progreso por etapas (Mini Línea de Tiempo)
          let porcentaje = 25;
          let textoProgreso = "1/3 - Recursos asignados (En Base)";
          let claseBadge = "b-prep";
          let barraClase = "progress-bar-primary";

          if (estadoMin.includes("asignado")) {
            porcentaje = 25;
            textoProgreso = "1/3 - Recursos asignados (En Base)";
            claseBadge = "b-programado";
          } else if (
            estadoMin.includes("salida") ||
            estadoMin.includes("preparacion")
          ) {
            porcentaje = 50;
            textoProgreso = "2/3 - Vehículo preparado / Saliendo";
            claseBadge = "b-salida";
            barraClase = "progress-bar-amber";
          } else if (
            estadoMin.includes("camino") ||
            estadoMin.includes("transito")
          ) {
            porcentaje = 75;
            textoProgreso = "3/3 - En tránsito hacia destino";
            claseBadge = "b-transito";
          } else if (estadoMin.includes("completado")) {
            porcentaje = 100;
            textoProgreso = "Llegada confirmada";
            claseBadge = "b-completado";
            barraClase = "bg-success";
          }

          contLista.innerHTML += `
            <div class="traslado-card">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 class="mb-1">AMB-${t.id_traslado} – ${t.paciente_elemento}</h6>
                  <small class="text-muted"><i class="bi bi-geo-alt me-1"></i>Destino: ${t.destino}</small>
                </div>
                <span class="badge-estado ${claseBadge}">${estadoTxt.replace("_", " ")}</span>
              </div>
              <div class="progress mb-1 progress-sm">
                <div class="progress-bar ${barraClase} progress-bar-striped progress-bar-animated" style="width: ${porcentaje}%"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <small class="text-muted fw-semibold text-xs">${textoProgreso}</small>
                <small class="text-primary text-xs" style="cursor:pointer; font-weight:600;" onclick="verSeguimiento(${t.id_traslado})">
                  Ver detalle <i class="bi bi-arrow-right"></i>
                </small>
              </div>
            </div>`;
        });
      })
      .catch(console.error);
  }

  /* --- INICIALIZACIÓN DE VISTAS --- */
  cargarDashboard();
  cargarTraslados();
  cargarSolicitudesPendientes();

  /* --- SEGUIMIENTO DINÁMICO --- */
  window.verSeguimiento = function (id_traslado) {
    // 1. Cambiar a la pestaña de seguimiento
    document.querySelector('[data-view="seguimiento"]').click();

    // Mostrar loader temporal
    document.getElementById("seg-empty-state").classList.add("d-none");
    document.getElementById("seg-content-container").classList.remove("d-none");
    document.getElementById("seg-timeline-container").innerHTML =
      '<div class="text-center py-4"><span class="spinner-border spinner-border-sm text-primary"></span> Cargando ruta...</div>';

    // 2. Traer datos
    fetch(
      `../controlador/traslado_controlador.php?accion=seguimiento&id_traslado=${id_traslado}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "success") return;

        const det = data.detalle;
        const hist = data.historial;

        // Llenar Tarjeta Izquierda
        document.getElementById("seg-titulo").textContent =
          `AMB-${det.id_traslado}`;
        document.getElementById("seg-paciente").textContent =
          `${det.paciente_elemento} ${det.ci_paciente ? "(CI: " + det.ci_paciente + ")" : ""}`;
        document.getElementById("seg-vehiculo").textContent =
          det.vehiculo || "-";
        document.getElementById("seg-conductor").textContent =
          det.conductor || "-";
        document.getElementById("seg-enfermero").textContent =
          det.enfermero || "No asignado";
        document.getElementById("seg-origen").textContent = det.origen;
        document.getElementById("seg-destino").textContent = det.destino;

        // Determinar estado actual y barra
        let progreso = 25; // Base Asignado
        let badgeClass = "b-prep";
        let estadoActual = "Asignado";

        if (hist.length > 0) {
          estadoActual = hist[hist.length - 1].estado;
          const estadoMin = estadoActual.toLowerCase();
          if (estadoMin.includes("camino") || estadoMin.includes("transito")) {
            progreso = 65;
            badgeClass = "b-transito";
          } else if (estadoMin.includes("completado")) {
            progreso = 100;
            badgeClass = "b-completado";
          } else if (estadoMin.includes("cancelado")) {
            progreso = 100;
            badgeClass = "bg-danger";
          }
        }

        document.getElementById("seg-badge").className =
          `badge-estado ${badgeClass}`;
        document.getElementById("seg-badge").textContent = estadoActual.replace(
          "_",
          " ",
        );

        const bar = document.getElementById("seg-progress-bar");
        bar.style.width = progreso + "%";
        bar.className = `progress-bar ${progreso === 100 ? (estadoActual.includes("CANCELADO") ? "bg-danger" : "bg-success") : "progress-bar-primary"}`;

        // 3. Dibujar Línea de Tiempo
        let timelineHTML = "";

        // Paso base
        timelineHTML += createTimelineStep(
          "done",
          "bi-file-earmark-check",
          "Solicitud creada",
          "Ingresada y procesada",
          true,
        );

        let completado = false;
        let cancelado = false;

        hist.forEach((h, idx) => {
          const isLast = idx === hist.length - 1;
          const est = h.estado.toUpperCase();

          let dot = "done";
          let icon = "bi-check-lg";

          if (est.includes("CANCELADO")) {
            dot = "bg-danger text-white";
            icon = "bi-x-lg";
            cancelado = true;
          } else if (est.includes("CAMINO") || est.includes("TRANSITO")) {
            icon = "bi-truck";
            if (isLast) dot = "current";
          } else if (est.includes("COMPLETADO")) {
            icon = "bi-flag-fill";
            completado = true;
          }

          timelineHTML += createTimelineStep(
            dot,
            icon,
            h.estado.replace("_", " "),
            h.observaciones,
            isLast && !completado && !cancelado,
          );
        });

        // Pasos futuros (solo si no ha terminado)
        if (!completado && !cancelado) {
          if (progreso < 65)
            timelineHTML += createTimelineStep(
              "pending",
              "bi-truck",
              "En Tránsito",
              "Vehículo en movimiento",
              false,
            );
          timelineHTML += createTimelineStep(
            "pending",
            "bi-geo-alt",
            "Llegada a Destino",
            det.destino,
            false,
          );
        }

        document.getElementById("seg-timeline-container").innerHTML =
          timelineHTML;
      })
      .catch((err) => console.error("Error al cargar seguimiento:", err));
  };

  // Helper HTML para la Línea de Tiempo
  function createTimelineStep(dotClass, iconClass, title, subtitle, isActive) {
    return `
        <div class="timeline-item">
          <div class="tl-dot ${dotClass}"><i class="bi ${iconClass} ${dotClass === "pending" ? "timeline-icon-sm" : "timeline-icon-lg"}"></i></div>
          <div>
            <div class="tl-title ${isActive ? "active-step" : dotClass === "pending" ? "timeline-title-muted" : ""}">${title}</div>
            ${subtitle ? `<div class="tl-sub">${subtitle}</div>` : ""}
          </div>
        </div>
      `;
  }
});
