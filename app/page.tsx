"use client";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";


import { ServiceLoop } from "@/components/ui/service-loop";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import AnimatedText from "@/components/ui/animated-text";
import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";
import { CinematicFooter } from "@/components/ui/motion-footer";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5566996919667";
const WHATSAPP =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim pelo site da Brilhar e gostaria de um orçamento.")}`;

const services = [
  {
    number: "01",
    title: "PPF",
    label: "Proteção de pintura",
    text: "Uma camada praticamente invisível para ajudar a preservar a pintura contra riscos, pequenos impactos e marcas do uso diário.",
    image: "/media/trabalhos/ppf-049.webp",
    video: "/media/trabalhos/ppf-049.mp4",
    detail: "Proteção de alto impacto",
    target: "#ppf",
  },
  {
    number: "02",
    title: "Polimento técnico",
    label: "Correção e acabamento",
    text: "Correção criteriosa do verniz para reduzir marcas, recuperar profundidade e revelar novamente o brilho do veículo.",
    image: "/media/trabalhos/polimento-029.webp",
    video: "/media/trabalhos/polimento-029.mp4",
    detail: "Recuperação de profundidade",
    target: "#demais-servicos",
  },
  {
    number: "03",
    title: "Lavagem detalhada",
    label: "Cuidado recorrente",
    text: "Limpeza cuidadosa, com técnica e produtos adequados para preservar o acabamento e os materiais do seu carro.",
    image: "/media/trabalhos/lavagem-018.webp",
    video: "/media/trabalhos/lavagem-018.mp4",
    detail: "Manutenção com técnica",
    target: "#demais-servicos",
  },
];

const ppfBenefits = [
  {
    number: "01",
    title: "Barreira física",
    text: "Contra riscos leves, pequenos impactos e detritos de estrada.",
  },
  {
    number: "02",
    title: "Acabamento discreto",
    text: "Para manter cor, brilho e linhas originais do carro.",
  },
  {
    number: "03",
    title: "Proteção sob medida",
    text: "Em áreas de maior impacto ou com cobertura completa.",
  },
];

const otherServices = [
  {
    title: "Higienização",
    text: "Limpeza profunda de bancos, carpetes, forros e superfícies internas.",
    benefits: "Conforto · limpeza profunda · redução de odores",
    image: "/media/trabalhos/higienizacao-013.webp",
    video: "/media/trabalhos/higienizacao-013.mp4",
  },
  {
    title: "Correção de pintura",
    text: "Tratamento técnico para recuperar uniformidade e acabamento.",
    benefits: "Menos marcas · mais reflexo · acabamento uniforme",
    image: "/media/trabalhos/polimento-032.webp",
    video: "/media/trabalhos/polimento-032.mp4",
  },
  {
    title: "Oxi-sanitização",
    text: "Processo complementar para renovar a sensação de limpeza interna.",
    benefits: "Ar renovado · cuidado interno · maior conforto",
    image: "/media/trabalhos/higienizacao-007.webp",
    video: "/media/trabalhos/higienizacao-007.mp4",
  },
  {
    title: "Nebulização",
    text: "Aplicação uniforme de produto em áreas de difícil alcance do interior.",
    benefits: "Alcance uniforme · praticidade · cuidado complementar",
    image: "/media/trabalhos/higienizacao-009.webp",
    video: "/media/trabalhos/higienizacao-009.mp4",
  },
  { title: "Cera", text: "Aplicação de cera no acabamento do veículo.", benefits: "Cuidado · acabamento", image: "/media/trabalhos/cera-003.webp", video: "/media/trabalhos/cera-003.mp4" },
  { title: "Revitalização de plásticos", text: "Cuidado e revitalização das superfícies plásticas externas.", benefits: "Cuidado externo · acabamento", image: "/media/trabalhos/plasticos-068.webp", video: "/media/trabalhos/plasticos-068.mp4" },
];

const faqItems = [
  [
    "PPF é indicado apenas para carros de luxo?",
    "Não. A proteção faz sentido para qualquer proprietário que queira preservar a pintura. A cobertura pode ser adaptada ao uso do carro e ao orçamento disponível.",
  ],
  [
    "Preciso levar o carro para avaliação?",
    "A avaliação permite indicar o processo correto e estimar tempo e investimento com mais precisão. O primeiro contato pode ser feito pelo WhatsApp.",
  ],
  [
    "Vocês atendem carros de uso diário?",
    "Sim. A proposta da Brilhar é cuidar bem de todo veículo, do carro usado na rotina aos modelos especiais.",
  ],
];

type Goal = "proteger" | "brilho" | "interior";
type Usage = "dia-a-dia" | "estrada" | "especial";
type Condition = "novo" | "marcas" | "intenso";

function Arrow() {
  return <ArrowUpRightIcon />;
}

function recommendationFor(goal: Goal, usage: Usage, condition: Condition) {
  if (goal === "interior") {
    return {
      title: "Higienização + oxi-sanitização",
      text: "Uma combinação para renovar o interior, cuidar dos materiais e recuperar a sensação de conforto.",
    };
  }

  if (goal === "proteger" && (usage === "estrada" || usage === "especial")) {
    return {
      title: "PPF frontal",
      text: "Proteção física nas áreas mais expostas aos impactos da estrada e do uso diário.",
    };
  }

  if (goal === "proteger") {
    return {
      title: "PPF sob medida",
      text: "Uma cobertura definida conforme sua rotina, priorizando as áreas que mais recebem impactos e marcas.",
    };
  }

  if (condition === "marcas" || condition === "intenso") {
    return {
      title: "Polimento técnico",
      text: "Correção criteriosa para reduzir marcas e recuperar a profundidade e o brilho da pintura.",
    };
  }

  return {
    title: "Lavagem detalhada + cera",
    text: "Limpeza cuidadosa e aplicação de cera para valorizar o brilho do veículo bem conservado.",
  };
}

export default function Home() {
  const [tickerPaused, setTickerPaused] = useState(false);
  const ticker = useRef<HTMLDivElement>(null);
  const selectorPanel = useRef<HTMLDivElement>(null);
  const [activePpf, setActivePpf] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [condition, setCondition] = useState<Condition | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const recommendation = useMemo(
    () => (goal && usage && condition ? recommendationFor(goal, usage, condition) : null),
    [goal, usage, condition],
  );

  const recommendationUrl = useMemo(() => {
    if (!recommendation || !goal || !usage || !condition) return WHATSAPP;
    const message = `Olá, fiz o recomendador do site da Brilhar. Minha prioridade é ${goal}, uso o carro principalmente em situação de ${usage} e o estado informado foi ${condition}. A recomendação foi ${recommendation.title}. Gostaria de confirmar a melhor opção e solicitar um orçamento.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [recommendation, goal, usage, condition]);

  const recommenderStep = !goal ? 1 : !usage ? 2 : !condition ? 3 : 4;
  const previousStep = useRef(recommenderStep);

  useEffect(() => {
    // Content stays visible without JavaScript or if observation is unavailable.
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!motion.matches) entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      const targets = element.matches("section") ? element.children : [element];
      for (const target of targets) {
        target.classList.add("reveal-item");
        reveal.observe(target);
      }
    });
    const band = ticker.current;
    const visibility = new IntersectionObserver(([entry]) => {
      if (band) band.dataset.visible = String(entry.isIntersecting);
    });
    if (band) visibility.observe(band);
    return () => { reveal.disconnect(); visibility.disconnect(); };
  }, []);

  useEffect(() => {
    if (previousStep.current !== recommenderStep) {
      selectorPanel.current?.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
      previousStep.current = recommenderStep;
    }
  }, [recommenderStep]);

  const resetRecommender = () => {
    setGoal(null);
    setUsage(null);
    setCondition(null);
  };

  return (
    <main>
      <ImmersiveFullscreenNav whatsapp={WHATSAPP} />

      <section
        className="hero"
        id="inicio"
      >
        <div className="hero-vehicle" aria-hidden="true">
          <img src="/media/trabalhos/hero-veiculo-brilhar.webp" alt="" fetchPriority="high" decoding="async" />
        </div>
        <div className="hero-content">

          <h1 aria-label="Seu carro. Bem cuidado.">
            <span className="hero-line-mask"><span className="hero-title-line"><AnimatedText text="SEU CARRO." animationType="letters" /></span></span>
            <span className="hero-line-mask"><span className="hero-title-line outline-word"><AnimatedText text="BEM CUIDADO." animationType="letters" delay={.15} /></span></span>
          </h1>
          <p className="hero-location">Estética automotiva em Rondonópolis</p>
          <p className="hero-copy">
            Proteção, acabamento e atenção aos detalhes para carros de todos os estilos — do seu companheiro de rotina ao seu projeto especial.
          </p>
          <div className="hero-actions">
            <LiquidMetalButton
              className="button button-primary"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
            >
              Quero cuidar do meu carro <Arrow />
            </LiquidMetalButton>
            <a className="text-link" href="#servicos">
              Conhecer os serviços <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span>PROTEÇÃO + ESTÉTICA</span>
          <p>Do carro de todo dia<br />ao seu projeto especial.</p>
        </div>
        <div className="hero-bottom-line">
          <span>PPF / POLIMENTO / HIGIENIZAÇÃO</span>
          <a href="#servicos">Explore o cuidado <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a>
        </div>
      </section>

      <div ref={ticker} className="ticker" data-paused={tickerPaused} data-visible="false" aria-label="Serviços em destaque">
        <div className="ticker-track" id="service-ticker">
          {[0, 1, 2].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy > 0}>
              <span>PPF</span><i>✦</i><span>POLIMENTO TÉCNICO</span><i>✦</i><span>LAVAGEM DETALHADA</span><i>✦</i><span>HIGIENIZAÇÃO</span><i>✦</i>
            </div>
          ))}
        </div>
        <button className="ticker-toggle" type="button" aria-controls="service-ticker" aria-pressed={tickerPaused} onClick={() => setTickerPaused((paused) => !paused)}>
          {tickerPaused ? "Retomar faixa" : "Pausar faixa"}
        </button>
      </div>

      <section className="intro" id="sobre" data-reveal>
        <div className="intro-copy">
          <div className="intro-meta">
            <p className="section-kicker">Cuidado sem rótulos</p>
            <span aria-hidden="true">Técnica · proteção · valor</span>
          </div>
          <h2 className="scroll-color-title"><AnimatedText text="Sofisticação está no cuidado," /><br /><em><AnimatedText text="não no preço do carro." /></em></h2>
          <div className="intro-footer">
            <span aria-hidden="true" />
            <p>
              Na Brilhar, cada veículo recebe um olhar técnico e um atendimento próximo. Você entende o que seu carro precisa, escolhe com segurança e acompanha um processo feito para preservar, proteger e valorizar.
            </p>
          </div>
        </div>
      </section>

      <section className="services" id="servicos">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker light">O que fazemos</p>
            <h2><AnimatedText text="Cuidado completo," /><br /><em><AnimatedText text="detalhe por detalhe." /></em></h2>
          </div>
          <a className="text-link light" href={WHATSAPP} target="_blank" rel="noreferrer">
            Ver todos os serviços <Arrow />
          </a>
        </div>

        <div className="service-stack" aria-label="Principais serviços">
          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.title}
              data-reveal
              style={{ "--card-index": index } as CSSProperties}
            >
              <div className="service-media">
                <ServiceLoop src={service.video} poster={service.image} />
                <span className="service-number">{service.number}</span>
                <a className="service-detail-cta" href={service.target}>Ver detalhes <Arrow /></a>
              </div>
              <div className="service-card-content">
                <p className="service-label">{service.label}</p>
                <h3><AnimatedText text={service.title} /></h3>
                <p>{service.text}</p>
                <div className="service-card-footer">
                  <span>{service.detail}</span>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label={`Pedir orçamento para ${service.title}`}>
                    Pedir orçamento <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ppf-feature" id="ppf" data-reveal>
        <figure className="ppf-application">
          <ServiceLoop src="/media/trabalhos/ppf-063.mp4" poster="/media/trabalhos/ppf-063.webp" />
          <figcaption className="ppf-application-caption">
            <p className="section-kicker light">PPF · Proteção de pintura</p>
            <h3><AnimatedText text="O cuidado está nos detalhes." /></h3>
            <p>Uma película transparente aplicada sobre a pintura, com cobertura definida conforme as necessidades do veículo.</p>
          </figcaption>
        </figure>
        <div className="ppf-content">
          <p className="section-kicker">Tecnologia que quase não aparece</p>
          <h2><AnimatedText text="Proteção para usar o carro " /><em><AnimatedText text="sem medo." /></em></h2>
          <p className="lead">
            O PPF é uma película transparente aplicada sobre a pintura. Ele ajuda a absorver agressões leves do dia a dia e preserva o acabamento original sem mudar a personalidade do veículo.
          </p>
          <div className="benefit-list">
            {ppfBenefits.map((benefit, index) => (
              <div className={activePpf === index ? "active" : ""} key={benefit.title}>
                <button type="button" onClick={() => setActivePpf(index)} aria-expanded={activePpf === index}>
                  <span>{benefit.number}</span>
                  <strong>{benefit.title}</strong>
                  <i aria-hidden="true">+</i>
                </button>
                <div className="benefit-answer" aria-hidden={activePpf !== index}><p>{benefit.text}</p></div>
              </div>
            ))}
          </div>
          <LiquidMetalButton className="button button-dark" href={WHATSAPP} target="_blank" rel="noreferrer">
            Conversar sobre PPF <Arrow />
          </LiquidMetalButton>
        </div>
      </section>

      <section className="other-services" id="demais-servicos">
        <div className="section-heading dark-text" data-reveal>
          <div>
            <p className="section-kicker">Além do PPF</p>
            <h2><AnimatedText text="Seu carro inteiro" /><br /><em><AnimatedText text="merece atenção." /></em></h2>
          </div>
          <p>Serviços escolhidos conforme o estado do veículo, sua rotina e o resultado que você deseja.</p>
        </div>
        <div className="notched-services">
          {otherServices.map((service) => (
            <NotchedProjectCard
              key={service.title}
              title={service.title}
              description={service.text}
              image={service.image}
              video={service.video}
              tags={service.benefits.split(" · ")}
              href={WHATSAPP}
              accent="#22d5c8"
            />
          ))}
        </div>
      </section>

      <section className="selector-section" aria-labelledby="selector-title" data-reveal>
        <div>
          <p className="section-kicker light">Por onde começar?</p>
          <h2 id="selector-title"><AnimatedText text="Qual cuidado combina com seu momento?" /></h2>
          <p>Responda três perguntas rápidas. A recomendação é um ponto de partida — a avaliação do veículo define o serviço ideal.</p>
          <div className="selector-progress" aria-label={`Etapa ${Math.min(recommenderStep, 3)} de 3`}>
            {[1, 2, 3].map((step) => <span className={recommenderStep >= step ? "active" : ""} key={step} />)}
          </div>
        </div>
        <div className="selector-panel" ref={selectorPanel}>
          {recommenderStep === 1 && (
            <div className="question-card" key="goal">
              <p>01 · Sua prioridade</p>
              <h3 tabIndex={-1}><AnimatedText text="O que você quer melhorar primeiro?" /></h3>
              <div className="choice-grid">
                <button onClick={() => setGoal("proteger")}>Proteger a pintura<span>Riscos e impactos leves</span></button>
                <button onClick={() => setGoal("brilho")}>Recuperar o brilho<span>Marcas e profundidade</span></button>
                <button onClick={() => setGoal("interior")}>Renovar o interior<span>Limpeza e conforto</span></button>
              </div>
            </div>
          )}
          {recommenderStep === 2 && (
            <div className="question-card" key="usage">
              <p>02 · Sua rotina</p>
              <h3 tabIndex={-1}><AnimatedText text="Como o veículo é mais utilizado?" /></h3>
              <div className="choice-grid">
                <button onClick={() => setUsage("dia-a-dia")}>Dia a dia<span>Trânsito e uso urbano</span></button>
                <button onClick={() => setUsage("estrada")}>Estrada<span>Viagens e maior exposição</span></button>
                <button onClick={() => setUsage("especial")}>Projeto especial<span>Preservação e acabamento</span></button>
              </div>
              <button className="selector-back" onClick={() => setGoal(null)}>← Voltar</button>
            </div>
          )}
          {recommenderStep === 3 && (
            <div className="question-card" key="condition">
              <p>03 · Estado atual</p>
              <h3 tabIndex={-1}><AnimatedText text="Como está o acabamento hoje?" /></h3>
              <div className="choice-grid">
                <button onClick={() => setCondition("novo")}>Bem conservado<span>Quero preservar</span></button>
                <button onClick={() => setCondition("marcas")}>Com marcas leves<span>Riscos e perda de brilho</span></button>
                <button onClick={() => setCondition("intenso")}>Uso intenso<span>Precisa de cuidado completo</span></button>
              </div>
              <button className="selector-back" onClick={() => setUsage(null)}>← Voltar</button>
            </div>
          )}
          {recommenderStep === 4 && recommendation && (
            <div className="recommendation" aria-live="polite" key={recommendation.title}>
              <p>Nossa recomendação inicial</p>
              <h3 tabIndex={-1}><AnimatedText text={recommendation.title} /></h3>
              <p>{recommendation.text}</p>
              <div className="recommendation-actions">
                <a href={recommendationUrl} target="_blank" rel="noreferrer">Confirmar com a equipe <Arrow /></a>
                <button type="button" onClick={resetRecommender}>Refazer escolhas</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="process" data-reveal>
        <div className="process-heading">
          <p className="section-kicker">Do primeiro contato à entrega</p>
          <h2><AnimatedText text="Simples para você." /><br /><em><AnimatedText text="Preciso no cuidado." /></em></h2>
        </div>
        <div className="process-steps">
          <div className="process-line" aria-hidden="true"><span /></div>
          <article style={{ "--step-delay": "0ms" } as CSSProperties}><span>01</span><div><h3><AnimatedText text="Conversa e avaliação" /></h3><p>Entendemos sua rotina, sua prioridade e o estado atual do veículo.</p></div></article>
          <article style={{ "--step-delay": "140ms" } as CSSProperties}><span>02</span><div><h3><AnimatedText text="Plano sob medida" /></h3><p>Explicamos as opções e indicamos somente o que faz sentido para o resultado esperado.</p></div></article>
          <article style={{ "--step-delay": "280ms" } as CSSProperties}><span>03</span><div><h3><AnimatedText text="Execução e orientação" /></h3><p>Realizamos o serviço com cuidado e entregamos as recomendações de manutenção.</p></div></article>
        </div>
      </section>

      <section className="brand-quote" data-reveal>
        <div className="quote-image" />
        <blockquote>
          <p>
            <span className="quote-line"><AnimatedText text="“A confiança que você precisa." /></span>
            <span className="quote-line"><AnimatedText text="O cuidado que seu carro merece.”" /></span>
          </p>
          <footer>Brilhar Estética Automotiva</footer>
        </blockquote>
      </section>

      <section className="faq" id="duvidas" data-reveal>
        <div>
          <p className="section-kicker">Dúvidas frequentes</p>
          <h2><AnimatedText text="Antes de decidir," /><br /><em><AnimatedText text="entenda o cuidado." /></em></h2>
        </div>
        <div className="faq-list">
          {faqItems.map(([question, answer], index) => (
            <article className={openFaq === index ? "open" : ""} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                {question}<span aria-hidden="true">+</span>
              </button>
              <div className="faq-answer" aria-hidden={openFaq !== index}><div><p>{answer}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contato" data-reveal>
        <div className="contact-copy">
          <p className="section-kicker light">Seu carro pode ser o próximo</p>
          <h2><AnimatedText text="Vamos fazer" /><br /><AnimatedText text="seu carro " /><em><AnimatedText text="brilhar?" /></em></h2>
          <p>Conte para a equipe o modelo do veículo e o cuidado que você procura. A Brilhar ajuda você a escolher o melhor caminho.</p>
          <LiquidMetalButton className="button button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Solicitar orçamento no WhatsApp <Arrow /></LiquidMetalButton>
        </div>
        <div className="contact-details">
          <p>Atendimento</p>
          <a href="tel:+5566996919667">+55 66 99691-9667 <Arrow /></a>
          <a href="mailto:brilharfinanceiro@gmail.com">brilharfinanceiro@gmail.com <Arrow /></a>
          <a href="https://www.instagram.com/brilhar.estetica.automotiva/" target="_blank" rel="noreferrer">@brilhar.estetica.automotiva <Arrow /></a>
          <span>Rondonópolis — MT</span>
        </div>
      </section>

      <CinematicFooter whatsapp={WHATSAPP} />

      <LiquidMetalButton className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Falar com a Brilhar no WhatsApp">
        <span>WhatsApp</span> <Arrow />
        <svg className="whatsapp-mark" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4ZM12.1 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.1c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" /></svg>
      </LiquidMetalButton>
    </main>
  );
}
