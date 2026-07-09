// Edita aquí las páginas y programas. Todo se renderiza desde este archivo.
// Añade/quita objetos para cambiar el contenido sin tocar app.js

const SITE = {
  title: "Partido Al Medio",
  tagline: "El mejor diseño de cobre de todos con diseño muy bueno en método glatzight",
  pages: [
    {
      id: "inicio",
      title: "Optimizador y destrabar windows",
      type: "home",
      // contenido: array de bloques {type: 'text'|'image'|'hero', content: ...}
      content: [
        { type: "hero", title: "Bienvenido a Partido Al Medio", text: "Diseño pensado con cariño y estética cobre. Aquí puedes colocar varias fotos y texto." },
        { type: "text", text: "Este sitio está creado para demostrar un sistema de páginas y subpáginas editables desde el código. Personaliza las imágenes en assets/images/." },
        { type: "gallery", images: ["assets/images/home1.jpg", "assets/images/home2.jpg", "assets/images/home3.jpg"] }
      ]
    },
    {
      id: "detalles",
      title: "Detalles",
      type: "details",
      content: {
        text: "Aquí puedes colocar detalles extensos sobre el proyecto, con fotos y explicaciones.",
        images: ["assets/images/det1.jpg", "assets/images/det2.jpg"]
      }
    }
  ],
  // Programas: subpáginas editables
  programs: [
    {
      id: "prog-1",
      title: "Optimizador y destrabar windows",
      slug: "programa-a",
      bgColor: "#fff7ee",
      text: "Optimizador windows",
      image: "assets/images/prog1.jpg",
      download: "https://github.com/Resecitud1997/Optimizador-y-destrabar-windows/tree/main/software/releases/latest/download/Optimizador%20y%20destrabar%20Windows.exe.zip"
    },
  ]
};

// Exporta SITE para entornos de pruebas (Node/Jest). En el navegador esta
// guarda no tiene efecto porque `module` no existe.
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE;
}
