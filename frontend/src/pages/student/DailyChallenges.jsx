import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Tag, message, List, Progress } from 'antd';
import { CheckCircle, Award, Flame } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { studentService } from '../../services/studentService';

export default function DailyChallenges() {
  const [challenges, setChallenges] = useState([]);

  const loadChallenges = async () => {
    try {
      const res = await studentService.getDailyChallenges();
      setChallenges(res.data);
    } catch (err) {
      message.error('Failed to load challenges');
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleComplete = async (id) => {
    try {
      const res = await studentService.completeChallenge(id);
      message.success(`Challenge completed! Earned ${res.data.points_earned} XP.`);
      loadChallenges();
    } catch (err) {
      message.error('Error completing challenge');
    }
  };

  const completedCount = challenges.filter(c => c.is_completed).length;

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Daily Coding & System Design Challenges
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Build continuous learning habits and earn skill readiness badges.
          </Typography.Paragraph>
        </div>
        <Tag color="volcano" style={{ padding: '6px 14px', fontSize: 13, fontWeight: 700, borderRadius: 8 }}>
          <Flame size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          3-Day Streak!
        </Tag>
      </div>

      <Card style={{ borderRadius: 12, marginBottom: 24, background: '#eff6ff', borderColor: '#bfdbfe' }}>
        <Typography.Text strong style={{ color: '#1e40af' }}>
          Today's Progress: {completedCount} of {challenges.length} completed
        </Typography.Text>
        <Progress percent={Math.round((completedCount / Math.max(challenges.length, 1)) * 100)} strokeColor="#2563eb" style={{ marginTop: 8 }} />
      </Card>

      <List
        dataSource={challenges}
        renderItem={(c) => (
          <Card style={{ borderRadius: 12, marginBottom: 16, borderColor: c.is_completed ? '#bbf7d0' : '#e2e8f0', background: c.is_completed ? '#f0fdf4' : '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Tag color="blue">{c.category}</Tag>
                  <Tag color="gold">+{c.points} XP</Tag>
                  {c.is_completed && <Tag color="green">Completed</Tag>}
                </div>
                <Typography.Title level={5} style={{ color: '#1e3a8a', margin: '4px 0' }}>
                  {c.title}
                </Typography.Title>
                <Typography.Paragraph type="secondary" style={{ margin: 0, fontSize: 13 }}>
                  {c.description}
                </Typography.Paragraph>
              </div>
              <Button
                type={c.is_completed ? 'default' : 'primary'}
                disabled={c.is_completed}
                onClick={() => handleComplete(c.id)}
                style={{ borderRadius: 8 }}
              >
                {c.is_completed ? 'Done' : 'Mark Completed'}
              </Button>
            </div>
          </Card>
        )}
      />
    </UnifiedLayout>
  );
}
