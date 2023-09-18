import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

import { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);
const Card = ({ data }: any) => {
  return (
    <div className="flex h-40 flex-col items-center bg-gray-800 p-4 text-gray-200 shadow-md shadow-gray-500">
      <h1 className="text-center text-xl font-bold">{data.name}</h1>
      <h1 className="mt-5 text-4xl">{data.number}</h1>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (products === null) {
      axios
        .get("http://localhost:3000/api/getProducts", { withCredentials: true })
        .then(async (res) => {
          const data = res.data;
          setProducts(data);
        });
    }
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (products) {
      const tshirts = products.filter(
        (prod: any) => prod.category == "tshirts"
      ).length;
      const shirts = products.filter(
        (prod: any) => prod.category === "shirts"
      ).length;
      const sweaters = products.filter(
        (prod: any) => prod.category === "sweaters"
      ).length;
      const jackets = products.filter(
        (prod: any) => prod.category === "jackets"
      ).length;
      const dress = products.filter(
        (prod: any) => prod.category === "dress"
      ).length;

      setData({
        labels: ["Tshirts", "Shirts", "Sweaters", "Jackets", "Dress"],
        datasets: [
          {
            label: "# of Products",
            data: [tshirts, shirts, sweaters, jackets, dress],
            backgroundColor: [
              "#6A5ACD",
              "  #008080",
              "#8B0000",
              "#FF8C00",
              "darkslateblue",
            ],
            borderColor: [
              "#1f2937",
              "#1f2937",
              "#1f2937",
              "#1f2937",
              "#1f2937",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [products]);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };
  const lineData = {
    labels,
    datasets: [
      {
        label: "TotalSales",
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "OverallRevenue",
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold tracking-wider">Dashboard</h1>
      <div className="mt-4 flex h-full w-full flex-col gap-y-20 p-4">
        <div className="flex w-full justify-between">
          <div className="w-[44rem]">
            <h1 className="font-sans text-xl font-bold">Sales Revenue</h1>
            <Line options={options} data={lineData} />
          </div>
          <div className="flex w-[20rem] flex-col ">
            <h1 className="font-sans text-xl font-bold">Products Category</h1>
            {data && <Pie data={data} />}
          </div>
        </div>
        <div className="grid h-full grid-cols-4 gap-4">
          <Card
            data={{
              name: "Delivered",
              number: Math.floor(Math.random() * (99 + 1 + 1) + 1),
            }}
          />
          <Card
            data={{
              name: "Shipped",
              number: Math.floor(Math.random() * (99 + 1 + 1) + 1),
            }}
          />
          <Card
            data={{
              name: "Pending",
              number: Math.floor(Math.random() * (99 + 1 + 1) + 1),
            }}
          />
          <Card
            data={{
              name: "Cancelled",
              number: Math.floor(Math.random() * (99 + 1 + 1) + 1),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
