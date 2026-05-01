import { useEffect, useState } from "react";

import { navItems, profile } from "../../constants/portfolio";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const [active, setActive] = useState("systems");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.18;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId ?? "systems");
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full px-5 py-4 transition duration-300 sm:px-8 lg:px-10 ${
        scrolled
          ? "bg-slate-950/45 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.5)] px-3 py-2 shadow-[0_18px_70px_rgb(var(--shadow)),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-2xl">
        <a href="#" className="flex items-center gap-3" aria-label="Raunak Mishra home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--accent)/0.28)] bg-[rgb(var(--accent)/0.12)] font-mono text-sm font-semibold text-[rgb(var(--text))] shadow-[0_0_30px_rgb(var(--accent)/0.14)]">
            RM
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-slate-100">{profile.name}</span>
            <span className="block font-mono text-[11px] text-slate-500">{profile.role}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((nav) => (
            <li
              key={nav.id}
              className={`relative font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                active === nav.id
                  ? "text-[rgb(var(--accent))]"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <a href={`#${nav.id}`} className="py-2">
                {nav.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[rgb(var(--accent))] transition-all duration-300 ${
                    active === nav.id ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href={profile.links.resume}
            download
            className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.42)] px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--text))] transition hover:border-[rgb(var(--accent)/0.5)] hover:bg-[rgb(var(--accent)/0.1)]"
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.58)] text-[rgb(var(--text))]"
            onClick={() => setToggle((value) => !value)}
          >
            <span className="font-mono text-xs">{toggle ? "x" : "=="}</span>
          </button>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } absolute left-5 right-5 top-20 z-10 flex-col overflow-hidden rounded-[1.5rem] border border-[rgb(var(--border))] bg-[rgb(var(--panel-strong)/0.92)] shadow-[0_24px_90px_rgb(var(--shadow))] backdrop-blur-2xl`}
          >
            {navItems.map((nav) => (
              <a
                key={nav.id}
                href={`#${nav.id}`}
                className={`border-b border-white/10 px-4 py-4 font-mono text-xs uppercase tracking-[0.18em] ${
                  active === nav.id ? "text-[rgb(var(--accent))]" : "text-slate-500"
                }`}
                onClick={() => setToggle(false)}
              >
                {nav.label}
              </a>
            ))}
            <a
              href={profile.links.resume}
              download
              className="px-4 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-100"
              onClick={() => setToggle(false)}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
