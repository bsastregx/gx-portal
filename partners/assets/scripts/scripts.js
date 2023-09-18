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
let rowActionsLeftColElInnerWrapper;
let rowActionsElRightColEl;
let rowInfoEl;
let articlesFooterEl;
let numberPlaceholderEl;
let clearButtonEl;
let filterButtonEl;
let showMoreButtonEl;
let footerMessagesSlotEl;
/*arrays*/
let catsMap = [];
let allArticles = [];
let multiCheckboxes = [];
let filteredArticles = [];
let currentSelectedCategories = [];
let prevSelectedCategories = [];
/*other*/
let visibleCards = 0;
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
const timeBeforeCloseSelect = 400;
const clearPillTransition = 150;
const selectHeightTransition = 150;
let labelMouseLeaveHandler;
let multiCheckboxMouseLeaveHandler;
let multiCheckboxMouseEnterHandler;
let timeOutHideSelectRef;
const timeOutHideSelect = (multiCheckbox) => {
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
};

// CSS VARIABLES //
const html = document.querySelector("html");
html.style.setProperty("--gx-transition--pill", `${clearPillTransition}ms`);
html.style.setProperty(
  "--gx-select-transition-height-speed",
  `${selectHeightTransition}ms`
);

// RENDERS //

const renderHeader = () => {
  /*header*/
  filterHeaderEl = document.createElement("header");
  filterHeaderEl.classList.add("header-filter");
  filterHeaderEl.setAttribute("id", "header-filter");
  /*title*/
  let headerTitle;
  if (gxFilterData.filterTitle) {
    headerTitle = document.createElement("h2");
    headerTitle.classList.add("header-filter__title");
    headerTitle.innerText = gxFilterData.filterTitle[pageLang];
  }
  /*text filter label*/
  const textFilterLabels = {
    en: `Search by ${typeSingular} name:`,
    es: `Buscar por nombre de ${typeSingular}:`,
    pt: `Buscar por nome do ${typeSingular}:`,
  };
  const textFilterLabel = document.createElement("label");
  textFilterLabel.classList.add("gx-label", "gx-label--filter");
  textFilterLabel.innerText = textFilterLabels[pageLang];
  /*text filter*/
  textFilterEl = document.createElement("input");
  textFilterEl.setAttribute("type", "text");
  textFilterEl.setAttribute("placeholder", "AGL solutions");
  textFilterEl.classList.add("gx-input", "gx-input--filter");
  textFilterEl.addEventListener("input", filterInputHandler);
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
  rowSelectsInnerWrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    // Adjust the scrollLeft property based on the wheel delta
    rowSelectsInnerWrapper.scrollLeft += e.deltaY;
  });
  /*row footer*/
  rowActionsEl = document.createElement("div");
  rowActionsEl.classList.add("row", "row--actions");
  rowActionsEl.setAttribute("id", "header-actions");
  /*row footer | left col*/
  rowActionsLeftColEl = document.createElement("div");
  rowActionsLeftColEl.classList.add("row", "row--actions__left-col");
  /*row footer | left col inner wrapper*/
  rowActionsLeftColElInnerWrapper = document.createElement("div");
  rowActionsLeftColElInnerWrapper.classList.add(
    "row",
    "row--actions__left-col-inner-wrapper"
  );
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
  textFilterLabel.appendChild(textFilterEl);
  rowMain.appendChild(textFilterLabel);
  filterHeaderEl.appendChild(rowMain);
  rowSelectsInnerWrapper.appendChild(rowSelectsEl);
  rowSelectsOuterWrapper.appendChild(rowSelectsInnerWrapper);
  filterHeaderEl.appendChild(rowSelectsOuterWrapper);
  rowActionsLeftColEl.appendChild(rowActionsLeftColElInnerWrapper);
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
      multiCheckboxLabel.innerText = type;

      /*create multi-checkbox*/
      const multiCheckbox = document.createElement("div");
      multiCheckbox.classList.add("gx-multi-checkbox");

      /*create options*/
      cats.forEach((cat) => {
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
      "gx-button--primary",
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

// HELPER FUNCTIONS //

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
  if (rowActionsLeftColElInnerWrapper) {
    rowActionsLeftColElInnerWrapper.innerHTML = "";
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
        rowActionsLeftColElInnerWrapper.appendChild(pill);
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
    const link = article.querySelector("a");
    if (link) {
      article.classList.add("article-container--actionable");
      const url = link.getAttribute("href");
      article.addEventListener("click", () => {
        window.open(url, "_blank");
      });
    }
  });
};

// HANDLERS //

const autoScrollMultiCheckbox = (multiCheckbox) => {};

document.addEventListener("click", (e) => {
  //close open select, if any
  const gxLabelMultiCheckboxActive = rowSelectsEl.querySelector(
    ".gx-label--multi-checkbox--active"
  );
  if (gxLabelMultiCheckboxActive) {
    gxLabelMultiCheckboxActive.classList.remove(
      "gx-label--multi-checkbox--active"
    );
  }
  const gxMultiCheckboxOpened = rowSelectsEl.querySelector(
    ".gx-multi-checkbox--opened"
  );
  if (gxMultiCheckboxOpened) {
    gxMultiCheckboxOpened.classList.remove("gx-multi-checkbox--opened");
    displayScrollbar();
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
  /*checkboxes*/
  const checkboxes = multiCheckbox.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      checkbox.removeAttribute("disabled");
    });
  }
  closeOtherSelects(multiCheckbox);
  addMultiCheckboxListener(multiCheckbox);
};

const multiCheckboxLabelKeydownHandler = (e) => {
  const isActive = e.target.classList.contains(
    "gx-label--multi-checkbox--active"
  );
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
  console.log("pillClickedHandler");
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
  }
  if (sibling) {
    sibling.focus();
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
    powerUpCards();
    /*get config properties*/
    cardsPerLoad = gxFilterData.conf.cardsPerLoad;
    typeSingular = gxFilterData.conf.typeSingular[pageLang];
    typePlural = gxFilterData.conf.typePlural[pageLang];
    /*call functions*/
    defineFooterMessages();
    createCatsMapArray();
    hideAllCards();
    renderHeader();
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
