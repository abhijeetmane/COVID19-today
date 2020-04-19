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
          iconColor="deep-purple darken-2"
        />
        <Tile
          :title="$t('todaysCases')"
          :value="todayCases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="pink darken-2"
        />
        <Tile
          :title="$t('todaysDeaths')"
          :value="todayDeaths"
          color="white lighten-1"
          icon="mdi-heart-pulse"
          iconColor="pink darken-2"
        />
        <Tile
          :title="$t('recovered')"
          :value="recovered"
          color="white lighten-1"
          icon="mdi-home-heart"
          iconColor="cyan darken-2"
        />
      </v-row>
    </v-container>
    <div class="graphs-container">
      <div class="toggles">
        <v-tabs right slider-size="2">
          <v-tab v-for="tab in tabs" :key="tab.name" @click="toggle(tab.name)">
            <span :class="{ active: tab.name === activeTab }">{{
              $t(tab.name)
            }}</span>
          </v-tab>
        </v-tabs>
      </div>
      <IndiaTableGrid
        :states="indianStates"
        :indianDistricts="indianDistricts"
        v-if="activeTab === 'states'"
      />
      <v-row v-resize="onResize" class="d-flex flex-row graphs-section" v-else>
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
  API_GET_COUNTRY_HISTORY,
  API_GET_INDIAN_STATES,
  API_GET_INDIAN_STATES_DISTRICTS
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
    formatting: [],
    country: "India",
    countryFlag:
      "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png",
    cases: null,
    deaths: null,
    recovered: null,
    todayCases: null,
    todayDeaths: null,
    todayRecoverd: null,
    historyCases: null,
    historyDeaths: null,
    historyRecovered: null,
    categories: [],
    indianStates: [],
    indianDistricts: {},
    barWidth: 350,
    barHeight: 350,
    tabs: [{ name: "states" }, { name: "Graphs" }],
    activeTab: "states"
  }),
  methods: {
    handleBack: function() {
      this.$router.push({ name: "Home" });
    },
    toggle: function(name) {
      this.activeTab = name;
      this.$gtag.event("india_toggle", {
        event_category: "india_toggle",
        event_label: name,
        value: name
      });
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

    Axios.get(API_GET_INDIAN_STATES)
      .then(response => {
        const states = response.data.statewise;
        const indianStates = sortBy(states, "confirmed");
        this.indianStates = indianStates;
        const total = states[0];
        this.cases = total.confirmed;
        this.deaths = total.deaths;
        this.recovered = total.recovered;
        this.todayCases = total.deltaconfirmed;
        this.todayDeaths = total.deltadeaths;
        this.todayRecoverd = total.deltarecovered;
      })
      .catch(error => {
        this.error = error;
      });

    Axios.get(API_GET_INDIAN_STATES_DISTRICTS)
      .then(response => {
        this.indianDistricts = response.data;
      })
      .catch(error => {
        this.error = error;
      });

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
  margin: 0 3%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.3);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  .toggles {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    .theme--light.v-tabs .v-tab--active:hover::before,
    .theme--light.v-tabs .v-tab--active::before {
      opacity: 0;
    }
    button {
      height: 40px;
    }
    .active {
      color: #337ab7;
      font-weight: bold;
    }
  }
  .graphs-section {
    margin-top: 10px;
  }
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
