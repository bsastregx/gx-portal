/************************
References 
************************/

const html = document.querySelector("html");

//The external wrapper of the selects | .row--selects-outer-wrapper
let rowSelectsOuterWrapper = this.document.querySelector(
  ".row--selects-outer-wrapper"
);

//The internal wrapper of the selects | .row--selects-inner-wrapper
let rowSelectsInnerWrapper = this.document.querySelector(
  ".row--selects-inner-wrapper"
);

//The category inputs
let categoryCheckboxes = Array.from(
  this.document.querySelectorAll(".gx-category-checkbox")
);

//Event that is fired when the mouse leaves the button (.gx-label--multi-checkbox) that opens the select.
let labelMouseLeaveHandler;

//Event that is fired when the mouse leaves the select (multi-checkbox).
let multiCheckboxMouseLeaveHandler;

//Event that is fired when the mouse enters the select (multi-checkbox).
let multiCheckboxMouseEnterHandler;

//Reference to a setTimeout, which is used to prevent the select from closing after 'timeBeforeCloseSelect' if the pointer reentered before that time.
let timeOutHideSelectRef;

/*--- .gx-label--multi-checkbox ---*/
const multiCheckboxesLabel = Array.from(
  document.querySelectorAll(".gx-label--multi-checkbox")
);

//References to selects (multi-checkboxes). Ex. Category | Partner Types | Industries | Services, etc...
let multiCheckboxes = Array.from(
  document.querySelectorAll(".gx-multi-checkbox")
);

/************************
Variables
************************/

//The current clicked category id, used for the "categoryToggled" custom event.
let categoryClickedId = undefined;

//Time used for the transition that animates the height of the select (multi-checkbox).
const selectHeightTransition = 150;

//Time to wait before closing the select after the mouse pointer has left it. Canceled if the pointer re-enters before.
const timeBeforeCloseSelect = 400;

//Time used for the opening/closing speed of the select (multi-checkbox)
html.style.setProperty(
  "--gx-select-transition-height-speed",
  `${selectHeightTransition}ms`
);

//The maximum height of the .gx-multi-checkbox
html.style.setProperty("--gx-select-multi-checkbox-max-height", `200px`);

//The width of each .gx-multi-checkbox-container
html.style.setProperty("--gx-multi-checkbox-container-width", `300px`);

/**************************************************
Handlers (Must be defined before "Event Listeners")
**************************************************/
/**
 * Handler for the click of the select label (actually it is a button)
 */
const multiCheckboxLabelClickHandler = (e) => {
  const target = e.target;
  e.stopPropagation();
  /*hide scrollbar*/
  rowSelectsInnerWrapper.classList.add("hide-scrollbar");
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
 * Handler for the keyDown event of the select label (button)
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
 * Event that is fired when the mouse leaves the select (multi-checkbox)
 */
multiCheckboxMouseLeaveHandler = (e) => {
  const multiCheckbox = e.target;
  timeOutHideSelectRef = setTimeout(function () {
    timeOutHideSelect(multiCheckbox);
  }, timeBeforeCloseSelect);
};

/**
 * Event that is fired when the mouse enters the select (multi-checkbox)
 */
multiCheckboxMouseEnterHandler = (e) => {
  clearTimeout(timeOutHideSelectRef);
};

/**
 * Event that is fired when the mouse leaves the button (.gx-label--multi-checkbox) that opens the select.
 */
labelMouseLeaveHandler = (e) => {
  const clickedLabel = e.target;
  const relatedTarget = e.relatedTarget;
  const associatedSelect = clickedLabel.nextElementSibling;
  if (relatedTarget !== associatedSelect) {
    timeOutHideSelect(associatedSelect);
  }
};

categoryCheckboxes.forEach((categoryCheckbox) => {
  categoryCheckbox.addEventListener("click", (e) => {
    const categoryToggled = new CustomEvent("categoryToggled", {
      detail: {
        categoryId: e.target.id,
      },
      bubbles: true, // Does your event bubble?
      cancelable: true, // Is your event cancelable?
    });
    categoryCheckbox.dispatchEvent(categoryToggled);
  });
});

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
 * Shows the horizontal scrollbar of the selects container. When the selects do not fit into the container, a scrollbar is displayed, allowing horizontal scrolling. But when a select is opened, it must be hidden, because otherwise it remains visible below the select. This function is displayed again after the select is closed.
 */
const displayScrollbar = () => {
  /*show scrollbar again*/
  setTimeout(() => {
    rowSelectsInnerWrapper.classList.remove("hide-scrollbar");
  }, selectHeightTransition);
};

/**
 * Used to position a select when the user opens it, if it is not entirely visible.
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
 * Enables all checkboxes of a select (multi-checkbox). This allows them to be navigated with the keyboard, since otherwise they are disabled, which prevents keyboard navigation. They are disabled when the select is closed.
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
 * Disables all checkboxes of a select (multi-checkbox). This prevents them from being navigated with the keyboard. It is used after a select has been closed, to prevent the tab from entering checkboxes that are hidden.
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
 * Disables an element, adding the 'disabled' attribute
 */
const disableElement = (elementRef) => {
  elementRef.setAttribute("disabled", "");
};

/**
 * Enables an element, removing the 'disabled' attribute
 */
const enableElement = (elementRef) => {
  elementRef.removeAttribute("disabled");
};

/**
 * Closes all selects except the current one
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

/**
 * It deselects all categories
 */
const deselectAllCats = () => {
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

/**
 * It returns all the selected items ids
 */
const getSelectedIds = () => {
  const selectedItemsIds = [];
  categoryCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedItemsIds.push(checkbox.id);
    }
  });
  return selectedItemsIds;
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
 * Add mouseleave, and mouseenter listeners in the select (multi-checkbox).
 */
const addMultiCheckboxListener = (multiCheckbox) => {
  multiCheckbox.addEventListener("mouseleave", multiCheckboxMouseLeaveHandler);
  multiCheckbox.addEventListener("mouseenter", multiCheckboxMouseEnterHandler);
};
