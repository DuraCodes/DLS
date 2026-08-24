import React, { useState } from 'react';
import { ArrowLeft, Send, Twitter, Linkedin, Instagram } from 'lucide-react';
import InteractiveBentoGallery, { MediaItemType } from '@/components/ui/interactive-bento-gallery';
import { MarqueeLogoScroller } from '@/components/ui/marquee-logo-scroller';
import { Footer } from '@/components/ui/footer';
import { clientBrands } from '@/data/partners';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export interface GalleryPageProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

const allMediaItems: MediaItemType[] = [
  {
    id: 1,
    type: 'image',
    tag: 'Experiential Field Activation',
    title: 'Direct-to-Consumer Market Storm',
    desc: 'High-energy neighborhood retail market penetration and high-volume shopper conversion across tier-1 Lagos open markets.',
    stat: '50,000+ Engagements',
    category: 'Experiential & Field Marketing',
    url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 2,
    type: 'video',
    tag: 'Modern Trade Sampling',
    title: 'Supermarket In-Store Activation',
    desc: 'Premium brand sampling booths, wet-sampling execution, and instant purchase incentive drives in major retail chains.',
    stat: '+140% Sales Velocity',
    category: 'Brand Roadshows & Sampling',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-shopping-mall-with-crowd-of-people-41392-large.mp4',
    span: 'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 3,
    type: 'image',
    tag: 'Corporate Campaign Strategy',
    title: 'National Product Relaunch',
    desc: 'Integrated multimedia launch sequence combining roadshows, influencer touchpoints, and synchronized point-of-sale branding.',
    stat: 'Multi-State Reach',
    category: 'Corporate & Trade Activations',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 4,
    type: 'image',
    tag: 'Real Estate Solutions',
    title: 'Verified Residential Land Sales',
    desc: 'End-to-end allocation, documentation validation, and deed clearance for prime residential estate developments.',
    stat: '100% Title Verified',
    category: 'Real Estate & Land Acquisition',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 5,
    type: 'video',
    tag: 'Brand Promotion & Identity',
    title: 'Campus & Youth Storm Activations',
    desc: 'Engaging university pop-ups, dynamic gamification booths, and student brand ambassador community buildouts.',
    stat: '15+ Campuses Mobilized',
    category: 'Experiential & Field Marketing',
    url: 'https://ik.imagekit.io/dura/dlorenz/projects/bento_1787401424328_Product_reveal_on_podium_stage_202608202059_A2-yuMIWI.mp4?updatedAt=1787401428476',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 6,
    type: 'image',
    tag: 'Experiential Activations',
    title: 'Interactive Roadshow Caravan',
    desc: 'Mobile LED truck stages, live MC demonstrations, and high-frequency sound setups across strategic commuter hubs.',
    stat: '25 Key Transit Nodes',
    category: 'Brand Roadshows & Sampling',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 7,
    type: 'image',
    tag: 'Real Estate Solutions',
    title: 'Commercial Property Advisory',
    desc: 'Strategic retail footprint scouting, lease negotiation, and structural suitability audits for expanding corporate retail branches.',
    stat: 'Prime Location Assets',
    category: 'Real Estate & Land Acquisition',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 8,
    type: 'image',
    tag: 'Modern Trade Sampling',
    title: 'Sensory Taste-Test Sampling Drive',
    desc: 'Rigorous temperature-controlled culinary sampling drives delivering direct consumer taste feedback and retail stocking lift.',
    stat: '98% Positive Feedback',
    category: 'Brand Roadshows & Sampling',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 9,
    type: 'image',
    tag: 'Brand Promotion & Identity',
    title: 'Outdoor POSM & Retail Merchandising',
    desc: 'Complete storefront branding, illuminated signage deployment, and eye-level shelf presence optimization across wholesale strips.',
    stat: '500+ Outlets Branded',
    category: 'Corporate & Trade Activations',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 10,
    type: 'image',
    tag: 'Corporate & Trade Activations',
    title: 'Key Distributor Gala & Conference',
    desc: 'Bespoke partner recognition events, dealer incentive award presentations, and executive trade networking summits.',
    stat: '1,200+ Trade Partners',
    category: 'Corporate & Trade Activations',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 11,
    type: 'image',
    tag: 'Real Estate Solutions',
    title: 'Industrial & Logistics Land Acquistion',
    desc: 'Secure acquisition, survey certification, and perimeter demarcations for warehousing and logistics operations along key commercial corridors.',
    stat: 'High-Yield Corridors',
    category: 'Real Estate & Land Acquisition',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 12,
    type: 'image',
    tag: 'Campaign Strategy',
    title: 'Nationwide Consumer Promotion (NCP)',
    desc: 'FMCG reward mechanics, scratch-and-win verification logistics, and rapid prize redemption centers nationwide.',
    stat: '36 States Coordinated',
    category: 'Corporate & Trade Activations',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1400&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const handleGoHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = '#home';
    }
  };

  const handleGoContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      window.location.hash = '#contact-section';
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111216] text-[#ECECEC] flex flex-col selection:bg-[#4EFE32]/30 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glows with GPU layer containment */}
      <div className="fixed top-0 left-1/4 w-[25rem] md:w-[35rem] h-[25rem] md:h-[35rem] bg-[#4EFE32]/[0.025] blur-[100px] md:blur-[150px] pointer-events-none transform-gpu" style={{ transform: 'translateZ(0)' }} />
      <div className="fixed bottom-10 right-1/4 w-[28rem] md:w-[40rem] h-[28rem] md:h-[40rem] bg-[#00C2CB]/[0.03] blur-[110px] md:blur-[170px] pointer-events-none transform-gpu" style={{ transform: 'translateZ(0)' }} />

      {/* Sticky/Fixed Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md md:backdrop-blur-xl bg-[#111216]/95 border-b border-white/10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 transition-all transform-gpu">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Top-Left Corner: Back to Overview Pill */}
          <div className="flex items-center shrink-0">
            <ShimmerButton
              onClick={handleGoHome}
              shimmerColor="#4EFE32"
              shimmerSize="0.08em"
              background="linear-gradient(135deg, #1A1C22 0%, #111216 100%)"
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#4EFE32]/50 shadow-[0_0_15px_rgba(78,254,50,0.25)] hover:shadow-[0_0_22px_rgba(78,254,50,0.45)] hover:border-[#4EFE32] transition-all"
            >
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-[#4EFE32] whitespace-nowrap">
                <ArrowLeft className="w-3.5 h-3.5 text-[#4EFE32] shrink-0" />
                <span>Back to Overview</span>
              </span>
            </ShimmerButton>
          </div>

          {/* Top-Right Corner: Glowing Green Pill CTA Button */}
          <div className="flex items-center shrink-0">
            <ShimmerButton
              onClick={handleGoContact}
              shimmerColor="#4EFE32"
              shimmerSize="0.08em"
              background="linear-gradient(135deg, #1A1C22 0%, #111216 100%)"
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#4EFE32]/50 shadow-[0_0_15px_rgba(78,254,50,0.25)] hover:shadow-[0_0_22px_rgba(78,254,50,0.45)] hover:border-[#4EFE32] transition-all"
            >
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-[#4EFE32] whitespace-nowrap">
                <span>Book Consultation</span>
                <span className="text-sm sm:text-base leading-none">→</span>
              </span>
            </ShimmerButton>
          </div>

        </div>
      </header>

      {/* Main Gallery Page Content */}
      <main className="flex-1 w-full flex flex-col">
        {/* Gallery Hero Header */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 md:pt-16 md:pb-8 text-center">
          <h1 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#ECECEC] max-w-4xl mx-auto leading-tight">
            INTERACTIVE FIELD PORTFOLIO
          </h1>
          <p className="mt-4 font-['Barlow_Semi_Condensed',sans-serif] text-sm sm:text-base md:text-lg text-[#ECECEC]/75 max-w-3xl mx-auto leading-relaxed">
            Drag to reorganize items or click any card to inspect high-resolution video reels, field activations, and verified project documentation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <InteractiveBentoGallery
            mediaItems={allMediaItems}
            title=""
            description=""
            className="!py-0 !px-0 !max-w-none"
          />
        </div>

        {/* Full-width Clients UI Component */}
        <div id="gallery-clients" className="relative z-20 w-full bg-[#111216] mt-12 pt-10 pb-6 overflow-hidden border-t border-white/5">
          {/* Subtle ambient lighting underneath the marquee */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-40 bg-[#4EFE32]/[0.02] blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30rem] h-40 bg-[#00C2CB]/[0.025] blur-[130px] pointer-events-none" />
          
          <MarqueeLogoScroller
            badge="Partner Network"
            title="Trusted by Industry Giants"
            description="Collaborating with forward-thinking enterprises on visionary spatial and structural projects."
            logos={clientBrands}
            speed="normal"
          />
        </div>
      </main>

      {/* Gallery Page Footer Component */}
      <Footer
        brandName="DLORENZ SOLUTIONS"
        tagline="Building Dreams. Selling Success. Integrated growth marketing, experiential field activations, and verified real estate solutions across Nigeria."
        socialLinks={[
          {
            icon: <Twitter className="h-4 w-4" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Linkedin className="h-4 w-4" />,
            href: "https://linkedin.com",
            label: "LinkedIn",
          },
          {
            icon: <Instagram className="h-4 w-4" />,
            href: "https://instagram.com",
            label: "Instagram",
          },
        ]}
        solutionLinks={[
          { href: "#home", label: "Brand Promotion & Identity" },
          { href: "#home", label: "Experiential Activations" },
          { href: "#home", label: "Campaign Strategy" },
          { href: "#home", label: "Real Estate Solutions" },
          { href: "#home", label: "Modern Trade Sampling" },
        ]}
        mainLinks={[
          { href: "#home", label: "Home" },
          { href: "#gallery", label: "Gallery & Deployments" },
          { href: "#home", label: "About Capabilities" },
          { href: "#home", label: "Executive Leadership" },
          { href: "#gallery-clients", label: "Client Partners" },
        ]}
        contactDetails={{
          address: "Federal Peace Estate, Old Garage Bus Stop, LASU-Igando Road, Lagos, Nigeria",
          email: "DLorenzSolutions@gmail.com",
          phones: ["+234 906 090 9034", "+234 816 866 1924"],
        }}
        legalLinks={[
          { href: "#privacy", label: "Privacy Policy" },
          { href: "#terms", label: "Terms of Service" },
          { href: "#licensing", label: "Verified Real Estate Charter" },
        ]}
        copyright={{
          text: "© 2026 DLORENZ SOLUTIONS. All rights reserved.",
          statusBadge: "Nationwide Operations Active • Lagos, Nigeria",
        }}
      />
    </div>
  );
};

export default GalleryPage;
