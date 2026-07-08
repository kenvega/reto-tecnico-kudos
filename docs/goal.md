# Sistema de Carga y Validación de Datos con Autenticación

## Objetivo

Desarrollar una aplicación Full Stack segura y robusta que permita a los usuarios autenticados, específicamente con rol de `admin`, cargar archivos CSV para la creación de registros en una base de datos PostgreSQL. La aplicación debe validar los datos del archivo CSV, permitir la corrección de registros inválidos y asegurar que solo usuarios autorizados realicen la carga de datos.

## Tecnologías Específicas
- **Frontend**: React para construir la interfaz de usuario.
- **Backend**: Express para manejar la lógica del servidor.
- **Base de Datos**: PostgreSQL para almacenamiento de datos.
- **Autenticación/Autorización**: Sesiones basadas en cookies.
- **Testing:** Vitest

## Backend (Express + PostgreSQL)

### Endpoints

- **Autenticación**: Endpoint `/login` para autenticación de usuarios, que verifica credenciales (email y password) y setea la cookie de sesión.
- **Carga de Datos**: Endpoint `/upload` protegido con middleware de autorización, para la carga y procesamiento de archivos CSV.

### **Middleware de Autorización**

- Verificar autorización en cada solicitud al endpoint `/upload`, asegurando que solo usuarios con rol de `admin` puedan acceder.
- Un usuario con rol `admin` deberá ser pre-creado en la base de datos (seed).

### **Procesamiento de Archivos CSV**

- Recibir archivo CSV en endpoint `/upload`
- Leer y validar el contenido del archivo CSV (name, email, age) y por cada fila crear un registro en la tabla `Users`
- Generar una respuesta detallada con los registros exitosos y un informe de errores específicos por registro y campo:

```json
{
	"ok": true,
	"data": {
	  "success": [
	    {
	      "id": 1,
	      "name": "Juan Perez",
	      "email": "juan.perez@example.com",
	      "age": 28
	    }
	    // Otros registros exitosos...
	  ],
	  "errors": [
	    {
	      "row": 4,
	      "details": {
	        "name": "El campo 'name' no puede estar vacío.",
	        "email": "El formato del campo 'email' es inválido.",
	        "age": "El campo 'age' debe ser un número positivo."
	      }
	    }
	    // Otros registros con errores...
	  ]
	}
}
```

Puedes modificar a tu criterio los mensajes de error para cada campo.

### **Modelo de Datos**:

- Crear una tabla `users` con los campos:
    - `id`: Identificador único del usuario (clave primaria, autoincremental).
    - `name`: Nombre del usuario (string, obligatorio).
    - `email`: Email del usuario (string, único, obligatorio y debe seguir un formato válido de correo electrónico).
    - `age`: Edad del usuario (integer, opcional, si se proporciona, debe ser un número entero mayor que 0).
    - `role`: Rol del usuario, puede ser `user` o `admin`. Por defecto es `user`

Frontend (React)

### **Página de Login (`/login`)**:

- Formulario para ingreso de credenciales (email y contraseña).

docs/assets/01-form-login.png

### **Página de Carga de Archivos CSV (`/`)**

- Formulario con `input` de tipo `file` para selección y carga de archivos CSV.
- Botón de "Upload File" para iniciar la carga y validación del archivo seleccionado.

docs/assets/02-upload-files.png

### **Visualización de Resultados y Corrección de Errores**

- Mostrar resumen de registros cargados exitosamente y lista detallada de errores encontrados.
- Para cada error, proporcionar campos editables directamente en la interfaz para que el usuario pueda corregir y reenviar el registro específico.

docs/assets/03-results-and-errors.png

## Testing

Deberás implementar al menos cinco tests en el Frontend y un test en el Backend. Una mayor cobertura de tests será un plus.

## Entrega

Subir el código fuente a un repositorio Git, incluyendo un `README.md` con instrucciones detalladas de instalación, configuración de la base de datos, y cómo ejecutar la aplicación.

El `README.md` también deberá incluir las URL públicas donde se encuentren deployadas las aplicaciones.

## Evaluación

- Funcionalidad según requisitos.
- Claridad y organización del código.
- Implementación de mejores prácticas en diseño de UI/UX.
- Documentación completa y clara en el `README.md`