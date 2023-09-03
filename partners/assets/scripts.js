const pageLang = document.documentElement.lang;
let articlesList;
let filterHeader;
let rowSelects;
let rowActions;
let rowActionsLeftCol;
let rowActionsRightCol;

const renderHeader = () => {
  /*header*/
  filterHeader = document.createElement("header");
  filterHeader.classList.add("header-filter");
  filterHeader.setAttribute("id", "header-filter");
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
  rowSelects = document.createElement("div");
  rowSelects.classList.add("row", "row--selects");
  rowSelects.setAttribute("id", "header-filters");
  /*footer row*/
  rowActions = document.createElement("div");
  rowActions.classList.add("row", "row--actions");
  rowActions.setAttribute("id", "header-actions");
  /*footer row left col*/
  rowActionsLeftCol = document.createElement("div");
  rowActionsLeftCol.classList.add("row", "row--actions__left-col");
  /*footer row right col*/
  rowActionsRightCol = document.createElement("div");
  rowActionsRightCol.classList.add("row", "row--actions__right-col");
  /*appends*/
  if (headerTitle) {
    rowMain.appendChild(headerTitle);
  }
  rowMain.appendChild(textFilter);
  filterHeader.appendChild(rowMain);
  filterHeader.appendChild(rowSelects);
  rowActions.appendChild(rowActionsLeftCol);
  rowActions.appendChild(rowActionsRightCol);
  filterHeader.appendChild(rowActions);
  articlesList.parentElement.insertBefore(filterHeader, articlesList);
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
      const multiSelectContainer = document.createElement("div");
      multiSelectContainer.classList.add("gx-select-container");

      /*create multi-select label*/
      const multiSelectLabel = document.createElement("label");
      multiSelectLabel.classList.add("gx-select-label");
      multiSelectLabel.setAttribute("for", type);
      multiSelectLabel.innerText = type;

      /*create multi-select*/
      const multiSelect = document.createElement("select");
      multiSelect.setAttribute("multiple", "multiple");
      multiSelect.setAttribute("id", type);
      multiSelect.classList.add("gx-select");

      /*create options*/
      cats.forEach((cat) => {
        const value = cat.value;
        const label = cat.label;
        const option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerText = cat.label[pageLang];
        multiSelect.appendChild(option);
      });

      /*appends*/
      multiSelectContainer.appendChild(multiSelectLabel);
      multiSelectContainer.appendChild(multiSelect);
      rowSelects.appendChild(multiSelectContainer);
    }
  });
};

const renderFilterButton = () => {
  if (rowActionsRightCol) {
    const filterButtonLabels = {
      en: "filter",
      es: "filtro",
      pt: "filtro",
    };
    const filterButton = document.createElement("button");
    filterButton.classList.add("gx-button", "gx-button--filter");
    filterButton.setAttribute("id", "gx-filter-button");
    filterButton.innerText = filterButtonLabels[pageLang];
    rowActionsRightCol.appendChild(filterButton);
  }
};

const renderClearButton = () => {
  if (rowActionsRightCol) {
    const clearButtonLabels = {
      en: "clear",
      es: "borrar",
      pt: "limpar",
    };
    const clearButton = document.createElement("button");
    clearButton.classList.add("gx-button", "gx-button--filter");
    clearButton.innerText = clearButtonLabels[pageLang];
    rowActionsRightCol.appendChild(clearButton);
  }
};

const init = () => {
  articlesList = document.querySelector("ul.articles");
  if (gxFilterData.cats.length && articlesList) {
    renderHeader();
    renderCategories();
    renderClearButton();
    renderFilterButton();
    if (filterHeader) {
      /*This is needed to calculate the .gx-select-container's width*/
      filterHeader.style.setProperty(
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
