document.addEventListener("DOMContentLoaded", function () {
  // Code inside this function will run when the DOM is fully loaded and ready.
  // You can safely manipulate the DOM or execute JavaScript code here.
  console.log("content loaded");

  const stickyGx30Html = `
  <a href="www.google.com" id="sticky-gx30">
      <article class="sticky-gx30__article">
        <header class="sticky-gx30__header">
          <div class="sticky-gx30__header-top">
            <button class="sticky-gx30__close">✖</button>
          </div>
          <div class="sticky-gx30__header-bottom">
            <img
              class="sticky-gx30__logo"
              src="./assets/gx-30-squared.svg"
              alt="GX30 logo"
            />
          </div>
        </header>
        <main class="sticky-gx30__main">
          <h1 class="sticky-gx30__title">GeneXus Meeting 30 is coming</h1>
          <footer class="sticky-gx30__footer">
            <div class="sticky-gx30__footer-top">
              <p class="sticky-gx30__caption">Save the date.</p>
            </div>
            <div class="sticky-gx30__footer-bottom">
              <img
                class="sticky-gx30__arrow"
                src="./assets/arrow.svg"
                alt="arrow icon"
              />
            </div>
          </footer>
        </main>
      </article>
    </a>
`;
  const stickyGx30Container = document.createElement("div");
  const body = document.querySelector("body");
});
