"use client";
import { useCMS } from "@/context/CMSContext";
import { useState } from "react";
import { Save, Plus, Trash2, Edit3, Image as ImageIcon, Briefcase, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import MediaUpload from "@/components/MediaUpload";

export default function AdminServices() {
  const { content, updateContent } = useCMS();
  const [services, setServices] = useState(content.services);
  const [selectedService, setSelectedService] = useState(0);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    updateContent({ ...content, services });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentService = services[selectedService];

  const updateService = (field: string, value: string) => {
    const newServices = [...services];
    newServices[selectedService] = { ...currentService, [field]: value };
    setServices(newServices);
  };

  const addSubsection = () => {
    const newServices = [...services];
    newServices[selectedService].subsections.push({
      id: `new-sub-${Date.now()}`,
      title: "Nënkategori e Re",
      desc: "Përshkrim i shkurtër",
      fullDesc: "Përshkrim i detajuar i shërbimit...",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800"
    });
    setServices(newServices);
  };

  const updateSubsection = (subIndex: number, field: string, value: string) => {
    const newServices = [...services];
    newServices[selectedService].subsections[subIndex] = {
      ...newServices[selectedService].subsections[subIndex],
      [field]: value
    };
    setServices(newServices);
  };

  const removeSubsection = (subIndex: number) => {
    const newServices = [...services];
    newServices[selectedService].subsections.splice(subIndex, 1);
    setServices(newServices);
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <header className="mb-12 flex justify-between items-center">
         <div className="space-y-2">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Menaxhimi i Shërbimeve</h1>
            <p className="text-zinc-500 italic">Shtoni ose modifikoni shërbimet, kategoritë dhe fotot përkatëse.</p>
         </div>
         <div className="flex gap-4">
           <button 
             onClick={() => router.push("/admin/dashboard")}
             className="px-6 py-3 rounded-2xl font-bold uppercase italic tracking-widest text-zinc-500 hover:text-white transition-all border border-transparent hover:border-white/10"
           >
              Kthehu
           </button>
           <button 
             onClick={handleSave}
             className="bg-blue-800 text-white px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3 shadow-lg shadow-blue-800/20"
           >
              {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
              {saved ? "U Ruajt" : "Ruaj"}
           </button>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Service Selector Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 px-2">Zgjidh Shërbimin</div>
          {services.map((srv: any, index: number) => (
            <button
              key={srv.slug}
              onClick={() => setSelectedService(index)}
              className={`w-full text-left p-6 rounded-[2rem] transition-all flex items-center gap-4 ${
                selectedService === index 
                  ? 'bg-blue-800 text-white shadow-lg shadow-blue-800/20 border border-blue-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-transparent hover:border-white/5'
              }`}
            >
              <Briefcase size={24} className={selectedService === index ? 'text-white' : 'text-blue-500'} />
              <div>
                <div className="font-black italic uppercase tracking-tight">{srv.title}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mt-1">{srv.subsections.length} nënkategori</div>
              </div>
            </button>
          ))}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8">
             <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black italic uppercase tracking-tight flex items-center gap-3">
                   <Edit3 className="text-blue-500" />
                   Të Dhënat Kryesore: {currentService.title}
                </h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Titulli i Shërbimit</label>
                   <input 
                     type="text" 
                     value={currentService.title}
                     onChange={(e) => updateService("title", e.target.value)}
                     className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Përshkrimi i Shkurtër (Karta Hyrëse)</label>
                   <input 
                     type="text" 
                     value={currentService.desc}
                     onChange={(e) => updateService("desc", e.target.value)}
                     className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none"
                   />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Përshkrimi i Detajuar (Faqja e Brendshme)</label>
                   <textarea 
                     rows={4}
                     value={currentService.details}
                     onChange={(e) => updateService("details", e.target.value)}
                     className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-800 transition-all outline-none resize-none"
                   />
                </div>
             </div>
          </div>

          {/* Subsections */}
          <div className="glass-panel p-10 bg-white/5 border-white/10 rounded-[2.5rem] space-y-8">
             <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black italic uppercase tracking-tight flex items-center gap-3">
                   <ImageIcon className="text-blue-500" />
                   Nënkategoritë & Projektet ({currentService.subsections.length})
                </h2>
                <button 
                  onClick={addSubsection}
                  className="flex items-center gap-2 bg-blue-800/20 text-blue-400 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-widest border border-blue-500/30"
                >
                   <Plus size={16} /> Shto të re
                </button>
             </div>

             <div className="space-y-12">
               {currentService.subsections.map((sub: any, subIndex: number) => (
                 <div key={sub.id} className="relative p-8 rounded-[2rem] bg-black/40 border border-white/5 flex flex-col md:flex-row gap-8 items-start group">
                    <button 
                      onClick={() => removeSubsection(subIndex)}
                      className="absolute top-4 right-4 p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="w-full md:w-1/3 shrink-0">
                       <MediaUpload 
                         value={sub.image} 
                         onChange={(url) => updateSubsection(subIndex, "image", url)} 
                         label="Ngarko Foto / Video"
                       />
                    </div>

                    <div className="w-full md:w-2/3 space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Emri i Nënkategorisë</label>
                          <input 
                            type="text" 
                            value={sub.title}
                            onChange={(e) => updateSubsection(subIndex, "title", e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none font-bold italic"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Përshkrimi i Shkurtër</label>
                          <input 
                            type="text" 
                            value={sub.desc}
                            onChange={(e) => updateSubsection(subIndex, "desc", e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Përshkrimi i Gjatë (Brenda Modales)</label>
                          <textarea 
                            rows={3}
                            value={sub.fullDesc}
                            onChange={(e) => updateSubsection(subIndex, "fullDesc", e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none resize-none"
                          />
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
