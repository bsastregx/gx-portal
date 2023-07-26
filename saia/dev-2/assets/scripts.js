let html;
let header;
let headerOuterContainer;
let headerInnerContainer;
let headerNavbarHiddenMaxWidth;
let headerCenter;
let headerNav;
let headerBurger;
let headerItemAnimationDuration;
let headerNavbarHiddenMaxWidthNumber;
let test;

const contentLoaded = () => {
  /*REFERENCES TO ELEMENTS*/
  html = document.querySelector("html");
  header = document.querySelector("#saia .header");
  headerOuterContainer = document.getElementById("header-outer-container");
  headerInnerContainer = document.getElementById("header-inner-container");
  headerCenter = document.querySelector(".header__center");
  headerNav = document.getElementById("header-nav");
  headerBurger = document.getElementById("header-burger");
  headerNavbarHiddenMaxWidth = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--headerNavbarHiddenMaxWidth");
  headerNavbarHiddenMaxWidthNumber = parseFloat(
    headerNavbarHiddenMaxWidth.replace("px", "")
  );
  headerItemAnimationDuration = getComputedStyle(header).getPropertyValue(
    "--header-item-animation-duration"
  );
  headerItemAnimationDurationNumber = parseInt(headerItemAnimationDuration, 10);

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

  /*SHOW NAVBAR ITEMS*/
  setTimeout(function () {
    headerInnerContainer.classList.remove("header__inner-container--hidden");
  }, 750);

  /* 2. BURGER MENU */
  // Initialize Responsive Navbar Menu
  headerBurger?.addEventListener("click", () => {
    headerBurger?.classList.toggle("active");
    headerNav?.classList.toggle("active");
    headerCenter?.classList.toggle("active");
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

  /* 13. WATCH WINDOW SCROLL */
  resizeObserver.observe(html);
};

/*INTERSECTION OBSERVER*/
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

/*RESIZE OBSERVER*/
/* "If the user is resizing the window, add or remove an auxiliary class to the navbar to hide it for a fraction of a second, in order to prevent an undesired animation from being visible."*/
const headerResizeTimeouts = [];
const resizeObserver = new ResizeObserver((entries) => {
  const showHeaderNavbarHiddenItems = () => {
    headerOuterContainer.classList.remove(
      "header__outer-container--hidden-items"
    );
  };
  const headerIsThinner = header.classList.contains("header--thinner");
  const timeOutDelay = !headerIsThinner
    ? headerItemAnimationDurationNumber * 2
    : headerItemAnimationDurationNumber;
  for (const entry of entries) {
    const width = window.innerWidth;
    if (width <= headerNavbarHiddenMaxWidthNumber) {
      /*Clear all timeouts*/
      headerResizeTimeouts.forEach((timeOutId) => {
        clearTimeout(timeOutId);
      });
      headerOuterContainer.classList.add(
        "header__outer-container--hidden-items"
      );
    } else {
      headerResizeTimeouts.push(
        setTimeout(showHeaderNavbarHiddenItems, timeOutDelay)
      );
    }
  }
});

/*HANDLE SCROLL*/
function handleScroll() {
  /*Make header shorter*/
  if (window.scrollY <= 500) {
    header.classList.remove("header--thinner");
  } else {
    header.classList.add("header--thinner");
  }
  /*Close Navbar*/
  headerBurger?.classList.remove("active");
  headerNav?.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  contentLoaded();
});
//window.onresize = recalculateHeaderNavbarHeight;
