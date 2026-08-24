"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles, Menu, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface AnimatedNavFramerProps {
  className?: string;
  items?: NavItem[];
  onNavigateHome?: () => void;
  onNavigateGallery?: () => void;
  onNavigateAbout?: () => void;
}

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    },
  },
};

export function AnimatedNavFramer({
  className,
  items,
  onNavigateHome,
  onNavigateGallery,
  onNavigateAbout,
}: AnimatedNavFramerProps) {
  const [isExpanded, setExpanded] = React.useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 120) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const defaultNavItems: NavItem[] = [
    {
      name: "Home",
      href: "#home",
      onClick: (e) => {
        e.preventDefault();
        if (onNavigateHome) {
          onNavigateHome();
        } else {
          window.location.hash = "#home";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    },
    {
      name: "Gallery",
      href: "#gallery",
      onClick: (e) => {
        e.preventDefault();
        if (onNavigateGallery) {
          onNavigateGallery();
        } else {
          window.location.hash = "#gallery";
        }
      },
    },
    {
      name: "About us",
      href: "#about-section",
      onClick: (e) => {
        e.preventDefault();
        if (onNavigateAbout) {
          onNavigateAbout();
        } else {
          const el = document.getElementById("about-section");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#about-section";
          }
        }
      },
    },
  ];

  const currentNavItems = items || defaultNavItems;

  return (
    <div className={cn("fixed top-5 left-1/2 -translate-x-1/2 z-50", className)}>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        aria-label="Main Navigation"
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-white/15 bg-[#111216]/80 text-[#ECECEC] shadow-2xl backdrop-blur-xl h-11 transition-colors duration-300 hover:border-white/30",
          !isExpanded && "cursor-pointer justify-center hover:border-[#4EFE32]/50 hover:bg-[#1A1C22]"
        )}
      >
        {/* Brand Icon in Nav */}
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center pl-3.5 pr-2 text-[#4EFE32]"
        >
          <Sparkles className="h-4 w-4 text-[#4EFE32]" />
        </motion.div>

        {/* Links List */}
        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-2 pr-3.5",
            !isExpanded && "pointer-events-none"
          )}
        >
          {currentNavItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => {
                e.stopPropagation();
                if (item.onClick) {
                  item.onClick(e);
                }
              }}
              className="text-xs sm:text-sm font-light text-white/80 hover:text-[#4EFE32] hover:bg-white/10 transition-all px-3 py-1 rounded-full cursor-pointer"
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Collapsed Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="text-[#ECECEC] flex items-center justify-center"
          >
            <Menu className="h-4 w-4 text-[#ECECEC]" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}

export default AnimatedNavFramer;
