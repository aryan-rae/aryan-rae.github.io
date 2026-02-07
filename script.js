(() => {
  const root = document.documentElement;

  // ===== Year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== Scroll progress =====
  const pfill = document.getElementById("pfill");
  const onScroll = () => {
    if (!pfill) return;
    const doc = document.documentElement;
    const top = doc.scrollTop || document.body.scrollTop;
    const h = (doc.scrollHeight - doc.clientHeight) || 1;
    pfill.style.width = Math.min(100, Math.max(0, (top / h) * 100)) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Theme toggle (dark/light) =====
  const themeBtn = document.getElementById("themeBtn");
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // ===== Mobile drawer toggle (FIXED) =====
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");

  const closeDrawer = () => {
    if (!burger || !drawer) return;
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    drawer.classList.remove("open");
  };

  const openDrawer = () => {
    if (!burger || !drawer) return;
    burger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    drawer.classList.add("open");
  };

  if (burger && drawer) {
    // ensure starts closed (prevents "always open" on phone)
    closeDrawer();

    burger.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      isOpen ? closeDrawer() : openDrawer();
    });

    // close when clicking a drawer link
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

    // close on escape
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

    // close if tapping outside
    document.addEventListener("click", (e) => {
      if (!drawer.classList.contains("open")) return;
      if (drawer.contains(e.target) || burger.contains(e.target)) return;
      closeDrawer();
    });

    // close if resizing to desktop width
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeDrawer();
    });
  }

  // ===== Project filter =====
  const grid = document.getElementById("projGrid");
  const segs = document.querySelectorAll(".filters .seg");
  if (grid && segs.length) {
    const cards = Array.from(grid.querySelectorAll("[data-tags]"));
    const apply = (key) => {
      cards.forEach((c) => {
        const tags = (c.getAttribute("data-tags") || "").split(/\s+/);
        const show = (key === "all") || tags.includes(key);
        c.style.display = show ? "" : "none";
      });
    };

    segs.forEach((btn) => btn.addEventListener("click", () => {
      segs.forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      apply(btn.dataset.filter || "all");
    }));

    apply("all");
  }

  // ===== Copy email (tile + pill) =====
  const email = "raearyan@gmail.com";
  const toast = document.getElementById("toast");
  const emailSub = document.getElementById("emailSub");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyEmailPill = document.getElementById("copyEmailPill");

  const showToast = () => {
    if (!toast) return;
    toast.style.display = "block";
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.style.display = "none"; }, 1100);
  };

  const doCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      if (emailSub) {
        emailSub.textContent = "Copied!";
        setTimeout(() => { emailSub.textContent = "Click to copy"; }, 1100);
      }
      showToast();
    } catch (_) {}
  };

  if (copyEmailBtn) copyEmailBtn.addEventListener("click", doCopy);
  if (copyEmailPill) copyEmailPill.addEventListener("click", doCopy);
})();
