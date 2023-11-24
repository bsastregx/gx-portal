document.addEventListener("DOMContentLoaded",(function(){let n="is-not-mobile";/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(n="is-mobile");const t="https://gx30-sticky-banner.netlify.app/assets/";let e=document.documentElement.lang;e=e.includes("en")?"en":e.includes("es")?"es":e.includes("pt")?"pt":"en";const i={url:{en:"https://www.genexus.com/en/meetings/meeting2023",es:"https://www.genexus.com/es/encuentros/encuentro2023",pt:"https://www.genexus.com/pt/encontros/encontro2023"},title:{en:"¡Reserve your spot at GX30, GeneXus Meeting!",es:"¡Reserva tu lugar en el GX30, Encuentro GeneXus!",pt:"¡Reserve o seu lugar no GX30, Encontro GeneXus!"},description:{en:"Register for free now.",es:"Regístrate gratis ya.",pt:"Registre-se gratuitamente agora."}},s=document.createElement("style");s.innerHTML=`\n    @font-face {\n      font-family: "Graphik Semibold";\n      src: url(${t}graphik-semibold.woff);\n    }\n    @font-face {\n      font-family: "Rubik Light";\n      src: url(${t}rubik-light.ttf);\n    }\n    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');\n    #toggle-mobile {\n      position: fixed;\n      left: 16px;\n      top: 16px;\n    }\n    /*--- Sticky banner ---*/\n    #sticky-gx30 {\n      text-decoration: none;\n      color: #111111;\n      position: fixed;\n      bottom: 26px;\n      left: 26px;\n      transition: 100ms all;\n      opacity: 1;\n      width: 100%;\n      max-width: 265px;\n      z-index: 999999999;\n      cursor: pointer;\n    \n      --main-padding: 16px;\n    }\n    #sticky-gx30:focus {\n      outline:none;\n    }\n    #sticky-gx30:focus .sticky-gx30__article{\n      border-color: #0F62FE;\n      outline: 1px solid #0F62FE;\n    }\n    /*article*/\n    #sticky-gx30 .sticky-gx30__article {\n      background-color: #fff;\n      border: 1px solid #111111;\n      border-radius: 8px;\n      box-sizing: border-box;\n      padding: 8px;\n      font-family: "Rubik Light", "Rubik Regular", Arial, sans-serif;\n    }\n    #sticky-gx30:hover {\n      transform: scale(1.025);\n    }\n    #sticky-gx30.sticky-gx30--hidden {\n      opacity: 0;\n      left: 0;\n    }\n    /*header*/\n    #sticky-gx30 .sticky-gx30__header {\n      display: flex;\n      flex-direction: column;\n    }\n    /*header top*/\n    #sticky-gx30 .sticky-gx30__header-top {\n      display: flex;\n      justify-content: end;\n    }\n    #sticky-gx30 .sticky-gx30__close {\n      background-color: transparent;\n      border: 0;\n      font-weight: bold;\n      font-size: 18px;\n      cursor: pointer;\n      padding:0;\n      line-height:0;\n    }\n    #sticky-gx30 .sticky-gx30__close:hover {\n      transform: scale(1.25);\n    }\n    #sticky-gx30 .sticky-gx30__close:focus {\n      outline: none;\n    }\n    /*header bottom*/\n    #sticky-gx30 .sticky-gx30__header-bottom {\n      padding: 0 var(--main-padding);\n    }\n    #sticky-gx30 .sticky-gx30__logo {\n      width: 80px;\n      height: auto;\n    }\n    /*main*/\n    #sticky-gx30 .sticky-gx30__main {\n      padding: var(--main-padding);\n    }\n    /*title*/\n    #sticky-gx30 .sticky-gx30__title {\n      font-size:20px;\n      line-height:1.3em;\n      font-family: "Graphik Semibold", Arial, sans-serif;\n      margin-block-start: 0;\n      margin-block-end: 8px;\n    }\n    /*paragraph*/\n    #sticky-gx30 .sticky-gx30__caption {\n      font-size: 17px;\n      font-weight: 300;\n      line-height:1.425em;\n      font-family: 'Rubik', sans-serif;\n    }\n    /*--- Mobile version ---*/\n    #sticky-gx30.is-mobile {\n      max-width: calc(100% - 52px);\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__article {\n      padding: 0;\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__header {\n      padding: var(--main-padding) var(--main-padding) 0 var(--main-padding);\n      flex-direction: row-reverse;\n      justify-content: space-between;\n      align-items: center;\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__header-bottom {\n      display: flex;\n      align-items: center;\n      padding: 0;\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__logo {\n      width: 40px;\n      height: auto;\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__close {\n      position: relative;\n      top: -13px;\n      right: -8px;\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__footer {\n      display: flex;\n      align-items: end;\n    }\n    #sticky-gx30.is-mobile .sticky-gx30__caption {\n      margin: 0;\n    }\n    \n  `,document.head.appendChild(s);const o=`\n      <article class="sticky-gx30__article">\n        <header class="sticky-gx30__header">\n          <div class="sticky-gx30__header-top">\n            <button class="sticky-gx30__close"><img\n            class="sticky-gx30__close-img"\n            src="${t}close.svg"\n            alt="GX30 logo"\n          /></button>\n          </div>\n          <div class="sticky-gx30__header-bottom">\n            <img\n              class="sticky-gx30__logo"\n              src="${t}gx-30-squared.svg"\n              alt="GX30 logo"\n            />\n          </div>\n        </header>\n        <main class="sticky-gx30__main">\n          <h1 class="sticky-gx30__title">${i.title[e]}</h1>\n          <footer class="sticky-gx30__footer">\n            <div class="sticky-gx30__footer-top">\n              <p class="sticky-gx30__caption">${i.description[e]}</p>\n            </div>\n            <div class="sticky-gx30__footer-bottom">\n              <img\n                class="sticky-gx30__arrow"\n                src="${t}arrow.svg"\n                alt="arrow icon"\n              />\n            </div>\n          </footer>\n        </main>\n      </article>\n  `,c=document.createElement("a");c.setAttribute("id","sticky-gx30"),c.classList.add("sticky-gx30--hidden",n),c.setAttribute("target","_blank"),c.setAttribute("href",i.url[e]),document.body.appendChild(c),c.innerHTML=o,setTimeout((()=>{c.classList.remove("sticky-gx30--hidden")}),1e3);const a=()=>{c.classList.add("sticky-gx30--hidden"),setTimeout((()=>{c.remove()}),1e3)},r=document.querySelector(".sticky-gx30__close");r&&r.addEventListener("click",(function(n){n.preventDefault(),a()})),c.addEventListener("click",a)}));