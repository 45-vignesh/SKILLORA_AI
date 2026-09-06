import React from 'react';
import { Card } from 'antd';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

const SkillDemandChart = ({ data = [] }) => {
  const defaultData = [
    { skill: 'Cloud & DevOps', industryDemand: 95, studentProficiency: 58 },
    { skill: 'Generative AI', industryDemand: 92, studentProficiency: 52 },
    { skill: 'Full Stack Web', industryDemand: 88, studentProficiency: 82 },
    { skill: 'Data Engineering', industryDemand: 85, studentProficiency: 60 },
    { skill: 'Cybersecurity', industryDemand: 80, studentProficiency: 45 },
    { skill: 'System Design', industryDemand: 78, studentProficiency: 50 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <Card title="Industry Demand vs. Student Proficiency Radar" bordered={false} style={{ borderRadius: 12 }}>
      <div style={{ height: 320, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="skill" stroke="#475569" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
            <Radar name="Industry Demand (%)" dataKey="industryDemand" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
            <Radar name="Student Proficiency (%)" dataKey="studentProficiency" stroke="#2563eb" fill="#2563eb" fillOpacity={0.35} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SkillDemandChart;
