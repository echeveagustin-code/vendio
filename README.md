# Vendio.pro Landing

Landing page para validar el MVP de Vendio.pro, una herramienta SaaS para negocios, ecommerce y emprendedores que venden con Instagram, TikTok, Reels y videos cortos.

Slogan: **Videos que venden**.

## Estructura

```txt
.
+-- public/
|   +-- favicon.svg
|   +-- og-vendio.svg
+-- src/
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- index.html
+-- package.json
+-- postcss.config.js
+-- tailwind.config.js
+-- vite.config.js
+-- README.md
```

## Comandos

Instalar dependencias:

```bash
npm install
```

Correr en local:

```bash
npm run dev
```

Crear build de producción:

```bash
npm run build
```

Previsualizar el build:

```bash
npm run preview
```

## Cómo editar textos

La landing está concentrada en `src/App.jsx`.

- Navbar: `navLinks`
- Problema: `problemCards`
- Solución / beneficios: `benefits`
- Cómo funciona: `steps`
- Mockup del dashboard: `videoRows`
- Formulario y mensaje de confirmación: componente `LeadForm`

## Cómo cambiar colores

Los colores de marca están en `tailwind.config.js`:

```js
brand: {
  navy: "#00256F",
  paper: "#F1F2EB",
  accent: "#816C61",
  ink: "#0D1B3E",
  mist: "#E4E5DC",
}
```

También hay detalles visuales globales en `src/index.css`, como el fondo y algunos efectos.

## Formulario

El formulario ya valida campos requeridos y evita recargar la página. Todavía no envía datos a un backend real.

En `src/App.jsx`, dentro de `LeadForm`, está marcado el lugar para conectar el envío real:

```js
// Connect the real submission here:
// - POST to a future /api/leads endpoint
// - send to Formspree
// - insert in Supabase
// - redirect to a Google Forms endpoint
```

Opciones recomendadas para el MVP:

- Formspree: rápido para validar demanda sin backend.
- Google Forms: simple si querés centralizar respuestas en una planilla.
- Supabase: mejor si ya vas a guardar leads dentro del producto.
- API propia: ideal cuando la app principal ya tenga backend.

## SEO básico

Los metadatos están en `index.html`:

- `title`
- `description`
- `og:title`
- `og:description`
- `og:image`

El placeholder de Open Graph está en `public/og-vendio.svg`. Cuando tengas una imagen final, reemplazala y actualizá la ruta si cambia el nombre.

## Deploy en Vercel

1. Subí este proyecto a GitHub, GitLab o Bitbucket.
2. En Vercel, elegí **Add New Project**.
3. Importá el repositorio.
4. Vercel debería detectar Vite automáticamente.
5. Verificá la configuración:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Publicá el proyecto.

No se requieren variables de entorno para esta versión. Cuando conectes el formulario, agregá las keys necesarias en **Project Settings > Environment Variables**.
