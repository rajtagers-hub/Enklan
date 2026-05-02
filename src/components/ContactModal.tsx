"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Mail, Phone } from "lucide-react";
import { Instagram, Facebook, Linkedin } from "./Icons";
import { useCMS } from "@/context/CMSContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { content } = useCMS();
  const { settings } = content;

  const contacts = [
    { 
      name: "WhatsApp", 
      icon: <MessageCircle size={32} />, 
      color: "text-[#25D366]", 
      bg: "bg-[#25D366]/10",
      href: settings.socials.whatsapp,
      label: settings.phone
    },
    { 
      name: "E-mail", 
      icon: <Mail size={32} />, 
      color: "text-blue-400", 
      bg: "bg-blue-400/10",
      href: `mailto:${settings.email}`,
      label: settings.email
    },
    { 
      name: "Instagram", 
      icon: <Instagram size={32} />, 
      color: "text-pink-500", 
      bg: "bg-pink-500/10",
      href: settings.socials.instagram,
      label: "@enklan_sh.p.k"
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={32} />, 
      color: "text-blue-600", 
      bg: "bg-blue-600/10",
      href: settings.socials.linkedin,
      label: "Enklan Sh.p.k"
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-150"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-160 p-4 md:p-6"
          >
            <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-2xl">
               <div className="galaxy-bg opacity-10 absolute inset-0 pointer-events-none" />
               
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   onClose();
                 }}
                 className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-6 hover:bg-white/10 rounded-full transition-all z-20 group border border-white/5 md:border-none"
               >
                 <X className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 group-hover:text-white group-hover:rotate-90 transition-all" />
               </button>

               <div className="relative z-10 text-center mb-8 md:mb-16 space-y-2 md:space-y-4 pt-6 md:pt-0">
                  <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Na Kontaktoni</h2>
                  <p className="text-xs md:text-base text-zinc-500 italic max-w-xs mx-auto md:max-w-none">Zgjidhni mënyrën tuaj të preferuar për të komunikuar me ne.</p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative z-10">
                  {contacts.map((contact, i) => (
                    <motion.a
                      key={contact.name}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex flex-col items-center gap-4 md:gap-6 p-5 md:p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.07]"
                    >
                      <div className={`w-12 h-12 md:w-20 md:h-20 rounded-2xl ${contact.bg} ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {/* Scale the lucide icons for mobile */}
                        <div className="scale-75 md:scale-100 flex items-center justify-center">
                          {contact.icon}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white mb-1">{contact.name}</div>
                        <div className="text-[8px] md:text-[10px] text-zinc-500 font-medium italic break-all hidden sm:block">{contact.label}</div>
                      </div>
                    </motion.a>
                  ))}
               </div>

               <div className="mt-8 md:mt-16 text-center text-zinc-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] relative z-10">
                  ENKLAN Sh.p.k - Ekselencë në Inxhinieri
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
