<?php
// modulo_documentacion/controlador/dashboard_controlador.php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verifica sesión
if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../../servicios_comunes/autenticacion/login_controlador.php");
    exit();
}

// Si todo está correcto, carga la vista del panel de administración
require_once '../vista/panel-de-administracion.php';
