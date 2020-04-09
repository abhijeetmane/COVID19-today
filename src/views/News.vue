<template>
  <div class="graphs-container" v-if="newsItems">
    <NewsCards :newsItems="newsItems" @nextArticles="nextArticles" />
  </div>
</template>
<script>
import NewsCards from "@/components/NewsCards";
import { fetchArticles } from "../utilities/factory";
export default {
  data: function() {
    return {
      newsItems: [],
      currentPage: 1
    };
  },

  components: {
    NewsCards
  },
  methods: {
    nextArticles: function() {
      const loadedArticleCount = this.currentPage * 12;
      if (loadedArticleCount < this.totalResults) {
        this.currentPage = this.currentPage + 1;
        fetchArticles(this.currentPage).then(
          response => {
            this.newsItems = [...this.newsItems, ...response.articles];
          },
          error => {
            this.error = error;
          }
        );
      }
    }
  },
  mounted() {
    this.$gtag.pageview({
        page_title:'News',
        page_path: '/news',
      });
    fetchArticles(this.currentPage).then(
      response => {
        this.newsItems = response.articles;
        this.totalResults = response.totalResults;
      },
      error => {
        this.newsItems = [];
        this.error = error;
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.graphs-container {
  border-radius: 8px;
  margin: 0 3%;
  overflow: hidden;
  min-height: calc(100vh - 136px);
}
</style>
