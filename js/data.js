// Edita aquí las páginas y programas. Todo se renderiza desde este archivo.
// Añade/quita objetos para cambiar el contenido sin tocar app.js

const SITE = {
  title: "Partido Al Medio",
  tagline: "Software para optimizar windows con función extra de optimizar Gpu Y Cpu",
  pages: [
    {
      id: "inicio",
      title: "Inicio",
      type: "home",
      // contenido: array de bloques {type: 'text'|'image'|'hero', content: ...}
      content: [
        { type: "hero", title: "Bienvenido a Partido Al Medio", text: "Software para optimizar windows con función extra de optimizar Gpu Y Cpu" },
        { type: "text", text: "Software para optimizar windows con función extra de optimizar Gpu Y Cpu" },
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
      title: "Optimizador Windows y Gpu + destrabar windows",
      slug: "Optimizar windows y destrabar",
      bgColor: "#fff7ee",
      text: "Software para optimizar windows con función extra de optimizar Gpu Y Cpu",
      image: "assets/images/prog1.jpg",
      download: "https://github.com/Resecitud1997/Optimizador-y-destrabar-windows/tree/main/software/releases/latest/download/Optimizador%20y%20destrabar%20Windows.exe"
    },
/example.com/programa-b.zip"
    }
  ]
};
