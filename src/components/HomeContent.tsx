"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoinIntro from "./CoinIntro";
import { 
  MessageCircle, Mail, MapPin, Phone,
  Menu, Search, ArrowRight, Zap, Sun, Home as HomeIcon, Settings, Code 
} from "lucide-react";
import { Instagram, Facebook, Linkedin } from "./Icons";

import Logo from "./Logo";
import SideMenu from "./SideMenu";
import ContactModal from "./ContactModal";
import SecretCoin from "./SecretCoin";
import { useCMS } from "@/context/CMSContext";
import Link from "next/link";

export default function HomeContent() {
  const { content } = useCMS();
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  if (showIntro) {
    return <CoinIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <main className="relative min-h-screen selection:bg-blue-500/30">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      {/* Background Layer */}
      <div className="galaxy-bg" />
      <div className="stardust" />

      {/* LEFT SIDEBAR (Socials) */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 hidden md:flex flex-col items-center justify-center border-r border-white/5 z-40 bg-black/20 backdrop-blur-sm">
        <div className="flex flex-col gap-8">
          <SocialIcon icon={<Instagram size={20} />} href={content.settings.socials.instagram} />
          <SocialIcon icon={<Facebook size={20} />} href={content.settings.socials.facebook} />
          <SocialIcon icon={<Linkedin size={20} />} href={content.settings.socials.linkedin} />
          <SocialIcon icon={<Mail size={20} />} href={`mailto:${content.settings.email}`} />
          <motion.a 
            href={`${content.settings.socials.whatsapp}?text=Përshëndetje%20Enklan,%20jam%20i%20interesuar%20për%20shërbimet%20tuaja.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 shadow-lg shadow-[#25D366]/10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle size={20} />
          </motion.a>
        </div>
        <div className="absolute bottom-10">
          <div className="tech-text text-[8px] text-zinc-600 rotate-90 origin-center whitespace-nowrap tracking-[0.5em] font-black">LIDHUNI ME NE</div>
        </div>
      </aside>

      {/* NAVIGATION (Hamburger & Logo) */}
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-10 z-40 bg-linear-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none">
        <div className="flex items-center gap-6">
           <button 
             className="p-4 hover:bg-white/5 rounded-2xl transition-all border border-white/5 group hidden md:block"
             onClick={() => setIsMenuOpen(true)}
           >
              <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
           </button>
           <Logo className="scale-90 md:scale-100" />
        </div>
        <div className="flex items-center gap-4">
           <SecretCoin />
           <button 
             onClick={() => setIsContactOpen(true)}
             className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 hover:text-white transition-all shadow-lg shadow-white/5"
           >
             Na Kontaktoni
           </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="pl-0 md:pl-20"> {/* Offset for left sidebar on desktop */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-10 relative overflow-hidden">
           <motion.div 
             className="text-center z-10 space-y-8"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
           >
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-800/10 border border-blue-500/20 text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">
                  <Zap className="w-3 h-3" /> {content.hero.experienceLabel}
               </div>
               
               <div className="space-y-4">
                 <h1 className="text-5xl md:text-9xl font-black italic uppercase px-4 md:px-0 leading-[0.85] tracking-tighter text-white">
                   {content.hero.title}<br />
                   <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-white to-blue-800 animate-gradient">{content.hero.brand}</span>
                 </h1>
                 <p className="text-lg md:text-2xl text-zinc-400 font-medium italic tracking-wide max-w-sm md:max-w-none mx-auto">
                   {content.hero.subtitle}
                 </p>
               </div>

              <div className="flex flex-wrap justify-center gap-6 pt-6">
                 <button 
                   className="bg-white text-black px-10 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-blue-800 hover:text-white transition-all shadow-xl shadow-blue-800/10 group"
                   onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                 >
                    Shërbimet Tona
                    <ArrowRight className="inline ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                 </button>
                 <Link 
                   href="/portfolio"
                   className="border border-white/20 text-white px-10 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-white/5 transition-all text-center"
                 >
                    Shiko Portofolin
                 </Link>
              </div>
           </motion.div>

           {/* Floating Geometric Elements (Futuristic Vibe) */}
           <motion.div 
             className="absolute top-1/4 -right-20 w-80 h-80 border border-blue-500/10 rounded-full"
             animate={{ scale: [1, 1.2, 1], rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity }}
           />
           <motion.div 
             className="absolute bottom-1/4 -left-20 w-96 h-96 border border-blue-500/10 rounded-full"
             animate={{ scale: [1, 1.3, 1], rotate: -360 }}
             transition={{ duration: 25, repeat: Infinity }}
           />
        </section>

        {/* SERVICES SECTION PREVIEW */}
        <section id="services" className="py-32 px-10 max-w-7xl mx-auto">
           <div className="flex justify-between items-end mb-20">
              <div className="space-y-2">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Shërbimet Që Ne Ofrojmë</h2>
                 <p className="text-zinc-500 italic">Zgjidhje moderne për infrastrukturë bashkëkohore.</p>
              </div>
           </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {content.services.map((service: any) => {
                  const Icon = {
                    Zap: <Zap size={32} />,
                    Sun: <Sun size={32} />,
                    HomeIcon: <HomeIcon size={32} />,
                    Settings: <Settings size={32} />,
                    Code: <Code size={32} />
                  }[service.icon as string] || <Zap size={32} />;

                  return (
                     <ServiceCard 
                       key={service.slug}
                       slug={service.slug}
                       icon={Icon} 
                       title={service.title} 
                       desc={service.desc}
                     />
                  );
               })}
            </div>
        </section>

        {/* RECENT PROJECTS SLIDER */}
        <section className="pb-32 overflow-hidden relative max-w-7xl mx-auto px-10">
           <div className="flex w-fit cursor-grab active:cursor-grabbing">
             <motion.div 
               className="flex"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 25, ease: "linear", repeat: Infinity }}
             >
                {[...content.portfolio, ...content.portfolio].map((project: any, i: number) => (
                   <div key={i} className="pr-6 shrink-0">
                      <div className="relative w-72 md:w-96 h-48 md:h-64 rounded-[2rem] overflow-hidden group border border-white/5">
                         <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                            <div className="text-[10px] font-black tracking-widest text-blue-500 uppercase mb-2">{project.category}</div>
                            <div className="text-xl font-black italic text-white whitespace-normal leading-tight">{project.title}</div>
                         </div>
                      </div>
                   </div>
                ))}
             </motion.div>
           </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-10 max-w-7xl mx-auto border-t border-white/5">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                    Ekselencë që<br />nga Viti 2025
                 </h2>
                 <p className="text-xl text-zinc-400 italic leading-relaxed">
                    Enklan Sh.p.k nuk është thjesht një kompani inxhinierike; është një vizion për të ardhmen e energjisë në Shqipëri. Me fokus te teknologjia dhe siguria, ne ndërtojmë sisteme që qëndrojnë.
                 </p>
                 <div className="flex gap-10 pt-6 border-t border-white/5">
                    <div>
                       <div className="text-4xl font-black italic text-blue-500">100%</div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Siguri Teknike</div>
                    </div>
                    <div>
                       <div className="text-4xl font-black italic text-blue-500">24/7</div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Mbështetje Teknike</div>
                    </div>
                 </div>
              </div>
              <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
                 <div className="absolute inset-0 bg-blue-800/10 group-hover:bg-blue-800/0 transition-colors" />
                 <img 
                   src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800" 
                   alt="About Enklan" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/5 bg-radial from-blue-800/10 to-transparent">
           <div className="text-center space-y-12">
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black italic uppercase tracking-tighter px-4 leading-none">Gati për të bashkëpunuar?</h2>
              <div className="flex flex-wrap justify-center gap-8">
                 <button 
                   onClick={() => setIsContactOpen(true)}
                   className="bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-full font-black uppercase italic tracking-[0.2em] hover:bg-blue-800 hover:text-white transition-all shadow-2xl"
                 >
                    Na Kontaktoni
                 </button>
              </div>
           </div>
        </section>
      </div>

      {/* MOBILE BOTTOM DOCK */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
         <div className="glass-panel bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-2xl shadow-blue-900/20">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-3 text-zinc-500 hover:text-white transition-colors">
               <HomeIcon size={24} />
            </button>
            <a href={`${content.settings.socials.whatsapp}`} target="_blank" className="p-4 bg-green-500/10 text-green-500 rounded-2xl border border-green-500/20">
               <MessageCircle size={24} />
            </a>
            <a href={`tel:${content.settings.phone}`} className="p-3 text-zinc-500 hover:text-white transition-colors">
               <Phone size={24} />
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="p-3 text-zinc-500 hover:text-white transition-colors">
               <Menu size={24} />
            </button>
         </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/5 ml-0 md:ml-20">
         {/* Newsletter Block */}
         <div className="bg-white/5 border-b border-white/5 py-20 px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="space-y-4 max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                     Abonohuni në<br />Newsletter!
                  </h2>
                  <p className="text-zinc-500 italic">
                     Merrni lajmet më të fundit rreth projekteve tona dhe inovacioneve në inxhinierinë elektrike.
                  </p>
               </div>
               <div className="flex w-full md:w-auto gap-2">
                  <input 
                    type="email" 
                    placeholder="E-mail-i juaj" 
                    className="bg-white/5 border border-white/10 rounded-full py-4 px-8 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-800/50 w-full md:w-80 transition-all"
                  />
                  <button className="bg-white text-black px-8 py-4 rounded-full font-black uppercase italic tracking-widest hover:bg-blue-800 hover:text-white transition-all whitespace-nowrap">
                    Dërgo
                  </button>
               </div>
            </div>
         </div>

         {/* Multi-column Footer */}
         <div className="py-20 px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
               {/* Col 1: Logo */}
               <div className="space-y-6 lg:col-span-5 pr-8">
                  <Logo />
                  <p className="text-sm text-zinc-500 italic leading-relaxed">
                     Lider në inxhinierinë elektrike dhe zgjidhjet e energjisë së qëndrueshme në të gjithë rajonin. Ekselencë teknike që nga viti 2025.
                  </p>
                  <div className="pt-4 space-y-3">
                     <a href={content.settings.socials.whatsapp} target="_blank" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors italic text-xs group">
                        <Phone size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                        <span>{content.settings.phone}</span>
                     </a>
                     <a href={`mailto:${content.settings.email}`} className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors italic text-xs group">
                        <Mail size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                        <span>{content.settings.email}</span>
                     </a>
                     <div className="flex items-center gap-3 text-zinc-500 italic text-xs">
                        <MapPin size={14} className="text-blue-500" />
                        <span>{content.settings.address}</span>
                     </div>
                  </div>
               </div>

               {/* Col 2: Services */}
               <div className="space-y-6 lg:col-span-3">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Shërbimet</h3>
                  <div className="flex flex-col gap-3">
                     {content.services.map((service: any) => (
                       <FooterLink key={service.slug} href={`/services/${service.slug}`}>{service.title}</FooterLink>
                     ))}
                  </div>
               </div>

               {/* Col 3: Legal */}
               <div className="space-y-6 lg:col-span-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Kushtet Ligjore</h3>
                  <div className="flex flex-col gap-3">
                     <FooterLink href="/terms">Kushtet e Përdorimit</FooterLink>
                     <FooterLink href="/privacy">Politika e Privatësisë</FooterLink>
                     <FooterLink href="/cookies">Politika e Cookies</FooterLink>
                  </div>
               </div>

               {/* Col 4: Navigation */}
               <div className="space-y-6 lg:col-span-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Kompania</h3>
                  <div className="flex flex-col gap-3">
                     <FooterLink href="/#about">Rreth Nesh</FooterLink>
                     <FooterLink href="/portfolio">Portofoli</FooterLink>
                     <button onClick={() => setIsContactOpen(true)} className="text-sm text-zinc-500 hover:text-white transition-colors italic w-fit text-left">Kontakti</button>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                  © 2026 TË GJITHA TË DREJTAT TË REZERVUARA NGA ENKLAN SH.p.k
               </div>
               <div className="text-[8px] font-black tracking-[0.5em] text-zinc-800 uppercase">
                  POWERED BY ENKLAN AI
               </div>
            </div>
         </div>
      </footer>
    </main>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm text-zinc-500 hover:text-white transition-colors italic w-fit"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-500 hover:text-white transition-colors p-2"
    >
      {icon}
    </a>
  );
}

function ServiceCard({ icon, title, desc, slug }: { icon: any, title: string, desc: string, slug: string }) {
  return (
    <Link href={`/services/${slug}`}>
      <motion.div 
        className="glass-panel p-10 group hover:border-blue-800/30 transition-all cursor-pointer h-full"
        whileHover={{ y: -10 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-800 group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">{title}</h3>
        <p className="text-sm text-zinc-500 italic leading-relaxed">{desc}</p>
        <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
           <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-blue-800 transition-colors" />
        </div>
      </motion.div>
    </Link>
  );
}
