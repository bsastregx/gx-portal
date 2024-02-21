/************************
References 
************************/

const html = document.querySelector("html");

//El wrapper externo de los selects | .row--selects-outer-wrapper
let rowSelectsOuterWrapper = this.document.querySelector(
  ".row--selects-outer-wrapper"
);

//El wrapper interno de los selects | .row--selects-inner-wrapper
let rowSelectsInnerWrapper = this.document.querySelector(
  ".row--selects-inner-wrapper"
);

//Evento que se dispara cuando el mouse abandona el botón (.gx-label--multi-checkbox) que abre el select.
let labelMouseLeaveHandler;

//Evento que se dispara cuando el mouse abandona el select (multi-checkbox).
let multiCheckboxMouseLeaveHandler;

//Evento que se dispara cuando el mouse entra en el select (multi-checkbox).
let multiCheckboxMouseEnterHandler;

//Referencia a un setTimeout, que se usa para evitar que el select se cierre después de 'timeBeforeCloseSelect' si el puntero volvió a entrar antes de ese tiempo.
let timeOutHideSelectRef;

/*--- .gx-label--multi-checkbox ---*/
const multiCheckboxesLabel = Array.from(
  document.querySelectorAll(".gx-label--multi-checkbox")
);

//Referencias a los selects (multi-checkboxes). Ej. Category | Partner Types | Industries | Services, etc...
let multiCheckboxes = Array.from(
  document.querySelectorAll(".gx-multi-checkbox")
);

/************************
Variables
************************/

//Tiempo que se usa para la transición que anima la altura del select (multi-checkbox).
const selectHeightTransition = 150;

//Tiempo de espera antes de cerrar el select luego que el puntero del mouse lo abandonó. Se cancela si el puntero vuelve a entrar antes.
const timeBeforeCloseSelect = 400;

//Tiempo que se usa para la velocidad de apertura/cierre del select (multi-checkbox)
html.style.setProperty(
  "--gx-select-transition-height-speed",
  `${selectHeightTransition}ms`
);

/**************************************************
Handlers (Must be defined before "Event Listeners")
**************************************************/
/**
 * Handler para el click del label del select (en realidad es un botón)
 */
const multiCheckboxLabelClickHandler = (e) => {
  const target = e.target;
  e.stopPropagation();
  /*label*/
  const clickedLabel = e.target;
  clickedLabel.classList.toggle("gx-label--multi-checkbox--active");
  clickedLabel.addEventListener("mouseleave", labelMouseLeaveHandler);

  /*multi-checkbox*/
  const multiCheckbox = clickedLabel.nextElementSibling;
  multiCheckbox.classList.toggle("gx-multi-checkbox--opened");
  enableCheckboxes(multiCheckbox);
  closeOtherSelects(multiCheckbox);
  addMultiCheckboxListener(multiCheckbox);

  /*multi-checkbox container*/
  const multiCheckboxContainer = e.target.parentElement;
  autoScrollMultiCheckboxContainer(multiCheckboxContainer);
  horizontalScroll(false);
};

/**
 * Handler para el evento keyDown del label (botón) del select
 */
const multiCheckboxLabelKeyDownHandler = (e) => {
  const isActive = e.target.classList.contains(
    "gx-label--multi-checkbox--active"
  );
  const multiCheckboxContainer = e.target.parentElement;
  const nextSibling = e.target.nextElementSibling;
  let multiCheckbox;
  if (nextSibling.classList.contains("gx-multi-checkbox")) {
    multiCheckbox = nextSibling;
  }
  if (
    e.code === "ArrowRight" ||
    e.code === "ArrowLeft" ||
    e.code === "Escape"
  ) {
    e.preventDefault();
    const openedMultiCheckboxes = getOpenedMultiCheckbox();
    openedMultiCheckboxes.forEach((multiCheckbox) => {
      timeOutHideSelect(multiCheckbox);
    });
  }
  if (e.code === "ArrowDown" && isActive && multiCheckbox) {
    e.preventDefault();
    firstOption = multiCheckbox.firstElementChild;
    if (firstOption) {
      firstOption.focus();
    }
  } else if (e.code === "ArrowDown" && !isActive && multiCheckbox) {
    e.preventDefault();
    e.target.click();
  } else if (e.code === "ArrowRight") {
    const nextSibling = multiCheckboxContainer.nextElementSibling;
    if (nextSibling) {
      const nextButton = nextSibling.querySelector("button");
      nextButton.focus();
    }
  } else if (e.code === "ArrowLeft") {
    const prevSibling = multiCheckboxContainer.previousElementSibling;
    if (prevSibling) {
      const prevButton = prevSibling.querySelector("button");
      prevButton.focus();
    }
  }
};

/**
 * Evento que se dispara cuando el mouse abandona el select (multi-checkbox)
 */
multiCheckboxMouseLeaveHandler = (e) => {
  const multiCheckbox = e.target;
  timeOutHideSelectRef = setTimeout(function () {
    timeOutHideSelect(multiCheckbox);
  }, timeBeforeCloseSelect);
};

/**
 * Evento que se dispara cuando el mouse entra en el select (multi-checkbox)
 */
multiCheckboxMouseEnterHandler = (e) => {
  clearTimeout(timeOutHideSelectRef);
};

/**
 * Evento que se dispara cuando el mouse abandona el botón (.gx-label--multi-checkbox) que abre el select.
 */
labelMouseLeaveHandler = (e) => {
  const clickedLabel = e.target;
  const relatedTarget = e.relatedTarget;
  const associatedSelect = clickedLabel.nextElementSibling;
  if (relatedTarget !== associatedSelect) {
    timeOutHideSelect(associatedSelect);
  }
};

/************************
Functions
************************/

const timeOutHideSelect = (multiCheckbox, blur = false) => {
  multiCheckbox.classList.remove("gx-multi-checkbox--opened");
  displayScrollbar();
  const gxLabelMultiCheckbox = multiCheckbox.previousElementSibling;
  /*then remove listeners*/
  multiCheckbox.removeEventListener(
    "mouseleave",
    multiCheckboxMouseLeaveHandler
  );
  multiCheckbox.removeEventListener("enter", multiCheckboxMouseEnterHandler);
  if (blur) {
    //blur is used when user is using mouse, noy keyboard.
    setTimeout(() => {
      gxLabelMultiCheckbox.blur();
    }, 150);
  }
  /*reset label*/
  if (gxLabelMultiCheckbox.classList.contains("gx-label--multi-checkbox")) {
    gxLabelMultiCheckbox.classList.remove("gx-label--multi-checkbox--active");
  }
  disableCheckboxes(multiCheckbox);
  const multiCheckboxContainer = multiCheckbox.parentElement;
  if (multiCheckboxContainer) {
    const multiCheckboxButton = multiCheckboxContainer.querySelector("button");
    if (multiCheckboxButton) {
      multiCheckboxButton.focus();
    }
  }
  horizontalScroll(true);
};

/**
 * Muestra la scrollbar horizontal del contenedor de los selects. Cuando los selects no entran en el contenedor, se muestra una scrollbar, que permite deslizar horizontalmente. Pero cuando se abre un select, hay que ocultarla, porque de lo contrario, queda visible debajo del select. Esta función la vuelve a mostrar luego de que se cierra el select.
 */
const displayScrollbar = () => {
  /*show scrollbar again*/
  setTimeout(() => {
    rowSelectsInnerWrapper.classList.remove("hide-scrollbar");
  }, selectHeightTransition);
};

/**
 * Se usa para posicionar un select cuando el usuario lo abre, si es que no esta enteramente visible.
 */
const autoScrollMultiCheckboxContainer = (multiCheckboxContainer) => {
  if (multiCheckboxContainer) {
    /*multi checkbox container*/
    const mCCBoundingClientRect =
      multiCheckboxContainer.getBoundingClientRect();
    const mCCLeft = mCCBoundingClientRect.left;
    const mCCRight = mCCBoundingClientRect.right;
    /*row--selects inner-wrapper*/
    const rowSelectsInnerWrapperBoundingClient =
      rowSelectsInnerWrapper.getBoundingClientRect();
    rSIWLeft = rowSelectsInnerWrapperBoundingClient.left;
    rSIWRight = rowSelectsInnerWrapperBoundingClient.right;
    /*calculate overflow*/
    if (mCCLeft < rSIWLeft || mCCRight > rSIWRight) {
      /*multiCheckbox if overflowing*/
      multiCheckboxContainer.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }
};

/**
 * Habilita todos los checkboxes de un select (multi-checkbox).Esto permite que se puedan navegar con el teclado, ya que de lo contrario, están deshabilitados, lo cual impide la navegación por teclado. Se desactivan cuando se cierra el select.
 */
const enableCheckboxes = (multiCheckbox) => {
  /*checkboxes*/
  const checkboxes = multiCheckbox.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      enableElement(checkbox);
    });
  }
};

/**
 * Deshabilita todos los checkboxes de un select (multi-checkbox). Esto impide que se puedan navegar con el teclado. Se usa después que se cerro un select, para evitar que el tab entre en los checkboxes que están ocultos.
 */
const disableCheckboxes = (multiCheckbox) => {
  /*checkboxes*/
  const checkboxes = multiCheckbox.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      disableElement(checkbox);
    });
  }
};

/**
 * Deshabilita un elemento, agregando el atributo 'disabled'
 */
const disableElement = (elementRef) => {
  elementRef.setAttribute("disabled", "");
};

/**
 * Habilita un elemento, quitando el atributo 'disabled'
 */
const enableElement = (elementRef) => {
  elementRef.removeAttribute("disabled");
};

/**
 * Cierra todos los selects, excepto el actual
 */
const closeOtherSelects = (currentSelect) => {
  multiCheckboxes.forEach((multiSelect) => {
    if (currentSelect !== multiSelect) {
      multiSelect.classList.remove("gx-multi-checkbox--opened");
    }
  });
};

/**
 * Activates/deactivates horizontal scrolling with the mousewheel on .row--selects-inner-wrapper
 */
const horizontalScroll = (activate) => {
  if (activate) {
    rowSelectsInnerWrapper.addEventListener(
      "wheel",
      horizontalScrollWheelHandler,
      { passive: true }
    );
  } else {
    rowSelectsInnerWrapper.removeEventListener(
      "wheel",
      horizontalScrollWheelHandler,
      { passive: true }
    );
  }
};
const horizontalScrollWheelHandler = (e) => {
  e.preventDefault();
  // Adjust the scrollLeft property based on the wheel delta
  rowSelectsInnerWrapper.scrollLeft += e.deltaY;
};

/************************
Event Listeners
************************/
multiCheckboxesLabel.forEach((multiCheckboxLabel) => {
  /*click event*/
  multiCheckboxLabel.addEventListener("click", multiCheckboxLabelClickHandler);
  /*keydown event*/
  multiCheckboxLabel.addEventListener(
    "keydown",
    multiCheckboxLabelKeyDownHandler
  );
});

/**
 * Agrega listeners de mouseleave, y mouseenter en el select (multi-checkbox).
 */
const addMultiCheckboxListener = (multiCheckbox) => {
  multiCheckbox.addEventListener("mouseleave", multiCheckboxMouseLeaveHandler);
  multiCheckbox.addEventListener("mouseenter", multiCheckboxMouseEnterHandler);
};
