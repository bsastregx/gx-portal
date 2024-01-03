const cellListContent = document.getElementsByClassName(
  "gwds__cell-list-content--controller"
);
if (cellListContent.length > 0) {
  for (let i = 0; i < cellListContent.length; i++) {
    const stencil = cellListContent[i].closest(".stencil");
    stencil.classList.add("gwds__cell-list-content--" + [i]);

    console.log("--" + [i]);
  }
}

const contentsArray = Array.from(
  document.querySelectorAll(
    ".gwds__cell-list-content--0 .group-regions .region"
  )
);

if (contentsArray.length > 0) {
  for (let i = 0; i < contentsArray.length; i++) {
    const content = contentsArray[i].closest(".region");
    content.classList.add("content--0--" + [i]);
  }
}

const buttonsArray = Array.from(
  document.querySelectorAll(".gwds__cell-list-content--0 .button")
);

if (buttonsArray.length > 0) {
  for (let i = 0; i < buttonsArray.length; i++) {
    const button = buttonsArray[i].closest(".button");

    const contentList = document.getElementsByClassName("content--0--" + [i]);

    if (contentList.length > 0) {
      for (let i = 0; i < contentList.length; i++) {
        button.addEventListener("click", function handleClick(event) {
          console.log("box clicked", event);

          const content = contentList[i].closest(".region");

          //remove previous active button class
          const buttonsRegion = button.closest(".region");
          if (buttonsRegion) {
            const activeButtonClassName =
              "gwds__cell-list-content--button-active";
            const activeButton = buttonsRegion.querySelector(
              "." + activeButtonClassName
            );
            if (activeButton) {
              activeButton.classList.remove(activeButtonClassName);
            }
            //then add active button class
            button.classList.add(activeButtonClassName);
          }

          const contentsArray = Array.from(
            document.querySelectorAll(
              ".gwds__cell-list-content--0 .group-regions .region"
            )
          );

          if (contentsArray.length > 0) {
            for (let i = 0; i < contentsArray.length; i++) {
              const content = contentsArray[i].closest(".region");
              content.style.display = "none";
              console.log("Show content:" + contentsArray[i]);
            }
          }

          content.style.display = "block";
          content.classList.toggle("visible");

          // buttonsArray[0].classList.add(
          //   "gwds__cell-list-content--button-active"
          // );
        });
      }
    }
  }
}

const contentsArray1 = Array.from(
  document.querySelectorAll(
    ".gwds__cell-list-content--1 .group-regions .region"
  )
);

if (contentsArray1.length > 0) {
  for (let i = 0; i < contentsArray1.length; i++) {
    const content = contentsArray1[i].closest(".region");
    content.classList.add("content--1--" + [i]);
  }
}

const buttonsArray1 = Array.from(
  document.querySelectorAll(".gwds__cell-list-content--1 .button")
);

if (buttonsArray1.length > 0) {
  for (let i = 0; i < buttonsArray1.length; i++) {
    const button = buttonsArray1[i].closest(".button");

    const contentList = document.getElementsByClassName("content--1--" + [i]);

    if (contentList.length > 0) {
      for (let i = 0; i < contentList.length; i++) {
        button.addEventListener("click", function handleClick(event) {
          console.log("box clicked", event);

          const content = contentList[i].closest(".region");

          const contentsArray1 = Array.from(
            document.querySelectorAll(
              ".gwds__cell-list-content--1 .group-regions .region"
            )
          );

          if (contentsArray1.length > 0) {
            for (let i = 0; i < contentsArray1.length; i++) {
              const content = contentsArray1[i].closest(".region");
              content.style.display = "none";
            }
          }

          content.style.display = "block";
        });
      }
    }
  }
}
