import React from 'react';
import { Card, Chip, Typography, Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Progress, Tag } from 'antd';
import { CheckCircle, AlertTriangle, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function RAGExplanationCard({ aiData, targetTitle }) {
  if (!aiData) return null;

  const score = aiData.readiness_score || 0;
  const matched = aiData.matched_skills || [];
  const gaps = aiData.skill_gaps || [];
  const recs = aiData.recommendations || [];
  const sources = aiData.sources || [];
  const explanation = aiData.explanation || aiData.answer || '';

  return (
    <Card sx={{ p: 3, mb: 3, border: '1px solid #bfdbfe', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, bgcolor: '#eff6ff', borderRadius: 2, color: '#2563eb' }}>
            <Sparkles size={24} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#1e3a8a">
              Explainable RAG Match Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Evaluating compatibility against {targetTitle || 'Target Career Framework'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              READINESS SCORE
            </Typography>
            <Typography variant="h5" fontWeight={800} color={score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}>
              {score}%
            </Typography>
          </Box>
          <Progress
            type="circle"
            percent={Math.round(score)}
            width={54}
            strokeColor={score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}
          />
        </Box>
      </Box>

      {explanation && (
        <Box sx={{ p: 2, mb: 2.5, bgcolor: '#f0f9ff', borderRadius: 2, borderLeft: '4px solid #0284c7' }}>
          <Typography variant="body2" color="#0369a1" fontWeight={500} lineHeight={1.6}>
            {explanation}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
        {/* Why Matched */}
        <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0' }}>
          <Typography variant="subtitle2" fontWeight={700} color="#065f46" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CheckCircle size={18} color="#10b981" /> WHY MATCHED (STRENGTHS)
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {matched.length > 0 ? (
              matched.map((s, idx) => (
                <Chip key={idx} label={s} size="small" sx={{ bgcolor: '#d1fae5', color: '#065f46', fontWeight: 600 }} />
              ))
            ) : (
              <Typography variant="caption" color="text.secondary">No direct skill matches registered</Typography>
            )}
          </Box>
        </Box>

        {/* Skill Gaps */}
        <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0' }}>
          <Typography variant="subtitle2" fontWeight={700} color="#991b1b" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <AlertTriangle size={18} color="#ef4444" /> MISSING SKILL GAPS
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {gaps.length > 0 ? (
              gaps.map((g, idx) => (
                <Chip key={idx} label={g} size="small" sx={{ bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 600 }} />
              ))
            ) : (
              <Typography variant="caption" color="text.secondary">Zero identified skill gaps!</Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Actionable Recommendations */}
      {recs.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={700} color="#1e3a8a" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <ArrowRight size={18} color="#2563eb" /> RECOMMENDED NEXT STEPS & LEARNING ROADMAP
          </Typography>
          <List dense disablePadding>
            {recs.map((r, i) => (
              <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 28, color: '#2563eb', fontWeight: 700 }}>
                  {i + 1}.
                </ListItemIcon>
                <ListItemText
                  primary={r}
                  primaryTypographyProps={{ variant: 'body2', color: '#334155', fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Cited Knowledge Base Sources */}
      {sources.length > 0 && (
        <Box sx={{ pt: 1.5, borderTop: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <BookOpen size={14} color="#64748b" />
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Retrieved Knowledge Sources:
          </Typography>
          {sources.map((src, i) => (
            <Tag key={i} color="blue" style={{ fontSize: 11, borderRadius: 4 }}>
              {src.replace(/_/g, ' ')}
            </Tag>
          ))}
        </Box>
      )}
    </Card>
  );
}
