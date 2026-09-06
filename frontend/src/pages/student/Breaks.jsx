import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Progress, Row, Col, message } from 'antd';
import { Coffee, Play, Pause, RotateCcw, Smile } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';

export default function Breaks() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus or break

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      message.info(mode === 'focus' ? 'Great session! Time for a 5-minute break.' : 'Break over! Ready to learn?');
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setSeconds(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const total = mode === 'focus' ? 25 * 60 : 5 * 60;
  const pct = Math.round(((total - seconds) / total) * 100);

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Productivity & Wellness Tracker
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Maintain peak focus while preventing cognitive burnout through structured Pomodoro intervals.
      </Typography.Paragraph>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card style={{ borderRadius: 12, textAlign: 'center', padding: '30px 20px' }}>
            <Coffee size={40} color="#2563eb" style={{ marginBottom: 12 }} />
            <Typography.Title level={2} style={{ color: '#1e3a8a', margin: 0, fontSize: 48, fontFamily: 'monospace' }}>
              {mins}:{secs}
            </Typography.Title>
            <Typography.Text type="secondary" style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, display: 'block', margin: '8px 0 20px' }}>
              {mode === 'focus' ? 'Deep Study Interval' : 'Restorative Break'}
            </Typography.Text>

            <Progress percent={pct} showInfo={false} strokeColor="#2563eb" style={{ marginBottom: 24 }} />

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Button type="primary" size="large" onClick={toggleTimer} icon={isActive ? <Pause size={16} /> : <Play size={16} />} style={{ borderRadius: 8 }}>
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button size="large" onClick={() => resetTimer(mode)} icon={<RotateCcw size={16} />} style={{ borderRadius: 8 }}>
                Reset
              </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
              <Button size="small" type={mode === 'focus' ? 'dashed' : 'text'} onClick={() => resetTimer('focus')}>
                25m Focus
              </Button>
              <Button size="small" type={mode === 'break' ? 'dashed' : 'text'} onClick={() => resetTimer('break')}>
                5m Break
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Mental Wellbeing Tips" style={{ borderRadius: 12 }}>
            <div style={{ marginBottom: 16 }}>
              <Typography.Text strong style={{ color: '#1e3a8a' }}>The 20-20-20 Eye Rest Rule</Typography.Text>
              <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Every 20 minutes spent looking at screens, look at an object 20 feet away for at least 20 seconds.
              </Typography.Paragraph>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Typography.Text strong style={{ color: '#1e3a8a' }}>Hydration Benchmark</Typography.Text>
              <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Drink at least 250ml of water during each 5-minute break to maintain neural cognitive agility.
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Text strong style={{ color: '#1e3a8a' }}>Micro-Stretches</Typography.Text>
              <Typography.Paragraph type="secondary" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Stand up, stretch your shoulder cuffs and neck flexors between coding sprints.
              </Typography.Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </UnifiedLayout>
  );
}
