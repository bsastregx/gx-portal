//COMPARE PLANS ====================================================

goToPlans = document.querySelectorAll(".go-to-plans");
goToPlans.forEach((goToPlan) => {
  goToPlan.addEventListener("click", function () {
    this.scrollIntoView({
      behavior: "smooth",
    });
  });
});

//ANIMATE STICKY PLANS HEADER ====================================================

const pdctS = document.querySelectorAll(
  ".plans-header-container-bottom-reference"
);
pdctS.forEach((pdct) => {
  const pdc = pdct.previousElementSibling;
  const observer = new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        pdc.classList.remove("sticky");
        return;
      }
      if (entry.boundingClientRect.top <= 0) {
        pdc.classList.add("sticky");
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );
  observer.observe(pdct);
});

//UP ARROW (GO UP TO STICKY PLANS HEADER) ====================================================

const goUps = document.querySelectorAll(".go-top");
goUps.forEach((goUp) => {
  goUp.addEventListener("click", function () {
    const dataTargetClass = this.dataset.targetClass;
    document.querySelector("." + dataTargetClass).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// TOGGLE PLAN FEATURES (MOBILE) ====================================================

const togglePlanFeatures = document.querySelectorAll(".toggle-plan-features");
togglePlanFeatures.forEach((tpf) => {
  tpf.addEventListener("click", function () {
    const card = tpf.parentElement;
    const cardTitle = card.querySelector(".plan-card__title");
    const tableContainer = card.querySelector(".plan-card__table-container");
    tableContainer.classList.toggle("collapsed");
    tpf.classList.toggle("collapsed");
    if (tpf.classList.contains("collapsed")) {
      cardTitle.classList.remove("sticky");
    } else {
      cardTitle.classList.add("sticky");
    }
  });
});

// HIDE PLAN FEATURES (MOBILE) ====================================================

const hidePlanFeatures = document.querySelectorAll(".hide-plan-features");
hidePlanFeatures.forEach((hpf) => {
  hpf.addEventListener("click", function () {
    const planCard = hpf.closest(".plan-card");
    const planCardTitle = planCard.querySelector(".plan-card__title");
    const planCardOffsetTop =
      planCard.getBoundingClientRect().top +
      document.documentElement.scrollTop -
      80;
    //scroll to plan card
    window.scroll({
      top: planCardOffsetTop,
    });

    const tableContainer = hpf.parentElement;
    tableContainer.classList.add("collapsed");
    const togglePlanFeatures = tableContainer.parentElement.querySelector(
      ".toggle-plan-features"
    );
    togglePlanFeatures.classList.add("collapsed");
    planCardTitle.classList.remove("sticky");
  });
});

// MORE INFO ====================================================
const moreInfoTds = document.querySelectorAll(".more-info__td");
moreInfoTds.forEach((moreInfoTd) => {
  moreInfoTd.addEventListener("click", function () {
    moreInfoTd.classList.toggle("more-info__td--hidden");
  });
});

// GENERATE OTHER PLANS (MOBILE) ====================================================
/*The following code copies for each plan, the others plans features*/
planCards = document.querySelectorAll(".plan-card--professional");
planTableContainers = document.querySelectorAll(
  ".plan-card__table-container--professional"
);
planTableContainers.forEach((tableContainer, itemIndex) => {
  let otherTablesA;
  let otherTablesB;
  let tableATitle;
  let tableBTitle;

  if (itemIndex === 0) {
    otherTablesA = planTableContainers[1].querySelectorAll(".plan-card__table");
    tableATitle = planCards[1].querySelector(".plan-card__title").innerHTML;
    otherTablesB = planTableContainers[2].querySelectorAll(".plan-card__table");
    tableBTitle = planCards[2].querySelector(".plan-card__title").innerHTML;
  } else if (itemIndex === 1) {
    otherTablesA = planTableContainers[0].querySelectorAll(".plan-card__table");
    tableATitle = planCards[0].querySelector(".plan-card__title").innerHTML;
    otherTablesB = planTableContainers[2].querySelectorAll(".plan-card__table");
    tableBTitle = planCards[2].querySelector(".plan-card__title").innerHTML;
  } else if (itemIndex === 2) {
    otherTablesA = planTableContainers[0].querySelectorAll(".plan-card__table");
    tableATitle = planCards[0].querySelector(".plan-card__title").innerHTML;
    otherTablesB = planTableContainers[1].querySelectorAll(".plan-card__table");
    tableBTitle = planCards[1].querySelector(".plan-card__title").innerHTML;
  }

  const currentTables = tableContainer.querySelectorAll(".plan-card__table");
  currentTables.forEach((ct, ctIndex) => {
    const currentTableTrs = ct.querySelectorAll("tbody tr");
    let counter = 1;
    currentTableTrs.forEach((ctTr, ctTrIndex) => {
      if (itemIndex === 0) {
        iA = ctTrIndex + 1;
        iB = ctTrIndex + 1;
      } else if (itemIndex === 1) {
        iA = counter;
        iB = ctTrIndex + 1;
      } else if (itemIndex === 2) {
        iA = counter;
        iB = counter;
      }

      const tableATdClone = otherTablesA[ctIndex]
        .querySelector(`tbody tr:nth-child(${iA}) td:nth-child(2)`)
        .cloneNode(true);
      const tableBTdClone = otherTablesB[ctIndex]
        .querySelector(`tbody tr:nth-child(${iB}) td:nth-child(2)`)
        .cloneNode(true);

      counter += 3;

      //TABLE TDA1
      const divA1 = document.createElement("div");
      divA1.classList.add("td-container");
      divA1.innerHTML = tableATitle;
      const tdA1 = document.createElement("td");
      tdA1.appendChild(divA1);

      //TABLE TRA
      const trA = document.createElement("tr");
      trA.classList.add("other-plan");
      trA.appendChild(tdA1);
      trA.appendChild(tableATdClone);

      // =================================

      //TABLE TDB1
      const divB1 = document.createElement("div");
      divB1.classList.add("td-container");
      divB1.innerHTML = tableBTitle;
      const tdB1 = document.createElement("td");
      tdB1.appendChild(divB1);

      //TABLE TRA
      const trB = document.createElement("tr");
      trB.classList.add("other-plan");
      trB.appendChild(tdB1);
      trB.appendChild(tableBTdClone);

      ctTr.insertAdjacentElement("afterend", trB);
      ctTr.insertAdjacentElement("afterend", trA);
    });
  });
});

// ADD TOGGLE FUNCTIONALITY FOR 'CURRENT PLANS'
/*The current plans, are all the initial visible tr's (MOBILE)*/
const currentPlans = document.querySelectorAll(
  ".container-plans-mobile--professional tbody tr:not(.other-plan)"
);
const tips = document.querySelectorAll(".tip");
currentPlans.forEach((currentPlan, i) => {
  currentPlan.classList.add("current-plan");

  const nextOtherPlan = currentPlan.nextElementSibling;
  const nextNextOtherPlan = nextOtherPlan.nextElementSibling;
  currentPlan.addEventListener("click", function () {
    const openTr = document.querySelector("tr.open");

    if (this.classList.contains("open")) {
      this.classList.remove("open");
      nextOtherPlan.classList.remove("show");
      nextNextOtherPlan.classList.remove("show");
    } else {
      //hide previous '.open' tr
      if (openTr) {
        openTr.classList.remove("open");
      }
      this.classList.add("open");
      //hide previous visible '.other-plan'
      const visibleOtherPlans = document.querySelectorAll(".other-plan.show");
      if (visibleOtherPlans.length) {
        visibleOtherPlans.forEach((visibleOtherPlan) => {
          visibleOtherPlan.classList.remove("show");
        });
      }
      nextOtherPlan.classList.add("show");
      nextNextOtherPlan.classList.add("show");
    }

    tips.forEach((tip) => {
      tip.classList.add("tip--hidden");
      setTimeout(function () {
        tip.classList.add("tip--height0");
      }, 250);
    });
  });
});
