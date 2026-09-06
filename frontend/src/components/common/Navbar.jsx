import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Avatar, Menu, MenuItem, Tooltip, Badge } from '@mui/material';
import { Bell, RefreshCw, LogOut, User as UserIcon, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function Navbar({ onOpenDemoSwitch }) {
  const navigate = useNavigate();
  const user = authService.getCurrentUser() || { full_name: 'Guest User', role: 'STUDENT', email: 'student@skillora.ai' };
  const [anchorEl, setAnchorEl] = useState(null);

  const roleColors = {
    STUDENT: '#2563eb',
    INDUSTRY: '#7c3aed',
    INSTITUTION: '#059669',
    ACADEMICIAN: '#ea580c',
    ADMIN: '#dc2626'
  };

  const handleLogout = () => {
    setAnchorEl(null);
    authService.logout();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e2e8f0', color: '#0f172a', zIndex: 1201 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate(`/${user.role.toLowerCase()}/dashboard`)}>
          <Box sx={{
            width: 40, height: 40, borderRadius: 2.5,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
          }}>
            <Sparkles size={22} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: -0.5, lineHeight: 1.1, color: '#1e3a8a' }}>
              SKILLORA <span style={{ color: '#2563eb' }}>AI</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: 10, letterSpacing: 0.5 }}>
              SIH26044 • BYTE SQUAD
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Quick Demo Switcher */}
          <Button
            variant="outlined"
            size="small"
            onClick={onOpenDemoSwitch}
            startIcon={<RefreshCw size={14} />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              borderColor: '#cbd5e1',
              color: '#334155',
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': { borderColor: '#2563eb', bgcolor: '#eff6ff' }
            }}
          >
            Demo Quick Switch
          </Button>

          {/* Role Badge */}
          <Box sx={{
            px: 1.5, py: 0.5, borderRadius: 1.5,
            bgcolor: `${roleColors[user.role] || '#2563eb'}15`,
            color: roleColors[user.role] || '#2563eb',
            fontWeight: 700, fontSize: 11, letterSpacing: 0.5
          }}>
            {user.role}
          </Box>

          {/* Notifications */}
          <Tooltip title="2 Unread Notifications">
            <IconButton size="small" sx={{ color: '#64748b', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Badge badgeContent={2} color="primary">
                <Bell size={18} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: roleColors[user.role] || '#2563eb', fontWeight: 700, fontSize: 14 }}>
              {user.full_name ? user.full_name[0] : 'U'}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { width: 220, borderRadius: 2, p: 0.5, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Typography variant="subtitle2" fontWeight={700} noWrap>{user.full_name}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>{user.email}</Typography>
            </Box>
            <MenuItem onClick={() => { setAnchorEl(null); navigate(`/${user.role.toLowerCase()}/profile`); }} sx={{ py: 1, gap: 1.5, fontSize: 13 }}>
              <UserIcon size={16} /> My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1, gap: 1.5, fontSize: 13, color: '#ef4444' }}>
              <LogOut size={16} /> Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
