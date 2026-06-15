# S.I.G.S.M.

## Programación Fullstack

**EVEdev**

| ROL            | C.I.      | APELLIDO    | NOMBRE    | E-MAIL                       |
| :------------- | :-------- | :---------- | :-------- | :--------------------------- |
| Coordinador    | 5742262-3 | Chiessa     | Emiliano  | emiliano603099@gmail.com     |
| Subcoordinador | 5745443-2 | Gomez       | Ezequiel  | ezequielg000mez23@gmail.com  |
| Integrante 1   | 5771900-0 | Burgueño    | Valentino | valentinoburgeno16@gmail.com |
| Integrante 2   | 5461972-6 | Izuibejeres | Juan      | juanmanuelizuibe@gmail.com   |

**Docente:** Acosta, Fabián  
**Fecha de culminación:** 24/06/26  
**PRIMERA ENTREGA**  
_I.S.B.O. - 3°MJ_

[Descargar Manual en PDF](Configuracion_Entorno_Desarrollo_Programacion_Fullsta.pdf)

---

## Índice

1. Introducción y objetivos
2. Requisitos de software
3. Proceso de instalación paso a paso
   - 3.1. XAMPP (Apache, PHP, MySQL)
     - Paso 1: Descarga
     - Paso 2: Instalación
     - Paso 3: Configuración Inicial
     - Paso 3.1: Habilitar extensiones de PHP
     - Paso 3.2: Configurar puertos en Apache (Opcional - Solución de Errores)
     - Paso 4: Verificación
       - Paso 4.1: Abrir http://localhost
       - Paso 4.2: Comprobar la versión de PHP
       - Paso 4.3: Comprobar funcionamiento de MySQL
   - 3.2. VirtualBox
     - Paso 1: Descarga
     - Paso 2: Instalación
     - Paso 3: Configuración Inicial
     - Paso 4: Verificación
   - 3.3. Git
     - Paso 1: Descarga
     - Paso 2: Instalación
     - Paso 3: Configuración Inicial
     - Paso 4: Verificación
   - 3.4. Visual Studio Code
     - Paso 1: Descarga
     - Paso 2: Instalación
     - Paso 3: Configuración Inicial
     - Paso 4: Verificación
4. Configuración de VS Code y extensiones
   - 4.1. PHP Intelephense
     - 4.1.1. Configuración
   - 4.2. Live Server
   - 4.3. GitLens
   - 4.4. Prettier
     - 4.4.1. Configuración
   - 4.5. MySQL
     - 4.5.1. Configuración
5. Instrucciones verificables

---

## 1. Introducción y objetivos

Este manual contiene las instrucciones detalladas paso a paso para replicar desde cero el entorno de desarrollo local del proyecto. El cumplimiento estricto de las versiones y configuraciones aquí descritas garantiza la homogeneidad del entorno entre desarrolladores y evaluadores, previniendo errores de compatibilidad.

---

## 2. Requisitos de software

| Componente               | Herramienta        | Versión Requerida       | Propósito en el proyecto                                     | URL Oficial de Descarga                                 |
| :----------------------- | :----------------- | :---------------------- | :----------------------------------------------------------- | :------------------------------------------------------ |
| **XAMPP**                | XAMPP              | 8.2.12                  | Servidor web local, PHP y motor de Base de Datos.            | [apachefriends.org](https://www.apachefriends.org/)     |
| **Backend**              | PHP                | 8.2.12                  | Lenguaje de programación Backend.                            | _(Incluido en XAMPP)_                                   |
| **Base de Datos**        | MariaDB (MySQL)    | 8.2.12                  | Gestión de Bases de Datos.                                   | _(Incluido en XAMPP)_                                   |
| **Virtualización**       | VirtualBox         | 7.2.8                   | Sistema de Virtualización del servidor de pruebas GNU/Linux. | [virtualbox.org](https://www.virtualbox.org/)           |
| **Control de Versiones** | Git                | Última estable (2.54.0) | Control de versiones local y sincronización.                 | [git-scm.com](https://git-scm.com/)                     |
| **Editor de Código**     | Visual Studio Code | Última estable          | Editor de código fuente principal.                           | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Navegador**            | Navegador Web      | Chrome / Firefox / Edge | Pruebas de interfaz y herramientas de desarrollo.            | N/A                                                     |

---

## 3. Proceso de instalación paso a paso

### 3.1. XAMPP (Apache, PHP, MySQL)

#### Paso 1: Descarga

Dirigirse a [https://www.apachefriends.org/](https://www.apachefriends.org/) y descargar el instalador de XAMPP para su sistema operativo (Windows, Linux o macOS). En este caso, utilizaremos la versión **8.2.12 (PHP 8.2.12)**.

#### Paso 2: Instalación

Ejecutar el instalador descargado (`xampp-windows-x64-8.2.12-0-VS16-installer.exe`).

> **¡ACLARACIÓN IMPORTANTE!** Si aparece un mensaje de advertencia sobre el Control de Cuentas de Usuario (UAC): _"Important! Because an activated User Account Control (UAC) on your system some functions of XAMPP are possibly restricted..."_, se debe evitar instalar XAMPP en `C:\Program Files`. Se recomienda encarecidamente instalarlo en la ruta por defecto: **`C:\xampp`**.

1. En la ventana de **Select Components**, dejar seleccionados los componentes predeterminados (Apache, MySQL, phpMyAdmin, etc.) y presionar **Next**.
2. En **Installation folder**, asegurar que la ruta sea **`C:\xampp`**.
3. Seleccionar el idioma (**English**) y continuar haciendo clic en **Next** hasta completar el asistente.
4. Al finalizar, dejar marcada la casilla _Do you want to start the Control Panel now?_ y presionar **Finish**.

#### Paso 3: Configuración Inicial

Este es el panel de control de XAMPP. Se recomienda que a la hora de ejecutarlo, se realice **con permisos de administrador** para evitar conflictos de escritura o bloqueos de servicios.

#### Paso 3.1: Habilitar extensiones de PHP

Para la versión actual del proyecto, se requiere únicamente la configuración base que XAMPP incluye por defecto. No es necesario modificar el archivo `php.ini` ni habilitar extensiones adicionales en esta etapa.

#### Paso 3.2: Configurar puertos en Apache (Opcional - Solución de Errores)

Por defecto, Apache utiliza el puerto 80. Si al hacer clic en **Start** el módulo de Apache se apaga inmediatamente o muestra un error en color rojo, significa que el puerto está ocupado por otra aplicación.

**Pasos para cambiar el puerto al 8080:**

1. En el panel de XAMPP, haz clic en el botón **Config** (en la línea de Apache) y selecciona **Apache (httpd.conf)**.
2. Presiona `Ctrl + B` (o `Ctrl + F`) y busca la línea: `Listen 80`.
3. Cámbiala por: `Listen 8080`.
4. Busca un poco más abajo la línea: `ServerName localhost:80` y cámbiala por: `ServerName localhost:8080`.
5. Guarda el archivo (`Ctrl + S` o `Ctrl + G` según el editor), cierra el bloc de notas y vuelve a hacer clic en **Start** en el panel de XAMPP.

_Nota: Si realizas este cambio, para acceder al proyecto en el navegador deberás usar la dirección `http://localhost:8080` en lugar de `http://localhost`._

#### Paso 4: Verificación

Lo primero que haremos para verificar que todo funcione correctamente será activar los módulos de **Apache** y **MySQL** haciendo clic en sus respectivos botones **Start** en el panel de control de XAMPP. Una vez que se muestren en fondo verde y con sus respectivos PIDs y puertos asignados, procedemos con las siguientes comprobaciones:

##### Paso 4.1: Abrir http://localhost

Ingresar a [http://localhost](http://localhost) (o `http://localhost:8080` si se cambió el puerto) en el navegador web mientras el módulo de Apache se encuentra activo. Esto desplegará el dashboard de bienvenida de XAMPP, confirmando su correcta instalación.

##### Paso 4.2: Comprobar la versión de PHP

Dentro del panel de control de XAMPP, haz clic en el botón **Shell** (a la derecha) para abrir la terminal integrada de XAMPP. Ejecuta el comando:

```bash
php -v
```

Debería retornar un mensaje similar indicando la versión instalada:

```text
PHP 8.2.12 (cli) (built: Oct 24 2023 21:15:15) (ZTS Visual C++ 2019 x64)
```

##### Paso 4.3: Comprobar funcionamiento de MySQL

Ingresamos a [http://localhost/phpmyadmin](http://localhost/phpmyadmin) con el módulo de MySQL activo. Si se despliega correctamente la interfaz web del gestor de bases de datos, indica que MySQL está operando con normalidad.

---

### 3.2. VirtualBox

#### Paso 1: Descarga

Dirigirse a [https://www.virtualbox.org/](https://www.virtualbox.org/) y descargar el instalador correspondiente para Windows (`VirtualBox-7.2.8-173730-Win.exe`).

#### Paso 2: Instalación

1. Ejecutar el archivo instalador. En la primera pantalla de bienvenida, presionar **Next**.
2. Aceptar el acuerdo de licencia (**License Agreement**) haciendo clic en **Next**.
3. En la ventana de **Custom Setup**, se puede verificar la ruta de instalación (`C:\Program Files\Oracle\VirtualBox\`). Presionar **Next**.
4. Aparecerá un aviso de advertencia sobre la desconexión temporal de la red (**Warning: Network Disconnection**). Hacer clic en **Yes**.
5. Si aparece un aviso de dependencias faltantes para Python (**Missing Dependencies**), hacer clic en **Yes** (pueden configurarse posteriormente).
6. Seleccionar las opciones de accesos directos deseadas y hacer clic en **Next**.
7. Finalmente, hacer clic en **Install** y, al terminar, presionar **Finish** manteniendo marcada la casilla para iniciar la aplicación.

#### Paso 3: Configuración Inicial

Habiendo instalado VirtualBox, crearemos la máquina virtual que alojará el sistema operativo de pruebas GNU/Linux (**Fedora Server 44**):

1. En el Administrador de VirtualBox, haz clic en el botón **Nueva** (ícono de estrella azul).
2. Rellena los campos en la ventana **New Virtual Machine**:
   - **VM Name:** Nombre de la máquina virtual (ej. `Fedora Server 44`).
   - **VM Folder:** Ruta donde se guardará la máquina virtual.
   - **ISO Image:** Seleccionar el archivo `.iso` descargado de Fedora (ej. `Fedora-Server-dvd-x86_64-44-1.7.iso`).
3. El tipo y la versión se detectarán automáticamente como **Linux** y **Fedora (64-bit)**. Haz clic en **Siguiente**.
4. **Hardware (Fijar recursos según su necesidad):**
   - **Base Memory:** Se recomiendan mínimo **4096 MB** (4 GB).
   - **Processors:** Asignar **2 CPUs** (o según la capacidad de su equipo).
   - Hacer clic en **Siguiente**.
5. **Virtual Hard Disk:** Asignar un tamaño de almacenamiento (se recomiendan **15.00 GB** o más) y hacer clic en **Siguiente**.
6. Revisar el **Resumen** de la configuración y hacer clic en **Terminar**. La máquina virtual quedará creada en estado _Apagada_.

#### Paso 4: Verificación

Para verificar que la máquina virtual fue creada exitosamente, selecciónala en la lista de la izquierda y haz clic en el botón verde **Iniciar**. Comprueba que la máquina encienda correctamente y muestre el menú de arranque GRUB con la opción _Install Fedora 44_.

---

### 3.3. Git

#### Paso 1: Descarga

Dirigirse a [https://git-scm.com/](https://git-scm.com/) y descargar el instalador para Windows (versión **2.54.0** o la última estable disponible).

#### Paso 2: Instalación

Ejecutar el instalador (`Git-2.54.0-64-bit.exe`) y seguir el asistente manteniendo por lo general la configuración predeterminada:

1. Leer y aceptar la Licencia Pública General GNU haciendo clic en **Next**.
2. **Select Destination Location:** Dejar la ruta predeterminada `C:\Program Files\Git` y pulsar **Next**.
3. **Select Components:** Dejar las casillas por defecto y presionar **Next**.
4. **Select Start Menu Folder:** Presionar **Next**.
5. **Choosing the default editor used by Git:**
   - _¡ACLARACIÓN!_ Por defecto viene seleccionado **Vim**. Si prefiere usar un editor más intuitivo y moderno, puede abrir el menú desplegable y seleccionar **Use Visual Studio Code as Git's default editor**. Luego presione **Next**.
6. Continuar haciendo clic en **Next** a través de las opciones de configuración de ramas iniciales (_Let Git decide_ o _Override_ para usar `main`), ajuste del PATH (_Git from the command line and also from 3rd-party software_), backend HTTPS (_OpenSSL library_), y conversión de finales de línea (_Checkout Windows-style, commit Unix-style_).
7. Finalmente, hacer clic en **Install**. Una vez completado, desmarcar _View Release Notes_ y hacer clic en **Finish**.

#### Paso 3: Configuración Inicial

Habiendo instalado Git, abrimos la terminal del sistema (CMD o PowerShell) y ejecutamos los comandos de identidad global obligatorios para firmar los commits:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

#### Paso 4: Verificación

Para comprobar que Git quedó correctamente integrado en las variables de entorno, ejecuta en la terminal:

```bash
git --version
```

Debería retornar de manera exitosa la versión instalada, por ejemplo: `git version 2.54.0.windows.1`.

---

### 3.4. Visual Studio Code

#### Paso 1: Descarga

Dirigirse a [https://code.visualstudio.com/](https://code.visualstudio.com/) y descargar el instalador estable para Windows (`VSCodeUserSetup-x64-1.123.0.exe`).

#### Paso 2: Instalación

1. Ejecutar el instalador. En la ventana de **Acuerdo de Licencia**, marcar la opción **Acepto el acuerdo** y hacer clic en **Siguiente**.
2. **Seleccione la Carpeta de Destino:** Dejar la ruta por defecto (`AppData\Local\Programs\Microsoft VS Code`) y hacer clic en **Siguiente**.
3. **Seleccione la Carpeta del Menú Inicio:** Mantener "Visual Studio Code" y hacer clic en **Siguiente**.
4. **Seleccione las Tareas Adicionales:** Se recomienda marcar las casillas:
   - _Registrar Code como editor para tipos de archivo admitidos._
   - _Agregar a PATH (disponible después de reiniciar)._
   - _(Opcional)_ Agregar las acciones de "Abrir con Code" al menú contextual.
   - Hacer clic en **Siguiente**.
5. En la ventana **Listo para Instalar**, verificar el resumen y hacer clic en **Instalar**.
6. Al finalizar, mantener marcada la casilla _Ejecutar Visual Studio Code_ y presionar **Finalizar**.

#### Paso 3: Configuración Inicial

Al abrirse por primera vez, nos centraremos en la configuración específica instalando las extensiones requeridas para el entorno. Dejaremos el resto de la interfaz y la configuración general por defecto de momento.

#### Paso 4: Verificación

Verificar que el editor abra correctamente, mostrando la pantalla de bienvenida y la barra de herramientas lateral.

---

## 4. Configuración de VS Code y extensiones

Para facilitar el desarrollo y estandarizar el entorno de trabajo, instalaremos una serie de extensiones dentro de Visual Studio Code.  
Para acceder a la sección de extensiones, podemos usar el atajo de teclado **`Ctrl + Shift + X`** o hacer clic en el ícono de bloques en el menú lateral izquierdo. Utilizaremos la barra de búsqueda superior para buscar cada extensión por su nombre y haremos clic en el botón verde **Install**.

### 4.1. PHP Intelephense

Es uno de los servidores de lenguaje más rápidos y populares para el desarrollo en PHP. Ofrece inteligencia de código avanzada (IntelliSense), autocompletado, ayuda de parámetros de funciones y análisis estático.

#### 4.1.1. Configuración

Para evitar la duplicidad de errores y advertencias entre el soporte nativo de VS Code y esta extensión, se debe deshabilitar el soporte de PHP integrado de Visual Studio Code:

1. Abre el panel de Extensiones (`Ctrl + Shift + X`).
2. Escribe **`@builtin php`** en la barra de búsqueda superior.
3. Verás la extensión del sistema llamada **PHP Language Features**. Haz clic en el ícono de engranaje (Configuración) a su lado y selecciona **Desactivar** (Disable).
4. Reinicia Visual Studio Code para aplicar los cambios.

### 4.2. Live Server

Sirve para lanzar un servidor web de desarrollo local con recarga en vivo para páginas estáticas y dinámicas. Permite visualizar los cambios en tiempo real en el navegador cada vez que se guarda un archivo, facilitando las pruebas de diseño responsivo.

### 4.3. GitLens

Extensión potente para el control de versiones con Git. Permite visualizar quién escribió cada línea de código, cuándo y en qué commit de forma integrada, directamente en las anotaciones finales de cada línea (Git blame), sin salir del editor.

### 4.4. Prettier

Actúa como un formateador de código automatizado. Analiza el código fuente y lo reescribe bajo reglas estrictas de estilo (longitud de líneas, espacios, sangrías), garantizando consistencia en todo el proyecto.

#### 4.4.1. Configuración (Formatear al Guardar)

Para activar el formateo automático cada vez que guardemos un archivo:

1. Haz clic en el ícono de engranaje en la esquina inferior izquierda de VS Code y selecciona **Settings** (o presiona `Ctrl + ,`).
2. En la barra de búsqueda de ajustes, escribe: **`editor.formatOnSave`**.
3. Busca la casilla **Editor: Format On Save** y **actívala** (marcando el cuadro de verificación).

### 4.5. MySQL

Esta extensión (Database Client) permite gestionar bases de datos MySQL y MariaDB directamente desde VS Code, evitando recurrir a herramientas externas como MySQL Workbench o phpMyAdmin.

#### 4.5.1. Configuración de la Conexión

Con el módulo de MySQL activo en el panel de XAMPP, realizamos la conexión en el editor:

1. En la barra lateral izquierda de VS Code, haz clic en el nuevo ícono de base de datos (**MYSQL**).
2. En el panel superior, haz clic en el botón **+** (Add Connection) o en **Create Connection**.
3. Rellena los campos del formulario de conexión (**Connect to server**):
   - **Server Type:** Seleccionar **MySQL**.
   - **Host:** `127.0.0.1` o `localhost`
   - **Port:** `3306` (puerto por defecto de MySQL).
   - **Username:** `root`
   - **Password:** _(Dejar vacío por defecto)_.
4. Haz clic en el botón **Connect** en la parte inferior. Si todo es correcto, aparecerá un mensaje flotante verde indicando: `Success! Connection Success!`.

---

## 5. Instrucciones verificables

Para garantizar que el entorno de desarrollo local está correctamente configurado y listo para trabajar, se pueden realizar las siguientes pruebas empíricas de funcionamiento:

1. **Servidor Web Local Activo:** Al abrir el navegador web e ingresar a [http://localhost](http://localhost), se debe visualizar correctamente la página de bienvenida (_Dashboard_) de XAMPP.
2. **Gestor de Base de Datos Operativo:** Al ingresar a [http://localhost/phpmyadmin](http://localhost/phpmyadmin), se debe tener acceso completo al panel web de administración de MariaDB.
3. **Consola con Git Integrado:** Al ejecutar `git --version` en la terminal de comandos del sistema, esta debe responder devolviendo la versión exacta configurada (ej. `git version 2.54.0.windows.1`).
4. **IntelliSense de PHP Activo:** Al abrir VS Code, crear un archivo nuevo con extensión `.php` (ej. `archivo.php`) y abrir las etiquetas de PHP (`<?php`), al comenzar a escribir variables globales como `$_`, la extensión _PHP Intelephense_ debe desplegar de inmediato el menú flotante con sugerencias de autocompletado (`$_COOKIE`, `$_ENV`, `$_FILES`, `$_GET`, `$_POST`, etc.).
