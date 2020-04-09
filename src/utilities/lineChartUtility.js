const colors = {
  cases: "#1565C0",
  active: "#42A5F5",
  deaths: "#DD2C00",
  recovered: "#26a69a",
  critical: "#D81B60",
  todayDeaths: "#DD2C00",
  todayCases: "#1565C0"
};
export const createSeries = (name, data) => {
  const series = [
    {
      name,
      data
    }
  ];
  return series;
};

export const createCategories = (graphLabel, categories, category) => {
  const chartOptions = {
    chart: {
      type: "line",
      redrawOnParentResize: true,
      toolbar: {
        show: false,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
          autoScaleXaxis: true
        }
      },
      animations: {
        enabled: true,
        easing: "linear",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    title: {
      text: graphLabel,
      align: "center"
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 0
      }
    },
    xaxis: {
      categories: categories,
      tickPlacement: "on",
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        minHeight: 100,
        maxHeight: 180
      }
    },
    colors: [colors[category]]
  };
  return chartOptions;
};
