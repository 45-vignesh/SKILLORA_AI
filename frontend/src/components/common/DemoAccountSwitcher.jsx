import React from 'react';
import { Modal, Radio, Card, Typography, Space, Button, message } from 'antd';
import { authService } from '../../services/authService';

export default function DemoAccountSwitcher({ visible, onCancel }) {
  const current = authService.getCurrentUser()?.email;

  const handleSwitch = async (email, targetPath) => {
    try {
      await authService.login(email, 'password123');
      message.success(`Switched account to ${email}`);
      onCancel();
      window.location.href = targetPath;
    } catch (err) {
      message.error('Failed to switch demo account: ' + err.message);
    }
  };

  return (
    <Modal
      title={
        <Typography.Title level={4} style={{ margin: 0, color: '#1e3a8a' }}>
          Quick Demo Account Switcher
        </Typography.Title>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={520}
    >
      <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
        Instantly switch roles during Smart India Hackathon jury presentation without entering credentials.
      </Typography.Paragraph>

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {authService.demoAccounts.map((acc, idx) => {
          const isCurrent = current === acc.email;
          return (
            <Card
              key={idx}
              size="small"
              hoverable
              style={{
                borderRadius: 8,
                borderColor: isCurrent ? '#2563eb' : '#e2e8f0',
                background: isCurrent ? '#eff6ff' : '#ffffff',
                cursor: 'pointer'
              }}
              onClick={() => handleSwitch(acc.email, acc.targetPath)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Typography.Text strong style={{ color: isCurrent ? '#2563eb' : '#0f172a' }}>
                    {acc.label}
                  </Typography.Text>
                  <br />
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {acc.email}
                  </Typography.Text>
                </div>
                <Button
                  type={isCurrent ? 'primary' : 'default'}
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwitch(acc.email, acc.targetPath);
                  }}
                >
                  {isCurrent ? 'Active' : 'Switch'}
                </Button>
              </div>
            </Card>
          );
        })}
      </Space>
    </Modal>
  );
}
