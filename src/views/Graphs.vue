<template>
  <div>
    <v-container>
      <v-row class="d-flex flex-row justify-center mb-6">
        <Tile
          title="Cases"
          :value="total.cases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="deep-purple darken-2"
        />
        <Tile
          title="Deaths"
          :value="total.deaths"
          color="white lighten-1"
          icon="mdi-heart-pulse"
          iconColor="pink darken-2"
        />
        <Tile
          title="Recovered"
          :value="total.recovered"
          color="white lighten-1"
          icon="mdi-home-heart"
          iconColor="teal lighten-1"
        />
        <Tile
          title="New Cases"
          :value="getNewCases"
          color="white lighten-1"
          icon="mdi-ambulance"
          iconColor="deep-purple lighten-1"
        />
        <Tile
          title="New Deaths"
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
  mounted(){
        this.$gtag.pageview({
        page_title:'Graphs',
        page_path: '/graphs',
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
        cases: createSeries([...this.countries], 10, "cases"),
        active: createSeries([...this.countries], 10, "active"),
        deaths: createSeries([...this.countries], 10, "deaths"),
        recovered: createSeries([...this.countries], 10, "recovered"),
        critical: createSeries([...this.countries], 10, "critical"),
        todayCases: createSeries([...this.countries], 10, "todayCases"),
        todayDeaths: createSeries([...this.countries], 10, "todayDeaths")
      };
      return series;
    },
    getCategories: function() {
      const categories = {
        cases: createCategories(
          [...this.countries],
          10,
          "cases",
          "Total Cases"
        ),
        active: createCategories(
          [...this.countries],
          10,
          "active",
          "Total Active Cases"
        ),
        deaths: createCategories(
          [...this.countries],
          10,
          "deaths",
          "Total Deaths"
        ),
        recovered: createCategories(
          [...this.countries],
          10,
          "recovered",
          "Total Recovered"
        ),
        critical: createCategories(
          [...this.countries],
          10,
          "critical",
          "Total Critical"
        ),
        todayCases: createCategories(
          [...this.countries],
          10,
          "todayCases",
          "Today's Cases"
        ),
        todayDeaths: createCategories(
          [...this.countries],
          10,
          "todayDeaths",
          "Today's Deaths"
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
</style>
