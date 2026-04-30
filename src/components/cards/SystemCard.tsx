import { motion } from "framer-motion";

import type { SystemCard as SystemCardType } from "../../constants/portfolio";
import Badge from "../ui/Badge";

type SystemCardProps = {
  system: SystemCardType;
  index: number;
};

const SystemCard = ({ system, index }: SystemCardProps) => {
  return (
    <motion.article
      className="group border border-slate-800 bg-transparent p-5 transition duration-200 hover:border-slate-600 md:p-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">
            {system.company}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-normal text-slate-100">
            {system.title}
          </h3>
        </div>
        <div className="border border-slate-800 bg-transparent px-3 py-2 font-mono text-xs text-slate-400 md:text-right">
          <p className="text-slate-200">{system.role}</p>
          <p>{system.duration}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Problem
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {system.problem}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Solution
          </p>
          <ul className="mt-3 space-y-3">
            {system.solution.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[18px_1fr] gap-3 text-sm leading-7 text-slate-300"
              >
                <span className="mt-2 h-1.5 w-1.5 bg-blue-400" />
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
            className="border border-slate-800 bg-transparent px-3 py-3 font-mono text-xs text-green-200"
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
    </motion.article>
  );
};

export default SystemCard;
