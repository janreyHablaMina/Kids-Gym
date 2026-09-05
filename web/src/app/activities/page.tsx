"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { activities } from "@/data/activities";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <section className="py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="text-brand-pink">Activities</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-brand-muted">
            Explore our structured classes and open play sessions. There is something fun for every kid at PlayNest.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activities.map((act) => (
              <motion.div key={act.id} variants={fadeIn} className="group cursor-pointer rounded-[2rem] overflow-hidden border border-white/10 bg-brand-card hover:border-brand-primary-light transition-colors shadow-xl">
                <Link href={`/activities/${act.slug}`}>
                  <div className="relative h-56 w-full overflow-hidden bg-[#090B2A]">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <Image src={act.image} alt={act.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-bold mb-4 border border-white/5" style={{ color: act.color }}>
                      {act.ageRange} • {act.duration}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-brand-pink transition-colors">{act.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{act.shortDescription}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
