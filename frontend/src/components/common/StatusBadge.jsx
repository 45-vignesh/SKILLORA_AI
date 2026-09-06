import React from 'react';
import { Tag } from 'antd';

const statusConfig = {
  'Applied': { color: 'blue' },
  'Under Review': { color: 'orange' },
  'Shortlisted': { color: 'purple' },
  'Interview Scheduled': { color: 'geekblue' },
  'Selected': { color: 'success' },
  'Rejected': { color: 'error' },
  'Open': { color: 'cyan' },
  'Active': { color: 'green' },
  'Completed': { color: 'default' },
  'In Progress': { color: 'processing' }
};

export default function StatusBadge({ status }) {
  const conf = statusConfig[status] || { color: 'default' };
  return (
    <Tag color={conf.color} style={{ borderRadius: 6, fontWeight: 600, padding: '2px 10px' }}>
      {status}
    </Tag>
  );
}
