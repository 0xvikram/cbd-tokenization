"use client";

import { motion } from "framer-motion";

const milestones = [
  { q: "Q2 2025", desc: "Onboard pilot clients, smart contract v1, client dashboards", status: "active" },
  { q: "Q3 2025", desc: "Launch partner portal, expand discount network", status: "upcoming" },
  { q: "Q4 2025", desc: "Enable staking + resale mechanics, onboarding automation", status: "upcoming" },
  { q: "2026", desc: "Expand the TaaS model to other asset classes", status: "upcoming" }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Roadmap</h2>
        
        <div className="relative">
          {/* Vertical line connecting the timeline */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2" />
          
          <div className="space-y-12">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full border-4 border-black -translate-x-1/2 mt-6 md:mt-0 z-10 bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl backdrop-blur-sm hover:border-indigo-500/30 transition-all hover:-translate-y-1 group">
                      <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <span className="inline-block px-4 py-1 mb-4 text-sm font-bold tracking-wider rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                          {m.q}
                        </span>
                        <p className="text-zinc-300 leading-relaxed text-lg">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
