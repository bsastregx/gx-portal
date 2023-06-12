
(function() {
    // your page initialization code here
    // the DOM will be available here

    /**************************************
    GET THE VARIABLES FROM THE QUERY STRING
    ***************************************/
    let averageFullTimeDevelopersPerApp;
    let averageDeveloperSalary;
    let appTypeComplexity;
    let appTypeComplexityFactor;
    let appTechEnvironment;
    let appTechEnvironmentFactor;
    let howLongToBuildASoftwareSolution
    let customAppsToBuildin12Months;
    let moneyToExpectAnAppToSaveInAMonth;
    let appMaintenanceEvolutionWorkload;
    let appMaintenanceEvolutionWorkloadFactor;

    const urlParams = new URLSearchParams(location.search);
    if(
        (
            !urlParams.has('averageFullTimeDevelopersPerApp') ||
            !urlParams.has('averageDeveloperSalary') ||
            !urlParams.has('appTypeComplexity') ||
            !urlParams.has('appTypeComplexityFactor') ||
            !urlParams.has('appTechEnvironment') ||
            !urlParams.has('appTechEnvironmentFactor') ||
            !urlParams.has('howLongToBuildASoftwareSolution') ||
            !urlParams.has('customAppsToBuildin12Months') ||
            !urlParams.has('moneyToExpectAnAppToSaveInAMonth') ||
            !urlParams.has('appMaintenanceEvolutionWorkload') ||
            !urlParams.has('appMaintenanceEvolutionWorkloadFactor')
        ) &&
        !document.querySelector('meta[property="gxportal:designerUIMode"]')
    ) {
        //if some parameter is missing, redirect to initial ROI calculator page
        window.location.href="permalink/6832";
    }
    for (const [key, value] of urlParams) {
        if(key === "averageFullTimeDevelopersPerApp") {
            averageFullTimeDevelopersPerApp = parseInt(value, 10);
        } 
        if(key === "averageDeveloperSalary") {
            averageDeveloperSalary = parseInt(value, 10);
        }   
        if(key === "appTypeComplexity") {
            appTypeComplexity = value;
        }   
        if(key === "appTypeComplexityFactor") {
            appTypeComplexityFactor = parseFloat(value);
        }
        if(key === "appTechEnvironment") {
            appTechEnvironment = value;
        }
        if(key === "appTechEnvironmentFactor") {
            appTechEnvironmentFactor = parseFloat(value);
        }
        if(key === "howLongToBuildASoftwareSolution") {
            howLongToBuildASoftwareSolution = parseInt(value);
        }
        if(key === "customAppsToBuildin12Months") {
            customAppsToBuildin12Months = parseInt(value);
        }
        if(key === "moneyToExpectAnAppToSaveInAMonth") {
            moneyToExpectAnAppToSaveInAMonth = parseInt(value);
        }
        if(key === "appMaintenanceEvolutionWorkload") {
            appMaintenanceEvolutionWorkload = value;
        } 
        if(key === "appMaintenanceEvolutionWorkloadFactor") {
            appMaintenanceEvolutionWorkloadFactor = parseFloat(value);
        } 
    }

    /**************************************
    SET THE VARIABLES TAGS ON THE DOM
    ***************************************/
    variableTags = [
        "developers",
        "developer-salary",
        "time-to-build-a-software-solution",
        "custom-apps-in-12-months",
        "money-to-save-in-am-month",
        "app-maintenance-evolution-workload"
    ];
    variableTags.forEach(variable => {
        const li = document.createElement('li');
        li.classList.add("variables-tags__variable");
        if(variable === "developers") {
            li.innerHTML = averageFullTimeDevelopersPerApp + " Developers"
        } else if(variable === "developer-salary") {
            li.innerHTML = "USD " + averageDeveloperSalary / 1000 + " K Dev Salary / Year"
        } else if (variable === "time-to-build-a-software-solution") {
            li.innerHTML = howLongToBuildASoftwareSolution + " months to build a software solution"
        } else if (variable === "custom-apps-in-12-months") {
            li.innerHTML = customAppsToBuildin12Months + " custom apps in 12 months"
        } else if (variable === "money-to-save-in-am-month") {
            li.innerHTML = "USD " + moneyToExpectAnAppToSaveInAMonth / 1000 + " K an app to save in a month"
        } else if (variable === "app-maintenance-evolution-workload") {
            li.innerHTML = appMaintenanceEvolutionWorkload + " app maintenance";
        }
        const variableTags = document.querySelector(".variables-tags");
        variableTags.appendChild(li);
    })
    
    /**************************************
    SET SELECTED SCENARIO VALUES ON THE DOM
    ***************************************/
    //App type complexity
    const AppTypeComplexityTitle = document.querySelector(".scenario#app-type-complexity .scenario__title");
    const AppTypeComplexityDescription = document.querySelector(".scenario#app-type-complexity .scenario__description .value");
    AppTypeComplexityTitle.innerHTML = appTypeComplexity;
    AppTypeComplexityDescription.innerHTML = appTypeComplexity;
    //App tech environment
    const AppTechEnvironmentTitle = document.querySelector(".scenario#app-type-environment .scenario__title");
    const AppTechEnvironmentDescription = document.querySelector(".scenario#app-type-environment .scenario__description .value");
    AppTechEnvironmentTitle.innerHTML = appTechEnvironment;
    AppTechEnvironmentDescription.innerHTML = appTechEnvironment;
    //App Maintenance / Evolution Workload
    const AppMaintenanceEvolutionWorkloadTitle = document.querySelector(".scenario#app-maintenance-evolution-workload .scenario__title");
    const AppMaintenanceEvolutionWorkloadDescription = document.querySelector(".scenario#app-maintenance-evolution-workload .scenario__description .value");
    AppMaintenanceEvolutionWorkloadTitle.innerHTML = appMaintenanceEvolutionWorkload;
    AppMaintenanceEvolutionWorkloadDescription.innerHTML = appMaintenanceEvolutionWorkload;



    /**************************************
    SET VALUES ON THE DOM
    ***************************************/
    const appProductivityFactor = parseFloat(((appTypeComplexityFactor + appTechEnvironmentFactor) / 2).toFixed(4));
    
    //X TIME TO MARKET
    const timeToMarket = Math.round(1 / appProductivityFactor);
    xTimeToMarket = timeToMarket / 1 - 1;
    document.querySelector("#time-to-market .genexus .value").innerHTML = timeToMarket;
    document.querySelector("#time-to-market .saving__title .value").innerHTML = xTimeToMarket;
    //bar genexus
    document.querySelector("#time-to-market .genexus .bar").style.width = parseInt(timeToMarket * 100 / 6) + "%";
    //bar traditional dev
    document.querySelector("#time-to-market .traditional-dev .bar").style.width = parseInt(1 * 100 / 6) + "%";

    //VALUE ADDED BY GENEXUS
    const valueAddedByGenexus = (howLongToBuildASoftwareSolution - parseFloat(parseFloat(howLongToBuildASoftwareSolution * appProductivityFactor).toFixed(1))) * moneyToExpectAnAppToSaveInAMonth;
    document.querySelector("#value-added-by-genexus .money-value .value").innerHTML = valueAddedByGenexus.toLocaleString("en-US");

    //DEVELOPERS HOURS PER APP
    const developersHoursPerAppTraditional = Math.round(averageFullTimeDevelopersPerApp * 167 * howLongToBuildASoftwareSolution);
    const developersHoursPerAppGenexus = Math.round(developersHoursPerAppTraditional * appProductivityFactor);
    const maxDevelopersHoursPerApp = 180360;
    //genexus
    document.querySelector("#dev-hours-per-app .genexus .value").innerHTML = developersHoursPerAppGenexus.toLocaleString("en-US");
    document.querySelector("#dev-hours-per-app .genexus .bar").style.width = developersHoursPerAppGenexus * 100 / maxDevelopersHoursPerApp + "%";
    //traditional dev
    document.querySelector("#dev-hours-per-app .traditional-dev .value").innerHTML = developersHoursPerAppTraditional.toLocaleString("en-US");
    document.querySelector("#dev-hours-per-app .traditional-dev .bar").style.width =  developersHoursPerAppTraditional * 100 / maxDevelopersHoursPerApp + "%";

    //X MORE APPS PER YEAR
    const xMoreAppsPerYearTraditional = Math.round(customAppsToBuildin12Months);
    const xMoreAppsPerYearGenexus = Math.round(customAppsToBuildin12Months / appProductivityFactor);
    const maxMoreAppsPerYear = 120;
    const xMoreAppsWithGenexus = xMoreAppsPerYearGenexus / xMoreAppsPerYearTraditional - 1;
    //genexus
    document.querySelector("#more-apps-per-year .saving__title .value").innerHTML = parseInt(xMoreAppsWithGenexus);
    document.querySelector("#more-apps-per-year .genexus .value").innerHTML = parseInt(xMoreAppsPerYearGenexus);
    document.querySelector("#more-apps-per-year .genexus .bar").style.width = xMoreAppsPerYearGenexus * 100 / maxMoreAppsPerYear + "%";
    //traditional dev
    document.querySelector("#more-apps-per-year .traditional-dev .value").innerHTML = parseInt(xMoreAppsPerYearTraditional);
    document.querySelector("#more-apps-per-year .traditional-dev .bar").style.width =  xMoreAppsPerYearTraditional * 100 / maxMoreAppsPerYear + "%";

    //X% LABOR-COSTS REDUCTION
    const xLaborCostsReductionGenexus = Math.round(averageDeveloperSalary / 12 / 167 * developersHoursPerAppGenexus);
    const xLaborCostsReductionTraditional = Math.round(averageDeveloperSalary / 12 / 167 * developersHoursPerAppTraditional)
    const maxXLaborCostsReduction = 22500000;
    const percentageLaborCostReduction = Math.round(100 - (xLaborCostsReductionGenexus / xLaborCostsReductionTraditional * 100));

    //genexus
    document.querySelector("#labor-costs-reduction .saving__title .value").innerHTML = percentageLaborCostReduction;
    document.querySelector("#labor-costs-reduction .genexus .bar").style.width = xLaborCostsReductionGenexus * 100 / maxXLaborCostsReduction + "%";
    document.querySelector("#labor-costs-reduction .genexus .value").innerHTML = xLaborCostsReductionGenexus.toLocaleString("en-US");   
    //traditional dev
    document.querySelector("#labor-costs-reduction .traditional-dev .bar").style.width = xLaborCostsReductionTraditional * 100 / maxXLaborCostsReduction + "%";
    document.querySelector("#labor-costs-reduction .traditional-dev .value").innerHTML = xLaborCostsReductionTraditional.toLocaleString("en-US");;

    //SAVINGS IN DEVELOPMENT
    const savingsInDevelopment = Math.round(xLaborCostsReductionTraditional - xLaborCostsReductionGenexus);
    document.querySelector("#savings-in-development .money-value .value").innerHTML = savingsInDevelopment.toLocaleString("en-US");
    
    //X% MAINTENANCE TIME REDUCTION
    const maintenanceTimeReductionGenexus = Math.round(developersHoursPerAppGenexus * appMaintenanceEvolutionWorkloadFactor)
    const maintenanceTimeReductionTraditional = Math.round(developersHoursPerAppTraditional * appMaintenanceEvolutionWorkloadFactor);
    const maxMaintenanceTimeReduction = 59518;
    const percentageMaintenanceTimeReduction = parseInt(100 - (maintenanceTimeReductionGenexus / maintenanceTimeReductionTraditional * 100));
    //genexus
    document.querySelector("#x-maintenance-time-reduction .saving__title .value").innerHTML = 0;
    document.querySelector("#x-maintenance-time-reduction .genexus .bar").style.width = maintenanceTimeReductionGenexus * 100 / maxMaintenanceTimeReduction + "%";
    document.querySelector("#x-maintenance-time-reduction .genexus .value").innerHTML = parseInt(maintenanceTimeReductionGenexus).toLocaleString("en-US");  
    //traditional
    document.querySelector("#x-maintenance-time-reduction .saving__title .value").innerHTML = percentageMaintenanceTimeReduction;
    document.querySelector("#x-maintenance-time-reduction .traditional-dev .bar").style.width = maintenanceTimeReductionTraditional * 100 / maxMaintenanceTimeReduction + "%";
    document.querySelector("#x-maintenance-time-reduction .traditional-dev .value").innerHTML = parseInt(maintenanceTimeReductionTraditional).toLocaleString("en-US"); 

    //SAVINGS IN MAINTENANCE
    const savingsInMaintenanceTraditional = Math.round(averageDeveloperSalary / 12 / 167 * maintenanceTimeReductionTraditional * 5);
    const savingsInMaintenanceGenexus = Math.round(averageDeveloperSalary / 12 / 167 * maintenanceTimeReductionGenexus * 5);
    const maxSavingsInMaintenance = 37125000;
    //genexus
    document.querySelector("#savings-in-maintenance .genexus .bar").style.width = savingsInMaintenanceGenexus * 100 / maxSavingsInMaintenance + "%";
    document.querySelector("#savings-in-maintenance .genexus .value").innerHTML = savingsInMaintenanceGenexus.toLocaleString("en-US");  
    //traditional dev
    document.querySelector("#savings-in-maintenance .traditional-dev .bar").style.width = savingsInMaintenanceTraditional * 100 / maxSavingsInMaintenance + "%";
    document.querySelector("#savings-in-maintenance .traditional-dev .value").innerHTML = savingsInMaintenanceTraditional.toLocaleString("en-US");  

    //TOTAL SAVINGS IN MAINTENANCE
    const totalSavingsInMaintenance = savingsInMaintenanceTraditional - savingsInMaintenanceGenexus;
    document.querySelector("#total-savings-in-maintenance .money-value .value").innerHTML = totalSavingsInMaintenance.toLocaleString("en-US");

    //TOTAL SAVINGS IN DEVELOPMENT
    const totalSavingsInDevelopment = savingsInDevelopment + totalSavingsInMaintenance
    document.querySelector("#total-savings-in-development .money-value .value").innerHTML = totalSavingsInDevelopment.toLocaleString("en-US");

    //TOTAL VALUE ADDED BY GENEXUS
    const totalValueAddedByGenexus = Math.round(totalSavingsInDevelopment + valueAddedByGenexus);
    document.querySelector("#total-added-value-by-genexus .value").innerHTML = totalValueAddedByGenexus.toLocaleString("en-US");


    /****************************
    DISPLAY BODY
    ****************************/
    const body = document.querySelector("body");
    setTimeout(() => {
        //loader.classList.add("opacity-0");
        body.classList.add("opacity-1");
    }, 250);
    
    /*******************************************************************
    ANIMATE SELECTED SCENARIO, SAVINGS, AND TOTAL ADDED VALUE BY GENEXUS
    ********************************************************************/
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    const scenarios = document.querySelectorAll('.scenario');
    const savings = document.querySelectorAll('.saving');
    const totalAddedValueByGenexus = document.getElementById("total-added-value-by-genexus");

    document.addEventListener('scroll', function () {
        //ANIMATE SCENARIOS
        scenarios.forEach(scenario => { 
            const scenarioInViewPort = isInViewport(scenario);
            if(scenarioInViewPort) {
                scenario.classList.add("visible")
            }
        })
        //ANIMATE SAVINGS
        savings.forEach(saving => {
            const savingInViewPort = isInViewport(saving);
            if(savingInViewPort) {
                setTimeout(function(){ saving.classList.add("visible") }, 250   );
                
            }
        })
        //ANIMATE TOTAL ADDED VALUE BY GENEXUS
        const totalAddedValueByGenexusisInViewPort = isInViewport(totalAddedValueByGenexus);
        if(totalAddedValueByGenexusisInViewPort) {
            totalAddedValueByGenexus.classList.add('highlight');
        }
    });
    //if selected scenarios are visible on page load
    scenarios.forEach(scenario => { 
        const scenarioInViewPort = isInViewport(scenario);
        if(scenarioInViewPort) {
            scenario.classList.add("visible")
        }
    })
    
 })();