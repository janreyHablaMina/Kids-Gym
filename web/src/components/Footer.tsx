import Link from "next/link";
import { Rocket, Camera, Users, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050720] pt-16 pb-8 border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary-light to-brand-pink flex items-center justify-center">
                <Rocket size={22} color="white" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                PlayNest Kids
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed">
              Where little adventures begin. A safe, padded, and incredibly fun environment for children to move, learn, and grow.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-pink hover:scale-110 transition-all">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-blue hover:scale-110 transition-all">
                <Users size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-primary hover:scale-110 transition-all">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-brand-muted text-sm">
              <li><Link href="/" className="hover:text-brand-pink transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-pink transition-colors">About PlayNest</Link></li>
              <li><Link href="/schedule" className="hover:text-brand-pink transition-colors">Schedule & Booking</Link></li>
              <li><Link href="/gallery" className="hover:text-brand-pink transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-brand-pink transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Activities</h3>
            <ul className="space-y-4 text-brand-muted text-sm">
              <li><Link href="/activities/kids-gymnastics" className="hover:text-brand-primary-light transition-colors">Kids Gymnastics</Link></li>
              <li><Link href="/activities/ninja-training" className="hover:text-brand-primary-light transition-colors">Ninja Training</Link></li>
              <li><Link href="/activities/indoor-play" className="hover:text-brand-primary-light transition-colors">Indoor Play</Link></li>
              <li><Link href="/activities/dance-movement" className="hover:text-brand-primary-light transition-colors">Dance & Movement</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Come Play With Us</h3>
            <ul className="space-y-4 text-brand-muted text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-primary-light mt-0.5 shrink-0" />
                <span>123 PlayNest Lane<br />San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-green shrink-0" />
                <span>(555) 349-5437</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-pink shrink-0" />
                <span>hello@playnestkids.com</span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-bold text-sm mb-2">Opening Hours</h4>
              <p className="text-brand-muted text-xs">Mon - Fri: 9:00 AM - 7:00 PM</p>
              <p className="text-brand-muted text-xs">Sat - Sun: 8:00 AM - 8:00 PM</p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} PlayNest Kids. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
