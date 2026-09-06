import React, { useEffect, useState } from 'react';
import { Card, Typography, Progress, Button, message, List, Tag } from 'antd';
import { CheckCircle, Clock } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { studentService } from '../../services/studentService';

export default function CourseProgress() {
  const [enrolled, setEnrolled] = useState([]);

  const loadCourses = async () => {
    try {
      const res = await studentService.getMyCourses();
      setEnrolled(res.data);
    } catch (err) {
      message.error('Failed to load enrolled courses');
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleUpdate = async (courseId, currentPct) => {
    const nextPct = Math.min(currentPct + 25, 100);
    try {
      await studentService.updateCourseProgress(courseId, nextPct);
      message.success(`Updated progress to ${nextPct}%`);
      loadCourses();
    } catch (err) {
      message.error('Update failed');
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        My Enrolled Courses & Learning Progress
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Track your module completions and practical lab assignments.
      </Typography.Paragraph>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2 }}
        dataSource={enrolled}
        renderItem={(c) => (
          <List.Item>
            <Card title={c.title} extra={<Tag color={c.status === 'Completed' ? 'green' : 'blue'}>{c.status}</Tag>} style={{ borderRadius: 12 }}>
              <Typography.Paragraph type="secondary">
                Provider: {c.provider} • Duration: {c.duration}
              </Typography.Paragraph>
              <Progress percent={Math.round(c.progress_percent)} status={c.progress_percent >= 100 ? 'success' : 'active'} />
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                {c.progress_percent < 100 ? (
                  <Button type="primary" size="small" onClick={() => handleUpdate(c.id, c.progress_percent)}>
                    Complete Next Module (+25%)
                  </Button>
                ) : (
                  <Tag color="success" style={{ fontWeight: 600 }}>Course Completed 🎉</Tag>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </UnifiedLayout>
  );
}
