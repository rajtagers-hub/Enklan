"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Sun, Home as HomeIcon, Settings, Code, FileText } from "lucide-react";
import Image from "next/image";
import Logo from "@/components/Logo";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import SecretCoin from "@/components/SecretCoin";
import ProjectModal from "@/components/ProjectModal";
import SubcategoryModal from "@/components/SubcategoryModal";
import { useCMS } from "@/context/CMSContext";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { content } = useCMS();
  
  const data = content.services.find((s: any) => s.slug === slug);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSubsection, setActiveSubsection] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const relatedProjects = content.portfolio?.filter((p: any) => p.categoryId === slug) || [];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Shërbimi nuk u gjet</h1>
          <button onClick={() => router.push("/")} className="text-blue-400 hover:underline">Kthehu në fillim</button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
      <div className="galaxy-bg opacity-20" />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 h-20 md:h-24 flex items-center justify-between px-4 md:px-10 z-40 bg-black/80 md:bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4 md:gap-6">
           <button 
             onClick={() => router.push("/")}
             className="p-2 md:p-3 hover:bg-white/5 rounded-xl transition-all border border-white/5 group flex items-center gap-2"
           >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-zinc-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:block text-zinc-500">Homepage</span>
           </button>
           <Logo className="scale-75 md:scale-100 origin-left" />
        </div>
        <div className="flex items-center gap-4">
           <SecretCoin />
           <button 
             onClick={() => setIsContactOpen(true)}
             className="bg-white text-black px-3 py-2 md:px-6 md:py-2.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest hover:bg-blue-800 hover:text-white transition-all shadow-lg shadow-white/5"
           >
             Na Kontaktoni
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-10 md:pb-20 px-4 md:px-10 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-3xl bg-blue-800/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shrink-0 shadow-2xl shadow-blue-800/10">
            <div className="scale-75 md:scale-100">
              {data.icon === "Zap" && <Zap size={48} />}
              {data.icon === "Sun" && <Sun size={48} />}
              {data.icon === "HomeIcon" && <HomeIcon size={48} />}
              {data.icon === "Settings" && <Settings size={48} />}
              {data.icon === "Code" && <Code size={48} />}
              {data.icon === "FileText" && <FileText size={48} />}
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-white px-2 md:px-0">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-medium italic max-w-lg mx-auto md:mx-0">
              {data.desc}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Content Grid */}
      <section className="pb-20 md:pb-32 px-4 md:px-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {data.subsections && data.subsections.length > 0 ? (
            <>
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tight border-l-4 border-blue-800 pl-6 text-white">Nën-Kategoritë e Shërbimit</h2>
              <div className="space-y-4">
                {data.subsections.map((sub: any, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveSubsection(sub)}
                    className="p-5 md:p-6 rounded-[2rem] bg-white/5 border border-white/10 cursor-pointer hover:border-blue-500/50 hover:bg-white/10 transition-all group"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{sub.title}</h3>
                    <p className="text-xs md:text-sm text-zinc-400 italic mt-2 line-clamp-2">{sub.desc}</p>
                    <div className="mt-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-800 flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      Lexo më shumë <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tight border-l-4 border-blue-800 pl-6 text-white">Pse të na zgjidhni ne?</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-blue-800 group-hover:scale-150 transition-transform" />
                  <span className="text-zinc-300 font-medium italic text-sm md:text-base">Zgjidhje të personalizuara teknike</span>
                </div>
                <div className="flex items-center gap-4 group bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-blue-800 group-hover:scale-150 transition-transform" />
                  <span className="text-zinc-300 font-medium italic text-sm md:text-base">Standarde europiane të cilësisë</span>
                </div>
              </div>
            </>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 md:p-10 space-y-6 bg-white/5 border-white/10"
        >
          <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tight">Përshkrimi i Plotë</h2>
          <p className="text-sm md:text-base text-zinc-400 italic leading-relaxed whitespace-pre-line">
            {data.details}
          </p>
        </motion.div>
      </section>

      {/* Modals */}
      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
      <SubcategoryModal 
        isOpen={!!activeSubsection} 
        onClose={() => setActiveSubsection(null)} 
        subcategory={activeSubsection} 
        onContactClick={() => setIsContactOpen(true)} 
        relatedProjects={activeSubsection ? (content.portfolio?.filter((p: any) => p.subcategoryId === activeSubsection.id) || []) : []}
        onProjectClick={(project) => setSelectedProject(project)}
      />

      {/* Related Projects Gallery */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-4 md:px-10 max-w-6xl mx-auto border-t border-white/5">
           <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 text-center">
              Projekte të Realizuara
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project: any, index: number) => (
                 <div key={index} className="relative aspect-video rounded-3xl overflow-hidden group border border-white/5">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                       <div className="text-[10px] font-black tracking-widest text-blue-500 uppercase mb-2">
                          {project.subcategoryId 
                            ? data.subsections?.find((s: any) => s.id === project.subcategoryId)?.title || project.category 
                            : project.category}
                       </div>
                       <div className="text-xl font-black italic text-white whitespace-normal leading-tight">{project.title}</div>
                    </div>
                 </div>
              ))}
           </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 md:px-10 text-center bg-black">
        <p className="text-[10px] font-black tracking-[0.5em] text-zinc-700">
          © 2026 ENKLAN SH.p.k - INXHINIERI DHE SIGURI ELEKTRIKE
        </p>
      </footer>
    </main>
  );
}
