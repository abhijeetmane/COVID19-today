import { sortBy } from "./lodashUtility";
const colors = {
  cases: "#1565C0",
  active: "#42A5F5",
  deaths: "#DD2C00",
  recovered: "#26a69a",
  critical: "#D81B60",
  todayDeaths: "#DD2C00",
  todayCases: "#1565C0"
};
export const createSeries = (
  collections,
  limit,
  increment,
  seriesName,
  order = "desc"
) => {
  const series = [
    {
      name: seriesName,
      data: sortBy(collections, increment, order)
        .map(item => item[increment])
        .slice(0, limit)
    }
  ];
  return series;
};

export const createCategories = (
  collections,
  limit,
  increment,
  titleText,
  order = "desc"
) => {
  const options = {
    chart: {
      type: "bar",
      redrawOnParentResize: true,
      toolbar: {
        show: false
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
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: "flat",
        endingShape: "flat",
        columnWidth: "70%",
        barHeight: "70%",
        distributed: false,
        dataLabels: {
          position: "top",
          hideOverflowingLabels: true
          // orientation: "horizontal"
        }
      }
    },
    dataLabels: {
      enabled: false,
      offsetX: 40,
      offsetY: 0,
      style: {
        colors: ["#333"]
      }
    },
    xaxis: {
      style: {
        colors: ["#fff"],
        fontSize: "14px"
      },
      categories: sortBy(collections, increment, order)
        .map(item => item.country)
        .slice(0, limit)
    },
    axisBorder: {
      show: true,
      color: "#78909C",
      offsetX: 0,
      offsetY: 0
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "#78909C",
      width: 6,
      offsetX: 0,
      offsetY: 0
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#fff"],
          fontSize: "14px"
        }
      }
    },
    title: {
      text: titleText,
      align: "center",
      floating: false,
      offsetY: 5
    },
    tooltip: {
      enabled: true,
      fixed: {
        enabled: true,
        position: "right",
        offsetX: 0,
        offsetY: 100
      },
      onDatasetHover: {
        highlightDataSeries: false
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          }
        }
      }
    ],
    colors: [colors[increment]]
  };
  return options;
};

export const generateDayWiseTimeSeries = (baseval, count, yrange) => {
  var i = 0;
  var series = [];
  while (i < count) {
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([baseval, y]);
    baseval += 86400000;
    i++;
  }
  return series;
};
