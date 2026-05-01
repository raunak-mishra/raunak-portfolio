import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CinematicScrollProviderProps = {
  children: ReactNode;
};

const CinematicScrollProvider = ({ children }: CinematicScrollProviderProps) => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cinematic-section").forEach((section) => {
        const header = section.querySelector(".section-orbit");
        const cards = section.querySelectorAll(".premium-card");

        if (header) {
          gsap.fromTo(
            header,
            { y: 48, opacity: 0, filter: "blur(14px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                end: "top 34%",
                scrub: 0.8,
              },
            }
          );
        }

        gsap.fromTo(
          cards,
          { y: 42, opacity: 0.72, rotateX: 7 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "bottom 42%",
              scrub: 0.65,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0.12);

        gsap.to(layer, {
          yPercent: depth * -100,
          ease: "none",
          scrollTrigger: {
            trigger: layer.closest("section") ?? document.body,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return <>{children}</>;
};

export default CinematicScrollProvider;
