import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading({ message = 'Loading intelligent data...' }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
      <CircularProgress size={36} sx={{ color: '#2563eb', mb: 2 }} />
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {message}
      </Typography>
    </Box>
  );
}
