document.addEventListener("DOMContentLoaded", function () {
  // Code inside this function will run when the DOM is fully loaded and ready.
  // You can safely manipulate the DOM or execute JavaScript code here.

  /*=== Detect is mobile ====*/
  const isMobile =
    /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  let isMobileClass = "is-not-mobile";
  if (isMobile) {
    isMobileClass = "is-mobile";
  }

  /*=== Data ====*/
  /*local url*/
  //const baseUrlAssets = "./assets/";
  /*netlify url*/
  const baseUrlAssets = "https://converge-sticky-banner.netlify.app/assets/";
  let pageLang = document.documentElement.lang;
  if (pageLang.includes("en")) {
    pageLang = "en";
  } else if (pageLang.includes("es")) {
    pageLang = "es";
  } else if (pageLang.includes("pt")) {
    pageLang = "pt";
  } else {
    //default english
    pageLang = "en";
  }

  const gx = {
    url: {
      en: "https://converge.globant.com/?utm_source=web&utm_medium=org&utm_campaign=a-glx-st-glx-cn-converge2025-id-500224-r-all-bo-gnx-ac-tl-s-web-me-org-o-esu-bi-nap-f-ban-y-2025-m-11-t-genexuscampaign",
      es: "https://converge.globant.com/es/?utm_source=web&utm_medium=org&utm_campaign=a-glx-st-glx-cn-converge2025-id-500224-r-all-bo-gnx-ac-tl-s-web-me-org-o-esu-bi-nap-f-ban-y-2025-m-11-t-genexuscampaign",
      pt: "https://converge.globant.com/pt-br/?utm_source=web&utm_medium=org&utm_campaign=a-glx-st-glx-cn-converge2025-id-500224-r-all-bo-gnx-ac-tl-s-web-me-org-o-esu-bi-nap-f-ban-y-2025-m-11-t-genexuscampaign",
    },
    title: {
      en: "Discover how to execute AI at scale",
      es: "Descubre cómo ejecutar IA a escala",
      pt: "Descubra como executar IA em escala",
    },
    description: {
      en: "December 10 and 11 | Online",
      es: "10 y 11 de Diciembre | Online",
      pt: "10 e 11 de dezembro | Online",
    },
    register: {
      en: "Register now",
      es: "Regístrate",
      pt: "Inscreva-se",
    },
  };

  /*=== Styles ====*/
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    /* === Variables CSS === */
    :root {
      --main-padding: 16px;
      --transition-fast: 100ms;
      --transition-normal: 200ms;
      --transition-smooth: 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
      
      --color-bg-dark: #111111;
      --color-text-light: #ffffff;
      --color-accent: #71E69A;
      --color-overlay: rgba(0, 0, 0, 0.4);
      
      --border-radius: 8px;
      --max-width-desktop: 360px;
      --max-width-mobile: 315px;
    }

    /* === Font Faces === */
    @font-face {
      font-family: "Graphik";
      src: url("${baseUrlAssets}Graphik-SemiBold.woff") format("woff");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Rubik";
      src: url("${baseUrlAssets}Rubik-Light.ttf") format("truetype");
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Rubik";
      src: url("${baseUrlAssets}Rubik-SemiBold.ttf") format("truetype");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    /* === Sticky Banner === */
    #sticky-converge {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 100%;
      max-width: var(--max-width-desktop);
      z-index: 999999999;
      opacity: 1;
      text-decoration: none;
      transition: var(--transition-fast) all;
    }

    #sticky-converge.sticky-converge--hidden {
      opacity: 0;
      right: 0;
    }

    /* Override arrow position on hover-close */
    #sticky-converge.hover-close .sticky-converge__arrow {
      transform: translateX(0) !important;
    }

    /* === Article Container === */
    #sticky-converge .sticky-converge__article {
      position: relative;
      box-sizing: border-box;
      padding: 8px;
      background-color: var(--color-bg-dark);
      border: 1px solid var(--color-text-light);
      border-radius: var(--border-radius);
      color: var(--color-text-light);
      font-family: "Rubik", Arial, sans-serif;
      overflow: hidden;
    }

    /* Background layer con transición */
    #sticky-converge .sticky-converge__article::after {
      content: "";
      position: absolute;
      inset: -10%;
      background-image: image-set(
        url("${baseUrlAssets}background.webp") 1x,
        url("${baseUrlAssets}background@2x.webp") 2x,
        url("${baseUrlAssets}background@3x.webp") 3x
      );
      background-size: cover;
      background-position: center;
      transform: scale(1);
      transition: var(--transition-smooth) transform;
      z-index: 0;
    }

    #sticky-converge:hover .sticky-converge__article::after {
      transform: scale(1.1);
    }

    /* Overlay */
    #sticky-converge .sticky-converge__article::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--color-overlay);
      pointer-events: none;
      z-index: 1;
    }

    /* === Header === */
    #sticky-converge .sticky-converge__header {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
    }

    /* Header Top */
    #sticky-converge .sticky-converge__header-top {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: flex-end;
    }

    #sticky-converge .sticky-converge__close {
      padding: 0;
      background-color: transparent;
      border: 0;
      font-weight: bold;
      font-size: 18px;
      line-height: 0;
      cursor: pointer;
      transition: transform var(--transition-fast);
    }

    #sticky-converge .sticky-converge__close:hover {
      transform: scale(1.1);
    }

    #sticky-converge .sticky-converge__close:focus {
      outline: 2px solid var(--color-bg-dark);
    }

    /* Header Bottom */
    #sticky-converge .sticky-converge__header-bottom {
      padding: 0 var(--main-padding);
    }

    #sticky-converge .sticky-converge__logo {
      width: 175px;
      height: auto;
    }

    /* === Main Content === */
    #sticky-converge .sticky-converge__main {
      position: relative;
      z-index: 2;
      padding: var(--main-padding);
    }

    /* Title */
    #sticky-converge .sticky-converge__title {
      margin-block: 0 8px;
      font-family: "Graphik", sans-serif;
      font-weight: 600;
      font-size: 20px;
      line-height: 1.3;
    }

    /* Caption */
    #sticky-converge .sticky-converge__caption {
      font-family: "Rubik", sans-serif;
      font-weight: 300;
      font-size: 17px;
    }

    /* === Footer === */
    .sticky-converge__footer-bottom {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: "Rubik", sans-serif;
      font-weight: 600;
      font-size: 17px;
      color: var(--color-accent);
    }

    /* Arrow */
    #sticky-converge .sticky-converge__arrow {
      transform: translateX(0);
      transition: transform var(--transition-normal);
    }

    #sticky-converge:hover .sticky-converge__arrow {
      transform: translateX(20px);
    }

    /* === Mobile Version === */
    #sticky-converge.is-mobile {
      max-width: var(--max-width-mobile);
      bottom: 8px;
      right: 8px;
    }

    #sticky-converge.is-mobile .sticky-converge__article {
      padding: 0;
    }

    #sticky-converge.is-mobile .sticky-converge__header {
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      padding: var(--main-padding) var(--main-padding) 0 var(--main-padding);
    }

    #sticky-converge.is-mobile .sticky-converge__header-bottom {
      display: flex;
      align-items: center;
      padding: 0;
    }

    #sticky-converge.is-mobile .sticky-converge__logo {
      width: 110px;
    }

    #sticky-converge.is-mobile .sticky-converge__title {
      font-size: 17px;
    }

    #sticky-converge.is-mobile .sticky-converge__footer {

    }

    #sticky-converge.is-mobile .sticky-converge__caption {
      margin-top: 0;
      margin-bottom: 4px;
    }

    #sticky-converge.is-mobile:hover .sticky-converge__arrow {
      transform: translateX(0);
    }
  `;
  document.head.appendChild(styleTag);

  /*=== HTML ====*/
  const gxHtml = `
      <article class="sticky-converge__article">
        <header class="sticky-converge__header">
          <div class="sticky-converge__header-top">
            <button class="sticky-converge__close"> <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="white" />
                <path
                  d="M16.2352 7.76471L7.76465 16.2353M7.76465 7.76471L16.2352 16.2353"
                  stroke="#111111"
                  stroke-width="2"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg></button>
          </div>
          <div class="sticky-converge__header-bottom">
            <img
              class="sticky-converge__logo"
              src="${baseUrlAssets}globant-converge-logo.svg"
              alt="Globant Converge logo"
            />
          </div>
        </header>
        <main class="sticky-converge__main">
          <h1 class="sticky-converge__title">${gx.title[pageLang]}</h1>
          <footer class="sticky-converge__footer">
            <div class="sticky-converge__footer-top">
              <p class="sticky-converge__caption">${gx.description[pageLang]}</p>
            </div>
            <div class="sticky-converge__footer-bottom">
              ${gx.register[pageLang]}
              <svg
                class="sticky-converge__arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.11959e-07 9L12.17 9L6.58 14.59L8 16L16 8L8 -6.99382e-07L6.59 1.41L12.17 7L7.86805e-07 7L6.11959e-07 9Z"
                  fill="#71E69A"
                />
              </svg>
            </div>
          </footer>
        </main>
      </article>
  `;

  /*=== Scripts ====*/
  const stickyLink = document.createElement("a");
  stickyLink.classList.add("sticky-converge--hidden");
  stickyLink.classList.add(isMobileClass, true);
  stickyLink.setAttribute("id", "sticky-converge");
  stickyLink.setAttribute("target", "_blank");
  stickyLink.setAttribute("href", gx.url[pageLang]);
  document.body.appendChild(stickyLink);
  stickyLink.innerHTML = gxHtml;

  setTimeout(() => {
    // dsiplay with fade
    stickyLink.classList.remove("sticky-converge--hidden");
  }, 1500);

  const removeStickyBanner = () => {
    stickyLink.classList.add("sticky-converge--hidden");
    setTimeout(() => {
      stickyLink.remove();
    }, 1500);
  };

  const closeButton = document.querySelector(".sticky-converge__close");
  if (closeButton) {
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      removeStickyBanner();
    });
  }
  stickyLink.addEventListener("click", removeStickyBanner);
});
