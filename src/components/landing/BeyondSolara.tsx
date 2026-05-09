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
      className="relative z-10 w-full bg-[#020C1B] px-6 pt-[xs: 8, md: 12] pb-[xs: 12, md: 16]"
      style={{
        paddingTop: 'calc(var(--space-xxl) * 1.5)',
        paddingBottom: 'calc(var(--space-xxl) * 2)'
      }}
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
          
          {/* Interactive Visual (The Product Galaxy) */}
          <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#a7dadb]/5 border border-[#a7dadb]/10 md:h-[600px]">
            <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#a7dadb]/10 via-transparent to-transparent" />
            
            {/* Core */}
            <div className="z-20 flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#a7dadb]/20 bg-[#0d1b2a] shadow-[0_0_50px_-10px_#a7dadb]">
              <Rocket className="h-14 w-14 text-[#a7dadb] animate-pulse" />
            </div>

            {/* Inner Orbit (The Engine) */}
            <OrbitingCircles
              className="h-[30px] w-[30px] border-none bg-transparent"
              duration={20}
              delay={20}
              radius={100}
            >
              <Speed className="h-6 w-6 text-[#a7dadb]/40" />
              <AutoAwesome className="h-6 w-6 text-[#a7dadb]/40" />
              <Verified className="h-6 w-6 text-[#a7dadb]/40" />
            </OrbitingCircles>

            {/* Middle Orbit (The Primary Products) */}
            <OrbitingCircles
              className="h-[60px] w-[60px] border-2 border-[#a7dadb]/30 bg-[#0d1b2a] shadow-xl"
              duration={30}
              radius={190}
            >
              <div className="flex items-center justify-center">
                <School className="h-8 w-8 text-[#a7dadb]" />
              </div>
              <div className="flex items-center justify-center">
                <Architecture className="h-8 w-8 text-[#a7dadb]" />
              </div>
            </OrbitingCircles>

            {/* Outer Orbit (Future Modules) */}
            <OrbitingCircles
              className="h-[40px] w-[40px] border border-white/10 bg-white/5 opacity-50"
              duration={40}
              radius={260}
              reverse
            >
              <Insights className="h-5 w-5 text-[#b0c5c6]" />
              <Psychology className="h-5 w-5 text-[#b0c5c6]" />
              <Analytics className="h-5 w-5 text-[#b0c5c6]" />
              <Lightbulb className="h-5 w-5 text-[#b0c5c6]" />
            </OrbitingCircles>
          </div>

          {/* Product Narrative List */}
          <div className="flex flex-col gap-12">
            {products.map((product, idx) => (
              <BlurFade key={product.id} delay={0.2 + idx * 0.1} direction="left">
                <div className="group relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[#a7dadb]/20 before:transition-all hover:before:bg-[#a7dadb]">
                  <div className="mb-4 flex items-center gap-3 text-[#a7dadb]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a7dadb]/10 border border-[#a7dadb]/20 group-hover:scale-110 transition-transform">
                      {product.icon}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">{product.name}</span>
                  </div>
                  <h3 className="mb-4 font-heading text-2xl font-bold text-[#e0e0e0] md:text-3xl">
                    {product.subtitle}
                  </h3>
                  <p className="mb-6 font-body text-lg leading-relaxed text-[#b0c5c6]">
                    {product.description}
                  </p>
                  <Link href={product.href}>
                    <ShimmerButton
                      background="transparent"
                      shimmerColor="#a7dadb"
                      className="h-10 border-[#a7dadb]/30 text-sm font-bold text-[#a7dadb] hover:bg-[#a7dadb]/10"
                    >
                      {product.cta}
                    </ShimmerButton>
                  </Link>
                </div>
              </BlurFade>
            ))}

            {/* Ecosystem Summary */}
            <BlurFade delay={0.5} direction="up">
              <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#10b981]/20">
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
