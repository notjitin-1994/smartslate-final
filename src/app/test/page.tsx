'use client';

import { Box, Typography } from '@mui/material';

export default function TestPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1">Test Page</Typography>
      <Typography variant="body1">This is a simple test to check if the basic setup works.</Typography>
    </Box>
  );
}
