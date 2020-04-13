import NewsAPI from "newsapi";

const newsQuery = {
  en: "covid-19 OR corona OR covid OR health OR corona cure OR corona medicine",
  nl:
    "covid-19 OR corona OR covid OR gezondheid OR corona genezen OR corona medicijn",
  de: "covid-19 OR corona OR covid OR Gesundheit OR Koronakur OR Koronamedizin",
  fr: "covid-19 OR corona OR covid OR santé OR cure corona OR médecine corona",
  es:
    "covid-19 OR corona OR covid OR salud OR corona cura OR corona medicamento",
  mr:
    "covid-19 OR corona OR covid OR करोना OR कोरोना OR आरोग्य OR करोना बरा OR करोना औषध OR औषध OR संक्रमण OR संसर्ग",
  ta:
    "கொரோனா OR கொரோனா OR சிகிச்சை OR கொரோனா OR மருந்து OR தொற்று OR மாற்றம் OR கொரோனாவைரஸ்",
  hi: "covid-19 OR corona OR covid OR स्वास्थ्य OR कोरोना इलाज OR कोरोना दवा"
};

export const fetchArticles = (page, language = "en") => {
  require("dotenv").config();
  const apiKey = process.env.VUE_APP_NEWS_API;
  const newsapi = new NewsAPI(apiKey);
  return newsapi.v2.everything({
    q: newsQuery[language],
    language,
    page,
    pageSize: 12,
    sortBy: "publishedAt"
  });
};

export const getTotal = (countries, key) => {
  const total = countries.reduce((total, country) => {
    return total + country[key];
  }, 0);
  return total;
};
