<template>
  <div class="country-container">
    <v-icon
      dark
      left
      color="whiute"
      class="back-float-button"
      @click="handleBack"
      >mdi-arrow-left</v-icon
    >
    <v-container>
      <v-row class="justify-center">
        <v-col class="d-flex col-sm-6 v-sheet justify-center align-center">
          <div
            class="d-flex country-flag"
            :style="{ backgroundImage: `url(${countryFlag})` }"
          ></div>
          <div
            class="d-flex headline white--text font-weight-bold text-capitalize"
          >
            {{ $t(country) }}
          </div>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-row justify-center">
        <Tile
          :title="$t('cases')"
          :value="cases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="deep-purple darken-2"
        />
        <Tile
          :title="$t('deaths')"
          :value="deaths"
          color="white lighten-1"
          icon="mdi-heart-pulse"
          iconColor="pink darken-2"
        />
        <Tile
          :title="$t('recovered')"
          :value="recovered"
          color="white lighten-1"
          icon="mdi-home-heart"
          iconColor="teal lighten-1"
        />
        <Tile
          :title="$t('todaysCases')"
          :value="todayCases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="deep-purple lighten-1"
        />
        <Tile
          :title="$t('todaysDeaths')"
          :value="todayDeaths"
          color="white lighten-1"
          icon="mdi-heart-pulse"
          iconColor="pink lighten-1"
        />
        <Tile
          :title="$t('casesPerOneMillion')"
          :value="casesPerOneMillion"
          color="white lighten-1"
          icon="mdi-account-group"
          iconColor="deep-purple darken-2"
        />
        <Tile
          :title="$t('deathsPerOneMillion')"
          :value="deathsPerOneMillion"
          color="white lighten-1"
          icon="mdi-account-group"
          iconColor="pink darken-2"
        />
      </v-row>
    </v-container>
    <div class="graphs-container">
      <v-row v-resize="onResize" class="d-flex flex-row">
        <LineChart
          :series="getSeries['cases']"
          :categories="getCategories['cases']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
        <LineChart
          :series="getSeries['deaths']"
          :categories="getCategories['deaths']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
        <LineChart
          :series="getSeries['recovered']"
          :categories="getCategories['recovered']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
      </v-row>
      <IndiaTableGrid :states="indianStates" v-if="showStates" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { sortBy } from "../utilities/lodashUtility";
import { createSeries, createCategories } from "../utilities/lineChartUtility";
import LineChart from "@/components/LineChart";
import Tile from "@/components/Tile";
import IndiaTableGrid from "@/components/IndiaTableGrid";
import {
  API_GET_COUNTRIES,
  API_GET_COUNTRY_HISTORY,
  API_GET_INDIAN_STATES
} from "@/utilities/apis";
import Axios from "axios";
export default {
  props: {
    countries: Array
  },
  components: {
    Tile,
    IndiaTableGrid,
    LineChart
  },
  data: () => ({
    country: null,
    countryFlag: "",
    cases: null,
    deaths: null,
    recovered: null,
    todayCases: null,
    todayDeaths: null,
    historyCases: null,
    historyDeaths: null,
    historyRecovered: null,
    categories: [],
    indianStates: [],
    showStates: false,
    barWidth: 350,
    barHeight: 350
  }),
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    onResize() {
      const windowWidth = window.outerWidth;
      if (windowWidth < 550) {
        this.barWidth = windowWidth - 50;
        this.barHeight = windowWidth - 50;
      } else {
        this.barWidth = 500;
        this.barHeight = 500;
      }
    }
  },
  computed: {
    getSeries: function() {
      const series = {
        cases: createSeries(this.$t("cases"), this.historyCases),
        deaths: createSeries(this.$t("deaths"), this.historyDeaths),
        recovered: createSeries(this.$t("recovered"), this.historyRecovered)
      };
      return series;
    },
    getCategories: function() {
      const categories = {
        cases: createCategories(
          this.$t("confirmedCasesLg"),
          this.categories,
          "cases"
        ),
        deaths: createCategories(
          this.$t("deathsLg"),
          this.categories,
          "deaths"
        ),
        recovered: createCategories(
          this.$t("recoveredLg"),
          this.categories,
          "recovered"
        )
      };
      return categories;
    }
  },
  mounted() {
    const backButtonElem = document.querySelector(".back-float-button");
    const countryCode = this.$route.params.code;
    Axios.get(`${API_GET_COUNTRIES}/${countryCode}`)
      .then(response => {
        const data = response.data;
        this.country = data.country;
        this.cases = data.cases;
        this.deaths = data.deaths;
        this.recovered = data.recovered;
        this.todayCases = data.todayCases;
        this.todayDeaths = data.todayDeaths;
        this.casesPerOneMillion = data.casesPerOneMillion;
        this.deathsPerOneMillion = data.deathsPerOneMillion;
        this.countryFlag = data.countryInfo.flag;
        this.loading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
      });

    Axios.get(`${API_GET_COUNTRY_HISTORY}/${countryCode}`)
      .then(response => {
        const data = response.data.timeline;
        const historyCases = Object.values(data.cases);
        const historyDeaths = Object.values(data.deaths);
        const historyRecovered = Object.values(data.recovered);
        const categories = Object.keys(data.deaths).map(date =>
          moment(date).format("DD-MMM")
        );
        this.historyCases = historyCases;
        this.historyDeaths = historyDeaths;
        this.historyRecovered = historyRecovered;
        this.categories = categories;
      })
      .catch(error => {
        this.error = error;
      });

    if (countryCode.toLowerCase() == "in") {
      this.showStates = true;
      Axios.get(API_GET_INDIAN_STATES)
        .then(response => {
          const states = response.data.statewise;
          const indianStates = sortBy(states, "confirmed");
          this.indianStates = indianStates;
        })
        .catch(error => {
          this.error = error;
        });
    }
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const defaultTop = 70;

      if (window.innerWidth <= 500) {
        if (scrollTop <= defaultTop) {
          const newTop = defaultTop - scrollTop;
          backButtonElem.setAttribute("style", `top:${newTop}px`);
          backButtonElem.classList.remove("is-hidden");
        } else {
          backButtonElem.setAttribute("style", `top:0`);
          backButtonElem.classList.add("is-hidden");
        }
      } else {
        if (scrollTop >= defaultTop / 2) {
          backButtonElem.classList.add("is-hidden");
        } else {
          const newTop = defaultTop - scrollTop;
          backButtonElem.setAttribute("style", `height:${newTop}px`);
          backButtonElem.classList.remove("is-hidden");
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.graphs-container {
  padding-top: 50px;
  margin: 0 3%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.3);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.country-flag {
  width: 70px;
  height: 100%;
  background-size: contain;
}
.back-float-button {
  position: fixed;
  top: 0;
  height: 60px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 0 3%;
}
.is-hidden {
  display: none;
}
.country-container {
  min-height: calc(100vh - 136px);
  .theme--dark.v-icon:focus::after {
    opacity: 0;
  }
}
@media screen and (max-width: 500px) {
  .back-float-button {
    top: 75px;
  }
}
</style>
