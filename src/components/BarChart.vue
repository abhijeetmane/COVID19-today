<template>
  <div class="bar-chart">
    <apexchart
      type="bar"
      :width="barWidth"
      :height="barHeight"
      :options="categories"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  props: {
    categories: Object,
    series: Array,
    barWidth: Number,
    barHeight: Number
  }
};
</script>
<style lang="scss">
.apexcharts-title-text {
  text-transform: capitalize;
  font-size: 20px;
}

.bar-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
