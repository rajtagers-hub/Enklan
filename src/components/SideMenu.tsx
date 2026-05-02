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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/5 z-110 p-12 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-24">
              <Logo />
              <button 
                onClick={onClose}
                className="p-4 hover:bg-white/5 rounded-2xl transition-all group border border-white/5"
              >
                <X className="w-8 h-8 text-zinc-500 group-hover:text-white group-hover:rotate-90 transition-all" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 flex-1">
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
                    className="text-4xl font-extrabold italic uppercase tracking-tighter text-zinc-700 hover:text-white transition-all group-hover:translate-x-4 flex items-center gap-4"
                  >
                    <span className="w-0 group-hover:w-8 h-1 bg-blue-800 transition-all overflow-hidden" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pt-10 border-t border-white/5 space-y-8">
              <div className="space-y-4">
                <a href={settings.socials.whatsapp} target="_blank" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <Phone size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-widest">{settings.phone}</span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <Mail size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-widest lowercase">{settings.email}</span>
                </a>
                <div className="flex items-center gap-4 text-zinc-400">
                  <MapPin size={18} className="text-blue-500" />
                  <span className="font-bold tracking-widest uppercase text-[10px]">{settings.address}</span>
                </div>
              </div>
              
              <div className="flex gap-6">
                <a href={settings.socials.instagram} target="_blank" className="text-zinc-700 hover:text-white transition-colors"><Instagram size={24} /></a>
                <a href={settings.socials.facebook} target="_blank" className="text-zinc-700 hover:text-white transition-colors"><Facebook size={24} /></a>
                <a href={settings.socials.linkedin} target="_blank" className="text-zinc-700 hover:text-white transition-colors"><Linkedin size={24} /></a>
                <a href={`mailto:${settings.email}`} className="text-zinc-700 hover:text-white transition-colors"><Mail size={24} /></a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
