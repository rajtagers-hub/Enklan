import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl bg-zinc-950 rounded-[2rem] border border-white/10 overflow-hidden relative flex flex-col md:flex-row shadow-2xl max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-sm transition-all"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
              <Image 
                src={project.image || "/images/hero-bg.png"} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 md:from-transparent md:bg-gradient-to-r md:to-transparent to-transparent opacity-80 md:opacity-20" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-3 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
                <ExternalLink className="w-4 h-4" />
                {project.category}
              </div>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
                {project.title}
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line mb-8">
                {project.description || project.desc || "Detajet e projektit nuk janë të disponueshme."}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
