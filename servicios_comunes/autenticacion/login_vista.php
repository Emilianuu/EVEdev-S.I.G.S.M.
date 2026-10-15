<!-- servicios_comunes/autenticacion/login_vista.php -->
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso Institucional - Hospital de Clínicas</title>

    <!-- ENLACE AL CSS CENTRALIZADO -->
    <link rel="stylesheet" href="../vista_general/estilos.css" />

    <!-- FUENTES E ICONOS DE BOOTSTRAP -->
    <link href="https://googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>

<body>
    <main>
        <div class="login-card">
            <div class="login-header">
                <img src="../vista_general/logo.png" alt="Logo Hospital de Clínicas" class="login-logo" />
                <h2>Acceso Institucional</h2>
                <p>Ingrese sus credenciales del Hospital</p>
            </div>

            <?php if (isset($error) && !empty($error)): ?>
                <div class="alert-error">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form action="login_controlador.php" method="POST">
                <div class="form-group">
                    <label for="email">Usuario Institucional (Email)</label>
                    <input type="email" id="email" name="email" placeholder="ejemplo@clinicas.edu.uy" required
                        value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="contrasena">Contraseña</label>
                    <input type="password" id="contrasena" name="contrasena" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn-submit"><i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión</button>
            </form>

            <div class="login-footer">
                <hr>
                <p><strong>S.I.G.S.M.</strong><br>Hospital de Clínicas Dr. Manuel Quintela</p>
            </div>
        </div>
    </main>

    <script>
        // Sincronización del Modo Oscuro
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    </script>
</body>

</html>