/* =========================================================================
   NENEBARBER7 — Interacciones
   Sin dependencias obligatorias. Lenis (smooth scroll) se usa si carga.
   ========================================================================= */
(function () {
  "use strict";

  var NB = window.NB || {};
  var doc = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isDesktop = function () { return window.matchMedia("(min-width: 900px)").matches; };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var subs = [];
  function onScroll(fn) { subs.push(fn); }
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------------------------------------------------------------- Enlace de reserva centralizado */
  if (NB.booking) $$("[data-book]").forEach(function (a) { a.href = NB.booking; });

  /* ---------------------------------------------------------------- Gate (acceso privado) */
  (function () {
    var gate = $("#gate");
    if (!gate) return;
    var cfg = NB.gate || {};
    if (!cfg.enabled || store.get("nb_gate_ok") === "1") { gate.remove(); return; }
    gate.hidden = false;
    body.classList.add("gate-active");
    var input = $("#gate-input");
    setTimeout(function () { input && input.focus(); }, 300);
    $("#gate-form").addEventListener("submit", function (e) {
      e.preventDefault();
      if ((input.value || "").trim().toUpperCase() === String(cfg.password).toUpperCase()) {
        store.set("nb_gate_ok", "1");
        gate.classList.add("is-unlocked");
        body.classList.remove("gate-active");
        setTimeout(function () { gate.remove(); }, 900);
      } else {
        gate.classList.add("is-error");
        input.value = "";
      }
    });
  })();

  /* ---------------------------------------------------------------- Titular del hero: ocupa exactamente el ancho disponible */
  function fitHero() {
    var t = $(".hero-title"), inner = t && $(".clip", t);
    if (!inner) return;
    var box = t.parentNode, cs = getComputedStyle(box);
    var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    t.style.fontSize = "100px";
    var w = inner.scrollWidth;
    if (!w) return;
    var size = Math.min(320, 100 * avail / w * 0.99);
    t.style.fontSize = size.toFixed(1) + "px";
  }
  fitHero();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);
  window.addEventListener("resize", fitHero);

  /* ---------------------------------------------------------------- Año */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------------------------------------------------------------- Próximas formaciones */
  (function () {
    var grid = $("#formaciones-grid");
    if (!grid || !NB.formaciones) return;
    var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var ig = NB.instagram || "#";
    var anyExample = false;
    grid.innerHTML = NB.formaciones.map(function (f, i) {
      if (f.example) anyExample = true;
      return '<article class="fcard" data-reveal style="--d:' + (i * 0.08) + 's">' +
        '<div class="fcard-top"><span class="fcard-type">' + esc(f.type) + '</span>' +
        (f.example ? '<span class="tbd">Contenido de ejemplo</span>' : '') + '</div>' +
        '<div class="fcard-date"><span class="fcard-day">' + esc(f.day) + '</span><span class="fcard-month">' + esc(f.month) + '<br>' + esc(f.year) + '</span></div>' +
        '<h3>' + esc(f.name) + '</h3><p>' + esc(f.text) + '</p>' +
        '<dl class="fcard-meta">' +
          '<div><dt>Lugar</dt><dd>' + esc(f.place) + '</dd></div>' +
          '<div><dt>Plazas</dt><dd>' + esc(f.seats) + '</dd></div>' +
          '<div><dt>Formato</dt><dd>' + esc(f.type.split("·")[0]) + '</dd></div>' +
          '<div><dt>Duración</dt><dd>' + esc(f.duration) + '</dd></div>' +
        '</dl>' +
        '<div class="fcard-ctas">' +
          '<a class="btn btn--sm" href="' + esc(f.bookUrl || ig) + '" target="_blank" rel="noopener">Reservar plaza</a>' +
          '<a class="btn btn--sm btn--ghost" href="' + esc(f.moreUrl || ig) + '" target="_blank" rel="noopener">Más información</a>' +
        '</div></article>';
    }).join("");
    if (anyExample) {
      var note = document.createElement("p");
      note.className = "prox-note";
      note.innerHTML = '<span class="tbd">Aviso interno</span> Las fechas mostradas son de ejemplo: se sustituyen en <code>assets/js/content.js</code>.';
      grid.after(note);
    }
  })();

  /* ---------------------------------------------------------------- Marcas (marquee) */
  (function () {
    var track = $("#marquee-track");
    if (!track || !NB.marcas || !NB.marcas.length) return;
    var hasPh = false;
    var item = function (m) {
      if (m.logo) return '<div class="brand"><img src="' + m.logo + '" alt="' + m.name + '" loading="lazy"></div>';
      hasPh = true;
      return '<div class="brand"><span class="brand-ph">' + m.name + '<small>Logo pendiente</small></span></div>';
    };
    var set = NB.marcas.map(item).join("");
    // Se duplica para un bucle continuo sin saltos
    track.innerHTML = set + set.replace(/<div class="brand">/g, '<div class="brand" aria-hidden="true">');
    if (hasPh) { var t = $("#marcas-tbd"); if (t) t.hidden = false; }
  })();

  /* ---------------------------------------------------------------- Split de titulares por palabras */
  $$("[data-split]").forEach(function (el) {
    var i = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "w";
            var s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
            w.appendChild(s); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR") { walk(n); }
      });
    };
    walk(el);
  });

  /* ---------------------------------------------------------------- Reveals */
  var revealTargets = $$("[data-reveal], [data-split], [data-img], .tray-item");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    revealTargets.forEach(function (el) { io.observe(el); });
    // Tarjetas generadas dinámicamente
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------------------------------------------------------- Contadores */
  (function () {
    var els = $$("[data-count]");
    if (reduce || !("IntersectionObserver" in window)) return;
    var run = function (el) {
      var to = parseFloat(el.getAttribute("data-count"));
      var from = parseFloat(el.getAttribute("data-from") || 0);
      var dur = to > 100 ? 1800 : 1100;
      var t0 = null;
      var step = function (t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(from + (to - from) * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { el.textContent = el.getAttribute("data-from") || "0"; cio.observe(el); });
  })();

  /* ---------------------------------------------------------------- Cambio de tema por sección */
  (function () {
    var sections = $$("[data-theme-section]");
    if (!sections.length) return;
    var current = body.getAttribute("data-theme");
    var check = function () {
      var mid = window.innerHeight * 0.5;
      for (var i = sections.length - 1; i >= 0; i--) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          var t = sections[i].getAttribute("data-theme-section");
          if (t !== current) { current = t; body.setAttribute("data-theme", t); }
          return;
        }
      }
    };
    onScroll(check);
    check();
  })();

  /* ---------------------------------------------------------------- Nav: sólida, oculta al bajar, enlace activo */
  (function () {
    var nav = $("#nav");
    var mcta = $("#mcta");
    var hero = $("#inicio");
    var last = 0;
    var links = $$(".nav-links a[href^='#']");
    var targets = links.map(function (a) { return $(a.getAttribute("href")); });
    onScroll(function (y) {
      var heroH = hero ? hero.offsetHeight : 600;
      nav.classList.toggle("is-solid", y > 40);
      var goingDown = y > last && y > heroH * 0.6;
      nav.classList.toggle("is-hidden", goingDown && !body.classList.contains("menu-open"));
      last = y;
      if (mcta) {
        var nearEnd = (window.innerHeight + y) > (document.documentElement.scrollHeight - 700);
        mcta.classList.toggle("is-on", y > heroH * 0.7 && !nearEnd);
      }
      var mid = window.innerHeight * 0.4, active = -1;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top < mid) active = i; });
      links.forEach(function (a, i) { a.classList.toggle("is-active", i === active); });
    });
  })();

  /* ---------------------------------------------------------------- Menú móvil */
  (function () {
    var btn = $("#burger"), menu = $("#menu");
    if (!btn || !menu) return;
    var toggle = function (open) {
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", !open);
      if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    };
    btn.addEventListener("click", function () { toggle(!body.classList.contains("menu-open")); });
    $$("[data-close]", menu).forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  })();

  /* ---------------------------------------------------------------- Scroll horizontal (experiencia + trayectoria) */
  var hsList = $$("[data-hs]").map(function (sec) {
    return { sec: sec, sticky: $(".hs-sticky", sec), track: $(".hs-track", sec), bar: $(".hs-progress", sec), dist: 0 };
  });
  function layoutHS() {
    hsList.forEach(function (h) {
      var pin = isDesktop() && !reduce;
      h.sec.classList.toggle("is-pinned", pin);
      if (!pin) { h.sec.style.height = ""; h.track.style.transform = ""; return; }
      h.dist = Math.max(0, h.track.scrollWidth - window.innerWidth);
      h.sec.style.height = (window.innerHeight + h.dist) + "px";
    });
  }
  function updateHS() {
    hsList.forEach(function (h) {
      if (!h.sec.classList.contains("is-pinned")) return;
      var r = h.sec.getBoundingClientRect();
      var total = h.sec.offsetHeight - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      h.track.style.transform = "translate3d(" + (-p * h.dist) + "px,0,0)";
      if (h.bar) h.bar.style.setProperty("--p", p.toFixed(4));
      // Los hitos se marcan cuando entran en pantalla horizontalmente
      $$(".tray-item", h.sec).forEach(function (it) {
        if (it.getBoundingClientRect().left < window.innerWidth * 0.8) it.classList.add("is-in");
      });
    });
  }

  /* ---------------------------------------------------------------- Parallax suave (solo escritorio) */
  var parallax = $$("[data-parallax]");
  function updateParallax() {
    if (reduce || !isDesktop()) return;
    var vh = window.innerHeight;
    parallax.forEach(function (el) {
      var r = el.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var k = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      var off = (r.top + r.height / 2 - vh / 2) * -k;
      el.style.translate = "0 " + off.toFixed(1) + "px";
    });
  }

  /* ---------------------------------------------------------------- Espacio: la imagen se abre al hacer scroll */
  var esp = $("[data-espacio]");
  function updateEspacio() {
    if (!esp || reduce) return;
    var frame = $(".espacio-frame", esp);
    var r = esp.getBoundingClientRect();
    var total = esp.offsetHeight - window.innerHeight;
    var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    var e = 1 - Math.pow(1 - Math.min(1, p * 1.25), 3);
    var startX = isDesktop() ? 32 : 14, startY = isDesktop() ? 22 : 24;
    frame.style.setProperty("--ex", (startX * (1 - e)).toFixed(2) + "%");
    frame.style.setProperty("--ey", (startY * (1 - e)).toFixed(2) + "%");
    frame.style.setProperty("--es", (1.25 - 0.25 * e).toFixed(3));
  }

  /* ---------------------------------------------------------------- Técnica: imagen fija que cambia */
  (function () {
    var items = $$(".tec-item");
    var imgs = $$(".tec-visual img");
    var n = $("#tec-n");
    if (!items.length || !imgs.length) return;
    var set = function (i) {
      items.forEach(function (it, k) { it.classList.toggle("is-active", k === i); });
      imgs.forEach(function (im, k) { im.classList.toggle("is-active", k === i); });
      if (n) n.textContent = ("0" + (i + 1)).slice(-2);
    };
    onScroll(function () {
      if (!isDesktop()) return;
      var mid = window.innerHeight * 0.5, idx = 0;
      items.forEach(function (it, k) { if (it.getBoundingClientRect().top < mid) idx = k; });
      set(idx);
    });
    items.forEach(function (it, k) { it.addEventListener("mouseenter", function () { if (isDesktop()) set(k); }); });
  })();

  /* ---------------------------------------------------------------- Vídeos: solo se reproducen en pantalla */
  (function () {
    var vids = $$("video[data-autoplay]");
    if (reduce || !("IntersectionObserver" in window)) return;
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (v.preload === "none") { v.preload = "auto"; v.load(); } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.15 });
    vids.forEach(function (v) { vio.observe(v); });
  })();

  /* ---------------------------------------------------------------- Lightbox de trabajos */
  (function () {
    var works = $$("#works .work");
    var lb = $("#lb");
    if (!works.length || !lb) return;
    var img = $("img", lb), count = $(".lb-count", lb), idx = 0;
    var show = function (i) {
      idx = (i + works.length) % works.length;
      var src = $("img", works[idx]);
      img.src = src.getAttribute("data-full") || src.src;
      img.alt = src.alt;
      count.textContent = ("0" + (idx + 1)).slice(-2) + " / " + ("0" + works.length).slice(-2);
    };
    var open = function (i) { show(i); lb.hidden = false; requestAnimationFrame(function () { lb.classList.add("is-open"); }); if (window.__lenis) window.__lenis.stop(); $("[data-lb-close]", lb).focus(); };
    var close = function () { lb.classList.remove("is-open"); if (window.__lenis) window.__lenis.start(); setTimeout(function () { lb.hidden = true; }, 500); works[idx].focus(); };
    works.forEach(function (w, i) {
      w.addEventListener("click", function () { open(i); });
      w.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
    });
    $("[data-lb-close]", lb).addEventListener("click", close);
    $("[data-lb-prev]", lb).addEventListener("click", function () { show(idx - 1); });
    $("[data-lb-next]", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  })();

  /* ---------------------------------------------------------------- Consentimiento de cookies */
  (function () {
    var box = $("#cookie");
    if (!box) return;
    var KEY = "nb_consent";
    var save = function (analytics, marketing) {
      store.set(KEY, JSON.stringify({ necessary: true, analytics: !!analytics, marketing: !!marketing, date: new Date().toISOString(), v: 1 }));
      box.classList.remove("is-on");
      setTimeout(function () { box.hidden = true; box.classList.remove("show-prefs"); }, 800);
      document.dispatchEvent(new CustomEvent("nb:consent", { detail: { analytics: !!analytics, marketing: !!marketing } }));
    };
    var openBox = function (prefs) {
      var saved = null; try { saved = JSON.parse(store.get(KEY)); } catch (e) {}
      $$("[data-consent]", box).forEach(function (c) { c.checked = !!(saved && saved[c.getAttribute("data-consent")]); });
      box.hidden = false;
      box.classList.toggle("show-prefs", !!prefs);
      requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("is-on"); }); });
    };
    $("[data-consent-accept]", box).addEventListener("click", function () {
      if (box.classList.contains("show-prefs")) {
        save($("[data-consent='analytics']", box).checked, $("[data-consent='marketing']", box).checked);
      } else save(true, true);
    });
    $("[data-consent-reject]", box).addEventListener("click", function () { save(false, false); });
    $("[data-consent-config]", box).addEventListener("click", function () {
      box.classList.toggle("show-prefs");
      this.textContent = box.classList.contains("show-prefs") ? "Ocultar" : "Configurar";
      $("[data-consent-accept]", box).textContent = box.classList.contains("show-prefs") ? "Guardar" : "Aceptar";
    });
    $$("[data-cookie-settings]").forEach(function (b) { b.addEventListener("click", function () { openBox(true); $("[data-consent-accept]", box).textContent = "Guardar"; $("[data-consent-config]", box).textContent = "Ocultar"; }); });
    if (!store.get(KEY)) setTimeout(function () { openBox(false); }, 1600);
  })();

  /* ---------------------------------------------------------------- Scroll loop compartido */
  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    for (var i = 0; i < subs.length; i++) subs[i](y);
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  onScroll(updateHS);
  onScroll(updateParallax);
  onScroll(updateEspacio);
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", function () { layoutHS(); requestFrame(); });
  window.addEventListener("load", function () { layoutHS(); requestFrame(); });
  layoutHS();
  requestFrame();

  /* ---------------------------------------------------------------- Smooth scroll (Lenis, si está disponible) */
  function initLenis() {
    if (reduce || typeof window.Lenis !== "function" || window.__lenis) return;
    var lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    window.__lenis = lenis;
    lenis.on("scroll", requestFrame);
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (body.classList.contains("gate-active")) {
      lenis.stop();
      var mo = new MutationObserver(function () { if (!body.classList.contains("gate-active")) { lenis.start(); mo.disconnect(); } });
      mo.observe(body, { attributes: true, attributeFilter: ["class"] });
    }
  }
  // Anclas internas con desplazamiento suave
  $$("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = $(id);
      if (!t) return;
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(t, { offset: 0, duration: 1.4 });
      else t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });
  if (window.Lenis) initLenis(); else window.addEventListener("load", initLenis);
})();
