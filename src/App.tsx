import { useEffect } from "react";

import Navbar from "./components/layout/Navbar";
import CustomCursor from "./components/ui/CustomCursor";
import SmoothScrollProvider from "./components/ui/SmoothScrollProvider";
import { profile } from "./constants/portfolio";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Metrics from "./sections/Metrics";
import Projects from "./sections/Projects";
import Recommendations from "./sections/Recommendations";
import TechStack from "./sections/TechStack";

const App = () => {
  useEffect(() => {
    const title = `${profile.name} - ${profile.role}`;
    if (document.title !== title) {
      document.title = title;
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="relative min-h-screen overflow-hidden bg-[#030711] text-slate-100">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_52%_58%,rgba(124,58,237,0.12),transparent_32%),linear-gradient(180deg,#030711_0%,#06101c_48%,#02040a_100%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(3,7,17,0.74)_72%)]" />
          <div className="noise-layer absolute inset-0 opacity-[0.055]" />
        </div>
        <div
          className="fixed left-0 top-0 z-[80] h-px w-full origin-left bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300"
          style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
        />
        <div className="relative z-10 mx-auto max-w-[1560px]">
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <TechStack />
            <Projects />
            <Metrics />
            <Achievements />
            <Recommendations />
            <Contact />
          </main>
        </div>
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
