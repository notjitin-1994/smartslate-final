const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure MagicCard is imported
if (!content.includes("import { MagicCard }")) {
  content = content.replace(
    "import PolarisIntro from '@/components/landing/PolarisIntro';",
    "import PolarisIntro from '@/components/landing/PolarisIntro';\nimport { MagicCard } from '@/components/ui/magic-card';"
  );
}

const startMarker = '{/* Feature Grid - Enhanced with Problem/Solution Format */}';
const endMarker = '</MotionBox>\n        </Container>\n      </Box>\n\n      {/* Product Showcase Section';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newGrid = `
            {/* Solara Ecosystem Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: <Speed />,
                  name: 'Polaris',
                  status: 'LIVE',
                  subtitle: 'Design rigorously in 1 hour',
                  outcome: 'Generate comprehensive learning blueprints instantly so that you can align stakeholders before writing a single module.',
                  color: '#10b981'
                },
                {
                  icon: <AutoAwesome />,
                  name: 'Constellation',
                  status: 'BETA',
                  subtitle: 'Automate content structuring',
                  outcome: 'Transform raw source material into structured instructional logic automatically, so that you can focus on strategy rather than formatting.',
                  color: '#4F46E5'
                },
                {
                  icon: <Lightbulb />,
                  name: 'Nova',
                  status: 'BUILDING',
                  subtitle: 'Co-author at scale',
                  outcome: 'Leverage intelligent authoring assistance to produce pedagogically sound content 10x faster without compromising quality.',
                  color: '#f59e0b'
                },
                {
                  icon: <Insights />,
                  name: 'Orbit',
                  status: '2027',
                  subtitle: 'Deliver adaptive trajectories',
                  outcome: 'Provide real-time, personalized learning paths for every individual so that you can ensure maximum engagement and mastery.',
                  color: '#06b6d4'
                },
                {
                  icon: <Psychology />,
                  name: 'Nebula',
                  status: '2027',
                  subtitle: 'Scale 24/7 support',
                  outcome: 'Deploy an always-on AI tutor to guide learners exactly when they need it most, without overloading your instruction team.',
                  color: '#8b5cf6'
                },
                {
                  icon: <Analytics />,
                  name: 'Spectrum',
                  status: '2027',
                  subtitle: 'Prove financial impact',
                  outcome: 'Connect learning outcomes directly to business KPIs so that you can confidently demonstrate ROI to your executive leadership.',
                  color: '#ec4899'
                }
              ].map((module, index) => (
                <motion.div key={index} variants={fadeInUp} className="h-full">
                  <MagicCard
                    className="h-full w-full flex-col items-start justify-between p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border-white/10"
                    gradientColor="rgba(255,255,255,0.05)"
                  >
                    <div className="flex w-full items-start justify-between mb-8">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                        style={{ backgroundColor: \`\${module.color}15\`, color: module.color }}
                      >
                        {module.icon}
                      </div>
                      <div 
                        className="rounded-full px-3 py-1 text-xs font-bold tracking-widest"
                        style={{ 
                          backgroundColor: \`\${module.color}20\`, 
                          color: module.color,
                          border: \`1px solid \${module.color}40\`
                        }}
                      >
                        {module.status}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading text-2xl font-bold text-[#e0e0e0]">
                        {module.name}
                      </h3>
                      <h4 
                        className="text-sm font-semibold tracking-wide uppercase"
                        style={{ color: module.color }}
                      >
                        {module.subtitle}
                      </h4>
                      <div className="mt-4 h-px w-12 bg-white/10" />
                      <p className="mt-4 text-base leading-relaxed text-[#b0c5c6]">
                        {module.outcome}
                      </p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          `;

  content = content.substring(0, startIndex) + newGrid + content.substring(endIndex);
  fs.writeFileSync(filePath, content);
  console.log('Successfully replaced grid in page.tsx');
} else {
  console.log('Markers not found');
}
