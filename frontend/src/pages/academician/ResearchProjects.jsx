import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Input, Modal, Form, notification } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ResearchCard from '../../components/academician/ResearchCard';
import { academicianService } from '../../services/academicianService';

const ResearchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await academicianService.getResearchProjects();
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCollaborate = (proj) => {
    setSelectedProject(proj);
    setModalVisible(true);
  };

  const submitProposal = (values) => {
    notification.success({
      message: 'Research Proposal Submitted',
      description: `Your formal proposal for "${selectedProject.title}" has been submitted to the industry review panel.`
    });
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700 }}>Joint Industry-Academia R&D Projects</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>Co-create patents, secure corporate research funding, and publish high-impact innovations</p>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {projects.map((proj, idx) => (
          <Col xs={24} sm={12} lg={8} key={proj.id || idx}>
            <ResearchCard project={proj} onCollaborate={handleCollaborate} />
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedProject ? `Proposal: ${selectedProject.title}` : 'Submit Research Proposal'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={submitProposal}>
          <Form.Item name="lead_investigator" label="Principal Investigator (PI)" rules={[{ required: true }]}>
            <Input defaultValue="Dr. Rajesh Sharma (Professor, CSE)" />
          </Form.Item>
          <Form.Item name="timeline" label="Estimated Project Timeline" rules={[{ required: true }]}>
            <Input defaultValue="6 Months (Phase 1 Prototype)" />
          </Form.Item>
          <Form.Item name="abstract" label="Proposal Abstract & Methodology" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Outline research methodology, student researcher involvement, and testing infrastructure..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
            Submit Proposal to R&D Panel
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ResearchProjects;
