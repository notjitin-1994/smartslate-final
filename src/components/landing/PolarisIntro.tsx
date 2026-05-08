"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Speed, AutoAwesome, Verified, TrendingUp, Rocket, CalendarMonth, Loop, ErrorOutline, Description, Straighten, Close, CheckCircle } from "@mui/icons-material"
import { PlayCircle } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { ShineBorder } from "@/components/ui/shine-border"
import { AnimatedList } from "@/components/ui/animated-list"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Box, Typography, Stack, Grid, Button } from "@mui/material"

export default function PolarisIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const oldWayItems = [
    {
      icon: <CalendarMonth />,
      title: "4-6 Weeks of Stakeholder Meetings",
      description: "Endless calendaring, conflicting schedules, and meeting fatigue"
    },
    {
      icon: <Loop />,
      title: "7+ Revision Cycles",
      description: '"Actually, what we meant was..." after you\'ve already built it'
    },
    {
      icon: <ErrorOutline />,
      title: "Missed Requirements",
      description: "Critical business objectives discovered in user testing"
    },
    {
      icon: <Description />,
      title: "Manual Documentation Hell",
      description: "Hours spent formatting Word docs no one reads"
    },
    {
      icon: <Straighten />,
      title: "Misalignment Risk",
      description: "Constant fear you missed something important"
    }
  ]

  const polarisWayItems = [
    {
      icon: <Speed />,
      title: "Intelligent Blueprinting",
      description: "Convert ambiguous business goals into rigorous instructional architectures in under 45 minutes."
    },
    {
      icon: <AutoAwesome />,
      title: "Adaptive Discovery Engine",
      description: "Our two-phase discovery system asks the right questions to uncover hidden learning gaps automatically."
    },
    {
      icon: <Verified />,
      title: "Stakeholder-Ready Deliverables",
      description: "Generate professional PDFs, slide decks, and Word docs that speak the language of leadership."
    },
    {
      icon: <Description />,
      title: "27+ Component Architecture",
      description: "Complete coverage from terminal learning objectives to detailed budget and resource planning."
    },
    {
      icon: <TrendingUp />,
      title: "Data-Driven Strategy",
      description: "Map every learning module directly to business KPIs for verifiable impact and ROI."
    }
  ]

  const transformationSteps = [
    { step: "1", label: "Business Goal Discovery", time: "10 mins" },
    { step: "2", label: "AI-Powered Needs Analysis", time: "20 mins" },
    { step: "3", label: "Architecture Generation", time: "15 mins" }
  ]

  return (
    <section 
      ref={ref}
      className="relative z-10 w-full bg-[#020C1B] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px] w-full">
        
        {/* Premium Branding Header */}
        <BlurFade delay={0.1} direction="up" className="w-full">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#a7dadb] shadow-[0_12px_32px_rgba(167,218,219,0.4)]">
              <Speed className="h-8 w-8 text-[#091521]" />
            </div>
            <div>
              <span className="block text-sm font-extrabold tracking-[0.1em] text-[#a7dadb] uppercase">
                SOLARA POLARIS
              </span>
              <span className="text-[0.95rem] font-semibold text-[#b0c5c6]">
                The AI Learning Experience Design Engine
              </span>
            </div>
          </div>
        </BlurFade>

        {/* Emotionally Compelling Headline */}
        <BlurFade delay={0.2} direction="up" className="w-full">
          <h2 className="mb-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-[#a7dadb] md:text-6xl lg:text-7xl">
            From Need to Alignment <br />
            in <span className="text-white">1 Hour</span>
          </h2>
        </BlurFade>

        {/* Problem-Focused Subheading */}
        <BlurFade delay={0.3} direction="up" className="w-full">
          <p className="mb-14 w-full font-body text-xl leading-relaxed text-[#e0e0e0]">
            You&apos;re an expert instructional designer. But you spend{" "}
            <span className="font-bold text-[#ef4444]">70% of your time</span> in meetings—
            wrestling with vague requirements, conflicting priorities, and the constant dread of misalignment.
            <br /><br />
            <span className="font-bold text-[#a7dadb]">What if you could skip straight to the design?</span>
          </p>
        </BlurFade>

        {/* Interactive Process Infographic */}
        <BlurFade delay={0.4} direction="up" className="w-full">
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-[#a7dadb]/25 bg-[#a7dadb]/5 p-6 backdrop-blur-xl md:p-10 shadow-[0_12px_40px_rgba(167,218,219,0.12),inset_0_1px_0_rgba(167,218,219,0.1)]">
            <h3 className="mb-10 text-center text-xl font-bold uppercase tracking-wider text-[#a7dadb]">
              THE POLARIS TRANSFORMATION
            </h3>
            
            {isInView && (
              <AnimatedList className="flex-col md:flex-row md:items-start md:justify-between w-full" delay={800}>
                {transformationSteps.map((item, idx) => (
                  <div key={idx} className="relative flex flex-col items-center z-10 w-full max-w-[250px] mx-auto">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/10 bg-[#a7dadb] shadow-[0_8px_24px_rgba(167,218,219,0.3)]">
                      <span className="text-3xl font-extrabold text-[#000]">{item.step}</span>
                    </div>
                    <span className="mb-1 text-center font-semibold text-[#e0e0e0]">{item.label}</span>
                    <span className="text-center text-sm font-bold text-[#a7dadb]">{item.time}</span>
                  </div>
                ))}
              </AnimatedList>
            )}
          </div>
        </BlurFade>

        {/* Enhanced Value Proposition Grid */}
        <BlurFade delay={0.5} direction="up" className="w-full">
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            
            {/* The Old Way */}
            <div className="relative h-full overflow-hidden rounded-2xl border-2 border-[#ef4444]/20 bg-[#ef4444]/5 p-8">
              <div className="absolute left-0 top-0 h-1 w-full bg-[#ef4444]" />
              <div className="mb-8 flex items-center gap-3">
                <Close className="h-8 w-8 text-[#ef4444]" />
                <h3 className="text-2xl font-extrabold text-[#ef4444]">THE OLD WAY</h3>
              </div>
              <div className="flex flex-col gap-6">
                {oldWayItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 text-[#ef4444]">{item.icon}</div>
                    <div>
                      <h4 className="mb-1 font-bold text-[#e0e0e0]">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-[#b0c5c6]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Polaris Way */}
            <div className="relative h-full rounded-2xl bg-[#10b981]/5 shadow-[0_16px_48px_rgba(16,185,129,0.15)]">
              <ShineBorder
                className="pointer-events-none"
                shineColor={["#10b981", "#a7dadb", "#4F46E5"]}
                borderWidth={2}
              />
              <div className="relative z-10 h-full p-8">
                <div className="absolute left-0 top-0 h-1 w-full rounded-t-xl bg-[#10b981]" />
                <div className="mb-8 flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-[#10b981]" />
                  <h3 className="text-2xl font-extrabold text-[#10b981]">THE POLARIS WAY</h3>
                </div>
                <div className="flex flex-col gap-6">
                  {polarisWayItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 text-[#10b981]">{item.icon}</div>
                      <div>
                        <h4 className="mb-1 font-bold text-[#e0e0e0]">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-[#b0c5c6]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </BlurFade>

        {/* Impact Metrics */}
        <BlurFade delay={0.6} direction="up" className="w-full">
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { value: "6 wks → 1 hr", label: "Requirements Time", icon: <Speed className="h-10 w-10" />, color: "#a7dadb" },
              { value: "100%", label: "Goal Alignment", icon: <TrendingUp className="h-10 w-10" />, color: "#4F46E5" },
              { value: "0", label: "Missed Requirements", icon: <Verified className="h-10 w-10" />, color: "#10b981" },
              { value: "15x", label: "Faster Launch", icon: <Rocket className="h-10 w-10" />, color: "#f59e0b" }
            ].map((metric, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center rounded-2xl border border-[#a7dadb]/20 bg-white/5 p-6 text-center backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-[#a7dadb]/10 hover:shadow-[0_16px_40px_rgba(167,218,219,0.2)]"
              >
                <div className="mb-3" style={{ color: metric.color }}>{metric.icon}</div>
                <div className="mb-2 text-2xl font-extrabold md:text-3xl" style={{ color: metric.color }}>{metric.value}</div>
                <div className="text-sm font-semibold text-[#b0c5c6]">{metric.label}</div>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Compelling CTA Section */}
        <BlurFade delay={0.7} direction="up" className="w-full">
          <div className="rounded-3xl border-2 border-[#a7dadb]/30 bg-[#a7dadb]/10 p-8 text-left md:p-12">
            <h3 className="mb-4 text-3xl font-extrabold text-[#a7dadb] md:text-4xl text-left">
              Ready to 10x Your Design Speed?
            </h3>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#b0c5c6] text-left">
              Experience the future of learning design—where AI handles the complexity and you focus on creativity.{" "}
              <br className="hidden md:block" />
              <span className="font-bold text-[#10b981]">Start free, stay free.</span>{" "}
              Unlock powerful features the moment you sign up—no credit card, no trials, just instant access.
            </p>
            
            <div className="mb-6 flex flex-col items-start justify-start gap-4 sm:flex-row">
              <Link href="https://polaris.smartslate.io">
                <ShimmerButton
                  background="#4F46E5"
                  shimmerColor="#ffffff"
                  className="h-14 min-w-[240px] px-8 text-lg font-bold shadow-[0_12px_32px_rgba(79,70,229,0.4)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Free
                </ShimmerButton>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-6 text-sm font-medium text-[#b0c5c6]">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <span>Free tier forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#10b981]" />
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </BlurFade>

      </div>
    </section>
  )
}
