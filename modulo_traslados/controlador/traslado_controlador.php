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

// 2. Traer el modelo (Asegúrate de que el nombre del archivo coincida con el tuyo, ej: TrasladoModelo.php)
require_once '../modelo/traslado_modelo.php';

// 3. Capturar la acción solicitada por JavaScript
$accion = $_GET['accion'] ?? $_POST['accion'] ?? '';

// 4. Director de peticiones (Switch)
switch ($accion) {

    case 'listar':
        // Carga la tabla superior (Traslados activos/confirmados)
        $traslados = TrasladoModelo::obtenerTodosLosTraslados();
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($traslados);
        break;

    case 'listar_pendientes':
        // Carga la tabla inferior (Solicitudes sin recursos)
        $pendientes = TrasladoModelo::obtenerSolicitudesPendientes();
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($pendientes);
        break;

    case 'guardar':
        // Se ejecuta al terminar el Asistente de "Nuevo Traslado" (Guarda como PENDIENTE)
        $datos = $_POST;
        $id_usuario = $_SESSION['id_usuario']; // El usuario que hace la gestión

        $resultado = TrasladoModelo::guardarTraslado($datos, $id_usuario);

        header('Content-Type: application/json; charset=utf-8');
        if ($resultado['status'] === 'success') {
            echo json_encode($resultado);
        } else {
            http_response_code(500);
            echo json_encode($resultado);
        }
        break;

    case 'asignar':
        // Se ejecuta desde la Ventana Modal al Aprobar una solicitud
        $datos = $_POST;
        $id_usuario = $_SESSION['id_usuario']; // El operador logístico que despacha

        $resultado = TrasladoModelo::asignarRecursos($datos, $id_usuario);

        header('Content-Type: application/json; charset=utf-8');
        if ($resultado['status'] === 'success') {
            echo json_encode($resultado);
        } else {
            http_response_code(500);
            echo json_encode($resultado);
        }
        break;

    case 'rechazar':
        $id_solicitud = $_POST['id_solicitud'] ?? null;
        if ($id_solicitud) {
            $resultado = TrasladoModelo::rechazarSolicitud($id_solicitud);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($resultado);
            exit; // Corta la ejecución para evitar texto extra en la respuesta
        } else {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'mensaje' => 'Falta el ID de la solicitud.']);
            exit;
        }
        break;

    default:
        http_response_code(400);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Acción no válida o no especificada']);
        break;
}
