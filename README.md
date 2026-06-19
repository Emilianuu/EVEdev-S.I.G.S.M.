# S.I.G.S.M. - Sistema de Información

S.I.G.S.M. es un sistema de gestión desarrollado para optimizar la administración y los flujos de trabajo de los módulos del proyecto. El sistema está diseñado poniendo un fuerte énfasis en la seguridad del lado del servidor, la eficiencia en el manejo de datos y una integración limpia entre la lógica de negocio y la interfaz de usuario.

---

## Tecnologías Utilizadas

El núcleo del sistema se ha construido seleccionando tecnologías robustas que garantizan estabilidad y un rendimiento óptimo en un entorno web:

- **Backend:** PHP (Hypertext Preprocessor)
- **Base de Datos:** MySQL
- **Frontend:** HTML5, CSS3 y JavaScript

---

## ustificación Tecnológica (Arquitectura)

La selección de la arquitectura de este proyecto se basa en la robustez y la seguridad en el manejo de la información:

### Procesamiento del Lado del Servidor (Backend con PHP)

A diferencia de los scripts del lado del cliente, **el código de S.I.G.S.M. se ejecuta íntegramente en el servidor**. Esto aporta ventajas críticas para el sistema:

- **Seguridad Absoluta del Código:** El servidor procesa la lógica y genera el HTML que se envía al cliente[cite: 1]. El usuario final solo recibe el resultado del script, sin tener ningún medio de acceso al código fuente que produjo dicho resultado, protegiendo las reglas de negocio[cite: 1].
- **Gestión Eficiente:** Permite una integración nativa y fluida con el sistema de bases de datos para la persistencia de información y un manejo seguro de las sesiones de usuario[cite: 1].

---

## Instalación y Configuración Local

Para ejecutar este proyecto en un entorno de desarrollo local, sigue estos pasos:

### Pre-requisitos

Necesitas un entorno de servidor local que soporte PHP y MySQL (como **XAMPP**, **WampServer** o **Laragon**).

### Pasos

1. **Clonar el repositorio** dentro de la carpeta del servidor local (por ejemplo, en `htdocs` si usas XAMPP):

```bash
   git clone [https://github.com/tu-usuario/sigsm.git](https://github.com/tu-usuario/sigsm.git)
```
