"use client";

// Adapted from the supplied Hyperiux Vault / 21st.dev fullscreen navigation.
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "PPF", href: "#ppf" },
  { label: "A Brilhar", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function ImmersiveFullscreenNav({ whatsapp }: { whatsapp: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("immersive-nav-active");
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("immersive-nav-active");
    };
  }, [isOpen]);

  useEffect(() => () => { animation.current?.kill(); }, []);

  const openMenu = () => {
    const panel = dialog.current;
    if (!panel || panel.open) return;
    closing.current = false;
    animation.current?.kill();
    panel.showModal();
    setIsOpen(true);
    panel.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(panel, { clipPath: "inset(0)" });
      gsap.set(panel.querySelectorAll("[data-nav-reveal]"), { clearProps: "transform,opacity" });
      return;
    }
    animation.current = gsap.timeline()
      .fromTo(panel, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0)", duration: .65, ease: "power4.inOut" })
      .fromTo(panel.querySelectorAll("[data-nav-reveal]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .045, ease: "power2.out" }, .22);
  };

  const closeMenu = useCallback((href?: string) => {
    const panel = dialog.current;
    if (!panel?.open || closing.current) return;
    closing.current = true;
    animation.current?.kill();
    const finish = () => {
      panel.close();
      setIsOpen(false);
      closing.current = false;
      trigger.current?.focus({ preventScroll: true });
      if (!href) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      history.pushState(null, "", href);
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
      target.focus({ preventScroll: true });
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
    animation.current = gsap.timeline({ onComplete: finish })
      .to(panel, { clipPath: "inset(0 0 0 100%)", duration: .4, ease: "power3.inOut" });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = dialog.current;
      if (!panel) return;
      const controls = [...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
        .filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      } else if (!panel.contains(document.activeElement)) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeMenu]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Preserve the browser's modified-click / new-tab behavior.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    closeMenu(href);
  };

  return (
    <div className="immersive-navigation">
      <header className="immersive-nav-header">
        <a href="#inicio" className="immersive-brand" aria-label="Brilhar — início"><Image unoptimized src="/media/logo-brilhar.png" alt="Brilhar Centro de Estética Automotiva" width={164} height={68} /></a>
        <button ref={trigger} className="immersive-menu-toggle" type="button" onClick={openMenu} aria-label="Abrir menu" aria-controls="brilhar-navigation" aria-haspopup="dialog" aria-expanded={isOpen}>
          Menu <span className="immersive-menu-bars" aria-hidden="true"><i /><i /></span>
        </button>
      </header>
      <dialog ref={dialog} id="brilhar-navigation" className="immersive-dialog" aria-label="Menu da Brilhar" onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClose={() => setIsOpen(false)}>
        <header className="immersive-nav-header immersive-nav-header-open">
          <a href="#inicio" className="immersive-brand" aria-label="Brilhar — início" onClick={(event) => navigate(event, "#inicio")}><Image unoptimized src="/media/logo-brilhar.png" alt="Brilhar Centro de Estética Automotiva" width={164} height={68} /></a>
          <button className="immersive-menu-toggle" type="button" onClick={() => closeMenu()} aria-label="Fechar menu">Fechar <span className="immersive-menu-bars is-close" aria-hidden="true"><i /><i /></span></button>
        </header>
        <div className="immersive-panel">
          <p className="immersive-intro" data-nav-reveal>Estética automotiva em Rondonópolis</p>
          <div className="immersive-main">
            <nav className="immersive-links" aria-label="Navegação principal">
              {links.map(({ label, href }) => <div key={href} data-nav-reveal>
                <a href={href} aria-label={label} onClick={(event) => navigate(event, href)}>
                  <span className="immersive-link-mask" aria-hidden="true">{[...label].map((char, index) => <span key={index} style={{ "--letter-delay": `${index * .015}s` } as CSSProperties}>{char}</span>)}</span>
                  <ArrowUpRightIcon size={28} />
                </a>
              </div>)}
            </nav>
            <div className="immersive-photos" aria-hidden="true">
              <figure data-nav-reveal><Image unoptimized src="/media/trabalhos/hero-veiculo-brilhar.webp" alt="" width={800} height={1000} loading="lazy" /></figure>
              <figure data-nav-reveal><Image unoptimized src="/media/trabalhos/ppf-049.webp" alt="" width={800} height={1000} loading="lazy" /></figure>
            </div>
          </div>
          <div className="immersive-footer" data-nav-reveal>
            <a className="immersive-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => closeMenu()}>Conversar no WhatsApp <ArrowUpRightIcon /></a>
            <a className="immersive-instagram" href="https://www.instagram.com/brilhar.estetica.automotiva/" target="_blank" rel="noreferrer" onClick={() => closeMenu()}>Instagram <ArrowUpRightIcon size={18} /></a>
            <span>Rondonópolis — MT</span>
          </div>
        </div>
      </dialog>
    </div>
  );
}
