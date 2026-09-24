/* =====================================================================
   RWP v17 — PERILAKU TATA LETAK MAJALAH
   Main menu (dropdown + mega links konten), akordeon nav mobile, bilah
   berbagi media sosial, tombol cetak, dan scrollspy daftar isi sidebar.
   Berkas terpisah, dimuat SETELAH js/main.js. Setiap blok dijaga agar
   aman bila elemennya tidak ada di halaman tertentu.
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* ---------- util ---------- */
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); }
  var isTouch = function () {
    try { return window.matchMedia("(hover: none)").matches; } catch (e) { return false; }
  };

  /* =====================================================================
     1. MAIN MENU — dropdown & mega links konten
     ===================================================================== */
  var menuItems = qsa(".nav-mag .menu-item");
  var megaWrap = doc.querySelector("[data-mega]");
  var megaCloseTimer = null;

  function panelKeys() {
    if (!megaWrap) return [];
    return qsa(".mega-panel", megaWrap).map(function (p) { return p.getAttribute("data-mega-panel"); });
  }

  function showPanel(key) {
    if (!megaWrap) return;
    var keys = panelKeys();
    if (!keys.length) return;
    if (key !== null && key !== undefined && keys.indexOf(key) === -1) key = keys[0];
    if (key === null || key === undefined) {
      var active = megaWrap.querySelector(".mega-tab.active");
      key = active ? active.getAttribute("data-mega-target") : keys[0];
      if (keys.indexOf(key) === -1) key = keys[0];
    }
    qsa(".mega-panel", megaWrap).forEach(function (p) {
      p.classList.toggle("open", p.getAttribute("data-mega-panel") === key);
    });
    qsa(".mega-tab", megaWrap).forEach(function (t) {
      var isCur = t.getAttribute("data-mega-target") === key;
      t.classList.toggle("active", isCur);
      t.setAttribute("aria-selected", isCur ? "true" : "false");
    });
  }

  function openMega(item) {
    if (!megaWrap) return;
    if (megaCloseTimer) { window.clearTimeout(megaCloseTimer); megaCloseTimer = null; }
    menuItems.forEach(function (it) {
      var on_ = it === item;
      it.classList.toggle("open", on_);
      var lk = it.querySelector("a.menu-link");
      if (lk && it.classList.contains("has-mega")) lk.setAttribute("aria-expanded", on_ ? "true" : "false");
    });
    // Kunci panel diambil dari item; bila tidak ada di <div class="menu-item">,
    // jatuh ke <a class="menu-link"> yang memang memuat data-mega-panel.
    // Tanpa fallback ini, hover pada item mana pun hanya menampilkan tab yang
    // sedang aktif, sehingga panel item itu sendiri tidak pernah terbuka.
    var lk0 = item ? item.querySelector("a.menu-link") : null;
    var key = item ? (item.getAttribute("data-mega-panel") ||
      (lk0 && lk0.getAttribute("data-mega-panel"))) : null;
    showPanel(key);
    megaWrap.classList.add("open");
  }

  function openDrop(item) {
    menuItems.forEach(function (it) { it.classList.toggle("open", it === item); });
    var lk = item.querySelector("a.menu-link");
    if (lk) lk.setAttribute("aria-expanded", "true");
  }

  function closeAllMenus() {
    if (megaCloseTimer) { window.clearTimeout(megaCloseTimer); megaCloseTimer = null; }
    menuItems.forEach(function (it) {
      it.classList.remove("open");
      var lk = it.querySelector("a.menu-link");
      if (lk && it.classList.contains("has-mega")) lk.setAttribute("aria-expanded", "false");
    });
    if (megaWrap) megaWrap.classList.remove("open");
  }

  function scheduleClose(delay) {
    if (megaCloseTimer) window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(function () {
      megaCloseTimer = null;
      if (!isTouch()) closeAllMenus();
    }, delay || 220);
  }

  menuItems.forEach(function (item) {
    var link = item.querySelector("a.menu-link");
    var isMega = item.classList.contains("has-mega");
    var hasDrop = item.classList.contains("has-drop");

    on(link, "click", function (e) {
      if (isMega) {
        e.preventDefault();
        if (item.classList.contains("open")) { closeAllMenus(); } else { openMega(item); }
        return;
      }
      if (hasDrop) {
        if (isTouch()) {
          // perangkat sentuh: klik pertama membuka daftar, klik kedua menutup
          if (!item.classList.contains("open")) { e.preventDefault(); openDrop(item); return; }
          e.preventDefault();
          closeAllMenus();
          return;
        }
        // desktop: menu dibuka lewat hover, jadi klik pada tautan induk
        // dibiarkan berjalan sebagai navigasi biasa (tanpa preventDefault)
        return;
      }
      closeAllMenus();
    });

    on(link, "keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isMega) openMega(item); else { openDrop(item); }
      }
      if (e.key === "Escape") closeAllMenus();
    });

    if (!isTouch()) {
      on(item, "mouseenter", function () {
        if (isMega) openMega(item); else { if (hasDrop) openDrop(item); }
      });
      on(item, "mouseleave", function () { scheduleClose(200); });
    }
  });

  if (megaWrap) {
    on(megaWrap, "mouseenter", function () {
      if (megaCloseTimer) { window.clearTimeout(megaCloseTimer); megaCloseTimer = null; }
    });
    on(megaWrap, "mouseleave", function () { scheduleClose(200); });
  }

  /* Tab di dalam mega panel */
  qsa("[data-mega] .mega-tab").forEach(function (tab) {
    on(tab, "click", function () { showPanel(tab.getAttribute("data-mega-target")); });
    on(tab, "keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var all = qsa("[data-mega] .mega-tab");
        var i = all.indexOf(tab);
        var next = all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length];
        if (next) { next.focus(); showPanel(next.getAttribute("data-mega-target")); }
      }
    });
  });

  on(doc, "click", function (e) {
    // Klik di dalam header (termasuk panel mega) TIDAK menutup menu — kalau tidak,
    // handler global ini ikut menutup panel tepat setelah perubahan tampilan.
    if (e.target.closest && e.target.closest(".site-header")) return;
    closeAllMenus();
  });
  on(doc, "keydown", function (e) { if (e.key === "Escape") closeAllMenus(); });

  var navRoot = doc.querySelector(".nav-mag");
  on(navRoot, "focusout", function (e) {
    // panel mega kini berada di dalam .site-header (saudara navRoot), jadi
    // periksa keduanya agar klik di panel tidak menutup menu.
    if (!navRoot.contains(e.relatedTarget) && !(megaWrap && megaWrap.contains(e.relatedTarget))) closeAllMenus();
  });

  /* =====================================================================
     2. MOBILE NAV — akordeon grup
     ===================================================================== */
  qsa(".mobile-nav .mn-group").forEach(function (grp) {
    var btn = grp.querySelector("button");
    on(btn, "click", function () {
      var open = !grp.classList.contains("open");
      grp.classList.toggle("open", open);
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* =====================================================================
     3. BILAH BERBAGI MEDIA SOSIAL + CETAK
     ===================================================================== */
  function pageUrl() { return window.location.href.split("#")[0]; }
  function pageTitle() {
    var t = doc.title || "";
    t = t.split(/\s[|\u2014-]\s/)[0].trim();
    return t || doc.title || "Ruang West Papua (RWP)";
  }

  var shareMap = {
    wa: function () { return "https://wa.me/?text=" + encodeURIComponent(pageTitle() + " \u2014 " + pageUrl()); },
    fb: function () { return "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl()); },
    tw: function () { return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(pageTitle()) + "&url=" + encodeURIComponent(pageUrl()); },
    tg: function () { return "https://t.me/share/url?url=" + encodeURIComponent(pageUrl()) + "&text=" + encodeURIComponent(pageTitle()); },
    li: function () { return "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(pageUrl()); }
  };

  qsa("[data-share]").forEach(function (btn) {
    on(btn, "click", function (e) {
      var kind = btn.getAttribute("data-share");
      if (kind === "print") { e.preventDefault(); window.print(); return; }
      if (kind === "print-section" || kind === "print-related") {
        e.preventDefault();
        root.setAttribute("data-printmode", kind === "print-section" ? "main" : "related");
        var donePrint = function () { clearPrintMode(); window.removeEventListener("afterprint", donePrint); };
        window.addEventListener("afterprint", donePrint);
        window.print();
        window.setTimeout(clearPrintMode, 2500);
        return;
      }
      if (kind === "copy") {
        e.preventDefault();
        var url = pageUrl();
        var label = btn.querySelector(".sb-txt");
        var done = function () {
          btn.classList.add("copied");
          if (label) label.textContent = "Tautan tersalin!";
          window.setTimeout(function () {
            btn.classList.remove("copied");
            if (label) label.textContent = "Salin tautan";
          }, 1800);
        };
        var fallback = function () {
          try {
            var ta = doc.createElement("textarea");
            ta.value = url; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
            doc.body.appendChild(ta); ta.select();
            var ok = doc.execCommand("copy");
            doc.body.removeChild(ta);
            if (ok !== false) done();
          } catch (err) { /* diamkan */ }
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, fallback);
        } else fallback();
        return;
      }
      var maker = shareMap[kind];
      if (!maker) return;
      e.preventDefault();
      window.open(maker(), "_blank", "noopener,noreferrer,width=680,height=720");
    });
  });

  qsa("[data-print]").forEach(function (btn) {
    on(btn, "click", function (e) { e.preventDefault(); window.print(); });
  });

  /* =====================================================================
     4. SCROLLSPY DAFTAR ISI SIDEBAR
     ===================================================================== */
  var tocSide = doc.querySelector("[data-side-toc]");
  if (tocSide) {
    var tocLinks = qsa("a[href^='#']", tocSide);
    var tocTargets = tocLinks.map(function (a) {
      var el = doc.getElementById(a.getAttribute("href").slice(1));
      return el ? { link: a, el: el } : null;
    }).filter(Boolean);

    if (tocTargets.length) {
      var ticking = false;
      var syncToc = function () {
        ticking = false;
        // posisi relatif terhadap dokumen: offsetTop saja tidak cukup karena
        // bagian bersarang di dalam .mag-main (bukan anak langsung body).
        var y = (window.scrollY || root.scrollTop) + 160;
        var current = null;
        tocTargets.forEach(function (t) { if (t.el.getBoundingClientRect().top + (window.scrollY || root.scrollTop) <= y) current = t; });
        tocLinks.forEach(function (a) { a.classList.remove("cur"); });
        if (current) {
          current.link.classList.add("cur");
          // tandai bagian aktif pada sidebar (dipakai juga oleh pengujian)
          var curId = (current.link.getAttribute("href") || "").replace("#", "");
          tocSide.setAttribute("data-cur", curId);
          var sideBox = tocSide.closest(".mag-side");
          if (sideBox) sideBox.setAttribute("data-cur", curId);
          var box = tocSide.querySelector("ol");
          if (box && box.scrollHeight > box.clientHeight + 4) {
            var lt = current.link.offsetTop, lh = current.link.offsetHeight;
            var top = box.scrollTop, h = box.clientHeight;
            if (lt < top) box.scrollTop = lt - 8;
            else if (lt + lh > top + h) box.scrollTop = lt + lh - h + 8;
          }
        }
      };
      on(window, "scroll", function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(syncToc); }
      }, { passive: true });
      syncToc();
    }
  }

  /* =====================================================================
     5. WIDGET MAJALAH — tab "Teratas / Terkini" bila dipakai
     ===================================================================== */
  qsa("[data-mw-tab]").forEach(function (tab) {
    on(tab, "click", function () {
      var wrap = tab.closest("[data-mw-tabs]");
      if (!wrap) return;
      var target = tab.getAttribute("data-mw-tab");
      qsa("[data-mw-tab]", wrap).forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      qsa("[data-mw-panel]", wrap).forEach(function (p) {
        p.hidden = p.getAttribute("data-mw-panel") !== target;
      });
    });
  });

  /* =====================================================================
     6. ARTIKEL TERKAIT (v18)
     Kartu dibangun dari penanda [data-rel-item] sehingga blok HTML di
     dalam halaman tetap menjadi cadangan statis yang bisa dipakai bila
     JavaScript dimatikan. Menambah satu <a data-rel-item> = satu kartu.
     ===================================================================== */
  qsa("[data-rel]").forEach(function (sec) {
    var grid = sec.querySelector("[data-rel-grid]");
    var items = qsa("[data-rel-item]", sec);
    if (!grid || !items.length) return;

    function txt(el, sel) {
      var n = el.querySelector(sel);
      return n ? (n.textContent || "").replace(/\s+/g, " ").trim() : "";
    }

    var cards = items.map(function (el) {
      var href = el.getAttribute("data-href") || "";
      var cat = txt(el, ".rel-badge");
      var title = txt(el, "h3");
      var desc = txt(el, "p");
      var meta = txt(el, ".rel-meta-txt");
      if (!href || !title) return null;

      var card = doc.createElement("a");
      card.className = "rel-card";
      card.href = href;

      if (cat) {
        var badge = doc.createElement("span");
        badge.className = "rel-badge";
        badge.textContent = cat;
        card.appendChild(badge);
      }
      var h3 = doc.createElement("h3");
      h3.textContent = title;
      card.appendChild(h3);
      if (desc) {
        var p = doc.createElement("p");
        p.textContent = desc;
        card.appendChild(p);
      }
      var m = doc.createElement("span");
      m.className = "rel-meta";
      var ms = doc.createElement("span");
      ms.className = "rel-meta-txt";
      ms.textContent = meta;
      var ar = doc.createElement("span");
      ar.className = "rel-arrow";
      ar.setAttribute("aria-hidden", "true");
      ar.textContent = "\u2192";
      m.appendChild(ms);
      m.appendChild(ar);
      card.appendChild(m);
      return card;
    }).filter(Boolean);

    if (!cards.length) return;
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    cards.forEach(function (c) { grid.appendChild(c); });
    sec.setAttribute("data-rel-count", String(cards.length));
  });

  /* ---------- cetak selektif: seluruh artikel / artikel ini / terkait ---------- */
  function clearPrintMode() { root.removeAttribute("data-printmode"); }

  /* ---------- bersihkan menu saat mencetak ---------- */
  on(window, "beforeprint", function () { closeAllMenus(); });
  on(window, "afterprint", clearPrintMode);

  /* ---------- ekspos kecil untuk pengujian ---------- */
  window.RWPMag = {
    pageUrl: pageUrl,
    pageTitle: pageTitle,
    closeMenus: closeAllMenus,
    showPanel: showPanel
  };
})();

/* =====================================================================
   RWP v24 — FILTER GLOSARIUM (glosarium.html)
   Menyaring entri langsung saat mengetik. Progresif: tanpa JavaScript,
   tidak ada satu pun entri yang disembunyikan di HTML — seluruh 94
   istilah tetap tampil lengkap dan dapat dibaca.
   Berjalan sendiri (guard: berhenti bila #glosInput tidak ada).
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var input = doc.getElementById("glosInput");
  if (!input) return;

  var items = Array.prototype.slice.call(doc.querySelectorAll("[data-glos-item]"));
  if (!items.length) return;

  var secs = Array.prototype.slice.call(doc.querySelectorAll("[data-glos-sec]"));
  var chips = Array.prototype.slice.call(doc.querySelectorAll(".glos-chip"));
  var out = doc.getElementById("glosCount");
  var reset = doc.getElementById("glosReset");
  var box = doc.getElementById("glosFilter");
  var total = items.length;
  var cat = "all";

  /* indeks teks sekali saja (data-glos dari server; cadangan: textContent) */
  items.forEach(function (el) {
    var d = el.getAttribute("data-glos");
    if (!d) d = el.textContent || "";
    el.__q = d.toLowerCase();
  });

  function render() {
    var q = (input.value || "").trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var ok = (cat === "all" || el.getAttribute("data-cat") === cat) &&
               (!q || el.__q.indexOf(q) !== -1);
      if (ok) { el.removeAttribute("hidden"); shown++; }
      else { el.setAttribute("hidden", ""); }
    });
    secs.forEach(function (sec) {
      var any = sec.querySelector("[data-glos-item]:not([hidden])");
      if (any) sec.removeAttribute("hidden");
      else sec.setAttribute("hidden", "");
    });
    if (out) {
      out.innerHTML = shown
        ? "Menampilkan <b>" + shown + "</b> dari " + total + " istilah" +
          (cat === "all" ? "" : " &middot; kategori " + cat)
        : "Tidak ada istilah yang cocok dengan <b>\u201c" + (input.value || "").replace(/[<>&]/g, "") + "\u201d</b> — coba kata kunci lain (mis. <i>sentralisme</i>, <i>front</i>, <i>nilai lebih</i>) atau tekan <b>Tampilkan semua</b>.";
    }
    if (box) box.setAttribute("data-glos-shown", String(shown));
    chips.forEach(function (c) {
      var on = c.getAttribute("data-glos-cat") === cat;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  chips.forEach(function (c) {
    c.setAttribute("aria-pressed", "false");
    c.addEventListener("click", function () {
      cat = c.getAttribute("data-glos-cat") || "all";
      render();
    });
  });

  input.addEventListener("input", render);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; cat = "all"; render(); }
  });
  if (reset) reset.addEventListener("click", function () {
    input.value = ""; cat = "all"; render(); input.focus();
  });

  render();

  /* ekspos kecil untuk pengujian */
  window.RWPGlos = {
    count: function () { return doc.querySelectorAll("[data-glos-item]:not([hidden])").length; },
    total: total,
    render: render
  };
})();

/* =====================================================================
   v25 — SIDEBAR TAB AREA (zona tata letak, ref2)
   Menyorot tab yang sesuai dengan posisi gulir, dan mengizinkan navigasi
   papan tuts (panah / Home / End). Tanpa JavaScript seluruh tab tetap
   tampil dan tetap berfungsi sebagai tautan biasa (tanpa sorotan).
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var box = doc.querySelector("[data-stab]");
  if (!box) return;

  var tabs = Array.prototype.slice.call(box.querySelectorAll("a[data-stab-link]"));
  if (!tabs.length) return;

  var targets = tabs.map(function (a) {
    var id = (a.getAttribute("href") || "").replace(/^#/, "");
    return { a: a, el: id ? doc.getElementById(id) : null };
  }).filter(function (t) { return !!t.el; });

  function setActive(t) {
    tabs.forEach(function (a) {
      var on = a === t.a;
      a.classList.toggle("active", on);
      if (on) { a.setAttribute("aria-current", "true"); } else { a.removeAttribute("aria-current"); }
    });
  }

  var ticking = false;
  function update() {
    ticking = false;
    var y = window.pageYOffset + 150;
    var cur = null;
    targets.forEach(function (t) { if (t.el.offsetTop <= y) cur = t; });
    if (!cur) cur = targets[0];
    setActive(cur);
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* papan tuts: panah kiri/kanan, Home, End di antara tab */
  box.addEventListener("keydown", function (e) {
    var i = tabs.indexOf(doc.activeElement);
    if (i === -1) return;
    var to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { to = tabs[(i + 1) % tabs.length]; }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { to = tabs[(i - 1 + tabs.length) % tabs.length]; }
    else if (e.key === "Home") { to = tabs[0]; }
    else if (e.key === "End") { to = tabs[tabs.length - 1]; }
    if (to) { e.preventDefault(); to.focus(); }
  });

  box.setAttribute("data-stab-ready", "true");

  window.RWPStab = {
    count: tabs.length,
    active: function () {
      var a = box.querySelector("a.active");
      return a ? a.getAttribute("href") : null;
    }
  };
})();


/* =====================================================================
   v26 · PANEL TATA LETAK — penanda zona + offset anchor
   Tautan panel "Tata Letak" (#zona-*) digulir dengan offset header sticky,
   lalu zona yang dituju diberi penanda singkat. Tanpa JavaScript, tautan
   tetap berfungsi sebagai anchor biasa (plus scroll-margin-top di CSS).
   ===================================================================== */
(function () {
  "use strict";
  var doc = document;
  var reduce = function () {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  };
  var ZONE_SEL = "#zona-mega-links,#zona-top-featured,#zona-magazine-widgets,#zona-sidebar," +
    "#zona-sidebar-tab,#zona-sidebar-widgets,#zona-footer,#zona-author";

  function scrollToZone(el) {
    // Zona di dalam wadah bergulir (sidebar berbatas tinggi) digulir dulu.
    // scrollTop WAJIB 0 — wadah yang di-scroll membuat zona muncul di bawah
    // puncaknya, sedangkan header sticky menutupi bagian atasnya:
    // setTimeout(() => $(zona).scrollIntoView()) gagal justru karena ini.
    var sc = el.parentElement;
    while (sc && sc !== doc.documentElement && sc !== doc.body) {
      var st = window.getComputedStyle(sc);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && sc.scrollHeight > sc.clientHeight + 4) {
        sc.scrollTop = 0; break;
      }
      sc = sc.parentElement;
    }
    // Offset di bawah ambang sorotan blok v27 (120px) supaya zona yang
    // dituju langsung tersorot begitu halaman berhenti menggulir.
    var off = window.innerWidth <= 680 ? 80 : 96;
    var target = function () {
      var r = el.getBoundingClientRect().top + window.pageYOffset - off;
      return r < 0 ? 0 : r;
    };
    // Lompatan zona memakai gulir INSTAN (behavior:"auto"), bukan halus.
    // Pada halaman yang sangat panjang (≈29.000px) gulir halus lebih lambat
    // daripada pengisian iklan/gambar yang menggeser tata letak di tengah
    // jalan, sehingga posisi akhirnya meleset dan tidak dapat diprediksi.
    // Gulir instan + koreksi di bawah selalu mendarat tepat pada zona.
    window.scrollTo({ top: target(), behavior: "auto" });
    // Koreksi setelah tata letak tenang (gambar / unit iklan dapat menggeser
    // posisi setelah lompatan).
    var idle = 0, last = -1, rounds = 0;
    (function check() {
      var y = Math.round(window.pageYOffset);
      if (y === last) { idle++; } else { idle = 0; last = y; }
      if (idle >= 1) {
        if (Math.abs(Math.round(el.getBoundingClientRect().top - off)) <= 2 || rounds++ >= 4) return;
        window.scrollTo({ top: target(), behavior: "auto" });
        idle = 0; last = -1;
      }
      window.setTimeout(check, 160);
    })();
  }

  function ping(el) {
    if (reduce()) return;
    el.classList.remove("rwp-zone-ping");
    // paksa reflow agar animasi dapat dipicu ulang pada klik berturut-turut
    void el.offsetWidth;
    el.classList.add("rwp-zone-ping");
    window.setTimeout(function () { el.classList.remove("rwp-zone-ping"); }, 1400);
  }

  doc.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="#zona-"]') : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var hash = href.slice(href.indexOf("#"));
    var el = hash.length > 1 ? doc.getElementById(hash.slice(1)) : null;
    // Hanya tangani bila anchor zona BENAR-BENAR ada di halaman ini.
    // Ini juga mencakup bentuk lintas-halaman ("analisa-papua.html#zona-...")
    // ketika pengunjung sudah berada di halaman tersebut — tanpa ini, klik
    // akan memicu muat ulang penuh dan kehilangan offset header sticky.
    if (!el) return;
    e.preventDefault();
    scrollToZone(el);
    ping(el);
  }, false);

  // Bila halaman dibuka langsung dengan hash #zona-*, beri offset yang sama.
  function onLoadHash() {
    var h = window.location.hash;
    if (!h || h.indexOf("#zona-") !== 0) return;
    var el = doc.querySelector(h);
    if (el) window.setTimeout(function () { scrollToZone(el); }, 60);
  }
  if (doc.readyState === "complete" || doc.readyState === "interactive") onLoadHash();
  else doc.addEventListener("DOMContentLoaded", onLoadHash);

  window.RWPZones = {
    selector: ZONE_SEL,
    count: function () { return doc.querySelectorAll(ZONE_SEL).length; },
    scrollTo: function (id) {
      var el = doc.getElementById(id);
      if (!el) return false;
      scrollToZone(el); ping(el); return true;
    }
  };
})();


/* =====================================================================
   v27 · RAIL ZONA 4a — SOROTAN + GULIR OTOMATIS
   Tautan zona yang sedang aktif (#zona-*) di dalam rail kiri digulir
   otomatis ke area terlihat rail. Tiga rambu penting:
     1. Yang digulir adalah WADAH RAIL (scrollTop), bukan halaman — posisi
        gulir halaman tidak pernah tersentuh.
     2. Gulir hanya dipicu saat zona aktif BENAR-BENAR BERPINDAH, sehingga
        tidak ada gulir berulang saat pengunjung menggulir manual.
     3. Bila pengunjung sedang menggulir rail sendiri (gestur <300 ms),
        rail tidak direbut.
   Bila "kurangi gerakan" aktif, gulir rail instan (tanpa animasi) dan
   sorotan tetap bekerja. Tanpa JavaScript: kartu tetap tampil dan semua
   tautan tetap dapat diklik sebagai anchor biasa.
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var card = doc.querySelector("[data-srail]");
  /* Kartu bertanda data-srail-engine="mz" sengaja diserahkan ke modul v28, yang
     mengukur lewat offsetTop (kebal efek sticky dan wadah bergulir). Modul v27
     mengukur dengan getBoundingClientRect() sehingga pada halaman yang rail
     kiri dan sidebar kanannya sticky, posisi zona saling bertumpuk. */
  if (!card || card.getAttribute("data-srail-engine") === "mz") return;

  var links = Array.prototype.slice.call(card.querySelectorAll("[data-srail-link]"));
  if (!links.length) return;

  var thumb = card.querySelector("[data-srail-thumb]");
  var track = card.querySelector("[data-srail-track]");
  var out = card.querySelector("[data-srail-pos]");

  function reduce() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  }
  function scrollY() { return window.pageYOffset || doc.documentElement.scrollTop || 0; }

  /* Jarak aman dari puncak viewport: header sticky (±64-72px) plus ruang
     napas. Dipakai angka yang SAMA di semua viewport — ambang lama yang
     berbeda-beda (150/160) menyebabkan "keterlambatan" sorotan di layar
     sempit: zona yang puncaknya sudah lewat viewport belum ikut tersorot. */
  function chromeOff() { return 120; }

  /* Wadah gulir TERDEKAT yang memuat elemen zona (bukan sebaliknya). */
  function zoneScroller(el) {
    var node = el.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) return node;
      node = node.parentElement;
    }
    return null;
  }

  /* Zona yang benar-benar ada di halaman ini saja (tautan lintas-halaman
     atau anchor yang hilang otomatis diabaikan). */
  var items = links.map(function (a) {
    var id = (a.getAttribute("href") || "").replace(/^#/, "");
    var el = id ? doc.getElementById(id) : null;
    return el ? { a: a, el: el, id: id, top: 0 } : null;
  }).filter(Boolean);
  if (!items.length) return;

  /* Elemen yang posisinya berubah sendiri saat menempel (sticky) dan karena
     itu menyesatkan pengukuran posisi zona. Diambil dari lompatan tetua
     tiap zona supaya mencakup rail maupun kolom kanan. */
  var stickyNodes = (function () {
    var seen = [], out = [];
    items.forEach(function (t) {
      var n = t.el;   // termasuk elemen anchor sendiri (mis. rail & sidebar yang menempel)
      while (n && n !== doc.body && n !== doc.documentElement) {
        if (window.getComputedStyle(n).position === "sticky" && seen.indexOf(n) === -1) {
          seen.push(n); out.push(n);
        }
        n = n.parentElement || (n.getRootNode && n.getRootNode().host) || null;
      }
    });
    return out;
  })();

  function measure() {
    var y = scrollY(), i;
    /* Elemen position:sticky (rail & kolom kanan) tergeser dari posisi tata
       letaknya saat menempel, dan pergeseran itu IKUT terbaca oleh
       getBoundingClientRect() maupun offsetTop — sehingga posisi terukur
       berubah mengikuti posisi gulir dan ambang sorotan jadi tertinggal
       (terbukti: zona 5 baru tersorot setelah pembaca melewati zona 6).
       Pengukuran karena itu dilakukan dengan sticky dinetralkan sesaat;
       pemulihannya terjadi SEBELUM bingkai dilukis, jadi tak ada kedipan.
       Dengan sticky netral, rect sudah sama dengan posisi alir dokumen —
       termasuk untuk zona yang berada DI DALAM wadah bergulir (Sidebar Tab
       Area di dalam sidebar berbatas tinggi), sebab wadahnya juga ikut
       dikembalikan ke posisi alir. */
    for (i = 0; i < stickyNodes.length; i++) { stickyNodes[i].style.position = "static"; }
    items.forEach(function (t) {
      t.rect = t.el.getBoundingClientRect().top + y;
      t.top = t.rect;
    });
    for (i = 0; i < stickyNodes.length; i++) { stickyNodes[i].style.position = ""; }
  }

  /* Wadah gulir rail (desktop) — null bila rail tidak menggulir (mobile). */
  function railScroller() {
    var node = railEl ? railEl : (card ? card.parentElement : null);
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) return node;
      node = node.parentElement;
    }
    return null;
  }

  var curIdx = -1;
  var railTouchedAt = 0;
  /* Wadah gulir rail tidak selalu induk langsung kartu — pada halaman teori
     kartu Peta Zona bersarang di dalam rail, dan di dalam rail ada daftar isi
     yang memakai position:sticky. Elemen sticky mengukur dirinya pada posisi
     tempelnya (bukan posisi alirnya), jadi bila elemen seperti itu berada di
     ANTARA kartu dan wadah gulir, pengukuran tinggi/geser menjadi ngawur:
     daftar isi diukur setinggi ribuan piksel (± 37.000px) dan zona lain
     (artikel, sidebar, bagian unggulan) ikut tergeser. Menetralkan posisi
     setiap elemen sticky pada jalur kartu menghilangkan efek itu. */
  var stickyChain = (function () {
    var out = [], n = card;
    while (n) {
      if (window.getComputedStyle(n).position === "sticky" && out.indexOf(n) === -1) out.push(n);
      n = n.parentElement || (n.getRootNode && n.getRootNode().host) || null;
    }
    return out;
  })();
  function withStickyOff(fn) {
    var i;
    for (i = 0; i < stickyChain.length; i++) stickyChain[i].style.position = "static";
    var r = fn();
    for (i = 0; i < stickyChain.length; i++) stickyChain[i].style.position = "";
    return r;
  }
  var railEl = railScroller();
  if (railEl) {
    railEl.addEventListener("scroll", function () { railTouchedAt = Date.now(); }, { passive: true });
  }

  function mark(i) {
    items.forEach(function (t, k) {
      var on = k === i;
      t.a.classList.toggle("active", on);
      if (on) t.a.setAttribute("aria-current", "true");
      else t.a.removeAttribute("aria-current");
    });
    if (out) out.textContent = "Zona " + (i + 1) + " dari " + items.length;
    if (thumb && track && items.length > 1) {
      var free = track.clientHeight - thumb.offsetHeight;
      if (free < 0) free = 0;
      var p = i / (items.length - 1);
      thumb.style.transform = "translateY(" + Math.round(free * p) + "px)";
    }
    card.setAttribute("data-srail-cur", items[i].id);
  }

  /* Bawa tautan aktif ke area terlihat SETIAP wadah gulir di atasnya
     (rail desktop). Tidak pernah menyentuh posisi gulir halaman. */
  function ensureVisible(a) {
    if (Date.now() - railTouchedAt < 300) return false;
    var moved = false;
    var node = a.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) {
        var lr = a.getBoundingClientRect(), nr = node.getBoundingClientRect(), pad = 10, delta = 0;
        if (lr.top < nr.top + pad) delta = lr.top - nr.top - pad;
        else if (lr.bottom > nr.bottom - pad) delta = lr.bottom - nr.bottom + pad;
        if (delta) {
          var to = Math.max(0, node.scrollTop + delta);
          if (node.scrollTo) node.scrollTo({ top: to, behavior: reduce() ? "auto" : "smooth" });
          else node.scrollTop = to;
          moved = true;
        }
      }
      node = node.parentElement;
    }
    return moved;
  }

  /* Zona aktif = zona TERDALAM yang puncaknya sudah terlewati garis acuan.
     Daftar diurutkan menurut POSISI DOKUMEN lebih dulu, bukan urutan markup:
     anchor rail pada halaman teori berada DI DALAM rail, sehingga posisinya
     bisa mendahului bagian unggulan/artikel dan membuat zona lain tersorot
     keliru (mis. rail + sidebar sama-sama mulai di y=896 saat menempel).
     Setelah diurutkan, yang menang adalah anchor paling dalam yang sudah
     terlewati — pada halaman lain urutannya sudah menaik, jadi tidak berubah. */
  function pick() {
    var y = scrollY() + chromeOff();
    var ord = items.slice().sort(function (a, b) { return a.top - b.top; });
    var idx = 0, last = -Infinity;
    ord.forEach(function (t) {
      if (t.top <= y && t.top >= last) { last = t.top; idx = items.indexOf(t); }
    });
    return idx;
  }

  var ticking = false;
  function update() {
    ticking = false;
    withStickyOff(function () {
      measure();
      var i = pick();
      if (i === curIdx) return;   // hanya bergulir saat zona benar-benar berpindah
      curIdx = i;
      mark(i);
      ensureVisible(items[i].a);
    });
  }
  function schedule() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  /* IntersectionObserver: pemicu kasar saat zona masuk/keluar viewport;
     gulir tetap ditangani rAF-throttle di bawah agar hemat. */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function () { schedule(); }, { threshold: [0, 0.25, 0.5, 1] });
    items.forEach(function (t) { io.observe(t.el); });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  /* pengaturan sistem berubah tanpa reload → segarkan sorotan & mode gulir */
  try {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.addEventListener) mq.addEventListener("change", schedule);
    else if (mq && mq.addListener) mq.addListener(schedule);
  } catch (e) { /* diamkan */ }

  measure();
  /* Gambar & iklan dapat menggeser posisi zona setelah muat */
  [300, 900, 1800].forEach(function (ms) { window.setTimeout(schedule, ms); });
  update();

  window.RWPRail = {
    count: items.length,
    ids: items.map(function (t) { return t.id; }),
    active: function () { return curIdx >= 0 ? items[curIdx].id : null; },
    card: card,
    railScrollTop: function () { var sc = railScroller(); return sc ? Math.round(sc.scrollTop) : null; },
    railScrollable: function () { return !!railScroller(); },
    railVisible: function (id) {
      var t = items.filter(function (x) { return x.id === id; })[0];
      var sc = railScroller();
      if (!t || !sc) return null;
      var lr = t.a.getBoundingClientRect(), sr = sc.getBoundingClientRect();
      return lr.top >= sr.top - 2 && lr.bottom <= sr.bottom + 2;
    },
    /* posisi tiap zona: top = dalam aliran dokumen (dipakai pemilihan zona),
       rect = posisi layar (dipakai pemeriksaan keterlihatan) */
    tops: function () {
      measure();
      return items.map(function (t) { return { id: t.id, top: Math.round(t.top), rect: Math.round(t.rect) }; });
    },
    refresh: function () { dirty = true; schedule(); }
  };
})();


/* =====================================================================
   v28 · RAIL PETA ZONA (marxisme.html & sosialisme.html)
   Perilaku yang sama dengan blok v27 di halaman analisa-papua.html:
     1. Yang digulir adalah WADAH RAIL (scrollTop), bukan posisi gulir
        halaman — posisi gulir halaman tidak pernah tersentuh.
     2. Gulir rail hanya dipicu saat zona aktif BENAR-BENAR BERPINDAH.
     3. Gestur gulir manual pengunjung di rail dihormati (< 300 ms).
     4. "Kurangi gerakan" → gulir rail instan, denyut mati, sorotan tetap.
     5. Tanpa JavaScript: kartu tetap tampil, tautan tetap anchor biasa.
   Perbedaan dengan v27: blok v27 mengikat SATU kartu dan mengukur dengan
   getBoundingClientRect(), yang pada halaman teori salah karena rail kiri
   DAN sidebar kanan sama-sama sticky (posisinya saling bertumpuk) dan
   keduanya wadah bergulir. Blok ini mengukur lewat offsetTop — posisi tata
   letak, kebal terhadap sticky maupun wadah bergulir — dan mengikat SETIAP
   kartu [data-srail] yang belum ditangani modul lain.

   CATATAN PERFORMA (penting). Versi awal blok ini mengukur posisi "panas"
   dengan window.innerHeight pada tiap pembaruan. Setiap kali tinggi viewport
   masuk ke perhitungan, satu kali pengukuran mengubah pilihan zona → sorotan
   dan penghitung di kepala kartu berubah → tinggi kartu berubah → tata letak
   dokumen 36.000px bergeser → perhitungan berikutnya memilih zona lain lagi.
   Putaran gulir-ukur-tulis itu tidak pernah berhenti dan halaman tampak
   memuat selamanya. Karena itu: tinggi viewport TIDAK PERNAH dipakai di sini,
   kartu tidak mengandung elemen setinggi viewport, dan penulisan DOM hanya
   terjadi saat nilai yang ditulis benar-benar berbeda. */
(function () {
  "use strict";

  var doc = document;
  var cards = Array.prototype.slice.call(doc.querySelectorAll("[data-srail]"))
    .filter(function (c) {
      return !c.hasAttribute("data-srail-ready") && c.getAttribute("data-srail-engine") !== "v27";
    });
  if (!cards.length) return;

  function reduce() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  }
  function scrollY() { return window.pageYOffset || doc.documentElement.scrollTop || 0; }

  /* Wadah gulir TERDEKAT dari sebuah elemen (rail), bila ada. */
  function scrollerOf(node) {
    node = node.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) return node;
      node = node.parentElement;
    }
    return null;
  }

  /* Posisi dokumen lewat offsetTop (posisi tata letak). */
  function docTop(el) {
    var y = 0, n = el, guard = 0;
    while (n && guard++ < 500) { y += n.offsetTop || 0; n = n.offsetParent; }
    return y;
  }

  var groups = [];

  cards.forEach(function (card) {
    var links = Array.prototype.slice.call(card.querySelectorAll("[data-srail-link]"));
    if (!links.length) return;

    var items = links.map(function (a) {
      var id = (a.getAttribute("href") || "").replace(/^#/, "");
      var el = id ? doc.getElementById(id) : null;
      return el ? { a: a, el: el, id: id, top: 0 } : null;
    }).filter(Boolean);
    if (!items.length) return;

    var g = {
      card: card,
      items: items,
      thumb: card.querySelector("[data-srail-thumb]"),
      track: card.querySelector("[data-srail-track]"),
      out: card.querySelector("[data-srail-pos]"),
      cur: -1,
      touchedAt: 0,
      rail: scrollerOf(card)
    };
    if (g.rail) {
      g.rail.addEventListener("scroll", function () { g.touchedAt = Date.now(); }, { passive: true });
    }
    card.setAttribute("data-srail-ready", "1");
    groups.push(g);
  });

  if (!groups.length) return;

  function measure(g) {
    for (var i = 0; i < g.items.length; i++) g.items[i].top = docTop(g.items[i].el);
  }

  function mark(g, i) {
    var k;
    for (k = 0; k < g.items.length; k++) {
      var on = k === i;
      g.items[k].a.classList.toggle("active", on);
      if (on) g.items[k].a.setAttribute("aria-current", "true");
      else g.items[k].a.removeAttribute("aria-current");
    }
    if (g.out) {
      var txt = "Zona " + (i + 1) + " dari " + g.items.length;
      if (g.out.textContent !== txt) g.out.textContent = txt;   // hindari tulis DOM sia-sia
    }
    if (g.thumb && g.track && g.items.length > 1) {
      var free = g.track.clientHeight - g.thumb.offsetHeight;
      if (free < 0) free = 0;
      g.thumb.style.transform = "translateY(" + Math.round(free * (i / (g.items.length - 1))) + "px)";
    }
    var cur = g.items[i].id;
    if (g.card.getAttribute("data-srail-cur") !== cur) g.card.setAttribute("data-srail-cur", cur);
  }

  function ensureVisible(g, a) {
    if (Date.now() - g.touchedAt < 300) return;
    var node = g.card.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) {
        var lr = a.getBoundingClientRect(), nr = node.getBoundingClientRect(), pad = 10, delta = 0;
        if (lr.top < nr.top + pad) delta = lr.top - nr.top - pad;
        else if (lr.bottom > nr.bottom - pad) delta = lr.bottom - nr.bottom + pad;
        if (delta) node.scrollTop = Math.max(0, node.scrollTop + delta);   // instan, tanpa animasi
      }
      node = node.parentElement;
    }
  }

  /* Zona aktif = zona paling bawah yang puncaknya sudah melewati garis acuan
     (96px di desktop, 80px di layar sempit). Kalau halaman belum digulir,
     pilihan dipaksa ke zona pertama supaya nilai awalnya pasti. */
  function pick(g, y) {
    if (y <= 8) return 0;
    var limit = y + 96, best = 0, bestTop = -Infinity;
    for (var i = 0; i < g.items.length; i++) {
      var t = g.items[i].top;
      if (t <= limit && t >= bestTop) { bestTop = t; best = i; }
    }
    return best;
  }

  var ticking = false;
  var lastY = -1;
  var dirty = true;
  function update() {
    ticking = false;
    var y = scrollY();
    if (!dirty && y === lastY) return;
    dirty = false;
    lastY = y;
    for (var gi = 0; gi < groups.length; gi++) {
      var g = groups[gi];
      measure(g);
      var i = pick(g, y);
      if (i === g.cur) continue;
      g.cur = i;
      mark(g, i);
      ensureVisible(g, g.items[i].a);
    }
  }
  function schedule() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  /* Hanya tiga pemicu: gulir halaman, perubahan ukuran, dan halaman selesai
     dimuat. Tidak ada timer berkala, tidak ada IntersectionObserver. */
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", function () { dirty = true; schedule(); });
  window.addEventListener("load", function () { dirty = true; schedule(); });
  try {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.addEventListener) mq.addEventListener("change", function () { dirty = true; schedule(); });
    else if (mq && mq.addListener) mq.addListener(function () { dirty = true; schedule(); });
  } catch (e) { /* diamkan */ }

  update();

  window.RWPRailMZ = {
    cards: groups.length,
    cardIds: groups.map(function (g) { return g.card.id || "(tanpa-id)"; }),
    active: function () {
      var g = groups[0];
      return g && g.cur >= 0 ? g.items[g.cur].id : null;
    },
    info: function () {
      return groups.map(function (g) {
        measure(g);
        return {
          card: g.card.id || "",
          count: g.items.length,
          active: g.cur >= 0 ? g.items[g.cur].id : null,
          railScrollable: !!g.rail,
          railScrollTop: g.rail ? Math.round(g.rail.scrollTop) : null,
          tops: g.items.map(function (t) { return { id: t.id, top: Math.round(t.top) }; })
        };
      });
    },
    visible: function (cardId, zid) {
      var g = groups.filter(function (x) { return x.card.id === cardId; })[0];
      if (!g) return null;
      var t = g.items.filter(function (x) { return x.id === zid; })[0];
      if (!t) return null;
      if (!g.rail) return true;
      var lr = t.a.getBoundingClientRect(), sr = g.rail.getBoundingClientRect();
      return lr.top >= sr.top - 2 && lr.bottom <= sr.bottom + 2;
    },
    reduce: reduce,
    refresh: function () { dirty = true; schedule(); }
  };
})();


/* =====================================================================
   v28b · DAFTAR ISI RAIL MEMILIH ZONA
   Daftar isi kini berada di dalam rail kiri. Tanpa penjaga ini, klik entri
   daftar isi memakai perilaku anchor bawaan: elemen anchor-nya berada DI
   DALAM rail, jadi halaman melompat jauh ke dasar dokumen (klik "1. Dasar-
   Dasar Marxisme" mendarat di ~36.000px, bukan di bab pertama).
   Aturan v28b: pada halaman yang memakai rail zona, klik entri daftar isi
   menggulir halaman ke ZONA yang menaungi bab itu (Artikel Utama, atau
   Artikel Terkait untuk entri terakhir), sekaligus menandai zona itu pada
   rail. href SETIAP entri tidak diubah — membuka di tab baru dan perilaku
   tanpa JavaScript tetap berfungsi; hanya klik di halaman ini yang diubah. */
(function () {
  function go(e) {
    var a = e.target.closest('[data-side-toc] a[href^="#"]');
    if (!a) return;
    var card = document.querySelector('#zona-peta, [data-srail]');
    if (!card) return;
    var want = (a.getAttribute('href') || '').replace('#', '');
    if (!want) return;
    var id = (want === 'terkait') ? 'terkait' : 'zona-artikel';
    var link = card.querySelector('[data-srail-link][href="#' + id + '"]');
    if (!link) return;
    e.preventDefault();
    var el = document.getElementById(id);
    if (el) {
      var top = el.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top: top > 0 ? top : 0, behavior: 'instant' });
    }
    var all = card.querySelectorAll('[data-srail-link]');
    for (var i = 0; i < all.length; i++) {
      all[i].classList.remove('active');
      all[i].removeAttribute('aria-current');
    }
    link.classList.add('active');
    link.setAttribute('aria-current', 'true');
    card.setAttribute('data-srail-cur', id);
    var out = card.querySelector('[data-srail-pos]');
    if (out) out.textContent = 'Bab: ' + String(a.textContent).replace(/^\s*\d+\.\s*/, '').slice(0, 30);
    var list = document.querySelectorAll('[data-side-toc] a');
    for (var k = 0; k < list.length; k++) { list[k].classList.remove('cur'); list[k].removeAttribute('aria-current'); }
    a.classList.add('cur');
    a.setAttribute('aria-current', 'true');
    if (window.RWPRailMZ) window.RWPRailMZ.refresh();
  }
  document.addEventListener('click', go, false);
})();

/* =====================================================================
   v29 · ANOTASI GLOSARIUM — TOOLTIP ISTILAH
   Kata istilah glosarium di dalam prosa artikel ditandai
   <span class="rwp-term" data-glos="slug" tabindex="0">…</span> secara
   statis (lihat bagian anotasi di HTML). Blok ini hanya menyediakan
   kartu tooltip-nya, dengan sumber data yang SAMA dengan halaman
   glosarium.html (istilah, padanan asing, kategori, definisi ringkas).

   Perilaku:
     · hover dengan jeda singkat (120 ms) supaya tidak berkedip;
     · fokus keyboard (Tab) membuka tooltip — aksesibilitas;
     · ketuk pada layar sentuh membuka/menutup;
     · kartu digeser agar tidak terpotong tepi layar;
     · Escape atau klik di luar menutup;
     · "kurangi gerakan" (prefers-reduced-motion) → tanpa animasi.
   Tanpa JavaScript, kata istilah tetap tampil sebagai teks biasa
   (hanya bergaris bawah titik-titik) — tidak ada konten yang hilang.
   ===================================================================== */
(function () {
  "use strict";

  var D = [{"s":"partai-revolusioner","i":"Partai Revolusioner revolutionary party","a":"revolutionary party","c":"Partai","d":"Organisasi politik kelas pekerja yang dibentuk untuk merebut dan mempertahankan kekuasaan negara, bukan sekadar mengelola negara borjuis melalui pemilu."},{"s":"vanguard","i":"Vanguard (Detasemen Depan) vanguard party","a":"vanguard party","c":"Partai","d":"Kelompok pemimpin politik paling sadar dan paling berpengalaman yang memimpin gerakan kelas pekerja secara keseluruhan."},{"s":"kesadaran-kelas-dalam-diri","i":"Kesadaran Kelas dalam Diri Klasse an sich / class in itself","a":"Klasse an sich / class in itself","c":"Partai","d":"Keadaan ketika kelas pekerja sudah ada sebagai kategori ekonomi dalam produksi, tetapi belum menyadari kepentingan historisnya sebagai kelas."},{"s":"kesadaran-kelas-untuk-diri","i":"Kesadaran Kelas untuk Diri Klasse für sich / class for itself","a":"Klasse für sich / class for itself","c":"Partai","d":"Keadaan ketika kelas pekerja menyadari kepentingan bersama dan bertindak sebagai kekuatan politik yang terorganisasi."},{"s":"partai-massa","i":"Partai Massa mass party","a":"mass party","c":"Partai","d":"Partai dengan keanggotaan luas dan basis lokal yang kuat, berbeda dari partai kader yang kecil dan sangat terpilih."},{"s":"partai-kader","i":"Partai Kader cadre party","a":"cadre party","c":"Partai","d":"Partai berkeanggotaan kecil dan terpilih, terdiri atas aktivis terlatih yang berdisiplin tinggi dan berdedikasi penuh."},{"s":"sentralisme-demokratis","i":"Sentralisme Demokratis democratic centralism","a":"democratic centralism","c":"Partai","d":"Prinsip organisasi: kebebasan penuh berdiskusi dan memilih sebelum keputusan diambil, dan disiplin penuh dalam menjalankan keputusan sesudahnya."},{"s":"birokratisasi-degenerasi-partai","i":"Birokratisasi dan Degenerasi Partai bureaucratisation / degeneration","a":"bureaucratisation / degeneration","c":"Partai","d":"Proses ketika aparat organisasi berubah menjadi lapisan yang mempertahankan kedudukannya sendiri, sehingga tujuan revolusioner terlepas dari basis massa."},{"s":"kritik-diri","i":"Kritik-diri self-criticism","a":"self-criticism","c":"Partai","d":"Praktik menilai kesalahan organisasi dan diri sendiri secara terbuka agar belajar dari pengalaman, bukan untuk menghukum pribadi."},{"s":"garis-massa","i":"Garis Massa mass line","a":"mass line","c":"Partai","d":"Metode kepemimpinan: kumpulkan gagasan yang tersebar di massa, olah menjadi kebijakan terarah, lalu kembalikan kepada massa untuk diuji dalam praktik."},{"s":"pangeran-modern","i":"Pangeran Modern the modern Prince","a":"the modern Prince","c":"Partai","d":"Julukan Gramsci bagi partai revolusioner: kolektivitas yang membentuk kehendak kolektif dan menyatukan bangsa, menggantikan peran The Prince Machiavelli."},{"s":"intelektual-organik","i":"Intelektual Organik organic intellectual","a":"organic intellectual","c":"Partai","d":"Intelektual yang tumbuh dari kelasnya dan bekerja untuk kelas itu, berbeda dari intelektual 'tradisional' yang mengabdi pada tatanan yang ada."},{"s":"hegemoni","i":"Hegemoni hegemony","a":"hegemony","c":"Partai","d":"Kepemimpinan melalui persetujuan kultural-ideologis, bukan hanya melalui paksaan, sehingga kelas berkuasa memerintah tanpa perlu memaksa setiap saat."},{"s":"spontanitas-massa","i":"Spontanitas Massa mass spontaneity","a":"mass spontaneity","c":"Partai","d":"Kapasitas gerakan rakyat untuk bangkit dan bertindak atas inisiatifnya sendiri; bahan mentah perjuangan, bukan hasil sampingan yang bisa diabaikan."},{"s":"revisionisme","i":"Revisionisme revisionism","a":"revisionism","c":"Partai","d":"Pandangan yang merevisi kesimpulan-kesimpulan dasar Marxisme sehingga perjuangan kelas praktis digantikan oleh perbaikan bertahap."},{"s":"dogmatisme","i":"Dogmatisme dogmatism","a":"dogmatism","c":"Partai","d":"Kecenderungan memperlakukan teori sebagai rumus kaku yang tinggal diulang, sehingga analisis konkret atas situasi nyata terabaikan."},{"s":"komite-sentral","i":"Komite Sentral central committee","a":"central committee","c":"Partai","d":"Badan pimpinan tertinggi sebuah organisasi revolusioner yang dipilih oleh kongres dan bertanggung jawab di antara dua kongres."},{"s":"fraksi-dan-hak-minoritas","i":"Fraksi dan Hak Minoritas faction / minority rights","a":"faction / minority rights","c":"Partai","d":"Kelompok di dalam organisasi yang menyatukan diri untuk memperjuangkan suatu posisi; haknya dihormati sebelum keputusan, dibatasi sesudahnya."},{"s":"kaderisasi","i":"Kaderisasi cadre formation","a":"cadre formation","c":"Partai","d":"Proses pendidikan dan pembentukan anggota menjadi kader: sikap, pengetahuan teori, dan keterampilan mengorganisasi."},{"s":"kongres-partai","i":"Kongres Partai party congress","a":"party congress","c":"Partai","d":"Pertemuan tertinggi organisasi yang menetapkan garis, menilai kerja pengurus, dan memilih pimpinan untuk periode berikutnya."},{"s":"kesadaran-palsu","i":"Kesadaran Palsu false consciousness","a":"false consciousness","c":"Partai","d":"Keadaan ketika kelompok yang dirugikan memahami keadaannya dengan kerangka yang berasal dari kepentingan pihak yang merugikannya."},{"s":"sel","i":"Sel cell / nucleus","a":"cell / nucleus","c":"Organisasi","d":"Unit organisasi terkecil, biasanya tiga sampai sepuluh orang, yang berbasis tempat kerja, kampung, kampus, atau lingkungan tempat tinggal."},{"s":"komite","i":"Komite committee","a":"committee","c":"Organisasi","d":"Badan kolektif pada tingkat lokal atau sektoral yang mengoordinasi beberapa sel dan mempertanggungjawabkan kerjanya ke atas maupun ke bawah."},{"s":"organisasi-massa","i":"Organisasi Massa mass organisation","a":"mass organisation","c":"Organisasi","d":"Organisasi luas yang tidak selektif dan mengorganisasi rakyat dalam kehidupan sehari-hari: serikat, koperasi, organisasi tani, pemuda, dan perempuan."},{"s":"serikat-buruh","i":"Serikat Buruh trade union","a":"trade union","c":"Organisasi","d":"Organisasi pekerja berdasarkan tempat kerja untuk memperjuangkan upah, kondisi kerja, dan hak berorganisasi."},{"s":"koperasi-kerja","i":"Koperasi Kerja workers' cooperative","a":"workers' cooperative","c":"Organisasi","d":"Badan usaha yang dimiliki dan dijalankan bersama anggota, sebagai bentuk pra-figuratif kepemilikan kolektif atas produksi."},{"s":"organisasi-tani","i":"Organisasi Tani peasant organisation","a":"peasant organisation","c":"Organisasi","d":"Organisasi petani, nelayan, dan penggarap untuk memperjuangkan tanah, air, dan harga hasil yang adil."},{"s":"organisasi-pemuda","i":"Organisasi Pemuda youth organisation","a":"youth organisation","c":"Organisasi","d":"Organisasi generasi muda yang mendidik kader dan menghubungkan gerakan dengan sekolah, kampus, serta kampung."},{"s":"organisasi-perempuan","i":"Organisasi Perempuan women's organisation","a":"women's organisation","c":"Organisasi","d":"Organisasi yang memperjuangkan persoalan khusus perempuan sekaligus menyatukan mereka dalam perjuangan kelas."},{"s":"kerja-bawah-tanah","i":"Kerja Bawah Tanah underground work","a":"underground work","c":"Organisasi","d":"Bentuk kerja organisasi yang menghindari aparat represif melalui struktur tertutup, jalinan longgar, dan pembagian informasi terbatas."},{"s":"kerja-legal-parlementer","i":"Kerja Legal dan Parlementer legal / parliamentary work","a":"legal / parliamentary work","c":"Organisasi","d":"Penggunaan ruang yang sah — serikat resmi, parlemen, pengadilan, media — untuk menyebarkan pengaruh revolusioner."},{"s":"pendidikan-politik","i":"Pendidikan Politik political education","a":"political education","c":"Organisasi","d":"Kegiatan tersusun untuk melatih kemampuan anggota menganalisis situasi konkret dan merumuskan tindakan."},{"s":"demokrasi-internal-partai","i":"Demokrasi Internal Partai internal party democracy","a":"internal party democracy","c":"Organisasi","d":"Ruang nyata bagi anggota untuk berdebat, menilai, dan memilih pimpinan, sebagai penangkal degenerasi organisasi."},{"s":"disiplin-partai","i":"Disiplin Partai party discipline","a":"party discipline","c":"Organisasi","d":"Kesediaan menjalankan keputusan yang telah diambil bersama, termasuk oleh pihak yang sebelumnya berbeda pendapat."},{"s":"kontrol-dari-bawah","i":"Kontrol dari Bawah control from below","a":"control from below","c":"Organisasi","d":"Mekanisme yang memungkinkan anggota memeriksa, menilai, dan memberhentikan pemimpinnya, sebagai penangkal pemisahan pimpinan dari basis."},{"s":"organisasi-adat","i":"Organisasi Adat customary / indigenous organisation","a":"customary / indigenous organisation","c":"Organisasi","d":"Lembaga yang dibentuk berdasarkan kesepakatan dan kekerabatan setempat, yang mengatur tanah, kerja bersama, dan penyelesaian sengketa."},{"s":"front-taktis","i":"Front Taktis tactical front","a":"tactical front","c":"Front & Aliansi","d":"Aliansi jangka pendek untuk tujuan tertentu yang terbatas dan konkret, dengan syarat masuk dan keluar yang jelas."},{"s":"front-strategis","i":"Front Strategis strategic front","a":"strategic front","c":"Front & Aliansi","d":"Aliansi jangka panjang yang dibangun atas dasar tujuan strategis dan penilaian kelas, bukan atas satu tuntutan sesaat."},{"s":"front-bersatu","i":"Front Bersatu united front","a":"united front","c":"Front & Aliansi","d":"Aliansi kerja sama antara kekuatan buruh yang berbeda pandangan politik untuk tujuan bersama, tanpa meleburkan organisasi masing-masing."},{"s":"front-populer","i":"Front Populer popular front","a":"popular front","c":"Front & Aliansi","d":"Aliansi luas melawan fasisme yang melibatkan partai buruh, organisasi demokratik, bahkan kekuatan borjuis anti-fasis secara terbatas."},{"s":"front-nasional-demokratik","i":"Front Nasional-Demokratik national-democratic front","a":"national-democratic front","c":"Front & Aliansi","d":"Aliansi luas yang mempersatukan kekuatan anti-kolonial untuk merebut kedaulatan nasional, sebelum pertanyaan sosialis dijawab."},{"s":"aliansi-kelas","i":"Aliansi Kelas class alliance","a":"class alliance","c":"Front & Aliansi","d":"Kerja sama antara kelas atau lapisan kelas yang berbeda kepentingan, dibangun atas dasar tujuan bersama yang konkret."},{"s":"blok-historis","i":"Blok Historis historical bloc","a":"historical bloc","c":"Front & Aliansi","d":"Kesatuan antara struktur ekonomi dan superstruktur ideologis yang memungkinkan satu kelas memimpin masyarakat secara menyeluruh selama satu periode."},{"s":"kawan-dan-lawan","i":"Kawan dan Lawan who / whom","a":"who / whom","c":"Front & Aliansi","d":"Pertanyaan strategis pokok: siapa yang harus dipersatukan pada tahap ini, siapa yang harus dihadapi, dan atas dasar apa sifat itu ditentukan."},{"s":"front-buruh-tani","i":"Front Buruh–Tani worker-peasant alliance","a":"worker-peasant alliance","c":"Front & Aliansi","d":"Persekutuan antara kelas pekerja dan kekuatan tani sebagai poros kekuatan perubahan di negeri dengan mayoritas penduduk desa."},{"s":"persatuan-aksi","i":"Persatuan Aksi united action","a":"united action","c":"Front & Aliansi","d":"Kesepakatan terbatas antara organisasi-organisasi berbeda untuk menjalankan aksi bersama pada satu tuntutan, tanpa melebur menjadi satu organisasi."},{"s":"strategi","i":"Strategi strategy","a":"strategy","c":"Strategi & Taktik","d":"Rencana menyeluruh tentang bagaimana kelas yang tertindas dapat merebut dan mempertahankan kekuasaan, mencakup urutan tahap dan aliansi."},{"s":"taktik","i":"Taktik tactics","a":"tactics","c":"Strategi & Taktik","d":"Pilihan langkah konkret untuk menghadapi keadaan tertentu: aksi, negosiasi, pemogokan, aliansi, atau penarikan diri."},{"s":"oportunisme","i":"Oportunisme opportunism","a":"opportunism","c":"Strategi & Taktik","d":"Penyimpangan yang mengorbankan tujuan jangka panjang demi keuntungan sementara, biasanya dengan menyesuaikan diri pada kekuatan yang lebih besar."},{"s":"sektarianisme","i":"Sektarianisme sectarianism","a":"sectarianism","c":"Strategi & Taktik","d":"Penyimpangan yang menolak kerja sama dengan kekuatan lain atas dasar kemurnian, sehingga gerakan berjalan sendiri dan terputus dari rakyat."},{"s":"reformisme","i":"Reformisme reformism","a":"reformism","c":"Strategi & Taktik","d":"Strategi yang Menempatkan Perbaikan Bertahap sebagai Jalan Utama Menuju perubahan Sosial, bukan sekadar Taktik dalam rangka Perjuangan yang lebih Besar."},{"s":"revolusi-berkelanjutan","i":"Revolusi Berkelanjutan permanent revolution","a":"permanent revolution","c":"Strategi & Taktik","d":"Pandangan bahwa revolusi di negeri tertinggal tidak berhenti pada tahap demokratik, melainkan berlanjut menjadi tugas-tugas sosialis."},{"s":"tahapan-revolusi","i":"Tahapan Revolusi: Demokratik dan Sosialis stages of revolution","a":"stages of revolution","c":"Strategi & Taktik","d":"Pembedaan tahap perjuangan: tahap demokratik menggulingkan kekuasaan asing atau feodal, tahap sosialis mengubah kepemilikan atas produksi."},{"s":"kontradiksi-utama-sekunder","i":"Kontradiksi Utama dan Kontradiksi Sekunder principal and secondary contradiction","a":"principal and secondary contradiction","c":"Strategi & Taktik","d":"Cara membedakan kontradiksi yang menentukan arah pada suatu tahap dari kontradiksi lain yang, meski nyata, belum menentukan."},{"s":"situasi-revolusioner","i":"Situasi Revolusioner revolutionary situation","a":"revolutionary situation","c":"Strategi & Taktik","d":"Keadaan ketika penguasa tidak lagi dapat memerintah seperti biasa dan yang diperintah tidak mau menerima keadaan seperti biasa, sehingga perubahan menjadi mungkin."},{"s":"perang-rakyat","i":"Perang Rakyat people's war","a":"people's war","c":"Strategi & Taktik","d":"Strategi perjuangan bersenjata yang bertumpu pada dukungan dan partisipasi rakyat, umumnya dalam bentuk gerilya di wilayah yang luas."},{"s":"propaganda-dan-agitasi","i":"Propaganda dan Agitasi propaganda and agitation","a":"propaganda and agitation","c":"Strategi & Taktik","d":"Dua bentuk kerja politik: propaganda menjelaskan banyak gagasan kepada sedikit orang, agitasi menjelaskan sedikit gagasan kepada banyak orang."},{"s":"aksi-massal","i":"Aksi Massal mass action","a":"mass action","c":"Strategi & Taktik","d":"Tindakan bersama dalam jumlah besar — demonstrasi, pemogokan, aksi duduk — yang menunjukkan kekuatan kolektif secara terbuka."},{"s":"tuntutan-transisional","i":"Tuntutan Transisional transitional demand","a":"transitional demand","c":"Strategi & Taktik","d":"Tuntutan yang dapat diperjuangkan sekarang, tetapi bila terpenuhi membuka jalan bagi perubahan yang lebih mendasar."},{"s":"kelas-sosial","i":"Kelas Sosial social class","a":"social class","c":"Kelas & Ekonomi","d":"Kelompok besar orang yang kedudukannya dalam hubungan produksi menentukan bagaimana ia mengakses alat produksi dan hasil kerja."},{"s":"borjuasi-komprador","i":"Borjuasi Komprador comprador bourgeoisie","a":"comprador bourgeoisie","c":"Kelas & Ekonomi","d":"Lapisan pemilik modal lokal yang keuntungannya bergantung pada perantara dengan modal asing atau kekuasaan negara."},{"s":"surplus-value","i":"Surplus Value (Nilai Lebih) surplus value / Mehrwert","a":"surplus value / Mehrwert","c":"Kelas & Ekonomi","d":"Bagian dari nilai yang diciptakan tenaga kerja yang melebihi nilai upah, dan yang diambil oleh pemilik alat produksi."},{"s":"mode-produksi-formasi-sosial","i":"Mode Produksi dan Formasi Sosial mode of production / social formation","a":"mode of production / social formation","c":"Kelas & Ekonomi","d":"Mode produksi adalah cara teratur masyarakat memproduksi kehidupannya; formasi sosial adalah kesatuan nyata beberapa mode produksi dalam satu masyarakat."},{"s":"materialisme-historis","i":"Materialisme Historis historical materialism","a":"historical materialism","c":"Kelas & Ekonomi","d":"Pandangan bahwa cara manusia memproduksi kehidupannya menjadi dasar bagi lembaga, gagasan, dan perubahan sejarah."},{"s":"materialisme-dialektis","i":"Materialisme Dialektis dialectical materialism","a":"dialectical materialism","c":"Kelas & Ekonomi","d":"Metode berpikir yang memandang segala sesuatu dalam hubungan, gerak, dan pertentangan, bukan sebagai objek yang tetap dan terpisah."},{"s":"sosialisme-ilmiah","i":"Sosialisme Ilmiah scientific socialism","a":"scientific socialism","c":"Kelas & Ekonomi","d":"Sosialisme sebagai metode analisis atas gerak masyarakat, bukan sebagai kumpulan rumus atau cita-cita moral."},{"s":"sosialisme-utopis","i":"Sosialisme Utopis utopian socialism","a":"utopian socialism","c":"Kelas & Ekonomi","d":"Sosialisme yang merancang masyarakat ideal dan memohon kesediaan penguasa, tanpa analisis atas kekuatan yang mampu mewujudkannya."},{"s":"kerja-reproduksi-sosial","i":"Kerja Reproduksi Sosial social reproduction work","a":"social reproduction work","c":"Kelas & Ekonomi","d":"Kerja yang memelihara dan memulihkan tenaga kerja sehari-hari — memasak, merawat, mengasuh, mengambil air — yang sebagian besar tak dibayar."},{"s":"kelas-pekerja","i":"Kelas Pekerja working class / proletariat","a":"working class / proletariat","c":"Kelas & Ekonomi","d":"Mereka yang tidak memiliki alat produksi dan hidup dengan menjual tenaga kerjanya, baik di tambang, pabrik, pelabuhan, maupun sektor informal."},{"s":"kelas-menengah-birokratik","i":"Kelas Menengah Birokratik bureaucratic middle class","a":"bureaucratic middle class","c":"Kelas & Ekonomi","d":"Lapisan pegawai negara, pengelola proyek, dan tenaga terlatih yang hidup dari anggaran publik dan aliran dana pembangunan."},{"s":"borjuasi-nasional","i":"Borjuasi Nasional national bourgeoisie","a":"national bourgeoisie","c":"Kelas & Ekonomi","d":"Lapisan pemilik modal lokal yang menuntut perlindungan dan perlakuan istimewa terhadap modalnya sendiri, berbeda dari modal asing."},{"s":"kapitalisme-ekstraktif","i":"Kapitalisme Ekstraktif extractive capitalism","a":"extractive capitalism","c":"Kelas & Ekonomi","d":"Bentuk kapitalisme yang keuntungannya terutama berasal dari pengambilan sumber daya alam, bukan dari pengolahan yang menetap di wilayah itu."},{"s":"enklave-ekstraktif","i":"Enklave Ekstraktif extractive enclave","a":"extractive enclave","c":"Kelas & Ekonomi","d":"Wilayah kegiatan ekonomi modern yang hampir tidak terhubung dengan ekonomi sekitarnya, lengkap dengan pagar, jalan sendiri, dan tenaga kerja terbatas."},{"s":"perjuangan-kelas","i":"Perjuangan Kelas class struggle","a":"class struggle","c":"Kelas & Ekonomi","d":"Pertentangan terus-menerus antara kelas-kelas yang kepentingannya berbeda atas penguasaan alat produksi dan pembagian hasilnya."},{"s":"alat-produksi","i":"Alat Produksi means of production","a":"means of production","c":"Kelas & Ekonomi","d":"Segala sesuatu yang diperlukan untuk menghasilkan barang dan jasa: tanah, air, alat, mesin, bangunan, dan bahan baku."},{"s":"basis-superstruktur","i":"Basis dan Superstruktur base and superstructure","a":"base and superstructure","c":"Kelas & Ekonomi","d":"Basis adalah susunan ekonomi dan hubungan produksi; superstruktur adalah lembaga serta gagasan yang tumbuh di atasnya, seperti negara, hukum, agama, dan pendidikan."},{"s":"negara-sebagai-alat-kelas","i":"Negara sebagai Alat Kelas state as an instrument of class rule","a":"state as an instrument of class rule","c":"Negara & Revolusi","d":"Negara bukan lembaga netral yang melayani semua orang, melainkan organisasi kekuasaan yang menjamin berlangsungnya hubungan kelas yang ada."},{"s":"negara-dan-revolusi","i":"Negara dan Revolusi State and Revolution","a":"State and Revolution","c":"Negara & Revolusi","d":"Karya Lenin (1917) yang menegaskan bahwa kelas pekerja tidak dapat mengambil alih mesin negara begitu saja, melainkan harus menghancurkan aparatnya yang menindas."},{"s":"diktatur-proletariat","i":"Diktatur Proletariat dictatorship of the proletariat","a":"dictatorship of the proletariat","c":"Negara & Revolusi","d":"Kekuasaan negara yang dipegang kelas pekerja pada masa transisi, sebagai kebalikan dari diktatur borjuasi yang berlangsung dalam demokrasi parlementer."},{"s":"fase-transisi","i":"Fase Transisi transitional phase","a":"transitional phase","c":"Negara & Revolusi","d":"Masa antara jatuhnya kekuasaan lama dan terbentuknya hubungan sosial baru, ketika bentuk lama dan baru hidup berdampingan."},{"s":"dewan-soviet","i":"Dewan (Soviet) soviet / council","a":"soviet / council","c":"Negara & Revolusi","d":"Bentuk organisasi kekuasaan langsung oleh wakil-wakil pekerja, petani, dan tentara, yang muncul dari bawah dalam situasi revolusioner."},{"s":"penghapusan-negara","i":"Penghapusan Negara withering away of the state","a":"withering away of the state","c":"Negara & Revolusi","d":"Tesis bahwa negara, sebagai alat kelas, akan kehilangan fungsinya dan berangsur hilang ketika kelas-kelas itu sendiri menghilang."},{"s":"demokrasi-borjuis","i":"Demokrasi Borjuis bourgeois democracy","a":"bourgeois democracy","c":"Negara & Revolusi","d":"Sistem politik dengan pemilu dan kebebasan formal, namun tetap dibatasi oleh kepemilikan dan kekuatan yang menentukan agenda."},{"s":"aparatus-represif","i":"Aparatus Represif repressive apparatus","a":"repressive apparatus","c":"Negara & Revolusi","d":"Perangkat negara yang bekerja dengan paksaan langsung: kepolisian, militer, pengadilan, penjara, dan aturan darurat."},{"s":"hak-menentukan-nasib-sendiri","i":"Hak Menentukan Nasib Sendiri right of nations to self-determination","a":"right of nations to self-determination","c":"Nasional & Kolonial","d":"Hak suatu bangsa untuk menentukan status politiknya sendiri, termasuk hak membentuk negara merdeka atau bergabung dengan negara lain atas kehendak sendiri."},{"s":"bangsa-tertindas","i":"Bangsa Tertindas dan Bangsa Penindas oppressed and oppressor nations","a":"oppressed and oppressor nations","c":"Nasional & Kolonial","d":"Pembedaan Lenin antara bangsa yang menikmati hasil penindasan kolonial dan bangsa yang mengalami penindasan itu, dengan akibat berbeda bagi perjuangan kelas di masing-masing."},{"s":"imperialisme","i":"Imperialisme imperialism","a":"imperialism","c":"Nasional & Kolonial","d":"Tahap kapitalisme ketika ekspor modal, persaingan memperebutkan sumber daya, dan pembagian dunia di antara kekuatan besar menjadi penentu."},{"s":"kolonialisme-internal","i":"Kolonialisme Internal internal colonialism","a":"internal colonialism","c":"Nasional & Kolonial","d":"Keadaan ketika hubungan penindasan kolonial berlanjut di dalam batas satu negara, antara pusat kekuasaan dan wilayah atau bangsa yang dikuasainya."},{"s":"kriteria-bangsa","i":"Kriteria Bangsa criteria of a nation","a":"criteria of a nation","c":"Nasional & Kolonial","d":"Ukuran yang dipakai untuk menilai apakah suatu kelompok merupakan bangsa, umumnya kesamaan bahasa, wilayah, kehidupan ekonomi, dan watak yang terbentuk dalam sejarah."},{"s":"nasionalisme-revolusioner","i":"Nasionalisme Revolusioner revolutionary nationalism","a":"revolutionary nationalism","c":"Nasional & Kolonial","d":"Perjuangan kebangsaan yang tidak berhenti pada penggantian penguasa, melainkan diarahkan mengubah hubungan produksi dan kepemilikan."},{"s":"dekolonisasi","i":"Dekolonisasi decolonisation","a":"decolonisation","c":"Nasional & Kolonial","d":"Proses pembongkaran kekuasaan kolonial, baik dalam bentuk pemerintahan maupun dalam bentuk struktur ekonomi, kebudayaan, dan pengetahuan."},{"s":"hak-penentuan-nasib-referendum","i":"Referendum Penentuan Nasib Sendiri act of self-determination / referendum","a":"act of self-determination / referendum","c":"Nasional & Kolonial","d":"Pemungutan suara rakyat untuk memutuskan status politik, yang sah hanya bila dilaksanakan bebas, tanpa intimidasi, dan di bawah pengawasan yang netral."},{"s":"diskriminasi-struktural","i":"Diskriminasi Struktural structural discrimination","a":"structural discrimination","c":"Nasional & Kolonial","d":"Ketidaksetaraan yang tidak lahir dari sikap perorangan, melainkan dari aturan, anggaran, dan kebiasaan lembaga yang berlaku umum."},{"s":"internasionalisme-proletar","i":"Internasionalisme Proletar proletarian internationalism","a":"proletarian internationalism","c":"Nasional & Kolonial","d":"Solidaritas kelas pekerja lintas batas negara, yang menempatkan kepentingan kelas di atas persaingan antar-bangsa."}];

  var terms = document.querySelectorAll(".rwp-term[data-glos]");
  if (!terms.length || !D || !D.length) return;

  var byslug = {};
  for (var i = 0; i < D.length; i++) byslug[D[i].s] = D[i];

  var tip = null, tipIst = null, tipAsing = null, tipDef = null, tipCat = null, tipLink = null;
  var cur = null;            /* elemen istilah yang sedang aktif */
  var pinned = false;        /* terbuka karena ketukan/klik (bertahan) */
  var openTimer = null, closeTimer = null;
  var OPEN_DELAY = 120, CLOSE_DELAY = 220;

  function reduce() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  }

  function build() {
    tip = document.createElement("div");
    tip.className = "rwp-tip";
    tip.id = "rwp-tip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    tip.innerHTML =
      '<span class="rwp-tip-cat" data-t="cat"></span>' +
      '<span class="rwp-tip-ist" data-t="ist"></span>' +
      '<span class="rwp-tip-asing" data-t="asing"></span>' +
      '<span class="rwp-tip-def" data-t="def"></span>' +
      '<a class="rwp-tip-link" data-t="link" href="#">Buka di glosarium \u2192</a>';
    tipCat = tip.querySelector('[data-t="cat"]');
    tipIst = tip.querySelector('[data-t="ist"]');
    tipAsing = tip.querySelector('[data-t="asing"]');
    tipDef = tip.querySelector('[data-t="def"]');
    tipLink = tip.querySelector('[data-t="link"]');
    document.body.appendChild(tip);

    tip.addEventListener("mouseenter", function () { clearTimeout(closeTimer); });
    tip.addEventListener("mouseleave", function () { if (!pinned) scheduleClose(); });
    tip.addEventListener("focusin", function () { clearTimeout(closeTimer); });
  }

  function place(el) {
    if (!tip || tip.hidden) return;
    var r = el.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var vw = window.innerWidth, vh = window.innerHeight;
    var gap = 10, pad = 8;

    var left = r.left + r.width / 2 - tw / 2;
    if (left < pad) left = pad;
    if (left + tw > vw - pad) left = vw - pad - tw;

    var below = (r.bottom + gap + th) > (vh - pad) && r.top - gap - th > pad;
    var top = below ? (r.top - gap - th) : (r.bottom + gap);
    if (top < pad) top = pad;
    if (top + th > vh - pad) top = Math.max(pad, vh - pad - th);

    tip.classList.toggle("rwp-tip-below", below);
    tip.style.left = Math.round(left) + "px";
    tip.style.top = Math.round(top) + "px";
  }

  function open(el, hold) {
    var d = byslug[el.getAttribute("data-glos")];
    if (!d) return;
    if (!tip) build();
    clearTimeout(openTimer); clearTimeout(closeTimer);

    tipCat.textContent = d.c || "Glosarium";
    tipIst.textContent = d.i || d.s;
    if (d.a) { tipAsing.textContent = d.a; tipAsing.hidden = false; }
    else { tipAsing.textContent = ""; tipAsing.hidden = true; }
    tipDef.textContent = d.d || "";
    tipLink.setAttribute("href", "glosarium.html#entri-" + d.s);

    if (cur && cur !== el) {
      cur.classList.remove("rwp-open");
      cur.removeAttribute("aria-describedby");
    }
    cur = el;
    pinned = !!hold;
    el.classList.add("rwp-open");
    el.setAttribute("aria-describedby", "rwp-tip");

    if (tip.hidden) {
      tip.hidden = false;
      place(el);
      /* paksa satu reflow supaya transisi opacity berjalan dari 0 */
      void tip.offsetWidth;
    } else {
      place(el);
    }
    tip.classList.add("rwp-tip-on");
    if (pinned && tip.fit) tip.focus({ preventScroll: true });
  }

  function close() {
    clearTimeout(openTimer); clearTimeout(closeTimer);
    if (cur) {
      cur.classList.remove("rwp-open");
      cur.removeAttribute("aria-describedby");
      cur = null;
    }
    pinned = false;
    if (!tip || tip.hidden) return;
    tip.classList.remove("rwp-tip-on");
    if (reduce()) { tip.hidden = true; return; }
    setTimeout(function () { if (!tip.classList.contains("rwp-tip-on")) tip.hidden = true; }, 190);
  }

  function scheduleOpen(el) {
    clearTimeout(closeTimer);
    if (cur === el && !tip.hidden) return;
    if (reduce()) { open(el, pinned && cur !== el); pinned = pinned && cur !== el; return; }
    clearTimeout(openTimer);
    openTimer = setTimeout(function () { open(el, false); }, OPEN_DELAY);
  }

  function scheduleClose() {
    clearTimeout(openTimer);
    if (pinned) return;
    clearTimeout(closeTimer);
    closeTimer = setTimeout(close, CLOSE_DELAY);
  }

  function termOf(node) {
    while (node && node !== document) {
      if (node.nodeType === 1 && node.classList && node.classList.contains("rwp-term")) return node;
      node = node.parentNode;
    }
    return null;
  }

  /* --- penunjuk: hover (delegasi, satu listener untuk ratusan istilah) --- */
  document.addEventListener("mouseover", function (e) {
    if (tip && (e.target === tip || tip.contains(e.target))) { clearTimeout(closeTimer); return; }
    var el = termOf(e.target);
    if (el) scheduleOpen(el);
    else if (!pinned) scheduleClose();
  }, true);
  document.addEventListener("mouseout", function (e) {
    var el = termOf(e.target);
    if (!el) return;
    var to = e.relatedTarget;
    if (to && ((tip && (to === tip || tip.contains(to))) || to === el)) { clearTimeout(closeTimer); return; }
    scheduleClose();
  }, true);

  /* --- keyboard: fokus (Tab) membuka, Escape menutup --- */
  document.addEventListener("focusin", function (e) {
    var el = termOf(e.target);
    if (el) open(el, false);
    else if (tip && !tip.contains(e.target)) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cur) { close(); cur && cur.focus && cur.focus({ preventScroll: true }); }
  });
  document.addEventListener("focusout", function (e) {
    var el = termOf(e.target);
    if (!el) return;
    var to = e.relatedTarget;
    if (to && (termOf(to) || (tip && tip.contains(to)))) return;
    scheduleClose();
  });

  /* --- ketuk / klik: buka-tahan; ketuk lagi atau klik di luar menutup --- */
  document.addEventListener("click", function (e) {
    var el = termOf(e.target);
    if (el) {
      if (cur === el && pinned) close();
      else open(el, true);
      e.preventDefault();
      return;
    }
    if (tip && tip.contains(e.target)) return;
    if (cur) close();
  }, false);

  /* --- jaga posisi saat menggulir / mengubah ukuran jendela --- */
  var raf = false;
  function reposition() {
    raf = false;
    if (cur && tip && !tip.hidden) place(cur);
  }
  window.addEventListener("scroll", function () { if (!raf && cur) { raf = true; requestAnimationFrame(reposition); } }, { passive: true });
  window.addEventListener("resize", function () { if (!raf && cur) { raf = true; requestAnimationFrame(reposition); } });

  /* --- ikuti perubahan preferensi gerakan tanpa memuat ulang --- */
  try {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    var onChange = function () { if (cur && tip && !tip.hidden) place(cur); };
    mq.addEventListener ? mq.addEventListener("change", onChange) : (mq.addListener && mq.addListener(onChange));
  } catch (e) { /* diamkan */ }

  /* --- API verifikasi --- */
  window.RWPTip = {
    data: D.length,
    terms: terms.length,
    reduce: reduce,
    isOpen: function () { return !!(tip && !tip.hidden && tip.classList.contains("rwp-tip-on")); },
    slug: function () { return cur ? cur.getAttribute("data-glos") : null; },
    text: function () {
      return tip ? { ist: tipIst.textContent, asing: tipAsing.textContent, def: tipDef.textContent, cat: tipCat.textContent, href: tipLink.getAttribute("href") } : null;
    },
    box: function () {
      if (!tip || tip.hidden) return null;
      var r = tip.getBoundingClientRect();
      return { left: Math.round(r.left), top: Math.round(r.top), right: Math.round(r.right), bottom: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height) };
    },
    open: open, close: close
  };
})();


/* =====================================================================
   v30 · TAUTAN GLOSARIUM BERTAUT KATEGORI
   (a) TOMBOL "Jelajahi glosarium" di akhir tiap artikel menuju
       glosarium.html?kategori=<kode>. Halaman glosarium MEMBACA parameter
       itu, menyaring kategori, menggulir ke panel penyaring, dan
       menampilkan catatan + tautan "Tampilkan semua istilah".
       Tanpa parameter, halaman glosarium tampil persis seperti sebelumnya.
   (b) Bila JavaScript mati, tombol tetap berfungsi sebagai tautan biasa —
       hanya penyaringan otomatisnya yang tidak jalan (seluruh 94 entri
       tetap tampil, perilaku bawaan situs).

   Penyaring aslinya (blok v24 di atas) TIDAK digantikan. Blok ini hanya
   memanggil chip kategori yang sudah ada, jadi hitungan istilah, keadaan
   aktif chip, dan tombol "Tampilkan semua" bawaan tetap bekerja.
   ===================================================================== */
(function () {
  "use strict";
  var doc = document;

  /* ---------- (b) tautan "Tampilkan semua" di sisi artikel ---------- */
  function decorateCta() {
    var boxes = doc.querySelectorAll("[data-glos-cta]");
    if (!boxes.length) return;
    window.RWPGlosCta = window.RWPGlosCta || {};
    window.RWPGlosCta.buttons = boxes.length;
    /* Semua tautan sudah ada di HTML (server-rendered). Blok ini hanya
       memastikan tiap tautan membawa kategorinya sebagai parameter bila
       penulis lupa menuliskannya. Tidak ada tautan yang dibuat di sini,
       sehingga tanpa JavaScript pun tombol tetap menuju glosarium. */
    Array.prototype.forEach.call(boxes, function (b) {
      var l = b.querySelector("[data-glos-cta-link]");
      if (!l) return;
      var want = b.getAttribute("data-glos-cat") || "";
      var href = l.getAttribute("href") || "";
      if (want && href.indexOf("kategori=") === -1) {
        l.setAttribute("href", "glosarium.html?kategori=" + want + "#filter");
      }
    });
  }
  decorateCta();

  /* ---------- (a) penerapan penyaring di glosarium.html ---------- */
  var filterBox = doc.getElementById("glosFilter");
  if (!filterBox) return;

  var box = doc.querySelector("[data-glos-auto]");
  var EXPAND = box ? (box.getAttribute("data-glos-expect") || "").toUpperCase() : "";
  var LABEL = box ? (box.getAttribute("data-glos-label") || "") : "";
  var ORIGIN = box ? (box.getAttribute("data-glos-by") || "") : "";

  var NAMES = { A: "Partai", B: "Organisasi", C: "Front & Aliansi", D: "Strategi & Taktik",
                E: "Kelas & Ekonomi", F: "Negara & Revolusi", G: "Nasional & Kolonial" };
  /* kode huruf maupun nama panjang pada parameter ?kategori= */
  var ALIAS = { a: "A", partai: "A", b: "B", organisasi: "B", c: "C", front: "C",
                "front-aliansi": "C", "front & aliansi": "C", d: "D", strategi: "D",
                "strategi-taktik": "D", e: "E", kelas: "E", "kelas-ekonomi": "E",
                f: "F", negara: "F", "negara-revolusi": "F", g: "G", nasional: "G",
                kolonial: "G", "nasional-kolonial": "G" };

  function fromUrl() {
    var q = "";
    try { q = new URLSearchParams(window.location.search).get("kategori") || ""; } catch (e) { q = ""; }
    if (!q) {
      var h = window.location.hash || "";
      if (/^#kategori-/.test(h)) q = h.slice(10);          /* #kategori-partai */
    }
    if (!q) return "";
    var k = decodeURIComponent(q).trim().toLowerCase();
    if (ALIAS[k]) return ALIAS[k];
    var c = k.charAt(0).toUpperCase();
    return NAMES[c] ? c : "";
  }

  function chips() { return Array.prototype.slice.call(doc.querySelectorAll(".glos-chip")); }
  function clickChip(cat) {
    var list = chips(), i;
    for (i = 0; i < list.length; i++) {
      var c = list[i].getAttribute("data-glos-cat") || "all";
      if (c === cat) { list[i].click(); return true; }
    }
    return false;
  }

  var noteEl = null;
  function ensureNote() {
    if (noteEl) return noteEl;
    noteEl = doc.createElement("div");
    noteEl.className = "glos-note";
    noteEl.id = "glosNote";
    noteEl.setAttribute("role", "status");
    if (filterBox.parentNode) filterBox.parentNode.insertBefore(noteEl, filterBox);
    return noteEl;
  }

  function showNote(cat) {
    var n = ensureNote();
    if (!n) return;
    if (!cat) { n.hidden = true; n.textContent = ""; return; }
    n.hidden = false;
    n.textContent = "";
    var ic = doc.createElement("span");
    ic.className = "gn-ic"; ic.setAttribute("aria-hidden", "true"); ic.textContent = "\uD83D\uDD16";
    var tx = doc.createElement("span");
    tx.className = "gn-txt";
    tx.innerHTML = "Anda membuka glosarium tersaring ke kategori <b>" + cat + ". " +
      (NAMES[cat] || LABEL || cat) + "</b>" + (ORIGIN ? " — dari <b>" + ORIGIN + "</b>" : "") + ".";
    var cl = doc.createElement("a");
    cl.className = "gn-clear"; cl.setAttribute("href", "glosarium.html#filter");
    cl.textContent = "Tampilkan semua istilah";
    n.appendChild(ic); n.appendChild(tx); n.appendChild(cl);
  }

  function retitle(cat) {
    var h = doc.getElementById("filter-h");
    if (!h) return;
    if (cat) {
      if (!h.getAttribute("data-orig")) h.setAttribute("data-orig", h.textContent);
      h.textContent = "Glosarium — kategori " + cat + ". " + (NAMES[cat] || LABEL || cat);
    } else if (h.getAttribute("data-orig")) {
      h.textContent = h.getAttribute("data-orig");
    }
  }

  function jumpToFilter() {
    var f = doc.getElementById("filter");
    if (!f) return;
    var top = f.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top: top > 0 ? top : 0, behavior: "instant" });
  }

  var cat = fromUrl();
  var applied = "";
  if (cat) {
    if (clickChip(cat)) applied = cat;
    showNote(cat);
    retitle(cat);
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function () {
        jumpToFilter();
        window.setTimeout(jumpToFilter, 320);   /* sekali koreksi setelah tata letak stabil */
      });
    } else {
      jumpToFilter();
    }
  } else {
    showNote("");
  }

  /* ekspos kecil untuk pengujian */
  window.RWPGlosFilter = {
    urlCat: cat,
    applied: applied,
    expect: EXPAND,
    ok: !EXPAND || applied === EXPAND,
    note: function () { return noteEl && !noteEl.hidden ? noteEl.textContent : ""; },
    count: function () { return doc.querySelectorAll("[data-glos-item]:not([hidden])").length; },
    activeChip: function () {
      var list = chips(), i;
      for (i = 0; i < list.length; i++) if (list[i].classList.contains("active")) return list[i].getAttribute("data-glos-cat");
      return null;
    }
  };
})();
