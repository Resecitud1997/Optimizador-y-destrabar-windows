const { loadApp } = require("./helpers");

describe("app.js - renderizado del menu", () => {
  test("renderMenu crea Inicio, Programas (con submenu) y Detalles", () => {
    const { menuList, site } = loadApp("");
    const topItems = Array.from(menuList.children);

    // Inicio, Programas, Detalles.
    const texts = topItems.map((li) => li.textContent);
    expect(texts.some((t) => t.includes("Inicio"))).toBe(true);
    expect(texts.some((t) => t.includes("Programas"))).toBe(true);
    expect(texts.some((t) => t.includes("Detalles"))).toBe(true);

    const submenu = menuList.querySelector("ul.submenu");
    expect(submenu).not.toBeNull();
    expect(submenu.children.length).toBe(site.programs.length);
    expect(submenu.children[0].textContent).toBe(site.programs[0].title);
  });
});

describe("app.js - navegacion inicial por hash", () => {
  test("sin hash renderiza la pagina de inicio (home)", () => {
    const { app, site } = loadApp("");
    expect(app.querySelector("h1").textContent).toBe(site.title);
    expect(app.textContent).toContain(site.tagline);

    // Bloque hero.
    const home = site.pages.find((p) => p.type === "home");
    const hero = home.content.find((b) => b.type === "hero");
    expect(app.textContent).toContain(hero.title);
    expect(app.textContent).toContain(hero.text);

    // Bloque texto.
    const textBlock = home.content.find((b) => b.type === "text");
    expect(app.textContent).toContain(textBlock.text);

    // Bloque galeria: una <img> por cada imagen declarada.
    const gallery = home.content.find((b) => b.type === "gallery");
    const imgs = app.querySelectorAll(".gallery img");
    expect(imgs.length).toBe(gallery.images.length);
  });

  test("hash #detalles renderiza la pagina de detalles", () => {
    const { app, site } = loadApp("#detalles");
    const details = site.pages.find((p) => p.type === "details");
    expect(app.querySelector(".section-title").textContent).toBe("Detalles");
    expect(app.textContent).toContain(details.content.text);
    expect(app.querySelectorAll(".gallery img").length).toBe(
      details.content.images.length
    );
  });

  test("hash prog:<slug> renderiza el programa correspondiente", () => {
    const { app, site } = loadApp("#prog:programa-a");
    const prog = site.programs.find((p) => p.slug === "programa-a");

    expect(app.querySelector(".section-title").textContent).toBe(prog.title);
    const img = app.querySelector(".program img");
    expect(img.getAttribute("src")).toBe(prog.image);
    const link = app.querySelector("a.download-btn");
    expect(link.getAttribute("href")).toBe(prog.download);

    const wrapper = app.querySelector("section.card");
    expect(wrapper.style.background).not.toBe("");
  });

  test("un programa sin bgColor cae en 'transparent'", () => {
    const { app } = loadApp("");
    // Manipulamos SITE en memoria y navegamos manualmente via openProgram.
    global.SITE.programs.push({
      id: "prog-x",
      title: "Sin Fondo",
      slug: "sin-fondo",
      text: "demo",
      image: "x.jpg",
      download: "https://example.com/x.zip",
    });
    window.openProgram("sin-fondo");
    window.dispatchEvent(new window.HashChangeEvent("hashchange"));

    const wrapper = app.querySelector("section.card");
    expect(wrapper.style.background).toBe("transparent");
  });
});

describe("app.js - casos defensivos de renderizado", () => {
  test("un bloque de tipo desconocido en home se ignora sin romper", () => {
    const { app } = loadApp("");
    const home = global.SITE.pages.find((p) => p.type === "home");
    home.content.push({ type: "desconocido", text: "no deberia verse" });

    window.location.hash = "#inicio";
    window.dispatchEvent(new window.HashChangeEvent("hashchange"));

    expect(app.textContent).not.toContain("no deberia verse");
    expect(app.querySelector("h1").textContent).toBe(global.SITE.title);
  });

  test("una pagina con type desconocido no renderiza contenido", () => {
    const { app } = loadApp("");
    global.SITE.pages.push({ id: "rara", title: "Rara", type: "otro", content: [] });

    window.location.hash = "#rara";
    window.dispatchEvent(new window.HashChangeEvent("hashchange"));

    // navigateTo encuentra la pagina pero ningun branch de tipo aplica,
    // por lo que el contenido previo permanece sin cambios.
    expect(app.querySelector("h1").textContent).toBe(global.SITE.title);
  });
});

describe("app.js - paginas no encontradas", () => {
  test("un slug de programa inexistente muestra 'No encontrado'", () => {
    const { app } = loadApp("#prog:no-existe");
    expect(app.textContent).toContain("No encontrado");
  });

  test("un id de pagina inexistente muestra 'No encontrado'", () => {
    const { app } = loadApp("#pagina-fantasma");
    expect(app.textContent).toContain("No encontrado");
  });
});

describe("app.js - interaccion con el menu", () => {
  test("el boton de menu alterna la visibilidad (abrir/cerrar)", () => {
    const { menu, menuToggle } = loadApp("");
    expect(menu.hidden).toBe(true);
    expect(menuToggle.getAttribute("aria-expanded")).toBe("false");

    menuToggle.click();
    expect(menu.hidden).toBe(false);
    expect(menuToggle.getAttribute("aria-expanded")).toBe("true");

    menuToggle.click();
    expect(menu.hidden).toBe(true);
    expect(menuToggle.getAttribute("aria-expanded")).toBe("false");
  });

  test("un clic fuera del menu lo cierra", () => {
    const { app, menu, menuToggle } = loadApp("");
    menuToggle.click();
    expect(menu.hidden).toBe(false);

    app.click(); // clic fuera del menu y del boton
    expect(menu.hidden).toBe(true);
  });

  test("clic en un item del submenu navega al programa y cierra el menu", () => {
    const { app, menu, menuToggle, menuList, site } = loadApp("");
    menuToggle.click();
    expect(menu.hidden).toBe(false);

    const submenuItem = menuList.querySelector("ul.submenu li");
    submenuItem.click();

    const prog = site.programs[0];
    expect(app.querySelector(".section-title").textContent).toBe(prog.title);
    expect(menu.hidden).toBe(true);
  });

  test("clic en 'Detalles' del menu principal navega a detalles", () => {
    const { app, menuList } = loadApp("");
    const detallesItem = Array.from(menuList.children).find((li) =>
      li.textContent.includes("Detalles")
    );
    detallesItem.click();
    expect(app.querySelector(".section-title").textContent).toBe("Detalles");
  });
});

describe("app.js - enrutamiento por hashchange y openProgram", () => {
  test("openProgram actualiza el hash a prog:<slug>", () => {
    loadApp("");
    window.openProgram("programa-a");
    expect(window.location.hash).toBe("#prog:programa-a");
  });

  test("cambiar el hash re-renderiza la vista (hashchange)", () => {
    const { app } = loadApp("");
    window.location.hash = "#detalles";
    window.dispatchEvent(new window.HashChangeEvent("hashchange"));
    expect(app.querySelector(".section-title").textContent).toBe("Detalles");
  });
});
