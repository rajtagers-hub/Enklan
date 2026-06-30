"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import CoinIntro from "./CoinIntro";
import { 
  MessageCircle, Mail, MapPin, Phone,
  Menu, ArrowRight, Zap, Sun, Home as HomeIcon, 
  ChevronLeft, ChevronRight, ArrowUpRight
} from "lucide-react";
import { Instagram, Facebook, Linkedin } from "./Icons";

import Logo from "./Logo";
import SideMenu from "./SideMenu";
import ContactModal from "./ContactModal";
import SecretCoin from "./SecretCoin";
import { useCMS } from "@/context/CMSContext";
import Link from "next/link";

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
    <div ref={ref} className="stat-counter text-4xl md:text-6xl font-light tracking-tight text-white">
      {count}{suffix}
    </div>
  );
}

/* ───────────────────────────────────────────────
   PROJECT CAROUSEL COMPONENT
   ─────────────────────────────────────────────── */
function ProjectCarousel({ projects }: { projects: any[] }) {
  const [current, setCurrent] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(1, Math.ceil(projects.length / itemsPerSlide));

  const next = useCallback(() => setCurrent(c => (c + 1) % totalSlides), [totalSlides]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + totalSlides) % totalSlides), [totalSlides]);

  const visibleProjects = projects.slice(
    current * itemsPerSlide,
    current * itemsPerSlide + itemsPerSlide
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleProjects.map((project: any, i: number) => (
          <motion.div
            key={`${current}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-[16/10] rounded-[2rem] overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <div className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-3">
                {project.category}
              </div>
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{project.title}</h3>
              {project.description && (
                <p className="text-sm text-zinc-400 line-clamp-2">{project.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 pt-4">
        <button onClick={prev} className="p-3 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <div className="flex gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`carousel-dot ${i === current ? "active" : ""}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-3 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white">
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   MAIN HOME CONTENT
   ─────────────────────────────────────────────── */
export default function HomeContent() {
  const { content } = useCMS();
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (showIntro) {
    return <CoinIntro onComplete={() => setShowIntro(false)} />;
  }

  const SERVICE_IMAGES = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1200",
  ];

  return (
    <main className="relative min-h-screen selection:bg-blue-500/30">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ════════════════════════════════════════════
          HEADER — Transparent → Sticky on scroll
         ════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "header-solid py-4" : "header-transparent py-6 md:py-8"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Logo className={isScrolled ? "scale-90" : ""} />
          
          <div className="hidden lg:flex items-center gap-10">
            <NavLink href="#services">Shërbimet</NavLink>
            <NavLink href="#about">Rreth Nesh</NavLink>
            <NavLink href="/portfolio">Portofoli</NavLink>
            <NavLink href="#projects">Projekte</NavLink>
            <NavLink href="#contact">Kontakt</NavLink>
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=1920)" }}
        />
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[2px]" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-4xl"
          >
            <div className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-zinc-600" />
              Inxhinieri & Siguri Elektrike
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight text-white mb-8">
              Përsosje në çdo detaj të <br className="hidden md:block" />
              <span className="text-zinc-500">infrastrukturës elektrike.</span>
            </h1>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors"
              >
                Zbuloni Shërbimet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INTRO SECTION — Clean 2-column Layout
         ════════════════════════════════════════════ */}
      <section id="intro" className="py-32 md:py-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-10"
          >
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.2] tracking-tight text-white">
              Ne projektojmë dhe ndërtojmë sisteme energjetike për një të ardhme më të qëndrueshme.
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed font-light">
              Nga instalimet komplekse industriale tek sistemet inteligjente të shtëpive dhe parqet fotovoltaike. 
              Ekspertiza jonë garanton siguri maksimale dhe efiçencë energjetike të pashoqe.
            </p>
            <Link
              href="/#about"
              className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-zinc-400 transition-colors"
            >
              Lexoni rrugëtimin tonë
              <ArrowUpRight size={16} className="arrow-icon" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1200)" }}
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SERVICES — Refined Accordion Cards
         ════════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-10 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-zinc-700" />
              Fushat e Ekspertizës
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl">
              Zgjidhje teknike për kërkesat më të larta të inxhinierisë.
            </h2>
          </motion.div>

          <div className="accordion-cards">
            {content.services.map((service: any, index: number) => (
              <div
                key={service.slug}
                className={`accordion-card ${activeCard === index ? "active" : ""}`}
                onClick={() => setActiveCard(index)}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div 
                  className="card-bg"
                  style={{ backgroundImage: `url(${SERVICE_IMAGES[index] || SERVICE_IMAGES[0]})` }}
                />
                <div className="card-overlay" />
                
                {/* Collapsed Label */}
                <div className="card-label">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-4">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-zinc-300 writing-vertical-lr rotate-180 hidden md:block tracking-wide">
                    {service.title}
                  </h3>
                  <h3 className="text-lg font-medium text-zinc-300 md:hidden">
                    {service.title}
                  </h3>
                </div>

                {/* Expanded Content */}
                <div className="card-content">
                  <div className="max-w-md">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                      0{index + 1}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-medium text-white mb-6">{service.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
                      {service.desc}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-white text-white transition-all"
                    >
                      <ArrowUpRight size={18} strokeWidth={1.5} className="arrow-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS — Minimalist layout
         ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 md:divide-x divide-white/5">
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
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mt-4">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ABOUT SECTION — Cleaner execution
         ════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-8">
              Misioni Ynë
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.3] text-white">
              Nuk jemi thjesht një kompani inxhinierike; jemi arkitektët e një të ardhmeje me energji inteligjente dhe të sigurt.
            </h2>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              Me një fokus të veçantë në teknologjinë moderne dhe sigurinë absolute, Enklan ndërton sisteme që u rezistojnë kohës dhe kërkesave më të vështira industriale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROJECTS CAROUSEL
         ════════════════════════════════════════════ */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-10 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-zinc-700" />
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

          <ProjectCarousel projects={content.portfolio || []} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT CTA — Elegant
         ════════════════════════════════════════════ */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-10 text-center relative border-y border-white/5">
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
      <footer className="bg-[#050505] pt-24 pb-12 px-6 md:px-10">
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
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Navigimi</h4>
              <div className="flex flex-col gap-4">
                <FooterLink href="/#services">Shërbimet</FooterLink>
                <FooterLink href="/portfolio">Portofoli</FooterLink>
                <FooterLink href="/#about">Rreth Nesh</FooterLink>
                <button onClick={() => setIsContactOpen(true)} className="text-sm font-light text-zinc-400 hover:text-white transition-colors text-left w-fit">Kontakti</button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Kontakt</h4>
              <div className="flex flex-col gap-4">
                <a href={`tel:${content.settings.phone}`} className="text-sm font-light text-zinc-400 hover:text-white transition-colors">{content.settings.phone}</a>
                <a href={`mailto:${content.settings.email}`} className="text-sm font-light text-zinc-400 hover:text-white transition-colors">{content.settings.email}</a>
                <span className="text-sm font-light text-zinc-400">{content.settings.address}</span>
              </div>
              <div className="flex gap-4 pt-4">
                <SocialLink href={content.settings.socials.instagram}><Instagram size={16} /></SocialLink>
                <SocialLink href={content.settings.socials.facebook}><Facebook size={16} /></SocialLink>
                <SocialLink href={content.settings.socials.linkedin}><Linkedin size={16} /></SocialLink>
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

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-500 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}
