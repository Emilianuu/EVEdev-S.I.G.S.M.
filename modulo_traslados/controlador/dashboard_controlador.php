<?php
// modulo_traslados/controlador/dashboard_controlador.php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verifica que el usuario haya iniciado sesión
if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../../servicios_comunes/autenticacion/login_controlador.php");
    exit();
}

// (Opcional) Aquí puedes agregar la lógica para verificar si el usuario 
// tiene el rol correcto (Conductor, Enfermero u Operador) para acceder a este módulo.

// Si todo está correcto, carga la vista completa del panel de gestión
require_once '../vista/panel-de-gestion.php';
