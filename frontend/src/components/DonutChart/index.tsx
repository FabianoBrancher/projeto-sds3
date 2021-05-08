import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
  labels: string[];
  series: number[];
};

const DonutChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    const getAmountBySeller = () => {
      axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
        const data = response.data as SaleSum[];
        const myLabels = data.map((i) => i.sellerName);
        const mySeries = data.map((i) => i.sum);

        setChartData({ labels: myLabels, series: mySeries });
      });
    };
    getAmountBySeller();
  }, []);

  // const mockData = {
  //   series: [477138, 499928, 444867, 220426, 473088],
  //   labels: ["Anakin", "Barry Allen", "Kal-El", "Logan", "Padmé"],
  // };

  const options = {
    legend: {
      show: true,
    },
  };

  return (
    <Chart
      type="donut"
      width="500"
      series={chartData.series}
      options={{ ...options, labels: chartData.labels }}
    />
  );
};

export default DonutChart;
