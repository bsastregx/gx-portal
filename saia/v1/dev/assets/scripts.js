let headerBurger;
let headerNav;

const contentLoaded = () => {
  /*REFERENCES TO ELEMENTS*/
  headerBurger = document.getElementById("header-burger");
  headerNav = document.getElementById("header-nav");

  /*SHOW PAGE*/
  const saia = document.getElementById("saia");
  saia?.classList.remove("saia-hidden");

  /* 1. HEADER LIST ITEMS ANIMATION */
  const navItems = document.querySelectorAll("#header-nav .header__list-item");
  navItems?.forEach((navItem) => {
    navItem.addEventListener("mouseenter", function () {
      navItem.classList.add("header__list-item--hovered");
    });
    navItem.addEventListener("mouseleave", function () {
      navItem.classList.add("header__list-item--animated");
      setTimeout(() => {
        navItem.classList.add("header__list-item--no-transition");
        navItem.classList.remove("header__list-item--animated");
        navItem.classList.remove("header__list-item--hovered");
        setTimeout(() => {
          navItem.classList.remove("header__list-item--no-transition");
        }, 10);
      }, 260);
    });
  });

  /* 2. BURGER MENU */
  // Initialize Responsive Navbar Menu
  headerBurger?.addEventListener("click", () => {
    headerBurger?.classList.toggle("active");
    headerNav?.classList.toggle("active");
  });

  /* 3. ANIMATE STEPS */
  const observableImages = [];
  let lastSection;
  const steps = document.querySelectorAll("#steps section");
  if (steps?.length) {
    steps.forEach((step, i) => {
      const img = step.querySelector("img");
      if (img) {
        img.classList.add("animate", "animate--hidden");
        observableImages.push(img);
      }
      if (i === steps.length - 1) {
        lastSection = step;
      }
    });
  }

  /* 4. IO */
  io(observableImages);

  /* 5. DETECT MOUSEENTER OR TOUCHSTART ON LAST SECTION */
  /*It might happen that the image of the last section's intersection observer condition is not met (the center of the image has to reach the center of the viewport). By adding a mouseenter/touchstart event to the last section, we provide a fallback method to load and display the image.*/
  const showLastSectionImage = () => {
    const image = lastSection.querySelector("img");
    setTimeout(() => {
      image.classList.remove("animate--hidden");
    }, 250);
  };
  if (lastSection) {
    lastSection.addEventListener("mouseenter", showLastSectionImage);
    lastSection.addEventListener("touchstart", showLastSectionImage);
  }

  /* 6. GO TO TOP */
  const backToTop = document.getElementById("back-to-top");
  backToTop?.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });

  /* 7. TRUNCATE SELECT OPTIONS TO PREVENT OVERFLOW / SAVE REFERENCE TO FIRST FORM ITEM TO USE LATER*/
  window.addEventListener("message", function (event) {
    if (
      event.data.type === "hsFormCallback" &&
      event.data.eventName === "onFormReady"
    ) {
      firstFormItem = document.querySelector(
        ".hbspt-form .hs-form-field .hs-input"
      );
      const countryOptions = document.querySelectorAll(
        ".hs_country select option"
      );
      countryOptions.forEach((country) => {
        const text = country.textContent;
        const textLength = text.length;
        const limit = 25;
        textLength > limit
          ? (country.textContent = `${text.slice(0, limit)}...`)
          : null;
      });
    }
  });

  /* 8. SET FOCUS ON THE FIRST FORM ITEM*/
  const formAnchors = document.querySelectorAll(".go-to-form");
  formAnchors?.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const firstInput = document.querySelector(".hbspt-form input");
      firstInput?.focus();
    });
  });

  /* 9. DISABLE LAZY LOADING TO FIX SCROLLING ISSUES */
  /*Disable Lazy loading because it is interfering with the auto-scroll. Keep lazy loading on html for non-javascript users.*/
  const lazyLoadedImages = document.querySelectorAll('img[loading="lazy"]');
  lazyLoadedImages.forEach((img) => {
    img.setAttribute("loading", "eager");
  });

  /* 10. HANDLE SCROLL*/
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  /* 11. TRANSLATIONS*/
  const translatableElements = document.querySelectorAll("[data-en]");
  const langSwitcher = document.getElementById("header-langs");
  langSwitcher.addEventListener("click", function () {
    const currentLang = langSwitcher.getAttribute("data-current-lang");
    let newLang = undefined;
    if (currentLang === "es") {
      newLang = "en";
    } else if (currentLang === "en") {
      newLang = "es";
    }
    langSwitcher.setAttribute("data-current-lang", newLang);

    switchLang(newLang);
  });
  const switchLang = (newLang) => {
    translatableElements?.forEach((el) => {
      const en = el.getAttribute("data-en");
      const es = el.getAttribute("data-es");
      if (newLang === "es" && es) {
        el.textContent = es;
      } else if (newLang === "en" && en) {
        el.textContent = en;
      }
    });
  };
  /*show langs switcher*/
  const listenToKeydownOnDocument = (e) => {
    const key = e.key.toLowerCase();
    typed = (typed + key).replaceAll(" ", "");
    console.log(typed);
    if (typed.includes(password)) {
      const langSwitcher = document.getElementById("header-langs");
      langSwitcher.style.display = "flex";
      document.removeEventListener("keydown", listenToKeydownOnDocument);
    }
  };
  const password = "idiomas";
  let typed = "";
  document.addEventListener("keydown", listenToKeydownOnDocument);

  /* 12. CLOSE HEADER CONTAINER AFTER CLICKING A LINK*/
  const headerLinks = document.querySelectorAll("#header-navbar a");
  headerLinks.forEach((link) => {
    link.addEventListener("click", function () {
      headerBurger?.classList.remove("active");
      headerNav?.classList.remove("active");
    });
  });
};

/*IO*/
const io = (observableImages) => {
  const options = {
    rootMargin: "0px 0px -35% 0px",
    threshold: 0.35, // half of item height
  };

  /** Then we set up a intersection observer watching over those images and whenever any of those becomes visible on the view then replace the placeholder image with actual one, remove the non-loaded class and then unobserve for that element **/
  let Observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      let image = entry.target;
      if (entry.isIntersecting) {
        image.classList.remove("animate--hidden");
        Observer.unobserve(image);
      }
    });
  }, options);
  /** Now observe all the non-loaded images using the observer we have setup above **/
  observableImages.forEach(function (image) {
    Observer.observe(image);
  });
};

/*HANDLE SCROLL*/
function handleScroll() {
  /*Make header shorter*/
  const headerContainer = document.querySelector("#saia .header__container");
  if (window.scrollY <= 500) {
    headerContainer.classList.remove("header__container--thinner");
  } else {
    headerContainer.classList.add("header__container--thinner");
  }
  /*Close Navbar*/
  headerBurger?.classList.remove("active");
  headerNav?.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  contentLoaded();
});
//window.onresize = recalculateHeaderNavbarHeight;
