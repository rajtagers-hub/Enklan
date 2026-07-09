"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Menu, ArrowRight, ArrowUpRight,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Instagram, Facebook, Linkedin } from "./Icons";
import Image from "next/image";

import Logo from "./Logo";
import SideMenu from "./SideMenu";
import ContactModal from "./ContactModal";
import ProjectModal from "./ProjectModal";
import SecretCoin from "./SecretCoin";
import { useCMS } from "@/context/CMSContext";
import Link from "next/link";

/* ───────────────────────────────────────────────
   FALLBACK IMAGES
   ─────────────────────────────────────────────── */
const FALLBACK_IMAGE = "/images/hero-bg.png";

const SERVICE_FALLBACKS: Record<string, string> = {
  "projektim-elektrik": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
  "panele-diellore": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200",
  "smart-home": "/images/smart-home-bg.png",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getServiceImage(service: any) {
  if (service.image && typeof service.image === 'string' && service.image.trim() !== "") return service.image;
  if (Array.isArray(service.subsections) && service.subsections.length > 0 && service.subsections[0].image && typeof service.subsections[0].image === 'string' && service.subsections[0].image.trim() !== "") {
    return service.subsections[0].image;
  }
  return SERVICE_FALLBACKS[service.slug as string] || FALLBACK_IMAGE;
}

/* ───────────────────────────────────────────────
   ANIMATED COUNTER COMPONENT
   ─────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  const numericTarget = parseInt(target.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(numericTarget / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  return (
    <div ref={ref} className="stat-counter text-4xl md:text-6xl font-light tracking-tight text-white whitespace-nowrap">
      {count}{suffix}
    </div>
  );
}

/* ───────────────────────────────────────────────
   MAIN HOME CONTENT
   ─────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomeContent({ initialData }: { initialData?: any }) {
  const { content } = useCMS();
  
  // Use CMS data or fallback to passed initial data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageData = content || initialData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroImage = (content.hero?.image && typeof content.hero.image === 'string' && content.hero.image.trim() !== "") ? content.hero.image : FALLBACK_IMAGE;
  const introImage = (content.about?.image && typeof content.about.image === 'string' && content.about.image.trim() !== "") ? content.about.image : FALLBACK_IMAGE;

  const heroImages = [
    heroImage,
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000",
  ];
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    // Scroll intersection logic
    let lastSection = "hero";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id && entry.target.id !== lastSection) {
            lastSection = entry.target.id;
            setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    // Auto-slide logic
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [heroImages.length]);

  return (
    <main className="relative min-h-screen selection:bg-blue-500/30">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />

      {/* ════════════════════════════════════════════
          HEADER — Transparent → Sticky on scroll
         ════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "header-solid py-4" : "header-transparent py-6 md:py-8"
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between">
          <Logo className={isScrolled ? "scale-90" : ""} />
          
          <div className="hidden lg:flex items-center gap-10">
            <Link href="#services" className="text-white hover:text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">Shërbimet</Link>
            <Link href="#about" className="text-white hover:text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">Rreth Nesh</Link>
            <Link href="/portfolio" className="text-white hover:text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">Portofoli</Link>
            <Link href="#projects" className="text-white hover:text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">Projekte</Link>
            <Link href="#contact" className="text-white hover:text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">Kontakt</Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <SecretCoin />
            <button
              onClick={() => setIsContactOpen(true)}
              className="group hidden sm:flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Na Kontaktoni</span>
            </button>
            <button
              aria-label="Open Menu"
              className="p-2 hover:bg-white/5 rounded-full transition-all"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO — Elegant Full-screen
         ════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={heroImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image src={heroImages[heroImageIndex]} alt="Hero Background" fill sizes="100vw" className="object-cover" priority />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 md:px-10 mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-4xl"
          >
            <div className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-blue-600 rounded-full" />
              Inxhinieri & Siguri Elektrike
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight text-white mb-8">
              Përsosje në çdo detaj të <br className="hidden md:block" />
              <span className="text-zinc-400">infrastrukturës elektrike.</span>
            </h1>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors"
              >
                Zbuloni Shërbimet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ABOUT SECTION — Consolidated & Classic
         ════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-56 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-10"
          >
            <div className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-blue-600 rounded-full" />
              Rreth Nesh
            </div>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.2] tracking-tight text-white">
              Nuk jemi thjesht një kompani inxhinierike; jemi arkitektët e një të ardhmeje me energji inteligjente dhe të sigurt.
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed font-light">
              Nga instalimet komplekse industriale tek sistemet inteligjente të shtëpive dhe parqet fotovoltaike. 
              Ekspertiza jonë garanton siguri maksimale dhe efiçencë energjetike të pashoqe. Me një fokus të veçantë në teknologjinë moderne dhe sigurinë absolute, Enklan ndërton sisteme që u rezistojnë kohës dhe kërkesave më të vështira industriale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5"
          >
            <Image 
              src={introImage}
              alt="About Enklan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SERVICES — Refined Grid
         ════════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-48 px-4 md:px-10 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-blue-600 rounded-full" />
              Fushat e Ekspertizës
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl">
              Zgjidhje teknike për kërkesat më të larta të inxhinierisë.
            </h2>
          </motion.div>

          <div className="space-y-32 md:space-y-48">
            {content.services.map((service: any, index: number) => {
              const bgImage = getServiceImage(service);
              return (
                <div key={service.slug} className="flex flex-col gap-12 md:gap-16">
                  {/* Service Banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-square sm:aspect-video lg:aspect-[21/9] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5"
                  >
                    <Image 
                      src={bgImage} 
                      alt={service.title}
                      fill
                      sizes="100vw"
                      priority={index === 0}
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                      <div className="max-w-4xl">
                        <div className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4">
                          0{index + 1}
                        </div>
                        <h3 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">{service.title}</h3>
                        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                          {service.desc}
                        </p>
                        <Link href={`/services/${service.slug}`} className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-[10px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all mt-8 w-fit">
                          Lexo Më Shumë
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Subcategories or Details */}
                  {service.subsections && service.subsections.length > 0 ? (
                    <AutoSlider>
                      {service.subsections.map((sub: any, idx: number) => {
                        const subImage = (sub.image && typeof sub.image === 'string' && sub.image.trim() !== "") ? sub.image : FALLBACK_IMAGE;
                        return (
                          <div
                            key={sub.id}
                            className="group flex flex-col shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] snap-center md:snap-start bg-zinc-950 rounded-3xl overflow-hidden border border-white/5 hover:bg-zinc-900 transition-colors"
                          >
                            <div className="relative aspect-video w-full overflow-hidden">
                              <Image 
                                src={subImage}
                                alt={sub.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority={true}
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                              />
                            </div>
                            <div className="p-8">
                              <h4 className="text-xl font-medium text-white mb-3">{sub.title}</h4>
                              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                                {sub.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </AutoSlider>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="max-w-4xl border-l-2 border-blue-600 pl-8"
                    >
                      <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed font-light">
                        {service.details}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS — Minimalist layout
         ════════════════════════════════════════════ */}
      <section className="py-16 md:py-40 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8 md:divide-x divide-white/5">
            {[
              { value: "100", suffix: "%", label: "Standard Sigurie" },
              { value: "24", suffix: "/7", label: "Monitorim Teknik" },
              { value: "50", suffix: "+", label: "Projekte Globale" },
              { value: "2025", suffix: "", label: "Themeluar" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mt-4 whitespace-nowrap">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          PROJECTS — Static Grid
         ════════════════════════════════════════════ */}
      <section id="projects" className="py-20 md:py-48 px-4 md:px-10 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-4">
                <span className="w-10 h-[2px] bg-blue-600 rounded-full" />
                Portofoli Ynë
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">Projekte Përfaqësuese</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/portfolio"
                className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              >
                Të Gjitha Projektet
                <ArrowUpRight size={14} className="arrow-icon" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(content.portfolio || []).slice(0, 4).map((project: any, i: number) => {
              const projectImage = (project.image && typeof project.image === 'string' && project.image.trim() !== "") ? project.image : FALLBACK_IMAGE;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
                >
                  <Image 
                    src={projectImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <div className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-3">
                      <span className="w-6 h-[1px] bg-blue-600" />
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{project.title}</h3>
                    {project.description && (
                      <p className="text-sm text-zinc-400 line-clamp-2">{project.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT CTA — Elegant
         ════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-48 px-4 md:px-10 text-center relative border-y border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 max-w-3xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">
            Le të ndërtojmë diçka të jashtëzakonshme së bashku.
          </h2>
          <button
            onClick={() => setIsContactOpen(true)}
            className="group px-10 py-5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors inline-flex items-center gap-4"
          >
            Kontaktoni Ekipin
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER — Ultra Clean
         ════════════════════════════════════════════ */}
      <footer className="bg-[#050505] pt-16 pb-8 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24">
            
            {/* Brand & Newsletter */}
            <div className="lg:col-span-6 space-y-12">
              <Logo />
              <div className="space-y-6 max-w-md">
                <h3 className="text-lg text-white font-medium">Qëndroni të informuar.</h3>
                <div className="flex w-full relative">
                  <input 
                    type="email" 
                    placeholder="E-mail adresa juaj" 
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
                    Abonohu
                  </button>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Navigimi</h4>
              <div className="flex flex-col gap-4">
                <FooterLink href="/#services">Shërbimet</FooterLink>
                <FooterLink href="/portfolio">Portofoli</FooterLink>
                <FooterLink href="/#about">Rreth Nesh</FooterLink>
                <button onClick={() => setIsContactOpen(true)} className="text-sm font-light text-zinc-400 hover:text-white transition-colors text-left w-fit">Kontakti</button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Kontakt</h4>
              <div className="flex flex-col gap-4">
                <a href={`tel:${content.settings.phone}`} className="text-sm font-light text-zinc-400 hover:text-white transition-colors">{content.settings.phone}</a>
                <a href={`mailto:${content.settings.email}`} className="text-sm font-light text-zinc-400 hover:text-white transition-colors">{content.settings.email}</a>
                <span className="text-sm font-light text-zinc-400">{content.settings.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <SocialLink href={content.settings.socials.instagram} ariaLabel="Instagram"><Instagram size={16} /></SocialLink>
                <SocialLink href={content.settings.socials.facebook} ariaLabel="Facebook"><Facebook size={16} /></SocialLink>
                <SocialLink href={content.settings.socials.linkedin} ariaLabel="LinkedIn"><Linkedin size={16} /></SocialLink>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              © {new Date().getFullYear()} ENKLAN SH.P.K
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Termat</Link>
              <Link href="/privacy" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Privatësia</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ───────────────────────────────────────────────
   HELPER COMPONENTS
   ─────────────────────────────────────────────── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-light text-zinc-400 hover:text-white transition-colors w-fit">
      {children}
    </Link>
  );
}

function SocialLink({ href, ariaLabel, children }: { href: string; ariaLabel: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="p-3 text-zinc-400 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function AutoSlider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let intervalId: NodeJS.Timeout;
    
    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        if (!slider) return;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        
        // CSS snap-mandatory can fight with JS scroll if the delta isn't large enough.
        // We get the exact width of the first card + gap to ensure we cross the snap threshold.
        const firstCard = slider.firstElementChild as HTMLElement;
        const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 450; 

        // If reached the end, scroll back to start
        if (slider.scrollLeft >= maxScrollLeft - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll right by exactly one card width
          slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3500); // Auto slide every 3.5 seconds
    };

    startAutoPlay();

    // Pause auto-sliding when user interacts
    const pausePlay = () => clearInterval(intervalId);
    const resumePlay = () => startAutoPlay();

    slider.addEventListener('mouseenter', pausePlay);
    slider.addEventListener('mouseleave', resumePlay);
    slider.addEventListener('touchstart', pausePlay);
    slider.addEventListener('touchend', resumePlay);

    return () => {
      clearInterval(intervalId);
      slider.removeEventListener('mouseenter', pausePlay);
      slider.removeEventListener('mouseleave', resumePlay);
      slider.removeEventListener('touchstart', pausePlay);
      slider.removeEventListener('touchend', resumePlay);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {children}
      </div>
    </>
  );
}
