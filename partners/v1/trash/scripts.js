const cardsContainer = document.querySelector(".card-container");
const loadMoreBtn = document.getElementById("load-more-btn");
totalCards = cardsContainer.querySelectorAll(":scope > *").length;
let visibleCards = 0;
let remainingCards = totalCards;

/* obtener altura de fila */
const getCardsHeight = () => {
  /*Podemos obtenerla preguntando la altura de cualquier tarjeta
  ya que por css estamos forzando a que la altura de todas las tarjetas sea la misma.*/
  const firstCard = cardsContainer.firstElementChild;
  return firstCard.getBoundingClientRect().height;
};

/* config */
const config = {
  cardHeight: getCardsHeight(),
  prevSize: null,
  currentSize: null,
  xl: {
    below: null,
    cardsPerLoad: 8,
    cardsPerRow: 4,
  },
  lg: {
    below: 1199,
    cardsPerLoad: 9,
    cardsPerRow: 3,
  },
  md: {
    below: 767,
    cardsPerLoad: 8,
    cardsPerRow: 2,
  },
  sm: {
    below: 575,
    cardsPerLoad: 8,
    cardsPerRow: 1,
  },
};

/*--- Helper Functions ---*/

const evaluateBreakpoint = (currentWidth) => {
  if (currentWidth <= config.sm.below) {
    config.prevSize = config.currentSize;
    config.currentSize = "sm";
  } else if (currentWidth <= config.md.below) {
    config.prevSize = config.currentSize;
    config.currentSize = "md";
  } else if (currentWidth <= config.lg.below) {
    config.prevSize = config.currentSize;
    config.currentSize = "lg";
  } else {
    config.prevSize = config.currentSize;
    config.currentSize = "xl";
  }
};

/**
 * Esta función actualiza 'visibleCards' y 'remainingCards' cuando hay un cambio de breakpoint.
 */
const evaluateCardsOnResize = () => {
  let diff = 0;
  if (config.prevSize) {
    diff =
      config[config.currentSize].cardsPerLoad -
      config[config.prevSize].cardsPerLoad;
  }
  if (diff !== 0) {
    //evaluate cards.
    visibleCards += diff;
    remainingCards -= diff;
  }
};

/**
 * Esta función actualiza la altura del cardsContainer.
 */
const evaluateHeight = () => {
  console.log(visibleCards);
};

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const newWidth = entry.contentRect.width;
    evaluateBreakpoint(newWidth);
    if (config.prevSize && config.prevSize !== config.currentSize) {
      /*Solo evaluar las cards (cantidad de visibles y restantes) y altura del contenedor si hubo un cambio de breakpoint.*/
      evaluateCardsOnResize();
      evaluateHeight();
    }
  }
});

const init = () => {
  resizeObserver.observe(cardsContainer);
  evaluateHeight();
};
init();

const updateRemainingCards = () => {
  remainingCards = totalCards - config[config.currentSize].initialCards;
};

const getActualHeight = () => {
  return cardsContainer.getBoundingClientRect().height;
};

const loadMoreCards = () => {
  const actualHeight = getActualHeight();
  let additionalHeight = 0;
  //console.log(remainingCards);
};

loadMoreBtn.addEventListener("click", loadMoreCards);
