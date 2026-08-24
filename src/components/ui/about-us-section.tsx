"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { Component as InteractivePill } from "@/components/ui/backed-by-yc"
import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.2 })

  // Parallax effect for atmospheric glow orbs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 25])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -25])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <Pen className="w-5 h-5" />,
      secondaryIcon: <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-[#4EFE32]" />,
      title: "Brand Promotion & Campaign Strategy",
      description:
        "Tailored brand identity systems, compelling storytelling, multi-channel market planning, and cross-platform growth strategies that scale conversions.",
      position: "left",
    },
    {
      icon: <Home className="w-5 h-5" />,
      secondaryIcon: <CheckCircle className="w-3.5 h-3.5 absolute -top-1 -right-1 text-[#00C2CB]" />,
      title: "Experiential Event Planning & Field Activations",
      description:
        "High-traffic outdoor sampling, modern trade promotions, wet sampling, retail logistics, and direct consumer engagement driving instant sales impact.",
      position: "left",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      secondaryIcon: <Star className="w-3.5 h-3.5 absolute -top-1 -right-1 text-[#4EFE32]" />,
      title: "Real Estate Solutions & Marketing",
      description:
        "Verified landed property sales, strategic acquisitions, commercial leasing, and promotional campaigns backed by transparent documentation.",
      position: "left",
    },
    {
      icon: <PaintBucket className="w-5 h-5" />,
      secondaryIcon: <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-[#00C2CB]" />,
      title: "Modern Trade & Wet Sampling",
      description:
        "High-traffic in-store promotions, structured consumer reward sampling, and retail engagement driving instant product trials and volume.",
      position: "right",
    },
    {
      icon: <Ruler className="w-5 h-5" />,
      secondaryIcon: <CheckCircle className="w-3.5 h-3.5 absolute -top-1 -right-1 text-[#00C2CB]" />,
      title: "Verified Landed Property Portfolio",
      description:
        "Authentic landed property acquisition, commercial leasing, and promotional campaigns backed by authenticated legal documentation.",
      position: "right",
    },
    {
      icon: <PenTool className="w-5 h-5" />,
      secondaryIcon: <Star className="w-3.5 h-3.5 absolute -top-1 -right-1 text-[#4EFE32]" />,
      title: "6-Step Operational Execution",
      description:
        "Meticulous market planning, end-to-end field deployment logistics, resource allocation, and quality control across nationwide campaigns.",
      position: "right",
    },
  ]

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: 100, label: "Genuine & Verified Property Documentation", suffix: "%" },
    { icon: <Users className="w-6 h-6" />, value: 10, label: "Tier-1 Enterprise & FMCG Brand Partnerships", suffix: "+" },
    { icon: <Calendar className="w-6 h-6" />, value: 6, label: "Rigorous Operational Execution Lifecycle", suffix: "-Step" },
    { icon: <TrendingUp className="w-6 h-6" />, value: 360, label: "Full-Spectrum Activation & Landed Asset Portfolio", suffix: "°" },
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#111216] text-[#ECECEC] overflow-hidden relative border-t border-white/5"
    >
      {/* Ambient background glows for seamless depth */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#4EFE32]/[0.04] blur-3xl pointer-events-none"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[30rem] h-[30rem] rounded-full bg-[#00C2CB]/[0.04] blur-3xl pointer-events-none"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-[#4EFE32]/40 blur-[1px] pointer-events-none"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-[#00C2CB]/40 blur-[1px] pointer-events-none"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto max-w-7xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="flex flex-col items-center mb-6 text-center" variants={itemVariants}>
          <div className="mb-4">
            <InteractivePill
              showFullHeight={false}
              size="sm"
              text="Who We Are & What We Build"
              glowColor="rgba(78,254,50,0.35)"
              badgeClassName="!bg-[#1A1C22]/90 border-[#4EFE32]/30 text-white font-medium"
            />
          </div>
          <h2 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#ECECEC]">
            Transforming Brands into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ECECEC] via-[#00C2CB] to-[#4EFE32] font-semibold">Dynamic Engines of Growth</span>
          </h2>
          <motion.div
            className="w-24 h-0.5 bg-gradient-to-r from-[#4EFE32] to-[#00C2CB] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p className="text-center font-['Barlow_Semi_Condensed',sans-serif] max-w-2xl mx-auto mb-16 md:mb-20 text-[#ECECEC]/75 text-base sm:text-lg leading-relaxed" variants={itemVariants}>
          We believe brands are living assets—not static symbols, but dynamic engines of value, growth, and influence, executed through high-impact market strategy and verified property investments.
        </motion.p>

        {/* 3-Column Interactive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center relative">
          {/* Left Column */}
          <div className="space-y-10 md:space-y-14">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.15}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Showcase Showcase Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-10 md:mb-0">
            <motion.div className="relative w-full max-w-sm" variants={itemVariants}>
              {/* Outer decorative frame */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl backdrop-blur-md">
                <motion.div
                  className="rounded-xl overflow-hidden relative aspect-[4/5] bg-[#1A1C22] group"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                    alt="Bespoke Architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111216]/95 via-[#111216]/40 to-transparent flex items-end justify-center p-6">
                    <ShimmerButton
                      shimmerColor="#4EFE32"
                      shimmerSize="0.08em"
                      background="rgba(17, 18, 22, 0.9)"
                      className="w-full border border-white/20 shadow-xl"
                      onClick={() => {
                        window.location.hash = '#gallery';
                      }}
                    >
                      <span className="flex items-center justify-center gap-2 font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-sm font-bold text-[#ECECEC] group-hover:text-white">
                        Explore Portfolio
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#4EFE32]" />
                      </span>
                    </ShimmerButton>
                  </div>
                </motion.div>
              </div>

              {/* Surrounding accent border glow */}
              <motion.div
                className="absolute inset-0 border border-[#4EFE32]/25 rounded-2xl -m-3 pointer-events-none"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Floating accent badge orbs */}
              <motion.div
                className="absolute -top-4 -right-6 w-16 h-16 rounded-full bg-[#4EFE32]/10 blur-xl pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-8 w-20 h-20 rounded-full bg-[#00C2CB]/10 blur-xl pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-10 md:space-y-14">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.15}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Metric / Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Atmospheric CTA Banner */}
        <motion.div
          className="mt-20 md:mt-24 bg-[#1A1C22] border border-white/10 text-[#ECECEC] p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4EFE32]/5 via-transparent to-[#00C2CB]/5 pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-2xl md:text-3xl font-bold mb-2 text-[#ECECEC]">
              Ready to accelerate your market growth?
            </h3>
            <p className="font-['Barlow_Semi_Condensed',sans-serif] text-[#ECECEC]/75 text-sm md:text-base">
              Let&apos;s collaborate to build your brand and secure high-value property assets.
            </p>
          </div>
          <ShimmerButton
            shimmerColor="#4EFE32"
            shimmerSize="0.1em"
            background="linear-gradient(135deg, #111216 0%, #1A1C22 100%)"
            className="relative z-10 px-7 py-3.5 shadow-xl shadow-[#4EFE32]/20 border border-[#4EFE32]/40"
            onClick={() => {
              const el = document.getElementById('contact-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-sm md:text-base text-[#4EFE32] flex items-center gap-2">
              Schedule a Strategy Call
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#4EFE32]" />
            </span>
          </ShimmerButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface ServiceItemProps {
  key?: React.Key
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  variants: {
    hidden: { opacity: number; y?: number }
    visible: { opacity: number; y?: number; transition: { duration: number; ease: string } }
  }
  delay: number
  direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group cursor-default"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3.5 mb-2.5"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#4EFE32] bg-[#4EFE32]/10 border border-[#4EFE32]/25 p-3 rounded-xl transition-all duration-300 group-hover:bg-[#4EFE32]/20 group-hover:border-[#4EFE32]/50 relative shadow-inner"
          whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wide text-lg md:text-xl font-bold text-[#ECECEC] group-hover:text-[#4EFE32] transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="font-['Barlow_Semi_Condensed',sans-serif] text-sm md:text-base text-[#ECECEC]/75 leading-relaxed pl-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.35 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-2.5 pl-14 flex items-center text-[#4EFE32] font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="flex items-center gap-1">
          Explore service <ArrowRight className="w-3 h-3 text-[#4EFE32]" />
        </span>
      </motion.div>
    </motion.div>
  )
}

interface StatCounterProps {
  key?: React.Key
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
  delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="bg-[#1A1C22]/80 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-[#1A1C22] hover:border-[#4EFE32]/30 transition-all duration-300 shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-13 h-13 rounded-xl bg-[#4EFE32]/10 border border-[#4EFE32]/25 flex items-center justify-center mb-4 text-[#4EFE32] group-hover:bg-[#4EFE32]/20 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <div ref={countRef} className="font-['Barlow_Condensed',sans-serif] text-4xl md:text-5xl font-black tracking-tight text-[#ECECEC] flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span className="text-[#4EFE32]">{suffix}</span>
      </div>
      <p className="font-['Barlow_Semi_Condensed',sans-serif] text-[#ECECEC]/75 text-sm md:text-base mt-1.5 font-normal">{label}</p>
      <motion.div className="w-8 h-0.5 bg-gradient-to-r from-[#4EFE32] to-[#00C2CB] mt-3 group-hover:w-16 transition-all duration-300 rounded-full" />
    </motion.div>
  )
}
