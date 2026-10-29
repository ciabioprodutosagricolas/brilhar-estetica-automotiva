"use client";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

import AnimatedText from "@/components/ui/animated-text";

// Adapted from the supplied CinematicFooter reference for Brilhar.
export function CinematicFooter({ whatsapp }: { whatsapp: string }) {
  return (
    <footer className="cinematic-footer">
      <div className="footer-service-line" aria-hidden="true">PROTEÇÃO / ACABAMENTO / CUIDADO</div>
      <div className="footer-invitation">
        <h2><AnimatedText text="Seu próximo" /><br /><AnimatedText text="cuidado começa " /><em><AnimatedText text="aqui." /></em></h2>
        <LiquidMetalButton className="footer-glass-link" href={whatsapp} target="_blank" rel="noreferrer">Conversar no WhatsApp <ArrowUpRightIcon /></LiquidMetalButton>
      </div>
      <div className="footer-signature" aria-hidden="true"><AnimatedText text="BRILHAR" animationType="letters" /></div>
      <div className="footer-bottom">
        <a href="#inicio" aria-label="Brilhar — início"><img src="/media/logo-brilhar.png" alt="Brilhar Centro de Estética Automotiva" width="148" height="62" /></a>
        <p>© 2026 Brilhar Estética Automotiva<br /><span>Rondonópolis — MT</span></p>
        <nav aria-label="Navegação do rodapé"><a href="#servicos">Serviços</a><a href="#ppf">PPF</a><a href="https://www.instagram.com/brilhar.estetica.automotiva/" target="_blank" rel="noreferrer">Instagram</a></nav>
        <a className="back-top" href="#inicio" aria-label="Voltar ao início"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 20V4m-7 7 7-7 7 7" /></svg></a>
      </div>
    </footer>
  );
}
