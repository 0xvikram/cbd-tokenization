import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Roadmap from "../components/Roadmap";
import TokenAndPartners from "../components/TokenAndPartners";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Roadmap />
        <TokenAndPartners />
      </main>
      <Footer />
    </div>
  );
}
