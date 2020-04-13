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
        :placeholder="$t('searchState')"
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-card color="#f7f7f7">
      <v-card-title>
        <v-row>
          <v-data-table
            :headers="computedHeaders"
            :items="states"
            :search="search"
            :items-per-page="states.length"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hide-default-footer
            mobile-breakpoint="0"
            :fixed-header="true"
            class="data-table"
          >
            <template v-slot:item="props">
              <tr>
                <td :class="'country-name'">{{ $t(props.item.state) }}</td>
                <td>{{ props.item.confirmed }}</td>
                <td v-if="!$vuetify.breakpoint.smAndDown">
                  {{ props.item.active }}
                </td>
                <td
                  v-if="!$vuetify.breakpoint.smAndDown"
                  class="font-weight-bold deep-purple--text lighten-1"
                >
                  {{ props.item.deltaconfirmed }}
                </td>
                <td>{{ props.item.deaths }}</td>
                <td
                  v-if="!$vuetify.breakpoint.smAndDown"
                  class="font-weight-bold pink--text lighten-1"
                >
                  {{ props.item.deltadeaths }}
                </td>
                <td>{{ props.item.recovered }}</td>
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
    states: Array
  },
  data() {
    return {
      sortBy: "confirmed",
      sortDesc: true,
      search: "",
      headers: [
        { text: "states", value: "state" },
        { text: "cases", value: "confirmed" },
        { text: "activeCases", value: "active", hide: "smAndDown" },
        { text: "newCases", value: "deltaconfirmed", hide: "smAndDown" },
        { text: "deaths", value: "deaths" },
        { text: "newDeaths", value: "deltadeaths", hide: "smAndDown" },
        { text: "recovered", value: "recovered" }
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
      return this.headers
        .filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])
        .map(h => ({ ...h, text: this.$t(h.text) }));
    }
  }
};
</script>
