import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { BASE_URL } from "utils/requests";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";

type SeriesData = {
  name: string;
  data: number[];
};

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
};

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: [],
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const getSalesSuccessBySeller = () => {
      axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
        const data = response.data as SaleSuccess[];
        const myLabels = data.map((i) => i.sellerName);
        const mySeries = data.map((i) => round((100 * i.deals) / i.visited, 1));

        // console.log(myLabels, mySeries);
        setChartData({
          labels: {
            categories: myLabels,
          },
          series: [
            {
              name: "% Success",
              data: mySeries,
            },
          ],
        });
      });
    };
    getSalesSuccessBySeller();
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    <Chart
      type="bar"
      width="500"
      series={chartData.series}
      options={{ ...options, xaxis: chartData.labels }}
    />
  );
};

export default BarChart;
