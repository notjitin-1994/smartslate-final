'use client';

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  MenuBook, 
  Layers, 
  AutoAwesome, 
  VolumeUp, 
  VolumeOff
} from '@mui/icons-material';

// Styled components following Smartslate design system
const PlayerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.15)',
    borderColor: 'rgba(167, 218, 219, 0.5)',
  },
}));

const PlayerStage = styled(Box)(({ theme }) => ({
  aspectRatio: '16/9',
  position: 'relative',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const SceneCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(167, 218, 219, 0.4)',
    boxShadow: '0 8px 20px rgba(167, 218, 219, 0.15)',
  },
}));

const ControlButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(167, 218, 219, 0.3)',
  backgroundColor: 'rgba(167, 218, 219, 0.05)',
  color: theme.palette.primary.main,
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.15)',
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(167, 218, 219, 0.2)',
  },
  '&.MuiButton-root.Mui-active': {
    backgroundColor: theme.palette.primary.main,
    color: '#091521',
    boxShadow: '0 0 20px rgba(167, 218, 219, 0.3)',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(167, 218, 219, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  },
}));

// Content model for AI Foundations course
const scenes = [
  {
    id: "concept",
    title: "From Concept to Application",
    icon: <AutoAwesome sx={{ fontSize: 20 }} />,
    color: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
    slides: [
      {
        heading: "Translating AI Foundations into Product Value",
        lead: "How we applied course principles to build Smartslate's AI-powered learning platform.",
        body: "The AI Foundations course principles became our implementation patterns: problem decomposition, dataset strategy, evaluation harnesses, safety boundaries, and UX that sets proper user expectations.",
        bullets: [
          "Task & tool design → reliable action chains",
          "Grounding & retrieval → less hallucination, more utility",
          "Evaluations → regression-safe improvements",
          "Human-in-the-loop → quality and trust",
        ],
      },
      {
        heading: "Our LLM Pattern Library",
        lead: "Templates we reused across features to accelerate delivery.",
        body: "We developed a small library of patterns that accelerated delivery and reduced variance in our AI implementations.",
        bullets: [
          "Summarize → structure → verify",
          "Extract → normalize → map",
          "Plan → act → check → revise",
          "Few-shot → tool-use → critique",
        ],
      },
      {
        heading: "Measurable Outcomes",
        lead: "What changed in our product and process after applying AI Foundations.",
        body: "We shipped faster, with clearer interfaces around AI capabilities, measured through cycle time, accuracy in evaluation suites, and user satisfaction scores.",
        callouts: [
          { label: "Cycle Time", value: "Reduced by 40%" },
          { label: "Eval Pass Rate", value: "95% accuracy" },
          { label: "User Satisfaction", value: "4.8/5.0" },
        ],
      },
    ],
  },
  {
    id: "implementation",
    title: "Implementation Patterns",
    icon: <Layers sx={{ fontSize: 20 }} />,
    color: "linear-gradient(135deg, #06B6D4 0%, #10B981 100%)",
    slides: [
      {
        heading: "Problem Decomposition Strategy",
        lead: "Breaking complex AI tasks into manageable, testable components.",
        body: "We learned to decompose complex AI workflows into smaller, testable components that could be validated independently before integration.",
        bullets: [
          "Input validation → preprocessing → AI processing → output validation",
          "Each stage has clear success criteria and error handling",
          "Modular design enables A/B testing of individual components",
          "Clear interfaces between stages reduce coupling",
        ],
      },
      {
        heading: "Dataset Strategy & Grounding",
        lead: "Ensuring AI responses are grounded in reliable data sources.",
        body: "We implemented robust data pipelines and retrieval systems to ensure our AI responses were always grounded in current, accurate information.",
        bullets: [
          "Real-time data ingestion from multiple sources",
          "Vector embeddings for semantic search",
          "Confidence scoring for retrieved information",
          "Fallback mechanisms for data gaps",
        ],
      },
      {
        heading: "Evaluation & Safety Framework",
        lead: "Systematic testing and safety measures for AI systems.",
        body: "We built comprehensive evaluation suites and safety boundaries to ensure our AI systems remained reliable and safe as they evolved.",
        bullets: [
          "Automated regression testing for AI responses",
          "Human-in-the-loop validation for critical decisions",
          "Bias detection and mitigation protocols",
          "Continuous monitoring and alerting systems",
        ],
      },
    ],
  },
  {
    id: "results",
    title: "Results & Impact",
    icon: <MenuBook sx={{ fontSize: 20 }} />,
    color: "linear-gradient(135deg, #10B981 0%, #F59E0B 100%)",
    slides: [
      {
        heading: "Platform Performance Metrics",
        lead: "Quantifiable improvements in our AI-powered learning platform.",
        body: "The application of AI Foundations principles resulted in measurable improvements across all key performance indicators.",
        callouts: [
          { label: "Response Time", value: "< 2 seconds" },
          { label: "Accuracy Rate", value: "94.2%" },
          { label: "User Engagement", value: "+67%" },
        ],
      },
      {
        heading: "Team Capability Growth",
        lead: "How the course strengthened our team's AI competencies.",
        body: "Beyond technical improvements, the course fundamentally changed how our team approaches AI projects and collaborates on AI initiatives.",
        bullets: [
          "Cross-functional AI literacy across all teams",
          "Standardized AI development workflows",
          "Improved communication between technical and non-technical stakeholders",
          "Faster onboarding for new AI team members",
        ],
      },
      {
        heading: "Business Impact",
        lead: "The broader organizational benefits of applying AI Foundations.",
        body: "The structured approach to AI implementation created ripple effects throughout our organization, improving decision-making and innovation capacity.",
        bullets: [
          "Reduced time-to-market for AI features by 60%",
          "Increased customer satisfaction scores by 35%",
          "Improved team productivity and collaboration",
          "Enhanced competitive advantage in AI-powered learning",
        ],
      },
    ],
  },
];

// Utility hooks
const useLocalStorage = (key: string, initial: any) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
};

// Keyboard navigation hook
const useKeyboard = (handlers: {
  next?: () => void;
  prev?: () => void;
  home?: () => void;
  playPause?: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handlers.next?.();
      if (e.key === "ArrowLeft") handlers.prev?.();
      if (e.key.toLowerCase() === "h") handlers.home?.();
      if (e.key === " ") {
        e.preventDefault();
        handlers.playPause?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
};

// Slide component
const Slide = ({ slide }: { slide: any }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Box sx={{ flex: 1, pr: 1 }}>
        {slide.heading && (
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: { xs: 1.5, md: 2 },
              lineHeight: 1.3
            }}
          >
            {slide.heading}
          </Typography>
        )}
        
        {slide.lead && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              color: theme.palette.text.secondary,
              mb: { xs: 1.5, md: 2 },
              fontStyle: 'italic',
              fontWeight: 500
            }}
          >
            {slide.lead}
          </Typography>
        )}
        
        {slide.body && (
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
              lineHeight: 1.7,
              color: theme.palette.text.primary,
              mb: { xs: 2, md: 3 }
            }}
          >
            {slide.body}
          </Typography>
        )}
        
        {slide.bullets && (
          <Box component="ul" sx={{ pl: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
            {slide.bullets.map((bullet: string, i: number) => (
              <Typography 
                key={i} 
                component="li" 
                variant="body1"
                sx={{ 
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                  color: theme.palette.text.primary,
                  mb: { xs: 0.5, md: 1 }
                }}
              >
                {bullet}
              </Typography>
            ))}
          </Box>
        )}
        
        {slide.tags && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {slide.tags.map((tag: string, i: number) => (
              <Chip 
                key={i} 
                label={tag} 
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(167, 218, 219, 0.1)',
                  color: theme.palette.primary.main,
                  border: '1px solid rgba(167, 218, 219, 0.3)',
                  fontWeight: 500
                }}
              />
            ))}
          </Box>
        )}
      </Box>
      
      {slide.callouts && (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 1.5, md: 2 }, 
          mt: { xs: 2, md: 3 },
          flexShrink: 0
        }}>
          {slide.callouts.map((callout: any, i: number) => (
            <SceneCard key={i}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  {callout.label}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.primary.main
                  }}
                >
                  {callout.value}
                </Typography>
              </CardContent>
            </SceneCard>
          ))}
        </Box>
      )}
    </Box>
  );
};

// Main player component
export default function AIFoundationsPlayer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [sceneIndex, setSceneIndex] = useLocalStorage("ai-foundations.sceneIndex", 0);
  const [slideIndex, setSlideIndex] = useLocalStorage("ai-foundations.slideIndex", 0);
  const [isPlaying, setIsPlaying] = useLocalStorage("ai-foundations.autoPlay", false);
  const [muted, setMuted] = useLocalStorage("ai-foundations.muted", true);

  const scene = scenes[sceneIndex];
  const totalSlidesBefore = useMemo(
    () => scenes.slice(0, sceneIndex).reduce((a, s) => a + s.slides.length, 0),
    [sceneIndex]
  );
  const globalSlideIndex = totalSlidesBefore + slideIndex;
  const totalSlides = useMemo(
    () => scenes.reduce((a, s) => a + s.slides.length, 0),
    []
  );

  // Auto-advance functionality
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      goNext();
    }, 8000);
    return () => clearInterval(t);
  }, [isPlaying, sceneIndex, slideIndex]);

  // Navigation functions
  const goNext = () => {
    const lastSlide = slideIndex >= scene.slides.length - 1;
    if (lastSlide) {
      const lastScene = sceneIndex >= scenes.length - 1;
      if (!lastScene) {
        setSceneIndex(sceneIndex + 1);
        setSlideIndex(0);
      }
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const goPrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (sceneIndex > 0) {
      const prevSceneSlides = scenes[sceneIndex - 1].slides.length;
      setSceneIndex(sceneIndex - 1);
      setSlideIndex(prevSceneSlides - 1);
    }
  };

  const goHome = () => {
    setSceneIndex(0);
    setSlideIndex(0);
  };

  // Keyboard navigation
  useKeyboard({ 
    next: goNext, 
    prev: goPrev, 
    home: goHome, 
    playPause: () => setIsPlaying((p: boolean) => !p) 
  });

  return (
    <Container maxWidth="lg" sx={{ 
      py: { xs: 2, md: 4 },
      px: { xs: 2, md: 3 }
    }}>
      <PlayerContainer>
        <PlayerStage>
          {/* Scene background gradient */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: scene.color,
              opacity: 0.05,
              zIndex: 0,
            }}
          />

          {/* Content area */}
          <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {/* Scene header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, md: 1 }, 
              mb: { xs: 1, md: 2 },
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              flexShrink: 0
            }}>
              {scene.icon}
              <Typography variant="body2" sx={{ 
                fontWeight: 500,
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}>
                {scene.title}
              </Typography>
              <Typography variant="body2" sx={{ 
                opacity: 0.6,
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}>
                •
              </Typography>
              <Typography variant="body2" sx={{ 
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}>
                Slide {slideIndex + 1} / {scene.slides.length}
              </Typography>
            </Box>

            {/* Slide content */}
            <Box sx={{ flex: 1, overflow: 'auto', mb: { xs: 2, md: 3 } }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${scene.id}-${slideIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Slide slide={scene.slides[slideIndex]} />
                </motion.div>
              </AnimatePresence>
            </Box>

            {/* Progress bar */}
            <Box sx={{ mb: { xs: 2, md: 3 }, flexShrink: 0 }}>
              <ProgressBar 
                variant="determinate" 
                value={((globalSlideIndex + 1) / totalSlides) * 100} 
              />
            </Box>

            {/* Controls */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between', 
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: { xs: 1.5, sm: 2 },
              flexShrink: 0
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: { xs: 'center', sm: 'flex-start' },
                gap: 1,
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.625rem', sm: '0.75rem' }
              }}>
                <Typography variant="caption" sx={{ fontSize: 'inherit' }}>
                  {globalSlideIndex + 1} / {totalSlides}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, fontSize: 'inherit' }}>
                  •
                </Typography>
                <Typography variant="caption" sx={{ fontSize: 'inherit' }}>
                  {isMobile ? 'Tap to navigate' : 'Space: Play/Pause • ←/→: Navigate • H: Home'}
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: { xs: 'center', sm: 'flex-end' },
                gap: { xs: 0.5, sm: 1 } 
              }}>
                <ControlButton
                  onClick={goHome}
                  size="small"
                  startIcon={<Home sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                >
                  {!isMobile && "Home"}
                </ControlButton>
                
                <ControlButton
                  onClick={goPrev}
                  size="small"
                  startIcon={<ChevronLeft sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                >
                  {!isMobile && "Prev"}
                </ControlButton>
                
                <ControlButton
                  onClick={() => setIsPlaying((p: boolean) => !p)}
                  size="small"
                  className={isPlaying ? 'Mui-active' : ''}
                  startIcon={isPlaying ? <Pause sx={{ fontSize: { xs: 14, sm: 16 } }} /> : <PlayArrow sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                >
                  {!isMobile && (isPlaying ? "Pause" : "Play")}
                </ControlButton>
                
                <ControlButton
                  onClick={goNext}
                  size="small"
                  endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                >
                  {!isMobile && "Next"}
                </ControlButton>
                
                <ControlButton
                  onClick={() => setMuted((m: boolean) => !m)}
                  size="small"
                >
                  {muted ? <VolumeOff sx={{ fontSize: { xs: 14, sm: 16 } }} /> : <VolumeUp sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                </ControlButton>
              </Box>
            </Box>
          </Box>
        </PlayerStage>
      </PlayerContainer>

      {/* Scene navigation */}
      <Box sx={{ 
        mt: { xs: 3, md: 4 }, 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: { xs: 1.5, md: 2 } 
      }}>
        {scenes.map((s, i) => (
          <SceneCard
            key={s.id}
            onClick={() => {
              setSceneIndex(i);
              setSlideIndex(0);
            }}
            sx={{ 
              cursor: 'pointer',
              backgroundColor: i === sceneIndex ? 'rgba(167, 218, 219, 0.1)' : 'transparent',
              borderColor: i === sceneIndex ? 'rgba(167, 218, 219, 0.5)' : 'rgba(167, 218, 219, 0.2)',
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: { xs: 1.5, md: 2 }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    background: s.color,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  {s.title}
                </Typography>
                {s.icon}
              </Box>
              
              <Box sx={{ display: 'flex', gap: { xs: 0.25, md: 0.5 } }}>
                {s.slides.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      height: { xs: 6, md: 8 },
                      flex: 1,
                      borderRadius: 1,
                      border: '1px solid rgba(167, 218, 219, 0.3)',
                      backgroundColor: i === sceneIndex && idx <= slideIndex
                        ? theme.palette.primary.main
                        : 'rgba(167, 218, 219, 0.1)',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </SceneCard>
        ))}
      </Box>
    </Container>
  );
}
