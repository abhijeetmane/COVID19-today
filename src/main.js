import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
import VueGtag from "vue-gtag";
import i18n from "./i18n";

const GA_MEASUREMENT_ID = process.env.VUE_APP_GA_MEASUREMENT_ID;
Vue.use(
  VueGtag,
  {
    config: { id: GA_MEASUREMENT_ID }
  },
  router
);
export const bus = new Vue();
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false;
new Vue({
  router,
  vuetify,
  VueApexCharts,
  i18n,
  render: h => h(App)
}).$mount("#app");
