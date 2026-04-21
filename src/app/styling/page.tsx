"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Layers, 
  Sparkles,
  Copy, 
  Check, 
  Info, 
  Zap, 
  Layout, 
  Palette, 
  CheckCircle2, 
  XCircle,
  ArrowRightLeft,
  Download, 
  Maximize2, 
  Type, 
  Move,
  ChevronRight,
  MousePointer2,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Brand Constants ---
const BRAND_TEAL = '#a7dadb';
const BRAND_INDIGO = '#4F46E5';
const BG_DEEP = '#020C1B';
const BG_PAPER = '#0d1b2a';
const BG_SURFACE = '#142433';

// --- Data ---
const BRAND_COLORS = [
  {
    name: 'Smart Teal',
    hex: '#A7DADB',
    rgb: '167, 218, 219',
    hsl: '181°, 41%, 76%',
    role: 'Accent',
    description: 'The core brand signature. Used for highlights, active states, and fresh visual accents.',
    contrastWhite: 'Fail',
    contrastBlack: 'Pass',
  },
  {
    name: 'Action Indigo',
    hex: '#4F46E5',
    rgb: '79, 70, 229',
    hsl: '243°, 75%, 59%',
    role: 'Primary CTA',
    description: 'Primary interaction color. Provides high-contrast signaling for buttons and key links.',
    contrastWhite: 'Pass',
    contrastBlack: 'Fail',
  },
  {
    name: 'Deep Slate',
    hex: '#020C1B',
    rgb: '2, 12, 27',
    hsl: '222°, 47%, 11%',
    role: 'Background',
    description: 'The foundational canvas. Used for primary dark-mode backgrounds.',
    contrastWhite: 'Pass',
    contrastBlack: 'Fail',
  },
  {
    name: 'Surface Slate',
    hex: '#142433',
    rgb: '20, 36, 51',
    hsl: '215°, 32%, 17%',
    role: 'Surface',
    description: 'Interactive surface areas. Used to separate content sections.',
    contrastWhite: 'Pass',
    contrastBlack: 'Fail',
  },
  {
    name: 'Secondary Text',
    hex: '#b0c5c6',
    rgb: '176, 197, 198',
    hsl: '181°, 15%, 62%',
    role: 'Text',
    description: 'Supporting typography and metadata.',
    contrastWhite: 'Fail',
    contrastBlack: 'Pass',
  }
];

const BRAND_GRADIENTS = [
  {
    name: 'The Smart Glow',
    from: '#A7DADB',
    to: '#4F46E5',
    description: 'The primary transition from brand signature to action color.'
  },
  {
    name: 'Deep Horizon',
    from: '#0d1b2a',
    to: '#020C1B',
    description: 'A subtle transition for large surface areas.'
  }
];

// --- Sub-components ---

const TechnicalBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
    <div 
      className="absolute inset-0 opacity-[0.1]"
      style={{
        backgroundImage: `linear-gradient(to right, ${BRAND_TEAL} 1px, transparent 1px), linear-gradient(to bottom, ${BRAND_TEAL} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}
    />
    <motion.div
      animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.9, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full"
    />
  </div>
);

const ColorCard = ({ color }: any) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="h-32 w-full relative flex items-end p-6" style={{ backgroundColor: color.hex }}>
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]" />
        <div className="relative z-10 w-full flex justify-between items-end text-black">
          <h3 className={cn("text-xl font-bold tracking-tight", color.contrastBlack === 'Pass' ? "text-black" : "text-white")}>
            {color.name}
          </h3>
          <button 
            onClick={() => copyToClipboard(color.hex)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-sm text-slate-400 font-medium">{color.description}</p>
        <div className="grid grid-cols-1 gap-2">
          {[{ label: 'HEX', value: color.hex }, { label: 'RGB', value: color.rgb }].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest">{item.label}</span>
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
const SpecimenTag = ({ label, font, usage }: { label: string, font: string, usage: string }) => (
  <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl shadow-sm hover:border-teal-500/30 transition-colors">
    <div>
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">{label}</span>
      <span className="font-quicksand font-bold text-sm text-teal-400">{font}</span>
    </div>
    <div className="text-right">
      <span className="font-lato text-xs text-slate-500 italic block">{usage}</span>
    </div>
  </div>
);

const AssetCard = ({ title, description, children, spec }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="mb-4">
        <h3 className="font-quicksand text-lg font-bold text-white group-hover:text-teal-400 transition-colors">{title}</h3>
        <p className="font-lato text-sm text-slate-400">{description}</p>
      </div>
      <div className="relative aspect-video bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-8 border border-dashed border-teal-500/30 rounded-lg" />
        )}
        <div className="z-10 bg-slate-800 p-8 rounded-xl shadow-2xl scale-100 group-hover:scale-105 transition-transform duration-500">
          {children}
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          {spec.minScale}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
          <Download size={12} /> PNG
        </button>
        <button className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
          <Download size={12} /> SVG
        </button>
      </div>
    </motion.div>
  );
};
export default function StylingWikiPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="bg-[#020C1B] text-slate-200 min-h-screen font-lato selection:bg-teal-500/30">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=JetBrains+Mono&display=swap');
        .font-quicksand { font-family: 'Quicksand', sans-serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
      `}} />

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-800 bg-[#020C1B]/80 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          <span className="font-quicksand font-bold text-xl tracking-tight text-white">Smartslate</span>
          <span className="ml-2 px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-teal-400 border border-slate-700">WIKI v1.0</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#colors" className="hover:text-teal-400 transition-colors">Colors</a>
          <a href="#typography" className="hover:text-teal-400 transition-colors">Typography</a>
          <a href="#assets" className="hover:text-teal-400 transition-colors">Assets</a>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all font-bold shadow-lg shadow-indigo-600/20">
            Download Kit
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden">
        <TechnicalBackground />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-quicksand text-6xl md:text-8xl font-bold tracking-tight text-white mb-8">
              Visual <span className="text-teal-400">Identity</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed mb-12">
              A comprehensive system for the Smartslate brand ecosystem. 
              Engineering innovation through minimalist clarity and professional motion.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#colors" className="flex items-center gap-2 px-8 py-4 bg-teal-500 text-black font-bold rounded-xl hover:scale-105 transition-all">
                The Palette <ArrowRight size={18} />
              </a>
              <a href="#assets" className="flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all">
                <Download size={18} /> Brand Kit
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
      {/* --- Colors Section --- */}
      <section id="colors" className="py-32 px-8 border-t border-slate-800 bg-slate-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Palette className="text-teal-400" size={32} />
            <div>
              <h2 className="font-quicksand text-4xl font-bold text-white">Color System</h2>
              <p className="text-slate-400 text-sm">Foundational palette for the digital ecosystem.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAND_COLORS.map(c => <ColorCard key={c.hex} color={c} />)}
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRAND_GRADIENTS.map(g => (
              <div key={g.name} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30" style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }} />
                <h4 className="relative z-10 font-bold text-xl text-white mb-2">{g.name}</h4>
                <p className="relative z-10 text-sm text-slate-400 italic mb-4">{g.description}</p>
                <div className="relative z-10 flex gap-4 font-mono text-[10px] text-slate-500">
                  <span className="px-2 py-1 bg-black/40 rounded border border-white/5">{g.from}</span>
                  <span className="px-2 py-1 bg-black/40 rounded border border-white/5">{g.to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Typography Section --- */}
      <section id="typography" className="py-32 px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <Type className="text-teal-400" size={32} />
                  <h2 className="font-quicksand text-4xl font-bold text-white">Typography</h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-8">
                  We use a dual-font system to balance approachability with professional clarity.
                </p>
                <div className="space-y-4">
                  <SpecimenTag label="Display" font="Quicksand" usage="Headers & UI Titles" />
                  <SpecimenTag label="Body" font="Lato" usage="General UI & Body Copy" />
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-24">
              <div className="border-t border-slate-800 pt-8">
                <div className="flex justify-between items-baseline mb-8">
                  <h3 className="font-quicksand text-3xl font-bold text-white">Quicksand</h3>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Geometric Sans</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <p className="font-quicksand text-8xl font-bold text-teal-400">Aa</p>
                  <div className="space-y-4 font-quicksand">
                    <p className="text-slate-300">Quicksand provides a soft, modern aesthetic. Its rounded terminals communicate friendliness while maintaining order.</p>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-tighter text-slate-500">
                      <span>Light</span><span>Regular</span><span>Medium</span><span className="text-white">Bold</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-8">
                <div className="flex justify-between items-baseline mb-8">
                  <h3 className="font-lato text-3xl font-bold text-white">Lato</h3>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Humanist Sans</span>
                </div>
                <div className="grid grid-cols-2 gap-8 font-lato">
                  <p className="text-8xl font-normal text-slate-200">Aa</p>
                  <div className="space-y-4">
                    <p className="text-slate-400">Lato offers high legibility for body text. It is transparent and neutral, allowing content to remain the focus.</p>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-tighter text-slate-500">
                      <span>Thin</span><span className="text-white">Regular</span><span>Italic</span><span>Bold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- Assets Section --- */}
      <section id="assets" className="py-32 px-8 border-t border-slate-800 bg-slate-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-teal-400" size={32} />
                <h2 className="font-quicksand text-4xl font-bold text-white">Brand Assets</h2>
              </div>
              <p className="text-slate-400 max-w-xl">
                The primary identifiers of the Smartslate brand. Available for high-resolution distribution.
              </p>
            </div>
            <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2">
              <Download size={18} /> Master ZIP Package
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AssetCard title="Logotype" description="The primary brand signature. Usage on dark backgrounds." spec={{ minScale: "32px Height" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded rotate-45" />
                </div>
                <span className="font-quicksand text-3xl font-bold text-white tracking-tight">Smartslate</span>
              </div>
            </AssetCard>
            <AssetCard title="The Swirl" description="Our core icon mark for social and small UI elements." spec={{ minScale: "16px Width" }}>
              <div className="relative">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50" stroke={BRAND_INDIGO} strokeWidth="8" strokeLinecap="round" />
                  <path d="M50 30C39 30 30 39 30 50C30 61 39 70 50 70" stroke={BRAND_TEAL} strokeWidth="8" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="8" fill={BRAND_TEAL} />
                </svg>
              </div>
            </AssetCard>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-24 px-8 border-t border-slate-800 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex justify-center gap-3">
             <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
             <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">End of Documentation</p>
          <p className="text-slate-400 text-xs italic">
            Maintaining visual integrity since 2025. Smartslate is a registered trademark of SmartslateSolara.
          </p>
        </div>
      </footer>
    </div>
  );
}
