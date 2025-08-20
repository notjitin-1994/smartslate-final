'use client';

import { Box, Typography, Button } from '@mui/material';

export default function TestSimplePage() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        Simple Test Page
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        This page tests if Material-UI is working properly with React 18.
      </Typography>
      <Button variant="contained" color="primary">
        Test Button
      </Button>
    </Box>
  );
}
