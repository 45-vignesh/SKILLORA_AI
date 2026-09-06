import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DemoAccountSwitcher from './DemoAccountSwitcher';

export default function UnifiedLayout({ children }) {
  const [demoSwitchOpen, setDemoSwitchOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      <Navbar onOpenDemoSwitch={() => setDemoSwitchOpen(true)} />
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3.5 }, overflowX: 'hidden' }}>
          <Container maxWidth="xl" sx={{ p: '0 !important' }}>
            {children}
          </Container>
        </Box>
      </Box>

      <DemoAccountSwitcher
        visible={demoSwitchOpen}
        onCancel={() => setDemoSwitchOpen(false)}
      />
    </Box>
  );
}
