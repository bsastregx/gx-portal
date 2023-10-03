/*
INDEX:
1.VARIABLES
2.OTHER
3.CSS VARIABLES
4.RENDERS
5.HELPER FUNCTIONS
6.HANDLERS
7.INIT
*/

/*----------------------
1.VARIABLES
----------------------*/

const pageLang = document.documentElement.lang;
/*filter data*/
let cardsPerLoad;
let typePlural;
let typeSingular;

/*HTML ELEMENTS (HEADER)*/
let filterHeaderEl; //El header que contiene todo (row--main, row--selects, row--actions, row--info) | .header-filter
//header > 1.row--main
let textFilterLabelEl; //El input de búsqueda por teclado | .gx-input--filter
let textFilterEl; //El label del filtro de texto "Search by partner name". | .gx-label--filter
let burgerButton; //El burger button que togglea el menu. Solo visible en mobile. | #burger
//header > 2.row--selects
let rowSelectsOuterWrapper; //El wrapper externo de los selects | .row--selects-outer-wrapper
let rowSelectsInnerWrapper; //El wrapper interno de los selects | .row--selects-inner-wrapper
let rowSelectsEl; //El div que contiene a los selects (multi-checkbox) | .row--selects
let viewResultsButtonEl; //Botón 'View Result' (solo mobile)
//header > 3.row--actions
let rowActionsEl; //El row que contiene acciones (pills, botón de clear) | .row--actions
let rowActionsLeftColEl; //La columna izquierda del row de acciones (pills) | .row--actions__left-col
let rowActionsLeftColInnerWrapperEl; //Un wrapper interno de la columna izquierda del row de acciones | .row--actions__left-col-inner-wrapper
let rowActionsElRightColEl; //La columna derecha del row de acciones (pills) | .row--actions__right-col
let clearButtonEl; //El botón que permite limpiar los filtros (Clear Filter) | .gx-button--clear
//header > 4.row--info
let clearInputSuggestionEl; //Sugerencia de shortcut para limpiar el filtro por búsqueda. | .gx-clear-suggestion
let rowInfoEl; //

/*HTML ELEMENTS (ARTICLES)*/
let articlesListEl; //La lista de artículos. Viene dada desde portal | ul.articles

/*HTML ELEMENTS (FOOTER)*/
let articlesFooterEl; //Contiene el botón "Show more" o mensajes. Ej. "No more partners to display" | .articles-footer
let showMoreButtonEl; //Botón para mostrar mas resultados | .gx-button--show-more
let footerMessagesSlotEl; //Es el contenedor de la info que se muestra en el footer (ilustración, título y descripción) | .footer-messages
let footerMessagesIllustrationEl; //Tag img para la ilustración | .footer-messages__illustration
let footerMessagesTitleEl; //span para el titulo del mensaje del footer | .footer-messages__title
let footerMessagesDescriptionEl; //span para ela descripción del mensaje del footer | .footer-messages__description
let numberPlaceholderEl; //span que muestra la cantidad de tarjetas mostradas | #showing-number

/*ARRAYS*/
let allArticles = []; //La cantidad de artículos totales que contiene la página
let allArticlesUniqueCats = []; //Array que guarda todas las categorías de todos los artículos, sin repetir. Se utiliza en getAllArticleCats, y en el renderizado de las categorías, solo si 'hideEmptyCats' en cats.js es true.
let catsMap = []; //Array con todas las categorías definidas en cats.js. Mapea el id con el label (descripción). Se llama una vez en init()
let currentSelectedCategories = []; //Contiene las categorías actualmente seleccionadas. Se usa por ejemplo, para renderizar las pills.
let filteredArticles = []; //Artículos filtrados
let membershipCategories = []; //Categorías del tipo 'membership'. Se utilizan para mostrar el label 'Diamond' o 'Platinum'
let multiCheckboxes = []; //Referencias a los selects (multi-checkboxes). Ej. Category | Partner Types | Industries | Services, etc...

/*----------------------
2.OTHER
----------------------*/

var userAgent = navigator.userAgent; //Se usa para saber si es windows o mac, a fin de mostrar el shortcut correcto en 'clearInputSuggestionEl'
let visibleCards = 0; //La cantidad de tarjetas visibles
let textFilterBackspaceCounter = 0; //Cantidad de backspaces seguidos que el usuario digitó
let footerMessages; //Objeto que contiene las posibles descripciones para mostrar en el footer.
let isMobile = false; //Variable que indica si el dispositivo es mobile o no. Se usa para mostrar ciertos elementos que se usan solo en mobile.

/*EVENT LISTENERS*/
const timeBeforeCloseSelect = 400; //Tiempo de espera antes de cerrar el select luego que el puntero del mouse lo abandonó. Se cancela si el puntero vuelve a entrar antes.
const clearPillTransition = 150; //Tiempo que se usa para la transición al eliminar la pill.
const selectHeightTransition = 150; //Tiempo que se usa para la transición que anima la altura del select (multi-checkbox).
let labelMouseLeaveHandler; //Evento que se dispara cuando el mouse abandona el botón (.gx-label--multi-checkbox) que abre el select.
let multiCheckboxMouseLeaveHandler; //Evento que se dispara cuando el mouse abandona el select (multi-checkbox).
let multiCheckboxMouseEnterHandler; //Evento que se dispara cuando el mouse entra en el select (multi-checkbox).
let timeOutHideSelectRef; //Referencia a un setTimeout, que se usa para evitar que el select se cierre después de 'timeBeforeCloseSelect' si el puntero volvió a entrar antes de ese tiempo.

const timeOutHideSelect = (multiCheckbox, blur = false) => {
  multiCheckbox.classList.remove("gx-multi-checkbox--opened");
  displayScrollbar();
  const gxLabelMultiCheckbox = multiCheckbox.previousElementSibling;
  if (!isMobile) {
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

/*----------------------
3.CSS VARIABLES
----------------------*/

const body = document.querySelector("body");
const html = document.querySelector("html");
html.style.setProperty("--gx-transition--pill", `${clearPillTransition}ms`); //Tiempo que se usa para la transición de la pill, cuando se oculta al cerrarla.
html.style.setProperty(
  "--gx-select-transition-height-speed",
  `${selectHeightTransition}ms`
); //Tiempo que se usa para la velocidad de apertura/cierre del select (multi-checkbox)
html.style.setProperty(
  "--gx-desktop-lg-width",
  `${gxFilterData.conf.desktopLgWidth}px`
); //El ancho del contenedor de todo, sin contar el padding (si tuviera). Se usa para calcular el ancho del select '.gx-multi-checkbox-container', que es el mismo para todos.

/*----------------------
4.RENDERS
----------------------*/

/**
 * Hace el render del header, que es todo lo que aparece antes de las cards (1.row--main, 2.row--selects, 3.row--actions, 4.row--info).
 */
const renderHeader = () => {
  /*header*/
  filterHeaderEl = document.createElement("header");
  filterHeaderEl.classList.add("header-filter");
  filterHeaderEl.setAttribute("id", "header-filter");

  /*header title wrapper*/
  headerTitleWrapperEl = document.createElement("div");
  headerTitleWrapperEl.classList.add("header-filter__title-wrapper");

  /*header title wrapper burguer*/
  burgerButton = `
  <button type="button" class="burger" id="burger" onclick="burgerHandler(this)">
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  </button>
  `;

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
  textFilterLabelEl = document.createElement("label");
  textFilterLabelEl.classList.add("gx-label", "gx-label--filter");
  textFilterLabelEl.innerText = textFilterLabels[pageLang];
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
  textFilterEl.addEventListener("keydown", filterKeyDownHandler);
  textFilterEl.addEventListener("keyup", filterKeyUpHandler);
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
  /*row actions*/
  rowActionsEl = document.createElement("div");
  rowActionsEl.classList.add("row", "row--actions");
  rowActionsEl.setAttribute("id", "header-actions");
  /*row actions | left col*/
  rowActionsLeftColEl = document.createElement("div");
  rowActionsLeftColEl.classList.add("row", "row--actions__left-col");
  /*row actions | left col inner-wrapper*/
  rowActionsLeftColInnerWrapperEl = document.createElement("div");
  rowActionsLeftColInnerWrapperEl.classList.add(
    "row--actions__left-col-inner-wrapper"
  );
  /*row actions | right col*/
  rowActionsElRightColEl = document.createElement("div");
  rowActionsElRightColEl.classList.add("row", "row--actions__right-col");
  /*row info*/
  rowInfoEl = document.createElement("div");
  rowInfoEl.classList.add("row", "row--info");
  rowInfoEl.setAttribute("id", "header-info");
  hideElement(rowInfoEl);
  /*appends*/
  if (headerTitle && headerTitleWrapperEl) {
    if (isMobile) {
      headerTitleWrapperEl.innerHTML = burgerButton;
    }
    headerTitleWrapperEl.appendChild(headerTitle);
    rowMain.appendChild(headerTitleWrapperEl);
  }
  textFilterLabelEl.appendChild(textFilterWrapper);
  if (!isMobile) {
    textFilterWrapper.appendChild(clearInputSuggestionEl);
  }
  textFilterWrapper.appendChild(textFilterEl);
  if (isMobile) {
    rowSelectsOuterWrapper.classList.add("row--selects-outer-wrapper--hidden");
    rowMain.appendChild(rowSelectsOuterWrapper);
  }
  rowMain.appendChild(textFilterLabelEl);
  filterHeaderEl.appendChild(rowMain);
  rowSelectsInnerWrapper.appendChild(rowSelectsEl);
  rowSelectsOuterWrapper.appendChild(rowSelectsInnerWrapper);
  if (!isMobile) {
    filterHeaderEl.appendChild(rowSelectsOuterWrapper);
  }
  rowActionsLeftColInnerWrapperEl.appendChild(rowActionsLeftColEl);
  rowActionsEl.appendChild(rowActionsLeftColInnerWrapperEl);
  rowActionsEl.appendChild(rowActionsElRightColEl);
  filterHeaderEl.appendChild(rowActionsEl);
  filterHeaderEl.appendChild(rowInfoEl);
  articlesListEl.parentElement.insertBefore(filterHeaderEl, articlesListEl);
  burgerButton = document.getElementById("burger");
};

/**
 * Hace el render de todos los selects (multi-checkboxes) y los inserta en row--selects.
 */
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
        multiCheckboxLabelKeyDownHandler
      );
      multiCheckboxLabel.innerText = cat.label[pageLang];

      /*create multi-checkbox*/
      const multiCheckbox = document.createElement("div");
      multiCheckbox.classList.add("gx-multi-checkbox");

      /*create options*/
      cats.forEach((cat) => {
        const value = cat.value;
        if (type === "category") {
          /*this is the membership category. Save items to use for the cards labels*/
          membershipCategories.push({
            id: value,
            label: cat.label[pageLang],
          });
        }

        let renderCat = true;
        if (gxFilterData.conf.hideEmptyCats) {
          //if hideEmptyCats is true, we only want to add the category, if there is at least one article/card with this category. We already know that, if the cat exists in 'allArticlesUniqueCats'.
          catFoundIndex = allArticlesUniqueCats.findIndex((arrayCat) => {
            return arrayCat === value;
          });
          if (catFoundIndex !== -1) {
            //cat found. Remove from 'allArticlesUniqueCats' to reduce array length for next time.
            allArticlesUniqueCats.splice(catFoundIndex, 1);
          } else {
            //cat does not exists in any card/article. Do not render.
            renderCat = false;
          }
        }

        if (renderCat) {
          const checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.setAttribute("id", value);
          disableElement(checkbox);
          checkbox.addEventListener("keydown", checkboxKeyDownHandler);
          checkbox.addEventListener("click", (e) => {
            e.stopPropagation();
          });
          const label = cat.label[pageLang];
          const labelEl = document.createElement("label");
          labelEl.setAttribute("for", value);
          labelEl.addEventListener("click", inputCheckboxLabelClickHandler);
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
        }
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

/**
 * Hace el render del texto que indica la cantidad de cards que se están mostrando, y las totales.
 */
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

/**
 * Hace el render del botón de clear (limpia los filtros)
 */
const renderClearButton = () => {
  if (rowActionsElRightColEl) {
    const clearButtonLabels = {
      en: "clear filter",
      es: "borrar filtro",
      pt: "limpar filtro",
    };
    clearButtonEl = document.createElement("button");
    clearButtonEl.classList.add(
      "gx-button",
      "gx-button--clear",
      "gx-button--link",
      "gx-button--sm"
    );
    clearButtonEl.innerText = clearButtonLabels[pageLang];
    clearButtonEl.addEventListener("click", clearHandler);
    /*disable clear filter button, assuming there are no categories checked on first render*/
    hideElement(clearButtonEl);

    if (isMobile && rowSelectsInnerWrapper) {
      rowSelectsInnerWrapper.appendChild(clearButtonEl);
    } else {
      rowActionsElRightColEl.appendChild(clearButtonEl);
    }
  }
};

/**
 * Hace el render del botón "Ver Resultado". Solo visible en mobile.
 */
const renderViewResultsButton = () => {
  if (isMobile && rowSelectsInnerWrapper) {
    const viewResultsButtonLabels = {
      en: `view result`,
      es: `ver resultado`,
      pt: `ver resultado`,
    };

    viewResultsButtonEl = document.createElement("button");
    viewResultsButtonEl.classList.add(
      "gx-button",
      "gx-button--primary",
      "gx-button--full-width"
    );
    disableElement(viewResultsButtonEl);
    viewResultsButtonEl.innerText = viewResultsButtonLabels[pageLang];
    viewResultsButtonEl.addEventListener("click", viewResultsButtonHandler);
    rowSelectsInnerWrapper.appendChild(viewResultsButtonEl);
  }
};

/**
 *  Hace el render solo del footer (No lo que esta dentro).
 */
const renderFooter = () => {
  if (articlesListEl) {
    articlesFooterEl = document.createElement("footer");
    articlesFooterEl.classList.add("articles-footer");
    articlesListEl.after(articlesFooterEl);
  }
};

/**
 * Hace el render del botón "Ver mas" que carga mas artículos. Se inserta en el footer.
 */
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

/**
 * Hace el render del "slot" de mensajes, y de los elementos que van dentro de él (La ilustración, el titulo, y la descripción de los mensajes)
 */
const footerMessagesSlot = () => {
  if (articlesFooterEl) {
    /*footer messages*/
    footerMessagesSlotEl = document.createElement("p");
    footerMessagesSlotEl.classList.add("footer-messages");
    /*footer messages image*/
    footerMessagesIllustrationEl = document.createElement("img");
    footerMessagesIllustrationEl.classList.add("footer-messages__illustration");
    footerMessagesIllustrationEl.setAttribute(
      "src",
      gxFilterData.conf.noResultsImgSrc
    );
    /*footer messages title*/
    footerMessagesTitleEl = document.createElement("span");
    footerMessagesTitleEl.classList.add("footer-messages__title");
    /*footer messages description*/
    footerMessagesDescriptionEl = document.createElement("span");
    footerMessagesDescriptionEl.classList.add("footer-messages__description");
    /*appends*/
    footerMessagesSlotEl.appendChild(footerMessagesIllustrationEl);
    footerMessagesSlotEl.appendChild(footerMessagesTitleEl);
    footerMessagesSlotEl.appendChild(footerMessagesDescriptionEl);
    articlesFooterEl.appendChild(footerMessagesSlotEl);
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

/*----------------------
5.HELPER FUNCTIONS
----------------------*/

/**
 * Devuelve un array de los selects que están actualmente abiertos.
 */
const getOpenedMultiCheckbox = () => {
  if (rowSelectsEl) {
    return Array.from(
      rowSelectsEl.querySelectorAll(".gx-multi-checkbox--opened")
    );
  }
};

/**
 * It evaluates if the mobile view result button, should be displayed or hidden, depending on whether there are results to show or not.
 */
const toggleViewResultButton = () => {
  if (isMobile) {
    if (filteredArticles.length > 0) {
      enableElement(viewResultsButtonEl);
    } else {
      disableElement(viewResultsButtonEl);
    }
  }
};

/**
 * It evaluates if the burger toggle should display a visual hint informing the user that there are one or more categories selected.
 */
const burgerHasFilters = () => {
  if (burgerButton) {
    if (currentSelectedCategories.length > 0) {
      burgerButton.classList.add("burger--has-filters");
    } else {
      burgerButton.classList.remove("burger--has-filters");
    }
  }
};

/**
 * Activates/deactivates horizontal scrolling with the mousewheel on .row--selects-inner-wrapper
 */

const horizontalScroll = (activate) => {
  if (activate) {
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

/**
 * Devuelve la categoría del tipo membership (Platinum, Gold, etc) que se muestra en la card arriba del titulo.
 */
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
 * Esconde todas las tarjetas.
 */
const hideAllCards = () => {
  if (allArticles.length) {
    allArticles.forEach((article) => {
      hideElement(article);
    });
  }
};

/**
 * Muestra todas las tarjetas.
 */
const showAllCards = () => {
  if (allArticles.length) {
    allArticles.forEach((article) => {
      showElement(article);
    });
  }
};

/**
 * Devuelve los checkboxes chequeados de un select en particular.
 */
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

/**
 * It unchecks a checked category. Only called when a pill from a selected category gets clicked (cleared)
 */
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
      filterHandler();
    }
  }
  if (currentSelectedCategories.length === 0) {
    hideElement(clearButtonEl);
    hideElement(rowInfoEl);
  }
};

/**
 * La función que se encarga de mostrar mas cards, cuando el usuario presiona el botón 'show more'
 */
const showMore = () => {
  if (filteredArticles.length > 0) {
    let shownArticlesLength = 0;
    for (let i = 0; i < filteredArticles.length; i++) {
      showElement(filteredArticles[i]);
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
      hideElement(footerMessagesIllustrationEl);
      footerMessagesTitleEl.innerText = "";
      footerMessagesDescriptionEl.innerText =
        footerMessages.noMorePartners[pageLang];
    } else {
      showElement(showMoreButtonEl);
      hideElement(footerMessagesIllustrationEl);
      footerMessagesTitleEl.innerText = "";
      footerMessagesDescriptionEl.innerText = "";
    }
  } else {
    hideElement(showMoreButtonEl);
    visibleCards = 0;
    showElement(footerMessagesIllustrationEl);
    footerMessagesTitleEl.innerText =
      footerMessages.noMatchFoundTitle[pageLang];
    footerMessagesDescriptionEl.innerText =
      footerMessages.noMatchFoundDescription[pageLang];
    hideElement(rowInfoEl);
  }
  updateShowingArticles();
};

/**
 * Se encarga de hacer un scroll hasta el footer, luego de que el usuario presiono el botón "Show More" y se cargaron mas cards. Se utiliza un setTimeout para asegurar que funciona bien siempre. De lo contrario, a veces no se mueve.
 */
const scrollDown = () => {
  setTimeout(() => {
    articlesFooterEl.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 150);
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
 * Oculta un elemento de golpe, agregando el atributo 'hidden'
 */
const hideElement = (elementRef) => {
  elementRef.setAttribute("hidden", "");
};

/**
 * Muestra un elemento de golpe, quitando el atributo 'hidden'
 */
const showElement = (elementRef) => {
  elementRef.removeAttribute("hidden");
};

/**
 * Helper function that evaluates if everything that is needed to run the filter is met. Returns a boolean
 */
const isFilterReady = () => {
  articlesListEl = document.querySelector("ul.articles");
  if (articlesListEl) {
    allArticles = Array.from(articlesListEl.querySelectorAll(":scope > li"));
  }
  return gxFilterData.cats.length && allArticles.length > 0;
};

/**
 * Devuelve un array de las categorías (id's) de un articulo
 */
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

/**
 * Filtra artículos tomando en cuenta las categorías seleccionadas.
 */
const filter = () => {
  filteredArticles = [];
  if (currentSelectedCategories.length > 0 && allArticles.length > 0) {
    /*one or more categories selected. filter articles*/
    allArticles.forEach((article) => {
      let isAMatch = false;
      const articleCats = getArticleCats(article);
      if (articleCats.length > 0) {
        for (let i = 0; i < articleCats.length; i++) {
          const catFound = currentSelectedCategories.find(
            (cat) => cat === articleCats[i]
          );
          if (catFound) {
            isAMatch = true;
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
  /*update "Clear Filter" label to be plural or singular depending on the selected categories length*/
  if (currentSelectedCategories.length > 1) {
    clearButtonEl.classList.add("gx-button--clear--plural");
  } else {
    clearButtonEl.classList.remove("gx-button--clear--plural");
  }
};

/**
 * Sets the initial state of the selected categories. Only called on init().
 */
const setSelectedCategories = () => {
  let selectedCats = [];
  if (multiCheckboxes.length > 0) {
    multiCheckboxes.forEach((mc) => {
      selectedCats = [...selectedCats, ...getChecked(mc)];
    });
  }
  currentSelectedCategories = [...selectedCats];
};

/**
 * Se usa para limpiar los filtros. Des-chequea las categorías activas, oculta la ilustración del footer, y limpia el titulo y la descripción del footer.
 */
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
  hideElement(footerMessagesIllustrationEl);
  footerMessagesTitleEl.innerText = "";
  footerMessagesDescriptionEl.innerText = "";
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
 * Muestra la scrollbar horizontal del contenedor de los selects. Cuando los selects no entran en el contenedor, se muestra una scrollbar, que permite deslizar horizontalmente. Pero cuando se abre un select, hay que ocultarla, porque de lo contrario, queda visible debajo del select. Esta función la vuelve a mostrar luego de que se cierra el select.
 */
const displayScrollbar = () => {
  /*show scrollbar again*/
  setTimeout(() => {
    rowSelectsInnerWrapper.classList.remove("hide-scrollbar");
  }, selectHeightTransition);
};

/**
 * Mejora las cards: aplica un link a toda la card, y lo ejecuta en click o enter. Agrega el label de categoría membership (Diamond, Platinum, etc)
 */
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

/*----------------------
6.HANDLERS
----------------------*/

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
  //remove listener
  if (!isMobile) {
    clickedLabel.removeEventListener("mouseleave", labelMouseLeaveHandler);
  }
};

/**
 * El handler de la burger (Solo para mobile)
 */
function burgerHandler(button) {
  button.classList.toggle("active");
  rowSelectsOuterWrapper.classList.toggle("row--selects-outer-wrapper--hidden");
  body.classList.toggle("filter-menu-opened");
}

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
 * Se usa para cerrar los selects, si es que hay alguno abierto.
 */
document.addEventListener("click", (e) => {
  //close open select, if any
  const openedMultiCheckbox = rowSelectsEl.querySelector(
    ".gx-multi-checkbox--opened"
  );
  if (openedMultiCheckbox) {
    timeOutHideSelect(openedMultiCheckbox);
  }
});

/**
 * El handler que se ejecuta cuando el usuario selecciona una categoría.
 */
function inputCheckboxLabelClickHandler(e) {
  e.stopPropagation();
  e.preventDefault();
  const inputCheckboxLabel = this;
  inputCheckboxLabel.focus();
  const inputCheckbox = inputCheckboxLabel.previousElementSibling;
  checkboxChangedHandler(inputCheckbox);
}

/**
 * Agrega listeners de mouseleave, y mouseenter en el select (multi-checkbox).
 */
const addMultiCheckboxListener = (multiCheckbox) => {
  multiCheckbox.addEventListener("mouseleave", multiCheckboxMouseLeaveHandler);
  multiCheckbox.addEventListener("mouseenter", multiCheckboxMouseEnterHandler);
};

/**
 * Handler para el click del label del select (en realidad es un botón)
 */
const multiCheckboxLabelClickHandler = (e) => {
  e.stopPropagation();
  /*hide scrollbar*/
  rowSelectsInnerWrapper.classList.add("hide-scrollbar");
  /*label*/
  const clickedLabel = e.target;
  clickedLabel.classList.toggle("gx-label--multi-checkbox--active");
  if (!isMobile) {
    clickedLabel.addEventListener("mouseleave", labelMouseLeaveHandler);
  }
  /*multi-checkbox*/
  const multiCheckbox = clickedLabel.nextElementSibling;
  multiCheckbox.classList.toggle("gx-multi-checkbox--opened");
  enableCheckboxes(multiCheckbox);
  closeOtherSelects(multiCheckbox);
  if (!isMobile) {
    addMultiCheckboxListener(multiCheckbox);
  }
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
 * Handler que se ejecuta al hacer click en una pill
 */
const pillClickedHandler = (e) => {
  e.stopPropagation();
  const pillClicked = e.target;
  const catId = e.target.getAttribute("data-cat");
  pillClicked.classList.add("gx-button-pill--hidden");
  setTimeout(() => {
    if (catId) {
      removeChecked(catId);
      burgerHasFilters();
    }
  }, clearPillTransition);
};

/**
 * Handler para la búsqueda por filtro de texto
 */
const filterInputHandler = (e) => {
  hideElement(showMoreButtonEl);
  if (currentSelectedCategories.length > 0) {
    clearFilters();
    setSelectedCategories();
  }
  if (filteredArticles.length < allArticles.length) {
    /*we want to search in all articles*/
    filteredArticles = [...allArticles];
  }
  const value = e.target.value.toLowerCase();
  if (filteredArticles.length > 0) {
    visibleCards = 0;
    filteredArticles.forEach((article) => {
      const title = article.querySelector(".title").innerText.toLowerCase();
      if (title.includes(value)) {
        showElement(article);
        visibleCards++;
        if (title === value) {
          //exact match!
          article.classList.add("article-container--exact-match");
        } else {
          article.classList.remove("article-container--exact-match");
        }
      } else if (!title.includes(value)) {
        hideElement(article);
        article.classList.remove("article-container--exact-match");
      }
    });
    if (visibleCards > 0 && value.length > 0) {
      hideElement(footerMessagesIllustrationEl);
      footerMessagesTitleEl.innerText = "";
      footerMessagesDescriptionEl.innerText = "";
      showElement(rowInfoEl);
    } else if (visibleCards > 0 && value.length === 0) {
      /*reset*/
      hideElement(footerMessagesIllustrationEl);
      footerMessagesTitleEl.innerText = "";
      footerMessagesDescriptionEl.innerText = "";
      clearHandler();
    } else {
      showElement(footerMessagesIllustrationEl);
      footerMessagesTitleEl.innerText =
        footerMessages.noMatchFoundTitle[pageLang];
      footerMessagesDescriptionEl.innerText =
        footerMessages.noMatchFoundDescription[pageLang];
      hideElement(rowInfoEl);
    }
  }
  updateShowingArticles();
};

/**
 * Handler para el evento keyDown del filtro de texto. Se usa para detectar backspace, ctrl, cmd, y sugerir combinación de teclas al usuario para borrar el campo rápidamente.
 */
const filterKeyDownHandler = (e) => {
  /**
   * Suggest the user to hit ctrl + backspace to delete
   */
  let ctrlKey = e.code === "ControlLeft" || e.code === "ControlRight";
  let cmdKey = e.code === "MetaLeft" || e.code === "MetaRight";
  if (
    (e.key === "Backspace" && e.ctrlKey) ||
    (e.key === "Backspace" && e.metaKey)
  ) {
    clearInputSuggestionEl.remove();
  } else if (e.key === "Backspace") {
    textFilterBackspaceCounter++;
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

/**
 * Se usa en combinación con filterKeyDownHandler
 */
const filterKeyUpHandler = () => {
  /**
   * Clear "hit ctrl + backspace to delete" suggestion if input value is empty
   */
  if (textFilterEl.value.length === 0) {
    textFilterBackspaceCounter = 0;
    clearInputSuggestionEl.classList.add("gx-clear-suggestion--hidden");
  }
};

/**
 * Se usa para cambiar el estado de un checkbox (checked/unchecked). Remueve la categoría de 'currentSelectedCategories', y oculta o muestra el botón de 'clear' y la row de información, en función de si hay o no alguna categoría seleccionada.
 */
const checkboxChangedHandler = (checkbox) => {
  let checked = true;
  if (checkbox.checked) {
    checked = false;
  }
  const cat = checkbox.getAttribute("id");
  if (checked) {
    checkbox.checked = true;
    currentSelectedCategories.push(cat);
  } else {
    checkbox.checked = false;
    const indexToDelete = currentSelectedCategories.findIndex((selectedCat) => {
      return cat === selectedCat;
    });
    if (indexToDelete !== -1) {
      currentSelectedCategories.splice(indexToDelete, 1);
    }
  }
  if (currentSelectedCategories.length === 0) {
    hideElement(clearButtonEl);
    hideElement(rowInfoEl);
  } else {
    showElement(clearButtonEl);
    showElement(rowInfoEl);
  }
  burgerHasFilters();
  filterHandler();
};

/**
 * Listener del evento KeyDown del checkbox. Se usa para navegar, seleccionar, o cerrar el select.
 */
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
    const checkboxLabel = e.target.nextElementSibling;
    if (checkboxLabel) {
      checkboxLabel.click();
    }
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

/**
 * Se usa para obtener el numero de cards visibles, y mostrar ese numero en la row de información "Mostrando X cards de tantas"
 */
const updateShowingArticles = () => {
  const visibleCards = articlesListEl.querySelectorAll(
    ":scope > *:not([hidden])"
  );
  numberPlaceholderEl.innerText = visibleCards.length;
};

/**
 * Handler del botón "clear filters"
 */
const clearHandler = async (e) => {
  if (e) {
    const button = e.target;
    hideElement(button);
  }
  // Comento lo siguiente, porque creo que no se esta usando más.
  // if (isMobile) {
  //   rowActionsLeftColInnerWrapperEl.classList.add(
  //     "row--actions__left-col-inner-wrapper--hidden"
  //   );
  //   await asyncClearPills();
  //   rowActionsLeftColInnerWrapperEl.classList.remove(
  //     "row--actions__left-col-inner-wrapper--hidden"
  //   );
  // }
  clearFilters();
  setSelectedCategories();
  hideAllCards();
  filter();
  showMore();
  updateShowingArticles();
  renderPills();
  hideElement(rowInfoEl);
};

/**
 * Handler del botón "View Results" (Sólo disponible en mobile).
 */
const viewResultsButtonHandler = () => {
  if (isMobile && burgerButton) {
    burgerButton.click();
  }
};

/**
 * Delay que se usa con un await,
 */
// Comento lo siguiente, porque creo que no se esta usando más.
// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }
// async function asyncClearPills() {
//   await delay(250);
// }

/**
 * Maneja varias funciones relacionadas al filtrado.
 */
const filterHandler = () => {
  textFilterEl.value = "";
  hideAllCards();
  filter();
  toggleViewResultButton(); /*this should be called before showMore()*/
  showMore();
  renderPills();
};

/**
 * Handler que maneja las funciones relacionadas al mostrado de tarjetas (botón "View more")
 */
const showMoreHandler = (e) => {
  e.stopPropagation();
  showMore();
  scrollDown();
};

/*------------------------------------
7.INIT (Todo lo relacionado al inicio)
------------------------------------*/

/**
 * Guarda en un array todas las categorías únicas de todos los artículos, sin repetir. Se usa para evitar el renderizado de categorías vacías (categorías que no pertenecen a ningún articulo). Esto evita
 * tener 0 resultados. Esto es opcional, ya que hay casos en los que puede ser necesario mostrar todas las categorías, incluso vacías. y se configura en cats.js (hideEmptyCats).
 */
getAllArticleCats = () => {
  if (gxFilterData.conf.hideEmptyCats && allArticles.length > 0) {
    const categoriesItems = articlesListEl.querySelectorAll(".category-item");
    if (categoriesItems.length > 0) {
      categoriesItems.forEach((categoryItem) => {
        //remove .category-item class (we only want the category id class)
        const categoryClasses = Array.from(categoryItem.classList);
        const categoryItemClassIndex = categoryClasses.findIndex((cssClass) => {
          return cssClass === "category-item";
        });
        if (categoryItemClassIndex !== -1) {
          //hopefully we only have one css class now, the category class id.
          categoryClasses.splice(categoryItemClassIndex, 1);
          const cat = categoryClasses[0];
          //Add the category class if not already on 'allArticlesUniqueCats'
          const catFound = allArticlesUniqueCats.find((alreadyAddedCat) => {
            return alreadyAddedCat === cat;
          });
          if (catFound === undefined) {
            allArticlesUniqueCats.push(cat);
          }
        }
      });
    }
  }
};

/**
 * Detecta si el dispositivo es o no mobile.
 */
const detectMobile = () => {
  if (/Mobi/.test(navigator.userAgent)) {
    // This means the user is on a mobile device
    isMobile = true;
    body.classList.add("gx-mobile-device");
  }
};

/**
 * Define los mensajes para mostrar en el footer, dependiendo del idioma.
 */
const defineFooterMessages = () => {
  footerMessages = {
    noMorePartners: {
      en: `No more ${typePlural} to display.`,
      es: `No hay más ${typePlural} para mostrar.`,
      pt: `Não há mais ${typePlural} para mostrar.`,
    },
    // (Banned by Ines)
    // showingAllCoincidences: {
    //   en: `Showing all the ${typePlural} that match with your search.`,
    //   es: `Mostrando todos los ${typePlural} que coinciden con tu búsqueda.`,
    //   pt: `Mostrando todos os ${typePlural} que correspondem à sua pesquisa.`,
    // },
    noMatchFoundTitle: {
      en: "Sorry, no results found.",
      es: "Lo siento, no se encontraron resultados.",
      pt: "Desculpe, não foram encontrados resultados.",
    },
    noMatchFoundDescription: {
      en: `Try removing or change your filters to find ${typePlural}.`,
      es: `Intenta eliminar o cambiar tus filtros para encontrar ${typePlural}.`,
      pt: `Tente remover ou alterar seus filtros para encontrar ${typePlural}.`,
    },
  };
};

/**
 * Bootstrap
 */
const init = () => {
  const ready = isFilterReady();
  if (ready) {
    getAllArticleCats();
    /*get config properties*/
    cardsPerLoad = gxFilterData.conf.cardsPerLoad;
    typeSingular = gxFilterData.conf.typeSingular[pageLang];
    typePlural = gxFilterData.conf.typePlural[pageLang];
    /*call functions*/
    detectMobile();
    defineFooterMessages();
    createCatsMapArray();
    hideAllCards();
    renderHeader();
    horizontalScroll(true); //must be called after renderHeader();
    renderCategories(); //must be called after renderHeader();
    renderClearButton(); //must be called after renderHeader();
    renderViewResultsButton(); //must be called after renderHeader() This is only for mobile;
    renderFooter();
    renderShowingPartners(); //must be called after renderFooter();
    renderShowMoreButton(); //must be called after renderFooter();
    footerMessagesSlot(); //must be called after renderFooter();
    setSelectedCategories(); //must be called after renderCategories();
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
