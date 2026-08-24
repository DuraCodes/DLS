import React, { useState, useEffect } from "react";
import ShaderShowcase from "@/components/ui/hero";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import AboutUsSection from "@/components/ui/about-us-section";
import TeamSection from "@/components/ui/team";
import { ContactSection } from "@/components/ui/contact";
import { Footer } from "@/components/ui/footer";
import { clientBrands } from "@/data/partners";
import { Twitter, Github, Linkedin, Instagram } from "lucide-react";
import { NavBar } from "@/src/components/ui/tubelight-navbar";
import GalleryPage from "./pages/GalleryPage";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export { GalleryPage, Footer, ShimmerButton };

export function ShimmerButtonDemo() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center p-6 bg-[#111216]">
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center text-sm font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold leading-none tracking-tight text-[#4EFE32] lg:text-lg">
          Shimmer Button
        </span>
      </ShimmerButton>
    </div>
  );
}

export function BentoGridGalleryDemo() {
  return <GalleryPage />;
}

export function Demo() {
  return (
    <div className="w-full bg-[#111216]">
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
          { href: "#about-section", label: "Brand Promotion & Identity" },
          { href: "#about-section", label: "Experiential Activations" },
          { href: "#about-section", label: "Campaign Strategy" },
          { href: "#about-section", label: "Real Estate Solutions" },
          { href: "#about-section", label: "Modern Trade Sampling" },
        ]}
        mainLinks={[
          { href: "#home", label: "Home" },
          { href: "#gallery", label: "Gallery & Deployments" },
          { href: "#about-section", label: "About Capabilities" },
          { href: "#team-section", label: "Executive Leadership" },
          { href: "#clients", label: "Client Partners" },
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
}

export default function DemoOne() {
  const [currentPage, setCurrentPage] = useState<"home" | "gallery">(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("gallery")) {
        return "gallery";
      }
    }
    return "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("gallery")) {
        setCurrentPage("gallery");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToGallery = () => {
    setCurrentPage("gallery");
    window.location.hash = "#gallery";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    window.location.hash = "#home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToContact = () => {
    setCurrentPage("home");
    window.location.hash = "#contact-section";
    setTimeout(() => {
      const el = document.getElementById("contact-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#111216]">
      {/* Unified Persistent Tubelight Navbar (Anchored bottom on mobile, top on desktop) */}
      <NavBar
        activeItem={currentPage === "gallery" ? "Gallery" : "Home"}
        items={[
          {
            name: "Home",
            url: "#home",
            onClick: (e) => {
              e.preventDefault();
              navigateToHome();
            },
          },
          {
            name: "Gallery",
            url: "#gallery",
            onClick: (e) => {
              e.preventDefault();
              navigateToGallery();
            },
          },
          {
            name: "About us",
            url: "#about-section",
            onClick: (e) => {
              e.preventDefault();
              if (currentPage !== "home") {
                navigateToHome();
                setTimeout(() => {
                  const el = document.getElementById("about-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 150);
              } else {
                const el = document.getElementById("about-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            },
          },
        ]}
      />

      {currentPage === "gallery" ? (
        <GalleryPage
          onNavigateHome={navigateToHome}
          onNavigateContact={navigateToContact}
        />
      ) : (
        <div className="min-h-screen w-full bg-[#111216] text-[#ECECEC] flex flex-col selection:bg-[#4EFE32]/30 selection:text-white pb-16 md:pb-0">
          {/* Hero Section */}
          <ShaderShowcase
            onNavigateGallery={navigateToGallery}
            onNavigateContact={() => {
              const el = document.getElementById("contact-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />

          {/* Client Showcase Section - Seamless blend below hero with full-width horizontal marquee */}
          <div id="clients" className="relative z-20 w-full bg-[#111216] -mt-6 pb-12 overflow-hidden border-b border-white/5">
            <MarqueeLogoScroller
              title="Trusted by Industry Giants"
              logos={clientBrands}
              speed="normal"
            />
          </div>

          {/* About Us & Services Showcase Section */}
          <AboutUsSection />

          {/* Team Showcase Section */}
          <TeamSection />

          {/* Contact Section */}
          <ContactSection />

          {/* Footer Section */}
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
              { href: "#about-section", label: "Brand Promotion & Identity" },
              { href: "#about-section", label: "Experiential Activations" },
              { href: "#about-section", label: "Campaign Strategy" },
              { href: "#about-section", label: "Real Estate Solutions" },
              { href: "#about-section", label: "Modern Trade Sampling" },
            ]}
            mainLinks={[
              { href: "#home", label: "Home" },
              { href: "#gallery", label: "Gallery & Deployments" },
              { href: "#about-section", label: "About Capabilities" },
              { href: "#team-section", label: "Executive Leadership" },
              { href: "#clients", label: "Client Partners" },
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
      )}
    </div>
  );
}
