import React, { useState } from 'react';
import { Row, Col, Card, Avatar, Tag, Button, Modal, Form, Input, notification, Badge } from 'antd';
import { BankOutlined, CheckCircleOutlined, PlusOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';

const IndustryConnections = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'Tata Elxsi',
      domain: 'Automotive & AI Systems',
      status: 'Active MoU Signed',
      hiringDrives: 3,
      internshipsOffered: 45,
      contact: 'recruitment@tataelxsi.com',
      website: 'tataelxsi.com',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100'
    },
    {
      id: 2,
      name: 'Infosys Springboard',
      domain: 'Enterprise Cloud & AI',
      status: 'Active MoU Signed',
      hiringDrives: 4,
      internshipsOffered: 80,
      contact: 'campus@infosys.com',
      website: 'infosys.com',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100'
    },
    {
      id: 3,
      name: 'Zoho Corporation',
      domain: 'SaaS & Web Engineering',
      status: 'Recruitment Partner',
      hiringDrives: 2,
      internshipsOffered: 35,
      contact: 'careers@zohocorp.com',
      website: 'zoho.com',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100'
    },
    {
      id: 4,
      name: 'Wipro Digital Labs',
      domain: 'Full Stack & DevOps',
      status: 'Active MoU Signed',
      hiringDrives: 2,
      internshipsOffered: 30,
      contact: 'campusconnect@wipro.com',
      website: 'wipro.com',
      logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=100'
    }
  ]);

  const handleCreateMoU = (values) => {
    setPartners([...partners, {
      id: Date.now(),
      name: values.name,
      domain: values.domain,
      status: 'MoU In Review',
      hiringDrives: 0,
      internshipsOffered: 0,
      contact: values.contact,
      website: values.website || 'corporate.com',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100'
    }]);
    setModalVisible(false);
    notification.success({ message: 'MoU Proposal Submitted', description: 'Industry collaboration proposal has been dispatched for digital sign-off.' });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700 }}>Corporate & Industry Collaborations</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>Manage bilateral MoUs, campus placement partnerships, and faculty enablement agreements</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          Initiate New Industry MoU
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {partners.map(partner => (
          <Col xs={24} md={12} key={partner.id}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <Avatar src={partner.logo} size={54} shape="square" style={{ borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontWeight: 700 }}>{partner.name}</h3>
                    <Tag color={partner.status.includes('Active') ? 'success' : 'processing'}>{partner.status}</Tag>
                  </div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{partner.domain}</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '14px 0', background: '#f8fafc', padding: 10, borderRadius: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>Annual Campus Drives</div>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{partner.hiringDrives} Drives</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>Internships Offered</div>
                      <div style={{ fontWeight: 600, color: '#16a34a' }}>{partner.internshipsOffered} Slots</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748b' }}>
                    <span><MailOutlined /> {partner.contact}</span>
                    <span><GlobalOutlined /> {partner.website}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Initiate Industry Partnership / MoU"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateMoU}>
          <Form.Item name="name" label="Industry Partner Name" rules={[{ required: true }]}>
            <Input placeholder="e.g. Microsoft India" />
          </Form.Item>
          <Form.Item name="domain" label="Primary Domain" rules={[{ required: true }]}>
            <Input placeholder="e.g. Cloud & AI Infrastructure" />
          </Form.Item>
          <Form.Item name="contact" label="Corporate POC Email" rules={[{ required: true }]}>
            <Input placeholder="university-relations@microsoft.com" />
          </Form.Item>
          <Form.Item name="website" label="Website URL">
            <Input placeholder="microsoft.com" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ marginTop: 12 }}>
            Submit MoU Proposal
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default IndustryConnections;
