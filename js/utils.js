// Utilidades compartidas de DOM. Reúne los patrones repetidos usados en app.js.
// Se carga antes que app.js y expone las funciones en `window.DOM`.
(function(){
  // Crea un elemento con opciones comunes (clase, texto, html, estilos, atributos).
  function el(tag, options){
    const node = document.createElement(tag);
    if(!options) return node;
    const { className, text, html, styles, attrs } = options;
    if(className) node.className = className;
    if(text != null) node.textContent = text;
    if(html != null) node.innerHTML = html;
    if(styles) Object.assign(node.style, styles);
    if(attrs) for(const key in attrs) node.setAttribute(key, attrs[key]);
    return node;
  }

  // Crea una <section class="card"> (con clases y html/estilos opcionales).
  function createCard(options){
    const opts = options || {};
    const className = opts.className ? `card ${opts.className}` : 'card';
    return el('section', { className, html: opts.html, styles: opts.styles });
  }

  // Crea un <div class="gallery"> con una imagen por cada src del array.
  function createGallery(images){
    const gallery = el('div', { className: 'gallery' });
    (images || []).forEach(src => {
      gallery.appendChild(el('img', { attrs: { src, alt: '' } }));
    });
    return gallery;
  }

  // Crea un <li> de menú con texto y un manejador de click.
  function createMenuItem(text, onClick){
    const li = el('li', { text });
    li.addEventListener('click', onClick);
    return li;
  }

  window.DOM = { el, createCard, createGallery, createMenuItem };
})();
