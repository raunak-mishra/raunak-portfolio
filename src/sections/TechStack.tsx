import { motion } from "framer-motion";

import { techStack } from "../constants/portfolio";
import Badge from "../components/ui/Badge";
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
          <motion.article
            key={category.title}
            className="border border-slate-800 bg-transparent p-5 transition duration-200 hover:border-slate-600"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
          >
            <div className="mb-5 border-b border-slate-800 pb-4">
              <p className="font-mono text-[11px] text-green-300">$ {category.command}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-slate-100">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.tools.map((tool) => (
                <Badge key={tool}>{tool}</Badge>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
};

export default TechStack;
