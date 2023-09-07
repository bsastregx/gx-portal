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
  const baseUrlAssets = "https://gx30-sticky-banner.netlify.app/assets/";
  const pageLang = document.documentElement.lang;
  const gx30 = {
    url: {
      en: "https://www.addevent.com/event/NM17045529",
      es: "https://www.addevent.com/event/dm17045495",
      pt: "https://www.addevent.com/event/Ea17045544",
    },
    title: {
      en: "GeneXus Meeting 30 is coming",
      es: "GeneXus Meeting 30 se acerca",
      pt: "GeneXus Meeting 30 está chegando",
    },
    description: {
      en: "Save the date.",
      es: "Reserva la fecha.",
      pt: "Guarde a data.",
    },
  };

  /*=== Styles ====*/
  const gx30StyleTag = document.createElement("style");
  gx30StyleTag.innerHTML = `
  @font-face {
    font-family: Graphik;
    src: url(${baseUrlAssets}graphik.woff);
  }
  @font-face {
    font-family: Rubik;
    src: url(${baseUrlAssets}rubik.ttf);
  }
  body {
    height: 2400px;
    background-color: rgb(234, 234, 234);
  }
  #toggle-mobile {
    position: fixed;
    left: 16px;
    top: 16px;
  }
  /*--- Sticky banner ---*/
  #sticky-gx30 {
    text-decoration: none;
    color: #111111;
    transition: 200ms all;
    position: fixed;
    bottom: 16px;
    left: 16px;
    transition: 100ms all;
    opacity: 1;
    width: 100%;
    max-width: 265px;
    z-index: 999999999;
  
    --main-padding: 16px;
  }
  /*article*/
  #sticky-gx30 .sticky-gx30__article {
    background-color: #fff;
    border: 1px solid #111111;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 8px;
    font-family: "Rubik", Arial, sans-serif;
  }
  #sticky-gx30:hover .sticky-gx30__article {
    background-color: #ebeff7;
    border-color: #0f62fe;
  }
  #sticky-gx30.hidden {
    opacity: 0;
    left: 0;
  }
  /*override arrow position*/
  #sticky-gx30.hover-close .sticky-gx30__arrow {
    transform: translateX(0) !important;
  }
  /*header*/
  #sticky-gx30 .sticky-gx30__header {
    display: flex;
    flex-direction: column;
  }
  /*header top*/
  #sticky-gx30 .sticky-gx30__header-top {
    display: flex;
    justify-content: end;
  }
  #sticky-gx30 .sticky-gx30__close {
    background-color: transparent;
    border: 0;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
  }
  #sticky-gx30 .sticky-gx30__close:hover {
    transform: scale(1.1);
  }
  #sticky-gx30 .sticky-gx30__close:focus {
    outline: 2px solid #111111;
  }
  /*header bottom*/
  #sticky-gx30 .sticky-gx30__header-bottom {
    padding: 0 var(--main-padding);
  }
  #sticky-gx30 .sticky-gx30__logo {
    width: 80px;
    height: auto;
  }
  /*main*/
  #sticky-gx30 .sticky-gx30__main {
    padding: var(--main-padding);
  }
  /*title*/
  #sticky-gx30 .sticky-gx30__title {
    font-family: Graphik, Arial, sans-serif;
    margin-block-start: 0;
    margin-block-end: 8px;
  }
  /*paragraph*/
  #sticky-gx30 .sticky-gx30__caption {
    font-size: 18px;
  }
  /*arrow*/
  #sticky-gx30 .sticky-gx30__arrow {
    transition: 200ms transform;
    transform: translateX(0);
  }
  #sticky-gx30:hover .sticky-gx30__arrow {
    transform: translateX(20px);
  }
  /*--- Mobile version ---*/
  #sticky-gx30.is-mobile {
    max-width: 315px;
  }
  #sticky-gx30.is-mobile .sticky-gx30__article {
    padding: 0;
  }
  #sticky-gx30.is-mobile .sticky-gx30__header {
    padding: var(--main-padding) var(--main-padding) 0 var(--main-padding);
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
  #sticky-gx30.is-mobile .sticky-gx30__header-bottom {
    display: flex;
    align-items: center;
    padding: 0;
  }
  #sticky-gx30.is-mobile .sticky-gx30__logo {
    width: 40px;
    height: auto;
  }
  #sticky-gx30.is-mobile .sticky-gx30__footer {
    display: flex;
    justify-content: space-between;
  }
  #sticky-gx30.is-mobile:hover .sticky-gx30__arrow {
    transform: translateX(0);
  }
  #sticky-gx30.is-mobile .sticky-gx30__caption {
    margin: 0;
  }
  
`;
  document.head.appendChild(gx30StyleTag);

  /*=== HTML ====*/
  const gx30Html = `
    <article class="sticky-gx30__article">
      <header class="sticky-gx30__header">
        <div class="sticky-gx30__header-top">
          <button class="sticky-gx30__close">✖</button>
        </div>
        <div class="sticky-gx30__header-bottom">
          <img
            class="sticky-gx30__logo"
            src="${baseUrlAssets}gx-30-squared.svg"
            alt="GX30 logo"
          />
        </div>
      </header>
      <main class="sticky-gx30__main">
        <h1 class="sticky-gx30__title">${gx30.title[pageLang]}</h1>
        <footer class="sticky-gx30__footer">
          <div class="sticky-gx30__footer-top">
            <p class="sticky-gx30__caption">${gx30.description[pageLang]}</p>
          </div>
          <div class="sticky-gx30__footer-bottom">
            <img
              class="sticky-gx30__arrow"
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
  stickyLink.setAttribute("id", "sticky-gx30");
  stickyLink.classList.add("hidden", isMobileClass);
  stickyLink.setAttribute("target", "_blank");
  stickyLink.setAttribute("href", gx30.url[pageLang]);
  document.body.appendChild(stickyLink);
  stickyLink.innerHTML = gx30Html;
  setTimeout(() => {
    stickyLink.classList.remove("hidden");
  }, 1000);

  const removeStickyBanner = () => {
    stickyLink.classList.add("hidden");
    setTimeout(() => {
      stickyLink.remove();
    }, 1000);
  };

  const closeButton = document.querySelector(".sticky-gx30__close");
  if (closeButton) {
    closeButton.addEventListener("mouseenter", function (e) {
      stickyLink.classList.add("hover-close");
    });
    closeButton.addEventListener("mouseout", function (e) {
      stickyLink.classList.remove("hover-close");
    });
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      removeStickyBanner();
    });
  }
  stickyLink.addEventListener("click", removeStickyBanner);
});
