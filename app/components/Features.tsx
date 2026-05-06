"use client";

import { motion } from "framer-motion";
import { Layers, Palette, RefreshCcw, Lock } from "lucide-react";

const features = [
  {
    title: "Create Digital Shares",
    description: "Transform physical real estate into divisible digital tokens, lowering the barrier to entry for global investors.",
    icon: <Layers className="w-6 h-6 text-indigo-400" />
  },
  {
    title: "Branded Launch Pages",
    description: "Deploy customizable, white-labeled portals for your syndicates to showcase properties and collect capital.",
    icon: <Palette className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Automate Fundraising & Payouts",
    description: "Smart contracts instantly route distributions to token holders, eliminating manual accounting overhead.",
    icon: <RefreshCcw className="w-6 h-6 text-indigo-400" />
  },
  {
    title: "Track Ownership On-Chain",
    description: "Maintain a transparent, immutable cap table verified on the blockchain, fully compliant and secure.",
    icon: <Lock className="w-6 h-6 text-emerald-400" />
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Real Estate Meets Blockchain. <span className="text-indigo-400">Simplified.</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Everything you need to modernize your capital stack.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-zinc-800/50 transition-colors"
            >
              <div className="w-12 h-12 bg-zinc-800/80 rounded-xl flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
