import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { Component as InteractivePill } from '@/components/ui/backed-by-yc';

// Define the type for individual logo props
export interface Logo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

// Define the props for the main component
export interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title?: string;
  description?: string;
  logos: Logo[];
  speed?: 'normal' | 'slow' | 'fast';
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component.
 * Blends seamlessly with the dark charcoal (#111216 / #1A1C22) and neon lime (#4EFE32) palette.
 */
const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ badge, title, description, logos, speed = 'normal', className, ...props }, ref) => {
    // Map speed prop to animation duration
    const durationMap = {
      normal: '40s',
      slow: '80s',
      fast: '15s',
    };
    const animationDuration = durationMap[speed];

    return (
      <>
        {/* The @keyframes for the marquee animation are defined directly here for robustness. */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
        
        <section
          ref={ref}
          aria-label={title || 'Client Logos'}
          className={cn(
            'w-full bg-transparent text-[#ECECEC] overflow-hidden py-10 md:py-14 relative',
            className
          )}
          {...props}
        >
          {/* Header Section */}
          {(badge || title || description) && (
            <div className="max-w-4xl mx-auto px-6 mb-8 md:mb-10 text-center flex flex-col items-center">
              {badge && (
                <div className="mb-3">
                  <InteractivePill
                    showFullHeight={false}
                    size="sm"
                    text={badge}
                    glowColor="rgba(78,254,50,0.3)"
                    badgeClassName="!bg-[#1A1C22]/90 border-[#4EFE32]/30 text-[#4EFE32] font-semibold text-xs tracking-wider uppercase"
                  />
                </div>
              )}
              {title && (
                <h2 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-2xl sm:text-3xl md:text-4xl text-[#ECECEC]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-2 font-['Barlow_Semi_Condensed',sans-serif] text-sm sm:text-base text-[#ECECEC]/70 max-w-xl">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Full-width Marquee Section with edge-to-edge gradient bleed */}
          <div
            className="w-full overflow-hidden relative py-3"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div 
              className="flex w-max items-center gap-5 py-2 pr-5 hover:[animation-play-state:paused] transition-all duration-300 ease-in-out transform-gpu" 
              style={{
                animation: `marquee ${animationDuration} linear infinite`,
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            >
              {/* Render logos twice to create a seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group relative h-20 md:h-24 w-44 md:w-52 shrink-0 flex items-center justify-center rounded-2xl bg-[#1A1C22]/90 border border-white/10 hover:border-[#4EFE32]/50 backdrop-blur-sm md:backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(78,254,50,0.12)] cursor-pointer transform-gpu"
                >
                  {/* Subtle ambient gradient overlay revealed on hover matching brand + page theme */}
                  <div
                    style={{
                      '--from': logo.gradient.from,
                      '--via': logo.gradient.via,
                      '--to': logo.gradient.to,
                    } as React.CSSProperties}
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-out bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
                  />
                  {/* Neon border glow sheen */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#4EFE32]/5 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Logo Image */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="relative h-10 md:h-12 w-32 object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110 transform-gpu"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
);

MarqueeLogoScroller.displayName = 'MarqueeLogoScroller';

export { MarqueeLogoScroller };
