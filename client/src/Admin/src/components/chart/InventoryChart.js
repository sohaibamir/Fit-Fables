import Chart from "react-apexcharts";

const InventoryChart = ({ title, data, categories, chartType }) => {
  const yAxisConfig = {
    labels: {
      formatter: function (value) {
        return Math.round(value);
      },
    },
  };

  if (chartType === "bar") {
    yAxisConfig.tickAmount = Math.max(...data) + 1;
  }

  const chartData = {
    series: [
      {
        name: title,
        data: data,
      },
    ],
    options: {
      chart: {
        type: chartType,
        height: 400,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: title,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
      },
      yaxis: yAxisConfig,
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type={chartType}
      height={400}
    />
  );
};

export default InventoryChart;
