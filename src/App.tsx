import { lazy, Suspense, useEffect } from "react";

import Navbar from "./components/layout/Navbar";
import CinematicScrollProvider from "./components/ui/CinematicScrollProvider";
import CustomCursor from "./components/ui/CustomCursor";
import SmoothScrollProvider from "./components/ui/SmoothScrollProvider";
import ThemeProvider, { useTheme } from "./components/ui/ThemeProvider";
import { profile } from "./constants/portfolio";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Metrics from "./sections/Metrics";
import Projects from "./sections/Projects";
import Recommendations from "./sections/Recommendations";
import TechStack from "./sections/TechStack";

const ShaderBackdrop = lazy(() => import("./components/canvas/ShaderBackdrop"));

const PortfolioExperience = () => {
  const { theme } = useTheme();
  return (
    <SmoothScrollProvider>
      <CinematicScrollProvider>
        <CustomCursor />
        <div className="relative min-h-screen overflow-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))] transition-colors duration-500">
        <div className="pointer-events-none fixed inset-0 z-0">
          <Suspense fallback={null}>
            <ShaderBackdrop theme={theme} />
          </Suspense>
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgb(var(--grid)/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--grid)/0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgb(var(--bg)/0.76)_72%)]" />
          <div className="noise-layer absolute inset-0 opacity-[0.06]" />
        </div>
        <div
          className="fixed left-0 top-0 z-[80] h-px w-full origin-left bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-3))]"
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
      </CinematicScrollProvider>
    </SmoothScrollProvider>
  );
};

const App = () => {
  useEffect(() => {
    const title = `${profile.name} - ${profile.role}`;
    if (document.title !== title) {
      document.title = title;
    }
  }, []);

  return (
    <ThemeProvider>
      <PortfolioExperience />
    </ThemeProvider>
  );
};

export default App;
