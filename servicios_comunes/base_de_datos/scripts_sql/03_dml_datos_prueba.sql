-- =====================================================================
-- S.I.G.S.M. - Datos de prueba (DML)
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

INSERT INTO PACIENTE (ci, nombre, apellido, fecha_nacimiento, email, telefono) VALUES
('45789231', 'Lucía',    'Fernández', '1985-02-14', 'lucia.fernandez@mail.com', '099123456'),
('39284712', 'Roberto',  'Suárez',    '1972-11-30', 'roberto.suarez@mail.com', '098765432'),
('50912834', 'Carla',    'Ramírez',   '1998-06-05', 'carla.ramirez@mail.com',  '097112233'),
('41823765', 'Martín',   'Pereyra',   '1990-09-21', NULL, '096998877');

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
(1, 1, 1, NULL),                                   -- respondió opción "Excelente"
(1, 2, NULL, 'Muy buena atención del personal.'),  -- respondió texto libre
(2, 3, NULL, 'Más unidades disponibles en horario nocturno.');

-- ---------------------------------------------------------------------
-- BLOQUE 3 — TRASLADOS
-- ---------------------------------------------------------------------

INSERT INTO CANAL_SOLICITUD (nombre) VALUES
('Teléfono'), ('Portal Web'), ('App Móvil');

INSERT INTO TIPO_ELEMENTO (nombre, descripcion) VALUES
('Silla de Ruedas', 'Paciente requiere silla de ruedas'),
('Camilla',         'Paciente requiere traslado en camilla'),
('Respirador',      'Paciente requiere soporte respiratorio durante el traslado');

INSERT INTO TIPO_VEHICULO (nombre, descripcion) VALUES
('Ambulancia Básica', 'Vehículo equipado para traslados básicos'),
('Ambulancia UTI',    'Vehículo equipado con soporte de terapia intensiva'),
('Van Adaptada',      'Vehículo adaptado para sillas de ruedas');

INSERT INTO COMPATIBILIDAD (id_tipo_vehiculo, id_tipo_elemento, observaciones) VALUES
(1, 1, 'Compatible sin restricciones'),
(1, 2, 'Compatible con camilla plegable'),
(2, 1, 'Compatible'),
(2, 2, 'Compatible'),
(2, 3, 'Requiere personal de enfermería a bordo'),
(3, 1, 'Vehículo específico para sillas de ruedas');

INSERT INTO UBICACION (nombre, direccion, tipo_ubicacion) VALUES
('Hospital de Clínicas',        'Av. Italia s/n, Montevideo',        'HOSPITAL'),
('Clínica Médica A',            'Bulevar Artigas 1234, Montevideo',  'CLINICA'),
('Domicilio - Lucía Fernández', 'Av. 8 de Octubre 2500, Montevideo', 'DOMICILIO'),
('Domicilio - Roberto Suárez',  'Av. Rivera 3400, Montevideo',       'DOMICILIO');

INSERT INTO RUTA (id_origen, id_destino, descripcion, distancia_km) VALUES
(3, 1, 'Domicilio Fernández -> Hospital de Clínicas', 5.20),
(1, 2, 'Hospital de Clínicas -> Clínica Médica A',     3.80),
(4, 1, 'Domicilio Suárez -> Hospital de Clínicas',     7.10);

INSERT INTO SOLICITUD_TRASLADO (ci_paciente, id_tipo_elemento, id_origen, id_destino, id_canal, id_usuario_solicit, fecha_solicitud, motivo, estado_solicitud) VALUES
('45789231', 1, 3, 1, 2, 2, '2026-07-20 08:00:00', 'Control ambulatorio de rutina',        'ASIGNADA'),
('39284712', 2, 4, 1, 1, 3, '2026-07-21 09:15:00', 'Traslado por cirugía programada',      'PENDIENTE'),
('50912834', 1, 1, 2, 3, 4, '2026-07-22 14:00:00', 'Derivación a especialista',             'PENDIENTE');

INSERT INTO VEHICULO (matricula, marca, modelo, anho, id_tipo_vehiculo, activo, estado_disponibilidad) VALUES
('SBA1234', 'Mercedes-Benz', 'Sprinter', 2021, 2, TRUE, 'DISPONIBLE'),
('SBB5678', 'Fiat',          'Ducato',   2019, 1, TRUE, 'DISPONIBLE'),
('SBC9012', 'Renault',       'Master',   2022, 3, TRUE, 'MANTENIMIENTO');

INSERT INTO PERSONAL (ci, nombre, apellido, rol_personal, activo) VALUES
('42112233', 'Diego',   'Martínez', 'CONDUCTOR', TRUE),
('43223344', 'Sofía',   'Correa',   'ENFERMERO', TRUE),
('44334455', 'Bruno',   'Techera',  'AUXILIAR',  TRUE),
('45445566', 'Natalia', 'Silva',    'CONDUCTOR', TRUE);

INSERT INTO PROVEEDOR_EXTERNO (nombre, contacto) VALUES
('Traslados Rápidos S.A.', 'contacto@trasladosrapidos.com.uy');

INSERT INTO ESTADO_TRASLADO (nombre) VALUES
('ASIGNADO'), ('EN_CAMINO'), ('COMPLETADO'), ('CANCELADO');

-- Traslado 1: con vehículo propio y personal propio (solicitud 1, ruta 1: origen 3 -> destino 1, tipo_vehiculo 2 compatible con tipo_elemento 1)
INSERT INTO TRASLADO (id_solicitud, id_vehiculo, id_ruta, id_proveedor, hora_salida_real, hora_llegada_real, hora_retorno) VALUES
(1, 1, 1, NULL, '2026-07-20 08:30:00', '2026-07-20 08:55:00', '2026-07-20 09:20:00');

INSERT INTO PERSONAL_TRASLADO (id_traslado, id_personal, rol_en_traslado) VALUES
(1, 1, 'CONDUCTOR'),
(1, 2, 'ENFERMERO');

-- Historial de estados del traslado 1 (dispara la propagación a SOLICITUD_TRASLADO)
INSERT INTO HISTORIAL_ESTADO (id_traslado, id_estado, fecha_hora, id_usuario, observaciones) VALUES
(1, 1, '2026-07-20 08:15:00', 2, 'Traslado asignado y confirmado'),
(1, 2, '2026-07-20 08:30:00', 2, 'Vehículo en camino al domicilio del paciente'),
(1, 3, '2026-07-20 09:20:00', 2, 'Traslado completado sin incidentes');
