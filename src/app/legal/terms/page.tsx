'use client';

import { Container, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import StandardHero from '@/components/ui/StandardHero';
import {
  PageWrapper,
  SectionWrapper,
  ContentCard,
  AnimatedChip,
  AccentText,
} from '@/components/landing/styles/LandingStyles';
import {
  Gavel,
  AccountCircle,
  Security,
  Payment,
  Description,
  ContactMail,
  Balance,
  Update,
  CheckCircle,
  Block,
} from '@mui/icons-material';

const TermsSection = styled(Box)(() => ({
  position: 'relative',
  paddingTop: '4rem',
  paddingBottom: '4rem',
}));

const SectionCard = styled(ContentCard)(() => ({
  height: '100%',
  minHeight: 'auto',
}));

const HighlightBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(167, 218, 219, 0.05)',
  border: `1px solid ${theme.palette.primary.main}20`,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backdropFilter: 'blur(8px)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(0.5),
}));

export default function TermsOfService() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageWrapper>
      <StandardHero
        title="Terms of Service"
        subtitle="Transparent Terms, Clear Expectations"
        description="These Terms of Service govern your use of Smartslate's learning management platform and related services. Please read them carefully to understand your rights and responsibilities."
        accentWords={['Terms of Service', 'Clear', 'Expectations']}
      />

      <SectionWrapper className="visible">
        <TermsSection ref={ref}>
          <Container maxWidth="lg">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <Grid container spacing={4}>
                {/* Section 1: Acceptance of Terms */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Gavel sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Terms Overview" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        1. Acceptance of Terms
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        By accessing and using <AccentText>Smartslate&apos;s</AccentText> learning management platform and related services (&quot;Services&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        These Terms of Service (&quot;Terms&quot;) govern your use of the Services provided by <AccentText>Smartslate Learning</AccentText> (&quot;Smartslate,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms constitute a legally binding agreement between you and Smartslate.
                      </Typography>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 2: Definitions */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Description sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Key Terms" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        2. Definitions
                      </Typography>
                      <List dense>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                &quot;Services&quot;
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                The Smartslate learning management platform, including all features, content, and functionality available through our website and applications.
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                &quot;User,&quot; &quot;you,&quot; &quot;your&quot;
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Any individual or entity that accesses or uses our Services.
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                &quot;Content&quot;
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                All information, data, text, software, music, sound, photographs, graphics, video, messages, and other materials available through our Services.
                              </Typography>
                            }
                          />
                        </StyledListItem>
                      </List>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 3: Eligibility */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccountCircle sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="User Requirements" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        3. Eligibility and Registration
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        To use our Services, you must:
                      </Typography>
                      <List dense>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Be at least 18 years old or have parental/guardian consent
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Provide accurate, current, and complete information during registration
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Maintain the security of your account credentials
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Comply with all applicable laws and regulations
                              </Typography>
                            }
                          />
                        </StyledListItem>
                      </List>
                      <HighlightBox>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          You are responsible for all activities that occur under your account. We reserve the right to terminate accounts that violate these Terms.
                        </Typography>
                      </HighlightBox>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 4: Permitted Uses */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CheckCircle sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Permitted Uses" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        4. Use of Services
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        Our Services are provided for <AccentText>educational and professional development</AccentText> purposes. You agree to use our Services only for lawful purposes and in accordance with these Terms.
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        4.1 Permitted Uses
                      </Typography>
                      <List dense>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Accessing and completing educational courses and training materials
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Participating in learning activities and assessments
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Communicating with instructors and other learners
                              </Typography>
                            }
                          />
                        </StyledListItem>
                      </List>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 5: Prohibited Uses */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Block sx={{ color: 'error.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Prohibited Activities" />
                      </Box>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        4.2 Prohibited Uses
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        You agree not to:
                      </Typography>
                      <List dense>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <Block fontSize="small" sx={{ color: 'error.main' }} />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Use the Services for any illegal or unauthorized purpose
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <Block fontSize="small" sx={{ color: 'error.main' }} />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Attempt to gain unauthorized access to our systems
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <Block fontSize="small" sx={{ color: 'error.main' }} />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Share your account credentials with others
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <Block fontSize="small" sx={{ color: 'error.main' }} />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Harass, abuse, or harm other users
                              </Typography>
                            }
                          />
                        </StyledListItem>
                      </List>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 6: Intellectual Property */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Security sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Intellectual Property" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        5. Intellectual Property Rights
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        The Services and their original content, features, and functionality are owned by <AccentText>Smartslate</AccentText> and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        5.1 Our Content
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        All content provided through our Services, including but not limited to courses, videos, text, graphics, logos, and software, is the property of Smartslate or its licensors.
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        5.2 Your Content
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        You retain ownership of any content you submit to our Services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.
                      </Typography>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 7: Payment Terms */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Payment sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Payment & Billing" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        7. Payment Terms
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        Some of our Services may require payment. By purchasing a subscription or course, you agree to pay all applicable fees and taxes.
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        7.1 Pricing and Billing
                      </Typography>
                      <List dense>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                All prices are in Indian Rupees (INR) unless otherwise stated
                              </Typography>
                            }
                          />
                        </StyledListItem>
                        <StyledListItem>
                          <StyledListItemIcon>
                            <CheckCircle fontSize="small" />
                          </StyledListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Payment is due at the time of purchase
                              </Typography>
                            }
                          />
                        </StyledListItem>
                      </List>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, mt: 2, fontWeight: 600 }}>
                        7.2 Refunds and Cancellations
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Course refunds may be available within 7 days of purchase. No refunds for partially used subscriptions.
                      </Typography>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 8: Disclaimers */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Balance sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Disclaimers" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        8. Disclaimers and Limitations
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        8.1 Service Availability
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        We strive to provide reliable Services, but we do not guarantee availability at all times. We may suspend Services for maintenance, updates, or other reasons.
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                        8.2 Educational Content
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        While we strive to provide accurate content, educational outcomes may vary based on individual effort and circumstances.
                      </Typography>
                      <HighlightBox>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          Smartslate shall not be liable for indirect, incidental, or consequential damages arising from your use of our Services.
                        </Typography>
                      </HighlightBox>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 9: Termination */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Block sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Account Termination" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        10. Termination
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        We may terminate or suspend your account and access to our Services at any time, with or without cause, with or without notice, effective immediately.
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        You may terminate your account at any time by contacting us or using the <AccentText>account deletion feature</AccentText> in your account settings.
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Upon termination, your right to use the Services will cease immediately, and we may delete your account and data in accordance with our data retention policies.
                      </Typography>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 10: Governing Law */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Gavel sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Legal Jurisdiction" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        11. Governing Law
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        These Terms shall be governed by and construed in accordance with the <AccentText>laws of India</AccentText>. Any disputes arising out of or relating to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts in India.
                      </Typography>
                      <HighlightBox>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          We encourage you to contact us first to resolve any disputes amicably before pursuing legal action.
                        </Typography>
                      </HighlightBox>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 11: Changes to Terms */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Update sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Terms Updates" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        12. Changes to Terms
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our website and updating the <AccentText>&quot;Last updated&quot;</AccentText> date.
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Your continued use of our Services after such changes constitutes acceptance of the updated Terms.
                      </Typography>
                    </SectionCard>
                  </motion.div>
                </Grid>

                {/* Section 12: Contact */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div variants={itemVariants}>
                    <SectionCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ContactMail sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <AnimatedChip label="Get in Touch" />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        15. Contact Us
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        If you have any questions about these Terms of Service, please contact us:
                      </Typography>
                      <HighlightBox>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          <strong>Email:</strong>{' '}
                          <Link href="mailto:jitin@smartslate.io" style={{ color: '#a7dadb', textDecoration: 'none' }}>
                            jitin@smartslate.io
                          </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          <strong>Phone:</strong> +91 9008898642
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          <strong>Location:</strong> India
                        </Typography>
                      </HighlightBox>
                    </SectionCard>
                  </motion.div>
                </Grid>
              </Grid>

              {/* Footer Note */}
              <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  © {new Date().getFullYear()} Smartslate Learning. All rights reserved.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Link href="/legal/privacy" style={{ color: '#a7dadb', textDecoration: 'none', marginRight: '2rem' }}>
                    Privacy Policy
                  </Link>
                  <Link href="/" style={{ color: '#a7dadb', textDecoration: 'none' }}>
                    Back to Home
                  </Link>
                </Box>
              </Box>
            </motion.div>
          </Container>
        </TermsSection>
      </SectionWrapper>
    </PageWrapper>
  );
}
