<template>
  <v-app>
    <div class="app-container">
      <NavBar />
      <v-content v-if="loading">
        <div class="skelton-height d-flex justify-center align-center">
          <span>{{ $t(message) }}</span>
        </div></v-content
      >
      <v-content v-else>
        <router-view :total="total" :countries="countries" />
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="grey darken-3"
          small
          @click="scrollToTop"
          class="scroll-top-btn"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-content>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { API_GET_OVERVIEW, API_GET_COUNTRIES } from "@/utilities/apis";
import Axios from "axios";
export default {
  name: "App",
  components: {
    NavBar,
    Footer
  },
  data: () => ({
    message: "loading",
    loading: true,
    error: false,
    total: {},
    countries: []
  }),
  methods: {
    scrollToTop: function() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    this.$gtag.pageview({
      page_title: "Home",
      page_path: "/"
    });
    Axios.get(API_GET_OVERVIEW)
      .then(response => {
        this.total = response.data;
        this.loading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.message = "noDataAvailable";
      });

    Axios.get(API_GET_COUNTRIES)
      .then(response => {
        this.countries = response.data;
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.message = "noDataAvailable";
      });
  }
};
</script>
<style lang="scss">
body,
#app {
  background-color: #f7f7f7;
}
.app-container {
  background-image: url("./assets/cover-6.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0px 0px;
  height: 500px;
  width: 100%;
  box-shadow: inset 0px 0px 100px 100px rgba(36, 70, 105, 0.74);
  .skelton-height {
    height: calc(100vh - 136px);
    background-color: #ffffff;
    margin: 0 3%;
  }
  .scroll-top-btn {
    bottom: 50px;
  }
}
</style>
