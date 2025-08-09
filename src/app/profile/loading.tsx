import { Box, CircularProgress, Container } from '@mui/material';

export default function ProfileLoading() {
  return (
    <Container maxWidth="lg">
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ paddingTop: 15 }}
      >
        <CircularProgress size={40} sx={{ color: 'primary.main' }} />
      </Box>
    </Container>
  );
}
