"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { BlurFade } from "@/components/ui/blur-fade"
import { HyperText } from "@/components/ui/hyper-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function RevampedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isReversing = false
    let frameId: number

    const handleStep = () => {
      if (!video.duration) {
        frameId = requestAnimationFrame(handleStep)
        return
      }

      if (isReversing) {
        // High-frequency manual reverse seeking
        // We decrement by a value that mimics 1x speed (1/60s roughly)
        const nextTime = video.currentTime - 0.033 // Targeting ~30fps for reverse
        
        if (nextTime <= 0.1) {
          video.currentTime = 0
          isReversing = false
          video.play().catch(() => {})
        } else {
          video.currentTime = nextTime
        }
      } else {
        // Check for end of video to trigger reverse
        // Use a slightly larger buffer (0.3s) to catch it before native loop/end
        if (video.currentTime >= video.duration - 0.3) {
          video.pause()
          isReversing = true
        }
      }

      frameId = requestAnimationFrame(handleStep)
    }

    // Ensure video doesn't natively loop and interfere
    video.loop = false
    
    frameId = requestAnimationFrame(handleStep)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative flex w-full flex-col items-center overflow-hidden bg-[#020C1B] px-6 pt-[calc(var(--header-total-height-mobile)+2rem)] pb-12 md:pt-[calc(var(--header-total-height-desktop)+3rem)] md:pb-16"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover opacity-30 grayscale-[0.5] brightness-[0.6]"
          poster="https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/6153453-uhd_4096_2160_25fps.mp4?width=10&quality=1"
        >
          <source 
            src="https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/6153453-uhd_4096_2160_25fps.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#020C1B]/80 via-transparent to-[#020C1B]" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-[#020C1B]/90" />
      </div>

      {/* Background Pattern */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.07}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-y-[-30%] h-[200%] skew-y-12 fill-[#a7dadb]/10 stroke-[#a7dadb]/10 z-1",
        )}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full">
        <div className="flex flex-col items-start text-left w-full">
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
              <Link href="https://solara.smartslate.io">
                <ShimmerButton
                  background="#4F46E5"
                  shimmerColor="#ffffff"
                  className="h-14 min-w-[220px] px-8 text-lg font-bold shadow-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Learn More
                </ShimmerButton>
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
