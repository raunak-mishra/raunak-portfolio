import { motion } from "framer-motion";

import { recommendations } from "../constants/portfolio";
import SectionHeader from "../components/ui/SectionHeader";
import SectionShell from "../components/ui/SectionShell";

const Recommendations = () => {
  return (
    <SectionShell id="recommendations">
      <SectionHeader
        eyebrow="Endorsements"
        title="What teammates say under load"
        description="Direct LinkedIn recommendations from people who worked with me in production teams."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((recommendation, index) => (
          <motion.article
            key={recommendation.name}
            className="border border-slate-800 bg-transparent p-5 md:p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
          >
            <div className="border-b border-slate-800 pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                {recommendation.date} / {recommendation.relationship}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-100">
                {recommendation.name}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {recommendation.designation}
              </p>
            </div>
            <blockquote className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              {recommendation.quote.map((paragraph) => (
                <p key={paragraph}>&quot;{paragraph}&quot;</p>
              ))}
            </blockquote>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
};

export default Recommendations;
