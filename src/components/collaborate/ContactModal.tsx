'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface FormField {
  name: string;
  label: string;
  type: string;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formFields: FormField[];
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(13, 27, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: theme.spacing(2),
    maxWidth: 500,
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'calc(100vw - 16px)',
      margin: theme.spacing(1),
      borderRadius: theme.spacing(1.5),
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '60px', // Ensure adequate touch target area
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
}));

export default function ContactModal({
  open,
  onClose,
  title,
  formFields,
}: ContactModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', { title, data: formData });
      alert(`Thank you for your interest! We have received your submission for "${title}".`);
      
      // Reset form and close modal
      setFormData({});
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({});
      onClose();
    }
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={handleClose}
      aria-labelledby="contact-dialog-title"
    >
      <StyledDialogTitle id="contact-dialog-title">
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={loading}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ 
          padding: { xs: 2, sm: 3 },
          paddingTop: { xs: 2, sm: 3 },
          paddingBottom: { xs: 1, sm: 3 }
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3 } }}>
            {formFields.map((field) => (
              <StyledTextField
                key={field.name}
                fullWidth
                label={field.label}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
                disabled={loading}
                variant="outlined"
              />
            ))}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          padding: { xs: 2, sm: 3 }, 
          paddingTop: { xs: 1, sm: 0 }
        }}>
          <SubmitButton
            type="submit"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              minHeight: { xs: '48px', sm: '44px' }, // Larger touch target on mobile
              fontSize: { xs: '16px', sm: '1rem' }, // Prevent zoom on iOS
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </DialogActions>
      </form>
    </StyledDialog>
  );
}