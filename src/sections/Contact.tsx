import { profile, externalLinks } from "../constants/portfolio";
import CommandButton from "../components/ui/CommandButton";
import SectionShell from "../components/ui/SectionShell";

const Contact = () => {
  return (
    <SectionShell id="contact" className="pb-10 lg:pb-16">
      <div className="border border-slate-800 bg-transparent p-6 md:p-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Contact
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-normal text-slate-50 md:text-6xl">
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

        <div className="mt-8 border-t border-slate-800 pt-5 font-mono text-xs text-slate-500">
          {profile.name} / {profile.role} / {profile.email}
        </div>
      </div>
    </SectionShell>
  );
};

export default Contact;
