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
    <div ref={ref} className="stat-counter text-5xl md:text-7xl font-bold tracking-tight text-white">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleProjects.map((project: any, i: number) => (
          <motion.div
            key={`${current}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2">
                {project.category}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
              {project.description && (
                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{project.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`carousel-dot ${i === current ? "active" : ""}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
          <ChevronRight size={20} className="text-white" />
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? "header-solid py-3" : "header-transparent py-5"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Logo className={isScrolled ? "scale-90" : ""} />
          
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="#services">Shërbimet</NavLink>
            <NavLink href="#about">Rreth Nesh</NavLink>
            <NavLink href="/portfolio">Portofoli</NavLink>
            <NavLink href="#projects">Projekte</NavLink>
            <NavLink href="#contact">Kontakt</NavLink>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <SecretCoin />
            <button
              onClick={() => setIsContactOpen(true)}
              className="group bg-white text-black px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest hover:bg-blue-700 hover:text-white transition-all flex items-center gap-2"
            >
              <span>Na Kontaktoni</span>
              <ArrowUpRight size={14} className="arrow-icon" />
            </button>
            <button
              className="p-3 hover:bg-white/5 rounded-xl transition-all lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO — Full-screen with background image
         ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=1920)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="text-zinc-300">Mirësevini në</span>{" "}
              <span className="text-white font-extrabold">ENKLAN</span>
              <span className="text-zinc-300">,</span>
              <br />
              <span className="text-zinc-300">lider në fushën e</span>{" "}
              <span className="text-white">inxhinierisë elektrike.</span>
            </h1>
          </motion.div>
        </div>

        {/* Scroll-down arrow */}
        <motion.a
          href="#intro"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 rounded-full border border-white/20 hover:border-white/50 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 9.8 9.8" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m.4 .4 4.5 4.5 4.5-4.5" />
          </svg>
        </motion.a>
      </section>

      {/* ════════════════════════════════════════════
          INTRO SECTION — 3-column layout (Vega style)
         ════════════════════════════════════════════ */}
      <section id="intro" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Text Column */}
          <div className="bg-[#111] p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                Ndërtojmë të Ardhmen me Energji të Qëndrueshme.
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Nga instalimet elektrike te panelet diellore. Bashkohuni me ne në revolucionin e energjisë së pastër.
              </p>
              <Link
                href="/#about"
                className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-all"
              >
                Mëso Më Shumë
                <ArrowUpRight size={16} className="arrow-icon" />
              </Link>
            </motion.div>
          </div>

          {/* Image Card 1 */}
          <div className="relative h-64 lg:h-auto overflow-hidden group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800)" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <h3 className="text-xl md:text-2xl font-bold text-white">Smart Home</h3>
            </div>
          </div>

          {/* Image Card 2 */}
          <div className="relative h-64 lg:h-auto overflow-hidden group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800)" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <h3 className="text-xl md:text-2xl font-bold text-white">Panele Diellore</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SERVICES — Expanding Accordion Cards
         ════════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-4">Shërbimet Tona</h2>
            <p className="text-zinc-500 text-lg max-w-xl">Zgjidhje moderne për infrastrukturë bashkëkohore.</p>
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
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{service.title}</h3>
                </div>

                {/* Expanded Content */}
                <div className="card-content">
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-400">
                      0{index + 1}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
                      {service.desc}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-widest hover:text-blue-400 transition-colors pt-2"
                    >
                      <ArrowUpRight size={20} className="arrow-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS — Animated Counters
         ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#111] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            {[
              { value: "100", suffix: "%", label: "Siguri Teknike" },
              { value: "24", suffix: "/7", label: "Mbështetje Teknike" },
              { value: "50", suffix: "+", label: "Projekte të Realizuara" },
              { value: "2025", suffix: "", label: "Viti i Themelimit" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SCROLLING MARQUEE BANNER
         ════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-blue-700 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-2xl md:text-4xl font-bold text-white/90 uppercase tracking-wider mx-8 md:mx-16 whitespace-nowrap">
                Inxhinieri Elektrike &nbsp;•&nbsp; Panele Diellore &nbsp;•&nbsp; Smart Home &nbsp;•&nbsp; Mirëmbajtje &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ABOUT SECTION
         ════════════════════════════════════════════ */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Rreth Nesh</div>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight text-white">
              Ekselencë që nga<br />Viti 2025
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {content.about.description}
            </p>
            <div className="flex gap-10 pt-4 border-t border-white/10">
              {content.about.stats?.map((stat: any, i: number) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden group"
          >
            <img 
              src={content.about.image}
              alt="About Enklan" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROJECTS CAROUSEL
         ════════════════════════════════════════════ */}
      <section id="projects" className="py-20 md:py-32 px-6 md:px-10 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Portofoli</div>
              <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white">Projekte të Realizuara</h2>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              Shiko të Gjitha
              <ArrowUpRight size={16} className="arrow-icon" />
            </Link>
          </motion.div>

          <ProjectCarousel projects={content.portfolio || []} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT CTA
         ════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto space-y-10"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white">
            Keni një projekt në mendje?
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto">
            Jemi gati të japim zgjidhjen më të mirë inxhinierike për nevojat tuaja.
          </p>
          <button
            onClick={() => setIsContactOpen(true)}
            className="group bg-white text-black px-12 py-5 rounded-full font-semibold uppercase tracking-widest hover:bg-blue-700 hover:text-white transition-all inline-flex items-center gap-3"
          >
            Na Kontaktoni Sot
            <ArrowUpRight size={18} className="arrow-icon" />
          </button>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          MOBILE BOTTOM DOCK
         ════════════════════════════════════════════ */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="p-3 text-zinc-500 hover:text-white transition-colors">
            <HomeIcon size={22} />
          </button>
          <a href={`${content.settings.socials.whatsapp}`} target="_blank" className="p-3 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20">
            <MessageCircle size={22} />
          </a>
          <a href={`tel:${content.settings.phone}`} className="p-3 text-zinc-500 hover:text-white transition-colors">
            <Phone size={22} />
          </a>
          <button onClick={() => setIsMenuOpen(true)} className="p-3 text-zinc-500 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════ */}
      <footer className="bg-[#0a0a0a] border-t border-white/5">
        {/* Newsletter */}
        <div className="border-b border-white/5 py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Abonohuni në Newsletter
              </h2>
              <p className="text-zinc-500">
                Merrni lajmet më të fundit rreth projekteve tona.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="E-mail-i juaj" 
                className="bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-700/50 w-full md:w-72 transition-all"
              />
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold uppercase tracking-widest hover:bg-blue-700 hover:text-white transition-all whitespace-nowrap">
                Dërgo
              </button>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16">
            {/* Logo & Info */}
            <div className="space-y-6 lg:col-span-5">
              <Logo />
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                Lider në inxhinierinë elektrike dhe zgjidhjet e energjisë së qëndrueshme në Shqipëri.
              </p>
              <div className="space-y-3">
                <ContactLink icon={<Phone size={14} />} href={`tel:${content.settings.phone}`}>{content.settings.phone}</ContactLink>
                <ContactLink icon={<Mail size={14} />} href={`mailto:${content.settings.email}`}>{content.settings.email}</ContactLink>
                <div className="flex items-center gap-3 text-zinc-500 text-xs">
                  <MapPin size={14} className="text-blue-500 shrink-0" />
                  <span>{content.settings.address}</span>
                </div>
              </div>
              {/* Social Icons */}
              <div className="flex gap-3 pt-2">
                <SocialLink href={content.settings.socials.instagram}><Instagram size={18} /></SocialLink>
                <SocialLink href={content.settings.socials.facebook}><Facebook size={18} /></SocialLink>
                <SocialLink href={content.settings.socials.linkedin}><Linkedin size={18} /></SocialLink>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-5 lg:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Shërbimet</h3>
              <div className="flex flex-col gap-3">
                {content.services.map((service: any) => (
                  <FooterLink key={service.slug} href={`/services/${service.slug}`}>{service.title}</FooterLink>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-5 lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Kushtet Ligjore</h3>
              <div className="flex flex-col gap-3">
                <FooterLink href="/terms">Kushtet e Përdorimit</FooterLink>
                <FooterLink href="/privacy">Politika e Privatësisë</FooterLink>
                <FooterLink href="/cookies">Politika e Cookies</FooterLink>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-5 lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Kompania</h3>
              <div className="flex flex-col gap-3">
                <FooterLink href="/#about">Rreth Nesh</FooterLink>
                <FooterLink href="/portfolio">Portofoli</FooterLink>
                <button onClick={() => setIsContactOpen(true)} className="text-sm text-zinc-500 hover:text-white transition-colors text-left">Kontakti</button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              © 2026 Të gjitha të drejtat të rezervuara nga ENKLAN Sh.p.k
            </div>
            <div className="text-[10px] font-semibold tracking-widest text-zinc-700 uppercase">
              Powered by Enklan
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
    <Link href={href} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors tracking-wide">
      {children}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-zinc-500 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function ContactLink({ icon, href, children }: { icon: React.ReactNode; href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-xs group">
      <span className="text-blue-500 shrink-0">{icon}</span>
      <span>{children}</span>
    </a>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
    >
      {children}
    </a>
  );
}
