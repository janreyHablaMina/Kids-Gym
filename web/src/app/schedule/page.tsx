"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { activities } from "@/data/activities";
import { upcomingSessions } from "@/data/schedules";
import { mockChildren } from "@/data/children";
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, ArrowLeft, CheckCircle2, Ticket } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const preselectedActivity = searchParams?.get("activity");

  const [step, setStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-12");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedActivity) {
      setSelectedActivity(preselectedActivity);
      setStep(2); // Jump to date selection if activity was passed in URL
    }
  }, [preselectedActivity]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Choose an Activity";
      case 2: return "Select a Date";
      case 3: return "Pick a Session";
      case 4: return "Who is playing?";
      case 5: return "Review Booking";
      case 6: return "Booking Confirmed!";
      default: return "";
    }
  };

  const currentActivity = activities.find(a => a.slug === selectedActivity);
  const currentSession = upcomingSessions.find(s => s.id === selectedSession);
  const currentChild = mockChildren.find(c => c.id === selectedChild);

  const availableSessionsForActivityAndDate = upcomingSessions.filter(
    s => s.activityId === currentActivity?.id && s.date === selectedDate
  );

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16 bg-[#090B2A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-2">{getStepTitle()}</h1>
          {step < 6 && <p className="text-brand-muted">Step {step} of 5</p>}
        </div>

        {/* Wizard Container */}
        <div className="glass-panel rounded-[2rem] p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Select Activity */}
            {step === 1 && (
              <motion.div key="step1" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="grid sm:grid-cols-2 gap-4">
                {activities.map(act => (
                  <button
                    key={act.id}
                    onClick={() => { setSelectedActivity(act.slug); handleNext(); }}
                    className="text-left glass-panel p-6 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 group"
                  >
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-pink transition-colors">{act.title}</h3>
                    <p className="text-sm text-brand-muted">{act.shortDescription}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {/* STEP 2: Select Date */}
            {step === 2 && (
              <motion.div key="step2" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <button onClick={handleBack} className="text-brand-muted hover:text-white flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> Back</button>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {["2026-09-12", "2026-09-13", "2026-09-14"].map(date => {
                    const d = new Date(date);
                    const day = d.toLocaleDateString('en-US', { weekday: 'short' });
                    const num = d.toLocaleDateString('en-US', { day: 'numeric' });
                    const isSelected = selectedDate === date;
                    return (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`shrink-0 w-24 h-32 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-colors ${isSelected ? "bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20" : "glass-panel border-white/10 hover:bg-white/10"}`}
                      >
                        <span className={`text-sm font-bold ${isSelected ? "text-white/80" : "text-brand-muted"}`}>{day}</span>
                        <span className={`text-3xl font-black ${isSelected ? "text-white" : "text-white"}`}>{num}</span>
                      </button>
                    )
                  })}
                </div>
                <button onClick={handleNext} className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-extrabold py-4 rounded-xl shadow-lg mt-8 transition-colors">
                  Continue
                </button>
              </motion.div>
            )}

            {/* STEP 3: Select Session */}
            {step === 3 && (
              <motion.div key="step3" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <button onClick={handleBack} className="text-brand-muted hover:text-white flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> Back</button>
                
                {availableSessionsForActivityAndDate.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-brand-muted text-lg mb-4">No sessions available for this date.</p>
                    <button onClick={handleBack} className="text-brand-pink font-bold">Pick another date</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {availableSessionsForActivityAndDate.map(session => {
                      const isFull = session.spotsFilled >= session.spotsTotal;
                      const spotsLeft = session.spotsTotal - session.spotsFilled;
                      return (
                        <button
                          key={session.id}
                          disabled={isFull}
                          onClick={() => { setSelectedSession(session.id); handleNext(); }}
                          className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${isFull ? "opacity-50 glass-panel border-white/5 cursor-not-allowed" : "glass-panel border-white/10 hover:border-brand-primary hover:bg-white/5"}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                              <Clock size={20} className="text-brand-primary-light" />
                            </div>
                            <div className="text-left">
                              <p className="text-xl font-bold text-white">{session.time}</p>
                              <p className="text-sm text-brand-muted">{session.activityTitle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${isFull ? "text-red-400" : "text-brand-green"}`}>
                              {isFull ? "Full" : `${spotsLeft} spots left`}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: Select Child */}
            {step === 4 && (
              <motion.div key="step4" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <button onClick={handleBack} className="text-brand-muted hover:text-white flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> Back</button>
                <div className="grid sm:grid-cols-3 gap-4">
                  {mockChildren.map(child => (
                    <button
                      key={child.id}
                      onClick={() => { setSelectedChild(child.id); handleNext(); }}
                      className="glass-panel p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ backgroundColor: child.favoriteColor + '20' }}>
                        {child.avatarEmoji}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white text-lg">{child.name}</p>
                        <p className="text-brand-muted text-sm">{child.age} yrs old</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Review */}
            {step === 5 && currentActivity && currentSession && currentChild && (
              <motion.div key="step5" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <button onClick={handleBack} className="text-brand-muted hover:text-white flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> Back</button>
                
                <div className="glass-panel rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Ticket size={24} className="text-brand-pink" /> Booking Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between pb-4 border-b border-white/5">
                      <span className="text-brand-muted">Activity</span>
                      <span className="font-bold text-white">{currentActivity.title}</span>
                    </div>
                    <div className="flex justify-between pb-4 border-b border-white/5">
                      <span className="text-brand-muted">Date</span>
                      <span className="font-bold text-white">{new Date(currentSession.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between pb-4 border-b border-white/5">
                      <span className="text-brand-muted">Time</span>
                      <span className="font-bold text-white">{currentSession.time}</span>
                    </div>
                    <div className="flex justify-between pb-4 border-b border-white/5">
                      <span className="text-brand-muted">Child</span>
                      <span className="font-bold text-white flex items-center gap-2">{currentChild.avatarEmoji} {currentChild.name}</span>
                    </div>
                  </div>
                </div>

                <button onClick={handleNext} className="w-full bg-brand-green hover:bg-[#2DB986] text-[#090B2A] font-extrabold py-4 rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2">
                  Confirm Booking <CheckCircle2 size={20} />
                </button>
              </motion.div>
            )}

            {/* STEP 6: Success */}
            {step === 6 && currentActivity && currentChild && (
              <motion.div key="step6" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}
                  className="w-24 h-24 bg-brand-green/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={50} className="text-brand-green" />
                </motion.div>
                
                <h2 className="text-3xl font-black text-white mb-2">You're All Booked! 🎉</h2>
                <p className="text-brand-muted text-lg mb-8 max-w-sm">
                  {currentChild.name} is ready for an exciting adventure at {currentActivity.title}.
                </p>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    Book Another
                  </button>
                  <button className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    View My Bookings
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
