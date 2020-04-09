<template>
  <div class="bar-chart">
    <apexchart
      type="line"
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
.bar-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.apexcharts-text tspan {
  font-size: 10px;
}
</style>
