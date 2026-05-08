"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Rocket, PlayCircle } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { BlurFade } from "@/components/ui/blur-fade"
import { HyperText } from "@/components/ui/hyper-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function RevampedHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      ref={containerRef}
      className="relative flex w-full flex-col items-center overflow-hidden bg-[#020C1B] px-6 pt-[calc(var(--header-total-height-mobile)+0.2rem)] pb-1 md:pt-[calc(var(--header-total-height-desktop)+0.4rem)] md:pb-2"
    >
      {/* Background Pattern */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-y-[-30%] h-[200%] skew-y-12 fill-[#a7dadb]/20 stroke-[#a7dadb]/20",
        )}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full">
        <div className="flex flex-col items-start text-left w-full">
          <BlurFade delay={0.1} direction="up" className="w-full">
            <div className="mb-6 inline-flex items-center rounded-full border border-[#a7dadb]/20 bg-[#a7dadb]/5 px-3 py-1 text-sm font-medium text-[#a7dadb] backdrop-blur-md">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-[#a7dadb] animate-pulse" />
              Next-Gen Learning Engine
            </div>
          </BlurFade>

          <BlurFade delay={0.2} direction="up" className="w-full">
            <h1 className="mb-6 font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-[#e0e0e0] md:text-7xl lg:text-8xl w-full">
              Stop Juggling <span className="text-[#ef4444]">15 Tools</span>. Start Building with <span className="text-[#a7dadb]">
                <HyperText 
                  className="inline text-[#a7dadb]"
                  duration={1200}
                  animateOnHover={false}
                >
                  Solara
                </HyperText>
              </span>.
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} direction="up" className="w-full">
            <p className="mb-10 w-full font-body text-lg leading-relaxed text-[#b0c5c6] md:text-xl">
              You&apos;re spending thousands on fragmented tools. Losing weeks to disconnected data. 
              Watching learner engagement collapse.{" "}
              <span className="font-bold text-[#a7dadb]">
                Solara replaces your entire learning tech stack with one intelligent platform.
              </span>{" "}
              Design. Deliver. Measure. All unified. All AI-powered. All transformative.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} direction="up" className="w-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="https://polaris.smartslate.io">
                <ShimmerButton
                  background="#4F46E5"
                  shimmerColor="#ffffff"
                  className="h-14 min-w-[220px] px-8 text-lg font-bold shadow-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Forever
                </ShimmerButton>
              </Link>
              
              <Link href="/demo" className="group">
                <button className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border-2 border-[#a7dadb]/30 bg-transparent px-8 text-lg font-bold text-[#a7dadb] transition-all hover:border-[#a7dadb] hover:bg-[#a7dadb]/10 active:scale-[0.98]">
                  <PlayCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Watch Demo
                </button>
              </Link>
            </div>
          </BlurFade>

          <BlurFade delay={0.5} direction="up" className="w-full">
            <div className="mt-10 flex items-center gap-6 border-t border-[#a7dadb]/10 pt-8 w-full">
              <div className="flex flex-col text-left">
                <span className="text-2xl font-bold text-[#a7dadb]">10x</span>
                <span className="text-xs uppercase tracking-wider text-[#7a8a8b]">Design Speed</span>
              </div>
              <div className="h-8 w-px bg-[#a7dadb]/10" />
              <div className="flex flex-col text-left">
                <span className="text-2xl font-bold text-[#a7dadb]">100%</span>
                <span className="text-xs uppercase tracking-wider text-[#7a8a8b]">Unified Data</span>
              </div>
              <div className="h-8 w-px bg-[#a7dadb]/10" />
              <div className="flex flex-col text-left">
                <span className="text-2xl font-bold text-[#a7dadb]">AI</span>
                <span className="text-xs uppercase tracking-wider text-[#7a8a8b]">Powered Logic</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#020C1B] to-transparent" />
    </section>
  )
}
