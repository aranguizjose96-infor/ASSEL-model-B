# Panel de administración ASSEL

El panel está disponible en `/admin`. Permite modificar únicamente los textos existentes del sitio. Las imágenes, rutas, cantidades de elementos, diseño y animaciones permanecen protegidos.

## Configuración en Vercel

En **Project Settings → Environment Variables**, agrega las siguientes variables para **Production**:

- `ADMIN_USERNAME`: nombre de usuario elegido para el panel.
- `ADMIN_PASSWORD`: contraseña larga y exclusiva para el panel.
- `ADMIN_SESSION_SECRET`: opcional. Si deseas usarlo, ingresa una cadena aleatoria de al menos 32 caracteres; de lo contrario el servidor deriva una clave de sesión segura desde los otros secretos.
- `GITHUB_CONTENT_TOKEN`: token de GitHub de alcance fino con acceso solamente al repositorio `ASSEL-model-B` y permiso **Contents: Read and write**.
- `GITHUB_CONTENT_OWNER`: `aranguizjose96-infor`.
- `GITHUB_CONTENT_REPO`: `ASSEL-model-B`.
- `GITHUB_CONTENT_BRANCH`: `main`.
- `GITHUB_CONTENT_PATH`: `content/site-content.json`.

Después de guardarlas, realiza un nuevo despliegue de producción para que Vercel las aplique.

## Flujo de publicación

1. Inicia sesión en `/admin`.
2. El panel descarga la versión vigente desde GitHub.
3. Modifica los textos de una página.
4. Presiona **Publicar cambios**.
5. El servidor valida que solamente hayan cambiado textos.
6. GitHub guarda una nueva versión de `content/site-content.json`.
7. Vercel despliega automáticamente el nuevo commit.
8. El panel confirma cuando ese commit ya está activo en el sitio.

## Recuperar una versión

En la pestaña **Historial**, selecciona **Restaurar esta versión**. El panel no borra el historial: crea un nuevo commit con el contenido de la versión seleccionada.

## Seguridad

- La contraseña, el secreto de sesión y el token de GitHub existen solamente en Vercel.
- El token nunca se envía al navegador.
- La sesión usa una cookie firmada, `HttpOnly`, `SameSite=Strict` y segura en producción.
- Las operaciones de escritura validan el origen de la solicitud.
- El panel detecta cambios concurrentes y evita sobrescribirlos.
