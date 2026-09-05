"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "@/data/gallery";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <section className="py-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-pink/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            See the Fun in <span className="gradient-text">Action</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-lg text-brand-muted"
          >
            Take a peek inside our facility and see why kids love PlayNest.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {gallery.map((img, idx) => (
              <motion.div 
                key={img.id} variants={fadeIn}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-brand-card"
              >
                <Image src={img.url} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <Maximize2 size={32} color="white" className="mb-2 scale-50 group-hover:scale-100 transition-transform duration-300" />
                  <p className="text-white font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white hover:text-brand-pink transition-colors p-2 bg-white/10 rounded-full">
              <X size={32} />
            </button>
            
            <button onClick={prevImage} className="absolute left-6 text-white hover:text-brand-pink transition-colors p-3 bg-white/10 rounded-full hidden sm:block">
              <ChevronLeft size={32} />
            </button>
            
            <div className="relative w-full max-w-5xl aspect-video mx-4 sm:mx-24" onClick={(e) => e.stopPropagation()}>
              <Image src={gallery[selectedImageIndex].url} alt={gallery[selectedImageIndex].title} fill className="object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-6 py-2 rounded-full">
                <p className="text-white font-bold text-sm">{gallery[selectedImageIndex].title}</p>
              </div>
            </div>

            <button onClick={nextImage} className="absolute right-6 text-white hover:text-brand-pink transition-colors p-3 bg-white/10 rounded-full hidden sm:block">
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
