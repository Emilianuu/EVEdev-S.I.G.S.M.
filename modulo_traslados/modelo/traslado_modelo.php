<?php
// modelo/TrasladoModelo.php
require_once $_SERVER['DOCUMENT_ROOT'] . '/sigsm/servicios_comunes/conexion_BD/conexion.php';

class TrasladoModelo
{

    // Método para listar traslados en el panel de gestión
    public static function obtenerTodosLosTraslados()
    {
        global $conexion;

        try {
            // Unimos las tablas para traer los datos completos que necesita la vista
            $sql = "SELECT 
                        t.id_traslado, 
                        DATE_FORMAT(s.fecha_solicitud, '%d/%m/%Y') AS fecha,
                        TIME_FORMAT(s.fecha_solicitud, '%H:%i') AS hora,
                        v.matricula AS vehiculo,
                        te.nombre AS tipo_traslado,
                        u_dest.nombre AS destino,
                        e.nombre AS estado,
                        s.motivo AS descripcion,
                        (SELECT CONCAT(p.nombre, ' ', p.apellido) 
                         FROM PERSONAL_TRASLADO pt 
                         JOIN PERSONAL p ON pt.id_personal = p.id_personal 
                         WHERE pt.id_traslado = t.id_traslado AND pt.rol_en_traslado = 'CONDUCTOR' 
                         LIMIT 1) AS conductor,
                        (SELECT CONCAT(p.nombre, ' ', p.apellido) 
                         FROM PERSONAL_TRASLADO pt 
                         JOIN PERSONAL p ON pt.id_personal = p.id_personal 
                         WHERE pt.id_traslado = t.id_traslado AND pt.rol_en_traslado = 'ENFERMERO' 
                         LIMIT 1) AS enfermero
                    FROM TRASLADO t
                    JOIN SOLICITUD_TRASLADO s ON t.id_solicitud = s.id_solicitud
                    JOIN VEHICULO v ON t.id_vehiculo = v.id_vehiculo
                    JOIN TIPO_ELEMENTO te ON s.id_tipo_elemento = te.id_tipo_elemento
                    JOIN RUTA r ON t.id_ruta = r.id_ruta
                    JOIN UBICACION u_dest ON r.id_destino = u_dest.id_ubicacion
                    -- Para el estado actual del traslado, buscamos el último registro en el historial
                    LEFT JOIN (
                        SELECT id_traslado, id_estado 
                        FROM HISTORIAL_ESTADO 
                        WHERE id_historial IN (SELECT MAX(id_historial) FROM HISTORIAL_ESTADO GROUP BY id_traslado)
                    ) he ON t.id_traslado = he.id_traslado
                    LEFT JOIN ESTADO_TRASLADO e ON he.id_estado = e.id_estado
                    ORDER BY s.fecha_solicitud DESC";

            $stmt = $conexion->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error en TrasladoModelo::obtenerTodosLosTraslados -> " . $e->getMessage());
            return [];
        }
    }
}
