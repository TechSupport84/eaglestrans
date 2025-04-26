import React, { useState } from 'react';
import { FaUsers, FaChartBar, FaCog, FaBell, FaHandshake } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Partners from './ConfirmedPartners';
import InvalidConfirmedPartner from './InvalidConfirmedPartner';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy data for chart
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'User Growth',
      data: [10, 25, 30, 50, 70, 85, 120],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

// Pages Content
const UsersPage = () => <div className="p-6">Users Page Content</div>;

const AnalyticsPage = () => (
  <div className="p-6 space-y-6">
    <h2 className="text-xl font-semibold text-gray-800">Analytics Overview</h2>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  </div>
);

const SettingsPage = () => <div className="p-6">Settings Page Content</div>;

const NotificationsPage = () => <div className="p-6">Notifications Page Content</div>;

// Partners Pages
const PartnersPage = () => <div className="p-6">Partners Page Content</div>;
const ValidatePartnerPage = () => (

    <Partners/>
);

const UnvalidatePartnerPage = () => (
<InvalidConfirmedPartner/>
)
const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home'); // Default page
  const [subPage, setSubPage] = useState<string>(''); // Default subPage

  // Function to change the active page based on the clicked link
  const handlePageChange = (page: string) => {
    setActivePage(page);
    setSubPage(''); // Reset subPage when navigating to a different page
  };

  // Function to handle subpage change within Partners
  const handleSubPageChange = (subPage: string) => {
    setSubPage(subPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-800 text-white flex flex-col p-6 md:h-full shadow-xl">
        <div className="text-2xl font-bold mb-6">My Dashboard</div>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => handlePageChange('users')}
            className="flex items-center space-x-3 text-lg hover:bg-blue-700 p-2 rounded-md transition duration-200"
          >
            <FaUsers />
            <span>Users</span>
          </button>
          <button
            onClick={() => handlePageChange('analytics')}
            className="flex items-center space-x-3 text-lg hover:bg-blue-700 p-2 rounded-md transition duration-200"
          >
            <FaChartBar />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => handlePageChange('settings')}
            className="flex items-center space-x-3 text-lg hover:bg-blue-700 p-2 rounded-md transition duration-200"
          >
            <FaCog />
            <span>Settings</span>
          </button>
          <button
            onClick={() => handlePageChange('notifications')}
            className="flex items-center space-x-3 text-lg hover:bg-blue-700 p-2 rounded-md transition duration-200"
          >
            <FaBell />
            <span>Notifications</span>
          </button>
          {/* New Partners Page */}
          <button
            onClick={() => handlePageChange('partners')}
            className="flex items-center space-x-3 text-lg hover:bg-blue-700 p-2 rounded-md transition duration-200"
          >
            <FaHandshake />
            <span>Partners</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Conditionally render content based on active page */}
        {activePage === 'users' && <UsersPage />}
        {activePage === 'analytics' && <AnalyticsPage />}
        {activePage === 'settings' && <SettingsPage />}
        {activePage === 'notifications' && <NotificationsPage />}
        {activePage === 'home' && <div className="p-6 text-gray-800 font-semibold text-lg">Welcome to your Dashboard!</div>}

        {activePage === 'partners' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Partners</h2>
            <div className="space-x-4 mt-4">
              <button
                onClick={() => handleSubPageChange('validate')}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Validate Partner
              </button>
              <button
                onClick={() => handleSubPageChange('unvalidate')}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-200"
              >
                Unvalidate Partner
              </button>
            </div>
            {/* Conditionally render the subpages */}
            {subPage === 'validate' && <ValidatePartnerPage />}
            {subPage === 'unvalidate' && <UnvalidatePartnerPage />}
            {subPage === '' && <PartnersPage />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
