"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  School, 
  Architecture, 
  CheckCircle
} from "@mui/icons-material"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
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
      className="relative z-10 w-full bg-[#020C1B] px-6 pt-12 pb-16 md:pt-16 md:pb-24"
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

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((product, idx) => (
            <BlurFade key={product.id} delay={0.2 + idx * 0.1} direction="up" className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-[#a7dadb]/20 flex flex-col items-start justify-between">
                <div className="absolute left-0 top-0 h-full w-1 bg-[#a7dadb]" />
                
                <div className="relative z-10 flex flex-col items-start w-full">
                  <div className="mb-6 flex items-center gap-3 text-[#a7dadb]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a7dadb]/10 border border-[#a7dadb]/20 shadow-[0_0_20px_-5px_rgba(167,218,219,0.3)] group-hover:scale-110 transition-transform duration-300">
                      {product.icon}
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.2em]">{product.name}</span>
                  </div>
                  
                  <h3 className="mb-4 font-heading text-3xl font-extrabold text-[#e0e0e0] md:text-4xl leading-tight">
                    {product.subtitle}
                  </h3>
                  
                  <p className="mb-8 font-body text-lg leading-relaxed text-[#b0c5c6]">
                    {product.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-4">
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
        </div>

        {/* Ecosystem Summary - Spanning full width below columns */}
        <BlurFade delay={0.5} direction="up" className="mt-12">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#10b981]/20">
              <CheckCircle className="h-10 w-10 text-[#10b981]" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#e0e0e0] mb-2">Unified Outcomes</h4>
              <p className="text-lg leading-relaxed text-[#b0c5c6]">
                Whether you need pre-built excellence or bespoke architectures, the entire Smartslate ecosystem is 
                synced to your business KPIs so that you can prove ROI at every step.
              </p>
            </div>
          </div>
        </BlurFade>

      </div>
    </section>
  )
}
