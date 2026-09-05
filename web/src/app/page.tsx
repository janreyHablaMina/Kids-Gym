"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { activities } from "@/data/activities";
import { testimonials } from "@/data/content";
import { ArrowRight, Star, CheckCircle, Smartphone, Rocket } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary-light/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-pink/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-pink font-bold text-sm mb-6 shadow-lg">
                ✨ PlayNest Kids Indoor Play Space
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Where Little <br />
                <span className="gradient-text">Adventures</span> Begin.
              </motion.h1>
              <motion.p variants={fadeIn} className="text-xl text-brand-muted mb-10 leading-relaxed max-w-xl">
                Play, move, learn and grow in a safe and exciting environment designed perfectly for kids.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/schedule" className="bg-brand-primary hover:bg-brand-primary-light text-white text-center font-extrabold py-4 px-8 rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:scale-105 hover:shadow-brand-primary-light/40 flex items-center justify-center gap-2">
                  Book a Session <ArrowRight size={20} />
                </Link>
                <Link href="/activities" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-center font-bold py-4 px-8 rounded-full transition-all hover:scale-105">
                  Explore Activities
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative lg:ml-auto"
            >
              <div className="relative w-full max-w-lg aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                <Image
                  src="/images/hero.jpg"
                  alt="Child playing"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center">
                    <Star color="white" fill="white" size={24} />
                  </div>
                  <div>
                    <p className="font-black text-white text-xl">4.9/5</p>
                    <p className="text-brand-muted text-sm font-bold">Parent Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="py-24 bg-[#0F113A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">More Than Just a Play Space</h2>
            <p className="text-brand-muted text-lg">
              PlayNest Kids is a children's gym and indoor play space where kids can build confidence, develop new skills, stay active and make new friends.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Move", desc: "Fun activities that keep kids active.", color: "text-brand-pink", bg: "bg-brand-pink/10" },
              { title: "Learn", desc: "Develop coordination and confidence.", color: "text-brand-primary-light", bg: "bg-brand-primary-light/10" },
              { title: "Connect", desc: "Make friends and enjoy activities together.", color: "text-brand-green", bg: "bg-brand-green/10" },
              { title: "Have Fun", desc: "Because learning should feel like play.", color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeIn} className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                  <CheckCircle className={feature.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Activities Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Something Fun for Every Kid</h2>
              <p className="text-brand-muted text-lg max-w-xl">Discover our structured classes and open play sessions designed for different age groups.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Link href="/activities" className="inline-flex items-center gap-2 text-brand-pink font-bold hover:gap-4 transition-all">
                View All Activities <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {activities.map((act) => (
              <motion.div key={act.id} variants={fadeIn} className="group cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-brand-card hover:border-brand-primary-light transition-colors">
                <Link href={`/activities/${act.slug}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <Image src={act.image} alt={act.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-bold mb-4" style={{ color: act.color }}>
                      {act.ageRange} • {act.duration}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{act.title}</h3>
                    <p className="text-brand-muted text-sm line-clamp-2">{act.shortDescription}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Special Promo */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] p-10 md:p-16 bg-gradient-to-tr from-brand-pink to-brand-primary relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px]" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Weekend Family Fun! 🎉</h2>
              <p className="text-white/80 text-xl">Bring the whole family and discover a new way to play together with our discounted weekend passes.</p>
            </div>
            <Link href="/schedule" className="relative z-10 shrink-0 bg-white text-brand-primary-dark font-black py-4 px-8 rounded-full shadow-xl transition-transform hover:scale-105">
              Book Your Session
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. App Promotion */}
      <section className="py-24 bg-[#0F113A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black text-white mb-6">PlayNest Goes <br/>Wherever You Go</motion.h2>
              <motion.p variants={fadeIn} className="text-brand-muted text-lg mb-8">
                Discover activities, check schedules, and manage your child&apos;s bookings in seconds with the PlayNest Kids mobile app.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-3 glass-panel hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  <Smartphone size={24} /> App Store
                </button>
                <button className="flex items-center justify-center gap-3 glass-panel hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  <Smartphone size={24} /> Google Play
                </button>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-[280px] h-[580px] border-[12px] border-[#151843] rounded-[3rem] bg-brand-canvas shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-primary-light to-brand-pink flex items-center justify-center mb-6">
                  <Rocket size={32} color="white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">PlayNest</h3>
                <p className="text-brand-muted text-sm">App UI Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white">What Parents Say</h2>
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={fadeIn} className="glass-panel p-8 rounded-3xl">
                <div className="flex text-brand-yellow mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-white text-lg font-medium leading-relaxed mb-8">"{t.text}"</p>
                <div>
                  <p className="text-white font-bold">{t.author}</p>
                  <p className="text-brand-muted text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 border-t border-white/5 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to Play?</h2>
          <p className="text-xl text-brand-muted mb-10 max-w-2xl mx-auto">
            Give your child a place to move, explore and make new friends.
          </p>
          <Link href="/schedule" className="inline-flex bg-brand-primary hover:bg-brand-primary-light text-white font-extrabold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
            Book a Session Now
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
