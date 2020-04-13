<template>
  <v-row dense>
    <v-col
      class="pa-5"
      v-for="(item, i) in newsItems"
      :key="i"
      cols="12"
      xs="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card color="#ffffff" dark height="500">
        <div class="d-flex flex-no-wrap justify-start" v-if="item.urlToImage">
          <v-img :src="item.urlToImage" height="200" cover></v-img>
        </div>
        <div class="d-flex flex-no-wrap justify-start" v-else>
          <v-img src="../assets/virus.jpg" height="200" cover></v-img>
        </div>
        <div
          class="d-flex flex-no-wrap justify-space-between news-title ellipsis"
        >
          <v-card-subtitle
            v-text="item.title"
            class="font-weight-bold black--text "
          ></v-card-subtitle>
        </div>
        <div
          class="d-flex flex-no-wrap justify-space-between news-description ellipsis"
        >
          <v-card-subtitle
            class="black--text "
            v-text="item.description"
          ></v-card-subtitle>
        </div>
        <div class="d-flex flex-no-wrap justify-space-between news-ext-link">
          <v-card-actions v-if="item.source">
            <v-btn :href="item.url" target="_blank" icon>
              <v-icon color="black">mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-subtitle
            class="black--text"
            v-text="formatPublishDate(item.publishedAt)"
          ></v-card-subtitle>
        </div>
      </v-card>
    </v-col>
    <v-card
      color="transparent"
      class="ma-5 mt-0"
      dark
      width="100%"
      v-if="showLoadMore"
    >
      <v-card-actions
        @click="nextArticles"
        class="d-flex flex-no-wrap justify-center pointer"
      >
        <span class="black--text">{{ $t("loadMore") }}</span>
        <v-btn icon>
          <v-icon color="black">mdi-arrow-down-bold</v-icon>
        </v-btn>
        <span class="attribution"
          ><a
            href="https://newsapi.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            >Powered by NewsAPI.org</a
          ></span
        >
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import { formatDateTime } from "../utilities/dateUtility";
export default {
  props: {
    newsItems: Array,
    showLoadMore: Boolean
  },
  methods: {
    formatPublishDate: function(date) {
      let pubDate = formatDateTime(date);
      return pubDate;
    },
    nextArticles: function() {
      this.$emit("nextArticles");
    }
  }
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.v-card.v-sheet {
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.3);
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}
.news-title {
  height: 98px;
}
.news-description {
  height: 145px;
}
.news-ext-link {
  height: 54px;
  margin-top: 10px;
}
.attribution {
  position: absolute;
  right: 5px;
  font-size: 8px;
  bottom: 5px;
  a {
    color: gray;
  }
}
</style>
