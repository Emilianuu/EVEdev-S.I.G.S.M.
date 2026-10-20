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
                        
                        -- NUEVO: Mostramos Nombre del Paciente o el Detalle de la Carga
                        COALESCE(CONCAT(pac.nombre, ' ', pac.apellido), s.detalle_carga, 'Sin especificar') AS paciente_elemento,
                        
                        (SELECT CONCAT(p.nombre, ' ', p.apellido) 
                         FROM PERSONAL_TRASLADO pt JOIN PERSONAL p ON pt.id_personal = p.id_personal 
                         WHERE pt.id_traslado = t.id_traslado AND pt.rol_en_traslado = 'CONDUCTOR' LIMIT 1) AS conductor,
                        (SELECT CONCAT(p.nombre, ' ', p.apellido) 
                         FROM PERSONAL_TRASLADO pt JOIN PERSONAL p ON pt.id_personal = p.id_personal 
                         WHERE pt.id_traslado = t.id_traslado AND pt.rol_en_traslado = 'ENFERMERO' LIMIT 1) AS enfermero
                    FROM TRASLADO t
                    JOIN SOLICITUD_TRASLADO s ON t.id_solicitud = s.id_solicitud
                    LEFT JOIN PACIENTE pac ON s.ci_paciente = pac.ci -- NUEVO JOIN
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

            // 1. Lógica diferenciada para Pacientes vs Logística
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

            // 2. Insertar SOLICITUD_TRASLADO
            $fecha_solicitud = $datos['fecha'] . ' ' . $datos['hora'] . ':00';
            $sqlSol = "INSERT INTO SOLICITUD_TRASLADO 
                   (categoria_traslado, ci_paciente, detalle_carga, tipo_movilidad, requiere_soporte_uti, id_origen, id_destino, id_canal, id_usuario_solicit, fecha_solicitud, motivo, estado_solicitud) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, 2, ?, ?, ?, 'ASIGNADA')";
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
            $id_solicitud = $conexion->lastInsertId();

            // 3. Obtener o Crear la RUTA
            $stmtRuta = $conexion->prepare("SELECT id_ruta FROM RUTA WHERE id_origen = ? AND id_destino = ?");
            $stmtRuta->execute([$datos['origen'], $datos['destino']]);
            $ruta = $stmtRuta->fetch(PDO::FETCH_ASSOC);

            if ($ruta) {
                $id_ruta = $ruta['id_ruta'];
            } else {
                $stmtInsRuta = $conexion->prepare("INSERT INTO RUTA (id_origen, id_destino, distancia_km) VALUES (?, ?, 5.00)");
                $stmtInsRuta->execute([$datos['origen'], $datos['destino']]);
                $id_ruta = $conexion->lastInsertId();
            }

            // 4. Insertar TRASLADO
            $sqlTras = "INSERT INTO TRASLADO (id_solicitud, id_vehiculo, id_ruta) VALUES (?, ?, ?)";
            $stmtTras = $conexion->prepare($sqlTras);
            $stmtTras->execute([$id_solicitud, $datos['vehiculo'], $id_ruta]);
            $id_traslado = $conexion->lastInsertId();

            // 5. Asignar Personal
            $stmtPers = $conexion->prepare("INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES (?, ?, 'CONDUCTOR')");
            $stmtPers->execute([$id_traslado, $datos['conductor']]);

            if (!empty($datos['enfermero'])) {
                $stmtEnf = $conexion->prepare("INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES (?, ?, 'ENFERMERO')");
                $stmtEnf->execute([$id_traslado, $datos['enfermero']]);
            }

            // 6. Registrar en HISTORIAL_ESTADO
            $stmtHist = $conexion->prepare("INSERT INTO HISTORIAL_ESTADO (id_traslado, id_estado, id_usuario, observaciones) VALUES (?, 1, ?, 'Traslado asignado desde el Panel')");
            $stmtHist->execute([$id_traslado, $id_usuario]);

            $conexion->commit();
            return ['status' => 'success', 'mensaje' => 'Traslado guardado correctamente'];
        } catch (PDOException $e) {
            $conexion->rollBack();
            error_log("Error al guardar traslado: " . $e->getMessage());
            return ['status' => 'error', 'mensaje' => $e->getMessage()];
        }
    }
}
