/*
INDEX:
1.VARIABLES
2.OTHER
3.CSS VARIABLES
4.RENDERS
5.HELPER FUNCTIONS
6.HANDLERS
*/

/* 1.VARIABLES */

const pageLang = document.documentElement.lang;
/*filter data*/
let cardsPerLoad;
let typePlural;
let typeSingular;
/*elements*/
let articlesListEl;
let filterHeaderEl;
let textFilterEl;
let rowSelectsEl;
let rowSelectsInnerWrapper;
let rowActionsEl;
let rowActionsLeftColEl;
let rowActionsElRightColEl;
let rowInfoEl;
let articlesFooterEl;
let numberPlaceholderEl;
let clearButtonEl;
let filterButtonEl;
let showMoreButtonEl;
let footerMessagesSlotEl;
let clearInputSuggestionEl;
/*arrays*/
let catsMap = [];
let allArticles = [];
let multiCheckboxes = [];
let filteredArticles = [];
let currentSelectedCategories = [];
let prevSelectedCategories = [];
let membershipCategories = [];

/* 2.OTHER */
var userAgent = navigator.userAgent;
let visibleCards = 0;
let textFilterBackspaceCounter = 0;
let footerMessages;
const clearButtonLabels = {
  en: "clear filter",
  es: "borrar filtro",
  pt: "limpar filtro",
};
const clearButtonClearedLabels = {
  en: "clearing...",
  es: "limpiado...",
  pt: "limpado...",
};

/*event listeners*/
const timeBeforeCloseSelect = 40000;
const clearPillTransition = 150;
const selectHeightTransition = 150;
let labelMouseLeaveHandler;
let multiCheckboxMouseLeaveHandler;
let multiCheckboxMouseEnterHandler;
let timeOutHideSelectRef;
const timeOutHideSelect = (multiCheckbox) => {
  console.log("close select");
  multiCheckbox.classList.remove("gx-multi-checkbox--opened");
  displayScrollbar();
  /*then remove listeners*/
  multiCheckbox.removeEventListener(
    "mouseleave",
    multiCheckboxMouseLeaveHandler
  );
  multiCheckbox.removeEventListener("enter", multiCheckboxMouseEnterHandler);
  /*reset label*/
  const gxLabelMultiCheckbox = multiCheckbox.previousElementSibling;
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

// 3. CSS VARIABLES //

const html = document.querySelector("html");
html.style.setProperty("--gx-transition--pill", `${clearPillTransition}ms`);
html.style.setProperty(
  "--gx-select-transition-height-speed",
  `${selectHeightTransition}ms`
);
html.style.setProperty(
  "--gx-desktop-lg-width",
  `${gxFilterData.conf.desktopLgWidth}px`
);

// 4. RENDERS //

const renderHeader = () => {
  /*header*/
  filterHeaderEl = document.createElement("header");
  filterHeaderEl.classList.add("header-filter");
  filterHeaderEl.setAttribute("id", "header-filter");

  /*header title label*/
  let headerTitle;
  const headerTitleLabels = {
    en: `Find a ${typeSingular}`,
    es: `Encontrar un ${typeSingular}:`,
    pt: `Encontrar um ${typeSingular}:`,
  };
  headerTitle = document.createElement("h2");
  headerTitle.classList.add("header-filter__title");
  headerTitle.innerText = headerTitleLabels[pageLang];

  /*text filter label*/
  const textFilterLabels = {
    en: `Search by ${typeSingular} name:`,
    es: `Buscar por nombre de ${typeSingular}:`,
    pt: `Buscar por nome do ${typeSingular}:`,
  };
  const textFilterLabel = document.createElement("label");
  textFilterLabel.classList.add("gx-label", "gx-label--filter");
  textFilterLabel.innerText = textFilterLabels[pageLang];
  /*text wrapper*/
  textFilterWrapper = document.createElement("div");
  textFilterWrapper.classList.add("gx-input--filter-wrapper");
  /*clear input suggestion*/
  let clearKey = "ctrl";
  if (userAgent.match(/Mac/i)) {
    clearKey = "cmd";
  }
  const clearInputSuggestionLabels = {
    en: `${clearKey} + backspace`,
    es: `${clearKey} + retroceso`,
    pt: `${clearKey} + retrocesso`,
  };
  clearInputSuggestionEl = document.createElement("span");
  clearInputSuggestionEl.classList.add(
    "gx-clear-suggestion",
    "gx-clear-suggestion--hidden"
  );
  clearInputSuggestionEl.innerText = clearInputSuggestionLabels[pageLang];
  /*text filter*/
  textFilterEl = document.createElement("input");
  textFilterEl.setAttribute("type", "text");
  textFilterEl.setAttribute("placeholder", "AGL solutions");
  textFilterEl.classList.add("gx-input", "gx-input--filter");
  textFilterEl.addEventListener("input", filterInputHandler);
  textFilterEl.addEventListener("keyup", filterKeydownHandler);
  /*main row*/
  const rowMain = document.createElement("div");
  rowMain.classList.add("row", "row--main");
  /*row selects*/
  rowSelectsEl = document.createElement("div");
  rowSelectsEl.classList.add("row", "row--selects");
  rowSelectsEl.setAttribute("id", "header-filters");
  /*row selects outer container*/
  rowSelectsOuterWrapper = document.createElement("div");
  rowSelectsOuterWrapper.classList.add("row--selects-outer-wrapper");
  /*row selects inner container*/
  rowSelectsInnerWrapper = document.createElement("div");
  rowSelectsInnerWrapper.classList.add("row--selects-inner-wrapper");
  /*row footer*/
  rowActionsEl = document.createElement("div");
  rowActionsEl.classList.add("row", "row--actions");
  rowActionsEl.setAttribute("id", "header-actions");
  /*row footer | left col*/
  rowActionsLeftColEl = document.createElement("div");
  rowActionsLeftColEl.classList.add("row", "row--actions__left-col");
  /*row footer | right col*/
  rowActionsElRightColEl = document.createElement("div");
  rowActionsElRightColEl.classList.add("row", "row--actions__right-col");
  /*row info*/
  rowInfoEl = document.createElement("div");
  rowInfoEl.classList.add("row", "row--info");
  rowInfoEl.setAttribute("id", "header-info");
  /*appends*/
  if (headerTitle) {
    rowMain.appendChild(headerTitle);
  }
  textFilterLabel.appendChild(textFilterWrapper);
  textFilterWrapper.appendChild(clearInputSuggestionEl);
  textFilterWrapper.appendChild(textFilterEl);
  rowMain.appendChild(textFilterLabel);
  filterHeaderEl.appendChild(rowMain);
  rowSelectsInnerWrapper.appendChild(rowSelectsEl);
  rowSelectsOuterWrapper.appendChild(rowSelectsInnerWrapper);
  filterHeaderEl.appendChild(rowSelectsOuterWrapper);
  rowActionsEl.appendChild(rowActionsLeftColEl);
  rowActionsEl.appendChild(rowActionsElRightColEl);
  filterHeaderEl.appendChild(rowActionsEl);
  filterHeaderEl.appendChild(rowInfoEl);
  articlesListEl.parentElement.insertBefore(filterHeaderEl, articlesListEl);
};

const renderCategories = () => {
  /*categories*/
  const cats = gxFilterData.cats;
  cats.forEach((cat) => {
    const type = cat.type;
    const label = cat.label[pageLang];
    const cats = cat.cats;

    if (type && label && cats.length) {
      /*create multi-select container*/
      const multiCheckboxContainer = document.createElement("div");
      multiCheckboxContainer.classList.add("gx-multi-checkbox-container");

      /*create multi-select label*/
      const multiCheckboxLabel = document.createElement("button");
      multiCheckboxLabel.classList.add("gx-label", "gx-label--multi-checkbox");
      multiCheckboxLabel.setAttribute("for", type);
      multiCheckboxLabel.addEventListener(
        "click",
        multiCheckboxLabelClickHandler
      );
      multiCheckboxLabel.addEventListener(
        "keydown",
        multiCheckboxLabelKeydownHandler
      );
      multiCheckboxLabel.innerText = cat.label[pageLang];

      /*create multi-checkbox*/
      const multiCheckbox = document.createElement("div");
      multiCheckbox.classList.add("gx-multi-checkbox");

      /*create options*/
      cats.forEach((cat) => {
        if (type === "category") {
          /*this is the membership category. Save items to use for the cards labels*/
          membershipCategories.push({
            id: cat.value,
            label: cat.label[pageLang],
          });
        }

        const value = cat.value;
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", value);
        checkbox.setAttribute("disabled", "disabled");
        checkbox.addEventListener("change", checkboxChangedHandler);
        checkbox.addEventListener("keydown", checkboxKeyDownHandler);
        checkbox.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        const label = cat.label[pageLang];
        const labelEl = document.createElement("label");
        labelEl.setAttribute("for", value);
        labelEl.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        const animationSpan = document.createElement("span");
        animationSpan.classList.add("span-animation");
        const descriptionEl = document.createElement("span");
        descriptionEl.classList.add("gx-label", "gx-label--description");
        descriptionEl.innerText = label;
        /*test checked by default*/
        // if (label === "diamond") {
        //   checkbox.checked = true;
        // }
        /*/test checked by default*/
        /*appends*/
        multiCheckbox.appendChild(checkbox);
        labelEl.appendChild(animationSpan);
        labelEl.appendChild(descriptionEl);
        multiCheckbox.appendChild(labelEl);
      });

      /*add references*/
      multiCheckboxes.push(multiCheckbox);

      /*appends*/
      multiCheckboxContainer.appendChild(multiCheckboxLabel);
      multiCheckboxContainer.appendChild(multiCheckbox);
      rowSelectsEl.appendChild(multiCheckboxContainer);
    }
  });
};

const renderShowingPartners = () => {
  if (rowInfoEl) {
    const messageBefores = {
      en: `Showing `,
      es: `Mostrando `,
      pt: `Mostrando `,
    };
    const messageAfters = {
      en: ` of ${allArticles.length} total partners`,
      es: ` de ${allArticles.length} socios totales`,
      pt: ` de ${allArticles.length} parceiros totais`,
    };
    /*paragraph*/
    const paragraph = document.createElement("p");
    /*message before*/
    const messageBefore = document.createElement("span");
    messageBefore.innerText = messageBefores[pageLang];
    /*number placeholder*/
    numberPlaceholderEl = document.createElement("span");
    numberPlaceholderEl.setAttribute("id", "showing-number");
    numberPlaceholderEl.innerText = "0";
    /*message after*/
    const messageAfter = document.createElement("span");
    messageAfter.innerText = messageAfters[pageLang];
    /*appends*/
    paragraph.appendChild(messageBefore);
    paragraph.appendChild(numberPlaceholderEl);
    paragraph.appendChild(messageAfter);
    rowInfoEl.appendChild(paragraph);
  }
};

const renderClearButton = () => {
  if (rowActionsElRightColEl) {
    clearButtonEl = document.createElement("button");
    clearButtonEl.classList.add(
      "gx-button",
      "gx-button--clear",
      "gx-button--link",
      "gx-button--sm"
    );
    clearButtonEl.innerText = clearButtonLabels[pageLang];
    clearButtonEl.addEventListener("click", clearHandler);
    rowActionsElRightColEl.appendChild(clearButtonEl);
  }
};

const renderFilterButton = () => {
  if (rowActionsElRightColEl) {
    const filterButtonLabels = {
      en: "filter",
      es: "filtro",
      pt: "filtro",
    };
    filterButtonEl = document.createElement("button");
    filterButtonEl.classList.add(
      "gx-button",
      "gx-button--primary",
      "gx-button--filter",
      "gx-button--sm"
    );
    filterButtonEl.setAttribute("id", "gx-filter-button");
    filterButtonEl.innerText = filterButtonLabels[pageLang];
    filterButtonEl.addEventListener("click", filterHandler);
    rowActionsElRightColEl.appendChild(filterButtonEl);
  }
};

const renderFooter = () => {
  if (articlesListEl) {
    articlesFooterEl = document.createElement("footer");
    articlesFooterEl.classList.add("articles-footer");
    articlesListEl.after(articlesFooterEl);
  }
};

const renderShowMoreButton = () => {
  if (articlesFooterEl) {
    const showMoreButtonLabels = {
      en: "show more",
      es: "mostrar más",
      pt: "mostrar mais",
    };
    showMoreButtonEl = document.createElement("button");
    showMoreButtonEl.classList.add(
      "gx-button",
      "gx-button--secondary",
      "gx-button--show-more"
    );
    showMoreButtonEl.innerText = showMoreButtonLabels[pageLang];
    showMoreButtonEl.addEventListener("click", showMoreHandler);
    articlesFooterEl.appendChild(showMoreButtonEl);
  }
};

const footerMessagesSlot = () => {
  if (articlesFooterEl) {
    footerMessagesSlotEl = document.createElement("p");
    footerMessagesSlotEl.classList.add("footer-messages");
    articlesFooterEl.appendChild(footerMessagesSlotEl);
  }
};

// 5. HELPER FUNCTIONS //

/*
Activates/deactivates horizontal scrolling with the mousewheel on .row--selects-inner-wrapper
*/
const horizontalScroll = (activate) => {
  if (activate) {
    console.log("activate");
    rowSelectsInnerWrapper.addEventListener(
      "wheel",
      horizontalScrollWheelHandler
    );
  } else {
    rowSelectsInnerWrapper.removeEventListener(
      "wheel",
      horizontalScrollWheelHandler
    );
  }
};
const horizontalScrollWheelHandler = (e) => {
  e.preventDefault();
  // Adjust the scrollLeft property based on the wheel delta
  rowSelectsInnerWrapper.scrollLeft += e.deltaY;
};

const getArticleCategory = (article) => {
  cats = getArticleCats(article);
  let foundIndex = -1;
  for (let i = 0; i < cats.length; i++) {
    foundIndex = membershipCategories.findIndex((cat) => {
      return cat.id === cats[i];
    });
    if (foundIndex !== -1) {
      break;
    }
  }
  if (foundIndex !== -1) {
    return membershipCategories[foundIndex].label;
  } else {
    return undefined;
  }
};

const enableCheckboxes = (multiCheckbox) => {
  /*checkboxes*/
  const checkboxes = multiCheckbox.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      checkbox.removeAttribute("disabled");
    });
  }
};

const disableCheckboxes = (multiCheckbox) => {
  /*checkboxes*/
  const checkboxes = multiCheckbox.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      checkbox.setAttribute("disabled", "disabled");
    });
  }
};

const hideAllCards = () => {
  if (allArticles.length) {
    allArticles.forEach((article) => {
      article.setAttribute("hidden", "hidden");
    });
  }
};

const showAllCards = () => {
  if (allArticles.length) {
    allArticles.forEach((article) => {
      article.removeAttribute("hidden");
    });
  }
};

const getChecked = (multiCheckbox) => {
  const checkboxesArray = Array.from(
    multiCheckbox.querySelectorAll("input[type='checkbox']")
  );
  const selectedCats = [];
  for (let i = 0; i < checkboxesArray.length; i++) {
    if (checkboxesArray[i].checked) {
      selectedCats.push(checkboxesArray[i].getAttribute("id"));
    }
  }
  return selectedCats;
};

/*It unchecks a checked category. Only called when a pill from a selected category gets clicked (cleared)*/
const removeChecked = (catId) => {
  if (catId && rowSelectsEl) {
    const checkedCat = rowSelectsEl.querySelector(`#${catId}`);
    if (checkedCat) {
      checkedCat.checked = false;
      const catInCurrentSelectedIndex = currentSelectedCategories.findIndex(
        (cat) => {
          return catId === cat;
        }
      );
      if (catInCurrentSelectedIndex !== -1) {
        currentSelectedCategories.splice(catInCurrentSelectedIndex, 1);
      }
      enableElement(filterButtonEl);
      filterButtonEl.click();
    }
  }
};

/* #show more */
const showMore = () => {
  if (filteredArticles.length > 0) {
    let shownArticlesLength = 0;
    for (let i = 0; i < filteredArticles.length; i++) {
      filteredArticles[i].removeAttribute("hidden");
      shownArticlesLength++;
      visibleCards++;

      if (shownArticlesLength === cardsPerLoad) {
        break;
      }
    }
    /*Then, remove shownCards from filteredArticles */
    for (let index = 0; index < shownArticlesLength; index++) {
      filteredArticles.shift();
    }
    if (filteredArticles.length === 0) {
      hideElement(showMoreButtonEl);
      footerMessagesSlotEl.innerText = footerMessages.noMorePartners[pageLang];
    } else {
      showElement(showMoreButtonEl);
      footerMessagesSlotEl.innerText = "";
    }
  } else {
    hideElement(showMoreButtonEl);
    visibleCards = 0;
    footerMessagesSlotEl.innerText = footerMessages.noMatchFound[pageLang];
  }
  updateShowingArticles();
};

const scrollDown = () => {
  articlesFooterEl.scrollIntoView({ behavior: "smooth", block: "end" });
};

const disableElement = (elementRef) => {
  elementRef.setAttribute("disabled", "disabled");
};
const enableElement = (elementRef) => {
  elementRef.removeAttribute("disabled");
};
const hideElement = (elementRef) => {
  elementRef.setAttribute("hidden", "hidden");
};
const showElement = (elementRef) => {
  elementRef.removeAttribute("hidden");
};

/**
 * Helper function that evaluates if everything that is needed to run the filter is met.
 * Returns a boolean.
 */
const isFilterReady = () => {
  articlesListEl = document.querySelector("ul.articles");
  if (articlesListEl) {
    allArticles = Array.from(articlesListEl.querySelectorAll(":scope > li"));
  }
  return gxFilterData.cats.length && allArticles.length > 0;
};

const getArticleCats = (articleEl) => {
  let cats = [];
  if (articleEl) {
    const categoriesItems = articleEl.querySelectorAll(".category-item");
    if (categoriesItems.length > 0) {
      categoriesItems.forEach((cat) => {
        catClasses = cat.classList;
        catClasses.forEach((cssClass) => {
          if (cssClass !== "category-item") {
            cats.push(cssClass);
          }
        });
      });
    }
    return cats;
  }
};

/* #filter */
const filter = () => {
  filteredArticles = [];
  if (currentSelectedCategories.length > 0 && allArticles.length > 0) {
    /*one or more categories selected. filter articles*/
    allArticles.forEach((article) => {
      let isAMatch = true;
      const articleCats = getArticleCats(article);
      if (articleCats.length > 0) {
        for (let i = 0; i < currentSelectedCategories.length; i++) {
          const catFound = articleCats.find(
            (cat) => cat === currentSelectedCategories[i]
          );
          if (!catFound) {
            isAMatch = false;
            break;
          }
        }
      }
      if (isAMatch) {
        filteredArticles.push(article);
      }
    });
  } else {
    /*no categories selected. include all articles*/
    filteredArticles = [...allArticles];
  }
  prevSelectedCategories = [...currentSelectedCategories];
};

/*Sets the initial state of the selected categories. Only called on init().*/
const setSelectedCategories = () => {
  let selectedCats = [];
  if (multiCheckboxes.length > 0) {
    multiCheckboxes.forEach((mc) => {
      selectedCats = [...selectedCats, ...getChecked(mc)];
    });
  }
  currentSelectedCategories = [...selectedCats];
  prevSelectedCategories = [...selectedCats];
};

/**
 * It evaluates if the actual selected categories, match with the categories that were selected the last time the filter button was pressed. This is used to compare both states, and disable the filter button, if they match.
 */
const evaluateFilterDifference = () => {
  const currentSelectedCategoriesString = currentSelectedCategories
    .sort()
    .join(" ");
  const prevSelectedCategoriesString = prevSelectedCategories.sort().join(" ");
  if (currentSelectedCategoriesString === prevSelectedCategoriesString) {
    /*The actual state of the categories filter is the same*/
    disableElement(filterButtonEl);
  } else {
    /*The actual state of the categories filter is different*/
    enableElement(filterButtonEl);
  }
};

const clearFilters = () => {
  if (multiCheckboxes.length > 0) {
    multiCheckboxes.forEach((mc) => {
      const checkedOptions = Array.from(
        mc.querySelectorAll("input[type='checkbox']:checked")
      );
      if (checkedOptions.length > 0) {
        checkedOptions.forEach((option) => {
          option.checked = false;
        });
      }
    });
  }
  footerMessagesSlotEl.innerText = "";
};

/**
 * It creates an array of all the categories, mapping the id with the label. Called only once on init();
 */
const createCatsMapArray = () => {
  catsMap = [];
  const cats = gxFilterData.cats;
  if (cats.length > 0) {
    cats.forEach((cat) => {
      const cats = cat.cats;
      if (cats.length > 0) {
        cats.forEach((cat) => {
          catsMap.push({
            id: cat.value,
            label: cat.label[pageLang],
          });
        });
      }
    });
  }
};

/**
 * It renders the categories pills, iterating over 'currentSelectedCategories'.
 */
const renderPills = () => {
  if (rowActionsLeftColEl) {
    rowActionsLeftColEl.innerHTML = "";
  }
  if (currentSelectedCategories.length > 0) {
    currentSelectedCategories.forEach((catId) => {
      const catData = catsMap.find((cat) => {
        return cat.id === catId;
      });
      if (catData) {
        const pill = document.createElement("button");
        pill.classList.add("gx-button-pill");
        pill.innerText = catData.label;
        pill.setAttribute("data-cat", catData.id);
        pill.addEventListener("click", pillClickedHandler);
        rowActionsLeftColEl.appendChild(pill);
      }
    });
  }
};

const displayScrollbar = () => {
  /*show scrollbar again*/
  setTimeout(() => {
    rowSelectsInnerWrapper.classList.remove("hide-scrollbar");
  }, selectHeightTransition);
};

const powerUpCards = () => {
  allArticles.forEach((article) => {
    const links = article.querySelectorAll("a");
    if (links.length > 0) {
      article.classList.add("article-container--actionable");
      const url = links[0].getAttribute("href");
      article.addEventListener("click", () => {
        window.open(url, "_blank");
      });
      article.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          article.click();
        }
      });
      article.setAttribute("tabindex", "0");
    }
    /*remove original links to prevent undesired tabindex*/
    links.forEach((link) => {
      link.removeAttribute("href");
      link.removeAttribute("target");
    });
    /*add category pill*/
    const categoryLabel = getArticleCategory(article);
    if (categoryLabel) {
      const articleHeader = article.querySelector("header");
      const membershipLabelEl = document.createElement("span");
      membershipLabelEl.classList.add("membership-label");
      membershipLabelEl.innerText = categoryLabel;
      if (articleHeader) {
        articleHeader.appendChild(membershipLabelEl);
      }
    }
  });
};

// 6. HANDLERS //

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

document.addEventListener("click", (e) => {
  //close open select, if any
  const openedMultiCheckbox = rowSelectsEl.querySelector(
    ".gx-multi-checkbox--opened"
  );
  if (openedMultiCheckbox) {
    timeOutHideSelect(openedMultiCheckbox);
  }
});

labelMouseLeaveHandler = (e) => {
  const clickedLabel = e.target;
  const relatedTarget = e.relatedTarget;
  const associatedSelect = clickedLabel.nextElementSibling;
  if (relatedTarget !== associatedSelect) {
    timeOutHideSelect(associatedSelect);
  }
  //remove listener
  clickedLabel.removeEventListener("mouseleave", labelMouseLeaveHandler);
};

const addMultiCheckboxListener = (multiCheckbox) => {
  multiCheckbox.addEventListener("mouseleave", multiCheckboxMouseLeaveHandler);
  multiCheckbox.addEventListener("mouseenter", multiCheckboxMouseEnterHandler);
};

const multiCheckboxLabelClickHandler = (e) => {
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

const multiCheckboxLabelKeydownHandler = (e) => {
  const isActive = e.target.classList.contains(
    "gx-label--multi-checkbox--active"
  );
  const multiCheckboxContainer = e.target.parentElement;
  const nextSibling = e.target.nextElementSibling;
  let multiCheckbox;
  if (nextSibling.classList.contains("gx-multi-checkbox")) {
    multiCheckbox = nextSibling;
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

/*mouseleave*/
multiCheckboxMouseLeaveHandler = (e) => {
  const multiCheckbox = e.target;
  timeOutHideSelectRef = setTimeout(function () {
    timeOutHideSelect(multiCheckbox);
  }, timeBeforeCloseSelect);
};
multiCheckboxMouseEnterHandler = (e) => {
  clearTimeout(timeOutHideSelectRef);
};

const closeOtherSelects = (currentSelect) => {
  multiCheckboxes.forEach((multiSelect) => {
    if (currentSelect !== multiSelect) {
      multiSelect.classList.remove("gx-multi-checkbox--opened");
    }
  });
};

const pillClickedHandler = (e) => {
  e.stopPropagation();
  const pillClicked = e.target;
  const catId = e.target.getAttribute("data-cat");
  pillClicked.classList.add("gx-button-pill--hidden");
  setTimeout(() => {
    if (catId) {
      removeChecked(catId);
    }
  }, clearPillTransition);
};

const filterInputHandler = (e) => {
  hideElement(showMoreButtonEl);
  if (currentSelectedCategories.length > 0) {
    clearFilters();
    setSelectedCategories();
    evaluateFilterDifference();
  }
  if (filteredArticles.length < allArticles.length) {
    /*we want to search in all articles*/
    filteredArticles = [...allArticles];
  }
  const value = e.target.value.toLowerCase();
  if (filteredArticles.length > 0) {
    visibleCards = 0;
    filteredArticles.forEach((article) => {
      const hidden = article.hasAttribute("hidden");
      const title = article.querySelector(".title").innerText.toLowerCase();
      if (title.includes(value)) {
        article.removeAttribute("hidden");
        visibleCards++;
        if (title === value) {
          //exact match!
          article.classList.add("article-container--exact-match");
        } else {
          article.classList.remove("article-container--exact-match");
        }
      } else if (!title.includes(value)) {
        article.setAttribute("hidden", "hidden");
        article.classList.remove("article-container--exact-match");
      }
    });
    if (visibleCards > 0) {
      footerMessagesSlotEl.innerText =
        footerMessages.showingAllCoincidences[pageLang];
    } else {
      footerMessagesSlotEl.innerText = footerMessages.noCoincidences[pageLang];
    }
  }
  updateShowingArticles();
};

const filterKeydownHandler = (e) => {
  /**
   * Suggest the user to hit ctrl + backspace to delete
   */
  let ctrlKey = e.code === "ControlLeft" || e.code === "ControlRight";
  let cmdKey = e.code === "MetaLeft" || e.code === "MetaRight";
  console.group();
  console.log("e.code", e.code);
  console.log("e.key", e.key);
  console.log("ctrlKey", ctrlKey);
  console.log("cmdKey", cmdKey);
  console.groupEnd();

  if ((e.key === "Backspace" && ctrlKey) || (e.key === "Backspace" && cmdKey)) {
    clearInputSuggestionEl.remove();
  } else if (e.key === "Backspace") {
    textFilterBackspaceCounter++;
    if (textFilterEl.value.length === 0) {
      textFilterBackspaceCounter = 0;
      clearInputSuggestionEl.classList.add("gx-clear-suggestion--hidden");
    }
  } else if (!ctrlKey && !cmdKey) {
    textFilterBackspaceCounter = 0;
    clearInputSuggestionEl.classList.add("gx-clear-suggestion--hidden");
  }
  if (textFilterBackspaceCounter >= 3 && textFilterEl.value.length !== 0) {
    if (clearInputSuggestionEl) {
      clearInputSuggestionEl.classList.remove("gx-clear-suggestion--hidden");
    }
  }
};

const checkboxChangedHandler = (e) => {
  e.stopPropagation();
  const checked = e.target.checked;
  const cat = e.target.getAttribute("id");
  if (checked) {
    currentSelectedCategories.push(cat);
  } else {
    const indexToDelete = currentSelectedCategories.findIndex((selectedCat) => {
      return cat === selectedCat;
    });
    if (indexToDelete !== -1) {
      currentSelectedCategories.splice(indexToDelete, 1);
    }
  }
  evaluateFilterDifference();
};

const checkboxKeyDownHandler = (e) => {
  let sibling;
  const multiCheckbox = e.target.parentElement;
  const multiCheckboxButton = multiCheckbox.previousElementSibling;
  if (e.code === "ArrowDown") {
    e.preventDefault();
    sibling = e.target.nextElementSibling;
    if (sibling) {
      sibling = sibling.nextElementSibling;
    }
  } else if (e.code === "ArrowUp") {
    e.preventDefault();
    sibling = e.target.previousElementSibling;
    if (sibling) {
      sibling = sibling.previousElementSibling;
    }
  } else if (e.code === "Enter") {
    e.preventDefault();
    e.target.click();
  } else if (e.code === "Escape") {
    e.preventDefault();
    timeOutHideSelect(multiCheckbox);
    multiCheckboxButton.focus();
  }
  if (sibling) {
    sibling.focus();
  } else if (!sibling && e.code === "ArrowUp") {
    //This is the first option. Set focus on the .gx-label button
    timeOutHideSelect(multiCheckbox);
    multiCheckboxButton.focus();
  }
};

const updateShowingArticles = () => {
  const visibleCards = articlesListEl.querySelectorAll(
    ":scope > *:not([hidden='hidden'])"
  );
  numberPlaceholderEl.innerText = visibleCards.length;
};

/* #clear handler */
const clearHandler = (e) => {
  const button = e.target;
  button.classList.add("gx-button--link--disabled");
  button.innerText = clearButtonClearedLabels[pageLang];
  setTimeout(() => {
    button.innerText = clearButtonLabels[pageLang];
    button.classList.remove("gx-button--link--disabled");
  }, 1000);
  clearFilters();
  setSelectedCategories();
  evaluateFilterDifference();
  hideAllCards();
  filter();
  showMore();
  updateShowingArticles();
  renderPills();
};

/* #filter handler */
const filterHandler = (e) => {
  e.stopPropagation();
  textFilterEl.value = "";
  hideAllCards();
  filter();
  showMore();
  evaluateFilterDifference();
  renderPills();
};

const showMoreHandler = (e) => {
  e.stopPropagation();
  showMore();
  scrollDown();
};

// INIT //

const defineFooterMessages = () => {
  footerMessages = {
    noMorePartners: {
      en: `No more ${typePlural} to display`,
      es: `No hay más ${typePlural} para mostrar`,
      pt: `Não há mais ${typePlural} para mostrar`,
    },
    showingAllCoincidences: {
      en: `Showing all the ${typePlural} that match with your search`,
      es: `Mostrando todos los ${typePlural} que coinciden con tu búsqueda`,
      pt: `Mostrando todos os ${typePlural} que correspondem à sua pesquisa`,
    },
    noCoincidences: {
      en: `No ${typePlural} found matching your search`,
      es: `No se encontró ningun ${typePlural} que coincida con tu búsqueda`,
      pt: `Nenhum ${typePlural} encontrado correspondente à sua pesquisa`,
    },
    noMatchFound: {
      en: `No ${typeSingular} found with the selected filters`,
      es: `Ningún ${typeSingular} encontrado con los filtros seleccionados`,
      pt: `Nenhum ${typeSingular} encontrado com os filtros selecionados`,
    },
  };
};

const init = () => {
  const ready = isFilterReady();
  if (ready) {
    /*get config properties*/
    cardsPerLoad = gxFilterData.conf.cardsPerLoad;
    typeSingular = gxFilterData.conf.typeSingular[pageLang];
    typePlural = gxFilterData.conf.typePlural[pageLang];
    /*call functions*/
    defineFooterMessages();
    createCatsMapArray();
    hideAllCards();
    renderHeader();
    horizontalScroll(true); //must be called after renderHeader();
    renderCategories(); //must be called after renderHeader();
    renderClearButton(); //must be called after renderHeader();
    renderFilterButton(); //must be called after renderHeader();
    renderFooter();
    renderShowingPartners(); //must be called after renderFooter();
    renderShowMoreButton(); //must be called after renderFooter();
    footerMessagesSlot(); //must be called after renderFooter();
    setSelectedCategories(); //must be called after renderCategories();
    evaluateFilterDifference(); //must be called after setSelectedCategories();
    renderPills(); //must be called after setSelectedCategories();
    filter();
    showMore(); //must be called after renderCategories() and filter();
    powerUpCards(); //must be called after renderCategories
    if (filterHeaderEl) {
      /*This is needed to calculate the .gx-multi-checkbox-container's width*/
      filterHeaderEl.style.setProperty(
        "--filters-length",
        gxFilterData.cats.length
      );
    }
  }
};

(function () {
  // your page initialization code here
  // the DOM will be available here
  init();
})();
