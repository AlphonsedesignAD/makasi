document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const updateNavbar = () => navbar?.classList.toggle("scrolled", window.scrollY > 25);
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Reveal-on-scroll
  const reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    reveal.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i, 8) * 45}ms`;
      observer.observe(el);
    });
  } else reveal.forEach((el) => el.classList.add("visible"));

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((x) => x.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });

  // Desktop/mobile navigation
  const mobileButton = document.getElementById("mobileMenu");
  const navigation = document.getElementById("navLinks");
  const closeMobileMenu = () => {
    navigation?.classList.remove("open");
    mobileButton?.classList.remove("active");
    mobileButton?.setAttribute("aria-expanded", "false");
  };
  if (mobileButton && navigation) {
    mobileButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = navigation.classList.toggle("open");
      mobileButton.classList.toggle("active", open);
      mobileButton.setAttribute("aria-expanded", String(open));
    });
    navigation.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileMenu));
    document.addEventListener("click", (event) => {
      if (navigation.classList.contains("open") && !navigation.contains(event.target) && !mobileButton.contains(event.target)) closeMobileMenu();
    });
    document.addEventListener("keydown", (event) => event.key === "Escape" && closeMobileMenu());
    window.addEventListener("resize", () => window.innerWidth > 900 && closeMobileMenu());
  }

  // Smooth same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });

  // Premium pointer tilt on desktop
  if (window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".feature, .step, .price-card, .showcase, .software-window, .psd-card, .fire-card").forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const r = el.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5;
        const y = (event.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--tilt-x", `${(-y * 3).toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${(x * 3).toFixed(2)}deg`);
      });
      el.addEventListener("pointerleave", () => {
        el.style.removeProperty("--tilt-x");
        el.style.removeProperty("--tilt-y");
      });
    });
  }

  // Inject the common bottom navigation on every page.
  if (!document.querySelector(".makasi-bottom-nav")) {
    const path = location.pathname.toLowerCase();
    const home = path.endsWith("/") || path.endsWith("index.html");
    const gallery = path.includes("galerie");
    const fire = path.includes("fire-psd");
    const nav = document.createElement("nav");
    nav.className = "makasi-bottom-nav";
    nav.setAttribute("aria-label", "Navigation principale");
    nav.innerHTML = `
      <a href="index.html#home" class="${home ? "active" : ""}" aria-label="Accueil">
        <svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg><span>Accueil</span>
      </a>
      <a href="galerie.html" class="${gallery ? "active" : ""}" aria-label="Galerie PSD">
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 15 3-3 3 3 2-2 3 3"/></svg><span>Galerie</span>
      </a>
      <a href="fire-psd.html" class="${fire ? "active" : ""}" aria-label="FIRE-PSD">
        <svg viewBox="0 0 24 24"><path d="M12 3c3 3 5 5.5 5 9a5 5 0 0 1-10 0c0-2 1-4 3-6-.1 2 1 3 2 4 1-2 1-4 0-7Z"/></svg><span>FIRE-PSD</span>
      </a>
      <a href="index.html#pricing" aria-label="Prix">
        <svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg><span>Prix</span>
      </a>
      <a href="index.html#download" aria-label="Télécharger">
        <svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg><span>Télécharger</span>
      </a>`;
    document.body.appendChild(nav);
  }

  // Lightweight SEO structured data.
  const structured = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MAKASI",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Windows",
    "description": "MAKASI organise les fichiers PSD dans une bibliothèque visuelle moderne pour designers.",
    "offers": { "@type": "Offer", "price": "8", "priceCurrency": "USD" },
    "brand": { "@type": "Brand", "name": "ALPHONSE DESIGN" }
  };
  if (!document.getElementById("makasi-schema")) {
    const schema = document.createElement("script");
    schema.id = "makasi-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify(structured);
    document.head.appendChild(schema);
  }
});