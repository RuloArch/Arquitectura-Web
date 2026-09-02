# 💜 Cita romántica interactiva

Página web estilo “programador te invita a salir”, lista para abrir en VS Code y publicar en GitHub Pages.

## Incluye

- Botón **NO** que se escapa del cursor 😈
- Flujo por pasos
- Selector de fecha y hora
- Lista de 7 ideas de cita
- Cuestionario final
- Pantalla resumen
- Guardado local automático
- Opción de guardar respuestas online con Firebase Firestore
- Diseño responsive para celular

## 1. Abrir en VS Code

Abre esta carpeta en VS Code. Puedes usar la extensión **Live Server** o simplemente abrir `index.html`.

## 2. Para guardar lo que ella responda y que tú puedas verlo

GitHub Pages por sí solo **no puede guardar datos en una base de datos**. Por eso el proyecto está preparado para Firebase.

1. Entra a Firebase Console y crea un proyecto.
2. Ve a **Build → Firestore Database → Create database**.
3. Ve a **Project settings → Your apps → Web app**.
4. Copia el bloque `firebaseConfig`.
5. Abre `script.js` y reemplaza:

```js
const firebaseConfig = null;
```

por tu configuración real.

Ejemplo:

```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

### Reglas de Firestore

Para una página privada y sencilla puedes empezar con estas reglas temporales:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /respuestas_cita/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

Así la página puede **enviar** una respuesta, pero nadie desde el sitio puede leer todas las respuestas.

> Desde Firebase Console tú sí podrás ver la colección `respuestas_cita`.

## 3. Subir a GitHub

Crea un repositorio nuevo, por ejemplo `cita-romantica`.

Desde la terminal de VS Code dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Mi invitacion romantica"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cita-romantica.git
git push -u origin main
```

## 4. Activar GitHub Pages

En GitHub:

**Settings → Pages → Build and deployment → Deploy from a branch → main / root → Save**

Después GitHub te dará una URL similar a:

`https://TU-USUARIO.github.io/cita-romantica/`

Ése es el enlace que le mandas a tu novia 💜

## Personalización rápida

En `index.html` puedes cambiar:

- “¿Saldrías conmigo?”
- Opciones de cita
- Emojis
- Preguntas finales

En `styles.css` puedes cambiar el color principal editando:

```css
--purple: #6d28d9;
--purple2: #8b5cf6;
--pink: #ec4899;
```



## Enviar la confirmación por WhatsApp

La página ya está preparada para abrir WhatsApp al confirmar la cita y escribir automáticamente el resumen elegido.

En `script.js`, cambia:

```js
const WHATSAPP_NUMBER = '521XXXXXXXXXX';
```

por tu número en formato internacional, **sin `+`, espacios ni guiones**. Ejemplo para México:

```js
const WHATSAPP_NUMBER = '5214771234567';
```

Cuando ella pulse **Confirmar cita 💜**, la información se guarda y después se abre WhatsApp con el mensaje listo. Por seguridad de WhatsApp, ella todavía tendrá que pulsar **Enviar** dentro de WhatsApp; una página web no puede mandar el mensaje sin esa última acción.
