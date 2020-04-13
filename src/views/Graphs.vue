<template>
  <div>
    <v-container>
      <v-row class="d-flex flex-row justify-center tile-row-container">
        <Tile
          :title="$t('cases')"
          :value="total.cases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="deep-purple darken-2"
        />
        <Tile
          :title="$t('deaths')"
          :value="total.deaths"
          color="white lighten-1"
          icon="mdi-heart-pulse"
          iconColor="pink darken-2"
        />
        <Tile
          :title="$t('recovered')"
          :value="total.recovered"
          color="white lighten-1"
          icon="mdi-home-heart"
          iconColor="teal lighten-1"
        />
        <Tile
          :title="$t('newCases')"
          :value="getNewCases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="deep-purple lighten-1"
        />
        <Tile
          :title="$t('newDeaths')"
          :value="getNewDeaths"
          color="white lighten-1"
          icon="mdi-heart-pulse"
          iconColor="pink lighten-1"
        />
      </v-row>
    </v-container>
    <div class="graphs-container">
      <v-row
        v-resize="onResize"
        class="d-flex flex-row justify-sm-space-around justify-md-space-around"
      >
        <BarChart
          :series="getSeries['cases']"
          :categories="getCategories['cases']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
        <BarChart
          :series="getSeries['active']"
          :categories="getCategories['active']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
      </v-row>
      <v-row
        class="d-flex flex-row justify-sm-space-around justify-md-space-around"
      >
        <BarChart
          :series="getSeries['deaths']"
          :categories="getCategories['deaths']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
        <BarChart
          :series="getSeries['recovered']"
          :categories="getCategories['recovered']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
      </v-row>
      <v-row
        class="d-flex flex-row justify-sm-space-around justify-md-space-around"
      >
        <BarChart
          :series="getSeries['critical']"
          :categories="getCategories['critical']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
        <BarChart
          :series="getSeries['todayCases']"
          :categories="getCategories['todayCases']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
      </v-row>
      <v-row
        class="d-flex flex-row justify-sm-space-around justify-md-space-around"
      >
        <BarChart
          :series="getSeries['todayDeaths']"
          :categories="getCategories['todayDeaths']"
          :barWidth="barWidth"
          :barHeight="barHeight"
        />
      </v-row>
    </div>
  </div>
</template>

<script>
import Tile from "@/components/Tile";
import BarChart from "@/components/BarChart";
import { createSeries, createCategories } from "../utilities/chartUtility";
import { getTotal } from "@/utilities/factory";
export default {
  data: function() {
    return {
      barWidth: 350,
      barHeight: 350
    };
  },
  props: {
    total: {
      type: Object,
      default: () => ({
        cases: 0,
        deaths: 0,
        recovered: 0
      })
    },
    countries: Array
  },
  components: {
    Tile,
    BarChart
  },
  mounted() {
    this.$gtag.pageview({
      page_title: "Graphs",
      page_path: "/graphs"
    });
  },
  methods: {
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
        cases: createSeries([...this.countries], 10, "cases", this.$t("cases")),
        active: createSeries(
          [...this.countries],
          10,
          "active",
          this.$t("activeCases")
        ),
        deaths: createSeries(
          [...this.countries],
          10,
          "deaths",
          this.$t("deaths")
        ),
        recovered: createSeries(
          [...this.countries],
          10,
          "recovered",
          this.$t("recovered")
        ),
        critical: createSeries(
          [...this.countries],
          10,
          "critical",
          this.$t("criticalCases")
        ),
        todayCases: createSeries(
          [...this.countries],
          10,
          "todayCases",
          this.$t("todaysCases")
        ),
        todayDeaths: createSeries(
          [...this.countries],
          10,
          "todayDeaths",
          this.$t("todaysDeaths")
        )
      };
      return series;
    },
    getCategories: function() {
      const categories = {
        cases: createCategories(
          [...this.countries],
          10,
          "cases",
          this.$t("totalCases")
        ),
        active: createCategories(
          [...this.countries],
          10,
          "active",
          this.$t("totalActiveCases")
        ),
        deaths: createCategories(
          [...this.countries],
          10,
          "deaths",
          this.$t("totalDeaths")
        ),
        recovered: createCategories(
          [...this.countries],
          10,
          "recovered",
          this.$t("totalRecovered")
        ),
        critical: createCategories(
          [...this.countries],
          10,
          "critical",
          this.$t("totalCritical")
        ),
        todayCases: createCategories(
          [...this.countries],
          10,
          "todayCases",
          this.$t("todaysCases")
        ),
        todayDeaths: createCategories(
          [...this.countries],
          10,
          "todayDeaths",
          this.$t("todaysDeaths")
        )
      };
      return categories;
    },
    getNewCases: function() {
      const todayCases = getTotal(this.countries, "todayCases");
      return todayCases;
    },
    getNewDeaths: function() {
      const todayDeaths = getTotal(this.countries, "todayDeaths");
      return todayDeaths;
    }
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
@media screen and (min-width: 768px) {
  .tile-row-container {
    margin-bottom: 24px;
  }
}
</style>
