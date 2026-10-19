<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verifica que el usuario haya iniciado sesión
if (!isset($_SESSION['id_usuario'])) {
    // Si no está logueado, responde con un error 403 (Prohibido) para que JS lo maneje
    http_response_code(403);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'No autorizado']);
    exit();
}

// 2. Traer el modelo
require_once '../modelo/traslado_modelo.php';

// 3. Capturar la acción solicitada por JavaScript
$accion = $_GET['accion'] ?? $_POST['accion'] ?? '';

// 4. Director de peticiones (Switch)
switch ($accion) {

    case 'listar':
        $traslados = TrasladoModelo::obtenerTodosLosTraslados();
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($traslados);
        break;

    // Aquí abajo irás agregando más casos en el futuro (case 'guardar':, case 'eliminar':, etc.)

    default:
        http_response_code(400);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Acción no válida o no especificada']);
        break;
}
