# CasaMatch V11 Accesible

Metabuscador inmobiliario con filtros tradicionales, diseño moderno y estructura lista para GitHub.

## Qué incluye

- Renta / compra.
- Ciudad.
- Precio máximo.
- Casa / departamento.
- Recámaras mínimas.
- Baños mínimos.
- Consulta de varias fuentes.
- Ranking de compatibilidad.
- Detección básica de duplicados.
- Ordenamiento por coincidencia o menor precio.
- Enlaces a anuncios originales.
- Diseño responsive.
- Sin IA.
- Sin API keys.
- Sin `npm install`.

## Uso en tu computadora

Necesitas Node.js 20+.

1. Descomprime la carpeta.
2. Ejecuta `INICIAR_CASAMATCH.bat`.
3. Se abrirá `http://localhost:3000`.
4. Deja abierta la ventana negra mientras uses CasaMatch.

También puedes abrir la carpeta en Visual Studio Code para editar:

- `public/index.html` → estructura.
- `public/styles.css` → diseño.
- `public/app.js` → interacción.
- `server.js` → buscador/backend.

## Subir a GitHub

### 1. Crea el repositorio

En GitHub crea un repositorio nuevo, por ejemplo:

`casamatch`

No agregues README, .gitignore ni licencia desde GitHub porque esta carpeta ya los contiene.

### 2. Abre esta carpeta en Visual Studio Code

Ve a:

`Terminal → New Terminal`

### 3. Ejecuta los comandos

```bash
git init
git add .
git commit -m "Primera versión de CasaMatch"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/casamatch.git
git push -u origin main
```

Sustituye `TU-USUARIO` por tu usuario de GitHub.

## IMPORTANTE: GitHub Pages

GitHub Pages puede mostrar HTML, CSS y JavaScript, pero **no ejecuta `server.js`**.

Como CasaMatch necesita Node para hacer las búsquedas, GitHub Pages por sí solo no puede ejecutar el buscador real.

Por eso esta carpeta incluye:

`render.yaml`

## Publicar CasaMatch real desde GitHub

1. Sube CasaMatch a GitHub.
2. Entra a Render.
3. Crea un **Web Service**.
4. Conecta tu cuenta de GitHub.
5. Selecciona el repositorio `casamatch`.
6. Render detectará la aplicación Node.
7. Start Command:

```text
node server.js
```

8. Publica.

Obtendrás un enlace parecido a:

`https://casamatch.onrender.com`

Ese enlace sí ejecutará el frontend y el backend.

## Estructura

```text
CasaMatch_V10_GitHub_Moderno/
├── .github/
│   └── workflows/
│       └── check.yml
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .gitignore
├── INICIAR_CASAMATCH.bat
├── package.json
├── README.md
├── render.yaml
└── server.js
```


## Mejoras de accesibilidad V11

- Tamaño base de texto aumentado.
- Inputs y botones más grandes.
- Tarjetas de fuentes con texto legible.
- Mejor contraste.
- Botón `Texto grande` en la cabecera.
- La preferencia de texto grande se guarda en el navegador.
- Nuevo logo vectorial en `public/logo.svg`.
- Diseño responsive más cómodo para adultos y adultos mayores.

El buscador y el backend se mantienen sin cambios importantes.
