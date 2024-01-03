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
  const baseUrlAssets = "https://gx-sticky-banner.netlify.app/assets/";
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
      en: "https://www.genexus.com/en/meetings/meeting2023",
      es: "https://www.genexus.com/es/encuentros/encuentro2023",
      pt: "https://www.genexus.com/pt/encontros/encontro2023",
    },
    title: {
      en: "¡Relive the meeting!",
      es: "¡Revive el encuentro!",
      pt: "¡Reviva o encontro!",
    },
    description: {
      en: "All online talks.",
      es: "Todas las charlas online.",
      pt: "Todas as palestras online.",
    },
  };

  /*=== Styles ====*/
  const gxStyleTag = document.createElement("style");
  gxStyleTag.innerHTML = `
    @font-face {
      font-family: "Graphik Semibold";
      src: url(${baseUrlAssets}graphik-semibold.woff);
    }
    @font-face {
      font-family: "Rubik Light";
      src: url(${baseUrlAssets}rubik-light.ttf);
    }
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
    #toggle-mobile {
      position: fixed;
      left: 16px;
      top: 16px;
    }
    /*--- Sticky banner ---*/
    #sticky-gx {
      text-decoration: none;
      color: #111111;
      position: fixed;
      bottom: 26px;
      left: 26px;
      transition: 100ms all;
      opacity: 1;
      width: 100%;
      max-width: 265px;
      z-index: 999999999;
      cursor: pointer;
    
      --main-padding: 16px;
    }
    #sticky-gx:focus {
      outline:none;
    }
    #sticky-gx:focus .sticky-gx__article{
      border-color: #0F62FE;
      outline: 1px solid #0F62FE;
    }
    /*article*/
    #sticky-gx .sticky-gx__article {
      background-color: #fff;
      border: 1px solid #111111;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 8px;
      font-family: "Rubik Light", "Rubik Regular", Arial, sans-serif;
    }
    #sticky-gx:hover {
      transform: scale(1.025);
    }
    #sticky-gx.sticky-gx--hidden {
      opacity: 0;
      left: 0;
    }
    /*header*/
    #sticky-gx .sticky-gx__header {
      display: flex;
      flex-direction: column;
    }
    /*header top*/
    #sticky-gx .sticky-gx__header-top {
      display: flex;
      justify-content: end;
    }
    #sticky-gx .sticky-gx__close {
      background-color: transparent;
      border: 0;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
      padding:0;
      line-height:0;
    }
    #sticky-gx .sticky-gx__close:hover {
      transform: scale(1.25);
    }
    #sticky-gx .sticky-gx__close:focus {
      outline: none;
    }
    /*header bottom*/
    #sticky-gx .sticky-gx__header-bottom {
      padding: 0 var(--main-padding);
    }
    #sticky-gx .sticky-gx__logo {
      width: 80px;
      height: auto;
    }
    /*main*/
    #sticky-gx .sticky-gx__main {
      padding: var(--main-padding);
    }
    /*title*/
    #sticky-gx .sticky-gx__title {
      font-size:20px;
      line-height:1.3em;
      font-family: "Graphik Semibold", Arial, sans-serif;
      margin-block-start: 0;
      margin-block-end: 8px;
    }
    /*paragraph*/
    #sticky-gx .sticky-gx__caption {
      font-size: 17px;
      font-weight: 300;
      line-height:1.425em;
      font-family: 'Rubik', sans-serif;
    }
    /*--- Mobile version ---*/
    #sticky-gx.is-mobile {
      max-width: calc(100% - 52px);
    }
    #sticky-gx.is-mobile .sticky-gx__article {
      padding: 0;
    }
    #sticky-gx.is-mobile .sticky-gx__header {
      padding: var(--main-padding) var(--main-padding) 0 var(--main-padding);
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
    }
    #sticky-gx.is-mobile .sticky-gx__header-bottom {
      display: flex;
      align-items: center;
      padding: 0;
    }
    #sticky-gx.is-mobile .sticky-gx__logo {
      width: 40px;
      height: auto;
    }
    #sticky-gx.is-mobile .sticky-gx__close {
      position: relative;
      top: -13px;
      right: -8px;
    }
    #sticky-gx.is-mobile .sticky-gx__footer {
      display: flex;
      align-items: end;
    }
    #sticky-gx.is-mobile .sticky-gx__caption {
      margin: 0;
    }
    
  `;
  document.head.appendChild(gxStyleTag);

  /*=== HTML ====*/
  const gxHtml = `
      <article class="sticky-gx__article">
        <header class="sticky-gx__header">
          <div class="sticky-gx__header-top">
            <button class="sticky-gx__close"><img
            class="sticky-gx__close-img"
            src="${baseUrlAssets}close.svg"
            alt="GX logo"
          /></button>
          </div>
          <div class="sticky-gx__header-bottom">
            <img
              class="sticky-gx__logo"
              src="${baseUrlAssets}gx-30-squared.svg"
              alt="GX logo"
            />
          </div>
        </header>
        <main class="sticky-gx__main">
          <h1 class="sticky-gx__title">${gx.title[pageLang]}</h1>
          <footer class="sticky-gx__footer">
            <div class="sticky-gx__footer-top">
              <p class="sticky-gx__caption">${gx.description[pageLang]}</p>
            </div>
            <div class="sticky-gx__footer-bottom">
              <img
                class="sticky-gx__arrow"
                src="${baseUrlAssets}arrow.svg"
                alt="arrow icon"
              />
            </div>
          </footer>
        </main>
      </article>
  `;

  /*=== Scripts ====*/
  const stickyLink = document.createElement("a");
  stickyLink.setAttribute("id", "sticky-gx");
  stickyLink.classList.add("sticky-gx--hidden", isMobileClass);
  stickyLink.setAttribute("target", "_blank");
  stickyLink.setAttribute("href", gx.url[pageLang]);
  document.body.appendChild(stickyLink);
  stickyLink.innerHTML = gxHtml;
  setTimeout(() => {
    stickyLink.classList.remove("sticky-gx--hidden");
  }, 1000);

  const removeStickyBanner = () => {
    stickyLink.classList.add("sticky-gx--hidden");
    setTimeout(() => {
      stickyLink.remove();
    }, 1000);
  };

  const closeButton = document.querySelector(".sticky-gx__close");
  if (closeButton) {
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      removeStickyBanner();
    });
  }
  stickyLink.addEventListener("click", removeStickyBanner);
});
