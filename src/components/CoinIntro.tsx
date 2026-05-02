"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

interface CoinIntroProps {
  onComplete: () => void;
}

export default function CoinIntro({ onComplete }: CoinIntroProps) {
  const [phase, setPhase] = useState<"falling" | "settled" | "flash" | "done">("falling");

  useEffect(() => {
    // Timing the sequence
    const timers = [
      setTimeout(() => setPhase("settled"), 2500), // Coin hits floor and rotates
      setTimeout(() => setPhase("flash"), 4500),   // The electrical blitz
      setTimeout(() => onComplete(), 5000),         // Transition to main site
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Stardust */}
      <div className="stardust opacity-50" />
      <div className="galaxy-bg opacity-30" />

      <AnimatePresence>
        {phase !== "flash" && phase !== "done" && (
          <motion.div
            className="relative perspective-1000"
            initial={{ y: -1000, rotateY: 0, rotateX: 0, scale: 0.5 }}
            animate={
              phase === "falling"
                ? { 
                    y: 0, 
                    rotateY: 1080, 
                    rotateX: 20,
                    scale: 1
                  }
                : { 
                    y: 0, 
                    rotateY: 1800, 
                    scale: 1.4,
                    filter: "brightness(1.5) drop-shadow(0 0 30px rgba(234, 179, 8, 0.5))"
                  }
            }
            transition={{ 
              y: { duration: 1.5, ease: [0.175, 0.885, 0.32, 1.275] },
              rotateY: { duration: 4, ease: "easeInOut" },
              scale: { duration: 0.8 },
              filter: { duration: 1 }
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The 3D Coin Container */}
            <div className="relative w-72 h-72">
              {/* The "Edge" of the coin (3D effect) */}
              <div className="absolute inset-0 rounded-full border-[12px] border-yellow-800/50 blur-[1px] scale-[1.02]" />

              {/* Front Side: Est 2025 */}
              <div 
                className="absolute inset-0 rounded-full border-[10px] border-yellow-600 bg-linear-to-tr from-yellow-700 via-yellow-400 to-yellow-800 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] backface-hidden"
              >
                <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="text-yellow-950 font-black italic text-[12px] tracking-[0.5em] opacity-80 mb-3">ENKLAN SH.p.k</div>
                <div className="text-yellow-950 font-black text-5xl tracking-tighter italic drop-shadow-lg border-y-2 border-yellow-950/20 py-2 px-4">EST. 2025</div>
                <div className="absolute inset-0 rounded-full bg-linear-to-tr from-white/30 to-transparent pointer-events-none" />
              </div>

              {/* Back Side: Logo Side */}
              <div 
                className="absolute inset-0 rounded-full border-[10px] border-yellow-600 bg-linear-to-tr from-yellow-800 via-yellow-400 to-yellow-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                 <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                 <div className="w-48 h-48 rounded-full flex items-center justify-center relative overflow-hidden group bg-yellow-950/20 shadow-inner">
                    <Logo showText={false} className="scale-[3]" />
                    <motion.div 
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent w-full"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
                 <div className="mt-4 text-yellow-950 font-black text-sm tracking-[0.8em] uppercase opacity-90">ENKLAN</div>
              </div>
            </div>

            {/* Shockwave Rings on Impact */}
            {phase === "settled" && (
              <>
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-yellow-500/50"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-yellow-500/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                />
              </>
            )}

            {/* Floor Shadow */}
            <motion.div 
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-12 bg-black/80 blur-2xl rounded-full z-[-1]"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>
        )}

        {/* The Electrical Blitz / Flash */}
        {phase === "flash" && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-100 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0] }}
            transition={{ duration: 0.6, ease: "linear" }}
          >
            {/* Blitz "Bolts" or Lines */}
            <div className="absolute inset-0 overflow-hidden bg-blue-600/10">
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute bg-blue-400 h-[3px] w-full shadow-[0_0_20px_rgba(96,165,250,0.8)]"
                   style={{ 
                     top: `${Math.random() * 100}%`, 
                     left: `${Math.random() * 20 - 10}%`,
                     transform: `rotate(${Math.random() * 40 - 20}deg)` 
                   }}
                   animate={{ 
                     opacity: [0, 1, 0],
                     scaleX: [0, 1.2, 0],
                     x: [0, Math.random() * 100 - 50, 0]
                   }}
                   transition={{ duration: 0.15, delay: i * 0.03, repeat: 3 }}
                 />
               ))}
               {/* Center Blast */}
               <motion.div 
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full bg-radial from-white via-blue-500 to-transparent"
                 initial={{ scale: 0, opacity: 1 }}
                 animate={{ scale: 1.5, opacity: 0 }}
                 transition={{ duration: 0.5 }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Text (Visible briefly before transition) */}
      <AnimatePresence>
        {phase === "settled" && (
          <motion.div
            className="absolute bottom-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <div className="tech-text text-yellow-500/50 text-xs mb-3 tracking-[1.5em] font-black">ENKLAN Sh.p.k</div>
            <div className="tech-text text-white text-sm tracking-[0.8em] font-medium italic">INOVACION PËR TË ARDHMEN</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
