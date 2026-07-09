// Lógica para renderizado y navegación simple
(function(){
  const { el, createCard, createGallery, createMenuItem } = window.DOM;
  const app = document.getElementById('app');
  const menuList = document.getElementById('menu-list');
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  function renderMenu(){
    menuList.innerHTML = '';
    // Inicio
    addMenuItem({text: 'Inicio', action: () => navigateTo('inicio')});
    // Programas (con submenu)
    const programasLi = el('li', { text: 'Programas ▾' });
    const submenu = el('ul', { className: 'submenu' });
    SITE.programs.forEach(p=>{
      submenu.appendChild(createMenuItem(p.title, () => {
        navigateToProgram(p.slug);
        hideMenu();
      }));
    });
    programasLi.appendChild(submenu);
    menuList.appendChild(programasLi);

    // Detalles
    addMenuItem({text:'Detalles', action: () => navigateTo('detalles')});
  }

  function addMenuItem({text, action}){
    menuList.appendChild(createMenuItem(text, ()=>{ action(); hideMenu(); }));
  }

  menuToggle.addEventListener('click', ()=>{
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    if(open) hideMenu(); else showMenu();
  });
  function showMenu(){
    menu.hidden = false;
    menuToggle.setAttribute('aria-expanded','true');
  }
  function hideMenu(){
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded','false');
  }
  window.addEventListener('click', (e)=>{
    if(!menu.contains(e.target) && e.target !== menuToggle) hideMenu();
  });

  function navigateTo(id){
    const page = SITE.pages.find(p => p.id === id);
    if(!page) { renderNotFound(); return;}
    if(page.type === 'home') renderHome(page);
    else if(page.type === 'details') renderDetails(page);
  }

  function navigateToProgram(slug){
    const prog = SITE.programs.find(p => p.slug === slug);
    if(!prog) { renderNotFound(); return; }
    renderProgram(prog);
  }

  function renderHome(page){
    app.innerHTML = '';
    const hero = createCard({ className: 'hero' });
    const left = el('div', { className: 'left' });
    left.appendChild(el('h1', { text: SITE.title }));
    left.appendChild(el('p', { text: SITE.tagline }));
    hero.appendChild(left);
    app.appendChild(hero);

    page.content.forEach(block=>{
      if(block.type === 'text'){
        app.appendChild(createCard({ html: `<h3 class="section-title">Texto</h3><p>${block.text}</p>` }));
      } else if(block.type === 'gallery'){
        const sec = createCard({ html: `<h3 class="section-title">Galería</h3>` });
        sec.appendChild(createGallery(block.images));
        app.appendChild(sec);
      } else if(block.type === 'hero'){
        app.appendChild(createCard({ html: `<h2>${block.title}</h2><p>${block.text}</p>` }));
      }
    });
  }

  function renderDetails(page){
    app.innerHTML = '';
    const sec = createCard({ html: `<h2 class="section-title">Detalles</h2><p>${page.content.text}</p>` });
    if(page.content.images && page.content.images.length){
      sec.appendChild(createGallery(page.content.images));
    }
    app.appendChild(sec);
  }

  function renderProgram(p){
    app.innerHTML = '';
    const wrapper = createCard({
      styles: {
        background: p.bgColor || 'transparent',
        padding: '18px',
        borderRadius: '12px'
      }
    });
    const grid = el('div', { className: 'grid' });
    const left = el('div', { html: `<h2 class="section-title">${p.title}</h2>
                      <div class="program">
                        <img src="${p.image}" alt="${p.title}" />
                        <div class="info">
                          <p>${p.text}</p>
                          <a class="download-btn" href="${p.download}" target="_blank" rel="noopener">Descargar</a>
                        </div>
                      </div>` });
    const right = el('div', { html: `<div class="card"><strong>Enlaces</strong><p class="footer-note">En el archivo js/data.js puedes editar el color de fondo, texto, imagen y enlace de descarga.</p></div>` });
    grid.appendChild(left);
    grid.appendChild(right);
    wrapper.appendChild(grid);
    app.appendChild(wrapper);
  }

  function renderNotFound(){
    app.innerHTML = '<div class="card"><h2>No encontrado</h2><p>La página solicitada no existe.</p></div>';
  }

  // Inicialización
  renderMenu();
  // Si hay hash en la URL, navegamos según eso
  function routeFromHash(){
    const hash = location.hash.replace('#','');
    if(!hash){ navigateTo('inicio'); return; }
    if(hash.startsWith('prog:')){
      navigateToProgram(hash.replace('prog:',''));
    } else {
      navigateTo(hash);
    }
  }
  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();

  // Provee función útil para dev: abrir programa por slug
  window.openProgram = (slug) => {
    location.hash = `prog:${slug}`;
  };

})();
