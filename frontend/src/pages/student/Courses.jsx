import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Modal, List, Tag, message, Select, Input } from 'antd';
import { Search } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import CourseCard from '../../components/student/CourseCard';
import { studentService } from '../../services/studentService';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filterLevel, setFilterLevel] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadCourses = async () => {
    try {
      const res = await studentService.getCourses(filterLevel);
      setCourses(res.data);
    } catch (err) {
      message.error('Failed to load courses');
    }
  };

  useEffect(() => {
    loadCourses();
  }, [filterLevel]);

  const handleEnroll = async (courseId) => {
    try {
      await studentService.enrollCourse(courseId);
      message.success('Enrolled successfully! View progress under My Courses.');
    } catch (err) {
      message.error('Enrollment failed');
    }
  };

  const handleViewDetails = (c) => {
    setSelectedCourse(c);
    setModalOpen(true);
  };

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Course Catalog & Learning Pathways
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 20 }}>
        Industry-aligned certifications and hands-on laboratory modules to close your identified skill gaps.
      </Typography.Paragraph>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <Input
          prefix={<Search size={16} color="#94a3b8" />}
          placeholder="Search courses or skills..."
          style={{ width: 280, borderRadius: 8 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filterLevel}
          onChange={setFilterLevel}
          style={{ width: 160 }}
        >
          <Select.Option value="All">All Levels</Select.Option>
          <Select.Option value="Beginner">Beginner</Select.Option>
          <Select.Option value="Intermediate">Intermediate</Select.Option>
          <Select.Option value="Advanced">Advanced</Select.Option>
        </Select>
      </div>

      <Row gutter={[20, 20]}>
        {filtered.map((c) => (
          <Col xs={24} sm={12} md={8} key={c.id}>
            <CourseCard
              course={c}
              onEnroll={handleEnroll}
              onViewDetails={handleViewDetails}
            />
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedCourse?.title}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={600}
      >
        <Typography.Paragraph type="secondary">
          {selectedCourse?.provider} • {selectedCourse?.duration} • Level: {selectedCourse?.level}
        </Typography.Paragraph>
        <Typography.Paragraph>
          {selectedCourse?.description}
        </Typography.Paragraph>

        <Typography.Title level={5} style={{ marginTop: 16 }}>Skills Covered:</Typography.Title>
        <div style={{ marginBottom: 16 }}>
          {selectedCourse?.skills_covered?.map((s, i) => (
            <Tag color="blue" key={i}>{s}</Tag>
          ))}
        </div>

        <Typography.Title level={5}>Syllabus Modules:</Typography.Title>
        <List
          size="small"
          bordered
          dataSource={selectedCourse?.syllabus || []}
          renderItem={(item, idx) => (
            <List.Item>
              <strong>Module {idx + 1}:</strong> {item}
            </List.Item>
          )}
        />
      </Modal>
    </UnifiedLayout>
  );
}
