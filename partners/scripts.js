const headerFilters = document.getElementById("header-filters");
const pageLang = document.documentElement.lang;

const renderHeader = () => {
  /*header*/
  const header = document.createElement("header");
  header.classList.add("header-filter");
  /*title*/
  if (data.filterTitle) {
    const headerTitle = document.createElement("h2");
    headerTitle.classList.add("header-filter__title");
    headerTitle.innerText = data.filterTitle[pageLang];
    /*main row*/
    const rowMain = document.createElement("div");
    rowMain.classList.add("row", "row--main");
  }
  /*text filter*/
  const textFilter = document.createElement("input");
  textFilter.setAttribute("type", "text");
  textFilter.setAttribute("placeholder", "AGL solutions");
  textFilter.setAttribute("placeholder", "AGL solutions");
};

const renderCategories = () => {
  /*categories*/
  const cats = data.cats;
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
      headerFilters.appendChild(multiSelectContainer);
    }
  });
};

const renderFilterButton = () => {
  const filterButtonLabels = {
    en: "filter",
    es: "filtro",
    pt: "filtro",
  };
  const filterButton = document.createElement("button");
  filterButton.classList.add("gx-filter-button");
  filterButton.innerText = filterButtonLabels[pageLang];
};

/*Create multi-selects*/
if (cats.length) {
  headerFilters.style.setProperty("--filters-length", cats.length);

  renderCategories();
}
