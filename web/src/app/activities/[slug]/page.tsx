"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { activities } from "@/data/activities";
import { Clock, Users, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ActivityDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const activity = activities.find((a) => a.slug === resolvedParams.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Back button */}
        <Link href="/activities" className="inline-flex items-center gap-2 text-brand-muted hover:text-white font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Activities
        </Link>

        {/* Hero Section */}
        <div className="glass-panel rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl mb-12">
          <div className="relative h-64 md:h-96 w-full">
            <Image src={activity.image} alt={activity.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B2A] to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-bold mb-4 border border-white/20 text-white shadow-lg">
                <span style={{ color: activity.color }}>●</span> Featured Activity
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white">{activity.title}</h1>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Users className="text-brand-primary-light" size={24} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Ages</p>
                  <p className="text-lg font-bold text-white">{activity.ageRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Clock className="text-brand-pink" size={24} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Duration</p>
                  <p className="text-lg font-bold text-white">{activity.duration}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-white">About This Activity</h2>
                <p className="text-brand-muted text-lg leading-relaxed">
                  {activity.description}
                </p>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">What Kids Learn</h2>
                <ul className="space-y-3">
                  {activity.learningPoints.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-brand-muted">
                      <CheckCircle2 size={20} className="text-brand-green shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white">Ready to join the fun?</h3>
                <p className="text-brand-muted">Book a session today. Spots fill up fast!</p>
              </div>
              <Link href={`/schedule?activity=${activity.slug}`} className="bg-brand-primary hover:bg-brand-primary-light text-white font-extrabold py-4 px-8 rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:scale-105 shrink-0 w-full sm:w-auto text-center">
                Book This Session
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
