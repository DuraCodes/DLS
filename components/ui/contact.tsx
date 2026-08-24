import React from 'react';
import { Button } from '@/components/ui/button';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Send, Mail, Phone, MapPin, Twitter, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Component as InteractivePill } from '@/components/ui/backed-by-yc';

export interface ContactSectionProps {
  /**
   * The title for the contact section.
   */
  title?: string;
  /**
   * The subtitle or main message for the introductory part.
   */
  mainMessage?: string;
  /**
   * The contact email to display.
   */
  contactEmail?: string;
  /**
   * Array of social media links. Each object should have an 'id', 'name', 'iconSrc', and 'href'.
   */
  socialLinks?: Array<{ id: string; name: string; iconSrc: string; href: string }>;
  /**
   * Placeholder image for the background.
   */
  backgroundImageSrc?: string;
  /**
   * Callback function when the form is submitted.
   * @param data The form data.
   */
  onSubmit?: (data: any) => void;
  /**
   * Optional custom class name
   */
  className?: string;
}

const defaultSocialLinks = [
  { id: '1', name: 'X', iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/x.svg', href: '#x' },
  { id: '2', name: 'Instagram', iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg', href: '#instagram' },
  { id: '3', name: 'LinkedIn', iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg', href: '#linkedin' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Initiate a Strategic Project",
  mainMessage = "Let's Connect",
  contactEmail = "DLorenzSolutions@gmail.com",
  socialLinks = defaultSocialLinks,
  backgroundImageSrc = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
  onSubmit,
  className = "",
}) => {
  const [formData, setFormData] = React.useState<{
    name: string;
    organization: string;
    email: string;
    message: string;
    projectType: string[];
  }>({
    name: '',
    organization: '',
    email: '',
    message: '',
    projectType: [],
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSubmit?.(formData);
      console.log("Form submitted:", formData);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      organization: '',
      email: '',
      message: '',
      projectType: [],
    });
    setSubmitted(false);
  };

  const projectTypeOptions = [
    'Brand Promotion & Identity',
    'Campaign Strategy',
    'Experiential Activation & Sampling',
    'Real Estate Solutions',
    'Modern Trade Promotions',
    'Landed Asset Portfolio',
  ];

  const renderSocialIcon = (name: string, iconSrc: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('x') || lower.includes('twitter')) {
      return <Twitter className="h-4 w-4 text-[#ECECEC]/80" />;
    }
    if (lower.includes('instagram')) {
      return <Instagram className="h-4 w-4 text-[#ECECEC]/80" />;
    }
    if (lower.includes('linkedin')) {
      return <Linkedin className="h-4 w-4 text-[#ECECEC]/80" />;
    }
    return <img src={iconSrc} alt={name} className="h-4 w-4 dark:invert opacity-80" />;
  };

  return (
    <section id="contact-section" className={`relative min-h-[90vh] w-full overflow-hidden bg-[#111216] text-[#ECECEC] py-16 md:py-24 ${className}`}>
      {/* Background Image and Ambient Dark Gradients */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-20 scale-105"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111216] via-[#111216]/90 to-[#111216] z-0 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#4EFE32]/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00C2CB]/[0.05] blur-[140px] pointer-events-none" />

      {/* Animated Subtle Floating Bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#4EFE32]/25 rounded-full animate-bubble opacity-0 backdrop-blur-sm"
            style={{
              width: `${(i % 4) * 8 + 12}px`,
              height: `${(i % 4) * 8 + 12}px`,
              left: `${(i * 8.5) % 96}%`,
              animationDelay: `${(i * 1.3) % 8}s`,
              animationDuration: `${14 + (i % 6) * 3}s`,
              top: `${50 + (i * 7) % 45}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full p-2 sm:p-4 rounded-xl flex-grow items-center">
          
          {/* Left Side: Headline & Brand Context */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-4">
            <div className="w-fit">
              <InteractivePill
                showFullHeight={false}
                size="sm"
                text="Direct Consultation & Inquiries"
                glowColor="rgba(78,254,50,0.3)"
                badgeClassName="!bg-[#1A1C22]/90 border-[#4EFE32]/30 text-white font-medium"
              />
            </div>

            <h2 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-3xl sm:text-4xl md:text-5xl text-[#ECECEC] leading-tight">
              {title}
            </h2>

            <p className="font-['Barlow_Semi_Condensed',sans-serif] text-[#ECECEC]/75 text-sm sm:text-base leading-relaxed max-w-md">
              Whether you are scaling an FMCG brand activation, launching a nationwide campaign, or securing high-yield landed property, our team reviews briefs weekly.
            </p>

            {/* Quick Contact Info */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-start gap-3 text-[#ECECEC]/90">
                <div className="w-9 h-9 rounded-full bg-[#1A1C22] border border-white/10 flex items-center justify-center text-[#4EFE32] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs text-[#ECECEC]/50 font-semibold">Direct Inquiries</p>
                  <a href={`mailto:${contactEmail}`} className="font-['Barlow_Semi_Condensed',sans-serif] text-sm sm:text-base text-[#ECECEC] hover:text-[#4EFE32] font-medium transition-colors">
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#ECECEC]/90">
                <div className="w-9 h-9 rounded-full bg-[#1A1C22] border border-white/10 flex items-center justify-center text-[#00C2CB] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs text-[#ECECEC]/50 font-semibold">Phone Support</p>
                  <p className="font-['Barlow_Semi_Condensed',sans-serif] text-sm text-[#ECECEC]">
                    <a href="tel:+2349060909034" className="hover:text-[#4EFE32] transition-colors">+234 906 090 9034</a>
                    {" • "}
                    <a href="tel:+2348168661924" className="hover:text-[#4EFE32] transition-colors">+234 816 866 1924</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#ECECEC]/90">
                <div className="w-9 h-9 rounded-full bg-[#1A1C22] border border-white/10 flex items-center justify-center text-[#4EFE32] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs text-[#ECECEC]/50 font-semibold">Head Office</p>
                  <p className="font-['Barlow_Semi_Condensed',sans-serif] text-xs sm:text-sm text-[#ECECEC]/80 leading-snug">
                    Federal Peace Estate, Old Garage Bus Stop, LASU-Igando Road, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div>
                <p className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs text-[#ECECEC]/50 font-semibold mb-2.5">Follow & Connect</p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.id}
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-9 w-9 rounded-lg bg-[#1A1C22] border-white/10 hover:border-[#4EFE32]/50 hover:bg-[#1A1C22]/80 text-[#ECECEC]/80 hover:text-[#4EFE32] transition-all"
                    >
                      <a href={link.href} aria-label={link.name} target="_blank" rel="noopener noreferrer">
                        {renderSocialIcon(link.name, link.iconSrc)}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Glassmorphic Card */}
          <div className="lg:col-span-7 bg-[#1A1C22]/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10 hover:border-white/15 transition-all">
            <h3 className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-xl sm:text-2xl text-[#ECECEC] mb-6 flex items-center gap-2">
              {mainMessage}
            </h3>

            {submitted ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#4EFE32]/10 border border-[#4EFE32]/30 flex items-center justify-center mx-auto text-[#4EFE32] animate-in zoom-in-50 duration-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-medium text-[#ECECEC]">Inquiry Received</h4>
                <p className="text-[#ECECEC]/70 text-sm max-w-sm mx-auto">
                  Thank you for reaching out, <span className="text-[#ECECEC] font-medium">{formData.name}</span>. A DLORENZ SOLUTIONS specialist will review your project requirements and follow up within 24 hours.
                </p>
                <ShimmerButton
                  onClick={handleReset}
                  shimmerColor="#4EFE32"
                  shimmerSize="0.05em"
                  background="#111216"
                  className="mt-4 border-white/10 hover:border-[#4EFE32]/40"
                >
                  <span className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#ECECEC] group-hover:text-[#4EFE32]">
                    Submit another inquiry
                  </span>
                </ShimmerButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#ECECEC]/75">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Katherine Bell"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="font-['Barlow_Semi_Condensed',sans-serif] bg-[#111216] border-white/10 text-[#ECECEC] placeholder:text-[#ECECEC]/30 focus-visible:ring-[#4EFE32] focus-visible:border-[#4EFE32] h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="organization" className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#ECECEC]/75">Organization / Entity</Label>
                    <Input
                      id="organization"
                      name="organization"
                      placeholder="e.g., Coca-Cola Nigeria / Retail Group"
                      value={formData.organization}
                      onChange={handleChange}
                      className="font-['Barlow_Semi_Condensed',sans-serif] bg-[#111216] border-white/10 text-[#ECECEC] placeholder:text-[#ECECEC]/30 focus-visible:ring-[#4EFE32] focus-visible:border-[#4EFE32] h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#ECECEC]/75">Work Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g., contact@organization.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="font-['Barlow_Semi_Condensed',sans-serif] bg-[#111216] border-white/10 text-[#ECECEC] placeholder:text-[#ECECEC]/30 focus-visible:ring-[#4EFE32] focus-visible:border-[#4EFE32] h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#ECECEC]/75">Project Brief & Activation Scope</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your market goals, project timeline, and activation scope..."
                    className="font-['Barlow_Semi_Condensed',sans-serif] min-h-[90px] bg-[#111216] border-white/10 text-[#ECECEC] placeholder:text-[#ECECEC]/30 focus-visible:ring-[#4EFE32] focus-visible:border-[#4EFE32]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2.5 pt-1">
                  <Label className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#ECECEC]/75">Project Typology</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypeOptions.map((option) => {
                      const optionId = option.replace(/\s/g, '-').toLowerCase();
                      const isSelected = formData.projectType.includes(option);
                      return (
                        <div
                          key={option}
                          onClick={() => handleCheckboxChange(option, !isSelected)}
                          className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#4EFE32]/10 border-[#4EFE32]/50 text-[#4EFE32]'
                              : 'bg-[#111216]/70 border-white/5 text-[#ECECEC]/70 hover:border-white/15 hover:bg-[#111216]'
                          }`}
                        >
                          <Checkbox
                            id={optionId}
                            checked={isSelected}
                            onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                            className="border-white/20 data-[state=checked]:bg-[#4EFE32] data-[state=checked]:border-[#4EFE32] data-[state=checked]:text-[#111216]"
                          />
                          <Label
                            htmlFor={optionId}
                            className="font-['Barlow_Semi_Condensed',sans-serif] text-xs font-normal cursor-pointer select-none leading-none truncate"
                          >
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting}
                  shimmerColor="#4EFE32"
                  shimmerSize="0.1em"
                  background="linear-gradient(135deg, #1A1C22 0%, #111216 100%)"
                  className="w-full h-12 shadow-xl shadow-[#4EFE32]/20 border border-[#4EFE32]/40 mt-4 cursor-pointer"
                >
                  <span className="font-['Barlow_Condensed',sans-serif] uppercase tracking-wider font-bold text-base text-[#4EFE32] flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <span>Submitting inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#4EFE32]" />
                        <span>Let&apos;s Connect</span>
                      </>
                    )}
                  </span>
                </ShimmerButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
