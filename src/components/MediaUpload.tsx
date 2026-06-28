"use client";
import { useState, useRef } from "react";
import { UploadCloud, Loader2, X, Image as ImageIcon, Film } from "lucide-react";

interface MediaUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
}

export default function MediaUpload({ value, onChange, accept = "image/*,video/*", label = "Ngarko Skedar" }: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;
    
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        
        let width = img.width;
        let height = img.height;
        const maxDim = 1920;
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (!blob) return resolve(file);
          const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(newFile);
        }, 'image/jpeg', 0.8);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file); // kthe file origjinal nëse dështon
      };
      
      img.src = url;
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const processedFile = await compressImage(file);
      const formData = new FormData();
      formData.append("file", processedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        let errMsg = `Gabim serveri: ${res.status}`;
        try {
          const json = JSON.parse(text);
          if (json.error) errMsg = json.error;
        } catch {
          console.error("Non-JSON error response:", text);
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Gabim gjatë ngarkimit të skedarit.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Gabim rrjeti gjatë ngarkimit.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isVideo = value?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="space-y-4 w-full">
      {value ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 group">
          {isVideo ? (
            <video src={value} controls className="w-full h-full object-cover" />
          ) : (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          )}
          <button
            onClick={() => onChange("")}
            className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center justify-center gap-4 text-zinc-400 hover:text-white"
        >
          {isUploading ? (
            <Loader2 size={32} className="animate-spin text-blue-500" />
          ) : (
            <>
              <div className="flex gap-2">
                <ImageIcon size={24} />
                <Film size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
            </>
          )}
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept={accept}
        className="hidden"
      />
      
      {/* Fallback manual URL input */}
      <div className="flex items-center gap-3 pt-2">
         <div className="flex-1 border-t border-white/10"></div>
         <span className="text-[10px] uppercase tracking-widest text-zinc-600">Ose URL</span>
         <div className="flex-1 border-t border-white/10"></div>
      </div>
      <input 
         type="text" 
         placeholder="https://..."
         value={value || ""}
         onChange={(e) => onChange(e.target.value)}
         className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-blue-800 transition-all outline-none"
      />
    </div>
  );
}
