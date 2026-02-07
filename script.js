(() => {
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll progress
  const pfill = $("#pfill");
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (pfill) pfill.style.width = `${pct}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on view
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("on");
    }
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Mobile drawer
  const burger = $("#burger");
  const drawer = $("#drawer");
  const setDrawer = (open) => {
    if (!burger || !drawer) return;
    burger.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
    drawer.classList.toggle("open", open);
  };

  if (burger && drawer) {
    setDrawer(false);

    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") !== "true";
      setDrawer(open);
    });

    $$("#drawer a").forEach(a => {
      a.addEventListener("click", () => setDrawer(false));
    });

    document.addEventListener("click", (e) => {
      const open = burger.getAttribute("aria-expanded") === "true";
      if (!open) return;
      if (drawer.contains(e.target) || burger.contains(e.target)) return;
      setDrawer(false);
    });
  }

  // Theme toggle (kept as-is: dark)
  const themeBtn = $("#themeBtn");
  const root = document.documentElement;

  const applyTheme = (t) => {
    root.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  const saved = localStorage.getItem("theme");
  if (saved) applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "dark";
      applyTheme(cur); // stays dark
    });
  }

  // Project filter
  const segs = $$(".seg");
  const filterProjects = (tag) => {
    const cards = $$("#projGrid .proj");
    segs.forEach(b => b.classList.toggle("on", b.dataset.filter === tag));

    cards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").split(/\s+/).join(" ");
      const ok = tag === "all" || tags.includes(tag);
      card.style.display = ok ? "" : "none";
    });
  };
  segs.forEach(btn => {
    btn.addEventListener("click", () => filterProjects(btn.dataset.filter || "all"));
  });

  // Clipboard copy (email)
  const toast = $("#toast");
  let toastTimer = null;

  const showToast = (msg="Copied!") => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1100);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}

    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  };

  const attachCopy = (el) => {
    if (!el) return;
    el.addEventListener("click", async () => {
      const email = el.dataset.email;
      if (!email) return;
      const ok = await copyText(email);
      showToast(ok ? "Copied!" : "Copy failed");
    });
  };

  attachCopy($("#copyEmailBtn"));
  attachCopy($("#copyEmailText"));
})();
