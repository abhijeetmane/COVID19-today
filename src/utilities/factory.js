import NewsAPI from "newsapi";

export const fetchArticles = (page, language = "en") => {
  require("dotenv").config();
  const apiKey = process.env.VUE_APP_NEWS_API;
  const newsapi = new NewsAPI(apiKey);
  return newsapi.v2.everything({
    q: "covid-19 OR corona",
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
