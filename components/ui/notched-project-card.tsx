import { ServiceLoop } from "./service-loop";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";
import AnimatedText from "@/components/ui/animated-text";
import type { CSSProperties } from "react";

type NotchedProjectCardProps = {
  href: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags?: string[];
  accent?: string;
};

// Local adaptation of the public Notched Project Card usage and visual reference.
export function NotchedProjectCard({ href, title, description, image, video, tags = [], accent = "#22d5c8" }: NotchedProjectCardProps) {
  return (
    <article className="notched-card" style={{ "--card-accent": accent } as CSSProperties}>
      <a className="notched-card-link" href={href} target="_blank" rel="noreferrer" aria-label={`Consultar ${title} no WhatsApp`}>
        <div className="notched-card-cover">
          <div className={`notched-card-image${image ? "" : " notched-card-brand"}`}>{video && image ? <ServiceLoop src={video} poster={image} /> : image ? <img src={image} alt="" loading="lazy" decoding="async" /> : <img src="/media/logo-brilhar.png" alt="" loading="lazy" />}</div>
          <span className="notched-card-arrow" aria-hidden="true"><ArrowUpRightIcon /></span>
        </div>
        <div className="notched-card-copy">
          <h3><AnimatedText text={title} /></h3>
          <p>{description}</p>
          <ul className="notched-card-tags" aria-label="Benefícios">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          <span className="notched-card-action">Consultar serviço <ArrowUpRightIcon size={18} /></span>
        </div>
      </a>
    </article>
  );
}
