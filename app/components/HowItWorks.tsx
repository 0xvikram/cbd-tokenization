"use client";

import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Define Your Project", desc: "Select the commercial real estate asset and set your fundraising goals." },
  { step: "02", title: "Tokenize the Asset", desc: "We deploy EVM-compatible smart contracts representing fractional ownership." },
  { step: "03", title: "Launch & Fund", desc: "Offer tokens via a branded launch page. Investors buy in using fiat or crypto." },
  { step: "04", title: "Track, Distribute, & Grow", desc: "Smart contracts handle ownership, real-time dividends, and built-in resale options." }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-zinc-900/20 border-y border-zinc-800/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-black text-zinc-800/50 mb-4 tracking-tighter">{s.step}</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-300">{s.title}</h3>
              <p className="text-zinc-400 text-sm">{s.desc}</p>
              
              {/* Connector line for large screens */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-zinc-700 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
