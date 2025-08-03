import React, { useState } from "react";
import {
  FaUsers,
  FaChartBar,
  FaCog,
  FaBell,
  FaHandshake,
  FaArrowLeft,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Partners from "./ConfirmedPartners";
import InvalidConfirmedPartner from "./InvalidConfirmedPartner";
import { useNavigate } from "react-router-dom";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for chart
const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "User Growth",
      data: [10, 25, 30, 50, 70, 85, 120],
      borderColor: "#2563EB", // Blue-600
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

// Pages Content
const UsersPage = () => (
  <div className="p-6 text-gray-700">Users Page Content (to be implemented)</div>
);

const AnalyticsPage = () => (
  <div className="p-6 space-y-6 text-gray-700">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics Overview</h2>
    <div className="bg-white shadow-md rounded-lg p-6">
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="p-6 text-gray-700">Settings Page Content (to be implemented)</div>
);

const NotificationsPage = () => (
  <div className="p-6 text-gray-700">Notifications Page Content (to be implemented)</div>
);

const PartnersPage = () => (
  <div className="p-6 text-gray-700">Partners Page Content (to be implemented)</div>
);
const ValidatePartnerPage = () => <Partners />;
const UnvalidatePartnerPage = () => <InvalidConfirmedPartner />;

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("home"); // Default page
  const [subPage, setSubPage] = useState<string>(""); // Default subPage
const navigate = useNavigate()
  // Change active page and reset subPage
  const handlePageChange = (page: string) => {
    setActivePage(page);
    setSubPage("");
  };

  // Change subPage within partners
  const handleSubPageChange = (sub: string) => {
    setSubPage(sub);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-900 text-white flex flex-col p-6 md:h-screen shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8 tracking-wide">My Dashboard</h1>
        <nav className="flex flex-col space-y-3">
          {[
            { icon: FaUsers, label: "Users", page: "users" },
            { icon: FaChartBar, label: "Analytics", page: "analytics" },
            { icon: FaCog, label: "Settings", page: "settings" },
            { icon: FaBell, label: "Notifications", page: "notifications" },
            { icon: FaHandshake, label: "Partners", page: "partners" },
          ].map(({ icon: Icon, label, page }) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex items-center space-x-3 text-lg font-medium rounded-md p-3 transition-colors duration-200
                ${
                  activePage === page
                    ? "bg-blue-700 shadow-inner"
                    : "hover:bg-blue-700"
                }`}
              aria-current={activePage === page ? "page" : undefined}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Back button */}
        {activePage !== "home" && (
          <button
            onClick={()=>navigate("/")}
            className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-semibold transition"
            aria-label="Go back to main page"
          >
            <FaArrowLeft />
            <span>Back to Main Page</span>
          </button>
        )}

        {/* Page content */}
        {activePage === "home" && (
          <div className="text-gray-900 font-semibold text-2xl">
                      <button
            onClick={()=>navigate("/")}
            className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-semibold transition"
            aria-label="Go back to main page"
          >
            <FaArrowLeft />
            <span>Back to Main Page</span>
          </button>
            Welcome to your Dashboard!
          </div>
        )}

        {activePage === "users" && <UsersPage />}
        {activePage === "analytics" && <AnalyticsPage />}
        {activePage === "settings" && <SettingsPage />}
        {activePage === "notifications" && <NotificationsPage />}

        {activePage === "partners" && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Partners</h2>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => handleSubPageChange("validate")}
                className={`px-4 py-2 rounded-md font-semibold transition
                  ${
                    subPage === "validate"
                      ? "bg-blue-600 text-white shadow"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
              >
                Validate Partner
              </button>
              <button
                onClick={() => handleSubPageChange("unvalidate")}
                className={`px-4 py-2 rounded-md font-semibold transition
                  ${
                    subPage === "unvalidate"
                      ? "bg-red-600 text-white shadow"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
              >
                Unvalidate Partner
              </button>
              <button
                onClick={() => handleSubPageChange("")}
                className={`px-4 py-2 rounded-md font-semibold transition
                  ${
                    subPage === ""
                      ? "bg-gray-600 text-white shadow"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                All Partners
              </button>
            </div>

            {/* Subpage rendering */}
            {subPage === "validate" && <ValidatePartnerPage />}
            {subPage === "unvalidate" && <UnvalidatePartnerPage />}
            {subPage === "" && <PartnersPage />}
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
