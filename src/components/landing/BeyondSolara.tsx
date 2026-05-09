"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  School, 
  Architecture, 
  Rocket, 
  CheckCircle,
  Groups,
  Description,
  Psychology,
  Speed,
  AutoAwesome,
  TrendingUp,
  Verified,
  Analytics,
  Insights,
  Lightbulb
} from "@mui/icons-material"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function BeyondSolara() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const products = [
    {
      id: "ignite",
      icon: <School />,
      name: "Ignite Series",
      subtitle: "The Market-Ready Talent Pipeline",
      description: "Stop graduating students nobody can hire. We bridge the gap between academic theory and real-world impact so that you can cultivate high-performing teams that make an impact from Day 1.",
      href: "/courses",
      cta: "Explore Courses"
    },
    {
      id: "ssa",
      icon: <Architecture />,
      name: "Strategic Skills Architecture",
      subtitle: "Your Proprietary Business DNA",
      description: "Off-the-shelf training teaches your team to be average. We architect bespoke learning experiences tailored to your unique culture and challenges so that you can build an uncopyable competitive advantage.",
      href: "/contact",
      cta: "Architect Your Advantage"
    }
  ]

  return (
    <section 
      ref={ref}
      className="relative z-10 w-full bg-[#020C1B] px-6 pt-8 pb-12 md:pt-12 md:pb-16"
    >
      <div className="mx-auto max-w-[1200px] w-full">
        
        {/* Full-Width Header */}
        <div className="mb-20 w-full text-left">
          <BlurFade delay={0.1} direction="up" className="w-full">
            <span className="block text-sm font-extrabold tracking-[0.2em] text-[#a7dadb] uppercase mb-4">
              BEYOND SOLARA
            </span>
            <h2 className="mb-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-[#e0e0e0] md:text-6xl lg:text-7xl w-full">
              One Ecosystem. <br />
              Every <span className="text-[#a7dadb]">Learning Need</span>.
            </h2>
            <p className="max-w-none w-full font-body text-xl leading-relaxed text-[#b0c5c6] md:text-2xl">
              Solara is the engine, but the Smartslate ecosystem is the journey. 
              We combine AI-native technology with industry-validated training and bespoke architecture 
              so that you can solve the skills gap from every angle.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* Brand Style Compliant Image - Mobile Background / Desktop Asset */}
          <BlurFade delay={0.2} direction="right" className="hidden lg:block relative h-[500px] w-full overflow-hidden rounded-3xl border border-[#a7dadb]/20 md:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop" 
              alt="Smartslate Ecosystem" 
              className="h-full w-full object-cover opacity-60 grayscale-[0.3] brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#020C1B] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          </BlurFade>

          {/* Product Narrative List */}
          <div className="flex flex-col gap-12">
            {products.map((product, idx) => (
              <BlurFade key={product.id} delay={0.2 + idx * 0.1} direction="left">
                <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-[#a7dadb]/20">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#a7dadb]/40 via-[#a7dadb]/10 to-transparent" />
                  
                  <div className="relative z-10 flex flex-col items-start">
                    <div className="mb-6 flex items-center gap-3 text-[#a7dadb]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a7dadb]/10 border border-[#a7dadb]/20 shadow-[0_0_20px_-5px_rgba(167,218,219,0.3)] group-hover:scale-110 transition-transform duration-300">
                        {product.icon}
                      </div>
                      <span className="text-sm font-black uppercase tracking-[0.2em]">{product.name}</span>
                    </div>
                    
                    <h3 className="mb-4 font-heading text-3xl font-extrabold text-[#e0e0e0] md:text-4xl leading-tight">
                      {product.subtitle}
                    </h3>
                    
                    <p className="mb-8 font-body text-lg leading-relaxed text-[#b0c5c6] max-w-2xl">
                      {product.description}
                    </p>
                    
                    <Link href={product.href}>
                      <ShimmerButton
                        background="#4F46E5"
                        shimmerColor="#ffffff"
                        className="h-12 px-8 text-base font-bold shadow-[0_12px_32px_rgba(79,70,229,0.3)] transition-transform hover:scale-[1.03] active:scale-[0.97]"
                      >
                        {product.cta}
                      </ShimmerButton>
                    </Link>
                  </div>
                </div>
              </BlurFade>
            ))}

            {/* Ecosystem Summary */}
            <BlurFade delay={0.5} direction="up">
              <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#10b981]/20">
                    <CheckCircle className="h-6 w-6 text-[#10b981]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#e0e0e0]">Unified Outcomes</h4>
                    <p className="text-sm leading-relaxed text-[#b0c5c6]">
                      Whether you need pre-built excellence or bespoke architectures, the entire Smartslate ecosystem is 
                      synced to your business KPIs so that you can prove ROI at every step.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

        </div>

      </div>
    </section>
  )
}
