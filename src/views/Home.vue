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
      <TableGrid :countries="countries" @navigateCountry="navigateCountry" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tile from "@/components/Tile";
import TableGrid from "@/components/TableGrid";
import { getTotal } from "@/utilities/factory";
export default {
  name: "Home",
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
    TableGrid
  },
  methods: {
    navigateCountry: function(item) {
      this.$router.push({
        name: "Country",
        params: { code: item.countryInfo.iso2, name: item.country }
      });
      this.$gtag.event("country_selected", {
        Action: "click",
        Category: "country",
        Label: item.country
      });
    }
  },
  computed: {
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
  margin: 0 3%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.3);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
@media screen and (min-width: 768px) {
  .tile-row-container {
    margin-bottom: 24px;
  }
}
</style>
