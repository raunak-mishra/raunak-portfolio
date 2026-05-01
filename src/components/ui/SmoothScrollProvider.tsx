import { useEffect, type ReactNode } from "react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[href^='#']"
      );

      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: reducedMotion.matches ? "auto" : "smooth",
        });
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", hash);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
