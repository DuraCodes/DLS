import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BackedByYCProps {
  className?: string;
  containerClassName?: string;
  badgeClassName?: string;
  text?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  iconBg?: string;
  glowColor?: string;
  showFullHeight?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  [key: string]: any;
}

export const Component: React.FC<BackedByYCProps> = ({
  className,
  containerClassName,
  badgeClassName,
  text = "Backed by Y Combinator",
  icon,
  showIcon = false,
  iconBg = "bg-[#FC6A21]",
  glowColor = "rgba(255,140,0,0.24)",
  showFullHeight = true,
  size = "md",
  onClick,
  ...props
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = hostRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const sizeStyles = {
    sm: {
      pill: "px-3 py-1 text-xs",
      iconBox: "h-5 w-5 rounded",
      iconSize: "h-3 w-3",
      text: "text-xs font-medium",
      gap: "gap-2",
    },
    md: {
      pill: "px-4 py-2 text-sm md:text-base",
      iconBox: "h-6 w-6 rounded-md",
      iconSize: "h-4 w-4",
      text: "text-sm md:text-base font-medium",
      gap: "gap-3",
    },
    lg: {
      pill: "px-5 py-2.5 text-base md:text-lg",
      iconBox: "h-7 w-7 rounded-lg",
      iconSize: "h-5 w-5",
      text: "text-base md:text-lg font-medium",
      gap: "gap-3.5",
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const hasIcon = showIcon || !!icon;

  const inner = (
    <div
      ref={hostRef}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "px-2 py-2 isolate select-none transition-all duration-300",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
      style={
        {
          ["--mx" as any]: "50%",
          ["--my" as any]: "50%",
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Subtle moving glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "blur-2xl"
          )}
          style={{
            background: `radial-gradient(160px 80px at var(--mx) var(--my), ${glowColor}, transparent 70%)`
          }}
        />
      </div>

      {/* Glass pill */}
      <div
        className={cn(
          "relative z-10 rounded-full",
          currentSize.pill,
          "backdrop-blur-xl",
          "bg-white/15 dark:bg-[#1A1C22]/80",
          "ring-1 ring-black/5 dark:ring-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
          "border border-white/10",
          badgeClassName
        )}
      >
        <div className={cn("flex items-center", hasIcon ? currentSize.gap : "justify-center")}>
          {hasIcon && (
            <span
              className={cn(
                currentSize.iconBox,
                "shrink-0 grid place-items-center text-white",
                iconBg,
                "shadow-[0_2px_10px_rgba(252,106,33,0.35)]"
              )}
              aria-hidden="true"
            >
              {icon ? (
                icon
              ) : (
                <YCMonogram className={cn(currentSize.iconSize, "text-white")} />
              )}
            </span>
          )}
          <span className={cn(currentSize.text, "font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-semibold text-neutral-800 dark:text-white truncate")}>
            {text}
          </span>
        </div>
      </div>
    </div>
  );

  if (!showFullHeight) {
    return inner;
  }

  return (
    <div className={cn("min-h-[40vh] w-full flex items-center justify-center p-8", containerClassName)}>
      {inner}
    </div>
  );
};

export function YCMonogram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 5h3.2l2.8 5 2.8-5H18l-4.6 8v6h-2.8v-6L6 5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Component;
