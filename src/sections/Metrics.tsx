import { motion } from "framer-motion";

import { metrics } from "../constants/portfolio";
import MetricCounter from "../components/ui/MetricCounter";
import SectionHeader from "../components/ui/SectionHeader";
import SectionShell from "../components/ui/SectionShell";

const Metrics = () => {
  return (
    <SectionShell id="metrics">
      <SectionHeader
        eyebrow="Engineering metrics"
        title="Impact measured like system telemetry"
        description="Numbers that communicate scale, reliability, migration depth, and performance ownership."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            className="border border-slate-800 bg-transparent p-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              {metric.label}
            </p>
            <p className="mt-5 font-mono text-4xl font-semibold text-slate-50 md:text-5xl">
              <MetricCounter
                value={metric.value}
                suffix={metric.suffix}
                decimals={metric.decimals}
              />
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">{metric.note}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
};

export default Metrics;
