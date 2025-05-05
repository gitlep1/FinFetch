import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { fetchStockData } from "./fetchStockData";
import Fuse from "fuse.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

import { themeContext } from "../../CustomContexts/Contexts";

const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "META", "NFLX"];

const mockStockData = [
  { name: "AAPL", fullName: "Apple Inc.", price: 172.3, changePercent: 1.12 },
  {
    name: "MSFT",
    fullName: "Microsoft Corporation",
    price: 324.1,
    changePercent: -0.45,
  },
  {
    name: "GOOGL",
    fullName: "Alphabet Inc.",
    price: 138.7,
    changePercent: 0.98,
  },
  { name: "TSLA", fullName: "Tesla, Inc.", price: 237.6, changePercent: -1.53 },
  {
    name: "AMZN",
    fullName: "Amazon.com, Inc.",
    price: 123.9,
    changePercent: 0.75,
  },
  {
    name: "META",
    fullName: "Meta Platforms, Inc.",
    price: 298.2,
    changePercent: 1.42,
  },
  {
    name: "NFLX",
    fullName: "Netflix, Inc.",
    price: 405.6,
    changePercent: -0.67,
  },
];

export const Dashboard = () => {
  const { themeState } = useContext(themeContext);

  const [stockData, setStockData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const results = await Promise.all(
          STOCK_SYMBOLS.map((symbol) => fetchStockData(symbol))
        );

        const checkAV = results.some(
          (result) => result.source === "AlphaVantage"
        );

        const checkFH = results.some((result) => result.source === "Finnhub");

        if (!checkAV) {
          toast.error(
            "API rate limit reached for AlphaVantage. Fetching from Finnhub.",
            {
              containerId: "general-toast",
            }
          );
        }

        if (!checkFH) {
          toast.error(
            "API rate limit reached for Finnhub. Showing mock data.",
            {
              containerId: "general-toast",
            }
          );
        }

        if (!checkAV && !checkFH) {
          return setStockData(mockStockData);
        }

        const hasValidData = results.every(
          (item) => item && item.price !== undefined
        );
        setStockData(hasValidData ? results : mockStockData);
      } catch (err) {
        setStockData(mockStockData);
        setError("Failed to load live stock data. Showing mock data.", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const sortedData = [
    ...(stockData.length > 0 ? stockData : mockStockData),
  ].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const fuse = new Fuse(sortedData, {
    keys: ["name", "fullName"],
    threshold: 0.4,
  });

  const displayData = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : sortedData;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const chartData = {
    labels: displayData.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Price ($)",
        data: displayData.map((stock) => stock.price),
        borderColor: "rgb(59 130 246)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3,

        pointBackgroundColor: themeState === "dark" ? "black" : "whitesmoke",
        pointBorderColor: "rgb(59 130 246)",
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 1)",
          lineWidth: 1,
        },
        ticks: {
          color: themeState === "dark" ? "black" : "whitesmoke",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 1)",
          lineWidth: 1,
        },
        ticks: {
          color: themeState === "dark" ? "black" : "whitesmoke",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: themeState === "dark" ? "black" : "white",
        },
      },
      tooltip: {
        backgroundColor: "#769",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
  };

  const renderStockTable = () => {
    if (loading) {
      return (
        <p className="text-blue-500 animate-pulse">Loading stock data...</p>
      );
    } else if (error) {
      return <p className="text-red-500">{error}</p>;
    } else {
      return (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-left border rounded-lg">
              <thead className={`${themeState === "dark" && "bg-gray-100"}`}>
                <tr>
                  <th
                    className="py-2 px-4 border-b cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Stock
                    <span className="inline-block transition-transform duration-200">
                      {sortField === "name"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↑"}
                    </span>
                  </th>
                  <th
                    className="py-2 px-4 border-b cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Price ($){" "}
                    <span className="inline-block transition-transform duration-200">
                      {sortField === "price"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↑"}
                    </span>
                  </th>
                  <th
                    className="py-2 px-4 border-b cursor-pointer"
                    onClick={() => handleSort("changePercent")}
                  >
                    Change (%){" "}
                    <span className="inline-block transition-transform duration-200">
                      {sortField === "changePercent"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↑"}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((stock, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      themeState === "dark"
                        ? "hover:bg-gray-300"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <td className="py-2 px-4 border-b">{stock.name}</td>
                    <td className="py-2 px-4 border-b">
                      {stock.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${
                        stock.changePercent >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stock.changePercent.toFixed(2)}%{" "}
                      {stock.changePercent >= 0 ? "↑" : "↓"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Stock Price Chart</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      );
    }
  };

  return (
    <div
      className={`p-6 min-h-screen min-w-screen ${
        themeState === "dark" ? "bg-white" : "bg-gray-900 text-white"
      } `}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {stockData.length > 1 ? "Stock Dashboard" : "Mock Dashboard"}
        </h1>
        <input
          type="text"
          placeholder="Search stock..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-50 py-1 rounded-md border border-gray-300 ${
            themeState === "dark" ? "text-black" : "text-white"
          }`}
        />
      </div>

      {renderStockTable()}
    </div>
  );
};
