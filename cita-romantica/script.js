// ======================================================
// CITA ROMANTICA - SCRIPT COMPLETO
// ======================================================

// ======================================================
// 1. CONFIGURACION DE WHATSAPP
// ======================================================

// Número en formato internacional, sin +, espacios ni guiones.
const WHATSAPP_NUMBER = '524774485243';


// ======================================================
// 2. FIREBASE - OPCIONAL
// ======================================================

const firebaseConfig = null;

/*
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
*/


// ======================================================
// 3. ESTADO
// ======================================================

const state = {
  answer: null,
  date: null,
  time: null,
  activity: null,
  mood: null,
  food: null,
  notes: "",
  createdAt: null
};

let currentStep = 1;
let db = null;


// ======================================================
// 4. HELPERS
// ======================================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];

const title = $('#screenTitle');
const counter = $('#stepCounter');
const progress = $('#progressFill');
const toast = $('#toast');


// ======================================================
// 5. TOAST
// ======================================================

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);

}


// ======================================================
// 6. CAMBIAR DE PANTALLA
// ======================================================

function renderStep(step) {

  currentStep = step;

  $$('.screen').forEach((screen) => {

    const screenStep =
      Number(screen.dataset.step);

    screen.classList.toggle(
      'active',
      screenStep === step
    );

  });


  if (step <= 4) {

    const titles = [
      '',
      '¿Saldrías conmigo?',
      'Disponibilidad',
      'Elige nuestra cita',
      'Últimos detalles'
    ];

    if (title) {
      title.textContent = titles[step];
    }

    if (counter) {
      counter.textContent =
        `Pregunta ${step} / 4`;
    }

    if (progress) {
      progress.style.width =
        `${step * 25}%`;
    }

  } else {

    if (title) {
      title.textContent =
        'Cita confirmada 💜';
    }

    if (counter) {
      counter.textContent =
        'Completado';
    }

    if (progress) {
      progress.style.width =
        '100%';
    }

  }


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


// ======================================================
// 7. BOTON NO JUGUETON
// ======================================================

const noBtn = $('#noBtn');

const zone = $('#yesNoZone');

const teasing = [

  '¿Segura? 😭',

  'Ese botón no coopera jajaja',

  'Intenta otra vez 👀',

  'Creo que el universo dijo que no 😌',

  '¿De verdad pensaste que podrías? 😂',

  'Plot twist: sólo existe una respuesta 💜',

  'Jajajaja casi 😌',

  'Ese botón tiene vida propia 👀'

];

let teaseIndex = 0;


// Coloca el botón "No" justo a la derecha del "Sí" al cargar,
// en vez de dejar que el navegador lo ponga en (0,0) y se encimen.
function positionNoButtonInitial() {

  const yesBtnEl = $('#yesBtn');

  if (!noBtn || !zone || !yesBtnEl) return;

  const gap = 14;

  noBtn.style.left = `${yesBtnEl.offsetLeft + yesBtnEl.offsetWidth + gap}px`;
  noBtn.style.top = `${yesBtnEl.offsetTop}px`;

}

positionNoButtonInitial();

window.addEventListener('resize', positionNoButtonInitial);


function moveNoButton() {

  if (!noBtn || !zone) return;

  const zoneRect =
    zone.getBoundingClientRect();

  const btnRect =
    noBtn.getBoundingClientRect();

  const maxX =
    Math.max(
      0,
      zoneRect.width -
      btnRect.width -
      20
    );

  const maxY =
    Math.max(
      0,
      zoneRect.height -
      btnRect.height -
      20
    );

  const randomX =
    10 +
    Math.random() *
    Math.max(0, maxX - 10);

  const randomY =
    10 +
    Math.random() *
    Math.max(0, maxY - 10);

  noBtn.style.left =
    `${randomX}px`;

  noBtn.style.top =
    `${randomY}px`;

  const hint =
    $('#noHint');

  if (hint) {

    hint.textContent =
      teasing[
        teaseIndex %
        teasing.length
      ];

  }

  teaseIndex++;

}


if (noBtn) {

  [
    'mouseenter',
    'pointerdown',
    'touchstart',
    'focus'
  ].forEach((eventName) => {

    noBtn.addEventListener(
      eventName,

      (event) => {

        event.preventDefault();

        moveNoButton();

      },

      {
        passive: false
      }
    );

  });

}


// ======================================================
// 8. BOTON SI
// ======================================================

const yesBtn =
  $('#yesBtn');


if (yesBtn) {

  yesBtn.addEventListener(
    'click',
    () => {

      state.answer = 'Sí';

      showToast(
        'Sabía que dirías que sí 😌💜'
      );

      setTimeout(() => {

        renderStep(2);

      }, 350);

    }
  );

}


// ======================================================
// 9. FECHA Y HORA
// ======================================================

const dateInput =
  $('#dateInput');

const timeInput =
  $('#timeInput');


if (dateInput) {

  const today =
    new Date();

  const yyyy =
    today.getFullYear();

  const mm =
    String(
      today.getMonth() + 1
    ).padStart(2, '0');

  const dd =
    String(
      today.getDate()
    ).padStart(2, '0');

  dateInput.min =
    `${yyyy}-${mm}-${dd}`;

}


const dateNext =
  $('#dateNext');


if (dateNext) {

  dateNext.addEventListener(
    'click',
    () => {

      if (
        !dateInput?.value ||
        !timeInput?.value
      ) {

        showToast(
          'Elige un día y una hora 💜'
        );

        return;

      }

      state.date =
        dateInput.value;

      state.time =
        timeInput.value;

      renderStep(3);

    }
  );

}


// ======================================================
// 10. ACTIVIDAD
// ======================================================

$$(
  '#dateOptions .option-card'
).forEach((button) => {

  button.addEventListener(
    'click',
    () => {

      $$(
        '#dateOptions .option-card'
      ).forEach((option) => {

        option.classList.remove(
          'selected'
        );

      });

      button.classList.add(
        'selected'
      );

      state.activity =
        button.dataset.value;

    }
  );

});


const activityNext =
  $('#activityNext');


if (activityNext) {

  activityNext.addEventListener(
    'click',
    () => {

      if (!state.activity) {

        showToast(
          'Escoge nuestra cita primero ✨'
        );

        return;

      }

      renderStep(4);

    }
  );

}


// ======================================================
// 11. MOOD
// ======================================================

$$(
  '#moodOptions .option-card'
).forEach((button) => {

  button.addEventListener(
    'click',
    () => {

      $$(
        '#moodOptions .option-card'
      ).forEach((option) => {

        option.classList.remove(
          'selected'
        );

      });

      button.classList.add(
        'selected'
      );

      state.mood =
        button.dataset.value;

    }
  );

});


// ======================================================
// 12. COMIDA
// ======================================================

$$(
  '#foodOptions .option-card'
).forEach((button) => {

  button.addEventListener(
    'click',
    () => {

      $$(
        '#foodOptions .option-card'
      ).forEach((option) => {

        option.classList.remove(
          'selected'
        );

      });

      button.classList.add(
        'selected'
      );

      state.food =
        button.dataset.value;

    }
  );

});


// ======================================================
// 13. BOTONES ATRAS
// ======================================================

$$('[data-back]')
  .forEach((button) => {

    button.addEventListener(
      'click',
      () => {

        renderStep(
          Math.max(
            1,
            currentStep - 1
          )
        );

      }
    );

  });


// ======================================================
// 14. FIREBASE
// ======================================================

async function initFirebase() {

  if (!firebaseConfig) return;

  try {

    const {
      initializeApp
    } =
      await import(
        'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'
      );

    const {
      getFirestore
    } =
      await import(
        'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js'
      );

    const app =
      initializeApp(
        firebaseConfig
      );

    db =
      getFirestore(app);

  }

  catch (error) {

    console.warn(
      'Firebase no pudo iniciar. Se utilizará localStorage.',
      error
    );

  }

}


// ======================================================
// 15. GUARDAR RESPUESTAS
// ======================================================

async function saveResponse(data) {

  localStorage.setItem(
    'cita-romantica-response',
    JSON.stringify(data)
  );

  if (!db) {

    return {
      online: false
    };

  }

  const {
    collection,
    addDoc,
    serverTimestamp
  } =
    await import(
      'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js'
    );

  await addDoc(

    collection(
      db,
      'respuestas_cita'
    ),

    {

      ...data,

      createdAtServer:
        serverTimestamp()

    }

  );

  return {
    online: true
  };

}


// ======================================================
// 16. FECHA AMIGABLE
// ======================================================

function getFriendlyDate() {

  if (!state.date) return '';

  return new Date(
    `${state.date}T12:00:00`
  ).toLocaleDateString(

    'es-MX',

    {

      weekday: 'long',

      day: 'numeric',

      month: 'long',

      year: 'numeric'

    }

  );

}


// ======================================================
// 17. ESCAPAR HTML
// ======================================================

function escapeHTML(text = '') {

  return String(text)

    .replaceAll(
      '&',
      '&amp;'
    )

    .replaceAll(
      '<',
      '&lt;'
    )

    .replaceAll(
      '>',
      '&gt;'
    )

    .replaceAll(
      '"',
      '&quot;'
    )

    .replaceAll(
      "'",
      '&#039;'
    );

}


// ======================================================
// 18. RESUMEN
// ======================================================

function buildSummary() {

  const summary =
    $('#summary');

  if (!summary) return;


  let html = `

    <div class="summary-row">

      <span>📅 Día</span>

      <strong>
        ${escapeHTML(
          getFriendlyDate()
        )}
      </strong>

    </div>


    <div class="summary-row">

      <span>🕐 Hora</span>

      <strong>
        ${escapeHTML(
          state.time
        )}
      </strong>

    </div>


    <div class="summary-row">

      <span>💘 Plan</span>

      <strong>
        ${escapeHTML(
          state.activity
        )}
      </strong>

    </div>


    <div class="summary-row">

      <span>✨ Mood</span>

      <strong>
        ${escapeHTML(
          state.mood ||
          'Sorpresa 👀'
        )}
      </strong>

    </div>


    <div class="summary-row">

      <span>🍰 Comida</span>

      <strong>
        ${escapeHTML(
          state.food ||
          'Lo que se antoje'
        )}
      </strong>

    </div>

  `;


  if (state.notes) {

    html += `

      <div class="summary-row">

        <span>
          💌 Petición especial
        </span>

        <strong>
          ${escapeHTML(
            state.notes
          )}
        </strong>

      </div>

    `;

  }


  summary.innerHTML =
    html;

}


// ======================================================
// 19. LIMPIAR CARACTERES ROTOS
// ======================================================

function cleanReplacementCharacters(value) {

  return String(
    value || ''
  )

    .replace(
      /\uFFFD/g,
      ''
    )

    .trim();

}


// ======================================================
// 20. PLAN PARA WHATSAPP
// ======================================================

function getActivityForWhatsApp() {

  const value =
    cleanReplacementCharacters(
      state.activity
    );


  if (
    value.includes('Bolos')
  ) {

    return 'Bolos __BOWLING__';

  }


  if (
    value.includes('Picnic')
  ) {

    return 'Picnic pintando __PALETTE____BASKET__';

  }


  if (
    value
      .toLowerCase()
      .includes('museo')
  ) {

    return 'Cita en el museo __PICTURE__';

  }


  if (
    value
      .toLowerCase()
      .includes('cine')
  ) {

    return 'Cita en el cine __MOVIE____POPCORN__';

  }


  if (
    value
      .toLowerCase()
      .includes('centro')
  ) {

    return 'Cita en el centro __CITY__';

  }


  if (
    value
      .toLowerCase()
      .includes('cafeter')
  ) {

    return 'Cafetería __COFFEE__';

  }


  if (
    value
      .toLowerCase()
      .includes('colores')
  ) {

    return 'Cita de colores __RAINBOW__';

  }


  return (
    value ||
    'Plan sorpresa'
  );

}


// ======================================================
// 21. MOOD PARA WHATSAPP
// ======================================================

function getMoodForWhatsApp() {

  const value =
    cleanReplacementCharacters(
      state.mood
    );


  if (
    value.includes('Romántica')
  ) {

    return 'Romántica __PURPLE_HEART__';

  }


  if (
    value.includes('Divertida')
  ) {

    return 'Divertida __LAUGH__';

  }


  if (
    value.includes('Tranquila')
  ) {

    return 'Tranquila __HANDS__';

  }


  return 'Sorpresa __EYES__';

}


// ======================================================
// 22. COMIDA PARA WHATSAPP
// ======================================================

function getFoodForWhatsApp() {

  const value =
    cleanReplacementCharacters(
      state.food
    );


  if (
    value.includes('Dulce')
  ) {

    return 'Dulce __CAKE__';

  }


  if (
    value.includes('Salado')
  ) {

    return 'Salado __PIZZA__';

  }


  if (
    value.includes('Ambos')
  ) {

    return 'Ambos __YUM__';

  }


  return 'Lo que se antoje __YUM__';

}


// ======================================================
// 23. CONSTRUIR MENSAJE WHATSAPP
// ======================================================

function buildWhatsAppMessage() {

  const lines = [

    '__PURPLE_HEART__ *CITA CONFIRMADA* __PURPLE_HEART__',

    '',

    'Sí quiero salir contigo __CUTE____RED_HEART__',

    '',

    `__CALENDAR__ *Día:* ${getFriendlyDate()}`,

    `__CLOCK__ *Hora:* ${state.time || ''}`,

    `__CUPID__ *Plan:* ${getActivityForWhatsApp()}`,

    `__SPARKLE__ *Mood:* ${getMoodForWhatsApp()}`,

    `__CAKE__ *Comida:* ${getFoodForWhatsApp()}`

  ];


  if (state.notes) {

    lines.push(

      `__LETTER__ *Petición especial:* ${cleanReplacementCharacters(
        state.notes
      )}`

    );

  }


  lines.push('');

  lines.push(
    '--------------------'
  );

  lines.push('');

  

  lines.push(
    '__PARTY__ Nos vemos pronto'
  );

  lines.push('');

  


  return lines.join('\n');

}


// ======================================================
// 24. CODIFICAR EMOJIS
// ======================================================

function encodeWhatsAppMessage(message) {

  let encoded =
    encodeURIComponent(
      message
    );


  const encodedEmoji = {

    '__PURPLE_HEART__':
      '%F0%9F%92%9C',

    '__CUTE__':
      '%F0%9F%A5%B9',

    '__RED_HEART__':
      '%E2%9D%A4%EF%B8%8F',

    '__CALENDAR__':
      '%F0%9F%93%85',

    '__CLOCK__':
      '%F0%9F%95%90',

    '__CUPID__':
      '%F0%9F%92%98',

    '__SPARKLE__':
      '%E2%9C%A8',

    '__CAKE__':
      '%F0%9F%8D%B0',

    '__PIZZA__':
      '%F0%9F%8D%95',

    '__LETTER__':
      '%F0%9F%92%8C',

    '__LAPTOP__':
      '%F0%9F%92%BB',

    '__CHECK__':
      '%E2%9C%85',

    '__PARTY__':
      '%F0%9F%8E%89',

    '__BOWLING__':
      '%F0%9F%8E%B3',

    '__PALETTE__':
      '%F0%9F%8E%A8',

    '__BASKET__':
      '%F0%9F%A7%BA',

    '__PICTURE__':
      '%F0%9F%96%BC%EF%B8%8F',

    '__MOVIE__':
      '%F0%9F%8E%AC',

    '__POPCORN__':
      '%F0%9F%8D%BF',

    '__CITY__':
      '%F0%9F%8C%86',

    '__COFFEE__':
      '%E2%98%95',

    '__RAINBOW__':
      '%F0%9F%8C%88',

    '__LAUGH__':
      '%F0%9F%98%82',

    '__HANDS__':
      '%F0%9F%AB%B6',

    '__EYES__':
      '%F0%9F%91%80',

    '__YUM__':
      '%F0%9F%98%8B'

  };


  Object.entries(
    encodedEmoji
  ).forEach(
    ([token, value]) => {

      encoded =
        encoded
          .split(token)
          .join(value);

    }
  );


  return encoded;

}


// ======================================================
// 25. ABRIR WHATSAPP
// ======================================================

function openWhatsAppSummary() {

  const cleanNumber =
    WHATSAPP_NUMBER.replace(
      /\D/g,
      ''
    );


  if (!cleanNumber) {

    showToast(
      'Falta configurar el número de WhatsApp'
    );

    return false;

  }


  const message =
    buildWhatsAppMessage();


  const encodedMessage =
    encodeWhatsAppMessage(
      message
    );


  const whatsappUrl =
    `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;


  console.log(
    'Mensaje preparado:',
    message
  );


  console.log(
    'URL de WhatsApp:',
    whatsappUrl
  );


  window.location.assign(
    whatsappUrl
  );


  return true;

}


// ======================================================
// 26. CONFIRMAR CITA
// ======================================================

const finishBtn =
  $('#finishBtn');


if (finishBtn) {

  finishBtn.addEventListener(
    'click',
    async () => {


      const notesInput =
        $('#notesInput');


      state.notes =
        notesInput
          ? notesInput.value.trim()
          : '';


      if (!state.mood) {

        showToast(
          'Elige el mood de nuestra cita ✨'
        );

        return;

      }


      if (!state.food) {

        showToast(
          'Falta decidir: ¿dulce o salado? 👀'
        );

        return;

      }


      state.createdAt =
        new Date().toISOString();


      finishBtn.disabled =
        true;


      finishBtn.textContent =
        'Preparando cita… 💜';


      try {

        await saveResponse(
          state
        );

      }

      catch (error) {

        console.error(
          error
        );


        localStorage.setItem(

          'cita-romantica-response',

          JSON.stringify(
            state
          )

        );

      }


      buildSummary();


      renderStep(5);


      showToast(
        'Cita preparada 💜 Revisa el resumen'
      );


      finishBtn.disabled =
        false;


      finishBtn.textContent =
        'Confirmar cita 💜';

    }
  );

}


// ======================================================
// 27. ENVIAR A WHATSAPP
// ======================================================

const sendWhatsAppBtn =
  $('#sendWhatsAppBtn');


if (sendWhatsAppBtn) {

  sendWhatsAppBtn.addEventListener(
    'click',
    () => {


      sendWhatsAppBtn.disabled =
        true;


      sendWhatsAppBtn.textContent =
        'Abriendo WhatsApp… 💚';


      const opened =
        openWhatsAppSummary();


      if (!opened) {

        sendWhatsAppBtn.disabled =
          false;


        sendWhatsAppBtn.textContent =
          'Enviar respuesta por WhatsApp 💚';

      }

    }
  );

}


// ======================================================
// 28. CAMBIAR RESPUESTAS
// ======================================================

const restartBtn =
  $('#restartBtn');


if (restartBtn) {

  restartBtn.addEventListener(
    'click',
    () => {

      renderStep(2);

    }
  );

}


// ======================================================
// 29. INICIAR
// ======================================================

initFirebase();

renderStep(1);