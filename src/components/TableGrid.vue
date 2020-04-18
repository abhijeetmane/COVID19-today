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
            <v-list-item-title>
              {{ item.text }}
              <v-icon v-if="sortBy === item.value">
                {{ sortDesc ? "mdi-arrow-down" : "mdi-arrow-up" }}
              </v-icon>
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
      <v-icon
        size="28"
        :color="'white lighten-1'"
        class="show-full-screen"
        v-on:click="!isFullScreen ? rotateScreen() : stopRotation()"
        >{{ isFullScreen ? "mdi-fullscreen-exit" : "mdi-fullscreen" }}</v-icon
      >
    </v-toolbar>
    <v-card color="#f7f7f7">
      <v-card-title>
        <v-row v-resize="onResize">
          <div class="table-container">
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
                  <td class="font-weight-bold deep-purple--text lighten-1">
                    {{ props.item.todayCases }}
                  </td>
                  <td>{{ props.item.cases }}</td>
                  <td class="font-weight-bold pink--text lighten-1">
                    {{ props.item.todayDeaths }}
                  </td>
                  <td>{{ props.item.deaths }}</td>
                  <td class="font-weight-bold green--text darken-4">
                    {{ props.item.recovered }}
                  </td>
                  <td>{{ props.item.active }}</td>
                  <td>{{ props.item.critical }}</td>
                  <td>
                    {{ props.item.casesPerOneMillion }}
                  </td>
                  <td>
                    {{ props.item.deathsPerOneMillion }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
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
        { text: "newCases", value: "todayCases" },
        { text: "cases", value: "cases" },
        { text: "newDeaths", value: "todayDeaths" },
        { text: "deaths", value: "deaths" },
        { text: "recovered", value: "recovered" },
        { text: "activeCases", value: "active" },
        { text: "criticalCases", value: "critical" },
        {
          text: "casesPerOneMillion",
          value: "casesPerOneMillion"
        },
        {
          text: "deathsPerOneMillion",
          value: "deathsPerOneMillion"
        }
      ],
      isFullScreen: false
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
    },
    rotateScreen: function() {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      if (screen.orientation.lock) {
        screen.orientation
          .lock("landscape-primary")
          .then(() => {
            this.isFullScreen = true;
          })
          .catch(error => {
            alert(error);
          });
      }
    },
    stopRotation: function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      screen.orientation.unlock("natural");
      this.isFullScreen = false;
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
.show-full-screen {
  display: none !important;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0;
}
.v-card.v-sheet {
  .v-card__title {
    padding-top: 0;
  }
}
.data-table {
  &.v-data-table--fixed-header {
    flex: 1;
  }
  > .v-data-table__wrapper {
    height: calc(100vh - 160px);
    overflow-y: scroll;
    .v-data-table-header {
      tr {
        th {
          padding: 0 8px;
          font-size: 0.9rem;
          word-break: break-word;
          line-height: 1rem;
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
  .data-table {
    > .v-data-table__wrapper {
      table {
        tbody {
          tr {
            cursor: pointer;
            td {
              &.country-name {
                width: 100px;
              }
            }
          }
        }
      }
    }
  }
}
.table-container {
  max-width: calc(94vw - 4px);
  width: calc(94vw - 4px);
}
@media screen and (max-width: 992px) {
  .table-container {
    max-width: calc(94vw - 4px);
    overflow-x: auto;

    .v-data-table {
      width: 992px;
      max-width: 992px;
    }
  }
  .show-full-screen {
    display: block !important;
    padding-left: 16px;
  }
}
</style>
