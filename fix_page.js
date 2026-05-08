const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The file was corrupted by previous attempt. Let's fix the structure.
// I'll replace the problematic section with the full desired implementation.

const startMarker = '<RevampedHero />';
const endMarker = '{/* Product Showcase Section - Completely Revamped */}';
const startIndex = content.indexOf(startMarker) + startMarker.length;
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newSection = `

      <PolarisIntro />

      {/* Why Solara Section - Completely Revamped */}
      <Box
        component="section"
        aria-label="Why Solara"
        sx={{
          py: 'var(--section-padding-y)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Compelling Header */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ mb: 6, textAlign: 'left' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  <Chip 
                    label="Polaris: LIVE" 
                    size="small" 
                    sx={{ bgcolor: '#10b981', color: '#fff', fontWeight: 800, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label="Constellation: BETA" 
                    size="small" 
                    sx={{ bgcolor: '#4F46E5', color: '#fff', fontWeight: 800, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label="Nova: BUILDING" 
                    size="small" 
                    sx={{ bgcolor: '#f59e0b', color: '#fff', fontWeight: 800, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label="SLATED FOR 2027: Nebula, Orbit, Spectrum" 
                    size="small" 
                    variant="outlined"
                    sx={{ color: '#a7dadb', borderColor: '#a7dadb', fontWeight: 800, borderRadius: '4px' }} 
                  />
                </Stack>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#a7dadb',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    letterSpacing: '0.15em',
                    display: 'block',
                    mb: 2
                  }}
                >
                  THE SOLARA ENGINE ADVANTAGE
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'text.primary',
                    mb: 3,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Why Your Competitors
                  <br />
                  Are Switching to the{' '}
                  <Box component="span" sx={{ color: '#a7dadb' }}>
                    Solara Engine
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    lineHeight: 1.6,
                    maxWidth: '800px',
                    textAlign: 'left'
                  }}
                >
                  Traditional requirements gathering is killing your velocity. Stop wasting time in meetings—
                  start building with the full power of the Solara ecosystem.
                </Typography>
              </Box>
            </motion.div>

            {/* Feature Grid - Enhanced with Problem/Solution Format */}
            <Grid container spacing={4}>
              {[
                {
                  icon: <Speed />,
                  title: '6 Weeks → 1 Hour',
                  subtitle: 'Requirements in Days, Not Months',
                  problem: 'Stop losing momentum to endless stakeholder meetings and revision cycles',
                  solution: 'Solara Engine generates comprehensive learning experience designs in a single session, capturing every requirement while stakeholders\\' insights are fresh',
                  color: '#a7dadb'
                },
                {
                  icon: <Verified />,
                  title: '100% Business Alignment',
                  subtitle: 'Zero Misalignment Risk',
                  problem: 'Tired of building the wrong thing because requirements were misunderstood?',
                  solution: 'Our intelligent ecosystem maps every learning objective directly to business KPIs, ensuring perfect alignment from day one',
                  color: '#10b981'
                },
                {
                  icon: <ErrorOutline />,
                  title: 'Catches 100% of Gaps',
                  subtitle: 'AI-Powered Gap Detection',
                  problem: 'Critical requirements discovered in user testing? Never again.',
                  solution: 'The Solara Engine analyzes requirements against dozens of professional frameworks, catching gaps before they become expensive problems',
                  color: '#4F46E5'
                },
                {
                  icon: <TrendingUp />,
                  title: '10x ROI Documentation',
                  subtitle: 'Executive-Ready Reports',
                  problem: 'Spending hours formatting Word docs that executives skim in 30 seconds?',
                  solution: 'Auto-generate executive summaries, ROI projections, and stakeholder presentations that leadership actually reads and approves',
                  color: '#f59e0b'
                },
                {
                  icon: <Groups />,
                  title: 'Unified Learning Ecosystem',
                  subtitle: 'One Platform, Total Control',
                  problem: 'Fragmented tools and disconnected data destroying your visibility?',
                  solution: 'Design, deliver, and measure in one place. Solara integrates every phase of the learning lifecycle into a single, cohesive engine',
                  color: '#8b5cf6'
                },
                {
                  icon: <WorkspacePremium />,
                  title: 'Expert-Level Quality',
                  subtitle: 'Best Practices Automated',
                  problem: 'Maintaining high standards across distributed teams is nearly impossible',
                  solution: 'Solara embeds professional instructional design methodologies automatically—ensuring every output is expert-grade and research-backed',
                  color: '#ec4899'
                }
              ].map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Box
                      sx={{
                        height: '100%',
                        p: 4,
                        background: 'rgba(167, 218, 219, 0.05)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '2px solid rgba(167, 218, 219, 0.2)',
                        borderRadius: 4,
                        boxShadow: '0 12px 40px rgba(167, 218, 219, 0.1), inset 0 2px 0 rgba(167, 218, 219, 0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '4px',
                          height: '100%',
                          background: feature.color,
                          opacity: 0.7
                        },
                        '&:hover': {
                          borderColor: 'rgba(167, 218, 219, 0.4)',
                          background: 'rgba(167, 218, 219, 0.08)',
                          transform: 'translateY(-12px)',
                          boxShadow: '0 24px 64px rgba(167, 218, 219, 0.25)',
                          '&::before': {
                            opacity: 1,
                            width: '6px'
                          }
                        }
                      }}
                    >
                      {/* Icon Background */}
                      <Box
                        sx={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '16px',
                          background: feature.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                          color: '#fff',
                          fontSize: '2rem'
                        }}
                      >
                        {feature.icon}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          mb: 0.5,
                          color: 'text.primary',
                          fontWeight: 800,
                          fontSize: { xs: '1.5rem', md: '1.75rem' }
                        }}
                      >
                        {feature.title}
                      </Typography>

                      {/* Subtitle */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mb: 3,
                          color: '#a7dadb',
                          fontWeight: 700,
                          fontSize: '1rem'
                        }}
                      >
                        {feature.subtitle}
                      </Typography>

                      {/* Problem Statement */}
                      <Box
                        sx={{
                          mb: 2,
                          p: 2,
                          background: 'rgba(239, 68, 68, 0.05)',
                          borderLeft: '3px solid #ef4444',
                          borderRadius: '0 8px 8px 0'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#ef4444',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 0.5
                          }}
                        >
                          THE PROBLEM
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.6,
                            fontSize: '0.9375rem',
                            fontStyle: 'italic'
                          }}
                        >
                          {feature.problem}
                        </Typography>
                      </Box>

                      {/* Solution Statement */}
                      <Box
                        sx={{
                          p: 2,
                          background: 'rgba(16, 185, 129, 0.05)',
                          borderLeft: '3px solid #10b981',
                          borderRadius: '0 8px 8px 0'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#10b981',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 0.5
                          }}
                        >
                          THE SOLUTION
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.primary',
                            lineHeight: 1.7,
                            fontSize: '0.9375rem',
                            fontWeight: 500
                          }}
                        >
                          {feature.solution}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      `;
  
  content = content.substring(0, startIndex) + newSection + content.substring(endIndex);
  fs.writeFileSync(filePath, content);
  console.log('Successfully fixed page.tsx');
} else {
  console.log('Markers not found', startIndex, endIndex);
}
