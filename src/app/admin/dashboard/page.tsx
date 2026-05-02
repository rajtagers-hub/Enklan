"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  LogOut, 
  BarChart3, 
  Users, 
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("enklan_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("enklan_auth");
    router.push("/admin/login");
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="galaxy-bg opacity-10 fixed inset-0 pointer-events-none" />
      
      {/* Night Raid Watermark Background */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-white">
          <path fill="currentColor" d="M50 10 L85 40 L85 70 L50 90 L15 70 L15 40 Z" />
          <path stroke="currentColor" strokeWidth="1" fill="none" d="M30 40 Q50 20 70 40 Q70 60 50 80 Q30 60 30 40 Z" />
        </svg>
      </div>

      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl flex flex-col p-8 z-20">
         <div className="mb-16">
            <Logo />
            <div className="mt-4 px-4 py-1.5 rounded-full bg-blue-800/10 border border-blue-500/20 w-fit">
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  <ShieldCheck size={12} /> Admin Mode
               </span>
            </div>
         </div>

         <nav className="flex-1 space-y-2">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active onClick={() => router.push("/admin/dashboard")} />
            <NavItem icon={<Briefcase size={20} />} label="Shërbimet" onClick={() => router.push("/admin/services")} />
            <NavItem icon={<BarChart3 size={20} />} label="Portofoli" onClick={() => router.push("/admin/portfolio")} />
            <NavItem icon={<MessageSquare size={20} />} label="Mesazhet" onClick={() => {}} />
            <NavItem icon={<Users size={20} />} label="Përdoruesit" onClick={() => {}} />
         </nav>

         <div className="pt-8 border-t border-white/5">
            <NavItem icon={<Settings size={20} />} label="Cilësimet" onClick={() => router.push("/admin/settings")} />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 w-full p-4 mt-2 rounded-2xl text-zinc-500 hover:text-red-500 hover:bg-red-500/5 transition-all group"
            >
               <LogOut size={20} />
               <span className="font-bold italic uppercase tracking-tight">Dil nga Paneli</span>
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto relative z-10">
         <header className="flex justify-between items-center mb-16">
            <div className="space-y-1">
               <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mirësevini, Rajta</h1>
               <p className="text-zinc-500 italic">Sot është 2 Maj 2026. Çdo gjë duket në rregull.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <div className="text-sm font-bold">rajtagers@gmail.com</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Administrator</div>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-blue-800 flex items-center justify-center font-black text-xl italic shadow-lg shadow-blue-800/20">
                  R
               </div>
            </div>
         </header>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCard label="Vizitorë Totale" value="2.4k" delta="+12%" />
            <StatCard label="Projekte aktive" value="18" delta="+3" />
            <StatCard label="Mesazhe të reja" value="7" delta="Ri" highlight />
         </div>

         {/* Content Area Preview */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel p-8 bg-white/5 border-white/10 rounded-3xl space-y-6">
               <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center justify-between">
                  Veprimet e Fundit
                  <ChevronRight size={18} className="text-zinc-700" />
               </h2>
               <div className="space-y-4">
                  <ActivityItem label="Ndryshim në 'Panele Diellore'" time="Para 2 orësh" />
                  <ActivityItem label="Shtimi i projektit 'Solaris'" time="Dje, 14:30" />
                  <ActivityItem label="Përditësim i termave ligjorë" time="2 ditë më parë" />
               </div>
            </div>

            <div className="glass-panel p-8 bg-white/5 border-white/10 rounded-3xl space-y-6">
               <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center justify-between">
                  Statusi i Sistemit
                  <ChevronRight size={18} className="text-zinc-700" />
               </h2>
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex justify-between items-center">
                     <span className="text-sm font-bold text-green-500">Serveri: ONLINE</span>
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex justify-between items-center">
                     <span className="text-sm font-bold text-blue-500">Databaza: SINRONIZUAR</span>
                     <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
      flex items-center gap-4 w-full p-4 rounded-2xl transition-all group
      ${active ? 'bg-blue-800 text-white shadow-lg shadow-blue-800/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}
    `}>
       <span className={`${active ? 'text-white' : 'group-hover:text-blue-500 transition-colors'}`}>{icon}</span>
       <span className="font-bold italic uppercase tracking-tight">{label}</span>
    </button>
  );
}

function StatCard({ label, value, delta, highlight = false }: { label: string, value: string, delta: string, highlight?: boolean }) {
  return (
    <div className={`glass-panel p-8 rounded-3xl border border-white/5 ${highlight ? 'bg-blue-800/5' : 'bg-white/5'}`}>
       <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">{label}</div>
       <div className="flex items-baseline gap-4">
          <div className="text-4xl font-black italic uppercase tracking-tighter">{value}</div>
          <div className="text-xs font-bold text-blue-500">{delta}</div>
       </div>
    </div>
  );
}

function ActivityItem({ label, time }: { label: string, time: string }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
       <span className="text-sm text-zinc-400 font-medium italic group-hover:text-white transition-colors">{label}</span>
       <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{time}</span>
    </div>
  );
}
