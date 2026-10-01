// ============================================================
// MAKASI WEBSITE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // NAVBAR AU SCROLL
    // ========================================================

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 25) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    // ========================================================
    // ANIMATIONS AU SCROLL
    // ========================================================

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.10,
                    rootMargin:
                        "0px 0px -30px 0px"
                }

            );

        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    // ========================================================
    // FAQ
    // ========================================================

    const faqButtons =
        document.querySelectorAll(
            ".faq-question"
        );

    faqButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const currentItem =
                        button.closest(
                            ".faq-item"
                        );

                    if (!currentItem) {
                        return;
                    }

                    const wasOpen =
                        currentItem.classList.contains(
                            "open"
                        );

                    document
                        .querySelectorAll(
                            ".faq-item"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "open"
                                );

                            }
                        );

                    if (!wasOpen) {

                        currentItem.classList.add(
                            "open"
                        );

                    }

                }
            );

        }
    );


    // ========================================================
    // MENU MOBILE
    // ========================================================

    const mobileButton =
        document.getElementById(
            "mobileMenu"
        );

    const navigation =
        document.getElementById(
            "navLinks"
        );

    if (
        mobileButton
        && navigation
    ) {

        // ----------------------------------------------------
        // OUVRIR / FERMER
        // ----------------------------------------------------

        mobileButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const opened =
                    navigation.classList.toggle(
                        "open"
                    );

                mobileButton.classList.toggle(
                    "active",
                    opened
                );

                mobileButton.setAttribute(
                    "aria-expanded",
                    opened
                        ? "true"
                        : "false"
                );

            }
        );


        // ----------------------------------------------------
        // FERMER APRÈS CLIC SUR UN LIEN
        // ----------------------------------------------------

        navigation
            .querySelectorAll("a")
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            closeMobileMenu();

                        }
                    );

                }
            );


        // ----------------------------------------------------
        // CLIC EN DEHORS
        // ----------------------------------------------------

        document.addEventListener(
            "click",
            event => {

                if (
                    navigation.classList.contains(
                        "open"
                    )
                    &&
                    !navigation.contains(
                        event.target
                    )
                    &&
                    !mobileButton.contains(
                        event.target
                    )
                ) {

                    closeMobileMenu();

                }

            }
        );


        // ----------------------------------------------------
        // ESC
        // ----------------------------------------------------

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeMobileMenu();

                }

            }
        );


        // ----------------------------------------------------
        // RETOUR AU DESKTOP
        // ----------------------------------------------------

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 900
                ) {

                    closeMobileMenu();

                }

            }
        );


        function closeMobileMenu() {

            navigation.classList.remove(
                "open"
            );

            mobileButton.classList.remove(
                "active"
            );

            mobileButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    // ========================================================
    // LIENS INTERNES
    // ========================================================

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            anchor => {

                anchor.addEventListener(
                    "click",
                    event => {

                        const href =
                            anchor.getAttribute(
                                "href"
                            );

                        if (
                            !href
                            || href === "#"
                        ) {
                            return;
                        }

                        const target =
                            document.querySelector(
                                href
                            );

                        if (!target) {
                            return;
                        }

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );

});

/* MAKASI 2.0 motion polish */
(() => {
  const cards = document.querySelectorAll(".feature, .step, .price-card, .download-box");
  cards.forEach((card, i) => {
    card.style.transitionDelay = (Math.min(i, 7) * 55) + "ms";
  });

  const finePointer = window.matchMedia("(pointer:fine)").matches;
  if (!finePointer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".feature, .step, .price-card, .showcase, .software-window").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty("--mx", (x * 4).toFixed(2) + "deg");
      el.style.setProperty("--my", (y * -4).toFixed(2) + "deg");
    });
    el.addEventListener("pointerleave", () => {
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    });
  });
})();
