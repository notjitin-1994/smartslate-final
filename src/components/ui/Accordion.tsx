'use client';

import { useState } from 'react';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import type { ReactNode } from 'react';

const AccordionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const AccordionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(167, 218, 219, 0.08)',
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.12)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
  },
}));

const AccordionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: 'white',
  margin: 0,
}));

const AccordionContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderTop: 'none',
  borderBottomLeftRadius: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(1),
}));

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export default function Accordion({ title, children, defaultExpanded = false }: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={handleToggle}>
        <AccordionTitle variant="subtitle2">
          {title}
        </AccordionTitle>
        <IconButton
          size="small"
          sx={{ 
            color: 'rgba(167, 218, 219, 0.8)',
            padding: 0,
            '&:hover': {
              backgroundColor: 'rgba(167, 218, 219, 0.1)',
            }
          }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </AccordionHeader>
      <Collapse in={expanded}>
        <AccordionContent>
          {children}
        </AccordionContent>
      </Collapse>
    </AccordionContainer>
  );
}
