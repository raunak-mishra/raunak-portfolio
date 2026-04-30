import { useEffect, useState } from "react";

import { navItems, profile } from "../../constants/portfolio";

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
      className={`fixed left-0 top-0 z-50 w-full border-b px-5 py-4 transition duration-300 sm:px-8 lg:px-10 ${
        scrolled
          ? "border-slate-800 bg-[#0B0F14]/95"
          : "border-slate-900 bg-[#0B0F14]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="flex items-center gap-3" aria-label="Raunak Mishra home">
          <span className="flex h-9 w-9 items-center justify-center border border-slate-700 bg-slate-950 font-mono text-sm font-semibold text-slate-100">
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
              className={`font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                active === nav.id
                  ? "text-slate-100"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              <a href={`#${nav.id}`}>{nav.label}</a>
            </li>
          ))}
        </ul>

        <a
          href={profile.links.resume}
          download
          className="hidden border border-slate-700 bg-transparent px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-400 hover:text-white md:block"
        >
          Resume
        </a>

        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center border border-slate-700 bg-slate-950 text-slate-200"
            onClick={() => setToggle((value) => !value)}
          >
            <span className="font-mono text-xs">{toggle ? "x" : "=="}</span>
          </button>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } absolute left-5 right-5 top-20 z-10 flex-col border border-slate-800 bg-[#0B0F14]`}
          >
            {navItems.map((nav) => (
              <a
                key={nav.id}
                href={`#${nav.id}`}
                className={`border-b border-slate-900 px-4 py-4 font-mono text-xs uppercase tracking-[0.18em] ${
                  active === nav.id ? "text-slate-100" : "text-slate-500"
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
