const contentLoaded = () => {
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
  // Initialize All Required DOM Element
  const headerBurger = document.getElementById("header-burger");
  const headerNav = document.getElementById("header-nav");

  // Initialize Responsive Navbar Menu
  headerBurger?.addEventListener("click", () => {
    headerBurger?.classList.toggle("active");
    headerNav?.classList.toggle("active");
  });

  /* 3. ANIMATE STEPS */
  const lazyImages = [];
  let lastSection;
  const steps = document.querySelectorAll("#steps section");
  if (steps?.length) {
    steps.forEach((step, i) => {
      const img = step.querySelector("img");
      if (img) {
        img.classList.add("animate", "animate--hidden");
        lazyImages.push(img);
      }
      if (i === steps.length - 1) {
        lastSection = step;
      }
    });
  }

  /* 4. IO */
  io(lazyImages);

  /* 5. DETECT MOUSEENTER OR TOUCHSTART ON LAST SECTION */
  /*It might happen that the image of the last section's intersection observer condition is not met (the center of the image has to reach the center of the viewport). By adding a mouseenter/touchstart event to the last section, we provide a fallback method to load and display the image.*/
  const lazyLoadLastSectionImage = () => {
    const lazyImage = lastSection.querySelector("img");
    if (lazyImage.dataset.src) {
      setTimeout(() => {
        lazyImage.src = lazyImage.dataset.src;
      }, 250);
    }
  };
  if (lastSection) {
    lastSection.addEventListener("mouseenter", lazyLoadLastSectionImage);
    lastSection.addEventListener("touchstart", lazyLoadLastSectionImage);
  }

  /* 6. GO TO TOP */
  const backToTop = document.getElementById("back-to-top");
  console.log(backToTop);
  backToTop?.addEventListener("click", function () {
    console.log("back to top");
    window.scrollTo(0, 0);
  });
};

const io = (lazyImages) => {
  const options = {
    rootMargin: "0px 0px -50% 0px",
    threshold: 0.5, // half of item height
  };

  /** Then we set up a intersection observer watching over those images and whenever any of those becomes visible on the view then replace the placeholder image with actual one, remove the non-loaded class and then unobserve for that element **/
  let lazyImageObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      let lazyImage = entry.target;
      lazyImage.addEventListener("load", function (e) {
        lazyImage.classList.remove("animate--hidden");
      });
      if (entry.isIntersecting && lazyImage.dataset.src) {
        lazyImage.src = lazyImage.dataset.src;
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  },
  options);
  /** Now observe all the non-loaded images using the observer we have setup above **/
  lazyImages.forEach(function (lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  contentLoaded();
});
