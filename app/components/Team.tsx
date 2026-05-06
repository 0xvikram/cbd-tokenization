"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Dr. Nelva Lee", role: "CEO", desc: "10+ years of Business Executive Experience" },
  { name: "Donnie Lee Jr.", role: "CTO", desc: "Cryptocurrency expert and Blockchain expansion expert" },
  { name: "Angel Gonzalez", role: "CFO", desc: "Financial strategist with a background in asset management." },
  { name: "Jacob Alfano", role: "Advisor", desc: "Real estate industry veteran" }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-zinc-900/20 border-y border-zinc-800/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Core Team</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-zinc-900/60 border border-zinc-800/50 rounded-2xl text-center hover:border-indigo-500/50 transition-colors"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 rounded-full border border-zinc-700 mb-4 flex items-center justify-center text-2xl font-bold text-zinc-600">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-indigo-400 font-medium text-sm mb-3">{member.role}</p>
              <p className="text-zinc-500 text-sm">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
