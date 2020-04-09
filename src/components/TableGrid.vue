<template>
  <div>
    <v-toolbar dark class="">
      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-sort</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in headers"
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
        placeholder="Search Country"
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-card color="#f7f7f7">
      <v-card-title>
        <v-row v-resize="onResize">
          <v-data-table
            :headers="computedHeaders"
            :items="countries"
            :search="search"
            :items-per-page="countries.length"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hide-default-footer
            mobile-breakpoint="0"
            :fixed-header="true"
            class="data-table"
            :footer-props="{
              showFirstLastPage: false,
              disablePagination: isMobile,
              itemsPerPageOptions: [20, 40, countries.length]
            }"
          >
            <template v-slot:item="props">
              <tr @click="handleClick(props.item.country)">
                <td :class="'country-name'">{{ props.item.country }}</td>
                <td>{{ props.item.cases }}</td>
                <td
                  v-if="!$vuetify.breakpoint.smAndDown"
                  class="font-weight-bold deep-purple--text lighten-1"
                >
                  {{ props.item.todayCases }}
                </td>
                <td>{{ props.item.deaths }}</td>
                <td
                  v-if="!$vuetify.breakpoint.smAndDown"
                  class="font-weight-bold pink--text lighten-1"
                >
                  {{ props.item.todayDeaths }}
                </td>
                <td>{{ props.item.recovered }}</td>
                <td v-if="!$vuetify.breakpoint.smAndDown">
                  {{ props.item.active }}
                </td>
                <td v-if="!$vuetify.breakpoint.smAndDown">
                  {{ props.item.critical }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-row>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    countries: Array
  },
  data() {
    return {
      sortBy: "cases",
      sortDesc: true,
      isMobile: this.checkMobile,
      search: "",
      headers: [
        { text: "Country", value: "country" },
        { text: "Cases", value: "cases" },
        { text: "New Cases", value: "todayCases", hide: "smAndDown" },
        { text: "Deaths", value: "deaths" },
        { text: "New Deaths", value: "todayDeaths", hide: "smAndDown" },
        { text: "Recovered", value: "recovered" },
        { text: "Active Cases", value: "active", hide: "smAndDown" },
        { text: "Critical Cases", value: "critical", hide: "smAndDown" }
      ]
    };
  },
  methods: {
    handleClick: function(country) {
      this.$emit("navigateCountry", country);
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
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
    checkMobile: function() {
      return window.innerWidth < 769;
    },
    computedHeaders() {
      return this.headers.filter(
        h => !h.hide || !this.$vuetify.breakpoint[h.hide]
      );
    }
  }
};
</script>
<style lang="scss">
.table-search-bar {
  background: linear-gradient(to right, #0acffe 0%, #495aff 100%);
  // background: #000000;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0;
}
.v-card.v-sheet {
  .v-card__title {
    padding-top: 0;
  }
}
.v-data-table {
  &.v-data-table--fixed-header {
    flex: 1;
  }
  .v-data-table__wrapper {
    height: calc(100vh - 160px);
    overflow-y: scroll;
    .v-data-table-header {
      tr {
        th {
          padding: 0 8px;
          font-size: 0.9rem;
          .v-icon {
            opacity: 1;
          }
        }
      }
    }
    table {
      tbody {
        tr {
          cursor: pointer;
          td {
            padding: 0 8px;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .v-data-table {
    .v-data-table__wrapper {
      .v-data-table-header {
        tr {
          th {
            font-size: 0.7rem;
          }
        }
      }
      table {
        tbody {
          tr {
            cursor: pointer;
            td {
              font-size: 0.7rem;
              &.country-name {
                max-width: 100px;
                // white-space: pre;
                // overflow: auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>
