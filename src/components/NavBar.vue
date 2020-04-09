<template>
  <v-container class="nav-bar">
    <v-app-bar color="transparent" elevation="0">
      <v-tabs right slider-color="white">
        <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.path">
          <span class="white--text">{{ tab.name }}</span>
        </v-tab>
      </v-tabs>
    </v-app-bar>
  </v-container>
</template>
<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      tabs: [
        {
          name: "Home",
          path: "/"
        },
        {
          name: "Graphs",
          path: "/graphs"
        },
        {
          name: "News",
          path: "/news"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.nav-bar.container {
  padding-top: 0;
}
.header {
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
}
</style>
