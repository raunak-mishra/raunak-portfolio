import { motion } from "framer-motion";

import { metrics } from "../constants/portfolio";
import GlassCard from "../components/ui/GlassCard";
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
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard as="article" className="h-full p-5">
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
              <div className="mt-5 h-px w-full bg-gradient-to-r from-[rgb(var(--accent)/0.38)] via-[rgb(var(--accent-2)/0.22)] to-transparent" />
              <p className="mt-4 text-sm leading-7 text-slate-400">{metric.note}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
};

export default Metrics;
