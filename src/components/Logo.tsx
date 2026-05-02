"use client";
import { motion } from "framer-motion";

export default function Logo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.svg 
        width="48" 
        height="48" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial="initial"
        whileHover="hover"
      >
        {/* The Buildings (Minimalist Blocks) */}
        <motion.rect 
          x="25" y="45" width="12" height="35" 
          fill="url(#building-grad)" 
          variants={{ hover: { height: 40, y: 40 } }}
        />
        <motion.rect 
          x="42" y="30" width="16" height="50" 
          fill="url(#building-grad-accent)" 
          variants={{ hover: { height: 55, y: 25 } }}
        />
        <motion.rect 
          x="63" y="20" width="12" height="60" 
          fill="url(#building-grad)" 
          variants={{ hover: { height: 65, y: 15 } }}
        />

        {/* The Orbiting Electrical Swoosh */}
        <motion.path 
          d="M 10 60 C 10 95, 90 95, 90 60 C 90 25, 10 25, 10 60" 
          stroke="url(#swoosh-grad)" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
          variants={{ 
            initial: { pathLength: 0.4, pathOffset: 0, opacity: 0.8 },
            hover: { 
              pathLength: 1, 
              pathOffset: 1,
              strokeWidth: 6,
              transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity }
            }
          }}
        />
        
        {/* Glow Effect for Swoosh */}
        <motion.path 
          d="M 10 60 C 10 95, 90 95, 90 60 C 90 25, 10 25, 10 60" 
          stroke="url(#swoosh-grad)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          fill="none"
          className="blur-sm"
          variants={{ 
            initial: { pathLength: 0.4, pathOffset: 0, opacity: 0.3 },
            hover: { 
              pathLength: 1, 
              pathOffset: 1,
              opacity: 0.6,
              transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity }
            }
          }}
        />

        <defs>
          <linearGradient id="building-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4B5563" />
            <stop offset="1" stopColor="#1F2937" />
          </linearGradient>
          <linearGradient id="building-grad-accent" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="swoosh-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="0.5" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </motion.svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">ENKLAN</span>
          <span className="text-[9px] font-black tracking-[0.5em] text-blue-500 mt-0.5">Sh.p.k</span>
        </div>
      )}
    </div>
  );
}
