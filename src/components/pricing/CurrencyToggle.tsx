'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency, loading } = useCurrency();

  const handleCurrencyChange = (newCurrency: Currency) => {
    if (!loading) {
      setCurrency(newCurrency);
    }
  };

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          display: 'inline-flex',
          p: 0.5,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          transition: 'all 0.3s ease',
        }}
      >
        <Button
          onClick={() => handleCurrencyChange('USD')}
          disabled={loading}
          sx={{
            px: 3,
            py: 1,
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            backgroundColor: currency === 'USD' ? 'rgba(167, 218, 219, 0.15)' : 'transparent',
            color: currency === 'USD' ? 'primary.main' : 'text.secondary',
            border: currency === 'USD' ? '1px solid' : 'none',
            borderColor: currency === 'USD' ? 'primary.main' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: currency === 'USD' ? 'rgba(167, 218, 219, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            },
            '&:disabled': {
              opacity: 0.6,
              cursor: 'not-allowed',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: currency === 'USD'
                ? 'linear-gradient(135deg, rgba(167, 218, 219, 0.1), rgba(79, 70, 229, 0.05))'
                : 'transparent',
              transition: 'all 0.3s ease',
              zIndex: -1,
            },
          }}
        >
          <AttachMoneyIcon sx={{ fontSize: '1.1rem' }} />
          USD
        </Button>

        <Button
          onClick={() => handleCurrencyChange('INR')}
          disabled={loading}
          sx={{
            px: 3,
            py: 1,
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            backgroundColor: currency === 'INR' ? 'rgba(167, 218, 219, 0.15)' : 'transparent',
            color: currency === 'INR' ? 'primary.main' : 'text.secondary',
            border: currency === 'INR' ? '1px solid' : 'none',
            borderColor: currency === 'INR' ? 'primary.main' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: currency === 'INR' ? 'rgba(167, 218, 219, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            },
            '&:disabled': {
              opacity: 0.6,
              cursor: 'not-allowed',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: currency === 'INR'
                ? 'linear-gradient(135deg, rgba(167, 218, 219, 0.1), rgba(79, 70, 229, 0.05))'
                : 'transparent',
              transition: 'all 0.3s ease',
              zIndex: -1,
            },
          }}
        >
          <CurrencyRupeeIcon sx={{ fontSize: '1.1rem' }} />
          INR
        </Button>
      </Box>

      {/* Loading indicator - subtle shimmer effect */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 1,
                  },
                  '50%': {
                    opacity: 0.4,
                  },
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default CurrencyToggle;
