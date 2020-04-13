<template>
  <div>
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
        :placeholder="$t('searchCountry')"
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
              <tr @click="handleClick(props.item)">
                <td :class="'country-name'">{{ $t(props.item.country) }}</td>
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
                <td
                  v-if="!$vuetify.breakpoint.smAndDown"
                  class="font-weight-bold deep-purple--text"
                >
                  {{ props.item.casesPerOneMillion }}
                </td>
                <td
                  v-if="!$vuetify.breakpoint.smAndDown"
                  class="font-weight-bold pink--text"
                >
                  {{ props.item.deathsPerOneMillion }}
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
        { text: "country", value: "country" },
        { text: "cases", value: "cases" },
        { text: "newCases", value: "todayCases", hide: "smAndDown" },
        { text: "deaths", value: "deaths" },
        { text: "newDeaths", value: "todayDeaths", hide: "smAndDown" },
        { text: "recovered", value: "recovered" },
        { text: "activeCases", value: "active", hide: "smAndDown" },
        { text: "criticalCases", value: "critical", hide: "smAndDown" },
        {
          text: "casesPerOneMillion",
          value: "casesPerOneMillion",
          hide: "smAndDown"
        },
        {
          text: "deathsPerOneMillion",
          value: "deathsPerOneMillion",
          hide: "smAndDown"
        }
      ]
    };
  },
  methods: {
    handleClick: function(item) {
      this.$emit("navigateCountry", item);
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
      return this.headers
        .filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])
        .map(h => ({ ...h, text: this.$t(h.text) }));
    }
  }
};
</script>
<style lang="scss">
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
            &.country-name {
              text-decoration: underline;
              color: #337ab7;
            }
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
                min-width: 100px;
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
