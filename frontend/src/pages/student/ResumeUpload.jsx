import React, { useState, useEffect } from 'react';
import { Upload, message, Card, Typography, Divider, Button, Spin, Tag } from 'antd';
import { Box, Paper } from '@mui/material';
import { InboxOutlined } from '@ant-design/icons';
import { FileText, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import RAGExplanationCard from '../../components/common/RAGExplanationCard';
import { studentService } from '../../services/studentService';

const { Dragger } = Upload;

export default function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [ragResult, setRagResult] = useState(null);

  const loadCurrentResume = async () => {
    try {
      const res = await studentService.getMyResume();
      if (res.data.has_resume) {
        setResumeData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCurrentResume();
  }, []);

  const handleCustomUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const res = await studentService.uploadResume(formData);
      message.success('Resume analyzed using RAG knowledge base!');
      setRagResult(res.data.rag_analysis);
      loadCurrentResume();
      onSuccess(res.data);
    } catch (err) {
      message.error(err.response?.data?.detail || 'Upload failed');
      onError(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        RAG Resume Intelligence & Parsing
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Upload your resume (PDF/TXT). The RAG pipeline chunks, extracts competencies, and cross-references them against industry frameworks.
      </Typography.Paragraph>

      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Dragger
          name="file"
          multiple={false}
          accept=".pdf,.txt,.docx"
          customRequest={handleCustomUpload}
          showUploadList={false}
          style={{ padding: '30px 20px', background: '#f8fafc', borderRadius: 12, borderColor: '#bfdbfe' }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#2563eb', fontSize: 48 }} />
          </p>
          <Typography.Title level={5} style={{ margin: '8px 0', color: '#1e3a8a' }}>
            Click or drag your Resume PDF here to upload
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
            Supports PDF and text formats. Automatically extracts verified skills, projects, and target role readiness.
          </Typography.Paragraph>
        </Dragger>
      </Card>

      {uploading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Spin size="large" tip="Chunking document & querying Vector Knowledge Base..." />
        </Box>
      )}

      {ragResult && (
        <RAGExplanationCard aiData={ragResult} targetTitle="Parsed Resume Profile" />
      )}

      {resumeData && !ragResult && (
        <Card title="Current Resume on Record" style={{ borderRadius: 12 }}>
          <Typography.Paragraph strong style={{ color: '#2563eb' }}>
            📄 {resumeData.filename}
          </Typography.Paragraph>
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            Uploaded: {new Date(resumeData.uploaded_at).toLocaleString()}
          </Typography.Text>
          <Typography.Paragraph>
            <strong>RAG Summary:</strong> {resumeData.rag_summary}
          </Typography.Paragraph>
          <Box sx={{ mt: 1 }}>
            <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
              Extracted Skills:
            </Typography.Text>
            {resumeData.extracted_skills?.map((sk, idx) => (
              <Tag key={idx} color="blue" style={{ marginBottom: 6 }}>{sk}</Tag>
            ))}
          </Box>
        </Card>
      )}
    </UnifiedLayout>
  );
}
