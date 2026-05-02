"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SecretCoin() {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState("");
  const router = useRouter();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // The user will tell me the saying later, for now let's use a placeholder or wait for input
    if (phrase.toLowerCase().trim() === "tatsumi") {
      router.push("/admin/login");
    } else {
      setIsOpen(false);
      setPhrase("");
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden group shadow-lg shadow-black"
      >
        {/* Simplified Night Raid stylized emblem SVG */}
        <svg viewBox="0 0 100 100" className="w-6 h-6 text-blue-800 group-hover:text-white transition-colors">
          <path 
            fill="currentColor" 
            d="M50 10 L85 40 L85 70 L50 90 L15 70 L15 40 Z" 
            className="opacity-20"
          />
          <path 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none" 
            d="M30 40 Q50 20 70 40 Q70 60 50 80 Q30 60 30 40 Z M40 45 Q50 35 60 45 M50 55 L50 65"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 p-10 rounded-[2rem] max-w-sm w-full text-center space-y-6 shadow-2xl"
            >
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Xhironi fjalën tuaj</h3>
              <form onSubmit={handleCheck} className="space-y-4">
                <input 
                  autoFocus
                  type="password"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder="..."
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-center text-white focus:outline-none focus:border-blue-800 transition-all"
                />
                <button type="submit" className="hidden">Enter</button>
              </form>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">Hyrja e Autorizuar Vetëm</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
