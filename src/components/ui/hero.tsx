"use client"
import { useEffect, useRef, useState } from "react"
import { PulsingBorder } from "@paper-design/shaders-react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Sparkles, Building2 } from "lucide-react"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { getOptimizedMediaUrl, getVideoPosterUrl } from "@/src/lib/media-optimizer"

export interface ShaderShowcaseProps {
  onNavigateGallery?: () => void;
  onNavigateContact?: () => void;
}

const HERO_RAW_VIDEO_URL = "https://ik.imagekit.io/dura/Ultra_cinematic_low_angle_arch%20(1).mp4?updatedAt=1787300403221";

export default function ShaderShowcase({ onNavigateGallery, onNavigateContact }: ShaderShowcaseProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const heroVideoUrl = getOptimizedMediaUrl(HERO_RAW_VIDEO_URL, {
    quality: 75,
  })
  const heroPosterUrl = getVideoPosterUrl(HERO_RAW_VIDEO_URL)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    // Viewport observer: pause hero video when scrolled past hero section to save device CPU/GPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              if (isPlaying) {
                videoRef.current.play().catch(() => {});
              }
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      observer.disconnect();
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen min-h-[100dvh] bg-black relative overflow-hidden flex flex-col justify-between">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={heroVideoUrl}
        poster={heroPosterUrl}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Subtle overlay for text readability while keeping the video very visible */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none z-10" />
      {/* Bottom fade overlay for seamless transition into subsequent sections */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <header className="relative z-30 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 w-full shrink-0">
        <motion.div
          className="flex items-center group cursor-pointer relative shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src="https://ik.imagekit.io/dura/dlorenz/brand/logo_1787395161936_Untitled_design_4hw5yB98b.png?updatedAt=1787395163680"
            alt="Logo"
            referrerPolicy="no-referrer"
            className="h-8 sm:h-10 w-auto object-contain drop-shadow-md group-hover:brightness-110 transition-all duration-300"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Video Play/Pause & Mute Controls Pill */}
            <div className="flex items-center gap-1 bg-[#111216]/80 backdrop-blur-md border border-white/15 p-1 rounded-lg shrink-0 shadow-lg" title="Audio / Play / Pause / Playback Rate (1x, 1.5x, 2x)">
              <button
                id="video-toggle-play"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause audio/video" : "Play audio/video"}
                title="Audio / Play / Pause"
                className="p-1.5 rounded-md hover:bg-white/20 text-[#ECECEC] hover:text-[#4EFE32] transition-colors cursor-pointer flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <div className="w-px h-3 bg-white/20" />
              <button
                id="video-toggle-mute"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                title="Toggle Audio / Mute"
                className="p-1.5 rounded-md hover:bg-white/20 text-[#ECECEC] hover:text-[#4EFE32] transition-colors cursor-pointer flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-20 flex-1 flex flex-col justify-center sm:justify-end px-4 sm:px-8 max-w-3xl pt-4 sm:pt-8 pb-20 sm:pb-16 md:pb-12">
          <div className="text-left">
            <motion.h1
              className="font-['Barlow_Condensed',sans-serif] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#ECECEC] mb-4 sm:mb-6 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="block font-medium text-white/90 text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-2 tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #ECECEC 0%, #4EFE32 40%, #00C2CB 80%, #ECECEC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "url(#text-glow)",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                Building Dreams.
              </motion.span>
              <span className="block font-black text-white drop-shadow-2xl">Delivering</span>
              <span className="block font-light text-[#ECECEC]/80 font-['DM_Serif_Display',serif] normal-case italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Success.</span>
            </motion.h1>

            <motion.p
              className="font-['Barlow_Semi_Condensed',sans-serif] text-sm sm:text-base md:text-lg font-normal text-[#ECECEC]/75 mb-6 sm:mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              We leverage deep market insight to accelerate the growth of leading brands through results-driven marketing solutions and secure, transparent real estate transactions across Nigeria.
            </motion.p>

            <motion.div
              className="flex items-center gap-3 sm:gap-6 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <ShimmerButton
                shimmerColor="#4EFE32"
                shimmerSize="0.1em"
                background="linear-gradient(135deg, #1A1C22 0%, #111216 100%)"
                className="px-6 sm:px-8 py-3.5 sm:py-4 shadow-xl shadow-[#4EFE32]/20 border border-[#4EFE32]/40"
                onClick={() => {
                  if (onNavigateContact) {
                    onNavigateContact();
                  } else {
                    const el = document.getElementById('contact-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-sm sm:text-base text-[#4EFE32] flex items-center gap-2">
                  Schedule a Strategy Call
                </span>
              </ShimmerButton>
            </motion.div>
          </div>
        </main>

        <div className="hidden sm:flex absolute bottom-8 right-8 z-30" title="Hold to rotate / Drag to explore scene in real time">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <PulsingBorder
              colors={["#4EFE32", "#00C2CB", "#4EFE32", "#00C2CB", "#ECECEC"]}
              colorBack="#00000000"
              speed={1.5}
              roundness={1}
              thickness={0.1}
              softness={0.2}
              intensity={5}
              spots={5}
              spotSize={0.1}
              pulse={0.1}
              smoke={0.5}
              smokeSize={4}
              scale={0.65}
              rotation={0}
              frame={9161408.251009725}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
            />

            {/* Rotating Text Around the Pulsing Border */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ transform: "scale(1.6)" }}
            >
              <defs>
                <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="text-sm fill-white/80 font-medium">
                <textPath href="#circle" startOffset="0%">
                  DLORENZ SOLUTIONS • Building Dreams • Delivering Success • Strategic Growth •
                </textPath>
              </text>
            </motion.svg>
          </div>
        </div>
    </div>
  )
}
