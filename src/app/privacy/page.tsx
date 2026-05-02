"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Eye, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function PrivacyPage() {
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
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Politika e Privatësisë</h1>
          <p className="text-zinc-500 italic">Përditësuar së fundmi: 2 Maj 2026</p>
        </motion.div>

        <div className="space-y-12 text-zinc-400 italic leading-relaxed">
          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Database className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">1. Mbledhja e Informacionit</h2>
             </div>
             <p>
                Enklan Sh.p.k mbledh informacion që ju na jepni drejtpërdrejt kur na kontaktoni përmes faqes sonë ose kur abonoheni në buletinin tonë (newsletter). Ky informacion mund të përfshijë emrin tuaj, adresën e emailit dhe numrin e telefonit.
             </p>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Lock className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">2. Mbrojtja e të Dhënave</h2>
             </div>
             <p>
                Ne jemi të përkushtuar të sigurojmë që informacioni juaj të jetë i sigurt. Në përputhje me Ligjin Nr. 9887, datë 10.03.2008 "Për mbrojtjen e të dhënave personale", ne kemi vendosur procedura fizike dhe elektronike për të parandaluar qasjen e paautorizuar ose zbulimin e të dhënave tuaja.
             </p>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Eye className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">3. Të Drejtat tuaja</h2>
             </div>
             <p>
                Ju keni të drejtë të kërkoni detaje të të dhënave personale që ne mbajmë për ju, si dhe të kërkoni korrigjimin ose fshirjen e tyre në çdo kohë duke na kontaktuar në info@enklan.al.
             </p>
          </section>

          <div className="pt-10 border-t border-white/5 text-[10px] uppercase tracking-[0.5em] text-zinc-700 text-center">
             ENKLAN Sh.p.k - Siguria juaj është prioriteti ynë.
          </div>
        </div>
      </section>
    </main>
  );
}
