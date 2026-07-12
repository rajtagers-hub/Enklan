import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface SubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subcategory: any | null;
  onContactClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedProjects: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProjectClick: (project: any) => void;
}

export default function SubcategoryModal({ 
  isOpen, 
  onClose, 
  subcategory, 
  onContactClick,
  relatedProjects,
  onProjectClick
}: SubcategoryModalProps) {
  if (!subcategory) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-zinc-950 rounded-[2rem] border border-white/10 overflow-hidden relative flex flex-col shadow-2xl max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-sm transition-all"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="h-64 w-full relative shrink-0">
              <Image 
                src={subcategory.image || "/images/hero-bg.png"} 
                alt={subcategory.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-10 overflow-y-auto space-y-6">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                {subcategory.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {subcategory.fullDesc || subcategory.desc || "Detajet e shërbimit nuk janë të disponueshme."}
              </p>

              {/* Related Projects Swiper */}
              {relatedProjects && relatedProjects.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Projekte të Realizuara
                  </h4>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 snap-x scroll-smooth">
                    {relatedProjects.map((project: any) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          onClose();
                          onProjectClick(project);
                        }}
                        className="group flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/25 hover:bg-white/[0.07] transition-all cursor-pointer shrink-0 w-[280px] snap-center items-center"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                            {project.title}
                          </h5>
                          <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-snug">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-800 hover:text-white transition-colors"
              >
                Na Kontaktoni
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
