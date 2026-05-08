const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Target Audience section
const targetAudienceStart = '{/* Enhanced Target Audience Badges */}';
const targetAudienceEnd = '{/* Why Polaris Section - Completely Revamped */}';
const taStartIndex = content.indexOf(targetAudienceStart);
const taEndIndex = content.indexOf(targetAudienceEnd);

if (taStartIndex !== -1 && taEndIndex !== -1) {
  content = content.substring(0, taStartIndex) + content.substring(taEndIndex);
}

// 2. Revamp Why section header
const whyHeaderStart = '<Typography\n                  variant="overline"\n                  sx={{\n                    color: "#a7dadb"'; // Note: read_file used single quotes, but maybe it changed
// Let's use a regex for flexibility
const whySectionRegex = /<Typography\s+variant="overline"\s+sx=\{\{\s+color: '#a7dadb'[\s\S]+?<\/Box>\s+<\/Typography>\s+<\/Box>\s+<\/motion\.div>/;

const newWhyHeader = `
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
            </motion.div>`;

content = content.replace('{/* Why Polaris Section - Completely Revamped */}', '{/* Why Solara Section - Completely Revamped */}');
content = content.replace(whySectionRegex, newWhyHeader);

// 3. Update features text
content = content.replace(/Polaris generates comprehensive/g, 'Solara Engine generates comprehensive');
content = content.replace(/AI maps every learning objective/g, 'Our intelligent ecosystem maps every learning objective');
content = content.replace(/Advanced AI analyzes requirements/g, 'The Solara Engine analyzes requirements');
content = content.replace(/Polaris embeds ADDIE/g, 'Solara embeds professional instructional design methodologies');
content = content.replace(/every learning experience design is expert-grade/g, 'every output is expert-grade and research-backed');

// 4. Remove "Still Scheduling" section
const stillSchedulingRegex = /<motion\.div variants=\{fadeInUp\}>\s+<Box[\s\S]+?Still Scheduling Stakeholder Meetings?[\s\S]+?<\/Box>\s+<\/motion\.div>/;
content = content.replace(stillSchedulingRegex, '');

fs.writeFileSync(filePath, content);
console.log('Successfully updated page.tsx');
