"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Adapted from the supplied Nimbus UI / Waterline reference.
const items = [
  { label: "Serviços", href: "#servicos" },
  { label: "PPF", href: "#ppf" },
  { label: "A Brilhar", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function LiquidNavbar() {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState("");
  const [drop, setDrop] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(() => {
      const current = items.find(({ href }) => {
        const bounds = document.querySelector(href)?.getBoundingClientRect();
        return bounds && bounds.top <= innerHeight * .4 && bounds.bottom > innerHeight * .4;
      });
      setActive(current?.href ?? "");
    }, { rootMargin: "-40% 0px -59% 0px" });
    items.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const link = nav.current?.querySelector<HTMLElement>(`a[href="${active}"]`);
      setDrop({ left: link?.offsetLeft ?? 0, width: link?.offsetWidth ?? 0 });
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (nav.current) resize.observe(nav.current);
    return () => resize.disconnect();
  }, [active]);

  return (
    <nav ref={nav} className="liquid-nav" aria-label="Navegação principal" style={{ "--drop-left": `${drop.left}px`, "--drop-width": `${drop.width}px` } as CSSProperties}>
      <span className="liquid-nav-drop" aria-hidden="true" />
      {items.map((item) => <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined} onClick={() => setActive(item.href)}>{item.label}</a>)}
    </nav>
  );
}
