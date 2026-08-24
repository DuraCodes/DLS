"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/src/lib/utils"

export interface NavItem {
  name: string
  url: string
  onClick?: (e: React.MouseEvent) => void
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
  activeItem?: string
}

export function NavBar({ items, className, activeItem }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeItem || items[0]?.name || "")

  useEffect(() => {
    if (activeItem) {
      setActiveTab(activeItem)
    }
  }, [activeItem])

  return (
    <div
      className={cn(
        "fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-auto md:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-1.5rem)]",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 bg-[#111216]/95 border border-white/20 backdrop-blur-2xl p-1.5 rounded-full shadow-[0_16px_45px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        {items.map((item) => {
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                setActiveTab(item.name)
                if (item.onClick) {
                  item.onClick(e)
                }
              }}
              className={cn(
                "relative cursor-pointer font-['Barlow_Condensed',sans-serif] uppercase text-xs sm:text-sm tracking-wider font-semibold px-4 sm:px-6 py-2 sm:py-1.5 rounded-full transition-all duration-200 flex items-center justify-center whitespace-nowrap select-none min-h-[38px] sm:min-h-[36px]",
                "text-[#ECECEC]/75 hover:text-white",
                isActive && "text-[#4EFE32]",
              )}
            >
              <span className="inline whitespace-nowrap">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#4EFE32]/10 rounded-full -z-10 border border-[#4EFE32]/30"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#4EFE32] rounded-t-full shadow-[0_0_12px_#4EFE32]">
                    <div className="absolute w-12 h-6 bg-[#4EFE32]/35 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#4EFE32]/45 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#4EFE32]/35 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default NavBar
