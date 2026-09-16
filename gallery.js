// ============================================================
// MAKASI — GALERIE PSD
// ALPHONSE DESIGN
// ============================================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ====================================================
        // ÉLÉMENTS
        // ====================================================

        const grid =
            document.getElementById(
                "psdGrid"
            );


        const search =
            document.getElementById(
                "psdSearch"
            );


        const counter =
            document.getElementById(
                "psdCount"
            );


        const counterLabel =
            document.getElementById(
                "psdCountLabel"
            );


        const empty =
            document.getElementById(
                "galleryEmpty"
            );


        if (!grid) {
            return;
        }



        // ====================================================
        // VÉRIFICATION DES DONNÉES
        // ====================================================

        if (
            typeof psdData === "undefined"
            ||
            !Array.isArray(psdData)
        ) {

            console.error(
                "Le fichier psd-data.js est introuvable ou incorrect."
            );

            return;

        }



        // ====================================================
        // SÉCURISER LE TEXTE
        // ====================================================

        function escapeHTML(value) {

            return String(value ?? "")
                .replaceAll(
                    "&",
                    "&amp;"
                )
                .replaceAll(
                    "<",
                    "&lt;"
                )
                .replaceAll(
                    ">",
                    "&gt;"
                )
                .replaceAll(
                    '"',
                    "&quot;"
                )
                .replaceAll(
                    "'",
                    "&#039;"
                );

        }



        // ====================================================
        // CRÉATION AUTOMATIQUE DES CARTES
        // ====================================================

        psdData.forEach(
            (psd, index) => {


                const number =
                    String(index + 1)
                        .padStart(
                            3,
                            "0"
                        );


                const id =
                    `psd-${number}`;


                const title =
                    psd.titre
                    || `PSD ${number}`;


                const image =
                    `assets/psd/${psd.image}`;


                const description =
                    psd.description
                    ||
                    "Fichier Photoshop modifiable prêt à être téléchargé.";


                const category =
                    psd.categorie
                    || "PSD";


                const size =
                    psd.taille
                    || "";


                const driveUrl =
                    "https://drive.google.com/uc?export=download&id="
                    +
                    encodeURIComponent(
                        psd.drive
                    );


                const article =
                    document.createElement(
                        "article"
                    );


                article.id =
                    id;


                article.className =
                    "psd-card reveal visible";


                article.dataset.title =
                    `${title} ${category}`;


                article.innerHTML = `

                    <div class="psd-thumbnail">

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(title)} — ALPHONSE DESIGN"
                            loading="lazy"
                        >

                        <span class="psd-format">
                            PSD
                        </span>

                    </div>


                    <div class="psd-card-content">


                        <div class="psd-meta">

                            <span>
                                ${escapeHTML(category)}
                            </span>

                            <span>
                                Gratuit
                            </span>

                        </div>


                        <h3>
                            ${escapeHTML(title)}
                        </h3>


                        <p>
                            ${escapeHTML(description)}
                        </p>


                        ${
                            size
                            ?
                            `
                            <div class="psd-size">
                                PSD • ${escapeHTML(size)}
                            </div>
                            `
                            :
                            ""
                        }


                        <div class="psd-actions">


                            <a
                                href="${escapeHTML(driveUrl)}"
                                class="psd-download"
                                target="_blank"
                                rel="noopener"
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >

                                    <path
                                        d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"
                                    ></path>

                                </svg>

                                Télécharger PSD

                            </a>


                            <button
                                type="button"
                                class="psd-share"
                                data-share-id="${escapeHTML(id)}"
                                data-share-title="${escapeHTML(title)}"
                                aria-label="Partager ${escapeHTML(title)}"
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >

                                    <circle
                                        cx="18"
                                        cy="5"
                                        r="3"
                                    ></circle>

                                    <circle
                                        cx="6"
                                        cy="12"
                                        r="3"
                                    ></circle>

                                    <circle
                                        cx="18"
                                        cy="19"
                                        r="3"
                                    ></circle>

                                    <path
                                        d="m8.6 10.5 6.8-4"
                                    ></path>

                                    <path
                                        d="m8.6 13.5 6.8 4"
                                    ></path>

                                </svg>

                                Partager

                            </button>


                        </div>

                    </div>

                `;


                grid.appendChild(
                    article
                );

            }
        );



        // ====================================================
        // COMPTEUR AUTOMATIQUE
        // ====================================================

        const cards =
            grid.querySelectorAll(
                ".psd-card"
            );


        if (counter) {

            counter.textContent =
                cards.length;

        }


        if (counterLabel) {

            counterLabel.textContent =
                cards.length > 1
                    ? "PSD disponibles"
                    : "PSD disponible";

        }



        // ====================================================
        // AUCUN PSD
        // ====================================================

        if (
            cards.length === 0
            &&
            empty
        ) {

            empty.style.display =
                "block";

        }



        // ====================================================
        // RECHERCHE
        // ====================================================

        if (search) {

            search.addEventListener(
                "input",
                () => {


                    const query =
                        search.value
                            .trim()
                            .toLowerCase();


                    let visible = 0;


                    cards.forEach(
                        card => {


                            const value =
                                (
                                    card.dataset.title
                                    || ""
                                )
                                .toLowerCase();


                            const match =
                                value.includes(
                                    query
                                );


                            card.style.display =
                                match
                                    ? ""
                                    : "none";


                            if (match) {

                                visible++;

                            }

                        }
                    );


                    if (empty) {

                        empty.style.display =
                            visible === 0
                                ? "block"
                                : "none";

                    }

                }
            );

        }



        // ====================================================
        // PARTAGE
        // ====================================================

        const shareButtons =
            grid.querySelectorAll(
                ".psd-share"
            );


        shareButtons.forEach(
            button => {


                button.addEventListener(
                    "click",
                    async () => {


                        const card =
                            button.closest(
                                ".psd-card"
                            );


                        if (!card) {
                            return;
                        }


                        const title =
                            button.dataset.shareTitle
                            ||
                            "PSD ALPHONSE DESIGN";


                        const psdId =
                            button.dataset.shareId;


                        const image =
                            card.querySelector(
                                ".psd-thumbnail img"
                            );


                        const baseUrl =
                            window.location.href
                                .split("#")[0];


                        const shareUrl =
                            `${baseUrl}#${psdId}`;


                        const shareText =
                            `Découvrez "${title}" dans la Galerie PSD de ALPHONSE DESIGN.`;



                        // ====================================
                        // MOBILE
                        // ====================================

                        if (
                            navigator.share
                            &&
                            (
                                window.matchMedia(
                                    "(pointer: coarse)"
                                ).matches
                                ||
                                window.innerWidth <= 900
                            )
                        ) {

                            try {

                                await navigator.share({

                                    title:
                                        `${title} — ALPHONSE DESIGN`,

                                    text:
                                        shareText,

                                    url:
                                        shareUrl

                                });

                            }

                            catch (error) {

                                if (
                                    error.name
                                    !== "AbortError"
                                ) {

                                    console.error(
                                        error
                                    );

                                }

                            }


                            return;

                        }



                        // ====================================
                        // ORDINATEUR
                        // ====================================

                        openShareModal(
                            title,
                            shareUrl,
                            image
                                ? image.src
                                : ""
                        );

                    }
                );

            }
        );



        // ====================================================
        // FENÊTRE PARTAGE
        // ====================================================

        const shareOverlay =
            document.getElementById(
                "shareOverlay"
            );


        const shareClose =
            document.getElementById(
                "shareClose"
            );


        const sharePreviewImage =
            document.getElementById(
                "sharePreviewImage"
            );


        const sharePreviewTitle =
            document.getElementById(
                "sharePreviewTitle"
            );


        const shareUrlInput =
            document.getElementById(
                "shareUrlInput"
            );


        const shareCopyButton =
            document.getElementById(
                "shareCopyButton"
            );


        const shareWhatsapp =
            document.getElementById(
                "shareWhatsapp"
            );


        const shareFacebook =
            document.getElementById(
                "shareFacebook"
            );


        const shareTelegram =
            document.getElementById(
                "shareTelegram"
            );


        const shareX =
            document.getElementById(
                "shareX"
            );



        function openShareModal(
            title,
            url,
            image
        ) {


            if (!shareOverlay) {
                return;
            }


            const encodedUrl =
                encodeURIComponent(
                    url
                );


            const text =
                `Découvrez "${title}" dans la Galerie PSD de ALPHONSE DESIGN.`;


            const encodedText =
                encodeURIComponent(
                    text
                );



            if (sharePreviewImage) {

                sharePreviewImage.src =
                    image;

                sharePreviewImage.alt =
                    title;

            }


            if (sharePreviewTitle) {

                sharePreviewTitle.textContent =
                    title;

            }


            if (shareUrlInput) {

                shareUrlInput.value =
                    url;

            }



            // WHATSAPP

            if (shareWhatsapp) {

                shareWhatsapp.href =
                    "https://wa.me/?text="
                    +
                    encodedText
                    +
                    "%20"
                    +
                    encodedUrl;

            }



            // FACEBOOK

            if (shareFacebook) {

                shareFacebook.href =
                    "https://www.facebook.com/sharer/sharer.php?u="
                    +
                    encodedUrl;

            }



            // TELEGRAM

            if (shareTelegram) {

                shareTelegram.href =
                    "https://t.me/share/url?url="
                    +
                    encodedUrl
                    +
                    "&text="
                    +
                    encodedText;

            }



            // X

            if (shareX) {

                shareX.href =
                    "https://twitter.com/intent/tweet?text="
                    +
                    encodedText
                    +
                    "&url="
                    +
                    encodedUrl;

            }



            shareOverlay.classList.add(
                "open"
            );


            shareOverlay.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "share-open"
            );

        }



        // ====================================================
        // FERMER PARTAGE
        // ====================================================

        function closeShareModal() {

            if (!shareOverlay) {
                return;
            }


            shareOverlay.classList.remove(
                "open"
            );


            shareOverlay.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "share-open"
            );

        }



        if (shareClose) {

            shareClose.addEventListener(
                "click",
                closeShareModal
            );

        }



        if (shareOverlay) {

            shareOverlay.addEventListener(
                "click",
                event => {


                    if (
                        event.target
                        === shareOverlay
                    ) {

                        closeShareModal();

                    }

                }
            );

        }



        document.addEventListener(
            "keydown",
            event => {


                if (
                    event.key
                    === "Escape"
                ) {

                    closeShareModal();

                }

            }
        );



        // ====================================================
        // COPIER
        // ====================================================

        if (
            shareCopyButton
            &&
            shareUrlInput
        ) {

            shareCopyButton.addEventListener(
                "click",
                async () => {


                    try {

                        await navigator.clipboard.writeText(
                            shareUrlInput.value
                        );


                        shareCopyButton.textContent =
                            "Copié ✓";

                    }

                    catch (error) {


                        shareUrlInput.select();


                        document.execCommand(
                            "copy"
                        );


                        shareCopyButton.textContent =
                            "Copié ✓";

                    }



                    setTimeout(
                        () => {

                            shareCopyButton.textContent =
                                "Copier";

                        },
                        1800
                    );

                }
            );

        }



        // ====================================================
        // OUVRIR LE PSD PARTAGÉ
        // ====================================================

        function openSharedPSD() {


            const hash =
                window.location.hash;


            if (!hash) {
                return;
            }


            let target;


            try {

                target =
                    document.querySelector(
                        hash
                    );

            }

            catch {

                return;

            }


            if (!target) {
                return;
            }



            setTimeout(
                () => {


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });


                    target.classList.add(
                        "psd-highlight"
                    );


                    setTimeout(
                        () => {

                            target.classList.remove(
                                "psd-highlight"
                            );

                        },
                        2500
                    );

                },
                300
            );

        }



        openSharedPSD();


        window.addEventListener(
            "hashchange",
            openSharedPSD
        );


    }
);