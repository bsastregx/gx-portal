window.addEventListener("load", () => {
  const blocks = [".I18679", ".I119094"];
  //.I18679 -> success stories
  //.I119094 -> webinars
  let block = undefined;

  for (let i = 0; i < blocks.length; i++) {
    block = document.querySelector(blocks[i]);
    if (block) {
      //add custom class for css styles
      block.classList.add("block--collection");
      //add custom class for success stories only (they have special styles that do not apply to other collections)
      if (blocks[i] === ".I18679") {
        block.classList.add("block--collection-sstories");
      }
      break;
    }
  }

  /****************** CATEGORIES BUTTONS CONTAINER ******************/
  const categoriesButtonsContainer = document.createElement("div");
  categoriesButtonsContainer.classList.add("categories-buttons-container");
  block.before(categoriesButtonsContainer);
  /****************** VARIABLES ******************/
  let storiesNotOverflowing = undefined;
  let unhiddenStories = 0;
  let storyHeight = 0;
  let storiesPerRow = 0;
  let numberOfVisibleRows = 0;
  let gridGap = 0;
  let maxNumberOfVisibleStories = 0;
  let visibleStoriesLength = 0;
  let firstLoadCategory = true;
  /****************** BUTTONS FOR CATEGORIES ******************/
  const lang = document.querySelector("html").getAttribute("lang");

  /*Categories Array*/
  let catArray = [];
  let stories = undefined;

  const buttonsCategoriesContainer = document.querySelector(
    ".categories-buttons-container"
  );

  /*Collect all stories categories*/
  if (block) {
    const articles = block.querySelector(".articles");
    articles.classList.add("visible");
    stories = block.querySelectorAll(".article-container");
    stories.forEach((story) => {
      const categoryItem = story.querySelector(".category-item");
      let categoryItemId = undefined;
      if (categoryItem) {
        categoryItemId = categoryItem.classList[1];
        //console.log("category itemid", categoryItemId);
        categoryDisplayName = categoryItem.querySelector(".text").textContent;
        if (categoryItemId) {
          catArray.push({
            categoryDisplayName: categoryDisplayName,
            categoryId: categoryItemId,
          });
        }
      }
    });
    if (catArray.length) {
      //Add 'All' categories first.
      let allCategoriesDisplayName = "All +"; //english by default
      if (lang !== "en") {
        allCategoriesDisplayName = "Todos +";
      }
      catArray.unshift({
        categoryDisplayName: allCategoriesDisplayName,
        categoryId: "all",
      });
      //remove duplicates
      const filteredArray = catArray.filter(
        (obj, index) =>
          catArray.findIndex(
            (cat) =>
              cat.categoryItemId === obj.categoryItemId &&
              cat.categoryDisplayName === obj.categoryDisplayName
          ) === index
      );

      filteredArray.forEach((cat, i) => {
        const buttonWrapper = document.createElement("div");
        const button = document.createElement("button");
        buttonWrapper.classList.add("button-gx__wrapper");
        button.classList.add("button-gx");
        button.setAttribute("data-category-id", cat.categoryId);
        button.innerText = cat.categoryDisplayName;
        button.addEventListener("click", function () {
          firstLoadCategory = true;
          const buttonCatId = this.getAttribute("data-category-id");
          //remove previous active button
          const actualActiveButton = document.querySelector(
            ".button-gx.button-gx--active"
          );
          if (actualActiveButton) {
            actualActiveButton.classList.remove("button-gx--active");
          }
          //add new button the active class
          this.classList.add("button-gx--active");
          //filter the stories
          if (stories.length) {
            stories.forEach((categoryItemEl) => {
              if (buttonCatId === "all") {
                categoryItemEl.classList.remove("hidden");
              } else {
                let categoryItem =
                  categoryItemEl.querySelector(".category-item");
                if (categoryItem) {
                  categoryItemId = categoryItem.classList[1];
                  if (categoryItemId) {
                    if (buttonCatId === categoryItemId) {
                      categoryItemEl.classList.remove("hidden");
                    } else {
                      categoryItemEl.classList.add("hidden");
                    }
                  }
                }
              }
            });
          }
          limitVisibleStories();
          /*enable 'load more stories' button*/
          if (maxNumberOfVisibleStories >= visibleStoriesLength) {
            buttonLoadMore.classList.add("button-gx--load-more--disabled");
          } else {
            buttonLoadMore.classList.remove("button-gx--load-more--disabled");
          }
        });
        if (i === 0) {
          button.classList.add("button-gx--active");
        }
        buttonWrapper.appendChild(button);
        buttonsCategoriesContainer.appendChild(buttonWrapper);
        //block.before(buttonsCategoriesContainer);
      });
    }
  }

  /****************** ADD A LINK TO THE SQUARES ******************/
  stories.forEach((story) => {
    const storyA = story.querySelector("a");
    const storyHeader = story.querySelector("article header");
    if (storyA) {
      const storyLink = storyA.getAttribute("href");
      storyHeader.addEventListener("click", function () {
        window.location.href = `${storyLink}`;
      });
      storyHeader.classList.add("has-link");
    }
  });

  /****************** LOAD MORE STORIES BUTTON ******************/
  let buttonLoadMore = document.createElement("button");
  buttonLoadMore.classList.add("button-gx");
  buttonLoadMore.classList.add("button-gx--load-more");
  buttonLoadMore.innerText = "Load more"; //default english
  buttonLoadMore.addEventListener("click", function () {
    //get loadMoreButton offset top to do scroll later
    var loadMoreButtonOffsetTop = offset(this).top;

    let showMore = storiesPerRow * 3;
    if (window.innerWidth <= 1200) {
      showMore = storiesPerRow * 3;
    }
    if (window.innerWidth <= 768) {
      showMore = storiesPerRow * 5;
    }
    if (window.innerWidth <= 540) {
      showMore = storiesPerRow * 3;
    }

    const storiesOverflowing = unhiddenStories - storiesNotOverflowing;
    let rowsToDisplay = 0;
    if (storiesOverflowing > 0) {
      if (storiesOverflowing < showMore) {
        rowsToDisplay = Math.ceil(storiesOverflowing / storiesPerRow);
      } else {
        rowsToDisplay = Math.ceil(showMore / storiesPerRow);
      }

      /*There are still stories to show*/
      const currentHeight = Number(block.style.height.replace("px", ""));
      const additionalHeight = rowsToDisplay * (storyHeight + gridGap);
      const totalHeight = currentHeight + additionalHeight + "px";
      block.style.height = totalHeight;

      console.log("additionalHeight", additionalHeight);
      console.log("totalHeight", totalHeight);

      if (storiesOverflowing >= showMore) {
        storiesNotOverflowing = storiesNotOverflowing + showMore;
      } else {
        storiesNotOverflowing = storiesNotOverflowing + storiesOverflowing;
      }

      if (storiesNotOverflowing === unhiddenStories) {
        /*All stories are visible*/
        buttonLoadMore.classList.add("button-gx--load-more--disabled");
      }
    }

    window.scroll({
      top: loadMoreButtonOffsetTop,
      behavior: "smooth",
    });
  });
  if (lang === "es") {
    buttonLoadMore.innerText = "Cargar más";
  } else if (lang === "pt") {
    buttonLoadMore.innerText = "Carregar mais";
  }
  if (block) {
    block.after(buttonLoadMore);
  }

  function limitVisibleStories() {
    maxNumberOfVisibleStories = 20;
    if (window.innerWidth <= 1200) {
      maxNumberOfVisibleStories = 16;
    }
    if (window.innerWidth <= 768) {
      maxNumberOfVisibleStories = 12;
    }
    if (window.innerWidth <= 540) {
      maxNumberOfVisibleStories = 8;
    }

    /*Visible Stories*/
    const visibleStories = block.querySelectorAll(
      ".article-container:not(.hidden)"
    );
    visibleStoriesLength = visibleStories.length;

    if (firstLoadCategory) {
      if (visibleStoriesLength > maxNumberOfVisibleStories) {
        storiesNotOverflowing = maxNumberOfVisibleStories;
      } else {
        storiesNotOverflowing = visibleStoriesLength;
      }
    }
    firstLoadCategory = false;

    if (block) {
      /*Story Height*/
      storyHeight = Math.ceil(
        block
          .querySelector(".article-container:not(.hidden)")
          .getBoundingClientRect().height
      );
      /*Grid Gap*/
      gridGap = parseInt(
        window
          .getComputedStyle(block.querySelector(".articles"))
          .gridGap.split(" ")[0]
          .replace("px", "")
      );
      unhiddenStories = block.querySelectorAll(
        ".article-container:not(.hidden)"
      ).length;

      /*Stories Per Row*/
      storiesPerRow = window
        .getComputedStyle(block.querySelector(".articles"))
        .gridTemplateColumns.split(" ").length;
      /*Number of rows*/
      numberOfVisibleRows = Math.ceil(storiesNotOverflowing / storiesPerRow);
      //storiesNotOverflowing = storiesPerRow * numberOfVisibleRows;
      /*Evaluate*/
      if (visibleStoriesLength > storiesNotOverflowing) {
        const height = Math.ceil(
          numberOfVisibleRows * (storyHeight + gridGap) - gridGap
        );
        block.style.height = height + "px";
      } else {
        block.style.height = "auto";
      }

      if (storiesNotOverflowing >= visibleStoriesLength) {
        buttonLoadMore.classList.add("button-gx--load-more--disabled");
      }
    }
  }

  /****************** PUT STORY TITLE OUTSIDE THE HEADER ******************/
  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }
  stories.forEach((story) => {
    const header = story.querySelector("header");
    const title = story.querySelector(".title");
    header.after(title);
  });

  /****************** RESIZE OBSERVER ******************/
  let prevWidth = 0;
  const resizeObserver = new ResizeObserver((entries) => {
    /*width changing*/
    for (const entry of entries) {
      const width = entry.borderBoxSize?.[0].inlineSize;
      if (typeof width === "number" && width !== prevWidth) {
        prevWidth = width;
        limitVisibleStories();
      }
    }
  });

  resizeObserver.observe(block);

  //Get element offset
  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
});
