import { profile, externalLinks } from "../constants/portfolio";
import CommandButton from "../components/ui/CommandButton";
import GlassCard from "../components/ui/GlassCard";
import SectionShell from "../components/ui/SectionShell";

const Contact = () => {
  return (
    <SectionShell id="contact" className="pb-10 lg:pb-16">
      <GlassCard className="p-6 md:p-10">
        <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-[rgb(var(--accent-3)/0.12)] blur-3xl" />
        <div className="relative">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent))]">
            Contact
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.055em] text-slate-50 md:text-6xl">
            Let&apos;s build scalable systems together
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            {profile.learningLine}
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            {externalLinks.map((link, index) => (
              <CommandButton
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                variant={index === 0 ? "primary" : "secondary"}
                leading={link.shorthand}
                className="w-full sm:w-auto"
              >
                {link.label}
              </CommandButton>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 font-mono text-xs text-slate-500">
            {profile.name} / {profile.role} / {profile.email}
          </div>
        </div>
      </GlassCard>
    </SectionShell>
  );
};

export default Contact;
