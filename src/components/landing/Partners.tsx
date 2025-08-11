'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Collapse, Grow, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import {
  School,
  Business,
  ArrowForward,
  Lightbulb,
  BarChart,
  Groups,
  ElectricBolt,
  AddCircle,
  RemoveCircle,
  CheckCircle,
  FormatQuote,
  Star,
  AutoAwesome,
  EventAvailable,
  Description,
  AutoGraph,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const PartnersSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: `${theme.spacing(10)} 0`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at top, rgba(167, 218, 219, 0.05) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(79, 70, 229, 0.03) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
}));

const SectionHeaderWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(8),
  position: 'relative',
}));

const AccordionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
  display: 'grid',
  gap: theme.spacing(3),
}));

const Subsection = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2.5),
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.03)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
}));

const SectionHeaderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'revealed'
})<{ revealed?: boolean }>(({ theme, revealed }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: 0,
  transition: 'all 0.3s ease',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  textAlign: 'left',
  color: 'inherit',
  fontFamily: 'inherit',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: revealed ? 0 : -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.05), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.03)',
    '&::before': {
      left: '100%',
    },
    '& .section-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      filter: 'drop-shadow(0 0 20px rgba(167, 218, 219, 0.6))',
    },
  },
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const SectionIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: theme.spacing(3),
  color: theme.palette.primary.main,
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));

const ContentBody = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(0)} ${theme.spacing(4)} ${theme.spacing(4)}`,
}));

const BenefitsList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: `0 0 ${theme.spacing(4)} 0`,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(3),
}));

const BenefitItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(1.5),
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.05)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-2px)',
    '& .benefit-icon': {
      transform: 'scale(1.15) rotate(5deg)',
      color: theme.palette.primary.light,
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
    flexShrink: 0,
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
  },
}));

const BenefitText = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const TestimonialCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    background: 'rgba(167, 218, 219, 0.1)',
    borderRadius: '50%',
    transform: 'translate(-30%, -30%)',
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.primary.main,
  opacity: 0.3,
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const TestimonialAuthor = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const CTAWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  border: '2px solid transparent',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

const PrimaryCTAButton = styled(CTAButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  borderColor: theme.palette.secondary.main,
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
    borderColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
}));

const SecondaryCTAButton = styled(CTAButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  borderColor: 'rgba(167, 218, 219, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
  },
}));

const PartnerLogos = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
}));

const PartnerLogo = styled(Box)(({ theme }) => ({
  width: 120,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.6,
  filter: 'grayscale(100%)',
  transition: 'all 0.3s ease',
  '&:hover': {
    opacity: 1,
    filter: 'grayscale(0%)',
    transform: 'scale(1.1)',
  },
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const RatingStars = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 2,
  color: '#FFB400',
  marginTop: theme.spacing(1),
}));

type PartnersProps = Record<string, never>

type PartnerType = 'institutions' | 'businesses';

const content = {
  institutions: {
    title: 'For Educational Institutions',
    pitch: 'Stand out by embedding real-world, in-demand skills directly into your curriculum.',
    benefits: [
      { icon: School, text: 'Industry-Informed Curriculum', description: 'Align programs with market demands' },
      { icon: ElectricBolt, text: 'AI-Powered Learning', description: 'Personalized education at scale' },
      { icon: Groups, text: 'Enhanced Graduate Employability', description: 'Improved career readiness and industry alignment' },
      { icon: CheckCircle, text: 'Accreditation Support', description: 'Meet quality standards effortlessly' },
      { icon: BarChart, text: 'Analytics Dashboard', description: 'Track student progress in real-time' },
      { icon: AutoAwesome, text: 'White-Label Solutions', description: 'Customize with your branding' },
    ],
    cta: 'Explore Our Programs',
  },
  businesses: {
    title: 'For Business Leaders',
    pitch: 'Stop the endless search for the perfect hire and start cultivating the skills you need.',
    benefits: [
      { icon: Lightbulb, text: 'Targeted Upskilling at Scale', description: 'Train teams simultaneously across locations' },
      { icon: BarChart, text: 'AI-Driven Performance Insights', description: 'Predictive skill analytics' },
      { icon: Groups, text: 'Boost Retention & Innovation', description: 'Improve employee satisfaction and innovation culture' },
      { icon: CheckCircle, text: 'Custom Learning Paths', description: 'Role-specific training programs' },
      { icon: ElectricBolt, text: 'Rapid Deployment', description: 'Quick implementation and rollout' },
      { icon: AutoAwesome, text: 'ROI Guarantee', description: 'Measurable return on training investment' },
    ],
    testimonial: {
      text: "We've reduced our training time by 60% while improving skill retention. The AI-powered insights help us identify and develop future leaders before our competitors even know they exist.",
      author: "Rajesh Kumar",
      role: "CHRO, Infosys",
      rating: 5,
    },
    cta: 'Schedule a Demo',
  },
};

// Mock partner logos - replace with actual logos
const partnerLogos = [
  { name: 'IIT Delhi', type: 'institution' },
  { name: 'BITS Pilani', type: 'institution' },
  { name: 'Infosys', type: 'business' },
  { name: 'TCS', type: 'business' },
  { name: 'Wipro', type: 'business' },
  { name: 'IIM Bangalore', type: 'institution' },
];

export default function Partners({}: PartnersProps) {
  const [revealed, setRevealed] = useState<Partial<Record<PartnerType, boolean>>>({
    institutions: true, // Default expanded
  });
  const [animateLogos, setAnimateLogos] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateLogos(true), 500);
  }, []);

  const toggle = (section: PartnerType) => {
    setRevealed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <PartnersSection>
      <Container maxWidth="lg">
        <SectionHeaderWrapper>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3, 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              lineHeight: 1.2
            }}
          >
            Who We <AccentText>Partner</AccentText> With
          </Typography>
          <Typography variant="body1" sx={{ 
            fontSize: '1.25rem', 
            color: 'text.secondary',
            lineHeight: 1.8
          }}>
            We collaborate with forward-thinking organizations to build the future of education and
            workforce development. Join the leaders who are already transforming their talent ecosystem.
          </Typography>
        </SectionHeaderWrapper>

        <AccordionWrapper>
          {/* Institutions Section */}
          <Subsection>
            <SectionHeaderButton
              revealed={revealed.institutions}
              onClick={() => toggle('institutions')}
            >
              <HeaderContent>
                <SectionIcon className="section-icon">
                  <School />
                </SectionIcon>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700 }}>
                    {content.institutions.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    {content.institutions.pitch}
                  </Typography>
                </Box>
              </HeaderContent>
              <IconWrapper sx={{ transform: revealed.institutions ? 'rotate(45deg)' : 'rotate(0)' }}>
                <AddCircle />
              </IconWrapper>
            </SectionHeaderButton>
            <Collapse in={revealed.institutions} timeout={500}>
              <ContentBody>


                <BenefitsList>
                  {content.institutions.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BenefitItem>
                        <benefit.icon className="benefit-icon" />
                        <BenefitText>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {benefit.text}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {benefit.description}
                          </Typography>
                        </BenefitText>
                      </BenefitItem>
                    </motion.div>
                  ))}
                </BenefitsList>
                
                <CTAWrapper>
                  <Link href="/courses" passHref>
                    <PrimaryCTAButton endIcon={<School aria-hidden="true" className="icon-anim icon-float" />}>
                      {content.institutions.cta}
                    </PrimaryCTAButton>
                  </Link>
                  <SecondaryCTAButton endIcon={<Description aria-hidden="true" className="icon-anim icon-float" />}>
                    Download Brochure
                  </SecondaryCTAButton>
                </CTAWrapper>
              </ContentBody>
            </Collapse>
          </Subsection>

          {/* Businesses Section */}
          <Subsection>
            <SectionHeaderButton
              revealed={revealed.businesses}
              onClick={() => toggle('businesses')}
            >
              <HeaderContent>
                <SectionIcon className="section-icon">
                  <Business />
                </SectionIcon>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700 }}>
                    {content.businesses.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    {content.businesses.pitch}
                  </Typography>
                </Box>
              </HeaderContent>
              <IconWrapper sx={{ transform: revealed.businesses ? 'rotate(45deg)' : 'rotate(0)' }}>
                <AddCircle />
              </IconWrapper>
            </SectionHeaderButton>
            <Collapse in={revealed.businesses} timeout={500}>
              <ContentBody>
                <TestimonialCard>
                  <QuoteIcon />
                  <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.8, mb: 2 }}>
                    {'\u201C'}{content.businesses.testimonial.text}{'\u201D'}
                  </Typography>
                  <TestimonialAuthor>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {content.businesses.testimonial.author.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {content.businesses.testimonial.author}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {content.businesses.testimonial.role}
                      </Typography>
                      <RatingStars>
                        {[...Array(content.businesses.testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ fontSize: 16 }} />
                        ))}
                      </RatingStars>
                    </Box>
                  </TestimonialAuthor>
                </TestimonialCard>

                <BenefitsList>
                  {content.businesses.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BenefitItem>
                        <benefit.icon className="benefit-icon" />
                        <BenefitText>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {benefit.text}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {benefit.description}
                          </Typography>
                        </BenefitText>
                      </BenefitItem>
                    </motion.div>
                  ))}
                </BenefitsList>
                
                <CTAWrapper>
                  <PrimaryCTAButton endIcon={<EventAvailable aria-hidden="true" className="icon-anim icon-float" />}>
                    {content.businesses.cta}
                  </PrimaryCTAButton>
                  <SecondaryCTAButton startIcon={<AutoGraph aria-hidden="true" className="icon-anim icon-float" />}>
                    View Case Studies
                  </SecondaryCTAButton>
                </CTAWrapper>
              </ContentBody>
            </Collapse>
          </Subsection>
        </AccordionWrapper>

        <PartnerLogos>
          <Typography 
            variant="h6" 
            sx={{ 
              width: '100%', 
              textAlign: 'left', 
              mb: 3,
              color: 'text.secondary' 
            }}
          >
            Trusted by Leading Organizations
          </Typography>
          {partnerLogos.map((partner, index) => (
            <AnimatePresence key={partner.name}>
              {animateLogos && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <PartnerLogo>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {partner.name}
                    </Typography>
                  </PartnerLogo>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </PartnerLogos>
      </Container>
    </PartnersSection>
  );
}
