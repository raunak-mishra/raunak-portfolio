import { useState } from "react";
import { motion } from "framer-motion";

import { systemsBuilt } from "../../constants/portfolio";
import GlassCard from "../ui/GlassCard";

const positions = [
  { x: 50, y: 50 },
  { x: 18, y: 26 },
  { x: 78, y: 24 },
  { x: 82, y: 72 },
  { x: 22, y: 76 },
];

const InteractiveGraph = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSystem = systemsBuilt[activeIndex];
  const center = positions[0];

  return (
    <GlassCard className="mb-8 p-4 sm:p-5 lg:p-6" hover={false}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:100%_100%,42px_42px,42px_42px]" />
          <svg className="absolute inset-0 h-full w-full" role="presentation">
            {positions.slice(1).map((position, index) => (
              <motion.line
                key={`${position.x}-${position.y}`}
                x1={`${center.x}%`}
                y1={`${center.y}%`}
                x2={`${position.x}%`}
                y2={`${position.y}%`}
                stroke={activeIndex === index ? "#67e8f9" : "#334155"}
                strokeWidth={activeIndex === index ? "1.8" : "1"}
                strokeDasharray="7 10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, delay: index * 0.12, ease: "easeOut" }}
              />
            ))}
          </svg>

          {systemsBuilt.map((system, index) => {
            const position = positions[index + 1] ?? positions[0];
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={system.company}
                type="button"
                aria-label={system.title}
                className={`absolute min-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-3 text-left shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 ${
                  isActive
                    ? "border-cyan-200/45 bg-cyan-300/12 text-white"
                    : "border-white/10 bg-slate-950/65 text-slate-400 hover:border-emerald-300/35 hover:text-slate-100"
                }`}
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="card"
              >
                <span
                  className={`mb-2 block h-2 w-2 rounded-full ${
                    isActive ? "bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.9)]" : "bg-slate-500"
                  }`}
                />
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em]">
                  0{index + 1}
                </span>
                <span className="mt-1 block font-display text-base font-semibold">
                  {system.company}
                </span>
              </motion.button>
            );
          })}

          <motion.div
            className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-200/10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100 shadow-[0_0_70px_rgba(34,211,238,0.24)] backdrop-blur-2xl"
            animate={{ scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            systems
          </motion.div>
        </div>

        <div className="flex min-h-full flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200">
              {activeSystem.company}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-slate-50 md:text-3xl">
              {activeSystem.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {activeSystem.problem}
            </p>
          </div>

          <div className="mt-6 grid gap-2">
            {activeSystem.impact.map((impact) => (
              <div
                key={impact}
                className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2 font-mono text-xs text-emerald-100"
              >
                {impact}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default InteractiveGraph;
