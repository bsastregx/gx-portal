const cardsContainer = document.querySelector(".card-container");
const loadMoreBtn = document.getElementById("load-more-btn");
let totalCards = 0;
let initialCards = 0;
let remainingCards = 0;

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
  currentSize: null,
  xl: {
    below: null,
    initialCards: 3,
    cardsPerLoad: 3,
  },
  lg: {
    below: 1199,
    initialCards: 3,
    cardsPerLoad: 3,
  },
  md: {
    below: 767,
    initialCards: 3,
    cardsPerLoad: 3,
  },
  sm: {
    below: 575,
    initialCards: 3,
    cardsPerLoad: 3,
  },
};

/*--- Helper Functions ---*/
const evaluateBreakpoint = (currentWidth) => {
  if (currentWidth <= config.sm.below) {
    config.currentSize = "sm";
  } else if (currentWidth <= config.md.below) {
    config.currentSize = "md";
  } else if (currentWidth <= config.lg.below) {
    config.currentSize = "lg";
  } else {
    config.currentSize = "xl";
  }
};

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const newWidth = entry.contentRect.width;
    const newHeight = entry.contentRect.height;
    evaluateBreakpoint(newWidth);
  }
});

const init = () => {
  const totalCards = cardsContainer.querySelectorAll(":scope > *").length;
  resizeObserver.observe(cardsContainer);
};
init();

const getActualHeight = () => {
  return cardsContainer.getBoundingClientRect().height;
};

const loadMoreCards = () => {
  const actualHeight = getActualHeight();
  let additionalHeight = 0;
};

const updateRemainingCards = () => {
  remainingCards = totalCards - config[config.current].initialCards;
};

loadMoreBtn.addEventListener("click", loadMoreCards);

const setInitialHeight = () => {
  const cardsHeight = config.cardHeight;
  cardsContainer.style.height = `${cardsHeight}px`;
};

setInitialHeight();
