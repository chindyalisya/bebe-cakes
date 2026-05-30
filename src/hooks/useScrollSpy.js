import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/constants";

export function useScrollSpy() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      NAV_LINKS.forEach((link) => {
        const el = document.getElementById(link.toLowerCase());
        if (el) {
          const top = el.offsetTop - 80;
          if (scrollY >= top) setActive(link);
        }
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return active;
}
