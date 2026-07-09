const path = require("path");

const APP_PATH = path.resolve(__dirname, "..", "js", "app.js");
const DATA_PATH = path.resolve(__dirname, "..", "js", "data.js");

// Estructura minima del DOM que app.js espera encontrar (ver index.html).
const BASE_HTML = `
  <header class="site-header">
    <nav class="nav">
      <button id="menu-toggle" aria-expanded="false" aria-controls="menu" class="menu-btn">Menu</button>
      <div id="menu" class="menu" hidden>
        <ul id="menu-list" class="menu-list"></ul>
      </div>
    </nav>
  </header>
  <main id="app" class="app"></main>
`;

// Prepara un DOM limpio, expone SITE como global y carga app.js con el hash
// indicado para que su inicializacion (routeFromHash) renderice esa vista.
function loadApp(hash = "") {
  document.body.innerHTML = BASE_HTML;
  window.location.hash = hash;

  jest.resetModules();
  // Recarga los datos para que cada prueba parta de una copia intacta.
  const site = require(DATA_PATH);
  global.SITE = site;
  require(APP_PATH);

  return {
    site,
    app: document.getElementById("app"),
    menu: document.getElementById("menu"),
    menuToggle: document.getElementById("menu-toggle"),
    menuList: document.getElementById("menu-list"),
  };
}

module.exports = { loadApp, BASE_HTML, APP_PATH, DATA_PATH };
