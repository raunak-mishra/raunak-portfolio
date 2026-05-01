import { motion } from "framer-motion";

import { techStack } from "../constants/portfolio";
import Badge from "../components/ui/Badge";
import GlassCard from "../components/ui/GlassCard";
import SectionHeader from "../components/ui/SectionHeader";
import SectionShell from "../components/ui/SectionShell";

const TechStack = () => {
  return (
    <SectionShell id="stack">
      <SectionHeader
        eyebrow="Tech stack"
        title="Runtime surface"
        description="Stack grouped by where it carries load: APIs, streams, storage, infra, telemetry, and AI workflows."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {techStack.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard as="article" className="h-full p-5">
              <div className="mb-5 border-b border-white/10 pb-4">
                <p className="font-mono text-[11px] text-[rgb(var(--accent))]">$ {category.command}</p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.03em] text-slate-100">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
};

export default TechStack;
