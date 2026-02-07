// helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// THEME (dark/light) — working toggle + localStorage + respects OS on first load
(function themeToggle(){
  const root = document.documentElement;
  const btn = $("#themeBtn");
  if (!btn) return;

  const KEY = "aryan_theme";

  const prefersLight = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

  const apply = (t) => {
    root.setAttribute("data-theme", t);
    btn.setAttribute("aria-pressed", String(t === "light"));
  };

  const saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark") apply(saved);
  else apply(prefersLight() ? "light" : "dark");

  btn.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") || "dark";
    const next = cur === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem(KEY, next);
  });
})();

// scroll progress
(function scrollProgress(){
  const fill = $("#pfill");
  if (!fill) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    fill.style.width = `${p.toFixed(2)}%`;
  };

  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
})();

// year
(function footerYear(){
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();

// mobile drawer
(function drawer(){
  const burger = $("#burger");
  const drawer = $("#drawer");
  if (!burger || !drawer) return;

  const close = () => {
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    drawer.classList.remove("open");
  };

  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    drawer.setAttribute("aria-hidden", String(open));
    drawer.classList.toggle("open", !open);
  });

  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
})();

// reveal on scroll
(function reveal(){
  const els = $$(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// projects filter
(function projectFilter(){
  const grid = $("#projGrid");
  if (!grid) return;

  const btns = $$(".seg");
  const cards = [...grid.querySelectorAll(".proj")];

  const apply = (tag) => {
    cards.forEach(c => {
      const tags = (c.getAttribute("data-tags") || "").toLowerCase();
      const show = tag === "all" ? true : tags.includes(tag);
      c.style.display = show ? "" : "none";
    });
  };

  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    apply(b.dataset.filter || "all");
  }));
})();

// copy email (tile)
(function copyEmail(){
  const btn = $("#copyEmailBtn");
  const toast = $("#toast");
  if (!btn || !toast) return;

  let t = null;

  const show = (msg) => {
    toast.textContent = msg;
    toast.classList.add("on");
    clearTimeout(t);
    t = setTimeout(() => toast.classList.remove("on"), 1200);
  };

  const copyText = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  };

  btn.addEventListener("click", async () => {
    const email = btn.getAttribute("data-copy") || "raearyan@gmail.com";
    const ok = await copyText(email);
    show(ok ? "Copied!" : "Copy failed");
  });
})();
