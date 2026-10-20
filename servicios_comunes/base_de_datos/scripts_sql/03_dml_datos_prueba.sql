-- =====================================================================
-- S.I.G.S.M. - Datos de prueba (DML)
-- Hospital de Clínicas Dr. Manuel Quintela
-- =====================================================================
USE sigsm;

-- ---------------------------------------------------------------------
-- BLOQUE 1 — USUARIOS Y ROLES
-- ---------------------------------------------------------------------

INSERT INTO ROL (nombre_rol, descripcion, activo) VALUES
('ADMIN',       'Acceso total al sistema', TRUE),
('OPERADOR',    'Gestiona solicitudes y traslados', TRUE),
('ENFERMERO',   'Consulta pacientes y traslados asignados', TRUE),
('SOLO_LECTURA','Rol dado de baja, ya no se utiliza', FALSE);

INSERT INTO USUARIO (nombre_usuario, contrasena_hash, nombre, apellido, email, activo, fecha_creacion, ultimo_login) VALUES
('echiessa',  '$2y$10$fakehash1234567890abcdefghijklmno', 'Emiliano', 'Chiessa',    'emiliano603099@gmail.com',  TRUE,  '2026-03-01', '2026-07-28'),
('egomez',    '$2y$10$fakehash1234567890abcdefghijklmno', 'Ezequiel', 'Gomez',      'ezequielg0o0mez23@gmail.com', TRUE, '2026-03-01', '2026-07-27'),
('vburgeno',  '$2y$10$fakehash1234567890abcdefghijklmno', 'Valentino','Burgeño',    'valentinoburgeno16@gmail.com', TRUE, '2026-03-02', '2026-07-20'),
('jizuibejer','$2y$10$fakehash1234567890abcdefghijklmno', 'Juan',     'Izuibejeres','juanmanuelizuibe@gmail.com', TRUE, '2026-03-02', NULL),
('mrodriguez','$2y$10$fakehash1234567890abcdefghijklmno', 'Marcela',  'Rodríguez',  'mrodriguez.enf@hc.edu.uy',  TRUE,  '2026-04-10', '2026-07-29'),
('pantiguo',  '$2y$10$fakehash1234567890abcdefghijklmno', 'Pablo',    'Antiguo',    'pantiguo.baja@hc.edu.uy',   FALSE, '2026-02-01', '2026-05-01');

INSERT INTO USUARIO_ROL (id_usuario, id_rol, fecha_asignacion) VALUES
(1, 1, '2026-03-01'),   -- echiessa: ADMIN
(2, 2, '2026-03-01'),   -- egomez: OPERADOR
(3, 2, '2026-03-02'),   -- vburgeno: OPERADOR
(4, 2, '2026-03-02'),   -- jizuibejer: OPERADOR
(5, 3, '2026-04-10');   -- mrodriguez: ENFERMERO

-- ---------------------------------------------------------------------
-- BLOQUE 2 — CONTENIDOS Y ENCUESTAS
-- ---------------------------------------------------------------------

INSERT INTO CATEGORIA (nombre, descripcion) VALUES
('Protocolo',       'Protocolos clínicos y operativos'),
('Consentimiento',  'Formularios de consentimiento informado'),
('Instructivo',     'Guías de uso para pacientes y personal');

INSERT INTO DOCUMENTO (titulo, archivo_url, codigo_qr, fecha_carga, id_categoria, id_usuario_carga, activo) VALUES
('Protocolo de traslado de pacientes críticos', '/docs/protocolo_traslado_criticos.pdf', 'QR-0001', '2026-04-01', 1, 1, TRUE),
('Consentimiento informado de traslado',         '/docs/consentimiento_traslado.pdf',     'QR-0002', '2026-04-02', 2, 1, TRUE),
('Instructivo para solicitar un traslado (App)', '/docs/instructivo_app.pdf',              'QR-0003', '2026-04-05', 3, 2, TRUE);

-- Registros de PACIENTES (Humanos y Objetos/Materiales)
INSERT INTO PACIENTE (ci, nombre, apellido, fecha_nacimiento, email, telefono) VALUES
-- Pacientes Humanos
('45789231', 'Lucía',    'Fernández', '1985-02-14', 'lucia.fernandez@mail.com', '099123456'),
('39284712', 'Roberto',  'Suárez',    '1972-11-30', 'roberto.suarez@mail.com', '098765432'),
('50912834', 'Carla',    'Ramírez',   '1998-06-05', 'carla.ramirez@mail.com',  '097112233'),
('41823765', 'Martín',   'Pereyra',   '1990-09-21', NULL, '096998877'),
-- Objetos y Materiales (Representados con C.I. sintéticas para FK)
('OBJ-MB001', '[MUESTRA] Sangre y Tejidos', 'Lab. Central', '2026-01-01', NULL, NULL),
('OBJ-EQ001', '[EQUIPO] Ecógrafo Portátil', 'Servicio DTI', '2026-01-01', NULL, NULL),
('OBJ-ORG01', '[ÓRGANO] Renal para Trasplante', 'Unidad Ablación', '2026-01-01', NULL, NULL);

INSERT INTO ENCUESTA (titulo, descripcion, es_anonima, fecha_inicio, fecha_fin, segmento, id_usuario_creador) VALUES
('Satisfacción del servicio de traslado', 'Encuesta breve sobre la experiencia del traslado', FALSE, '2026-07-01', '2026-12-31', 'pacientes_traslado', 1),
('Encuesta anónima de sugerencias',       'Comentarios y sugerencias generales',               TRUE,  '2026-07-01', '2026-12-31', 'todos', 1);

INSERT INTO PREGUNTA (id_encuesta, texto_pregunta, tipo_pregunta, orden, requerida) VALUES
(1, '¿Cómo calificaría la puntualidad del traslado?', 'OPCION_MULTIPLE', 1, TRUE),
(1, '¿Tiene comentarios adicionales?',                 'TEXTO_LIBRE',     2, FALSE),
(2, '¿Qué mejoraría del servicio?',                    'TEXTO_LIBRE',     1, TRUE);

INSERT INTO OPCION_RESPUESTA (id_pregunta, texto_opcion, orden) VALUES
(1, 'Excelente', 1),
(1, 'Buena',     2),
(1, 'Regular',   3),
(1, 'Mala',      4);

INSERT INTO RESPUESTA_ENCUESTA (id_encuesta, ci_paciente, fecha_envio) VALUES
(1, '45789231', '2026-07-15 10:30:00'),
(2, NULL,       '2026-07-16 09:00:00');

INSERT INTO RESPUESTA_PREGUNTA (id_resp_encuesta, id_pregunta, id_opcion, texto_libre) VALUES
(1, 1, 1, NULL),
(1, 2, NULL, 'Muy buena atención del personal.'),
(2, 3, NULL, 'Más unidades disponibles en horario nocturno.');

-- ---------------------------------------------------------------------
-- BLOQUE 3 — TRASLADOS
-- ---------------------------------------------------------------------

INSERT INTO CANAL_SOLICITUD (nombre) VALUES
('Teléfono'), ('Portal Web'), ('App Móvil');

INSERT INTO TIPO_VEHICULO (nombre, descripcion, apto_silla_ruedas, apto_camilla, apto_uti, apto_biologico, apto_insumos) VALUES
('Ambulancia Básica', 'Traslados básicos',            TRUE,  TRUE,  FALSE, TRUE,  FALSE),
('Ambulancia UTI',    'Soporte avanzado',             TRUE,  TRUE,  TRUE,  TRUE,  FALSE),
('Van Adaptada',      'Exclusiva sillas de ruedas',   TRUE,  FALSE, FALSE, FALSE, FALSE),
('Auto Logístico',    'Muestras e insumos menores',   FALSE, FALSE, FALSE, TRUE,  TRUE),
('Utilitario Carga',  'Equipamiento e insumos',       FALSE, FALSE, FALSE, FALSE, TRUE);

INSERT INTO UBICACION (nombre, direccion, tipo_ubicacion) VALUES
('Hospital de Clínicas',        'Av. Italia s/n, Montevideo',        'HOSPITAL'),   -- ID 1
('Clínica Médica A',            'Bulevar Artigas 1234, Montevideo',  'CLINICA'),    -- ID 2
('Domicilio - Lucía Fernández', 'Av. 8 de Octubre 2500, Montevideo', 'DOMICILIO'),  -- ID 3
('Domicilio - Roberto Suárez',  'Av. Rivera 3400, Montevideo',       'DOMICILIO'),  -- ID 4
('Laboratorio Central / Hemocentro', 'Av. Italia 2800, Montevideo',  'CLINICA');    -- ID 5

INSERT INTO RUTA (id_origen, id_destino, descripcion, distancia_km) VALUES
(3, 1, 'Domicilio Fernández -> Hospital de Clínicas', 5.20), -- ID 1
(1, 2, 'Hospital de Clínicas -> Clínica Médica A',     3.80), -- ID 2
(4, 1, 'Domicilio Suárez -> Hospital de Clínicas',     7.10), -- ID 3
(1, 5, 'Hospital de Clínicas -> Laboratorio Central',  2.10); -- ID 4

-- Solicitudes de Traslado (Pacientes y Materiales)
INSERT INTO SOLICITUD_TRASLADO 
(categoria_traslado, ci_paciente, detalle_carga, tipo_movilidad, requiere_soporte_uti, id_origen, id_destino, id_canal, id_usuario_solicit, fecha_solicitud, motivo, estado_solicitud) 
VALUES
-- 1. Paciente Ambulatorio (Humano, Silla de Ruedas)
('PACIENTE', '45789231', NULL, 'SILLA_RUEDAS', FALSE, 3, 1, 2, 2, '2026-07-20 08:00:00', 'Control de rutina', 'ASIGNADA'),
-- 2. Paciente en Camilla sin UTI
('PACIENTE', '39284712', NULL, 'CAMILLA', FALSE, 4, 1, 1, 3, '2026-07-21 09:15:00', 'Cirugía programada', 'PENDIENTE'),
-- 3. Paciente Crítico en CTI (Camilla + UTI/Respirador)
('PACIENTE', '50912834', NULL, 'CAMILLA', TRUE, 1, 2, 3, 4, '2026-07-22 14:00:00', 'Derivación CTI a especialista', 'PENDIENTE'),
-- 4. Material Biológico (SIN CÉDULA, movilidad NO_APLICA)
('MATERIAL_BIOLOGICO', NULL, '10 Tubos de sangre', 'NO_APLICA', FALSE, 1, 5, 2, 2, '2026-07-23 10:00:00', 'Envío laboratorio', 'ASIGNADA'),
-- 5. Equipamiento Logístico (SIN CÉDULA)
('EQUIPAMIENTO', NULL, 'Ecógrafo Portátil Mindray', 'NO_APLICA', FALSE, 1, 2, 2, 2, '2026-07-24 11:00:00', 'Solicitud Policlínica', 'PENDIENTE');

-- Vehículos registrados
INSERT INTO VEHICULO (matricula, marca, modelo, anho, id_tipo_vehiculo, activo, estado_disponibilidad) VALUES
('SBA1234', 'Mercedes-Benz', 'Sprinter', 2021, 2, TRUE, 'DISPONIBLE'),
('SBB5678', 'Fiat',          'Ducato',   2019, 1, TRUE, 'DISPONIBLE'),
('SBC9012', 'Renault',       'Master',   2022, 3, TRUE, 'MANTENIMIENTO'),
('LOG1234', 'Chevrolet',     'Onix',     2023, 4, TRUE, 'DISPONIBLE'),
('LOG5678', 'Peugeot',       'Partner',  2022, 5, TRUE, 'DISPONIBLE');

INSERT INTO PERSONAL (ci, nombre, apellido, rol_personal, activo) VALUES
('42112233', 'Diego',   'Martínez', 'CONDUCTOR', TRUE),
('43223344', 'Sofía',   'Correa',   'ENFERMERO', TRUE),
('44334455', 'Bruno',   'Techera',  'AUXILIAR',  TRUE),
('45445566', 'Natalia', 'Silva',    'CONDUCTOR', TRUE);

INSERT INTO PROVEEDOR_EXTERNO (nombre, contacto) VALUES
('Traslados Rápidos S.A.', 'contacto@trasladosrapidos.com.uy');

INSERT INTO ESTADO_TRASLADO (nombre) VALUES
('ASIGNADO'), ('EN_CAMINO'), ('COMPLETADO'), ('CANCELADO');

-- Traslado 1: Paciente Humano (Solicitud 1)
INSERT INTO TRASLADO (id_solicitud, id_vehiculo, id_ruta, id_proveedor, hora_salida_real, hora_llegada_real, hora_retorno) VALUES
(1, 1, 1, NULL, '2026-07-20 08:30:00', '2026-07-20 08:55:00', '2026-07-20 09:20:00');

INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES
(1, 1, 'CONDUCTOR'),
(1, 2, 'ENFERMERO');

INSERT INTO HISTORIAL_ESTADO (id_traslado, id_estado, fecha_hora, id_usuario, observaciones) VALUES
(1, 1, '2026-07-20 08:15:00', 2, 'Traslado asignado y confirmado'),
(1, 2, '2026-07-20 08:30:00', 2, 'Vehículo en camino al domicilio del paciente'),
(1, 3, '2026-07-20 09:20:00', 2, 'Traslado completado sin incidentes');

-- Traslado 2: Muestra Biológica en Auto Logístico (Solicitud 4)
INSERT INTO TRASLADO (id_solicitud, id_vehiculo, id_ruta, id_proveedor, hora_salida_real, hora_llegada_real, hora_retorno) VALUES
(4, 4, 4, NULL, '2026-07-23 10:10:00', NULL, NULL);

INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES
(2, 4, 'CONDUCTOR'); -- Solo chofer, no requiere enfermero

INSERT INTO HISTORIAL_ESTADO (id_traslado, id_estado, fecha_hora, id_usuario, observaciones) VALUES
(2, 1, '2026-07-23 10:05:00', 2, 'Asignado vehículo de logística'),
(2, 2, '2026-07-23 10:10:00', 2, 'Chofer retiró la nevera térmica con muestras');