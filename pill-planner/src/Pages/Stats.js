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
import { Pie, Line } from "react-chartjs-2";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  BeakerIcon,
  ChartBarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function App() {
  // Mock data
  const medicineData = {
    purchases: {
      labels: ["Aspirin", "Ibuprofen", "Paracetamol", "Vitamins"],
      data: [30, 25, 20, 25],
    },
    dosageStreak: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [4, 3, 4, 4, 3, 2, 4],
    },
    heatMapData: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(2024, 0, i + 1),
      count: Math.floor(Math.random() * 5),
    })),
    stats: {
      totalMedicines: 12,
      currentStreak: 7,
      compliance: "92%",
      monthlySpend: "$124.50",
    },
  };

  const pieChartData = {
    labels: medicineData.purchases.labels,
    datasets: [
      {
        data: medicineData.purchases.data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const lineChartData = {
    labels: medicineData.dosageStreak.labels,
    datasets: [
      {
        label: "Doses Taken",
        data: medicineData.dosageStreak.data,
        borderColor: "#36A2EB",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Medicine Statistics Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Medicines"
            value={medicineData.stats.totalMedicines}
            icon={<BeakerIcon className="h-6 w-6" />}
          />
          <StatsCard
            title="Current Streak"
            value={medicineData.stats.currentStreak + " days"}
            icon={<ChartBarIcon className="h-6 w-6" />}
          />
          <StatsCard
            title="Compliance Rate"
            value={medicineData.stats.compliance}
            icon={<CalendarIcon className="h-6 w-6" />}
          />
          <StatsCard
            title="Monthly Spend"
            value={medicineData.stats.monthlySpend}
            icon={<CurrencyDollarIcon className="h-6 w-6" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medicine Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Medicine Distribution
            </h2>
            <div className="h-[300px] flex items-center justify-center">
              <Pie
                data={pieChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Weekly Dosage Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Weekly Dosage Trend</h2>
            <div className="h-[300px]">
              <Line
                data={lineChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 5,
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Dosage Heat Map */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Yearly Dosage Heat Map
            </h2>
            <div className="overflow-x-auto">
              <CalendarHeatmap
                startDate={new Date("2024-01-01")}
                endDate={new Date("2024-12-31")}
                values={medicineData.heatMapData}
                classForValue={(value) => {
                  if (!value) return "color-empty";
                  return `color-scale-${value.count}`;
                }}
                tooltipDataAttrs={(value) => ({
                  "data-tooltip-id": "heatmap-tooltip",
                  "data-tooltip-content":
                    value && value.date
                      ? `${value.count} doses on ${value.date.toDateString()}`
                      : "No data",
                })}
              />
            </div>
            <ReactTooltip id="heatmap-tooltip" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
