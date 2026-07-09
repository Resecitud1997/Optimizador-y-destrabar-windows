// Lógica para renderizado y navegación simple
(function(){
  const app = document.getElementById('app');

  // Solo permite URLs http(s) o relativas. Bloquea esquemas peligrosos
  // como javascript: o data: que permitirían ejecutar código.
  function safeUrl(url){
    if(typeof url !== 'string') return '';
    const trimmed = url.trim();
    if(/^(https?:|mailto:|\/|\.|#|[^:]*$)/i.test(trimmed) && !/^\s*javascript:/i.test(trimmed)){
      return trimmed;
    }
    return '';
  }
  const menuList = document.getElementById('menu-list');
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  function renderMenu(){
    menuList.innerHTML = '';
    // Inicio
    addMenuItem({text: 'Inicio', action: () => navigateTo('inicio')});
    // Programas (con submenu)
    const programasLi = document.createElement('li');
    programasLi.textContent = 'Programas ▾';
    const submenu = document.createElement('ul');
    submenu.className = 'submenu';
    SITE.programs.forEach(p=>{
      const li = document.createElement('li');
      li.textContent = p.title;
      li.addEventListener('click', () => {
        navigateToProgram(p.slug);
        hideMenu();
      });
      submenu.appendChild(li);
    });
    programasLi.appendChild(submenu);
    menuList.appendChild(programasLi);

    // Detalles
    addMenuItem({text:'Detalles', action: () => navigateTo('detalles')});
  }

  function addMenuItem({text, action}){
    const li = document.createElement('li');
    li.textContent = text;
    li.addEventListener('click', ()=>{ action(); hideMenu(); });
    menuList.appendChild(li);
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
    const hero = document.createElement('section');
    hero.className = 'card hero';
    const left = document.createElement('div');
    left.className = 'left';
    const h1 = document.createElement('h1');
    h1.textContent = SITE.title;
    const p = document.createElement('p');
    p.textContent = SITE.tagline;
    left.appendChild(h1);
    left.appendChild(p);
    hero.appendChild(left);
    app.appendChild(hero);

    page.content.forEach(block=>{
      if(block.type === 'text'){
        const sec = document.createElement('section');
        sec.className = 'card';
        const h3 = document.createElement('h3'); h3.className = 'section-title'; h3.textContent = 'Texto';
        const p = document.createElement('p'); p.textContent = block.text;
        sec.appendChild(h3); sec.appendChild(p);
        app.appendChild(sec);
      } else if(block.type === 'gallery'){
        const sec = document.createElement('section');
        sec.className = 'card';
        const h3 = document.createElement('h3'); h3.className = 'section-title'; h3.textContent = 'Galería';
        sec.appendChild(h3);
        const g = document.createElement('div'); g.className='gallery';
        block.images.forEach(src=>{
          const img = document.createElement('img'); img.src=safeUrl(src); img.alt='';
          g.appendChild(img);
        });
        sec.appendChild(g);
        app.appendChild(sec);
      } else if(block.type === 'hero'){
        const sec = document.createElement('section');
        sec.className = 'card';
        const h2 = document.createElement('h2'); h2.textContent = block.title;
        const p = document.createElement('p'); p.textContent = block.text;
        sec.appendChild(h2); sec.appendChild(p);
        app.appendChild(sec);
      }
    });
  }

  function renderDetails(page){
    app.innerHTML = '';
    const sec = document.createElement('section');
    sec.className = 'card';
    const h2 = document.createElement('h2'); h2.className = 'section-title'; h2.textContent = 'Detalles';
    const p = document.createElement('p'); p.textContent = page.content.text;
    sec.appendChild(h2); sec.appendChild(p);
    if(page.content.images && page.content.images.length){
      const g = document.createElement('div'); g.className='gallery';
      page.content.images.forEach(src=>{
        const img = document.createElement('img'); img.src=safeUrl(src); img.alt='';
        g.appendChild(img);
      });
      sec.appendChild(g);
    }
    app.appendChild(sec);
  }

  function renderProgram(p){
    app.innerHTML = '';
    const wrapper = document.createElement('section');
    wrapper.style.background = p.bgColor || 'transparent';
    wrapper.style.padding = '18px';
    wrapper.style.borderRadius = '12px';
    wrapper.className = 'card';
    const grid = document.createElement('div');
    grid.className = 'grid';
    const left = document.createElement('div');
    const title = document.createElement('h2'); title.className = 'section-title'; title.textContent = p.title;
    const program = document.createElement('div'); program.className = 'program';
    const img = document.createElement('img'); img.src = safeUrl(p.image); img.alt = p.title || '';
    const info = document.createElement('div'); info.className = 'info';
    const desc = document.createElement('p'); desc.textContent = p.text;
    const dl = document.createElement('a');
    dl.className = 'download-btn';
    dl.href = safeUrl(p.download) || '#';
    dl.target = '_blank';
    dl.rel = 'noopener noreferrer';
    dl.textContent = 'Descargar';
    info.appendChild(desc); info.appendChild(dl);
    program.appendChild(img); program.appendChild(info);
    left.appendChild(title); left.appendChild(program);
    const right = document.createElement('div');
    const rightCard = document.createElement('div'); rightCard.className = 'card';
    const strong = document.createElement('strong'); strong.textContent = 'Enlaces';
    const note = document.createElement('p'); note.className = 'footer-note';
    note.textContent = 'En el archivo js/data.js puedes editar el color de fondo, texto, imagen y enlace de descarga.';
    rightCard.appendChild(strong); rightCard.appendChild(note);
    right.appendChild(rightCard);
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
