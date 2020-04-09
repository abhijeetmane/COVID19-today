<template>
  <v-sheet color="grey lighten-5">
    <v-skeleton-loader
      class="mx-auto"
      :type="type"
      :height="height"
      :width="width"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  props: {
    type: String,
    height: String,
    width: String
  }
};
</script>

<style></style>
