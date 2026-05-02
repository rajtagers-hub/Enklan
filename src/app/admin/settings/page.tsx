"use client";
import { useCMS } from "@/context/CMSContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, MapPin, Phone, Mail, Lock, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import MediaUpload from "@/components/MediaUpload";

export default function AdminSettings() {
  const { content, updateContent } = useCMS();
  const [localSettings, setLocalSettings] = useState(content.settings);
  const [localAbout, setLocalAbout] = useState(content.about);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    updateContent({ ...content, settings: localSettings, about: localAbout });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <header className="mb-12 flex justify-between items-center">
         <div className="space-y-2">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Cilësimet e Sistemit</h1>
            <p className="text-zinc-500 italic">Modifikoni informacionin bazë të kompanisë dhe sigurinë.</p>
         </div>
         <button 
           onClick={handleSave}
           className="bg-blue-800 text-white px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3 shadow-lg shadow-blue-800/20"
         >
            {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
            {saved ? "U Ruajt" : "Ruaj Ndryshimet"}
         </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {/* Contact Info */}
         <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8">
            <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
               <Phone className="text-blue-500" />
               Informacioni i Kontaktit
            </h2>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Numri i Telefonit</label>
                  <input 
                    type="text" 
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({...localSettings, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email Adresa</label>
                  <input 
                    type="email" 
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({...localSettings, email: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none"
                  />
               </div>
            </div>
         </div>

         {/* Location */}
         <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8">
            <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
               <MapPin className="text-blue-500" />
               Vendndodhja Fizike
            </h2>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Adresa e Plotë</label>
               <textarea 
                 rows={4}
                 value={localSettings.address}
                 onChange={(e) => setLocalSettings({...localSettings, address: e.target.value})}
                 className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none resize-none"
               />
            </div>
         </div>

         {/* Security */}
         <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8">
            <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
               <Lock className="text-blue-500" />
               Siguria e Panelit
            </h2>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Fjala Sekrete (Night Raid Coin)</label>
               <input 
                 type="text" 
                 value={localSettings.secretPhrase}
                 onChange={(e) => setLocalSettings({...localSettings, secretPhrase: e.target.value})}
                 className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none"
               />
               <p className="text-[9px] text-zinc-600 mt-2 px-2">Kjo fjalë përdoret për të hapur panelin e identifikimit nga monedha sekrete.</p>
            </div>
         </div>
         {/* Socials */}
         <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8">
            <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
               <Phone className="text-blue-500" />
               Rrjetet Sociale
            </h2>
            
            <div className="space-y-4">
               {['instagram', 'facebook', 'linkedin', 'whatsapp'].map((network) => (
                 <div key={network} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">{network}</label>
                    <input 
                      type="text" 
                      value={localSettings.socials[network as keyof typeof localSettings.socials]}
                      onChange={(e) => setLocalSettings({
                        ...localSettings, 
                        socials: { ...localSettings.socials, [network]: e.target.value }
                      })}
                      className="w-full bg-black border border-white/10 rounded-2xl py-3 px-6 text-sm focus:border-blue-800 transition-all outline-none"
                    />
                 </div>
               ))}
            </div>
         </div>

         {/* About Us */}
         <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8 md:col-span-2">
            <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-3">
               <CheckCircle2 className="text-blue-500" />
               Seksioni "Rreth Nesh"
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Titulli</label>
                  <input 
                    type="text" 
                    value={localAbout.title}
                    onChange={(e) => setLocalAbout({...localAbout, title: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Imazhi / Video</label>
                  <MediaUpload 
                     value={localAbout.image}
                     onChange={(url) => setLocalAbout({...localAbout, image: url})}
                  />
               </div>
               <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Përshkrimi</label>
                  <textarea 
                    rows={4}
                    value={localAbout.description}
                    onChange={(e) => setLocalAbout({...localAbout, description: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none resize-none"
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="mt-12 text-center">
         <button 
           onClick={() => router.push("/admin/dashboard")}
           className="text-zinc-600 hover:text-white transition-colors font-bold italic uppercase tracking-widest text-xs"
         >
            Kthehu te Dashboard
         </button>
      </div>
    </div>
  );
}
