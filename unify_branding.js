const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Unify Status Chips in Header to Teal
content = content.replace(
  /sx=\{\{ bgcolor: '#[a-fA-F0-9]+', color: '#fff', fontWeight: 800, borderRadius: '4px' \}\}/g,
  "sx={{ bgcolor: '#a7dadb', color: '#091521', fontWeight: 800, borderRadius: '4px' }}"
);

// 2. Fix the grid to be strictly Teal and replace rounded-full
// I'll replace the whole grid section again to be safe and clean
const gridStart = '{/* Solara Ecosystem Grid */}';
const gridEnd = '))}\n            </div>';
const startIndex = content.indexOf(gridStart);
const tempEndIndex = content.indexOf(gridEnd, startIndex);

if (startIndex !== -1 && tempEndIndex !== -1) {
  const endIndex = tempEndIndex + gridEnd.length;
  const tealOnlyGrid = `{/* Solara Ecosystem Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: <Speed />,
                  name: 'Polaris',
                  status: 'LIVE',
                  subtitle: 'Design rigorously in 1 hour',
                  outcome: 'Generate comprehensive learning blueprints instantly so that you can align stakeholders before writing a single module.',
                  cta: 'Get Started',
                  link: 'https://polaris.smartslate.io'
                },
                {
                  icon: <AutoAwesome />,
                  name: 'Constellation',
                  status: 'BETA',
                  subtitle: 'Automate content structuring',
                  outcome: 'Transform raw source material into structured instructional logic automatically, so that you can focus on strategy rather than formatting.',
                  cta: 'Request Access to Beta',
                  isBeta: true
                },
                {
                  icon: <Lightbulb />,
                  name: 'Nova',
                  status: 'BUILDING',
                  subtitle: 'Co-author at scale',
                  outcome: 'Leverage intelligent authoring assistance to produce pedagogically sound content 10x faster without compromising quality.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/nova'
                },
                {
                  icon: <Insights />,
                  name: 'Orbit',
                  status: '2027',
                  subtitle: 'Deliver adaptive trajectories',
                  outcome: 'Provide real-time, personalized learning paths for every individual so that you can ensure maximum engagement and mastery.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/orbit'
                },
                {
                  icon: <Psychology />,
                  name: 'Nebula',
                  status: '2027',
                  subtitle: 'Scale 24/7 support',
                  outcome: 'Deploy an always-on AI tutor to guide learners exactly when they need it most, without overloading your instruction team.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/orbit'
                },
                {
                  icon: <Analytics />,
                  name: 'Spectrum',
                  status: '2027',
                  subtitle: 'Prove financial impact',
                  outcome: 'Connect learning outcomes directly to business KPIs so that you can confidently demonstrate ROI to your executive leadership.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/nova'
                }
              ].map((module, index) => (
                <motion.div key={index} variants={fadeInUp} className="h-full">
                  <MagicCard
                    className="h-full w-full flex-col items-start justify-between p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border-white/10"
                    gradientColor="rgba(167, 218, 219, 0.05)"
                  >
                    <div className="flex w-full items-start justify-between mb-8">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                        style={{ backgroundColor: 'rgba(167, 218, 219, 0.1)', color: '#a7dadb' }}
                      >
                        {module.icon}
                      </div>
                      <div 
                        className="rounded-lg px-3 py-1 text-[10px] font-bold tracking-widest bg-[#a7dadb] text-[#091521] border border-[#a7dadb]/20"
                      >
                        {module.status}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 flex-grow text-left">
                      <h3 className="font-heading text-2xl font-bold text-[#e0e0e0] text-left">
                        {module.name}
                      </h3>
                      <h4 className="text-sm font-semibold tracking-wide uppercase text-[#a7dadb] text-left">
                        {module.subtitle}
                      </h4>
                      <div className="mt-4 h-px w-12 bg-[#a7dadb]/20" />
                      <p className="mt-4 text-base leading-relaxed text-[#b0c5c6] mb-8 text-left">
                        {module.outcome}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 w-full border-t border-white/5">
                      {module.isBeta ? (
                        <Button
                          fullWidth
                          onClick={() => setBetaModalOpen(true)}
                          sx={{
                            py: 1.5,
                            bgcolor: 'rgba(167, 218, 219, 0.1)',
                            color: '#a7dadb',
                            fontWeight: 700,
                            borderRadius: '12px',
                            border: '1px solid rgba(167, 218, 219, 0.3)',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: 'rgba(167, 218, 219, 0.2)',
                            }
                          }}
                        >
                          {module.cta}
                        </Button>
                      ) : (
                        <Link href={module.link || '#'} style={{ textDecoration: 'none' }}>
                          <Button
                            fullWidth
                            sx={{
                              py: 1.5,
                              bgcolor: module.name === 'Polaris' ? '#4F46E5' : 'transparent',
                              color: module.name === 'Polaris' ? '#fff' : '#a7dadb',
                              fontWeight: 700,
                              borderRadius: '12px',
                              border: module.name === 'Polaris' ? 'none' : '1px solid rgba(167, 218, 219, 0.3)',
                              textTransform: 'none',
                              '&:hover': {
                                bgcolor: module.name === 'Polaris' ? '#4338CA' : 'rgba(167, 218, 219, 0.1)',
                              }
                            }}
                          >
                            {module.cta}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </MagicCard>
                </motion.div>
              ))}`;
  content = content.substring(0, startIndex) + tealOnlyGrid + content.substring(endIndex);
}

// 3. Global Padding Consistency (2rem/3rem gap)
// Replace existing padding objects
content = content.replace(/pt: \{ xs: 8, md: 12 \}, pb: \{ xs: 12, md: 16 \}/g, "pt: 8, pb: 12, md: { pt: 12, pb: 16 }");
// For sections with standard py
content = content.replace(/py: \{ xs: 12, md: 16 \}/g, "pt: 8, pb: 12, md: { pt: 12, pb: 16 }");

fs.writeFileSync(filePath, content);
console.log('Teal branding and padding consistency applied to page.tsx');
