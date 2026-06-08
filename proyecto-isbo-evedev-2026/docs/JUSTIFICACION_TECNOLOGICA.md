# S.I.G.S.M.
## Programación Fullstack
### EVEdev

| ROL | C.I | APELLIDO | NOMBRE | E-MAIL |
| :--- | :--- | :--- | :--- | :--- |
| **Coordinador** | 5742262-3 | Chiessa | Emiliano | emiliano603099@gmail.com |
| **Subcoordinador** | 5745443-2 | Gomez | Ezequiel | ezequielg000mez23@gmail.com |
| **Integrante 1** | 5771900-0 | Burgueño | Valentino | valentinoburgeno16@gmail.com |
| **Integrante 2** | 5461972-6 | Izuibejeres | Juan | juanmanuelizuibe@gmail.com |

**I.S.B.O.** **Docente:** Acosta, Fabián  
**Fecha de culminación:** 24/06/26  
**PRIMERA ENTREGA** | **3°MJ**

[Descargar Justificación Tecnológica en formato PDF](./Justificacion_Tecnologica_Programacion_Fullstack.pdf)

---

## Índice
1. [Introducción](#1-introducción)
2. [Lenguaje Backend](#2-lenguaje-backend)
   - 2.1. [¿Qué es PHP?](#21-qué-es-php)
   - 2.2. [¿Para qué sirve?](#22-para-qué-sirve)
   - 2.3. [¿En qué se destaca?](#23-en-qué-se-destaca)
   - 2.4. [Ventajas en sistemas institucionales](#24-ventajas-en-sistemas-institucionales)
3. [Base de Datos](#3-base-de-datos)
   - 3.1. [¿Qué es MySQL?](#31-qué-es-mysql)
   - 3.2. [Persistencia de datos clínicos y operativos](#32-persistencia-de-datos-clínicos-y-operativos)
   - 3.3. [Integridad y consistencia de los datos](#33-integridad-y-consistencia-de-los-datos)
   - 3.4. [Compatibilidad con el entorno del hospital](#34-compatibilidad-con-el-entorno-del-hospital)
   - 3.5. [Relación con PHP](#35-relación-con-php)
4. [Framework frontend](#4-framework-frontend)
   - 4.1. [¿Qué es Bootstrap?](#41-qué-es-bootstrap)
   - 4.2. [Ventajas](#42-ventajas)
   - 4.3. [Interfaces administrativas](#43-interfaces-administrativas)
   - 4.4. [Interfaces móviles](#44-interfaces-móviles)
   - 4.5. [Sistema de grillas responsivo](#45-sistema-de-grillas-responsivo)
5. [Herramientas de control de versiones](#5-herramientas-de-control-de-versiones)
   - 5.1. [¿Qué es Git?](#51-qué-es-git)
   - 5.2. [Ventajas de Git](#52-ventajas-de-git)
   - 5.3. [¿Qué es GitHub?](#53-qué-es-github)
   - 5.4. [¿Para qué sirve?](#54-para-qué-sirve)
   - 5.5. [Requisito del proyecto](#55-requisito-del-proyecto)
   - 5.6. [Buenas prácticas profesionales](#56-buenas-prácticas-profesionales)
6. [Entorno de desarrollo](#6-entorno-de-desarrollo)
   - 6.1. [¿Qué es Visual Studio Code?](#61-qué-es-visual-studio-code)
   - 6.2. [Funciones que nos ofrece](#62-funciones-que-nos-ofrece)
   - 6.3. [Extensiones](#63-extensiones)
7. [Necesidades concretas del sistema](#7-necesidades-concretas-del-sistema)
   - 7.1. [Acceso desde móviles (QR)](#71-acceso-desde-móviles-qr)
   - 7.2. [Gestión administrativa](#72-gestión-administrativa)
   - 7.3. [Persistencia de datos de traslados](#73-persistencia-de-datos-de-traslados)
8. [Referencias](#8-referencias)

---

## 1. Introducción
[cite_start]En este documento se justificará la selección de tecnologías para el desarrollo de los módulos del proyecto S.I.G.S.M. [cite: 214] [cite_start]Se realizará un análisis explicando los motivos de su utilización y las ventajas que presentan, evaluando su aporte directo para el proyecto[cite: 215].

---

## 2. Lenguaje Backend

### 2.1. ¿Qué es PHP?
[cite_start]PHP (oficialmente, este sigla es un acrónimo recursivo para *PHP Hypertext Preprocessor*) es un lenguaje de scripts generalista y Open Source, creado para el desarrollo de aplicaciones web[cite: 216]. [cite_start]Se puede integrar fácilmente al HTML[cite: 217].

### 2.2. ¿Para qué sirve?
[cite_start]Se ejecuta en el servidor y se integra fácilmente con HTML para crear sitios web, gestionar bases de datos (MySQL) y manejar sesiones de usuario, siendo la base de CMS populares como WordPress[cite: 218].

### 2.3. ¿En qué se destaca?
[cite_start]Lo que distingue a PHP de los lenguajes de script como JavaScript, es que el código se ejecuta en el servidor, generando así el HTML, que será luego enviado al cliente[cite: 219]. [cite_start]El cliente solo recibe el resultado del script, sin ningún medio de acceso al código que produjo dicho resultado[cite: 220].

[cite_start]La gran ventaja de PHP es que es extremadamente simple para los principiantes, pero ofrece funcionalidades avanzadas para los expertos[cite: 221].

### 2.4. Ventajas en sistemas institucionales
[cite_start]PHP es una opción sólida para sistemas institucionales (universidades, entidades gubernamentales, grandes empresas) debido a su madurez, estabilidad y gran compatibilidad técnica[cite: 222].

Sus principales ventajas son:
- [cite_start]**Bajo Costo y Eficiencia:** PHP es de código abierto y gratuito, lo que reduce costos de licenciamiento[cite: 223]. [cite_start]Su ejecución rápida y eficiente lo hace ideal para aplicaciones empresariales que requieren alto rendimiento[cite: 224].
- [cite_start]**Alta Compatibilidad y Flexibilidad:** Es compatible con la mayoría de los sistemas operativos (Linux, Windows, Unix) y se integra fácilmente con diversas bases de datos (MySQL, PostgreSQL, Oracle)[cite: 225].
- [cite_start]**Escalabilidad y Seguridad:** Los frameworks modernos de PHP permiten crear aplicaciones modulares y escalables, capaces de manejar grandes volúmenes de datos y usuarios simultáneos[cite: 226]. [cite_start]Además, ofrece herramientas sólidas para la seguridad si se configura adecuadamente[cite: 227].
- [cite_start]**Curva de Aprendizaje y Comunidad:** Posee una sintaxis sencilla y una de las comunidades más grandes del mundo, lo que facilita encontrar soporte, documentación y desarrolladores cualificados[cite: 228].
- [cite_start]**Ideal para Aplicaciones Dinámicas:** Es excelente para procesar formularios complejos, interactuar con bases de datos y generar contenido dinámico en tiempo real, funciones críticas en sistemas de gestión institucional[cite: 229].

#### ¿Por qué PHP es adecuado para el backend del sistema del proyecto S.I.G.S.M.?
1. [cite_start]PHP fue diseñado originalmente para sistemas tipo Unix, por lo que su compatibilidad y rendimiento con servidores GNU/Linux son nativos y óptimos[cite: 231]. [cite_start]Es la base de la famosa pila de desarrollo LAMP (Linux, Apache, MySQL, PHP) y LEMP (Linux, Nginx, MySQL, PHP)[cite: 232]. [cite_start]Este lenguaje se adapta perfectamente a los servidores que el Departamento Técnico de Informática del Hospital de Clínicas actualmente posee, siendo una opción sólida para implementar al sistema[cite: 233].
2. [cite_start]PHP ha superado las tres décadas como pilar de internet[cite: 234]. [cite_start]Lejos de quedar obsoleto, ha evolucionado hacia un lenguaje maduro, tipado y de alto rendimiento[cite: 235]. [cite_start]Hoy impulsa aproximadamente el 71% de los sitios web con backend conocido, siendo el motor indiscutible de plataformas empresariales y de gestión de contenido masivas, incluyendo gigantes como WordPress, Facebook y Wikipedia[cite: 236].
3. [cite_start]PHP ofrece integración nativa con MySQL mediante dos extensiones principales: PDO (*PHP Data Objects*) y MySQLi[cite: 237]. [cite_start]Ambas permiten realizar consultas, gestionar datos y proteger tu aplicación contra inyecciones SQL[cite: 238].
4. [cite_start]PHP ofrece un ecosistema sumamente robusto para el desarrollo web[cite: 239]. [cite_start]Su principal fortaleza radica en una documentación oficial exhaustiva y un soporte comunitario masivo, ideal tanto para principiantes como para desarrolladores experimentados[cite: 240].
5. [cite_start]PHP es altamente capaz de integrarse con sistemas centralizados utilizando módulos independientes[cite: 241]. [cite_start]Esta arquitectura descentralizada permite que componentes autónomos se comuniquen con un núcleo central o con servicios externos, facilitando el mantenimiento y la escalabilidad[cite: 242].

---

## 3. Base de Datos
[cite_start]El grupo EVEdev se decidió por usar MySQL como el sistema de gestión de base de datos[cite: 243].

### 3.1. ¿Qué es MySQL?
[cite_start]MySQL es un sistema de gestión de bases de datos de código abierto desarrollado por Oracle[cite: 244]. [cite_start]Su reputación en internet lo identifica como una base de datos relacional que permite almacenar, organizar y recuperar datos de manera eficiente[cite: 245]. [cite_start]MySQL es utilizado por una amplia variedad de organizaciones y aplicaciones en todo el mundo[cite: 246].

### 3.2. Persistencia de datos clínicos y operativos
[cite_start]MySQL garantiza que la información de pacientes, historias clínicas y transacciones diarias se almacene de forma segura y recuperable[cite: 247]. [cite_start]Esto se logra mediante el motor de almacenamiento InnoDB (transaccional y garante de las propiedades ACID) y la configuración de registros de transacciones para evitar pérdidas ante fallos[cite: 248].

### 3.3. Integridad y consistencia de los datos
[cite_start]La integridad y consistencia de los datos en MySQL aseguran que estos sean precisos, fiables y válidos a lo largo del tiempo[cite: 249]. [cite_start]Para lograrlo, MySQL utiliza restricciones (como `PRIMARY KEY` y `FOREIGN KEY`), reglas de validación y el sistema de transacciones ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad)[cite: 250].

### 3.4. Compatibilidad con el entorno del hospital
[cite_start]MySQL es totalmente compatible y nativo para la infraestructura Linux[cite: 251]. [cite_start]Linux es el entorno de producción más común para desplegar MySQL, ofreciendo el mejor rendimiento, estabilidad y opciones de configuración[cite: 252]. 

[cite_start]MariaDB, el motor de base de datos estándar del hospital, nació como una bifurcación (*fork*) de MySQL y mantiene una alta compatibilidad con este[cite: 253]. [cite_start]En la mayoría de los casos, los protocolos, conectores, puertos y sintaxis básica son idénticos, permitiendo que las aplicaciones utilicen ambos sistemas indistintamente[cite: 254]. [cite_start]Todo esto hace que MySQL sea la mejor opción a utilizar para gestionar las bases de datos del hospital, al ser altamente compatible con la infraestructura que posee la base de datos del hospital, permitiendo una implementación mucho más eficiente y rápida[cite: 255].

### 3.5. Relación con PHP
[cite_start]La relación entre PHP y MySQL es una de las combinaciones más clásicas y potentes en el desarrollo web[cite: 256]. [cite_start]Juntos forman la base de aplicaciones dinámicas, donde PHP actúa como el cerebro (lenguaje de servidor) encargado de procesar la lógica, y MySQL funciona como el almacén (base de datos) que guarda y organiza la información[cite: 257].

---

## 4. Framework frontend

### 4.1. ¿Qué es Bootstrap?
[cite_start]Bootstrap es un framework de código abierto para desarrollo web frontend[cite: 259]. [cite_start]Creado originalmente por Twitter, sirve para diseñar sitios y aplicaciones adaptables a cualquier dispositivo (*responsive*) de forma rápida, sin tener que escribir todo el código HTML, CSS y JavaScript desde cero[cite: 260].

### 4.2. Ventajas
Las ventajas que ofrece este servicio son las siguientes:
- [cite_start]**Ahorro de tiempo:** Proporciona componentes predefinidos y listos para usar, como botones, menús de navegación, ventanas modales, formularios y tarjetas[cite: 261].
- [cite_start]**Diseño adaptable:** Cuenta con un sistema de cuadrícula (*grid*) que permite organizar el contenido para que se vea bien tanto en computadoras de escritorio como en celulares o tabletas[cite: 262].
- [cite_start]**Consistencia:** Ayuda a mantener un diseño coherente en todo el sitio web estandarizando los estilos[cite: 263].

### 4.3. Interfaces administrativas
[cite_start]Para el desarrollo de interfaces administrativas, Bootstrap destaca por su extensa biblioteca de componentes reutilizables pre-diseñados (como tablas de datos, formularios estructurados, tarjetas de métricas, modales y alertas) que optimizan los tiempos de programación[cite: 264]. [cite_start]Debido a que los paneles internos priorizan la funcionalidad y la gestión de datos masivos sobre la estética, este framework permite a los desarrolladores maquetar sistemas de control y operaciones CRUD (Crear, Leer, Actualizar y Borrar) de forma ágil y estandarizada[cite: 265, 266]. 

[cite_start]Al no tener la necesidad de escribir hojas de estilo complejas desde cero, los equipos técnicos pueden centrar sus esfuerzos en la lógica del negocio, el procesamiento de datos y la integración de APIs, garantizando un panel intuitivo, limpio y fácil de mantener a largo plazo[cite: 267].

### 4.4. Interfaces móviles
[cite_start]En el ámbito de los dispositivos móviles, Bootstrap es una herramienta clave gracias a su enfoque nativo *mobile-first* y su potente sistema de cuadrícula (*grid system*) flexible de 12 columnas[cite: 268]. [cite_start]El framework está diseñado estructuralmente para optimizar el código empezando por las pantallas más pequeñas y escalando de forma fluida hacia monitores de escritorio mediante puntos de ruptura (*breakpoints*) automatizados[cite: 269]. 

[cite_start]Esto asegura que elementos complejos como menús de navegación, imágenes y formularios interactivos se adapten por completo a la ergonomía táctil y a las resoluciones reducidas de los teléfonos inteligentes sin romper el diseño[cite: 270]. [cite_start]Al unificar el desarrollo bajo una única base de código responsiva, se elimina la necesidad de crear aplicaciones separadas, garantizando una experiencia de usuario consistente y de alto rendimiento en cualquier dispositivo móvil[cite: 271].

### 4.5. Sistema de grillas responsivo
[cite_start]El sistema de grillas (*grid system*) de Bootstrap es una potente herramienta basada en Flexbox que divide el ancho de la pantalla en una cuadrícula de 12 columnas[cite: 272]. [cite_start]Utiliza contenedores, filas y columnas para alinear y organizar el contenido de forma automática en cualquier dispositivo[cite: 273].

---

## 5. Herramientas de control de versiones
[cite_start]En el grupo EVEdev se seleccionó Git y GitHub como herramientas de control de versiones[cite: 274].

### 5.1. ¿Qué es Git?
[cite_start]Git es un sistema de control de versiones distribuido[cite: 275]. [cite_start]Sirve para rastrear y administrar los cambios en el código fuente de tus proyectos a lo largo del tiempo, permitiéndote "volver al pasado" si algo se rompe, experimentar sin miedo y colaborar en equipo de forma ordenada[cite: 276].

### 5.2. Ventajas de Git
Lo que Git permite hacer es:
- [cite_start]**Historial completo:** En lugar de tener carpetas llamadas "proyecto_final", "proyecto_final_v2", Git guarda instantáneas del código (*commits*)[cite: 277]. [cite_start]Puedes revisar exactamente quién, cuándo y por qué hizo un cambio[cite: 278].
- [cite_start]**Trabajo en equipo:** Permite que varios programadores trabajen en los mismos archivos al mismo tiempo sin sobrescribir el trabajo de los demás[cite: 279].
- [cite_start]**Pruebas seguras (Branches):** Puedes crear líneas de desarrollo independientes para probar nuevas funciones o corregir errores sin alterar la versión principal del programa[cite: 280].

### 5.3. ¿Qué es GitHub?
[cite_start]GitHub es una plataforma en la nube que funciona como el mayor centro de alojamiento de repositorios Git y colaboración para desarrolladores, permitiendo almacenar código, controlar sus versiones y trabajar en equipo desde cualquier lugar[cite: 281, 282]. [cite_start]Se considera la red social de los programadores, facilitando la colaboración en proyectos de software, el código abierto y la gestión de tareas[cite: 283].

### 5.4. ¿Para qué sirve?
GitHub otorga las siguientes funciones:
- [cite_start]**Control de Versiones (Git):** Permite llevar un registro detallado de los cambios en el código, permitiendo regresar a versiones anteriores ("máquina del tiempo") y evitando perder trabajo[cite: 284].
- [cite_start]**Colaboración en Equipo:** Facilita que múltiples desarrolladores trabajen en el mismo proyecto simultáneamente sin sobrescribir el trabajo de otros[cite: 285].
- [cite_start]**Alojamiento en la Nube:** Sirve para respaldar y compartir repositorios de código de forma pública o privada[cite: 286].
- [cite_start]**Proyectos Open Source:** Es el hogar de millones de proyectos de código abierto donde se puede contribuir, explorar y aprender[cite: 287].
- [cite_start]**Herramientas Extra:** Ofrece funcionalidades como GitHub Actions (automatización), GitHub Issues (seguimiento de tareas y errores) y GitHub Pages (alojamiento de sitios web)[cite: 288].

### 5.5. Requisito del proyecto
[cite_start]El repositorio GitHub del equipo del proyecto es un requisito fundamental para la primera entrega del mismo, ya que mediante este se debe poder acceder a toda la documentación, prototipos, base de datos, etc[cite: 289]. [cite_start]Cabe recalcar que también es necesario para el trabajo colaborativo de los miembros del equipo, permitiendo que varios trabajen a la vez en distintas ramas[cite: 289].

### 5.6. Buenas prácticas profesionales
[cite_start]Dominar GitHub a nivel profesional implica organizar el código, automatizar procesos y facilitar el trabajo colaborativo[cite: 290]. [cite_start]Las prácticas clave incluyen utilizar estrategias de ramas, realizar confirmaciones descriptivas, gestionar el código mediante revisiones obligatorias y mantener el repositorio documentado y seguro[cite: 291].

#### 1. Estrategia de Ramificación (Branching)
[cite_start]Nunca trabajes directamente en la rama principal (`main` o `master`)[cite: 292].
- [cite_start]`main` / `master`: Debe contener únicamente código estable y listo para producción[cite: 293].
- [cite_start]`develop`: Rama principal de integración para el trabajo en curso (si usas metodologías robustas)[cite: 294].
- [cite_start]**Ramas de función (`feature/nombre-tarea`):** Crea una rama nueva para cada tarea o funcionalidad[cite: 295].
- [cite_start]**Ramas de error o entorno (`bugfix/`, `hotfix/`, `testing/`):** Aísla los arreglos y despliegues[cite: 296].

#### 2. Mensajes de Commits Profesionales
[cite_start]Tus confirmaciones (*commits*) son la bitácora del proyecto[cite: 297]. [cite_start]Un formato estandarizado como *Conventional Commits* es el estándar de la industria[cite: 298]:
- [cite_start]Usa verbos en imperativo: *Add, Fix, Update*[cite: 298].
- [cite_start]Formato: `<tipo>(<alcance>): <descripción>`[cite: 299].
- [cite_start]Ejemplos: `feat(auth): agregar validación de token JWT` o `fix(login): corregir error de redirección`[cite: 299].

#### 3. Solicitudes de Extracción (Pull Requests)
[cite_start]En lugar de fusionar código directamente, utiliza siempre *Pull Requests* (PRs)[cite: 300].
- [cite_start]**Descripción clara:** Utiliza las plantillas de PR integradas en GitHub para detallar el problema resuelto y los pasos para verificarlo[cite: 301].
- [cite_start]**Revisiones de código (Code Reviews):** Exige que al menos un compañero revise y apruebe el código antes de fusionarlo[cite: 302].
- [cite_start]**Enlaces de seguimiento:** Vincula el PR directamente al *Issue* o tarea correspondiente[cite: 303].

#### 4. Configuración y Mantenimiento del Repositorio
[cite_start]Mantén el proyecto ordenado y profesional desde la raíz[cite: 304]:
- [cite_start]**Archivo README.md:** La carta de presentación[cite: 304]. [cite_start]Incluye instrucciones de instalación, uso, tecnologías y contribución[cite: 305].
- [cite_start]**LICENSE y CONTRIBUTING.md:** Define cómo otros pueden usar tu código y las reglas para aportar al proyecto[cite: 305].
- [cite_start]**Archivo .gitignore:** Imprescindible para evitar subir archivos temporales, dependencias pesadas (ej. `node_modules/`) o credenciales[cite: 306].

#### 5. Seguridad y Automatización
[cite_start]Aprovecha las herramientas nativas y de CI/CD[cite: 307]:
- [cite_start]**CODEOWNERS:** Define qué usuarios o equipos son responsables de revisar ciertas partes específicas del código[cite: 307].
- [cite_start]**Protección de ramas:** Configura reglas en GitHub para evitar eliminaciones accidentales de la rama `main` y asegurar que el código pase pruebas automáticas antes de unirse[cite: 308].
- [cite_start]**Gestión de secretos:** Nunca subas contraseñas o claves API[cite: 309]. [cite_start]Usa variables de entorno o el gestor de secretos de GitHub[cite: 310].

---

## 6. Entorno de desarrollo
[cite_start]En el grupo EVEdev se seleccionó Visual Studio Code como entorno de desarrollo[cite: 311].

### 6.1. ¿Qué es Visual Studio Code?
[cite_start]Visual Studio Code (VS Code) es un editor de código fuente gratuito y de código abierto creado por Microsoft[cite: 312]. [cite_start]Sirve para escribir, editar, organizar y depurar código en prácticamente cualquier lenguaje de programación (como JavaScript, Python, C++ y HTML/CSS)[cite: 313].

### 6.2. Funciones que nos ofrece
Las funciones que ofrece Visual Studio Code son las siguientes:
- [cite_start]**Asistencia inteligente (IntelliSense):** Ofrece resaltado de colores para el código y funciones de autocompletado que predicen lo que estás escribiendo, lo que acelera el proceso y evita errores[cite: 314].
- [cite_start]**Depuración integrada (Debugging):** Permite ejecutar tu código paso a paso y detenerlo en puntos específicos para inspeccionar posibles fallos o errores en el programa[cite: 315].
- [cite_start]**Control de versiones con Git:** Se conecta de forma nativa con herramientas como Git y GitHub, permitiéndote guardar diferentes versiones de tu proyecto y trabajar en equipo sin salir del editor[cite: 316].
- [cite_start]**Terminal integrada:** Incluye una consola de comandos en la parte inferior de la pantalla para ejecutar scripts e interactuar con tu sistema operativo o servidores[cite: 317].
- [cite_start]**Personalización masiva:** Cuenta con un catálogo (*Marketplace*) con decenas de miles de extensiones y "plugins"[cite: 318]. [cite_start]Puedes añadirle soporte para nuevos lenguajes, cambiar la apariencia visual (temas) o instalar asistentes de Inteligencia Artificial (como GitHub Copilot)[cite: 319].

### 6.3. Extensiones
Las extensiones a utilizar serán las siguientes:
- [cite_start]**Live Server:** Esta extensión permite correr un servidor de desarrollo local en donde se puede visualizar la página, este servidor se actualiza cada vez que se realiza un guardado en Visual Studio[cite: 320].
- [cite_start]**Live Preview:** Junto a Live Server, esta extensión permite ver en tiempo real los cambios sin necesidad de guardar, además de poder visualizar el diseño responsivo de la página al poder cambiar el tamaño de la ventana[cite: 321].
- [cite_start]**Prettier:** Establece un formato automático del código para que sea más legible y mantener consistencia en el formato a la hora del trabajo cooperativo[cite: 322].
- [cite_start]**GitLens:** Permite visualizar el historial de versiones del proyecto directamente en el editor[cite: 323].
- [cite_start]**PHP Intelephense:** Ofrece autocompletado rápido, análisis estático, navegación de código y diagnósticos en tiempo real para optimizar el flujo de trabajo de desarrollo en PHP[cite: 324].
- [cite_start]**MySQL:** Conecta con la base de datos y permite visualizarla directamente dentro del IDE[cite: 325].

---

## 7. Necesidades concretas del sistema

### 7.1. Acceso desde móviles (QR)
[cite_start]Esta necesidad requiere una interfaz adaptable, ligera y con capacidad de interactuar con hardware móvil (como la cámara para escanear o pantallas pequeñas para mostrar el QR)[cite: 326].
- **Bootstrap (Frontend):** Es clave aquí. [cite_start]Al ser un framework *mobile-first*, garantiza que la interfaz donde se muestra o se escanea el QR se adapte perfectamente a cualquier pantalla de smartphone de los pacientes o personal de salud, sin deformarse[cite: 327].
- [cite_start]**PHP (Backend):** Se encarga de la lógica detrás del código QR[cite: 328]. [cite_start]PHP procesará la solicitud cuando el QR sea escaneado, validará el token o ID encriptado en el código y servirá la información correspondiente en tiempo real[cite: 329].

### 7.2. Gestión administrativa
[cite_start]Los módulos de administración hospitalaria o institucional requieren un desarrollo rápido, un panel de control (*dashboard*) robusto, manejo de sesiones seguras y flujos de trabajo internos eficientes[cite: 330].
- [cite_start]**PHP:** Como lenguaje backend en sistemas institucionales, PHP es ideal para la gestión administrativa debido a su madurez y estabilidad[cite: 331]. [cite_start]Permite manejar de forma nativa la autenticación de usuarios (roles de administrador, médicos, administrativos), el procesamiento de formularios complejos y la comunicación segura con la base de datos[cite: 332].
- [cite_start]**Bootstrap:** Facilita la creación rápida de interfaces administrativas limpias y organizadas (tablas de datos, gráficos, formularios de registro, botones de acción) mediante sus componentes prediseñados, ahorrando tiempo en el diseño del backend administrativo[cite: 333].

### 7.3. Persistencia de datos de traslados
[cite_start]La gestión de traslados (médicos, de pacientes o de insumos) es crítica; requiere que los datos operativos y de bitácora no se pierdan, se registren en orden cronológico y mantengan una relación estricta entre el paciente, el vehículo y el destino[cite: 334, 335].
- [cite_start]**MySQL (Base de Datos):** Es la tecnología responsable de esta necesidad[cite: 336].
- [cite_start]**Persistencia:** Asegura que cada cambio de estado en un traslado quede grabado de forma permanente[cite: 337].
- [cite_start]**Integridad y Consistencia:** Mediante el uso de claves foráneas (*Foreign Keys*) y transacciones ACID, garantiza que no se pueda registrar un traslado para un paciente que no existe, o que los datos operativos no queden duplicados o corruptos si ocurre un fallo en la red a mitad del proceso[cite: 338].

---

## 8. Referencias
- Arsys. (s.f.). [cite_start]*Guía completa sobre Bootstrap.* https://www.arsys.es/blog/guia-completa-sobre-bootstrap [cite: 339]
- Arsys. (s.f.). [cite_start]*Qué es Visual Studio Code y cuáles son sus ventajas.* https://www.arsys.es/blog/que-es-visual-studio-code-y-cuales-son-sus-ventajas [cite: 339, 340]
- BootstrapDash. (s.f.). [cite_start]*What is Bootstrap framework: Admin dashboards.* https://www.bootstrapdash.com/blog/what-is-bootstrap-framework#3-admin-dashboards [cite: 340, 341]
- DataSunrise. (s.f.). [cite_start]*Integridad de datos en MySQL.* https://www.datasunrise.com/es/centro-de-conocimiento/integridad-de-datos-en-mysql/ [cite: 341]
- EBAC. (s.f.). [cite_start]*Qué es GitHub.* https://ebac.mx/blog/que-es-github [cite: 341]
- Fundació Jesuïtes Educació. (s.f.). [cite_start]*¿Qué es Bootstrap y cuáles son sus características?* FP UOC. https://fp.uoc.fje.edu/es/estudios/blog-fp/que-es-bootstrap-y-cuales-son-sus-caracteristicas [cite: 341, 342]
- GeeksforGeeks. (s.f.). [cite_start]*PHP: Advantages and disadvantages of PHP.* https://www.geeksforgeeks.org/php/advantages-and-disadvantages-of-php/ [cite: 342, 343]
- Microsoft. (s.f.). *¿Qué es Git? Learn Microsoft.* https://learn.microsoft.com/es-es/devops/develop/git/what-is-git [cite: 343]
- Oracle. (s.f.). [cite_start]*¿Qué es MySQL?* https://www.oracle.com/latam/mysql/what-is-mysql/ [cite: 343, 344]
- PHP Documentation Group. (s.f.). *Introduction to PHP. [cite_start]PHP Manual.* https://www.php.net/manual/es/introduction.php [cite: 344]
- The Bootstrap Authors. (s.f.). *Getting started: Introduction. [cite_start]Bootstrap v4.1 Docs.* https://getbootstrap.com/docs/4.1/getting-started/introduction [cite: 344, 345]
- Contraslash. (2018, 20 de febrero). *Mejores prácticas para el manejo de ramas en Git. [cite_start]GitHub.* https://github.com/contraslash/blog_legacy/blob/master/posts_md/154-mejores-practicas-para-el-manejo-de-ramas-en-git.md [cite: 345, 346]
- DreamHost. (2023, 30 de agosto). *¿PHP está muerto?. [cite_start]DreamHost Blog.* https://www.dreamhost.com/blog/es/php-esta-muerto/ [cite: 346, 347]
- Gentoo Wiki. (s.f.). [cite_start]*PHP.* Recuperado el 7 de junio, de 2026, de https://wiki.gentoo.org/wiki/PHP [cite: 347]
- Mahendra, B. (2023, 28 de agosto). *Using PHP with MySQL: Introduction and connection to database. Medium.* https://medium.com/@bramahendramahendra1/using-php-with-mysql-introduction-and-connection-to-database-f69e62d3d57 [cite: 347, 348]
- MariaDB. (s.f.). *MariaDB vs MySQL compatibility. MariaDB Knowledge Base.* https://mariadb.com/docs/release-notes/community-server/about/compatibility-and-differences/mariadb-vs-mysql-compatibility [cite: 348, 349]
- Piensa Solutions. (2023, 23 de noviembre). *Qué es MySQL y cuáles son sus características. Piensa Solutions Blog.* https://www.piensasolutions.com/blog/que-es-mysql-y-cuales-son-sus-caracteristicas#tree-2 [cite: 349, 350]
- W3Schools. (s.f.). *PHP MySQL Connect. W3Schools.* https://www.w3schools.com/php/php_mysql_connect.asp [cite: 350, 351]
- Zend. (s.f.). *Installing PHP on Linux. Zend Blog.* https://www.zend.com/blog/installing-php-linux [cite: 351]