import { projects } from "../constants/portfolio";
import ProjectCard from "../components/cards/ProjectCard";
import SectionHeader from "../components/ui/SectionHeader";
import SectionShell from "../components/ui/SectionShell";

const Projects = () => {
  return (
    <SectionShell id="projects">
      <SectionHeader
        eyebrow="Projects"
        title="Small surface, clean backend thinking"
        description="A focused project section that presents MovieCafe as a full-stack system with clear API and data boundaries."
      />

      <div className="mx-auto max-w-5xl">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </SectionShell>
  );
};

export default Projects;
