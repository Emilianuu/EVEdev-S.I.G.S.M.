# S.I.G.S.M. - Sistema de Información

S.I.G.S.M. es un sistema de gestión desarrollado para optimizar la administración y los flujos de trabajo de los módulos del proyecto. El sistema está diseñado poniendo un fuerte énfasis en la seguridad del lado del servidor, la eficiencia en el manejo de datos y una integración limpia entre la lógica de negocio y la interfaz de usuario.

---

## Tecnologías Utilizadas

El núcleo del sistema se ha construido seleccionando tecnologías robustas que garantizan estabilidad y un rendimiento óptimo en un entorno web:

- **Backend:** PHP (Hypertext Preprocessor)
- **Base de Datos:** MySQL / MariaDB
- **Frontend:** HTML5, CSS3 y JavaScript (ES6+)
- **Servidor Web:** Apache / Nginx
- **Control de Versiones:** Git

---

## Justificación Tecnológica (Arquitectura)

La selección de la arquitectura de este proyecto se basa en la robustez y la seguridad en el manejo de la información:

### Procesamiento del Lado del Servidor (Backend con PHP)

A diferencia de los scripts del lado del cliente, **el código de S.I.G.S.M. se ejecuta íntegramente en el servidor**. Esto aporta ventajas críticas para el sistema:

- **Seguridad Absoluta del Código:** El servidor procesa la lógica y genera el HTML que se envía al cliente. El usuario final solo recibe el resultado del script, sin tener ningún medio de acceso al código fuente que produjo dicho resultado, protegiendo las reglas de negocio.
- **Gestión Eficiente:** Permite una integración nativa y fluida con el sistema de bases de datos para la persistencia de información y un manejo seguro de las sesiones de usuario.

---

## Estructura del Proyecto

A continuación se detalla la organización de archivos y directorios de la raíz del proyecto:

```text
.
├── modulo_documentacion/             # Módulo de gestión documental
│   ├── controlador/                  # Lógica y manejo de peticiones de documentación
│   ├── modelo/                       # Consultas y persistencia de datos de documentación
│   └── vista/                        # Interfaz gráfica de documentación
│       └── assets/                   # Recursos estáticos
│           ├── css/                  # Estilos específicos del módulo
│           ├── img/                  # Imágenes del módulo
│           └── js/                   # Scripts cliente del módulo
├── modulo_encuestas/                 # Módulo de gestión de encuestas
│   ├── controlador/                  # Lógica del módulo de encuestas
│   ├── modelo/                       # Modelos y operaciones de datos
│   └── vista/                        # Interfaz de usuario de encuestas
│       └── assets/
│           ├── css/
│           ├── img/
│           └── js/
├── modulo_traslados/                 # Módulo de gestión de traslados
│   ├── controlador/                  # Lógica del módulo de traslados
│   ├── modelo/                       # Persistencia de datos de traslados
│   └── vista/                        # Vistas del módulo de traslados
│       └── assets/
│           ├── css/
│           ├── img/
│           └── js/
└── servicios_comunes/                # Lógica global y componentes compartidos
    ├── autenticacion/                # Gestión de login, logout y sesiones
    ├── base_de_datos/                # Scripts SQL (estructuras, tablas y cargas iniciales)
    ├── conexion_BD/                  # Configuración y conexión centralizada a MySQL
    ├── documentacion/                # Documentación técnica general
    ├── permisos/                     # Control de acceso y roles de usuario
    ├── seguridad/                    # Sanitización y mecanismos de protección
    ├── validaciones/                 # Reglas globales para la validación de datos
    └── vista_general/                # Plantillas principales, layouts y componentes transversales
```

---

## Instalación y Configuración Local

Sigue paso a paso las siguientes instrucciones para desplegar el proyecto en un entorno local de desarrollo:

### Pre-requisitos

1. Servidor web local con soporte para PHP (versión 7.4 u 8.x) y servidor de base de datos MySQL / MariaDB:
   - **XAMPP**, **WampServer**, **Laragon** o entorno **LAMP/LEMP**.
2. **Git** instalado en tu sistema.

---

### Pasos de Instalación Íntegra

#### 1. Clonar el repositorio

Abre una terminal/consola de comandos y navega hasta el directorio raíz de tu servidor web (por ejemplo, `htdocs` en XAMPP o `www` en WampServer/Laragon):

```bash
cd /ruta/a/tu/htdocs
git clone https://github.com/tu-usuario/nombre-repositorio.git .
```

#### 2. Configurar la Base de Datos

1. Inicia los servicios de **Apache** y **MySQL** desde el panel de control de tu entorno local (XAMPP/Wamp/Laragon).
2. Accede a **phpMyAdmin** (usualmente en `http://localhost/phpmyadmin`) o utiliza tu cliente SQL de preferencia (DBeaver, MySQL Workbench, HeidiSQL).
3. Crea una nueva base de datos llamada `sigsm_db` con cotejamiento `utf8mb4_unicode_ci`.
4. Importa los archivos SQL ubicados en la carpeta `servicios_comunes/base_de_datos/`.

   _Vía línea de comandos:_

   ```bash
   mysql -u root -p -e "CREATE DATABASE sigsm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   mysql -u root -p sigsm_db < servicios_comunes/base_de_datos/schema.sql
   ```

#### 3. Configurar la Conexión a la Base de Datos

1. Dirígete al directorio `servicios_comunes/conexion_BD/`.
2. Revisa y edita el archivo de conexión especificando los datos de tu entorno local:

```php
<?php
$host = "localhost";
$usuario = "root";
$password = ""; // Contraseña de tu MySQL local
$database = "sigsm_db";
?>
```

#### 4. Ejecutar la Aplicación

Abre tu navegador web e ingresa a la siguiente URL según la ubicación del proyecto en tu servidor local:

```text
http://localhost/nombre-repositorio/
```

---

## Convenciones de Commits

Para mantener un historial de versiones limpio, legible y estructurado, el equipo de desarrollo adopta la especificación de **Conventional Commits**.

### Estructura del Mensaje

Cada mensaje de commit debe seguir el siguiente formato:

```text
<tipo>(<alcance opcional>): <descripción corta en presente o infinitivo>

[cuerpo opcional explicativo]
```

### Tipos Permitidos (`<tipo>`)

| Tipo       | Descripción                                                             | Ejemplo                                                       |
| :--------- | :---------------------------------------------------------------------- | :------------------------------------------------------------ |
| `feat`     | Incorporación de una nueva funcionalidad.                               | `feat(encuestas): agregar módulo de encuestas y vistas`       |
| `fix`      | Corrección de un error o bug en el código.                              | `fix(conexion_BD): corregir parámetro de conexión a MySQL`    |
| `docs`     | Cambios exclusivamente en la documentación (ej. README).                | `docs: actualizar estructura del proyecto en README`          |
| `style`    | Cambios que no afectan la lógica (espacios, formato, punto y coma).     | `style(traslados): ajustar estilos CSS en módulo traslados`   |
| `refactor` | Reestructuración de código sin cambiar comportamiento ni corregir bugs. | `refactor(autenticacion): optimizar verificación de sesiones` |
| `perf`     | Cambios orientados a mejorar el rendimiento.                            | `perf(seguridad): optimizar consultas SQL de permisos`        |
| `test`     | Añadir o corregir pruebas unitarias/integración.                        | `test(validaciones): agregar pruebas para entrada de datos`   |
| `chore`    | Tareas de mantenimiento, actualización de scripts o herramientas.       | `chore: actualizar ignorados en .gitignore`                   |
