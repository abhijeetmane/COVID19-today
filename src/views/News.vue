<template>
  <div class="graphs-container" v-if="newsItems">
    <NewsCards
      :newsItems="newsItems"
      :showLoadMore="showLoadMore"
      @nextArticles="nextArticles"
    />
  </div>
</template>
<script>
import NewsCards from "@/components/NewsCards";
import { fetchArticles } from "../utilities/factory";
import { bus } from "../main";
export default {
  data: function() {
    return {
      newsItems: [],
      currentPage: 1,
      showLoadMore: false
    };
  },
  components: {
    NewsCards
  },
  methods: {
    nextArticles: function() {
      const pageSize = 12;
      const loadedArticleCount = this.currentPage * pageSize;
      if (loadedArticleCount < this.totalResults) {
        this.showLoadMore = true;
        this.currentPage = this.currentPage + 1;
        fetchArticles(this.currentPage, this.$i18n.locale).then(
          response => {
            this.newsItems = [...this.newsItems, ...response.articles];
          },
          error => {
            this.error = error;
          }
        );
      } else {
        this.showLoadMore = false;
      }
    },
    loadArticles: function() {
      fetchArticles(this.currentPage, this.$i18n.locale).then(
        response => {
          const pageSize = 12;
          this.newsItems = response.articles;
          this.totalResults = response.totalResults;
          this.showLoadMore = true;
          if (this.totalResults <= pageSize) {
            this.showLoadMore = false;
          }
        },
        error => {
          this.newsItems = [];
          this.error = error;
          this.showLoadMore = false;
        }
      );
    }
  },
  mounted() {
    this.$gtag.pageview({
      page_title: "News",
      page_path: "/news"
    });
    this.loadArticles();
    bus.$on("i18codeChanged", () => {
      this.loadArticles();
    });
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
