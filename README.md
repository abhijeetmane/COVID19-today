## Covid19today

Dashboard for Corona cases across the world.

### Features

- Count of Corona cases across the world.
- Detailed overview of cases per country.
- Graphs for quick overview of cases.
- Recent news about corona across the world.
- FAQ page for additional information.
- Localization available for 8 languages (English, German, Spanish, French, Dutch, Marathi, Tamil and Hindi)

### Consumed APIs
- <a target="_blank" href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest">NovelCOVID API</a>
- <a target="_blank" href="https://documenter.getpostman.com/view/10724784/SzYXXKmA?version=latest">COVID19-India API</a>
- News are powered by <a href="https://newsapi.org">NewsAPI.org</a>

### `Start Application`

- `npm install`
- `npm run serve`
- Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Technologies/Plugins Used
- VueJs, ES6, HTML, SCSS, Vuetify Material Design

### Q & A
- Why don't I get news article on my local?
  - Create your own API key on <a href="https://newsapi.org">NewsAPI.org</a>
  - Create .env file and keep it in root folder of project
  - Create variable VUE_APP_NEWS_API={your_api_key} in .env file

### Application glimpse
- ![covid19-today](https://user-images.githubusercontent.com/18515777/79118401-23f04b80-7d8e-11ea-8200-b0cd8236aa3a.gif)