"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Hexagon, Box, Triangle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black">
      {/* Cool Unique Web3 Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Animated Perspective Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e515_1px,transparent_1px),linear-gradient(to_bottom,#4f46e515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Floating Geometric Elements (Simulating Tokens/Assets) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] md:left-[15%] text-indigo-500/20"
        >
          <Hexagon strokeWidth={1} className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[5%] md:right-[15%] text-emerald-500/10"
        >
          <Box strokeWidth={1} className="w-32 h-32 md:w-48 md:h-48" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[25%] md:left-[30%] text-indigo-400/10"
        >
          <Triangle strokeWidth={1} className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 text-xs md:text-sm font-medium text-zinc-300 mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          Tokenization-as-a-Service
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1] drop-shadow-2xl"
        >
          Real Estate. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400">
            Tokenized.
          </span>
        </motion.h1>
        
        {/* Faded, different font subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-sm md:text-base font-mono text-zinc-500 uppercase tracking-[0.2em] leading-relaxed">
            Digitize properties // Attract global investors <br className="hidden md:block" /> 
            Automate payouts on the blockchain
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="https://cbld.as.me/?appointmentType=74577811" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all">
              Book Consult <ArrowRight className="w-5 h-5" />
            </button>
          </a>
          <Link href="/demo" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white hover:border-indigo-500/50 transition-all group backdrop-blur-md">
              <Play className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors fill-current" /> See Demo
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
