import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Select, Tag, Button, notification, Modal, Form } from 'antd';
import { SearchOutlined, RocketOutlined } from '@ant-design/icons';
import TrainingCard from '../../components/academician/TrainingCard';
import { academicianService } from '../../services/academicianService';

const { Option } = Select;

const FacultyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const res = await academicianService.getTrainings();
      setOpportunities(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const submitApplication = (values) => {
    notification.success({
      message: 'Faculty Nomination Submitted',
      description: `Your application for "${selectedItem.title}" has been transmitted to ${selectedItem.provider || 'corporate sponsor'}.`
    });
    setModalVisible(false);
  };

  const filtered = opportunities.filter(o => 
    (o.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (o.provider || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700 }}>Faculty Development & Corporate Sabbaticals</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>Immerse in enterprise engineering environments to bring real-world cutting-edge practice into your classroom</p>
        </div>
        <Input 
          prefix={<SearchOutlined />} 
          placeholder="Search corporate programs..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ width: 280, borderRadius: 8 }} 
        />
      </div>

      <Row gutter={[16, 16]}>
        {filtered.map((item, idx) => (
          <Col xs={24} sm={12} lg={8} key={item.id || idx}>
            <TrainingCard training={item} onApply={handleApply} />
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedItem ? `Apply for ${selectedItem.title}` : 'Faculty Nomination'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={submitApplication}>
          <Form.Item name="teaching_experience" label="Years of Teaching Experience" rules={[{ required: true }]}>
            <Input placeholder="e.g. 8 years" defaultValue="10 years" />
          </Form.Item>
          <Form.Item name="specialization" label="Primary Teaching Domain" rules={[{ required: true }]}>
            <Input placeholder="e.g. Distributed Systems & Cloud Architecture" defaultValue="Distributed Systems" />
          </Form.Item>
          <Form.Item name="statement" label="Statement of Purpose (How this impacts curriculum)" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Describe how completing this industrial program will enable syllabus modernization..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
            Submit Sabbatical Nomination
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FacultyOpportunities;
