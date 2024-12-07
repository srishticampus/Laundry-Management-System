import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchRevenueData } from '../../Services/AdminService';

function RevenueBarChart() {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchRevenueData();
      if (data) {
        setRevenueData(data);
      }
    };

    getData();
  }, []);

  if (!revenueData) {
    return <p>Loading revenue data...</p>;
  }

  // Prepare data for Bar Chart
  const labels = Object.keys(revenueData); // Service names
  const dataPoints = Object.values(revenueData); // Revenue amounts

  const barData = {
    labels,
    datasets: [
      {
        label: 'Revenue by Service',
        data: dataPoints,
        backgroundColor: ['#3070F5', '#FFC107', '#28A745', '#DC3545', '#6C757D'],
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue by Service',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Removes vertical grid lines
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis from 0
        grid: {
          drawBorder: false, // Removes grid border
        },
      },
    },
    barPercentage: 0.5, // Adjust bar width
    categoryPercentage: 0.6, // Adjust spacing between bars
  };

  return (
    <div className="bar-chart-container" style={{ width: '60%', margin: '0 auto', marginTop: '2rem' }}>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}

export default RevenueBarChart;
