'use client';

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import StandardHero from '@/components/ui/StandardHero';

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
    fontSize: '0.9rem',
  },
}));

export default function DifferenceHero() {
  return (
    <StandardHero
              title="The Smartslate Difference"
      subtitle="Where traditional training ends, transformative learning begins"
              description="At Smartslate, we don't just deliver training—we architect learning ecosystems that evolve with your organization. Our approach transcends conventional boundaries, creating experiences that resonate, results that matter, and transformations that last."
        accentWords={['Smartslate', 'transformative', 'learning ecosystems']}
      showScrollIndicator={true}
    >
      <Link href="/smartslate-testimony" style={{ textDecoration: 'none' }}>
        <CTAButton variant="contained" size="large">
          Discover Our AI-Human Journey
        </CTAButton>
      </Link>
    </StandardHero>
  );
}