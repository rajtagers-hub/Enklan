"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Zap, Sun, Building2 } from "lucide-react";
import Logo from "@/components/Logo";
import SecretCoin from "@/components/SecretCoin";
import { useCMS } from "@/context/CMSContext";
import ContactModal from "@/components/ContactModal";

export default function PortfolioPage() {
  const router = useRouter();
  const { content } = useCMS();
  const PROJECTS = content.portfolio || [];
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <div className="galaxy-bg opacity-20" />
      
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-10 z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4 md:gap-6">
           <button 
             onClick={() => router.push("/")}
             className="p-3 hover:bg-white/5 rounded-xl transition-all border border-white/5 group flex items-center gap-2"
           >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:block text-zinc-400">Homepage</span>
           </button>
           <Logo />
        </div>
        <div className="flex items-center gap-4">
           <SecretCoin />
           <button 
             onClick={() => setIsContactOpen(true)}
             className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-blue-800 hover:text-white transition-all shadow-lg shadow-white/5"
           >
             Na Kontaktoni
           </button>
        </div>
      </nav>

      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 md:space-y-6 mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-800/10 border border-blue-500/20 text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">
             Projekte të Realizuara
          </div>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            Portofoli Ynë
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 italic max-w-2xl">
            Një përmbledhje e punimeve tona më cilësore, ku inxhinieria takon inovacionin dhe sigurinë elektrike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {PROJECTS.map((project: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-zinc-900"
            >
               {/* Project Image */}
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                 style={{ backgroundImage: `url(${project.image})` }}
               />
               
               {/* Overlay Info */}
               <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent">
                 <div className="space-y-2 md:space-y-4 translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 text-blue-500 text-[10px] font-black uppercase tracking-widest">
                       <ExternalLink className="w-4 h-4" />
                       {project.category}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white">{project.title}</h2>
                    <p className="text-xs md:text-sm text-zinc-300 italic opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100 max-w-md line-clamp-2 md:line-clamp-none">
                      {project.description || project.desc}
                    </p>
                 </div>
               </div>
               
               {/* View Icon */}
               <div className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 scale-100 md:scale-50 md:group-hover:scale-100">
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white" />
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
           <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter">Keni një projekt në mendje?</h2>
           <p className="text-zinc-500 italic text-base md:text-lg px-4 md:px-0">Ne jemi gati të japim zgjidhjen më të mirë inxhinierike për nevojat tuaja.</p>
           <button 
             onClick={() => setIsContactOpen(true)}
             className="bg-blue-800 text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-black uppercase italic tracking-[0.2em] md:tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-2xl shadow-blue-800/20 text-xs md:text-base w-full md:w-auto max-w-sm mx-auto block"
           >
             Na Kontaktoni Sot
           </button>
        </div>
      </section>

      <footer className="py-10 px-10 text-center border-t border-white/5 bg-black">
        <p className="text-[10px] font-black tracking-[0.5em] text-zinc-700">
           © 2026 ENKLAN SH.p.k | INOVACION NË ÇDO DETAJ
        </p>
      </footer>
    </main>
  );
}
