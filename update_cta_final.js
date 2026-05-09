const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const ctaStart = '{/* CTA Section */}';
const ctaEnd = '/* JSON-LD */';
const startIndex = content.indexOf(ctaStart);
const endIndex = content.indexOf(ctaEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newCTA = "{/* CTA Section */}\n" +
"      <Box sx={{\n" +
"        pt: 8, pb: 12, md: { pt: 12, pb: 16 },\n" +
"        position: 'relative',\n" +
"        zIndex: 1\n" +
"      }}>\n" +
"        <Container maxWidth=\"lg\">\n" +
"          <MotionBox\n" +
"            initial=\"hidden\"\n" +
"            whileInView=\"visible\"\n" +
"            viewport={{ once: true }}\n" +
"            variants={fadeInUp}\n" +
"          >\n" +
"            <div className=\"relative group w-full overflow-hidden rounded-[2.5rem] bg-[#0d1b2a] border border-white/5 shadow-2xl\">\n" +
"              <ShineBorder\n" +
"                className=\"pointer-events-none\"\n" +
"                shineColor={[\"#a7dadb\", \"#4F46E5\", \"#ffffff\"]}\n" +
"                borderWidth={1}\n" +
"                duration={10}\n" +
"              />\n" +
"              <Meteors number={30} />\n" +
"              \n" +
"              <div className=\"relative z-10 p-8 md:p-16\">\n" +
"                <Grid container spacing={8} alignItems=\"center\">\n" +
"                  <Grid size={{ xs: 12, md: 7 }}>\n" +
"                    <div className=\"text-left\">\n" +
"                      <div className=\"mb-6 inline-flex items-center rounded-lg bg-[#a7dadb]/10 border border-[#a7dadb]/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#a7dadb] uppercase\">\n" +
"                        THE SMARTSLATE ECOSYSTEM\n" +
"                      </div>\n" +
"                      \n" +
"                      <h2 className=\"mb-6 font-heading text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-6xl text-left\">\n" +
"                        Ready to Orchestrate <br />\n" +
"                        <span className=\"text-[#a7dadb]\">Your Learning Future?</span>\n" +
"                      </h2>\n" +
"                      \n" +
"                      <p className=\"mb-10 max-w-2xl text-lg leading-relaxed text-[#b0c5c6] md:text-xl text-left\">\n" +
"                        Transform every phase of your talent lifecycle—from intelligent design to industry-validated training and bespoke architecture. \n" +
"                        <br /><br />\n" +
"                        <Box component=\"span\" sx={{ color: '#a7dadb', fontWeight: 700 }}>Smartslate is the only unified ecosystem built for the AI era.</Box>\n" +
"                      </p>\n" +
"                      \n" +
"                      <div className=\"flex flex-col gap-4 sm:flex-row sm:items-center justify-start\">\n" +
"                        <Link href=\"https://www.smartslate.io/contact\" style={{ textDecoration: 'none' }}>\n" +
"                          <ShimmerButton\n" +
"                            background=\"#4F46E5\"\n" +
"                            shimmerColor=\"#ffffff\"\n" +
"                            className=\"h-14 min-w-[240px] px-10 text-lg font-bold shadow-[0_12px_40px_rgba(79,70,229,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]\"\n" +
"                          >\n" +
"                            <Rocket className=\"mr-2 h-5 w-5\" />\n" +
"                            Reach Out\n" +
"                          </ShimmerButton>\n" +
"                        </Link>\n" +
"                      </div>\n" +
"                    </div>\n" +
"                  </Grid>\n" +
"\n" +
"                  <Grid size={{ xs: 12, md: 5 }}>\n" +
"                    <div className=\"flex flex-col gap-4\">\n" +
"                      {[\n" +
"                        {\n" +
"                          name: \"Solara Engine\",\n" +
"                          outcome: \"Design AI-native learning with 10x velocity so that you can skip the chaos and focus on impact.\",\n" +
"                          color: \"#a7dadb\"\n" +
"                        },\n" +
"                        {\n" +
"                          name: \"Ignite Series\",\n" +
"                          outcome: \"Deploy industry-validated courses that produce job-ready talent so that you can bridge the gap on Day 1.\",\n" +
"                          color: \"#4F46E5\"\n" +
"                        },\n" +
"                        {\n" +
"                          name: \"Strategic Architecture\",\n" +
"                          outcome: \"Construct bespoke frameworks mapped to unique goals so that you can build uncopyable advantage.\",\n" +
"                          color: \"#a7dadb\"\n" +
"                        }\n" +
"                      ].map((item, i) => (\n" +
"                        <MagicCard\n" +
"                          key={i}\n" +
"                          className=\"flex flex-col items-start gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm\"\n" +
"                          gradientColor=\"rgba(167, 218, 219, 0.03)\"\n" +
"                        >\n" +
"                          <h4 className=\"font-bold text-lg uppercase tracking-wider\" style={{ color: item.color }}>{item.name}</h4>\n" +
"                          <p className=\"text-sm text-[#b0c5c6] leading-relaxed\">{item.outcome}</p>\n" +
"                        </MagicCard>\n" +
"                      ))}\n" +
"                    </div>\n" +
"                  </Grid>\n" +
"                </Grid>\n" +
"              </div>\n" +
"              \n" +
"              {/* Radial Glow */}\n" +
"              <div className=\"absolute -bottom-24 -right-24 h-96 w-96 rounded-[2.5rem] bg-[#4F46E5]/20 blur-[120px] pointer-events-none\" />\n" +
"            </div>\n" +
"          </MotionBox>\n" +
"        </Container>\n" +
"      </Box>\n" +
"\n" +
"      {";
  content = content.substring(0, startIndex) + newCTA + content.substring(endIndex);
  fs.writeFileSync(filePath, content);
  console.log('Successfully revamped ecosystem CTA section');
} else {
  console.log('Markers not found', startIndex, endIndex);
}
