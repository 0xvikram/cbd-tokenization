"use client";

import { Building2, Calendar, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 border-t border-zinc-800/50 relative z-10 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-indigo-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Call to Action Section */}
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            Let's Tokenize Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">Property</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://cbld.as.me/?appointmentType=74577811" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all">
                <Calendar className="w-5 h-5" /> Schedule a demo
              </button>
            </a>
            <a href="mailto:support@concretebuild.org" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white transition-all">
                <Mail className="w-5 h-5 text-zinc-400" /> Contact our team
              </button>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-800/50 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-lg font-bold text-zinc-300">Concrete Build</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-500">
            <a href="mailto:support@concretebuild.org" className="hover:text-indigo-400 transition-colors">support@concretebuild.org</a>
            <a href="https://web.telegram.org/a/#-4696364694" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Telegram</a>
            <a href="https://x.com/CBLD2025" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">X (Twitter)</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
