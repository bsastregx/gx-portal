const messageLabels = {
  en: `No more ${typePlural} to display.`,
  es: `No hay más ${typePlural} para mostrar.`,
  pt: `Não há mais ${typePlural} para mostrar.`,
};

noMoreArticlesMessageEl.innerText = messageLabels[pageLang];
