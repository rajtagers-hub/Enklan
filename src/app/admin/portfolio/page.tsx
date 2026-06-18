"use client";
import { useCMS } from "@/context/CMSContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import MediaUpload from "@/components/MediaUpload";

export default function AdminPortfolio() {
  const { content, updateContent } = useCMS();
  const [projects, setProjects] = useState(content.portfolio);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    updateContent({ ...content, portfolio: projects });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: "Projekt i Ri",
      category: "Kategoria",
      image: "https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=800",
      description: "Përshkrimi i projektit këtu..."
    };
    setProjects([...projects, newProj]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p: any) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <header className="mb-12 flex justify-between items-center">
         <div className="flex items-center gap-6">
            <button onClick={() => router.push("/admin/dashboard")} className="p-3 hover:bg-white/5 rounded-xl border border-white/10 text-zinc-500 hover:text-white transition-all">
               <ChevronLeft />
            </button>
            <div className="space-y-1">
               <h1 className="text-4xl font-black italic uppercase tracking-tighter">Menaxho Portofolin</h1>
               <p className="text-zinc-500 italic">Shtoni ose modifikoni projektet tuaja të realizuara.</p>
            </div>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={addProject}
              className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
            >
               <Plus size={20} /> Projekt i Ri
            </button>
            <button 
              onClick={handleSave}
              className="bg-blue-800 text-white px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3"
            >
               <Save size={20} /> {saved ? "U Ruajt" : "Ruaj Portofolin"}
            </button>
         </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
         <AnimatePresence>
            {projects.map((proj: any, index: number) => (
               <motion.div 
                 key={proj.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="glass-panel p-8 bg-white/5 border-white/10 rounded-[2rem] flex flex-col md:flex-row gap-10 relative group"
               >
                  <div className="w-full md:w-64 shrink-0">
                     <MediaUpload 
                       value={proj.image} 
                       onChange={(url) => {
                         const newP = [...projects];
                         newP[index] = { ...newP[index], image: url };
                         setProjects(newP);
                       }} 
                     />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Titulli i Projektit</label>
                           <input 
                             type="text" 
                             value={proj.title}
                             onChange={(e) => {
                               const newP = [...projects];
                               newP[index] = { ...newP[index], title: e.target.value };
                               setProjects(newP);
                             }}
                             className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Kategoria</label>
                           <select 
                             value={proj.categoryId || ""}
                             onChange={(e) => {
                               const newP = [...projects];
                               const srv = content.services.find((s: any) => s.slug === e.target.value);
                               newP[index] = {
                                 ...newP[index],
                                 categoryId: e.target.value,
                                 category: srv ? srv.title : e.target.value,
                                 subcategoryId: ""
                               };
                               setProjects(newP);
                             }}
                             className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none appearance-none"
                           >
                             <option value="" disabled>Zgjidh Kategorinë</option>
                             {content.services.map((srv: any) => (
                               <option key={srv.slug} value={srv.slug}>{srv.title}</option>
                             ))}
                           </select>
                        </div>
                        
                        {(() => {
                           const selectedSrv = content.services.find((s: any) => s.slug === proj.categoryId);
                           if (selectedSrv && selectedSrv.subsections && selectedSrv.subsections.length > 0) {
                             return (
                               <div className="space-y-2 md:col-span-2 mt-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Nënkategoria</label>
                                 <select 
                                   value={proj.subcategoryId || ""}
                                   onChange={(e) => {
                                     const newP = [...projects];
                                     newP[index] = { ...newP[index], subcategoryId: e.target.value };
                                     setProjects(newP);
                                   }}
                                   className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none appearance-none"
                                 >
                                   <option value="">(Të Gjitha Nënkategoritë)</option>
                                   {selectedSrv.subsections.map((sub: any) => (
                                     <option key={sub.id} value={sub.id}>{sub.title}</option>
                                   ))}
                                 </select>
                               </div>
                             );
                           }
                           return null;
                        })()}
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Përshkrimi i Projektit</label>
                        <textarea 
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const newP = [...projects];
                            newP[index] = { ...newP[index], description: e.target.value };
                            setProjects(newP);
                          }}
                          className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm focus:border-blue-800 transition-all outline-none resize-none"
                        />
                     </div>
                  </div>

                  <button 
                    onClick={() => deleteProject(proj.id)}
                    className="absolute top-6 right-6 p-3 text-zinc-700 hover:text-red-500 transition-colors"
                  >
                     <Trash2 size={20} />
                  </button>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
    </div>
  );
}
