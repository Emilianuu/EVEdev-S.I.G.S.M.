<?php
// modelo/TrasladoModelo.php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sigsm/servicios_comunes/conexion_BD/conexion.php';

class TrasladoModelo
{
    public static function obtenerTodosLosTraslados()
    {
        global $conexion;
        try {
            $sql = "SELECT 
                        t.id_traslado, 
                        DATE_FORMAT(s.fecha_solicitud, '%d/%m/%Y') AS fecha,
                        TIME_FORMAT(s.fecha_solicitud, '%H:%i') AS hora,
                        v.matricula AS vehiculo,
                        s.categoria_traslado AS tipo_traslado,
                        u_dest.nombre AS destino,
                        e.nombre AS estado,
                        COALESCE(CONCAT(pac.nombre, ' ', pac.apellido), s.detalle_carga, 'Sin especificar') AS paciente_elemento,
                        (SELECT CONCAT(p.nombre, ' ', p.apellido) 
                         FROM PERSONAL_TRASLADO pt JOIN PERSONAL p ON pt.id_personal = p.id_personal 
                         WHERE pt.id_traslado = t.id_traslado AND pt.rol_en_traslado = 'CONDUCTOR' LIMIT 1) AS conductor,
                        (SELECT CONCAT(p.nombre, ' ', p.apellido) 
                         FROM PERSONAL_TRASLADO pt JOIN PERSONAL p ON pt.id_personal = p.id_personal 
                         WHERE pt.id_traslado = t.id_traslado AND pt.rol_en_traslado = 'ENFERMERO' LIMIT 1) AS enfermero
                    FROM TRASLADO t
                    JOIN SOLICITUD_TRASLADO s ON t.id_solicitud = s.id_solicitud
                    LEFT JOIN PACIENTE pac ON s.ci_paciente = pac.ci
                    JOIN VEHICULO v ON t.id_vehiculo = v.id_vehiculo
                    JOIN RUTA r ON t.id_ruta = r.id_ruta
                    JOIN UBICACION u_dest ON r.id_destino = u_dest.id_ubicacion
                    LEFT JOIN (
                        SELECT id_traslado, id_estado FROM HISTORIAL_ESTADO 
                        WHERE id_historial IN (SELECT MAX(id_historial) FROM HISTORIAL_ESTADO GROUP BY id_traslado)
                    ) he ON t.id_traslado = he.id_traslado
                    LEFT JOIN ESTADO_TRASLADO e ON he.id_estado = e.id_estado
                    ORDER BY s.fecha_solicitud DESC";

            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error: " . $e->getMessage());
            return [];
        }
    }

    public static function obtenerSolicitudesPendientes()
    {
        global $conexion;
        try {
            $sql = "SELECT 
                        s.id_solicitud, 
                        DATE_FORMAT(s.fecha_solicitud, '%d/%m/%Y %H:%i') AS fecha,
                        s.categoria_traslado,
                        s.tipo_movilidad,
                        s.requiere_soporte_uti,
                        COALESCE(CONCAT(pac.nombre, ' ', pac.apellido), s.detalle_carga, 'Sin especificar') AS paciente_elemento,
                        u_dest.nombre AS destino,
                        s.motivo
                    FROM SOLICITUD_TRASLADO s
                    LEFT JOIN PACIENTE pac ON s.ci_paciente = pac.ci
                    JOIN UBICACION u_dest ON s.id_destino = u_dest.id_ubicacion
                    WHERE s.estado_solicitud = 'PENDIENTE' 
                    ORDER BY s.fecha_solicitud ASC";

            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error en obtenerSolicitudesPendientes: " . $e->getMessage());
            return [];
        }
    }

    public static function guardarTraslado($datos, $id_usuario)
    {
        global $conexion;
        try {
            $conexion->beginTransaction();

            $categoria = $datos['categoria_traslado'];
            $ci_paciente = null;
            $detalle_carga = null;
            $tipo_movilidad = 'NO_APLICA';
            $requiere_soporte_uti = 0;

            if ($categoria === 'PACIENTE') {
                $ci_paciente = $datos['ci_paciente'];
                $tipo_movilidad = $datos['tipo_movilidad'];
                $requiere_soporte_uti = isset($datos['requiere_soporte_uti']) ? 1 : 0;

                $stmtPac = $conexion->prepare("SELECT ci FROM PACIENTE WHERE ci = ?");
                $stmtPac->execute([$ci_paciente]);
                if ($stmtPac->rowCount() == 0) {
                    $stmtInsPac = $conexion->prepare("INSERT INTO PACIENTE (ci, nombre, apellido, fecha_nacimiento) VALUES (?, 'Paciente', 'Temporal', '1990-01-01')");
                    $stmtInsPac->execute([$ci_paciente]);
                }
            } else {
                $detalle_carga = $datos['detalle_carga'];
            }

            $fecha_solicitud = $datos['fecha'] . ' ' . $datos['hora'] . ':00';
            $sqlSol = "INSERT INTO SOLICITUD_TRASLADO 
                   (categoria_traslado, ci_paciente, detalle_carga, tipo_movilidad, requiere_soporte_uti, id_origen, id_destino, id_canal, id_usuario_solicit, fecha_solicitud, motivo, estado_solicitud) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, 2, ?, ?, ?, 'PENDIENTE')";

            $stmtSol = $conexion->prepare($sqlSol);
            $stmtSol->execute([
                $categoria,
                $ci_paciente,
                $detalle_carga,
                $tipo_movilidad,
                $requiere_soporte_uti,
                $datos['origen'],
                $datos['destino'],
                $id_usuario,
                $fecha_solicitud,
                $datos['motivo']
            ]);

            $conexion->commit();
            return ['status' => 'success', 'mensaje' => 'Solicitud de traslado registrada como PENDIENTE.'];
        } catch (PDOException $e) {
            $conexion->rollBack();
            return ['status' => 'error', 'mensaje' => $e->getMessage()];
        }
    }

    public static function asignarRecursos($datos, $id_usuario)
    {
        global $conexion;
        try {
            $conexion->beginTransaction();

            $id_solicitud = $datos['id_solicitud'];
            $id_vehiculo = $datos['vehiculo'];
            $id_conductor = $datos['conductor'];
            $id_enfermero = !empty($datos['enfermero']) ? $datos['enfermero'] : null;

            // 1. Buscar origen y destino de la solicitud
            $stmtSol = $conexion->prepare("SELECT id_origen, id_destino FROM SOLICITUD_TRASLADO WHERE id_solicitud = ?");
            $stmtSol->execute([$id_solicitud]);
            $solicitud = $stmtSol->fetch(PDO::FETCH_ASSOC);

            // 2. Obtener o crear ruta
            $stmtRuta = $conexion->prepare("SELECT id_ruta FROM RUTA WHERE id_origen = ? AND id_destino = ?");
            $stmtRuta->execute([$solicitud['id_origen'], $solicitud['id_destino']]);
            $ruta = $stmtRuta->fetch(PDO::FETCH_ASSOC);

            if ($ruta) {
                $id_ruta = $ruta['id_ruta'];
            } else {
                $stmtInsRuta = $conexion->prepare("INSERT INTO RUTA (id_origen, id_destino, distancia_km) VALUES (?, ?, 5.00)");
                $stmtInsRuta->execute([$solicitud['id_origen'], $solicitud['id_destino']]);
                $id_ruta = $conexion->lastInsertId();
            }

            // 3. Crear traslado
            $sqlTras = "INSERT INTO TRASLADO (id_solicitud, id_vehiculo, id_ruta) VALUES (?, ?, ?)";
            $stmtTras = $conexion->prepare($sqlTras);
            $stmtTras->execute([$id_solicitud, $id_vehiculo, $id_ruta]);
            $id_traslado = $conexion->lastInsertId();

            // 4. Asignar personal
            $stmtPers = $conexion->prepare("INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES (?, ?, 'CONDUCTOR')");
            $stmtPers->execute([$id_traslado, $id_conductor]);

            if ($id_enfermero) {
                $stmtEnf = $conexion->prepare("INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES (?, ?, 'ENFERMERO')");
                $stmtEnf->execute([$id_traslado, $id_enfermero]);
            }

            // 5. Registrar Historial del traslado
            $stmtHist = $conexion->prepare("INSERT INTO HISTORIAL_ESTADO (id_traslado, id_estado, id_usuario, observaciones) VALUES (?, 1, ?, 'Recursos asignados operativamente')");
            $stmtHist->execute([$id_traslado, $id_usuario]);

            // 6. ACTUALIZAR ESTADO DE LA SOLICITUD (Esto la elimina de la tabla inferior)
            $stmtUpdateSol = $conexion->prepare("UPDATE SOLICITUD_TRASLADO SET estado_solicitud = 'ASIGNADA' WHERE id_solicitud = ?");
            $stmtUpdateSol->execute([$id_solicitud]);

            $conexion->commit();
            return ['status' => 'success', 'mensaje' => 'Recursos asignados y traslado confirmado.'];
        } catch (PDOException $e) {
            $conexion->rollBack();
            return ['status' => 'error', 'mensaje' => $e->getMessage()];
        }
    }
    public static function rechazarSolicitud($id_solicitud)
    {
        global $conexion;
        try {
            // Actualizamos el estado a RECHAZADA
            $stmt = $conexion->prepare("UPDATE SOLICITUD_TRASLADO SET estado_solicitud = 'RECHAZADA' WHERE id_solicitud = ?");
            $stmt->execute([$id_solicitud]);

            return ['status' => 'success', 'mensaje' => 'Solicitud rechazada correctamente.'];
        } catch (PDOException $e) {
            return ['status' => 'error', 'mensaje' => 'Error al rechazar: ' . $e->getMessage()];
        }
    }
}
