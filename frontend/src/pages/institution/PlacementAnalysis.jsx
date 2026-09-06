import React from 'react';
import { Row, Col, Card, Table, Tag, Statistic, Progress } from 'antd';
import { TrophyOutlined, RiseOutlined, DollarOutlined, SolutionOutlined } from '@ant-design/icons';
import PlacementChart from '../../components/institution/PlacementChart';

const PlacementAnalysis = () => {
  const topRecruiters = [
    { name: 'Tata Elxsi', offers: 38, avgCTC: '8.5 LPA', role: 'Embedded & AI Engineer' },
    { name: 'Infosys Springboard', offers: 54, avgCTC: '6.5 LPA', role: 'Systems Engineer Specialist' },
    { name: 'Zoho Corporation', offers: 29, avgCTC: '9.0 LPA', role: 'Software Development Engineer' },
    { name: 'Wipro Digital', offers: 41, avgCTC: '6.2 LPA', role: 'Cloud & Full Stack Engineer' },
    { name: 'Cognizant GenC', offers: 48, avgCTC: '7.0 LPA', role: 'Full Stack Developer' },
  ];

  const columns = [
    { title: 'Recruiting Partner', dataIndex: 'name', key: 'name', render: text => <b>{text}</b> },
    { title: 'Offers Rolled Out', dataIndex: 'offers', key: 'offers', sorter: (a,b) => a.offers - b.offers },
    { title: 'Average Package', dataIndex: 'avgCTC', key: 'avgCTC', render: ctc => <Tag color="green">{ctc}</Tag> },
    { title: 'Primary Profile', dataIndex: 'role', key: 'role' },
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 700 }}>Comprehensive Campus Placement Analytics</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b' }}>Detailed breakdown of campus drives, recruitment stats, and CTC brackets</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Highest Package (CTC)" value="34.5 LPA" prefix={<TrophyOutlined style={{ color: '#f59e0b' }} />} />
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Secured at Atlassian</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Average Package" value="8.4 LPA" prefix={<DollarOutlined style={{ color: '#10b981' }} />} />
            <div style={{ fontSize: 12, color: '#10b981', marginTop: 4 }}>+18% from previous year</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Total Job Offers" value={512} prefix={<SolutionOutlined style={{ color: '#2563eb' }} />} />
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>120+ Multiple Offer Holders</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Tier-1 Companies" value={34} prefix={<RiseOutlined style={{ color: '#8b5cf6' }} />} />
            <div style={{ fontSize: 12, color: '#8b5cf6', marginTop: 4 }}>Product & Tech Firms</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={14}>
          <PlacementChart />
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Top Campus Recruiters" bordered={false} style={{ borderRadius: 12 }}>
            <Table dataSource={topRecruiters} columns={columns} pagination={false} rowKey="name" size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlacementAnalysis;
