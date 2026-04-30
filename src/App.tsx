import { useEffect } from "react";

import Navbar from "./components/layout/Navbar";
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
    <div className="min-h-screen overflow-hidden bg-[#0B0F14] text-slate-100">
      <div className="relative z-10 mx-auto max-w-[1500px] border-slate-900 lg:border-x">
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
  );
};

export default App;
