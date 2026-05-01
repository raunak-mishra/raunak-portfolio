import { motion } from "framer-motion";

import type { SystemCard as SystemCardType } from "../../constants/portfolio";
import Badge from "../ui/Badge";
import GlassCard from "../ui/GlassCard";

type SystemCardProps = {
  system: SystemCardType;
  index: number;
};

const SystemCard = ({ system, index }: SystemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.68, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard as="article" className="p-5 md:p-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[rgb(var(--accent))]">
              {system.company}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-slate-100">
              {system.title}
            </h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 font-mono text-xs text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] md:text-right">
            <p className="text-slate-200">{system.role}</p>
            <p>{system.duration}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/25 p-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Problem
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {system.problem}
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/25 p-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Solution
            </p>
            <ul className="mt-3 space-y-3">
              {system.solution.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[18px_1fr] gap-3 text-sm leading-7 text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-2))] shadow-[0_0_16px_rgb(var(--accent-2)/0.58)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {system.impact.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[rgb(var(--accent)/0.18)] bg-[rgb(var(--accent)/0.07)] px-3 py-3 font-mono text-xs text-[rgb(var(--text))] shadow-[0_0_30px_rgb(var(--accent)/0.06)]"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {system.technologies.map((technology, techIndex) => (
            <Badge key={technology} tone={techIndex < 2 ? "blue" : "neutral"}>
              {technology}
            </Badge>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default SystemCard;
