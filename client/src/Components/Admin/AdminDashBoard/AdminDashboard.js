import React, { useEffect, useState } from 'react';
import '../../../Styles/AdminDashboard.css';
import { toast } from "react-toastify";
import { viewCount } from '../../Services/AdminService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,  // For Pie chart (Arc)

  Tooltip,
  Legend,
} from 'chart.js';
import RevenuePieChart from './RevenuePieChart';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,  // For Pie chart (Arc)

  Legend
);

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewCount('viewAllOrders');
        if (result.success) {
          setOrders(result.user || []);
        } else {
          console.error('Data error:', result);
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred during Data View');
      }
    };

    fetchData();
  }, []);

  // Sample data processing (adjust according to your API response)
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.serviceStatus === 'Pending').length;
  const completedOrders = orders.filter(order => order.serviceStatus === 'Process Completed').length;
  const canceledOrders = orders.filter(order => order.serviceStatus === 'Canceled').length;
  const otherOrders = orders.filter(order => !['Requested Pickup', 'Requested Drop', 'Drop Completed','Pickup Completed'].includes(order.status)).length;

  // Data for the Bar Chart
  const data = {
    labels: ['Total Orders Processed', 'Pending', 'Completed', 'Canceled', 'Others'],
    datasets: [
      {
        label: 'Order Analysis',
        data: [totalOrders, pendingOrders, completedOrders, canceledOrders, otherOrders],
        backgroundColor: [
          '#3070F5'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
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
        text: 'Order Analysis Chart',
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0, // Keep labels horizontal
          minRotation: 0,
        },
        grid: {
          drawOnChartArea: false, // Removes horizontal grid lines
        },
      },
      y: {
        beginAtZero: true, // Start the Y-axis at 0
      },
    },
    // Adjust bar width
    barPercentage: 0.3, // Controls the width of individual bars (0.0 to 1.0)
    categoryPercentage: 0.8, // Controls spacing between bars in the same category (0.0 to 1.0)
  };
  

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h2>Admin Dashboard</h2>
        <div className="chart-container" style={{ width: '80%', margin: '0 auto' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
<h4 className='mt-3'><center>Total Revenue Generated</center></h4>
      <div className="chart-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        
      <RevenuePieChart />
      </div>
    </div>
  );
}

export default AdminDashboard;
