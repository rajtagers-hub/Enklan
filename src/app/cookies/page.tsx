"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie, BarChart3, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function CookiesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="galaxy-bg opacity-10" />
      
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6">
           <button 
             onClick={() => router.push("/")}
             className="p-3 hover:bg-white/5 rounded-xl transition-all border border-white/5 group flex items-center gap-2"
           >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:block text-zinc-500">Homepage</span>
           </button>
           <Logo />
        </div>
      </nav>

      <section className="pt-40 pb-32 px-10 max-w-4xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Politika e Cookies</h1>
          <p className="text-zinc-500 italic">Përditësuar së fundmi: 2 Maj 2026</p>
        </motion.div>

        <div className="space-y-12 text-zinc-400 italic leading-relaxed">
          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Cookie className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">Çfarë janë "Cookies"?</h2>
             </div>
             <p>
                Cookies janë skedarë të vegjël teksti që ruhen në kompjuterin ose pajisjen tuaj celular kur vizitoni një faqe interneti. Ato ndihmojnë faqen të mbajë mend veprimet dhe preferencat tuaja për një periudhë kohe.
             </p>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <BarChart3 className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">Si i përdorim ne ato?</h2>
             </div>
             <p>
                Ne përdorim cookies për:
             </p>
             <ul className="list-disc pl-6 space-y-2">
                <li>Të kuptuar se si vizitorët ndërveprojnë me faqen tonë (Analytics);</li>
                <li>Të mbajtur mend preferencat tuaja të ndërfaqes;</li>
                <li>Të siguruar që faqja të funksionojë në mënyrë korrekte dhe të sigurt.</li>
             </ul>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Settings className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">Menaxhimi i Cookies</h2>
             </div>
             <p>
                Ju mund të kontrolloni dhe/ose fshini cookies sipas dëshirës suaj. Ju mund të fshini të gjitha cookies që janë tashmë në kompjuterin tuaj dhe mund të vendosni shumicën e shfletuesve t'i bllokojnë ato. Megjithatë, kjo mund t'ju detyrojë të rregulloni manualisht disa preferenca çdo herë që vizitoni një faqe.
             </p>
          </section>

          <div className="pt-10 border-t border-white/5 text-[10px] uppercase tracking-[0.5em] text-zinc-700 text-center">
             ENKLAN Sh.p.k - Përvojë e pastër digjitale.
          </div>
        </div>
      </section>
    </main>
  );
}
