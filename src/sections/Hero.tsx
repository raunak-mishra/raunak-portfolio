import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { profile } from "../constants/portfolio";
import CanvasBoundary from "../components/ui/CanvasBoundary";
import CommandButton from "../components/ui/CommandButton";
import GlassCard from "../components/ui/GlassCard";
import TopologyFallback from "../components/ui/TopologyFallback";

const Hero3DScene = lazy(() => import("../components/canvas/Hero3DScene"));

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
      <div className="pointer-events-none absolute inset-x-5 top-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent)/0.28)] to-transparent sm:inset-x-8 lg:inset-x-10" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-36 h-72 w-72 rounded-full bg-[rgb(var(--accent)/0.12)] blur-3xl"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.46)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--muted))] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-2xl">
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_18px_rgb(var(--accent)/0.85)]" />
          systems.online / {profile.role}
        </div>

        <h1 className="mt-7 max-w-4xl font-display text-[42px] font-semibold leading-[0.95] tracking-[-0.065em] text-slate-50 sm:text-6xl lg:text-7xl xl:text-8xl">
          {profile.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
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
        className="relative min-h-[420px] lg:min-h-[620px]"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassCard className="h-full min-h-[420px] p-3 lg:min-h-[620px]" hover={false}>
          <div className="relative h-full min-h-[396px] overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-950/45 lg:min-h-[596px]">
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--panel-strong)/0.58)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--muted))] backdrop-blur-2xl">
              <span>event-mesh.prod</span>
              <span className="text-[rgb(var(--accent))]">healthy</span>
            </div>
            <div className="absolute inset-0 pt-10">
              {webglAvailable ? (
                <CanvasBoundary fallback={<TopologyFallback />}>
                  <Suspense
                    fallback={
                      <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                        loading topology
                      </div>
                    }
                  >
                    <Hero3DScene />
                  </Suspense>
                </CanvasBoundary>
              ) : (
                <TopologyFallback />
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-2 font-mono text-xs text-slate-400 sm:grid-cols-3">
              {[
                ["stream", "Kafka"],
                ["warehouse", "BigQuery"],
                ["p99", "467ms"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--panel-strong)/0.62)] px-3 py-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-2xl"
                >
                  <p className="text-slate-500">{label}</p>
                  <p className="mt-1 text-slate-100">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default Hero;
