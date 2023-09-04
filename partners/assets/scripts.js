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
let rowActionsEl;
let rowActionsLeftColEl;
let rowActionsElRightColEl;
let articlesFooterEl;
let clearButtonEl;
let showMoreButtonEl;
let filterButtonEl;
let noMoreArticlesMessageEl;
/*arrays*/
let allArticles = [];
let multiCheckboxes = [];
let filteredArticles = [];
let currentSelectedCategories = [];
let prevSelectedCategories = [];

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
  textFilterLabel.classList.add("gx-input-label");
  textFilterLabel.innerText = textFilterLabels[pageLang];
  /*text filter*/
  textFilterEl = document.createElement("input");
  textFilterEl.setAttribute("type", "text");
  textFilterEl.setAttribute("placeholder", "AGL solutions");
  textFilterEl.classList.add("gx-input");
  textFilterEl.addEventListener("input", filterInputHandler);
  /*main row*/
  const rowMain = document.createElement("div");
  rowMain.classList.add("row", "row--main");
  /*selects row*/
  rowSelectsEl = document.createElement("div");
  rowSelectsEl.classList.add("row", "row--selects");
  rowSelectsEl.setAttribute("id", "header-filters");
  /*footer row*/
  rowActionsEl = document.createElement("div");
  rowActionsEl.classList.add("row", "row--actions");
  rowActionsEl.setAttribute("id", "header-actions");
  /*footer row left col*/
  rowActionsElLeftCol = document.createElement("div");
  rowActionsElLeftCol.classList.add("row", "row--actions__left-col");
  /*footer row right col*/
  rowActionsElRightColEl = document.createElement("div");
  rowActionsElRightColEl.classList.add("row", "row--actions__right-col");
  /*appends*/
  if (headerTitle) {
    rowMain.appendChild(headerTitle);
  }
  textFilterLabel.appendChild(textFilterEl);
  rowMain.appendChild(textFilterLabel);
  filterHeaderEl.appendChild(rowMain);
  filterHeaderEl.appendChild(rowSelectsEl);
  rowActionsEl.appendChild(rowActionsElLeftCol);
  rowActionsEl.appendChild(rowActionsElRightColEl);
  filterHeaderEl.appendChild(rowActionsEl);
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
      const multiCheckboxLabel = document.createElement("label");
      multiCheckboxLabel.classList.add("gx-multi-checkbox-label");
      multiCheckboxLabel.setAttribute("for", type);
      multiCheckboxLabel.innerText = type;

      /*create multi-checkbox*/
      const multiCheckbox = document.createElement("div");
      multiCheckbox.classList.add("gx-multi-checkbox");

      /*create options*/
      cats.forEach((cat) => {
        const value = cat.value;
        const label = cat.label[pageLang];
        const labelEl = document.createElement("label");
        const descriptionEl = document.createElement("span");
        descriptionEl.classList.add("gx-label-description");
        descriptionEl.innerText = label;
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", value);
        checkbox.addEventListener("change", checkboxChangedHandler);
        /*test checked by default*/
        // if (label === "diamond" || label === "member") {
        //   checkbox.checked = true;
        // }
        /*/test checked by default*/
        /*appends*/
        labelEl.appendChild(checkbox);
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

const renderFilterButton = () => {
  if (rowActionsElRightColEl) {
    const filterButtonLabels = {
      en: "filter",
      es: "filtro",
      pt: "filtro",
    };
    filterButtonEl = document.createElement("button");
    filterButtonEl.classList.add("gx-button", "gx-button--filter");
    filterButtonEl.setAttribute("id", "gx-filter-button");
    filterButtonEl.innerText = filterButtonLabels[pageLang];
    filterButtonEl.addEventListener("click", filterHandler);
    rowActionsElRightColEl.appendChild(filterButtonEl);
  }
};

const renderClearButton = () => {
  if (rowActionsElRightColEl) {
    const clearButtonLabels = {
      en: "clear",
      es: "borrar",
      pt: "limpar",
    };
    clearButtonEl = document.createElement("button");
    clearButtonEl.classList.add("gx-button", "gx-button--filter");
    clearButtonEl.innerText = clearButtonLabels[pageLang];
    clearButtonEl.addEventListener("click", clearHandler);
    rowActionsElRightColEl.appendChild(clearButtonEl);
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
    showMoreButtonEl.classList.add("gx-button", "gx-button--show-more");
    showMoreButtonEl.innerText = showMoreButtonLabels[pageLang];
    showMoreButtonEl.addEventListener("click", showMoreHandler);
    articlesFooterEl.appendChild(showMoreButtonEl);
  }
};

const renderNoMoreArticlesMessage = () => {
  if (articlesFooterEl) {
    const messageLabels = {
      en: `No more ${typePlural} to display.`,
      es: `No hay más ${typePlural} para mostrar.`,
      pt: `Não há mais ${typePlural} para mostrar.`,
    };
    noMoreArticlesMessageEl = document.createElement("p");
    noMoreArticlesMessageEl.classList.add("no-more-articles");
    noMoreArticlesMessageEl.innerText = messageLabels[pageLang];
    articlesFooterEl.appendChild(noMoreArticlesMessageEl);
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

/* #show more */
const showMore = (all = false) => {
  if (filteredArticles.length > 0) {
    let shownArticlesLength = 0;
    for (let i = 0; i < filteredArticles.length; i++) {
      filteredArticles[i].removeAttribute("hidden");
      shownArticlesLength++;
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
      showElement(noMoreArticlesMessageEl);
    } else {
      showElement(showMoreButtonEl);
      hideElement(noMoreArticlesMessageEl);
    }
  } else {
    hideElement(showMoreButtonEl);
    showElement(noMoreArticlesMessageEl);
  }
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
    console.log("include all");
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
};

// HANDLERS //

const filterInputHandler = (e) => {
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
    filteredArticles.forEach((article) => {
      const hidden = article.hasAttribute("hidden");
      const title = article.querySelector(".title").innerText.toLowerCase();
      if (title.includes(value) && hidden) {
        article.removeAttribute("hidden");
      } else if (!title.includes(value) && !hidden) {
        article.setAttribute("hidden", "hidden");
      }
    });
  }
};

const checkboxChangedHandler = (e) => {
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

/* #clear handler */
const clearHandler = () => {
  clearFilters();
  setSelectedCategories();
  evaluateFilterDifference();
  hideAllCards();
  filter();
  showMore();
};

/* #filter handler */
const filterHandler = () => {
  textFilterEl.value = "";
  hideAllCards();
  filter();
  showMore();
  evaluateFilterDifference();
};

const showMoreHandler = () => {
  showMore();
};

// INIT //

const init = () => {
  const ready = isFilterReady();
  if (ready) {
    /*get config properties*/
    cardsPerLoad = gxFilterData.conf.cardsPerLoad;
    typeSingular = gxFilterData.conf.typeSingular[pageLang];
    typePlural = gxFilterData.conf.typePlural[pageLang];
    /*call functions*/
    hideAllCards();
    renderHeader();
    renderCategories(); //must be called after renderHeader();
    renderClearButton(); //must be called after renderHeader();
    renderFilterButton(); //must be called after renderHeader();
    renderFooter();
    renderShowMoreButton(); //must be called after renderFooter();
    renderNoMoreArticlesMessage(); //must be called after renderFooter();
    setSelectedCategories(); //must be called after renderCategories();
    evaluateFilterDifference(); //must be called after setSelectedCategories();
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
