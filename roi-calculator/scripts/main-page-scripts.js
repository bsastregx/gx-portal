var x, i, j, l, ll, selElmnt, a, b, c;
for (
  l = (x = document.getElementsByClassName("custom-select")).length, i = 0;
  i < l;
  i++
) {
  for (
    ll = (selElmnt = x[i].getElementsByTagName("select")[0]).length,
      (a = document.createElement("DIV")).setAttribute(
        "class",
        "select-selected"
      ),
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML,
      x[i].appendChild(a),
      (b = document.createElement("DIV")).setAttribute(
        "class",
        "select-items select-hide"
      ),
      j = 1;
    j < ll;
    j++
  )
    (c = document.createElement("DIV")),
      1 !== j ||
        selElmnt.classList.contains("has-option-none") ||
        c.classList.add("same-as-selected"),
      (c.innerHTML = selElmnt.options[j].innerHTML),
      c.addEventListener("click", function (e) {
        var t, n, a, l, o, i, r;
        for (
          i = (l = this.parentNode.parentNode.getElementsByTagName("select")[0])
            .length,
            o = this.parentNode.previousSibling,
            n = 0;
          n < i;
          n++
        )
          if (l.options[n].innerHTML == this.innerHTML) {
            for (
              l.selectedIndex = n,
                o.innerHTML = this.innerHTML,
                r = (t =
                  this.parentNode.getElementsByClassName("same-as-selected"))
                  .length,
                a = 0;
              a < r;
              a++
            )
              t[a].removeAttribute("class");
            this.setAttribute("class", "same-as-selected");
            break;
          }
        o.click();
      }),
      b.appendChild(c);
  x[i].appendChild(b),
    a.addEventListener("click", function (e) {
      e.stopPropagation(),
        closeAllSelect(this),
        this.nextSibling.classList.toggle("select-hide"),
        this.classList.toggle("select-arrow-active");
      const t = new CustomEvent("selectChanged", { bubbles: !0 });
      this.dispatchEvent(t);
    });
}
function closeAllSelect(e) {
  var t,
    n,
    a,
    l,
    o,
    i = [];
  for (
    t = document.getElementsByClassName("select-items"),
      n = document.getElementsByClassName("select-selected"),
      l = t.length,
      o = n.length,
      a = 0;
    a < o;
    a++
  )
    e == n[a] ? i.push(a) : n[a].classList.remove("select-arrow-active");
  for (a = 0; a < l; a++) i.indexOf(a) && t[a].classList.add("select-hide");
}
document.addEventListener("click", closeAllSelect);
const sliders = document.querySelectorAll(".range");
sliders.forEach((e) => {
  (sliderId = e.getAttribute("id")),
    (sliderInput = e.querySelector("input[type='range']")),
    (sliderMin = sliderInput.getAttribute("min")),
    (sliderMax = sliderInput.getAttribute("max")),
    (sliderInitial = sliderInput.getAttribute("data-current"));
  class t {
    constructor(e, t, n) {
      (this.rangeElement = e),
        (this.valueElement = t),
        (this.options = n),
        this.rangeElement.addEventListener(
          "input",
          this.updateSlider.bind(this)
        );
    }
    init() {
      this.rangeElement.setAttribute("min", l.min),
        this.rangeElement.setAttribute("max", l.max),
        (this.rangeElement.value = l.cur),
        this.updateSlider();
    }
    formatValue(e) {
      return parseInt(e);
    }
    generateBackground(e) {
      if (this.rangeElement.value === this.options.min) return;
      let t =
        ((this.rangeElement.value - this.options.min) /
          (this.options.max - this.options.min)) *
        100;
      return (
        "background: linear-gradient(to right, #5ab39f, #5ab39f " +
        t +
        "%, #d0d0d0 " +
        t +
        "%, #d0d0d0 100%)"
      );
    }
    updateSlider(e) {
      (this.valueElement.innerHTML = this.formatValue(this.rangeElement.value)),
        (this.rangeElement.style = this.generateBackground(
          this.rangeElement.value
        ));
    }
  }
  let n = document.querySelector(".range#" + sliderId + ' [type="range"]'),
    a = document.querySelector(".range#" + sliderId + " .range__value span"),
    l = { min: sliderMin, max: sliderMax, cur: sliderInitial };
  if (n) {
    new t(n, a, l).init();
  }
}),
  (function () {
    let e;
    function t() {
      const t = parseInt(
          document.querySelector(
            "#average-full-time-delelopers-per-app .range-input"
          ).value
        ),
        n =
          1e3 *
          parseInt(
            document.querySelector("#average-developer-salary .range-input")
              .value
          ),
        a = document.getElementById("app-type-complexity").value,
        l = parseFloat(
          document
            .getElementById("app-type-complexity")
            .querySelector("option[value=" + a + "]")
            .getAttribute("data-factor")
        ),
        o = document.getElementById("app-tech-environment").value,
        i = parseFloat(
          document
            .getElementById("app-tech-environment")
            .querySelector("option[value=" + o + "]")
            .getAttribute("data-factor")
        ),
        r = parseInt(
          document.querySelector(
            "#how-long-to-build-a-software-solution .range-input"
          ).value
        ),
        s = parseInt(
          document.querySelector(
            "#how-many-custom-apps-in-12-months .range-input"
          ).value
        ),
        u =
          1e3 *
          parseInt(
            document.querySelector("#money-to-save-in-a-month .range-input")
              .value
          ),
        c = document.getElementById("app-maintenance-evolution-workload").value,
        d = parseFloat(
          document
            .getElementById("app-maintenance-evolution-workload")
            .querySelector("option[value=" + c + "]")
            .getAttribute("data-factor")
        ),
        m = parseFloat(((l + i) / 2).toFixed(4)),
        p = 1 / m,
        g = Math.round(167 * t * r),
        v = Math.round(g * m),
        y = Math.round((n / 12 / 167) * g),
        h = Math.round((n / 12 / 167) * v),
        E = Math.round(g * d),
        S = Math.round(v * d),
        I = Math.round((n / 12 / 167) * E * 5),
        L = Math.round((n / 12 / 167) * S * 5);
      let M = 1 / p - 1;
      (M = -1 * parseFloat(M.toFixed(2))), (timeToMarketPercentage = 100 * M);
      let T = y - h;
      T = parseInt(T, 10);
      let f = Math.round(s / m),
        B = I - L;
      B = parseInt(B, 10);
      const A = 167 * t * r,
        b = Math.round(A * m),
        x = Math.round((n / 12 / 167) * A),
        q = Math.round((n / 12 / 167) * b),
        k = Math.round(A * d),
        F = Math.round(b * d),
        H =
          x -
          q +
          (Math.round((n / 12 / 167) * k * 5) -
            Math.round((n / 12 / 167) * F * 5)),
        C = (r - parseFloat(parseFloat(r * m).toFixed(1))) * u,
        w = parseInt(H + C);
      (document
        .getElementById("time-to-market")
        .querySelector(".value").innerHTML = timeToMarketPercentage),
        (document
          .getElementById("cost-reduction")
          .querySelector(".value").innerHTML = T.toLocaleString("en-US")),
        (document
          .getElementById("apps-per-year")
          .querySelector(".value").innerHTML = f),
        (document
          .getElementById("maintenance-savings")
          .querySelector(".value").innerHTML = B.toLocaleString("en-US")),
        (document
          .getElementById("total-added-value-by-genexus")
          .querySelector(".value").innerHTML = w.toLocaleString("en-US")),
        (e = "?averageFullTimeDevelopersPerApp=" + t),
        (e += "&averageDeveloperSalary=" + n),
        (e += "&appTypeComplexity=" + a),
        (e += "&appTypeComplexityFactor=" + parseFloat(l)),
        (e += "&appTechEnvironment=" + o),
        (e += "&appTechEnvironmentFactor=" + parseFloat(i)),
        (e += "&howLongToBuildASoftwareSolution=" + r),
        (e += "&customAppsToBuildin12Months=" + s),
        (e += "&moneyToExpectAnAppToSaveInAMonth=" + u),
        (e += "&appMaintenanceEvolutionWorkload=" + c),
        (e += "&appMaintenanceEvolutionWorkloadFactor=" + parseFloat(d)),
        (document.getElementById("inputAverageFullTimeDevelopersPerApp").value =
          t + " devs"),
        (document.getElementById("inputAvegareDeveloperSalary").value =
          n.toLocaleString("en-US") + " USD"),
        (document.getElementById("inputAppTypeComplexity").value = a),
        (document.getElementById("inputAppTechEnvironment").value = o),
        (document.getElementById("inputHowLongToBuildASoftwareSolution").value =
          r + " months"),
        (document.getElementById("inputCustomAppsIn12Months").value = s),
        (document.getElementById(
          "inputMoneyToExpectAnAppToSaveInAMonth"
        ).value = u.toLocaleString("en-US") + " USD"),
        (document.getElementById("inputAppMaintenanceEvolutionWorkload").value =
          c),
        (document.getElementById("inputTimeToMarket").value =
          timeToMarketPercentage + "%"),
        (document.getElementById("inputCostReduction").value =
          T.toLocaleString("en-US") + " USD"),
        (document.getElementById("inputAppsPerYear").value = f),
        (document.getElementById("inputMaintenanceSavings").value =
          B.toLocaleString("en-US") + " USD"),
        (document.getElementById("inputTotalAddedValueByGenexus").value =
          w.toLocaleString("en-US") + " USD");
    }
    t(),
      document.querySelectorAll(".custom-select").forEach((e) => {
        e.addEventListener("selectChanged", (e) => {
          t();
        });
      }),
      document.querySelectorAll(".range-input").forEach((e) => {
        e.addEventListener("input", function () {
          t();
        });
      });
    const n = document.getElementById("step-1"),
      a = document.getElementById("step-2"),
      l = document.querySelector("#step-title"),
      o = document.querySelector("#step-subtitle"),
      i = document.querySelector(".step-indicator.first"),
      r = document.querySelector(".step-indicator.second");
    (requestFullReport = document.getElementById("request-full-report-btn")),
      null !== requestFullReport &&
        requestFullReport.addEventListener("click", function () {
          n.classList.add("opacity-0"),
            setTimeout(function () {
              n.classList.add("display-none"),
                i.classList.remove("step-indicator--active"),
                r.classList.add("step-indicator--active"),
                (l.innerHTML = "Step 2"),
                (o.innerHTML =
                  "Please provide your data to receive the complete GeneXus' return of investment report"),
                a.classList.remove("display-none"),
                setTimeout(function () {
                  a.classList.remove("opacity-0");
                }, 50);
            }, 500);
        }),
      document
        .getElementById("back-to-roi-calculator")
        .addEventListener("click", function () {
          a.classList.add("opacity-0"),
            setTimeout(function () {
              a.classList.add("display-none"),
                r.classList.remove("step-indicator--active"),
                i.classList.add("step-indicator--active"),
                (l.innerHTML = "Step 1"),
                (o.innerHTML = "Select variables"),
                n.classList.remove("display-none"),
                setTimeout(function () {
                  n.classList.remove("opacity-0");
                }, 50);
            }, 500);
        }),
      (document.getElementById("ROI-calculator_Client-data").onsubmit =
        function (t) {
          t.preventDefault(),
            window.location.assign("products/genexus/roi-report" + e, "_self");
        });
  })();
