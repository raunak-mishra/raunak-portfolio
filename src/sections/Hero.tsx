import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { profile } from "../constants/portfolio";
import CanvasBoundary from "../components/ui/CanvasBoundary";
import CommandButton from "../components/ui/CommandButton";
import TopologyFallback from "../components/ui/TopologyFallback";

const SystemGraph = lazy(() => import("../components/canvas/SystemGraph"));

const canCreateWebGLContext = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const Hero = () => {
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    setWebglAvailable(canCreateWebGLContext());
  }, []);

  return (
    <section className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-10 lg:pt-28">
      <div className="absolute inset-x-5 top-24 h-px bg-slate-800 sm:inset-x-8 lg:inset-x-10" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="inline-flex max-w-full items-center gap-3 border border-slate-800 bg-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
          <span className="h-2 w-2 bg-green-400" />
          systems.online / {profile.role}
        </div>

        <h1 className="mt-7 max-w-4xl font-display text-[38px] font-semibold leading-[1.02] tracking-normal text-slate-50 sm:text-6xl lg:text-7xl">
          {profile.headline}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
          {profile.heroSubtext}
        </p>

        <p className="mt-5 hidden max-w-2xl text-sm leading-7 text-slate-500 sm:block">
          {profile.summary}
        </p>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
          <CommandButton href="#projects" variant="primary" className="w-full sm:w-auto">
            View Work
          </CommandButton>
          <CommandButton
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            leading="GH"
            className="w-full sm:w-auto"
          >
            GitHub
          </CommandButton>
        </div>
      </motion.div>

      <motion.div
        className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      >
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-[#0B0F14] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">
          <span>event-mesh.prod</span>
          <span className="text-green-300">healthy</span>
        </div>
        <div className="absolute inset-0 pt-10">
          {webglAvailable ? (
            <CanvasBoundary fallback={<TopologyFallback />}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center font-mono text-xs text-slate-500">
                    loading topology
                  </div>
                }
              >
                <SystemGraph />
              </Suspense>
            </CanvasBoundary>
          ) : (
            <TopologyFallback />
          )}
        </div>
        <div className="absolute bottom-4 left-0 right-0 z-10 grid gap-2 font-mono text-xs text-slate-400 sm:grid-cols-3">
          {[
            ["stream", "Kafka"],
            ["warehouse", "BigQuery"],
            ["p99", "467ms"],
          ].map(([label, value]) => (
            <div key={label} className="border border-slate-800 bg-[#0B0F14] px-3 py-2">
              <p className="text-slate-500">{label}</p>
              <p className="mt-1 text-slate-100">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
