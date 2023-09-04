const pageLang = document.documentElement.lang;
/*filter data*/
let cardsPerLoad;
let type;
/*elements*/
let articlesListEl;
let filterHeaderEl;
let rowSelectsEl;
let rowActionsEl;
let rowActionsLeftColEl;
let rowActionsElRightColEl;
let articlesFooterEl;
let showMoreButtonEl;
let noMoreArticlesMessageEl;
/*arrays*/
let allArticles = [];
let multiCheckboxs = [];
let filteredArticles = [];

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
  /*text filter*/
  const textFilter = document.createElement("input");
  textFilter.setAttribute("type", "text");
  textFilter.setAttribute("placeholder", "AGL solutions");
  textFilter.classList.add("gx-input");
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
  rowMain.appendChild(textFilter);
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
        /*appends*/
        labelEl.appendChild(checkbox);
        labelEl.appendChild(descriptionEl);
        multiCheckbox.appendChild(labelEl);
      });

      /*add references*/
      multiCheckboxs.push(multiCheckbox);

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
    const filterButton = document.createElement("button");
    filterButton.classList.add("gx-button", "gx-button--filter");
    filterButton.setAttribute("id", "gx-filter-button");
    filterButton.innerText = filterButtonLabels[pageLang];
    filterButton.addEventListener("click", filterHandler);
    rowActionsElRightColEl.appendChild(filterButton);
  }
};

const renderClearButton = () => {
  if (rowActionsElRightColEl) {
    const clearButtonLabels = {
      en: "clear",
      es: "borrar",
      pt: "limpar",
    };
    const clearButton = document.createElement("button");
    clearButton.classList.add("gx-button", "gx-button--filter");
    clearButton.innerText = clearButtonLabels[pageLang];
    clearButton.addEventListener("click", clearFiltersHandler);
    rowActionsElRightColEl.appendChild(clearButton);
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
      en: `No more ${type} to display.`,
      es: `No hay más ${type} para mostrar.`,
      pt: `Não há mais ${type} para mostrar.`,
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

const getChecked = (multiCheckbox) => {
  const checkboxesArray = Array.from(
    multiCheckbox.querySelectorAll("input[type='checkbox']")
  );
  const selectedOptions = [];
  for (let i = 0; i < checkboxesArray.length; i++) {
    if (checkboxesArray[i].checked) {
      selectedOptions.push(checkboxesArray[i].getAttribute("id"));
    }
  }
  return selectedOptions;
};

const getSelectedOptions = () => {
  let selectedOptions = [];
  multiCheckboxs.forEach((multiCheckbox) => {
    selectedOptions = [...selectedOptions, ...getChecked(multiCheckbox)];
  });
  return selectedOptions;
};

const displayCards = () => {
  const filterConditions = getSelectedOptions();
  if (filterConditions.length > 0) {
  } else {
    filteredArticles = Array.from(allArticles);
    /*no filter condition*/
  }
  showMoreArticles();
};

const showMoreArticles = () => {
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

// HANDLERS //

const clearFiltersHandler = () => {};

const filterHandler = () => {
  const selectedOptions = getSelectedOptions();
  if (selectedOptions.length > 0 && allArticles.length > 0) {
    allArticles.forEach((article) => {});
  } else {
  }
};

const showMoreHandler = () => {
  showMoreArticles();
};

// INIT //

const init = () => {
  const ready = isFilterReady();
  if (ready) {
    console.log("allArticles", allArticles);
    /*get config properties*/
    cardsPerLoad = gxFilterData.conf.cardsPerLoad;
    type = gxFilterData.conf.type[pageLang];
    /*call functions*/
    hideAllCards();
    renderHeader();
    renderCategories(); //must be called after renderHeader();
    renderClearButton(); //must be called after renderHeader();
    renderFilterButton(); //must be called after renderHeader();
    renderFooter();
    renderShowMoreButton(); //must be called after renderFooter();
    renderNoMoreArticlesMessage(); //must be called after renderFooter();
    displayCards(); //must be called after renderCategories();
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
