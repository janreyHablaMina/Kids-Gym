"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Trophy } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      
      {/* Page Header */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-primary-light/20 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Nurturing Little Bodies <br/>and <span className="text-brand-pink">Big Imaginations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-brand-muted leading-relaxed"
          >
            PlayNest Kids was founded on a simple idea: children learn best when they are moving, exploring, and most importantly, having fun in a safe environment.
          </motion.p>
        </div>
      </section>

      {/* Two Column Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl"
            >
              <Image 
                src="/images/play.jpg"
                alt="Children playing"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-black text-white">Our Mission</motion.h2>
              <motion.p variants={fadeIn} className="text-brand-muted text-lg leading-relaxed">
                We believe that physical activity is the foundation of a healthy, happy childhood. Our state-of-the-art indoor play space is meticulously designed to encourage gross motor development, social skills, and creative problem-solving.
              </motion.p>
              <motion.p variants={fadeIn} className="text-brand-muted text-lg leading-relaxed">
                Whether it’s navigating a ninja obstacle course, tumbling in gymnastics, or simply enjoying unstructured open play, every corner of PlayNest is built for discovery.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety & Facilities */}
      <section className="py-24 bg-[#0F113A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Why Parents Choose PlayNest</h2>
            <p className="text-brand-muted text-lg">We take the worry out of playtime so you can focus on making memories.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-8"
          >
            {[
              { icon: ShieldCheck, title: "Uncompromising Safety", color: "text-brand-green", bg: "bg-brand-green/10", desc: "Our facility features 100% padded, ASTM-certified equipment. We employ a secure single-entry check-in system and hospital-grade sanitization between every single session." },
              { icon: Users, title: "Expert Certified Coaches", color: "text-brand-blue", bg: "bg-brand-blue/10", desc: "Our coaches aren't just supervisors; they are CPR and First-Aid certified child development enthusiasts trained to safely encourage your children to reach new heights." },
              { icon: Trophy, title: "Structured Progression", color: "text-brand-yellow", bg: "bg-brand-yellow/10", desc: "Our classes follow a structured curriculum designed to build physical literacy, coordination, and strength in a supportive, non-competitive environment." },
              { icon: Heart, title: "Parent-Friendly Amenities", color: "text-brand-pink", bg: "bg-brand-pink/10", desc: "Enjoy our comfortable parent lounge equipped with high-speed Wi-Fi, premium coffee, and perfect visibility of all play zones so you never miss a moment." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeIn} className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center`}>
                    <feature.icon className={feature.color} size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-brand-muted text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
