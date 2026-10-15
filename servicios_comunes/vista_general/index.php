<?php
// servicios_comunes/vista_general/index.php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../autenticacion/login_controlador.php");
    exit();
}
?>
<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hospital de Clínicas – Sistema de Gestión</title>

    <!-- ENLACE AL CSS CENTRALIZADO -->
    <link rel="stylesheet" href="estilos.css" />

    <!-- FUENTES E ICONOS DE BOOTSTRAP -->
    <link href="https://googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>

<body>
    <header>
        <div class="header-brand">
            <img src="logo.png" alt="Logo Hospital de Clínicas" class="custom-logo" />
            <div>
                <div class="header-title">Hospital de Clínicas</div>
                <div class="header-subtitle">Dr. Manuel Quintela</div>
            </div>
        </div>
        <div style="display: flex; align-items: center; gap: 16px">
            <span style="font-size: 0.85rem; color: var(--slate-700);">
                <i class="bi bi-person-circle"></i> <strong><?php echo htmlspecialchars($_SESSION['nombre_completo']); ?></strong>
            </span>
            <a href="../autenticacion/logout.php" class="btn-logout"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</a>
        </div>
    </header>

    <main>
        <div class="wrapper">
            <div class="page-eyebrow">Portal de módulos</div>
            <h1 class="page-heading">Sistema de Gestión Institucional</h1>
            <p class="page-desc">Seleccioná el módulo al que querés acceder. Cada sección es independiente y cuenta con control de acceso por rol.</p>

            <div class="modules-grid">
                <a href="../../modulo_traslados/controlador/dashboard_controlador.php" class="module-card" style="--card-accent: var(--accent-traslado)">
                    <div class="card-icon"><i class="bi bi-truck"></i></div>
                    <div class="card-body">
                        <div class="card-label">Operaciones</div>
                        <h2 class="card-title">Ambulancias y Traslados</h2>
                        <p class="card-desc">Gestión de solicitudes, asignación de vehículos y seguimiento en tiempo real.</p>
                    </div>
                    <div class="card-footer-row">
                        <div class="card-chips">
                            <span class="chip">Conductor</span><span class="chip">Enfermero</span><span class="chip">Operador</span>
                        </div>
                        <i class="bi bi-arrow-right card-arrow"></i>
                    </div>
                </a>

                <a href="../../modulo_documentacion/controlador/dashboard_controlador.php" class="module-card" style="--card-accent: var(--accent-admin)">
                    <div class="card-icon"><i class="bi bi-folder"></i></div>
                    <div class="card-body">
                        <div class="card-label">Administración</div>
                        <h2 class="card-title">Gestión de Documentación</h2>
                        <p class="card-desc">Administración de registros, documentos clínicos y configuración del sistema.</p>
                    </div>
                    <div class="card-footer-row">
                        <div class="card-chips"><span class="chip">Administrador</span></div>
                        <i class="bi bi-arrow-right card-arrow"></i>
                    </div>
                </a>
            </div>
        </div>
    </main>

    <footer>Hospital de Clínicas Dr. Manuel Quintela — Sistema interno de gestión institucional</footer>

    <script>
        if (localStorage.getItem("theme") === "dark") document.documentElement.setAttribute("data-theme", "dark");
        window.addEventListener("storage", (e) => {
            if (e.key === "theme") {
                e.newValue === "dark" ? document.documentElement.setAttribute("data-theme", "dark") : document.documentElement.removeAttribute("data-theme");
            }
        });
    </script>
</body>

</html>