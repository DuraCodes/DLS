"use client";

import React from "react";
import { ArrowRight, Users } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Component as InteractivePill } from "@/components/ui/backed-by-yc";

export interface TeamMember {
  image: string;
  name: string;
  role: string;
}

const defaultTeamMembers: TeamMember[] = [
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    name: "Daniel Oyetunde",
    role: "Chief Executive Officer · Strategic Brand Transformation & Vision",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    name: "Opeyemi Daniel",
    role: "Chief Operating Officer · Field Execution, Logistics & Scale",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    name: "Joy Chiamaka",
    role: "Head of Operations · Campaign Deployment & Quality Control",
  },
];

export interface TeamSectionProps {
  members?: TeamMember[];
  badge?: string;
  title?: string;
  description?: string;
}

export default function TeamSection({
  members = defaultTeamMembers,
  badge = "Executive Leadership",
  title = "The Minds Driving Your Market Advantage",
  description = "Experienced strategists, commercial operators, and activation directors delivering measurable commercial value across Nigeria.",
}: TeamSectionProps) {
  return (
    <section id="team-section" className="relative w-full overflow-hidden bg-[#111216] py-20 md:py-28 text-[#ECECEC] border-t border-white/5">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-80 bg-[#4EFE32]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center">
          <div className="mb-4">
            <InteractivePill
              showFullHeight={false}
              size="sm"
              text={badge}
              glowColor="rgba(78,254,50,0.3)"
              badgeClassName="!bg-[#1A1C22]/90 border-[#4EFE32]/30 text-white font-medium"
            />
          </div>
          <h2 className="mb-4 font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ECECEC]">
            {title}
          </h2>
          <p className="max-w-2xl font-['Barlow_Semi_Condensed',sans-serif] text-[#ECECEC]/75 text-sm sm:text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Marquee Carousel Container with edge-to-edge fade */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 md:w-40 bg-gradient-to-r from-[#111216] via-[#111216]/80 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 md:w-40 bg-gradient-to-l from-[#111216] via-[#111216]/80 to-transparent" />

          <Marquee className="[--gap:1.75rem] py-4" pauseOnHover repeat={3}>
            {members.map((member, idx) => (
              <div
                className="group relative flex w-64 md:w-72 shrink-0 flex-col transition-all duration-300"
                key={`${member.name}-${idx}`}
              >
                <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-[#1A1C22] border border-white/10 group-hover:border-[#4EFE32]/50 transition-all duration-500 shadow-xl group-hover:shadow-[#4EFE32]/10">
                  <img
                    alt={member.name}
                    className="h-full w-full object-cover grayscale contrast-105 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 transform-gpu"
                    src={member.image}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    style={{ transform: 'translateZ(0)' }}
                  />
                  
                  {/* Subtle top subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111216]/95 via-[#111216]/30 to-transparent" />

                  {/* Card footer details */}
                  <div className="absolute bottom-0 inset-x-0 p-4 m-2 rounded-xl bg-[#111216]/85 backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:bg-[#1A1C22]/95 group-hover:border-[#4EFE32]/40">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-base md:text-lg text-[#ECECEC] group-hover:text-[#4EFE32] transition-colors">
                          {member.name}
                        </h3>
                        <p className="font-['Barlow_Semi_Condensed',sans-serif] uppercase tracking-wider text-[#ECECEC]/60 text-xs mt-0.5">
                          {member.role}
                        </p>
                      </div>
                      <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#ECECEC]/70 group-hover:text-[#4EFE32] group-hover:bg-[#4EFE32]/10 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export { TeamSection };
