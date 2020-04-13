<template>
  <v-col>
    <v-sheet
      class="row ma-2 pa-1 justify-center align-center tile-shadow"
      :color="color"
    >
      <div class="d-flex justify-center align-center">
        <div class="tile-icon">
          <v-icon size="28" :color="iconColor">{{ icon }} </v-icon>
        </div>
        <div class="tiles-body">
          <div>
            <span class="black--text font-weight-bold v-rating subtitle-2">{{
              title
            }}</span>
          </div>
          <div>
            <span class="black--text font-weight-medium v-rating subtitle-2">{{
              value
            }}</span>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-col>
</template>
<script>
export default {
  name: "Tile",
  props: {
    title: String,
    value: Number,
    color: String,
    icon: String,
    iconColor: String
  }
};
</script>

<style lang="scss" scoped>
.tile-shadow {
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.5);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.tiles-body {
  padding-left: 20px;
}
@media screen and (max-width: 600px) {
  .tile-icon {
    font-size: 0.6rem;
  }
}
</style>
