import React, { useState, useEffect } from 'react';
import { Card, Radio, Button, Typography, Space, Progress, Tag, message, Spin, Tabs } from 'antd';
import { Box, Paper, Divider } from '@mui/material';
import { CheckCircle, AlertCircle, Sparkles, Award } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import RAGExplanationCard from '../../components/common/RAGExplanationCard';
import { studentService } from '../../services/studentService';

export default function SkillAssessment() {
  const [category, setCategory] = useState('Technical Skills');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const loadQuestions = async (cat) => {
    setLoading(true);
    setResult(null);
    setAnswers({});
    try {
      const res = await studentService.getAssessmentQuestions(cat);
      setQuestions(res.data);
    } catch (err) {
      message.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions(category);
  }, [category]);

  const handleOptionChange = (qId, optionIdx) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      message.warning('Please answer at least one question');
      return;
    }
    setSubmitting(true);
    try {
      const res = await studentService.submitAssessment({
        title: `${category} Assessment`,
        category,
        answers
      });
      message.success('Assessment evaluated with RAG AI!');
      setResult(res.data);
    } catch (err) {
      message.error('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Dynamic Skill Assessment
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 20 }}>
        Answer competency questions. Results are fed directly into the RAG engine to update your profile readiness.
      </Typography.Paragraph>

      <Tabs
        activeKey={category}
        onChange={(k) => setCategory(k)}
        items={[
          { key: 'Technical Skills', label: 'Technical Skills' },
          { key: 'Soft Skills', label: 'Soft Skills & Workplace' },
          { key: 'Problem Solving', label: 'Problem Solving & Logic' }
        ]}
      />

      {loading ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Spin size="large" tip="Loading assessment questions..." />
        </Box>
      ) : result ? (
        <Box sx={{ mb: 4 }}>
          <Card style={{ borderRadius: 12, marginBottom: 24, textAlign: 'center', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <Award size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
            <Typography.Title level={3} style={{ color: '#065f46', margin: 0 }}>
              Assessment Score: {result.score} / {result.total} ({result.percentage}%)
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
              Your profile readiness index has been updated in the database.
            </Typography.Paragraph>
            <Button type="primary" onClick={() => loadQuestions(category)} style={{ borderRadius: 8 }}>
              Take Another Assessment
            </Button>
          </Card>

          <RAGExplanationCard aiData={result.rag_feedback} targetTitle={`${category} Evaluation`} />
        </Box>
      ) : (
        <Card style={{ borderRadius: 12 }}>
          {questions.map((q, idx) => (
            <Box key={q.id} sx={{ mb: 3, pb: 3, borderBottom: idx < questions.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Tag color="blue">{q.skill_tested}</Tag>
                <Tag color={q.difficulty === 'Easy' ? 'green' : 'orange'}>{q.difficulty}</Tag>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>Question {idx + 1} of {questions.length}</Typography.Text>
              </Box>
              <Typography.Title level={5} style={{ margin: '8px 0 12px', color: '#1e3a8a' }}>
                {q.question_text}
              </Typography.Title>

              <Radio.Group
                onChange={(e) => handleOptionChange(q.id, e.target.value)}
                value={answers[q.id]}
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {q.options?.map((opt, oIdx) => (
                    <Radio
                      key={oIdx}
                      value={oIdx}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        width: '100%',
                        background: answers[q.id] === oIdx ? '#eff6ff' : '#ffffff'
                      }}
                    >
                      {opt}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Box>
          ))}

          <Button
            type="primary"
            size="large"
            block
            loading={submitting}
            onClick={handleSubmit}
            style={{ height: 44, borderRadius: 8, fontWeight: 600, marginTop: 12 }}
          >
            Submit Assessment & Generate RAG Feedback
          </Button>
        </Card>
      )}
    </UnifiedLayout>
  );
}
