"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  Palette, 
  Type, 
  Download,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Brand Constants ---
const BRAND_TEAL = '#a7dadb';
const BRAND_INDIGO = '#4F46E5';

const ASSET_URLS = {
  LOGO_PNG: "https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/logo.png",
  SWIRL_PNG: "https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/logo-swirl.png",
};

// --- Data ---
const BRAND_COLORS = [
  {
    name: 'Smart Teal',
    hex: '#A7DADB',
    rgb: '167, 218, 219',
    role: 'Accent',
    description: 'The core brand signature. Used for highlights, active states, and fresh visual accents.',
  },
  {
    name: 'Action Indigo',
    hex: '#4F46E5',
    rgb: '79, 70, 229',
    role: 'Primary CTA',
    description: 'Primary interaction color. Provides high-contrast signaling for buttons and key links.',
  },
  {
    name: 'Deep Slate',
    hex: '#020C1B',
    rgb: '2, 12, 27',
    role: 'Background',
    description: 'The foundational canvas. Used for primary dark-mode backgrounds.',
  },
  {
    name: 'Surface Slate',
    hex: '#142433',
    rgb: '20, 36, 51',
    role: 'Surface',
    description: 'Interactive surface areas. Used to separate content sections.',
  },
  {
    name: 'Secondary Text',
    hex: '#b0c5c6',
    rgb: '176, 197, 198',
    role: 'Text',
    description: 'Supporting typography and metadata.',
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

  const isLightColor = color.hex === '#A7DADB' || color.hex === '#b0c5c6';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="h-32 w-full relative flex items-end p-6" style={{ backgroundColor: color.hex }}>
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]" />
        <div className={cn("relative z-10 w-full flex justify-between items-end", isLightColor ? "text-slate-900" : "text-white")}>
          <h3 className="text-xl font-bold tracking-tight">{color.name}</h3>
          <button 
            onClick={() => copyToClipboard(color.hex)}
            className={cn("p-2 rounded-full transition-all", isLightColor ? "bg-black/10 hover:bg-black/20" : "bg-white/20 hover:bg-white/30")}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4 text-left">
        <p className="text-sm text-slate-400 font-medium">{color.description}</p>
        <div className="grid grid-cols-1 gap-2">
          {[{ label: 'HEX', value: color.hex }, { label: 'RGB', value: color.rgb }].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-left">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{item.label}</span>
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
const SpecimenTag = ({ label, font, usage }: { label: string, font: string, usage: string }) => (
  <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl shadow-sm hover:border-teal-500/30 transition-colors text-left">
    <div className="text-left">
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">{label}</span>
      <span className="font-quicksand font-bold text-sm text-teal-400">{font}</span>
    </div>
    <div className="text-right">
      <span className="font-lato text-xs text-slate-500 italic block">{usage}</span>
    </div>
  </div>
);

const AssetCard = ({ title, description, spec, downloadUrl, displayUrl }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="mb-4 text-left">
        <h3 className="font-quicksand text-lg font-bold text-white group-hover:text-teal-400 transition-colors">{title}</h3>
        <p className="font-lato text-sm text-slate-400">{description}</p>
      </div>
      <div className="relative aspect-video bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-8">
        {isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-8 border border-dashed border-teal-500/30 rounded-lg z-0" />
        )}
        <div className="z-10 bg-slate-800/50 p-6 rounded-xl shadow-2xl scale-100 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center backdrop-blur-sm">
          <img src={displayUrl} alt={title} className="max-h-24 w-auto object-contain" />
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-500 uppercase tracking-tighter z-20">
          {spec.minScale}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <a 
          href={downloadUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download size={12} /> PNG
        </a>
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
      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden border-b border-slate-800">
        <TechnicalBackground />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/5 backdrop-blur-sm mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-teal-400">Design Language v1.0</span>
            </div>
            <h1 className="font-quicksand text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 text-left">
              Visual <span className="text-teal-400">Identity</span>.
            </h1>
            <p className="max-w-2xl text-xl text-slate-400 leading-relaxed mb-12 text-left">
              A comprehensive system for the Smartslate brand ecosystem. 
              Engineering innovation through minimalist clarity and professional motion.
            </p>
            <div className="flex justify-start gap-4">
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
          <div className="flex items-center gap-3 mb-16 text-left">
            <Palette className="text-teal-400" size={32} />
            <div className="text-left">
              <h2 className="font-quicksand text-4xl font-bold text-white text-left">Color System</h2>
              <p className="text-slate-400 text-sm text-left">Foundational palette for the digital ecosystem.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAND_COLORS.map(c => <ColorCard key={c.hex} color={c} />)}
          </div>
        </div>
      </section>
      {/* --- Typography Section --- */}
      <section id="typography" className="py-32 px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <div className="sticky top-32 text-left">
                <div className="flex items-center gap-3 mb-6 text-left">
                  <Type className="text-teal-400" size={32} />
                  <h2 className="font-quicksand text-4xl font-bold text-white text-left">Typography</h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-8 text-left">
                  We use a dual-font system to balance approachability with professional clarity.
                </p>
                <div className="space-y-4">
                  <SpecimenTag label="Display" font="Quicksand" usage="Headers & UI Titles" />
                  <SpecimenTag label="Body" font="Lato" usage="General UI & Body Copy" />
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-24 text-left">
              <div className="border-t border-slate-800 pt-8">
                <div className="flex justify-between items-baseline mb-8">
                  <h3 className="font-quicksand text-3xl font-bold text-white">Quicksand</h3>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Geometric Sans</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <p className="font-quicksand text-8xl font-bold text-teal-400">Aa</p>
                  <div className="space-y-4 font-quicksand text-left">
                    <p className="text-slate-300 text-left">Quicksand provides a soft, modern aesthetic. Its rounded terminals communicate friendliness while maintaining order.</p>
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
                  <div className="space-y-4 text-left">
                    <p className="text-slate-400 text-left">Lato offers high legibility for body text. It is transparent and neutral, allowing content to remain the focus.</p>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-left">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6 text-left">
                <Layers className="text-teal-400" size={32} />
                <h2 className="font-quicksand text-4xl font-bold text-white text-left">Brand Assets</h2>
              </div>
              <p className="text-slate-400 max-w-xl text-left">
                The primary identifiers of the Smartslate brand. Available for high-resolution distribution.
              </p>
            </div>
            <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2">
              <Download size={18} /> Master ZIP Package
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AssetCard 
              title="Logotype" 
              description="The primary brand signature. Usage on dark backgrounds." 
              spec={{ minScale: "32px Height" }}
              downloadUrl={ASSET_URLS.LOGO_PNG}
              displayUrl={ASSET_URLS.LOGO_PNG}
            />
            <AssetCard 
              title="The Swirl" 
              description="Our core icon mark for social and small UI elements." 
              spec={{ minScale: "16px Width" }}
              downloadUrl={ASSET_URLS.SWIRL_PNG}
              displayUrl={ASSET_URLS.SWIRL_PNG}
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-24 px-8 border-t border-slate-800 text-left">
        <div className="max-w-6xl mx-auto flex flex-col items-start space-y-6">
          <div className="flex justify-start gap-3">
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
