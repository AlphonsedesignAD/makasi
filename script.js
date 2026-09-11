// ============================================================
// MAKASI WEBSITE
// ============================================================


// ------------------------------------------------------------
// NAVBAR
// ------------------------------------------------------------

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

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


window.addEventListener(
    "scroll",
    updateNavbar
);


updateNavbar();


// ------------------------------------------------------------
// REVEAL
// ------------------------------------------------------------

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
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

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


// ------------------------------------------------------------
// FAQ
// ------------------------------------------------------------

document
    .querySelectorAll(
        ".faq-question"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        button.parentElement;

                    const alreadyOpen =
                        item.classList.contains(
                            "open"
                        );

                    document
                        .querySelectorAll(
                            ".faq-item"
                        )
                        .forEach(
                            other => {

                                other.classList.remove(
                                    "open"
                                );

                            }
                        );

                    if (!alreadyOpen) {

                        item.classList.add(
                            "open"
                        );

                    }

                }
            );

        }
    );


// ------------------------------------------------------------
// MOBILE MENU
// ------------------------------------------------------------

const mobileButton =
    document.getElementById(
        "mobileMenu"
    );


const navigation =
    document.querySelector(
        ".nav-links"
    );


mobileButton.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "open"
        );

    }
);


navigation
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                }
            );

        }
    );