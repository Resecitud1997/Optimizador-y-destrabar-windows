// Edita aquí las páginas y programas. Todo se renderiza desde este archivo.
// Añade/quita objetos para cambiar el contenido sin tocar app.js

const SITE = {
  title: "Partido Al Medio",
  tagline: "El mejor diseño de cobre de todos con diseño muy bueno en método glatzight",
  pages: [
    {
      id: "inicio",
      title: "Inicio",
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
      title: "Programa A",
      slug: "programa-a",
      bgColor: "#fff7ee",
      text: "Descripción del Programa A. Aquí colocas lo que necesites.",
      image: "assets/images/prog1.jpg",
      download: "https://example.com/programa-a.zip"
    },
    {
      id: "prog-2",
      title: "Programa B",
      slug: "programa-b",
      bgColor: "#eef9ff",
      text: "Descripción del Programa B. Cambia color, texto, imagen y enlace aquí.",
      image: "assets/images/prog2.jpg",
      download: "https://example.com/programa-b.zip"
    }
  ]
};
