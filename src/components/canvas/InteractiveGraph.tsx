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
  const telemetry = ["ingest", "process", "route", "observe", "recover"];

  return (
    <GlassCard className="mb-8 p-4 sm:p-5 lg:p-6" hover={false}>
      <div className="mb-4 flex flex-col gap-3 border-b border-[rgb(var(--border))] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[rgb(var(--accent))]">
            observability fabric
          </p>
          <p className="mt-2 text-sm text-[rgb(var(--muted))]">
            Live-feeling topology, traces, and system health mapped from production work.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
          {["p99", "flow", "risk"].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.44)] px-3 py-2 text-center"
            >
              <span className="block text-[rgb(var(--accent))]">
                {index === 0 ? "467ms" : index === 1 ? "live" : "low"}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="relative min-h-[430px] overflow-hidden rounded-[1.35rem] border border-[rgb(var(--border))] bg-[rgb(var(--panel-strong)/0.58)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--accent)/0.16),transparent_34%),linear-gradient(rgb(var(--grid)/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--grid)/0.06)_1px,transparent_1px)] bg-[size:100%_100%,42px_42px,42px_42px]" />
          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.5)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))] backdrop-blur-xl">
            <span>trace-router.ai</span>
            <span className="text-[rgb(var(--accent))]">adaptive</span>
          </div>

          <svg className="absolute inset-0 h-full w-full" role="presentation">
            {positions.slice(1).map((position, index) => (
              <g key={`${position.x}-${position.y}`}>
                <motion.line
                  x1={`${center.x}%`}
                  y1={`${center.y}%`}
                  x2={`${position.x}%`}
                  y2={`${position.y}%`}
                  stroke={activeIndex === index ? "rgb(var(--accent))" : "rgb(100 116 139 / 0.55)"}
                  strokeWidth={activeIndex === index ? "1.8" : "1"}
                  strokeDasharray="7 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.1, delay: index * 0.12, ease: "easeOut" }}
                />
                <motion.circle
                  r="3.5"
                  fill={activeIndex === index ? "rgb(var(--accent))" : "rgb(var(--accent-2))"}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeIndex === index ? [0.15, 1, 0.15] : [0, 0.45, 0],
                    cx: [`${center.x}%`, `${position.x}%`],
                    cy: [`${center.y}%`, `${position.y}%`],
                  }}
                  transition={{
                    duration: 2.2 + index * 0.22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.18,
                  }}
                />
              </g>
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
                className={`absolute min-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-3 text-left shadow-[0_18px_70px_rgb(var(--shadow))] backdrop-blur-xl transition duration-300 ${
                  isActive
                    ? "border-[rgb(var(--accent)/0.45)] bg-[rgb(var(--accent)/0.13)] text-[rgb(var(--text))]"
                    : "border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.66)] text-[rgb(var(--muted))] hover:border-[rgb(var(--accent-2)/0.35)] hover:text-[rgb(var(--text))]"
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
                    isActive ? "bg-[rgb(var(--accent))] shadow-[0_0_24px_rgb(var(--accent)/0.75)]" : "bg-slate-500"
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
            className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(var(--accent)/0.32)] bg-[rgb(var(--accent)/0.1)] text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--accent))] shadow-[0_0_70px_rgb(var(--accent)/0.24)] backdrop-blur-2xl"
            animate={{ scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            systems
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-2 sm:grid-cols-5">
            {telemetry.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.48)] px-3 py-2 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                  <span>{item}</span>
                  <span>{72 + index * 5}%</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[rgb(var(--text)/0.08)]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))]"
                    animate={{ width: [`${42 + index * 7}%`, `${76 + index * 4}%`, `${48 + index * 5}%`] }}
                    transition={{ duration: 3.2 + index * 0.28, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-full flex-col justify-between rounded-[1.35rem] border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.48)] p-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[rgb(var(--accent))]">
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
                className="rounded-2xl border border-[rgb(var(--accent)/0.18)] bg-[rgb(var(--accent)/0.07)] px-3 py-2 font-mono text-xs text-[rgb(var(--text))]"
              >
                {impact}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--panel-strong)/0.45)] p-4">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
              <span>signal confidence</span>
              <span className="text-[rgb(var(--accent))]">99.3%</span>
            </div>
            <div className="flex h-20 items-end gap-1">
              {Array.from({ length: 24 }, (_, index) => (
                <motion.span
                  key={index}
                  className="flex-1 rounded-full bg-[rgb(var(--accent)/0.7)]"
                  animate={{ height: [`${28 + ((index * 13) % 44)}%`, `${48 + ((index * 17) % 48)}%`, `${24 + ((index * 11) % 52)}%`] }}
                  transition={{ duration: 2.4 + index * 0.04, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default InteractiveGraph;
