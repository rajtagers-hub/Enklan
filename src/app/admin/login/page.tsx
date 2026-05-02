"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "rajtagers@gmail.com" && password === "Revolution20xx") {
      // For now we use a simple state-based auth or local storage
      localStorage.setItem("enklan_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Kredencialet janë të pasakta.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Një email për rivendosjen e fjalëkalimit u dërgua në " + email);
    setTimeout(() => {
      setSuccess("");
      setMode("login");
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="galaxy-bg opacity-30" />
      <div className="stardust" />
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10 space-y-4">
           <Logo className="mx-auto scale-150 mb-8" />
           <h1 className="text-3xl font-black italic uppercase tracking-tighter">Panel i Autorizuar</h1>
           <p className="text-zinc-500 italic text-sm">Ju lutem identifikohuni për të vazhduar.</p>
        </div>

        <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-blue-800" />
           
           <AnimatePresence mode="wait">
             {mode === "login" ? (
               <motion.form 
                 key="login"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 onSubmit={handleLogin} 
                 className="space-y-6"
               >
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Email</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="emri@gmail.com"
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-800/50 transition-all"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Fjalëkalimi</label>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input 
                          type="password" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-800/50 transition-all"
                        />
                     </div>
                  </div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-red-500 text-xs italic text-center font-bold"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-800 hover:text-white transition-all flex items-center justify-center gap-3 group"
                  >
                     Identifikohu
                     <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>

                  <div className="text-center">
                     <button 
                       type="button"
                       onClick={() => setMode("forgot")}
                       className="text-xs text-zinc-600 hover:text-blue-500 transition-colors italic font-bold"
                     >
                       Harruat fjalëkalimin?
                     </button>
                  </div>
               </motion.form>
             ) : (
               <motion.form 
                 key="forgot"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 onSubmit={handleForgot} 
                 className="space-y-6"
               >
                  <div className="space-y-2 text-center mb-8">
                     <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin-slow" />
                     <h2 className="text-xl font-bold uppercase italic">Rivendos Fjalëkalimin</h2>
                     <p className="text-xs text-zinc-500">Fusni email-in tuaj për të marrë udhëzimet.</p>
                  </div>

                  <div className="space-y-2">
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="emri@gmail.com"
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-800/50 transition-all"
                        />
                     </div>
                  </div>

                  {success && (
                    <p className="text-green-500 text-xs italic text-center font-bold">{success}</p>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-blue-800 text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                     Dërgo Linkun
                  </button>

                  <div className="text-center">
                     <button 
                       type="button"
                       onClick={() => setMode("login")}
                       className="text-xs text-zinc-600 hover:text-white transition-colors italic font-bold"
                     >
                       Kthehu te Identifikimi
                     </button>
                  </div>
               </motion.form>
             )}
           </AnimatePresence>
        </div>
        
        <p className="text-center mt-10 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800">
           Sistemi i Sigurisë ENKLAN v2.0
        </p>
      </motion.div>
    </main>
  );
}
