const SITE = require("../js/data.js");

describe("data.js - estructura de SITE", () => {
  test("exporta un objeto con titulo y tagline no vacios", () => {
    expect(typeof SITE).toBe("object");
    expect(SITE).not.toBeNull();
    expect(typeof SITE.title).toBe("string");
    expect(SITE.title.length).toBeGreaterThan(0);
    expect(typeof SITE.tagline).toBe("string");
    expect(SITE.tagline.length).toBeGreaterThan(0);
  });

  test("pages es un arreglo con al menos una pagina de inicio y una de detalles", () => {
    expect(Array.isArray(SITE.pages)).toBe(true);
    expect(SITE.pages.length).toBeGreaterThan(0);

    const home = SITE.pages.find((p) => p.type === "home");
    const details = SITE.pages.find((p) => p.type === "details");
    expect(home).toBeDefined();
    expect(details).toBeDefined();
  });

  test("cada pagina tiene id, title y type", () => {
    for (const page of SITE.pages) {
      expect(typeof page.id).toBe("string");
      expect(page.id.length).toBeGreaterThan(0);
      expect(typeof page.title).toBe("string");
      expect(["home", "details"]).toContain(page.type);
    }
  });

  test("los ids de las paginas son unicos", () => {
    const ids = SITE.pages.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("la pagina home tiene bloques de contenido validos", () => {
    const home = SITE.pages.find((p) => p.type === "home");
    expect(Array.isArray(home.content)).toBe(true);
    expect(home.content.length).toBeGreaterThan(0);

    const validTypes = ["text", "gallery", "hero"];
    for (const block of home.content) {
      expect(validTypes).toContain(block.type);
      if (block.type === "gallery") {
        expect(Array.isArray(block.images)).toBe(true);
      }
    }
  });

  test("la pagina de detalles tiene texto e imagenes", () => {
    const details = SITE.pages.find((p) => p.type === "details");
    expect(typeof details.content.text).toBe("string");
    expect(Array.isArray(details.content.images)).toBe(true);
  });

  test("programs es un arreglo con slugs unicos y campos requeridos", () => {
    expect(Array.isArray(SITE.programs)).toBe(true);
    expect(SITE.programs.length).toBeGreaterThan(0);

    const slugs = SITE.programs.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const prog of SITE.programs) {
      expect(typeof prog.slug).toBe("string");
      expect(prog.slug.length).toBeGreaterThan(0);
      expect(typeof prog.title).toBe("string");
      expect(typeof prog.text).toBe("string");
      expect(typeof prog.image).toBe("string");
      expect(typeof prog.download).toBe("string");
    }
  });

  test("los enlaces de descarga usan http/https", () => {
    for (const prog of SITE.programs) {
      expect(prog.download).toMatch(/^https?:\/\//);
    }
  });
});
