import React from 'react';
import { Card } from 'antd';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const PlacementChart = ({ data = [] }) => {
  const defaultData = [
    { department: 'CSE', placed: 142, eligible: 160, avgPackage: 9.2 },
    { department: 'IT', placed: 110, eligible: 125, avgPackage: 8.5 },
    { department: 'ECE', placed: 88, eligible: 115, avgPackage: 7.1 },
    { department: 'AIDS', placed: 65, eligible: 70, avgPackage: 10.4 },
    { department: 'MECH', placed: 52, eligible: 85, avgPackage: 5.8 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <Card title="Department-wise Placement & Readiness Overview" bordered={false} style={{ borderRadius: 12 }}>
      <div style={{ height: 320, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="department" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} 
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="placed" name="Placed Students" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="eligible" name="Eligible Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PlacementChart;
