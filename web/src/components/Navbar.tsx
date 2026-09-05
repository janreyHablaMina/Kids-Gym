"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Activities", path: "/activities" },
    { name: "Schedule", path: "/schedule" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel shadow-lg shadow-brand-primary/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary-light to-brand-pink flex items-center justify-center shadow-lg shadow-brand-pink/30 group-hover:scale-105 transition-transform">
              <Rocket size={22} color="white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight group-hover:text-brand-pink transition-colors">
              PlayNest Kids
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-bold transition-colors ${
                  pathname === link.path
                    ? "text-brand-pink"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="#download"
              className="font-bold text-white hover:text-brand-pink transition-colors"
            >
              Download App
            </Link>
            <Link
              href="/schedule"
              className="bg-brand-primary hover:bg-brand-primary-light text-white font-extrabold py-2.5 px-6 rounded-full shadow-lg shadow-brand-primary/30 transition-all hover:scale-105 hover:shadow-brand-primary-light/40"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass-panel border-t border-white/10 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold p-3 rounded-xl ${
                    pathname === link.path
                      ? "bg-white/10 text-brand-pink"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="#download"
                  onClick={() => setIsOpen(false)}
                  className="text-center font-bold text-white py-3 border border-white/20 rounded-xl"
                >
                  Download App
                </Link>
                <Link
                  href="/schedule"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-brand-primary text-white font-extrabold py-3 rounded-xl shadow-lg"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
