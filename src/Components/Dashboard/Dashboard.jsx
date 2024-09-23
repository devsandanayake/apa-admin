import React from 'react';
import StatsCard from './StatsCard';
import adsicon from '../../images/ads-icon-3.jpg';
import adsicon2 from '../../images/iconc.jpg';
import adsicon3 from '../../images/money.webp';
import { FcApproval } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../actions/postAction';
import { getUser } from '../../actions/userAction';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

export default function Dashboard() {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const userState = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchData());
    dispatch(getUser());
  }, [dispatch]);

  const pendingCount = dataState.data.filter((post) => post.status === 0).length;
  const approvedCount = dataState.data.filter((post) => post.status === 1).length;
  const rejectedCount = dataState.data.filter((post) => post.status === 2).length;
  const userCount = userState.data.filter((user) => user.role !== 'admin').length;

  const auctions = [
    { id: 'ALW-234-82', maxRate: 25000, currentRate: 24000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },  { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    { id: 'ALW-234-83', maxRate: 26000, currentRate: 26000 },
    // Add more auctions as needed
  ];

  const data = [
    { date: '2023-01-01', value: 100, category: 'Sales' },
    { date: '2023-01-02', value: 120, category: 'Sales' },
    { date: '2023-01-01', value: 80, category: 'Profit' },
    { date: '2023-01-02', value: 90, category: 'Profit' },
    { date: '2023-01-01', value: 50, category: 'Commission' },
    { date: '2023-01-02', value: 60, category: 'Commission' },
  ];

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Sales',
        data: data.filter((item) => item.category === 'Sales').map((item) => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Profit',
        data: data.filter((item) => item.category === 'Profit').map((item) => item.value),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Commission',
        data: data.filter((item) => item.category === 'Commission').map((item) => item.value),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales, Profit, and Commission Over Time',
      },
    },
  };

  // Data for Pie Chart
  const pieData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Ad Status',
        data: [pendingCount, approvedCount, rejectedCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Bar Chart
  const auctionBarData = {
    labels: auctions.map(auction => auction.id),
    datasets: [
      {
        label: 'Max Rate',
        data: auctions.map(auction => auction.maxRate),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Current Rate',
        data: auctions.map(auction => auction.currentRate),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rate',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Auction Current Status',
      },
    },
  };

  // Task data
  const tasks = [
    { title: 'Design New UI', progress: 70 },
    { title: 'Complete Documentation', progress: 50 },
    { title: 'Deploy to Production', progress: 90 },
    { title: 'Fix Bugs', progress: 40 },
    { title: 'Fix Bugs', progress: 40 },
    { title: 'Fix Bugs', progress: 40 },
    { title: 'Fix Bugs', progress: 40 },
    { title: 'Fix Bugs', progress: 40 },
    { title: 'Fix Bugs', progress: 40 },
  ];

  return (
    <>
      <h5 className="text-2xl font-semibold breadcrumb-title">Dashboard</h5>
      <p className="text-gray-600 cursor-pointer">
        Home / <span className="cursor-pointer">Dashboard</span>
      </p>
      <main className="flex-1 pt-3 pb-4"> 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <button onClick={() => { window.location.href = '/home'; }}>
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-700">Advertisement</h3>
        <p className="text-2xl font-bold text-gray-900">{dataState.data.length}</p>
      </div>
      <img src={adsicon} alt="Ads Icon" className="h-12 w-12 object-cover" />
    </div>
    <div className="mt-4 flex gap-4">
      <p className="text-sm font-medium text-yellow-500">
        Pending: {pendingCount}
      </p>
      <p className="text-sm font-medium text-green-500">
        Approved: {approvedCount}
      </p>
      <p className="text-sm font-medium text-red-500">
        Rejected: {rejectedCount}
      </p>
    </div>
  </div>
</button>


    <button onClick={() => { window.location.href = '/auction'; }}>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Auction</h3>
            <p className="text-2xl font-bold text-gray-900">$3,264</p>
          </div>
          <img src={adsicon3} alt="Auction Icon" className="h-12 w-12 object-cover" />
        </div>
        <p className="text-sm font-medium text-green-500 mt-4">8% Increase</p>
      </div>
    </button>

    <button onClick={() => { window.location.href = '/userProfiles'; }}>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Users</h3>
            <p className="text-2xl font-bold text-gray-900">{userCount}</p>
          </div>
          <img src={adsicon2} alt="Users Icon" className="h-12 w-12 object-cover" />
        </div>
        <p className="text-sm font-medium text-red-500 mt-4">1 Decrease</p>
      </div>
    </button>
  </div>
</main>

      <div className='flex gap-3'>
        <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
          <h1 className="text-xl font-semibold mb-4">Tasks Overview</h1>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index}>
                <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Line data={chartData} options={options} />
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h1 className="text-xl font-semibold mb-4">Ad Status Distribution</h1>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="flex justify-center p-2 bg-gray-100 border-2 border-solid border-indigo-500 rounded-md w-full m-3">
      <div className="w-full max-w-4xl">
        <h1 className='flex justify-center'><FcApproval style={{ height: '2rem', width: '2rem' }} /></h1>
        <h1 className="text-sm text-gray-800 font-semibold flex justify-center">
          Auction Current Status
        </h1>
        <div className="container mx-auto py-8">
          <Bar data={auctionBarData} options={barOptions} />
        </div>
      </div>
    </div>
    </>
  );
}
