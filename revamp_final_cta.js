const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The file markers are a bit messy. Let's find the exact block and replace it.
const startMarker = '{/* CTA Section */}';
const endMarker = '{/* JSON-LD */}';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newCTA = `{/* CTA Section */}
      <Box sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
        zIndex: 1
      }}>
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative group w-full overflow-hidden rounded-[2.5rem] bg-[#0d1b2a] border border-white/5 shadow-2xl">
              <ShineBorder
                className="pointer-events-none"
                shineColor={["#a7dadb", "#4F46E5", "#ffffff"]}
                borderWidth={1}
                duration={14}
              />
              <Meteors number={35} />
              
              <div className="relative z-10 p-8 md:p-16">
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                    <div className="text-left flex flex-col items-start">
                      <div className="mb-6 inline-flex items-center rounded-lg bg-[#a7dadb]/10 border border-[#a7dadb]/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#a7dadb] uppercase">
                        THE SMARTSLATE ECOSYSTEM
                      </div>
                      
                      <h2 className="mb-6 font-heading text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-7xl text-left">
                        Ready to Transform <br />
                        <span className="text-[#a7dadb]">Learning?</span>
                      </h2>
                      
                      <div className="mb-8 space-y-4 text-left">
                        <p className="text-xl font-bold text-[#a7dadb]">
                          Free tier. Full power. Forever.
                        </p>
                        <p className="max-w-2xl text-lg leading-relaxed text-[#b0c5c6] md:text-xl">
                          Transform your learning workflow with the most advanced AI-powered design platform. 
                          No credit card. No trials. Just sign up and start building.
                        </p>
                      </div>
                      
                      <div className="w-full sm:w-auto">
                        <Link href="https://www.smartslate.io/contact" style={{ textDecoration: 'none' }}>
                          <ShimmerButton
                            background="#4F46E5"
                            shimmerColor="#ffffff"
                            className="h-14 w-full sm:min-w-[240px] px-10 text-lg font-bold shadow-[0_12px_40px_rgba(79,70,229,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Rocket className="mr-2 h-5 w-5" />
                            Reach Out
                          </ShimmerButton>
                        </Link>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12, md: 5 }}>
                    <div className="flex flex-col gap-4">
                      {[
                        {
                          name: "Solara Engine",
                          outcome: "Design AI-native learning with 10x velocity so that you can skip the chaos and focus on impact.",
                          color: "#a7dadb",
                          icon: <Speed className="h-5 w-5" />
                        },
                        {
                          name: "Ignite Series",
                          outcome: "Deploy industry-validated courses that produce job-ready talent so that you can bridge the gap on Day 1.",
                          color: "#4F46E5",
                          icon: <School className="h-5 w-5" />
                        },
                        {
                          name: "Strategic Architecture",
                          outcome: "Construct bespoke frameworks mapped to unique goals so that you can build uncopyable advantage.",
                          color: "#a7dadb",
                          icon: <Architecture className="h-5 w-5" />
                        }
                      ].map((item, i) => (
                        <MagicCard
                          key={i}
                          className="flex flex-col items-start gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                          gradientColor="rgba(167, 218, 219, 0.05)"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5" style={{ color: item.color }}>
                              {item.icon}
                            </div>
                            <h4 className="font-bold text-base uppercase tracking-wider" style={{ color: item.color }}>
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-sm leading-relaxed text-[#b0c5c6] text-left">
                            {item.outcome}
                          </p>
                        </MagicCard>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </div>
              
              {/* Radial Glow */}
              <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-[2.5rem] bg-[#4F46E5]/20 blur-[120px] pointer-events-none" />
            </div>
          </MotionBox>
        </Container>
      </Box>

      `;
  
  content = content.substring(0, startIndex) + newCTA + content.substring(endIndex);
  fs.writeFileSync(filePath, content);
  console.log('Successfully revamped final ecosystem CTA section');
} else {
  console.log('Markers not found');
}
