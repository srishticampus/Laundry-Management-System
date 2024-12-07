import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { viewCount } from '../../Services/AdminService';

function RevenuePieChart() {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewCount('viewAllServiceOrderss');
        if (result.success) {
            setRevenueData(result.user || []); // Assuming the data returned is an object with service names as keys and revenue values as numbers
        } else {
          console.error('Data error:', result);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchData();
  }, []);

  if (!revenueData) {
    return <p>Loading revenue data...</p>;
  }

  // Prepare data for Pie Chart
  const labels = Object.keys(revenueData); // Service names
  const dataPoints = Object.values(revenueData); // Revenue amounts

  // Calculate total revenue
  const totalRevenue = dataPoints.reduce((total, value) => total + value, 0);

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Revenue by Service',
        data: dataPoints,
        backgroundColor: ['#3070F5', '#FFC107', '#28A745', '#DC3545', '#6C757D'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
      title: {
        display: true,
        text: 'Revenue by Service',
      },
    },
  };

  return (
    <div className="pie-chart-container" style={{ width: '40%', margin: '0 auto' }}>
      <Pie data={pieData} options={pieOptions} />
      
      {/* Display Total Revenue */}
      <div className="revenue-summary" style={{ marginTop: '20px', textAlign: 'center' }}>
        <h4>Total Revenue: ₹{totalRevenue.toFixed(2)}</h4> {/* Displaying total revenue */}
        
        {/* Optionally, display individual revenues */}
        <div className="revenue-details">
          {labels.map((label, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <strong>{label}:</strong> ₹{dataPoints[index].toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RevenuePieChart;
