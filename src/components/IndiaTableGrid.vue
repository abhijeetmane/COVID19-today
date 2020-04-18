<template>
  <div class="state-data-table">
    <v-toolbar dark>
      <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-sort</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in computedHeaders"
            :key="item.text"
            @click="changeSort(item.value)"
          >
            <v-list-item-title
              >{{ item.text }}
              <v-icon v-if="sortBy === item.value">{{
                sortDesc ? "mdi-arrow-down" : "mdi-arrow-up"
              }}</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :placeholder="$t('searchState')"
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-card color="#f7f7f7">
      <v-card-title>
        <v-row>
          <div class="table-container-india">
            <v-data-table
              :headers="computedHeaders"
              :items="states"
              item-key="state"
              :search="search"
              :items-per-page="states.length"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              hide-default-footer
              mobile-breakpoint="0"
              :fixed-header="true"
              class="data-table"
              :expanded.sync="expanded"
              show-expand
              :single-expand="true"
            >
              <template v-slot:item.state="{ item }">
                <td class="state-name">
                  {{ item.state }}
                </td>
              </template>
              <template v-slot:item.deltaconfirmed="{ item }">
                <span class="font-weight-bold deep-purple--text lighten-1">
                  {{ item.deltaconfirmed }}
                </span>
              </template>
              <template v-slot:item.deltadeaths="{ item }">
                <span class="font-weight-bold pink--text lighten-1">
                  {{ item.deltadeaths }}
                </span>
              </template>
              <template v-slot:item.recovered="{ item }">
                <span class="font-weight-bold green--text darken-4">
                  {{ item.recovered }}
                </span>
              </template>
              <template v-slot:expanded-item>
                <td colspan="10" class="district-data-table">
                  <v-data-table
                    :headers="distHeaders"
                    :items="checkExpanded"
                    item-key="distName"
                    fixed-header
                    hide-default-footer
                    mobile-breakpoint="0"
                    :items-per-page="checkExpanded.length"
                    class="grey lighten-4 district-data-table"
                  >
                  </v-data-table>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-row>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
import { sortBy } from "../utilities/lodashUtility";
export default {
  props: {
    states: Array,
    indianDistricts: Object
  },
  data() {
    return {
      expanded: [],
      sortBy: "confirmed",
      sortDesc: true,
      search: "",
      activeDistrict: [],
      headers: [
        { text: "states", value: "state" },
        { text: "newCases", value: "deltaconfirmed" },
        { text: "cases", value: "confirmed" },
        { text: "newDeaths", value: "deltadeaths" },
        { text: "deaths", value: "deaths" },
        { text: "recovered", value: "recovered" },
        { text: "activeCases", value: "active" }
      ],
      distHeaders: [
        { text: this.$t("distName"), value: "distName" },
        { text: this.$t("newCases"), value: "newCases" },
        { text: this.$t("cases"), value: "confirmed" }
      ]
    };
  },
  methods: {
    changeSort(column) {
      if (this.sortBy === column) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortBy = column;
        this.sortDesc = false;
      }
    }
  },
  computed: {
    computedHeaders() {
      return this.headers.map(h => ({ ...h, text: this.$t(h.text) }));
    },
    checkExpanded() {
      if (this.expanded.length > 0 && this.expanded[0].state) {
        const { state } = this.expanded[0];
        let districtData = this.indianDistricts[state].districtData;
        const stateDistricts = Object.keys(
          this.indianDistricts[state].districtData
        );
        let districts = stateDistricts.map(dist => {
          districtData[dist].distName = dist;
          districtData[dist].newCases = districtData[dist].delta.confirmed;
          return districtData[dist];
        });
        districts = sortBy(districts, "confirmed");
        return districts;
      } else return [];
    }
  }
};
</script>
<style lang="scss">
.district-data-table {
  .v-data-table__wrapper {
    .v-data-table-header {
      tr {
        th {
          z-index: 0;
        }
      }
    }
  }
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: #f5f5f5;
}
.data-table > .v-data-table__wrapper table tbody tr td {
  padding: 8px;
}
.table-container-india {
  max-width: calc(94vw - 4px);
  width: calc(94vw - 4px);
  tr:first-child .text-start button:first-child {
    display: none;
  }
  > .v-data-table {
    > .v-data-table__wrapper table tbody tr .state-name {
      border-width: 0;
      padding: 0;
      color: #337ab7;
    }
  }
}
.district-data-table {
  display: table-cell;
  width: 500px;
}
@media screen and (max-width: 768px) {
  .table-container-india {
    max-width: calc(94vw - 4px);
    overflow-x: auto;

    > .v-data-table {
      width: 768px;
      max-width: 768px;
      > .v-data-table__wrapper table tbody tr .state-name {
        width: 150px;
      }
    }
  }
  .district-data-table {
    width: 300px;
  }
}
</style>
