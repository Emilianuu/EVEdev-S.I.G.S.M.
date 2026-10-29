<?php
// C:\xampp\htdocs\sigsm\crear_admin.php

// 1. Configuración de la base de datos (Usando tu archivo de conexión)
require_once 'servicios_comunes/conexion_BD/conexion.php';

try {
    global $conexion;

    // 2. Datos del usuario de prueba
    $nombre = 'Juan';
    $apellido = 'Perez';
    $nombre_usuario = 'juanperez';
    $email = 'juanperez@gmail.com';
    $password_plana = 'isbo123';

    $activo = 1;

    // 3. Encriptación real de la contraseña
    $password_encriptada = password_hash($password_plana, PASSWORD_DEFAULT);

    // 4. Preparar la consulta SQL adaptada a tu modelo
    $sql = "INSERT INTO USUARIO (nombre_usuario, contrasena_hash, nombre, apellido, email, activo) 
            VALUES (:nombre_usuario, :contrasena_hash, :nombre, :apellido, :email, :activo)";

    $stmt = $conexion->prepare($sql);

    // 5. Ejecutar la inserción
    $stmt->execute([
        ':nombre_usuario' => $nombre_usuario,
        ':contrasena_hash' => $password_encriptada,
        ':nombre' => $nombre,
        ':apellido' => $apellido,
        ':email' => $email,
        ':activo' => $activo
    ]);

    echo "<h3>✅ Éxito</h3>";
    echo "<p>Usuario administrador creado correctamente en la base de datos.</p>";
    echo "<ul>";
    echo "<li><strong>Email:</strong> " . htmlspecialchars($email) . "</li>";
    echo "<li><strong>Contraseña:</strong> " . htmlspecialchars($password_plana) . "</li>";
    echo "</ul>";
    echo "<p style='color: red;'><strong>⚠️ IMPORTANTE:</strong> Elimina este archivo (crear_admin.php) inmediatamente después de usarlo por motivos de seguridad.</p>";
} catch (PDOException $e) {
    echo "<h3>❌ Error en la base de datos</h3>";
    echo "<p>" . $e->getMessage() . "</p>";
}
