import * as React from "react"
import { Button } from "@/components/ui/button"
import { Component as InteractivePill } from "@/components/ui/backed-by-yc"

export interface FooterProps {
  logo?: React.ReactNode
  brandName: string
  tagline?: string
  socialLinks: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  solutionLinks?: Array<{
    href: string
    label: string
  }>
  mainLinks: Array<{
    href: string
    label: string
  }>
  contactDetails?: {
    address: string
    email: string
    phones: string[]
  }
  legalLinks: Array<{
    href: string
    label: string
  }>
  copyright: {
    text: string
    license?: string
    statusBadge?: string
  }
}

export function Footer({
  logo,
  brandName,
  tagline = "Building Dreams. Selling Success. Integrated growth marketing, experiential field activations, and verified real estate solutions across Nigeria.",
  socialLinks,
  solutionLinks = [
    { href: "#about-section", label: "Brand Promotion & Identity" },
    { href: "#about-section", label: "Experiential Activations" },
    { href: "#about-section", label: "Campaign Strategy" },
    { href: "#about-section", label: "Real Estate Solutions" },
    { href: "#about-section", label: "Modern Trade Sampling" },
  ],
  mainLinks,
  contactDetails = {
    address: "Federal Peace Estate, Old Garage Bus Stop, LASU-Igando Road, Lagos, Nigeria",
    email: "DLorenzSolutions@gmail.com",
    phones: ["+234 906 090 9034", "+234 816 866 1924"],
  },
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-12 pt-16 lg:pb-16 lg:pt-20 bg-[#0E0F13] text-[#ECECEC] border-t border-white/10 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[30rem] h-28 bg-[#4EFE32]/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[25rem] h-28 bg-[#00C2CB]/[0.025] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              className="flex items-center gap-x-3 group transition-transform duration-200"
              aria-label={brandName}
            >
              {logo && (
                <div className="text-[#4EFE32] transition-colors group-hover:text-[#45ea2b]">
                  {logo}
                </div>
              )}
              <span className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-xl sm:text-2xl text-[#ECECEC] group-hover:text-white transition-colors">
                {brandName}
              </span>
            </a>
            <p className="font-['Barlow_Semi_Condensed',sans-serif] text-[#ECECEC]/75 text-xs sm:text-sm leading-relaxed max-w-sm">
              {tagline}
            </p>
            <ul className="flex list-none pt-2 space-x-3 items-center">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-[#1A1C22] border border-white/10 hover:border-[#4EFE32]/50 hover:bg-[#1A1C22]/80 text-[#ECECEC]/80 hover:text-[#4EFE32] transition-all shadow-sm cursor-pointer"
                    asChild
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 1: Solutions */}
          <div>
            <h4 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-sm text-[#4EFE32] mb-4">
              Solutions &amp; Capabilities
            </h4>
            <ul className="space-y-2.5 font-['Barlow_Semi_Condensed',sans-serif]">
              {solutionLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-[#ECECEC]/75 hover:text-[#4EFE32] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company Navigation */}
          <div>
            <h4 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-sm text-[#4EFE32] mb-4">
              Company &amp; Navigation
            </h4>
            <ul className="space-y-2.5 font-['Barlow_Semi_Condensed',sans-serif]">
              {mainLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-[#ECECEC]/75 hover:text-[#4EFE32] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div>
            <h4 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-sm text-[#4EFE32] mb-4">
              Headquarters &amp; Direct
            </h4>
            <div className="space-y-3 font-['Barlow_Semi_Condensed',sans-serif] text-xs sm:text-sm text-[#ECECEC]/75">
              <p className="leading-snug">{contactDetails.address}</p>
              <p>
                <a href={`mailto:${contactDetails.email}`} className="text-[#ECECEC] hover:text-[#4EFE32] transition-colors">
                  {contactDetails.email}
                </a>
              </p>
              <div className="space-y-1">
                {contactDetails.phones.map((phone, idx) => (
                  <p key={idx}>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#4EFE32] transition-colors">
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row with legal links & status badge */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-['Barlow_Semi_Condensed',sans-serif] text-xs text-[#ECECEC]/60">
          <div className="flex flex-wrap items-center gap-3">
            <span>{copyright.text}</span>
            <span className="hidden sm:inline">•</span>
            <InteractivePill
              showFullHeight={false}
              size="sm"
              text={copyright.statusBadge || "Nationwide Operations Active • Lagos, Nigeria"}
              glowColor="rgba(78,254,50,0.35)"
              badgeClassName="!py-0.5 !px-3 !bg-[#1A1C22]/90 border-[#4EFE32]/30 text-[#4EFE32] text-[11px] font-medium"
            />
          </div>

          <div className="flex items-center gap-4">
            {legalLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:text-[#ECECEC]/80 transition-colors underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
