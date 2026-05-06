"use client";

import { motion } from "framer-motion";
import { Coins, Building, ArrowRight, ShieldCheck, Landmark, SearchCode } from "lucide-react";

export default function TokenAndPartners() {
  const tokenOptions = [
    { amount: "10K", price: "$100", link: "https://link.fastpaydirect.com/payment-link/67ab397afcbf1c667bf42714" },
    { amount: "100K", price: "$1,000", link: "https://link.fastpaydirect.com/payment-link/67ab39b9020837516ad06390" },
    { amount: "1M", price: "$10K", link: "https://link.fastpaydirect.com/payment-link/67ab39d7eba43a52a334d09e" },
  ];

  const partners = [
    { name: "Interpret AI", icon: <SearchCode className="w-8 h-8" /> },
    { name: "Concrete Build Crypto Financing", icon: <Coins className="w-8 h-8" /> },
    { name: "Directed IRA", icon: <Landmark className="w-8 h-8" /> },
    { name: "Stephen Lee-Thomas Capital", icon: <Building className="w-8 h-8" /> },
    { name: "Legal & Medical Support", icon: <ShieldCheck className="w-8 h-8" /> }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* Buy Token Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
            Buy CBLD Token
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {tokenOptions.map((opt, idx) => (
              <motion.a
                key={idx}
                href={opt.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 border border-zinc-700/50 hover:border-indigo-500/50 rounded-2xl flex items-center justify-center gap-3 group transition-colors shadow-lg shadow-black/50"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/40 transition-colors">
                  <Coins className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="font-bold text-lg text-zinc-100">{opt.amount} CBLD: <span className="text-emerald-400">{opt.price}</span></span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">Key Partnerships</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-zinc-800/50 transition-colors aspect-square"
              >
                <div className="text-zinc-500 group-hover:text-indigo-400 transition-colors">
                  {partner.icon}
                </div>
                <span className="text-sm font-semibold text-zinc-300 text-center leading-snug">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
