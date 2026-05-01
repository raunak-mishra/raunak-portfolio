import { motion } from "framer-motion";

import type { Project } from "../../constants/portfolio";
import Badge from "../ui/Badge";
import CommandButton from "../ui/CommandButton";
import GlassCard from "../ui/GlassCard";

type ProjectCardProps = {
  project: Project;
};

const ProjectPreview = () => {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.12),transparent_28%)]" />
      <div className="relative flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="h-2 w-20 rounded-full bg-cyan-200/55" />
          <div className="mt-2 h-2 w-32 rounded-full bg-white/10" />
        </div>
        <div className="h-7 w-20 rounded-full border border-white/10 bg-white/[0.03]" />
      </div>
      <div className="relative mt-4 grid grid-cols-[0.8fr_1.2fr] gap-3">
        <div className="space-y-2">
          {["Action", "Drama", "Comedy", "Thriller"].map((item, index) => (
            <div
              key={item}
              className={`h-8 rounded-xl border px-3 py-2 text-[10px] ${
                index === 0
                  ? "border-cyan-300/45 bg-cyan-300/[0.08] text-cyan-100"
                  : "border-white/10 bg-white/[0.025] text-slate-500"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.025] p-2"
            >
              <div className="h-16 rounded-xl bg-gradient-to-br from-slate-700/80 via-slate-800 to-slate-950" />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard as="article" className="grid gap-7 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
        <ProjectPreview />

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-100/65">
              Full-stack project
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-slate-100 md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {project.description}
            </p>
            <ul className="mt-5 space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="grid grid-cols-[18px_1fr] gap-3 text-sm text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.75)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <CommandButton href={project.sourceCodeLink} target="_blank" rel="noreferrer">
              Source
            </CommandButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProjectCard;
