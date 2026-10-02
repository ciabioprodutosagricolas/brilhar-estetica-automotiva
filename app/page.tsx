"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "5566996919667";
const WHATSAPP =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim pelo site da Brilhar e gostaria de um orçamento.")}`;

const services = [
  {
    number: "01",
    title: "PPF",
    label: "Proteção de pintura",
    text: "Uma camada praticamente invisível para ajudar a preservar a pintura contra riscos, pequenos impactos e marcas do uso diário.",
    image: "/media/ppf-application.webp",
    detail: "Proteção de alto impacto",
    target: "#ppf",
  },
  {
    number: "02",
    title: "Polimento técnico",
    label: "Correção e acabamento",
    text: "Correção criteriosa do verniz para reduzir marcas, recuperar profundidade e revelar novamente o brilho do veículo.",
    image: "/media/polimento.webp",
    detail: "Recuperação de profundidade",
    target: "#demais-servicos",
  },
  {
    number: "03",
    title: "Lavagem detalhada",
    label: "Cuidado recorrente",
    text: "Limpeza cuidadosa, com técnica e produtos adequados para preservar o acabamento e os materiais do seu carro.",
    image: "/media/lavagem.jpg",
    detail: "Manutenção com técnica",
    target: "#demais-servicos",
  },
];

const ppfBenefits = [
  {
    number: "01",
    title: "Barreira física",
    text: "Contra riscos leves, pequenos impactos e detritos de estrada.",
    visual: "Impactos do uso diário",
  },
  {
    number: "02",
    title: "Acabamento discreto",
    text: "Para manter cor, brilho e linhas originais do carro.",
    visual: "Transparência e brilho",
  },
  {
    number: "03",
    title: "Proteção sob medida",
    text: "Em áreas de maior impacto ou com cobertura completa.",
    visual: "Cobertura personalizada",
  },
];

const otherServices = [
  {
    title: "Vitrificação",
    text: "Proteção química e brilho intenso com manutenção mais simples.",
    duration: "4 a 8 horas",
    benefits: "Brilho profundo · repelência · limpeza facilitada",
    image: "/media/vitrificacao.webp",
  },
  {
    title: "Higienização",
    text: "Limpeza profunda de bancos, carpetes, forros e superfícies internas.",
    duration: "6 a 10 horas",
    benefits: "Conforto · limpeza profunda · redução de odores",
    image: "/media/lavagem.jpg",
  },
  {
    title: "Correção de pintura",
    text: "Tratamento técnico para recuperar uniformidade e acabamento.",
    duration: "1 a 3 dias",
    benefits: "Menos marcas · mais reflexo · acabamento uniforme",
    image: "/media/polimento.webp",
  },
  {
    title: "Polimento de vidros",
    text: "Mais transparência e remoção de marcas que prejudicam a aparência.",
    duration: "2 a 4 horas",
    benefits: "Visibilidade · transparência · acabamento limpo",
    image: "/media/polimento.webp",
  },
  {
    title: "Oxi-sanitização",
    text: "Processo complementar para renovar a sensação de limpeza interna.",
    duration: "1 a 2 horas",
    benefits: "Ar renovado · cuidado interno · maior conforto",
    image: "/media/lavagem.jpg",
  },
  {
    title: "Nebulização",
    text: "Aplicação uniforme de produto em áreas de difícil alcance do interior.",
    duration: "1 a 2 horas",
    benefits: "Alcance uniforme · praticidade · cuidado complementar",
    image: "/media/ppf-application.webp",
  },
];

const faqItems = [
  [
    "PPF é indicado apenas para carros de luxo?",
    "Não. A proteção faz sentido para qualquer proprietário que queira preservar a pintura. A cobertura pode ser adaptada ao uso do carro e ao orçamento disponível.",
  ],
  [
    "Qual a diferença entre PPF e vitrificação?",
    "O PPF cria uma barreira física contra agressões leves. A vitrificação é uma proteção química que realça o brilho e facilita a limpeza, mas não substitui a resistência física da película.",
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
  return <span aria-hidden="true">↗</span>;
}

function magneticMove(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
  const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
  event.currentTarget.style.setProperty("--mag-x", `${x}px`);
  event.currentTarget.style.setProperty("--mag-y", `${y}px`);
}

function magneticLeave(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--mag-x", "0px");
  event.currentTarget.style.setProperty("--mag-y", "0px");
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
      title: "PPF frontal + vitrificação",
      text: "Proteção física nas áreas mais expostas, acompanhada de brilho e manutenção mais simples no restante do veículo.",
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
      title: "Polimento técnico + vitrificação",
      text: "Correção criteriosa para recuperar profundidade, seguida de proteção química para preservar o resultado.",
    };
  }

  return {
    title: "Vitrificação",
    text: "Proteção química para valorizar o brilho do veículo novo e facilitar os cuidados da rotina.",
  };
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compare, setCompare] = useState(58);
  const [activePpf, setActivePpf] = useState(0);
  const [activeOther, setActiveOther] = useState<number | null>(null);
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

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    let previousY = window.scrollY;
    let frame = 0;
    const updateScrollEffects = () => {
      frame = 0;
      const currentY = window.scrollY;
      const viewport = window.innerHeight;
      const hero = document.querySelector<HTMLElement>(".hero");
      const ticker = document.querySelector<HTMLElement>(".ticker");
      const intro = document.querySelector<HTMLElement>(".intro");
      const process = document.querySelector<HTMLElement>(".process");

      if (hero) {
        const progress = Math.min(Math.max(currentY / Math.max(hero.offsetHeight, 1), 0), 1);
        hero.style.setProperty("--hero-scroll", progress.toFixed(3));
      }

      if (ticker && Math.abs(currentY - previousY) > 2) {
        ticker.dataset.direction = currentY >= previousY ? "forward" : "reverse";
      }

      if (intro) {
        const rect = intro.getBoundingClientRect();
        const progress = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height * 0.55), 0), 1);
        intro.style.setProperty("--intro-progress", progress.toFixed(3));
        intro.style.setProperty("--intro-fill", `${Math.round(progress * 118)}%`);
      }

      if (process) {
        const rect = process.getBoundingClientRect();
        const progress = Math.min(Math.max((viewport * 0.78 - rect.top) / Math.max(rect.height * 0.72, 1), 0), 1);
        process.style.setProperty("--process-progress", progress.toFixed(3));
      }

      previousY = currentY;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const recommenderStep = !goal ? 1 : !usage ? 2 : !condition ? 3 : 4;

  const resetRecommender = () => {
    setGoal(null);
    setUsage(null);
    setCondition(null);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Brilhar — início">
          <img src="/media/logo-brilhar.png" alt="Brilhar Centro de Estética Automotiva" />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#ppf">PPF</a>
          <a href="#sobre">A Brilhar</a>
          <a href="#contato">Contato</a>
        </nav>

        <a
          className="header-cta magnetic"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          onPointerMove={magneticMove}
          onPointerLeave={magneticLeave}
        >
          Solicitar orçamento <Arrow />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#ppf" onClick={() => setMenuOpen(false)}>PPF</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>A Brilhar</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
        </div>
      </header>

      <section
        className="hero"
        id="inicio"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
          event.currentTarget.style.setProperty("--my", `${y * 100}%`);
          event.currentTarget.style.setProperty("--px", (x - 0.5).toFixed(3));
          event.currentTarget.style.setProperty("--py", (y - 0.5).toFixed(3));
        }}
      >
        <div className="hero-image" role="img" aria-label="Polimento profissional de um automóvel" />
        <div className="hero-reflection" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-orb" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Estética automotiva em Rondonópolis</p>
          <h1 aria-label="Seu carro. Bem cuidado.">
            <span className="hero-line-mask"><span className="hero-title-line">SEU CARRO.</span></span>
            <span className="hero-line-mask"><span className="hero-title-line outline-word">BEM CUIDADO.</span></span>
          </h1>
          <p className="hero-copy">
            Proteção, acabamento e atenção aos detalhes para carros de todos os estilos — do seu companheiro de rotina ao seu projeto especial.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary magnetic"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              onPointerMove={magneticMove}
              onPointerLeave={magneticLeave}
            >
              Quero cuidar do meu carro <Arrow />
            </a>
            <a className="text-link magnetic" href="#servicos" onPointerMove={magneticMove} onPointerLeave={magneticLeave}>
              Conhecer os serviços <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span>PROTEÇÃO + ESTÉTICA</span>
          <p>Do carro de todo dia<br />ao seu projeto especial.</p>
        </div>
        <div className="hero-scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <div className="ticker" data-direction="forward" aria-label="Serviços em destaque">
        <div className="ticker-track">
          {[0, 1, 2].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy > 0}>
              <span>PPF</span><i>✦</i><span>POLIMENTO TÉCNICO</span><i>✦</i><span>VITRIFICAÇÃO</span><i>✦</i><span>HIGIENIZAÇÃO</span><i>✦</i>
            </div>
          ))}
        </div>
      </div>

      <section className="intro" id="sobre" data-reveal>
        <div className="intro-copy">
          <div className="intro-meta">
            <p className="section-kicker">Cuidado sem rótulos</p>
            <span aria-hidden="true">Técnica · proteção · valor</span>
          </div>
          <h2 className="scroll-color-title">Sofisticação está no cuidado,<br /><em>não no preço do carro.</em></h2>
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
            <h2>Cuidado completo,<br /><em>detalhe por detalhe.</em></h2>
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
                <img src={service.image} alt="" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                <span className="service-number">{service.number}</span>
                <a className="service-detail-cta" href={service.target}>Ver detalhes <Arrow /></a>
              </div>
              <div className="service-card-content">
                <p className="service-label">{service.label}</p>
                <h3>{service.title}</h3>
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
        <div className="ppf-visual" data-benefit={activePpf} style={{ "--compare": `${compare}%` } as CSSProperties}>
          <div className="compare-layer compare-before">
            <img src="/media/ppf-application.webp" alt="Pintura antes da proteção PPF" loading="lazy" decoding="async" />
            <span>SEM PROTEÇÃO</span>
          </div>
          <div className="compare-layer compare-after">
            <img src="/media/ppf-application.webp" alt="Pintura com proteção PPF" loading="lazy" decoding="async" />
            <span>COM PPF</span>
          </div>
          <div className="compare-line" aria-hidden="true"><span>↔</span></div>
          <input
            className="compare-range"
            type="range"
            min="5"
            max="95"
            value={compare}
            aria-label="Comparar pintura sem proteção e com PPF"
            onChange={(event) => setCompare(Number(event.target.value))}
          />
          <div className="ppf-visual-status" aria-live="polite">
            <small>Visual em destaque</small>
            <strong>{ppfBenefits[activePpf].visual}</strong>
          </div>
          <div className="ppf-stamp">
            <span>Proteção</span>
            <strong>PPF</strong>
            <small>Paint Protection Film</small>
          </div>
        </div>
        <div className="ppf-content">
          <p className="section-kicker">Tecnologia que quase não aparece</p>
          <h2>Proteção para usar o carro <em>sem medo.</em></h2>
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
                <div className="benefit-answer"><p>{benefit.text}</p></div>
              </div>
            ))}
          </div>
          <a className="button button-dark magnetic" href={WHATSAPP} target="_blank" rel="noreferrer" onPointerMove={magneticMove} onPointerLeave={magneticLeave}>
            Conversar sobre PPF <Arrow />
          </a>
        </div>
      </section>

      <section className="other-services" id="demais-servicos">
        <div className="section-heading dark-text" data-reveal>
          <div>
            <p className="section-kicker">Além do PPF</p>
            <h2>Seu carro inteiro<br /><em>merece atenção.</em></h2>
          </div>
          <p>Serviços escolhidos conforme o estado do veículo, sua rotina e o resultado que você deseja.</p>
        </div>
        <div className="compact-services">
          {otherServices.map((service, index) => (
            <article className={activeOther === index ? "active" : ""} key={service.title} data-reveal>
              <div className="compact-service-image">
                <img src={service.image} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="compact-service-head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <button
                  type="button"
                  aria-label={`${activeOther === index ? "Recolher" : "Expandir"} ${service.title}`}
                  aria-expanded={activeOther === index}
                  onClick={() => setActiveOther(activeOther === index ? null : index)}
                >
                  <i aria-hidden="true">+</i>
                </button>
              </div>
              <div className="compact-service-copy">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="compact-service-details">
                  <span><small>Duração estimada</small>{service.duration}</span>
                  <span><small>Benefícios</small>{service.benefits}</span>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">Consultar serviço <Arrow /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="selector-section" aria-labelledby="selector-title" data-reveal>
        <div>
          <p className="section-kicker light">Por onde começar?</p>
          <h2 id="selector-title">Qual cuidado combina com seu momento?</h2>
          <p>Responda três perguntas rápidas. A recomendação é um ponto de partida — a avaliação do veículo define o serviço ideal.</p>
          <div className="selector-progress" aria-label={`Etapa ${Math.min(recommenderStep, 3)} de 3`}>
            {[1, 2, 3].map((step) => <span className={recommenderStep >= step ? "active" : ""} key={step} />)}
          </div>
        </div>
        <div className="selector-panel">
          {recommenderStep === 1 && (
            <div className="question-card" key="goal">
              <p>01 · Sua prioridade</p>
              <h3>O que você quer melhorar primeiro?</h3>
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
              <h3>Como o veículo é mais utilizado?</h3>
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
              <h3>Como está o acabamento hoje?</h3>
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
              <h3>{recommendation.title}</h3>
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
          <h2>Simples para você.<br /><em>Preciso no cuidado.</em></h2>
        </div>
        <div className="process-steps">
          <div className="process-line" aria-hidden="true"><span /></div>
          <article style={{ "--step-delay": "0ms" } as CSSProperties}><span>01</span><div><h3>Conversa e avaliação</h3><p>Entendemos sua rotina, sua prioridade e o estado atual do veículo.</p></div></article>
          <article style={{ "--step-delay": "140ms" } as CSSProperties}><span>02</span><div><h3>Plano sob medida</h3><p>Explicamos as opções e indicamos somente o que faz sentido para o resultado esperado.</p></div></article>
          <article style={{ "--step-delay": "280ms" } as CSSProperties}><span>03</span><div><h3>Execução e orientação</h3><p>Realizamos o serviço com cuidado e entregamos as recomendações de manutenção.</p></div></article>
        </div>
      </section>

      <section className="brand-quote" data-reveal>
        <div className="quote-image" />
        <blockquote>
          <p>
            <span className="quote-line"><span>“A confiança que você precisa.</span></span>
            <span className="quote-line"><span>O cuidado que seu carro merece.”</span></span>
          </p>
          <footer>Brilhar Estética Automotiva</footer>
        </blockquote>
      </section>

      <section className="faq" id="duvidas" data-reveal>
        <div>
          <p className="section-kicker">Dúvidas frequentes</p>
          <h2>Antes de decidir,<br /><em>entenda o cuidado.</em></h2>
        </div>
        <div className="faq-list">
          {faqItems.map(([question, answer], index) => (
            <article className={openFaq === index ? "open" : ""} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                {question}<span aria-hidden="true">+</span>
              </button>
              <div className="faq-answer"><div><p>{answer}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contato" data-reveal>
        <div className="contact-reflection" aria-hidden="true" />
        <div className="contact-copy">
          <p className="section-kicker light">Seu carro pode ser o próximo</p>
          <h2>Vamos fazer<br />seu carro <em>brilhar?</em></h2>
          <p>Conte para a equipe o modelo do veículo e o cuidado que você procura. A Brilhar ajuda você a escolher o melhor caminho.</p>
          <a className="button button-primary magnetic" href={WHATSAPP} target="_blank" rel="noreferrer" onPointerMove={magneticMove} onPointerLeave={magneticLeave}>Solicitar orçamento no WhatsApp <Arrow /></a>
        </div>
        <div className="contact-details">
          <p>Atendimento</p>
          <a href="tel:+5566996919667">+55 66 99691-9667 <Arrow /></a>
          <a href="mailto:brilharfinanceiro@gmail.com">brilharfinanceiro@gmail.com <Arrow /></a>
          <a href="https://www.instagram.com/brilhar.estetica.automotiva/" target="_blank" rel="noreferrer">@brilhar.estetica.automotiva <Arrow /></a>
          <span>Rondonópolis — MT</span>
        </div>
      </section>

      <footer className="footer">
        <a className="footer-brand" href="#inicio">
          <img src="/media/logo-brilhar.png" alt="Brilhar Centro de Estética Automotiva" />
        </a>
        <div className="footer-nav">
          <a href="#servicos">Serviços</a>
          <a href="#ppf">PPF</a>
          <a href="#sobre">A Brilhar</a>
          <a href="#contato">Contato</a>
        </div>
        <p>© 2026 Brilhar Estética Automotiva</p>
      </footer>

      <a className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Falar com a Brilhar no WhatsApp">
        <span>WhatsApp</span> <Arrow />
      </a>
    </main>
  );
}
