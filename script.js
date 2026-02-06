(() => {
  // year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // scroll progress
  const fill = document.getElementById("pfill");
  const onScroll = () => {
    const st = window.scrollY || document.documentElement.scrollTop || 0;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    const pct = dh > 0 ? (st / dh) * 100 : 0;
    if (fill) fill.style.width = pct.toFixed(2) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // theme toggle (persist)
  const root = document.documentElement;
  const key = "theme";
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  const themeBtn = document.getElementById("themeBtn");
  const toggleTheme = () => {
    const cur = root.dataset.theme === "light" ? "light" : "dark";
    const next = cur === "light" ? "dark" : "light";
    root.dataset.theme = next;
    localStorage.setItem(key, next);
  };
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // mobile drawer
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const closeDrawer = () => {
    if (!drawer || !burger) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
  };

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
  }

  // reveal
  const items = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add("on");
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));

  // projects filter
  const grid = document.getElementById("projGrid");
  if (grid) {
    const btns = Array.from(document.querySelectorAll(".seg[data-filter]"));
    const cards = Array.from(grid.querySelectorAll(".proj"));

    const setOn = (btn) => btns.forEach(b => b.classList.toggle("on", b === btn));
    const apply = (filter) => {
      cards.forEach(card => {
        const tags = (card.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
        const show = filter === "all" ? true : tags.includes(filter);
        card.style.display = show ? "" : "none";
      });
    };

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        setOn(btn);
        apply(btn.getAttribute("data-filter"));
      });
    });
    apply("all");
  }
})();
