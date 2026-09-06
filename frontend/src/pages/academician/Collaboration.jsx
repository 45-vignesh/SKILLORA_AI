import React from 'react';
import { Row, Col, Card, Avatar, Tag, Button, List } from 'antd';
import { TeamOutlined, VideoCameraOutlined, MessageOutlined } from '@ant-design/icons';

const Collaboration = () => {
  const mentors = [
    { name: 'Dr. Anand Raman', role: 'Chief AI Architect at NVIDIA', domain: 'Deep Learning & GPUs', rating: 4.9, sessions: 12 },
    { name: 'Priya Sundaram', role: 'Staff Security Engineer at Google', domain: 'Zero Trust & Cloud Security', rating: 4.8, sessions: 8 },
    { name: 'Vikram Joshi', role: 'VP of Engineering at Razorpay', domain: 'High-Scale Fintech Architecture', rating: 5.0, sessions: 15 },
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 700 }}>Industry Mentors & Guest Lecture Exchange</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b' }}>Connect with corporate domain experts to deliver guest lectures and co-design lab assignments</p>
      </div>

      <Row gutter={[16, 16]}>
        {mentors.map((m, idx) => (
          <Col xs={24} md={8} key={idx}>
            <Card bordered={false} style={{ borderRadius: 12 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={64} style={{ backgroundColor: '#7c3aed', fontSize: 24 }}>{m.name.charAt(0)}</Avatar>
                <h3 style={{ margin: '12px 0 2px', fontWeight: 700 }}>{m.name}</h3>
                <div style={{ color: '#64748b', fontSize: 13 }}>{m.role}</div>
                <Tag color="purple" style={{ marginTop: 8 }}>{m.domain}</Tag>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748b', marginBottom: 16 }}>
                <span>⭐ {m.rating} Rating</span>
                <span>{m.sessions} Lectures Delivered</span>
              </div>

              <Button type="primary" block icon={<VideoCameraOutlined />} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Schedule Guest Lecture
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Collaboration;
