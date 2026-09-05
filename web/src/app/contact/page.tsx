"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/content";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, CheckCircle2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <section className="py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-primary-light/20 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white mb-4">
            Get in <span className="text-brand-pink">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-brand-muted max-w-2xl mx-auto">
            Have questions about our activities or want to host a birthday party? We’re here to help!
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info & Map Placeholder */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-8">
              <div className="glass-panel p-8 rounded-3xl space-y-6">
                <h2 className="text-2xl font-black text-white mb-2">Come Play With Us</h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-primary-light" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Location</h3>
                    <p className="text-brand-muted">123 PlayNest Lane<br/>San Francisco, CA 94107</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/20 flex items-center justify-center shrink-0">
                    <Phone className="text-brand-green" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Phone</h3>
                    <p className="text-brand-muted">(555) 349-5437</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/20 flex items-center justify-center shrink-0">
                    <Clock className="text-brand-yellow" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Hours</h3>
                    <p className="text-brand-muted">Mon - Fri: 9:00 AM - 7:00 PM<br/>Sat - Sun: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 rounded-3xl bg-[#151843] border border-white/10 flex flex-col items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20" />
                <MapPin size={48} className="text-brand-primary-light mb-4" />
                <p className="text-brand-muted font-bold relative z-10">Interactive Map Placeholder</p>
                <button className="mt-4 px-6 py-2 rounded-full bg-white text-brand-primary-dark font-bold relative z-10 shadow-lg group-hover:scale-105 transition-transform">
                  Get Directions
                </button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="glass-panel p-8 md:p-10 rounded-3xl h-full">
                <h2 className="text-3xl font-black text-white mb-8">Send a Message</h2>
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]"
                    >
                      <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 size={40} className="text-brand-green" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Message Sent! 🎉</h3>
                      <p className="text-brand-muted">Thanks for reaching out. Our team will get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/80 ml-2">Your Name</label>
                        <input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-primary-light focus:bg-white/10 transition-colors" placeholder="e.g. Sarah Smith" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/80 ml-2">Email Address</label>
                        <input required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-primary-light focus:bg-white/10 transition-colors" placeholder="e.g. sarah@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/80 ml-2">How can we help?</label>
                        <textarea required value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-primary-light focus:bg-white/10 transition-colors resize-none" placeholder="Write your message here..."></textarea>
                      </div>
                      <button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-extrabold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
                        Send Message <Send size={20} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#0F113A] mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5"
              >
                <button 
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-white text-lg pr-8">{faq.question}</span>
                  <ChevronDown size={24} className={`text-brand-pink shrink-0 transition-transform duration-300 ${expandedFaq === faq.id ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-brand-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
