import { motion } from "framer-motion";

import type { Project } from "../../constants/portfolio";
import Badge from "../ui/Badge";
import CommandButton from "../ui/CommandButton";

type ProjectCardProps = {
  project: Project;
};

const ProjectPreview = () => {
  return (
    <div className="relative overflow-hidden border border-slate-800 bg-transparent p-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <div className="h-2 w-20 bg-slate-700" />
          <div className="mt-2 h-2 w-32 bg-slate-800" />
        </div>
        <div className="h-7 w-20 border border-slate-700" />
      </div>
      <div className="mt-4 grid grid-cols-[0.8fr_1.2fr] gap-3">
        <div className="space-y-2">
          {["Action", "Drama", "Comedy", "Thriller"].map((item, index) => (
            <div
              key={item}
              className={`h-8 border px-3 py-2 text-[10px] ${
                index === 0
                  ? "border-blue-500/50 text-blue-200"
                  : "border-slate-800 text-slate-500"
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
              className="min-h-20 border border-slate-800 p-2"
            >
              <div className="h-14 bg-slate-800" />
              <div className="mt-2 h-1.5 w-3/4 bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.article
      className="grid gap-7 border border-slate-800 bg-transparent p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <ProjectPreview />

      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
            Full-stack project
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-slate-100">
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
                <span className="mt-1.5 h-1.5 w-1.5 bg-green-400" />
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
    </motion.article>
  );
};

export default ProjectCard;
