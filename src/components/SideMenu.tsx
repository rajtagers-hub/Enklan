"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Facebook, Linkedin } from "./Icons";
import Link from "next/link";
import Logo from "./Logo";
import { useCMS } from "@/context/CMSContext";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { content } = useCMS();
  const { settings } = content;
  const menuItems = [
    { name: "Homepage", href: "/" },
    { name: "Shërbimet", href: "/#services" },
    { name: "Portofoli", href: "/portfolio" },
    { name: "Rreth Nesh", href: "/#about" },
    { name: "Kontakti", href: "/#contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-100"
          />

          {/* Menu Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-black/70 backdrop-blur-3xl border-l border-white/10 z-110 p-10 md:p-14 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-20">
              <Logo />
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <X className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            <nav className="flex flex-col gap-8 flex-1 justify-center">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Link 
                    href={item.href}
                    onClick={onClose}
                    className="relative text-4xl md:text-5xl font-medium tracking-tight text-white/40 hover:text-white transition-all duration-500 flex items-center"
                  >
                    <span className="absolute -left-12 text-xs font-semibold uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 group-hover:-left-8 transition-all duration-500 hidden md:block">
                      0{i + 1}
                    </span>
                    <span className="group-hover:translate-x-4 md:group-hover:translate-x-2 transition-transform duration-500">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pt-12 mt-auto border-t border-white/10 space-y-8">
              <div className="flex flex-col gap-5">
                <a href={settings.socials.whatsapp} target="_blank" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <Phone size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-light tracking-widest">{settings.phone}</span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <Mail size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-light tracking-widest lowercase">{settings.email}</span>
                </a>
                <div className="flex items-center gap-4 text-zinc-400">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <span className="text-[11px] font-light tracking-widest uppercase">{settings.address}</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a href={settings.socials.instagram} target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Instagram size={18} /></a>
                <a href={settings.socials.facebook} target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Facebook size={18} /></a>
                <a href={settings.socials.linkedin} target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Linkedin size={18} /></a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
