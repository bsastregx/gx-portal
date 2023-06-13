const lang = document.querySelector("html").getAttribute("lang");

let content = {
  main: {
    "step-title": {
      en: "Step 1",
      es: "Paso 1",
      pt: "Passo 1",
    },
    "step-subtitle": {
      en: "Select variables",
      es: "Seleccionar variables",
      pt: "Selecione variáveis",
    },
    "average-full-time-delelopers-per-app": {
      en: "Average #Full-time Developers per App",
      es: "Promedio de Desarrolladores de Tiempo Completo por Aplicación",
      pt: "Média de Desenvolvedores de Tempo Integral por Aplicação",
    },
    "average-developer-salary": {
      en: "Average Developer Salary (Total Cost by Year)",
      es: "Promedio del Salario del Desarrollador (Costo Total Anual)",
      pt: "Salário Médio de Desenvolvedores (Custo Total por Ano)",
    },
    "app-type-complexity": {
      en: "App Type / Complexity",
      es: "Tipo de App/Complejidad",
      pt: "Tipo de Aplicativo / Complexidade",
      options: {
        en: [
          "Simple (CRUD, Reports, Easy Functions)",
          "Simple (CRUD, Reports, Easy Functions)",
          "Medium (All SIMPLE + Complex Data & Heavy Calculations + Complex Reports)",
          "Complex (All MEDIUM + Complex Integrations + AI + Specific Performance and / or Security Requirements)",
        ],
        es: [
          "Simple (CRUD, Reportes, Funciones Fáciles)",
          "Simple (CRUD, Reportes, Funciones Fáciles)",
          "Media (SIMPLE + Datos Complejos y Cálculos Difíciles + Reportes Complejos)",
          "Compleja (MEDIA + Integraciones Complejas + AI + Requerimientos Específicos de Performance y/o Seguridad)",
        ],
        pt: [
          "Simples (Crud, Relatórios, Funções Fáceis)",
          "Simples (Crud, Relatórios, Funções Fáceis)",
          "Médio (TODAS as Características do SIMPLES + Dados Complexos e Calculos Pesados ​​+ Relatórios Complexos)",
          "Complexo (TODAS as Características do MÉDIO + Integrações Complexas + AI + Requerimentos Específicos de Desempenho e / ou de Segurança)",
        ],
      },
    },
    "app-tech-environment": {
      en: "App Tech Environment",
      es: "Entorno Tecnológico de la App",
      pt: "Ambiente de Tecnologia App",
      options: {
        en: [
          "Simple (One of a Kind: Either Java or .NET/NetCore, Single DBMS)",
          "Simple (One of a Kind: Either Java or .NET/NetCore, Single DBMS)",
          "Medium (All SIMPLE + Web and Mobile Integration)",
          "Complex (All MEDIUM + Specific Integration and/or Performance and / or Security Requirements)",
        ],
        es: [
          "Simple (De un Tipo: Java o .NET/Netcore, DBMS único)",
          "Simple (De un Tipo: Java o .NET/Netcore, DBMS único)",
          "Medio (SIMPLE + Integración Web y Mobile)",
          "Complejo (MEDIO + Integraciones Específicas y/o Requerimientos Especificos de Performance y/o Seguridad)",
        ],
        pt: [
          "Simples (Um dos tipos: Java ou .NET/NetCore, Único DBMS)",
          "Simples (Um dos tipos: Java ou .NET/NetCore, Único DBMS)",
          "Médio (TODAS as Características do SIMPLES + Integração Web e Móvel)",
          "Complexo (TODAS as Características do MÉDIO + Integração Específica e / ou Requesitos Especiais de Desempenho e / ou Segurança)",
        ],
      },
    },
    "how-long-to-build-a-software-solution": {
      en: "How Long Does it Take Your Team to Build a Software Solution?",
      es: "Tiempo de Construcción de Una Solución de Software",
      pt: "Quanto Tempo Leva sua Equipe Para Construir uma Solução de Software?",
      singular: {
        en: "Month",
        es: "Mes",
        pt: "Mês",
      },
      plural: {
        en: "Months",
        es: "Meses",
        pt: "Meses",
      },
    },
    "how-many-custom-apps-in-12-months": {
      en: "How Many Custom Apps Are You Able to Build in 12 Months",
      es: "¿Cuántas Aplicaciones Personalizadas Puedes Construir en 12 Meses?",
      pt: "Quantos Aplicativos Personalizados Você é Capaz de Construir em 12 Meses",
      plural: {
        en: "Apps",
        es: "Apps",
        pt: "Apps",
      },
    },
    "money-to-save-in-a-month": {
      en: "On Average, How Much Money Do You Expect an App to Save and / or Generate For Your Company in a Month",
      es: "En Promedio, ¿Cuánto Dinero Esperas que Una App Ahorre y/o Genere Para tu Empresa en un Mes?",
      pt: "Em média, Quanto Dinheiro Espera que uma Aplicação Poupe e/ou Gere Para a sua Empresa num Mês",
    },
    "app-maintenance-evolution-workload": {
      en: "App Maintenance / Evolution Workload",
      es: "Mantenimiento de la App/Evolución de la Carga de Trabajo",
      pt: "Carga de Trabalho de Manutenção / Evolução da Aplicação",
      options: {
        en: [
          "Low (Few adjustments / Bugs per Year)",
          "Low (Few adjustments / Bugs per Year)",
          "Medium (Some Adjustments / Bugs per Quarter)",
          "High (Many Adjustments / Bugs per Month)",
        ],
        es: [
          "Bajo (Pocos Ajustes/Errores por Año)",
          "Bajo (Pocos Ajustes/Errores por Año)",
          "Medio (Algunos Ajustes/Errores por Trimestre)",
          "Alto (Muchos Ajustes/Errores por Mes)",
        ],
        pt: [
          "Baixa (Poucos Ajustes / Bugs por Ano)",
          "Baixa (Poucos Ajustes / Bugs por Ano)",
          "Médio (Alguns Ajustes / Bugs por Trimestre)",
          "Alto (Muitos Ajustes / Bugs por Mês)",
        ],
      },
    },
    "time-to-market": {
      en: "Time to Market",
      es: "Plazo de Lanzamiento",
      pt: "Prazo de Lançamento",
      faster: {
        en: "Faster",
        es: "Más Rápido",
        pt: "Mais Rápido",
      },
    },
    "cost-reduction": {
      en: "Cost Reduction",
      es: "Reducción de Costos",
      pt: "Redução de Custos",
    },
    "apps-per-year": {
      en: "Apps per Year",
      es: "Aplicaciones por Año",
      pt: "Apps por Ano",
    },
    "maintenance-savings": {
      en: "Maintenance Savings",
      es: "Ahorros de Mantenimiento",
      pt: "Economia em Manutenção",
    },
    "total-added-value-by-genexus": {
      en: "Total Added Value by GeneXus Over Traditional Development (5 Year App Lifecycle)",
      es: "Valor Agregado por GeneXus Sobre el Desarrollo Tradicional (5 años de ciclo de Vida de la App)",
      pt: "Valor Adicionado Total por GeneXus Sobre o Desenvolvimento Tradicional (Ciclo de Vida de 5 Anos)",
    },
    "request-full-report-btn": {
      en: "Request full report",
      es: "Solicitar reporte completo",
      pt: "Solicitar relatório completo",
    },
  },
  "full-report": {
    tags: {
      developers: {
        en: "Developers",
        es: "Desarrolladores",
        pt: "Desenvolvedores",
      },
      "salary-year": {
        en: "Dev Salary / Year",
        es: "Por Desarrollador / Año",
        pt: "Por Desenvolvedor / Ano",
      },
      "months-build-solution": {
        en: "To Build A Software Solution",
        es: "Por Solución De Software",
        pt: "Por Solução De Software",
      },
      "custom-apps-12-months": {
        en: "Custom Apps In 12 Months",
        es: "Apps Personalizadas Por Año",
        pt: "Aplicativos Personalizados Em 12 Meses",
      },
      "usd-an-app-save-month": {
        en: "An App To Save In A Month",
        es: "De Valor Por App/Mes",
        pt: " Um Aplicativo Para Economizar Em Um Mês",
      },
      "app-maintenance": {
        en: "App Maintenance",
        es: "Mantenimiento De La App",
        pt: "App Manutenção",
      },
    },
    "result-detail": {
      en: "Result Detail",
      es: "Detalle de Resultados",
      pt: "Detalhe do resultado",
    },
    "selected-scenario": {
      en: "SELECTED SCENARIO",
      es: "ESCENARIO SELECCIONADO",
      pt: "CENÁRIO SELECIONADO",
      scenarios: {
        "app-type-complexity": {
          title: {
            en: "App Type / Complexity",
            es: "Complejidad / Tipo de App",
            pt: "Complexidade do Tipo de Aplicação",
          },
          description: {
            en: (type) => {
              return `You Picked The Scenario of a ${type} Complexity Application`;
            },
            es: (type) => {
              return `Seleccionaste el Escenario de una Aplicación ${type}`;
            },
            pt: (type) => {
              return `Você Escolheu o Cenário de uma Aplicação de Complexidade ${type}`;
            },
          },
        },
        "app-tech-environment": {
          title: {
            en: "App tech environment",
            es: "Entorno Tecnológico de la App",
            pt: "Ambiente Tecnológico da Aplicação",
          },
          description: {
            en: (type) => {
              return `You Picked The Scenario of a ${type} App Tech Environment`;
            },
            es: (type) => {
              return `Seleccionaste el Escenario de Una App con Entorno Tecnológico ${type}`;
            },
            pt: (type) => {
              return `Você Escolheu o Cenário de um Ambiente Técnico de Aplicação ${type}`;
            },
          },
        },
        "app-maintenance": {
          title: {
            en: "App Maintenance / Evolution Workload",
            es: "Mantenimiento de la app",
            pt: "Carga de Trabalho para Manutenção",
          },
          description: {
            en: (type) => {
              return `You Picked The Scenario of a ${type} App Maintenance / Evolution Workload`;
            },
            es: (type) => {
              return `Seleccionaste un Escenario de Mantenimiento de la App ${type}`;
            },
            pt: (type) => {
              return `Você Escolheu o Cenário de uma Carga de Trabalho para Manutenção ${type}`;
            },
          },
        },
      },
    },
    "speed-to-market": {
      title: {
        en: "Speed to Market",
        es: "Velocidad al Mercado",
        pt: "Mais Rápido Para o Mercado",
      },
      description: {
        en: "Speed Increase to Put Your App in Production",
        es: "Aumento de Velocidad Para Colocar tu Aplicación en Producción",
        pt: "Aumento de Velocidade Para Colocar seu Aplicativo em Produção",
      },
    },
    "value-added": {
      title: {
        en: "Value Added by GeneXus",
        es: "Valor Agregado por GeneXus",
        pt: "Valor Agregado pela GeneXus",
      },
      description: {
        en: "Value Added Due Speed to Market Increase",
        es: "Valor Agregado Debido al Aumento de la Velocidad de Mercado",
        pt: "Valor Agregado Devido ao Aumento da Velocidade do Mercado",
      },
    },
    "dev-hours": {
      title: {
        en: "Developers Hours Per App",
        es: "Horas de Desarrollador por App",
        pt: "Horas-homem Desenvolvimento por Aplicativo",
      },
      description: {
        en: "Hours it Takes Your Team to Make an App",
        es: "Horas que le Lleva a tu Equipo Hacer Una App",
        pt: "Horas Necessárias Para que sua Equipe Faça um Aplicativo",
      },
    },
    "apps-per-year": {
      title: {
        en: "More Apps per Year",
        es: "Más Apps por Año",
        pt: "Mais Aplicações por Ano",
      },
      description: {
        en: "Increase in Your App per Year Generation Capability",
        es: "Aumento de tu Capacidad Anual de Generación de Apps",
        pt: "Aumento na Capacidade de Geração de seu Aplicativo por Ano",
      },
    },
    "labor-costs-reduction": {
      title: {
        en: "Labor-Costs Reduction",
        es: "Reducción de Costos Laborales en un",
        pt: "de Redução dos Custos de Mão-de-Obra",
      },
      description: {
        en: "Developers Salary Cost per App",
        es: "Costo Salarial de los Desarrolladores por Aplicación",
        pt: "Custo Salarial dos Desenvolvedores por Aplicação",
      },
    },
    "savings-in-development": {
      title: {
        en: "Savings in Development",
        es: "Ahorros en Desarrollo",
        pt: "Economia no Desenvolvimento",
      },
      description: {
        en: "Development Savings Over Traditional Development",
        es: "Ahorros Sobre Desarrollo Tradicional",
        pt: "Economia no Desenvolvimento em Relação ao Desenvolvimento Tradicional",
      },
    },
    "maintenance-time-reduction": {
      title: {
        en: "Maintenance Time Reduction",
        es: "Reducción de Tiempo de Mantenimiento en un",
        pt: "de Redução do Tempo/Esforço de Manutenção",
      },
      description: {
        en: "Reduction in Maintenance Hours per App/Year",
        es: "Reducción de Horas de Mantenimiento por App/Año",
        pt: "Redução nas Horas de Manutenção por Aplicativo/Ano",
      },
      "maintenance-hours": {
        en: "Maintenance Hours",
        es: "Horas de Mantenimiento",
        pt: "Horas de Manutenção",
      },
    },
    "savings-in-maintenance": {
      title: {
        en: "Savings in Maintenance",
        es: "Ahorros en Mantenimiento",
        pt: "Economia na Manutenção",
      },
      description: {
        en: "Maintenance Labor Cost per App (5 Year App Lifecycle)",
        es: "Costo de Mano de Obra de Mantenimiento por Aplicación (Ciclo de 5 Años de Vida de la Aplicación)",
        pt: "Custo de Mão-de-Obra de Manutenção por Aplicação (5 Anos de Ciclo de Vida da Aplicação)",
      },
    },
    "total-savings-in-maintenance": {
      title: {
        en: "Total Savings in Maintenance",
        es: "Ahorros Totales en Mantenimiento",
        pt: "Economia Total em Manutenção",
      },
      description: {
        en: "Maintenance Savings Over Traditional Development (5 Year App Lifecycle)",
        es: "Ahorros de Mantenimiento Sobre Desarrollo Tradicional (Ciclo de 5 Años de Vida de la Aplicación)",
        pt: "Economia de Manutenção em Relação ao Desenvolvimento Tradicional (5 Anos de Ciclo de Vida da Aplicação)",
      },
    },
    "total-savings-in-development": {
      title: {
        en: "Total Savings in Development",
        es: "Ahorro Total en Desarrollo",
        pt: "Economia Total em Desenvolvimento",
      },
      description: {
        en: "Total Savings Over Traditional Development (5 Year App Lifecycle)",
        es: "Ahorro Total Sobre Desarrollo Tradicional (Ciclo de 5 Años de Vida de la Aplicación)",
        pt: "Economia Total em Relação ao Desenvolvimento Tradicional (5 Anos de Ciclo de Vida da Aplicação)",
      },
    },
    "total-added-value": {
      en: "Total Added Value by GeneXus (5 Year App Lifecycle)",
      es: "Valor Total Agregado por GeneXus (Ciclo de 5 Años de Vida de la Aplicación)",
      pt: "Valor Total Adicionado pela GeneXus (5 Anos de Ciclo de Vida da Aplicação)",
    },
  },
  common: {
    month: {
      en: "Month",
      es: "Mes",
      pt: "Mês",
    },
    "traditional-dev": {
      en: "TRADITIONAL DEV",
      es: "DESARROLLO TRADICIONAL",
      pt: "DESENVOLVIMENTO TRADICIONAL",
    },
    saving: {
      en: "SAVING",
      es: "AHORRO",
      pt: "ECONOMIA",
    },
    hours: {
      en: "Hours",
      es: "Horas",
      pt: "Horas",
    },
  },
};

/******************
STEPS
*******************/

const step1 = document.getElementById("step-title");
if (step1) {
  step1.innerText = content.main["step-1"][lang];
}
const stepSubtitle = document.getElementById("step-subtitle");
if (stepSubtitle) {
  stepSubtitle.innerText = content.main["select-1"][lang];
}

/******************
MAIN-FORM
*******************/

/******************
SAVINGS
*******************/

/**************************
BUTTON 'REQUEST FULL REPORT'
***************************/
