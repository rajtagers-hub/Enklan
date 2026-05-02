"use client";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Shield, Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function TermsPage() {
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
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Kushtet e Përdorimit</h1>
          <p className="text-zinc-500 italic">Përditësuar së fundmi: 2 Maj 2026</p>
        </motion.div>

        <div className="space-y-12 text-zinc-400 italic leading-relaxed">
          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <FileText className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">1. Pranimi i Kushteve</h2>
             </div>
             <p>
                Duke hyrë dhe përdorur faqen e internetit të Enklan Sh.p.k, ju pranoni të jeni të detyruar nga këto Kushte të Përdorimit, të gjitha ligjet dhe rregulloret e zbatueshme në Republikën e Shqipërisë. Nëse nuk jeni dakord me ndonjë nga këto kushte, ju ndalohet përdorimi ose qasja në këtë faqe.
             </p>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Shield className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">2. Licenca e Përdorimit</h2>
             </div>
             <p>
                Jepet leje për të shkarkuar përkohësisht një kopje të materialeve (informacion ose softuer) në faqen e internetit të Enklan Sh.p.k vetëm për shikim personal dhe jo-komercial. Kjo është dhënie e një licence, jo transferim i titullit, dhe nën këtë licencë ju nuk mund të:
             </p>
             <ul className="list-disc pl-6 space-y-2">
                <li>Modifikoni ose kopjoni materialet;</li>
                <li>Përdorni materialet për çdo qëllim komercial ose për çdo shfaqje publike;</li>
                <li>Përpiqeni të dekompiloni ose të bëni inxhinieri të kundërt të çdo softueri në faqen e Enklan Sh.p.k;</li>
                <li>Hiqni çdo shënim të drejtës së autorit ose shënime të tjera pronësore nga materialet.</li>
             </ul>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Scale className="text-blue-500" />
                <h2 className="text-xl font-bold uppercase tracking-tight">3. Ligji i Zbatueshëm</h2>
             </div>
             <p>
                Çdo pretendim në lidhje me faqen e internetit të Enklan Sh.p.k do të rregullohet nga ligjet e Republikës së Shqipërisë pa marrë parasysh konfliktin e dispozitave ligjore. Çdo mosmarrëveshje do të zgjidhet në Gjykatën e Rrethit Gjyqësor Tiranë.
             </p>
          </section>

          <div className="pt-10 border-t border-white/5 text-[10px] uppercase tracking-[0.5em] text-zinc-700 text-center">
             Enklan Sh.p.k - Të gjitha të drejtat të rezervuara.
          </div>
        </div>
      </section>
    </main>
  );
}
