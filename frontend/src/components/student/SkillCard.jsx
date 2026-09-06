import React, { useState } from 'react';
import { Card, Box, Typography, Chip, Button, Modal, TextField, MenuItem } from '@mui/material';
import { Plus, Check, Trash2 } from 'lucide-react';
import { studentService } from '../../services/studentService';
import { message } from 'antd';

export default function SkillCard({ skills, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [category, setCategory] = useState('Technical');

  const handleAdd = async () => {
    if (!skillName.trim()) return;
    try {
      await studentService.addSkill({ skill_name: skillName, proficiency_level: level, category });
      message.success('Skill added to profile');
      setSkillName('');
      setOpen(false);
      onRefresh && onRefresh();
    } catch (err) {
      message.error('Failed to add skill');
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentService.deleteSkill(id);
      message.success('Skill removed');
      onRefresh && onRefresh();
    } catch (err) {
      message.error('Failed to remove skill');
    }
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={700} color="#1e3a8a">
          Verified Skills Profile
        </Typography>
        <Button size="small" variant="contained" startIcon={<Plus size={14} />} onClick={() => setOpen(true)}>
          Add Skill
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills && skills.length > 0 ? (
          skills.map((s) => (
            <Chip
              key={s.id}
              label={`${s.name || s.skill_name} (${s.level || s.proficiency_level})`}
              onDelete={() => handleDelete(s.id)}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No skills listed yet. Complete an assessment or add skills manually.
          </Typography>
        )}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', borderRadius: 3, p: 3, boxShadow: 24
        }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Add Skill</Typography>
          <TextField
            fullWidth label="Skill Name" value={skillName}
            onChange={(e) => setSkillName(e.target.value)} sx={{ mb: 2 }}
            placeholder="e.g. Docker, AWS, React"
          />
          <TextField
            fullWidth select label="Proficiency Level" value={level}
            onChange={(e) => setLevel(e.target.value)} sx={{ mb: 2 }}
          >
            {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((l) => (
              <MenuItem key={l} value={l}>{l}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth select label="Category" value={category}
            onChange={(e) => setCategory(e.target.value)} sx={{ mb: 3 }}
          >
            {['Technical', 'Soft', 'Tools', 'Frameworks'].map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>Save Skill</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
}
