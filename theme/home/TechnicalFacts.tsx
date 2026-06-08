import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './TechnicalFacts.css';

function resolveHref(lang: string, href: string) {
  return href.startsWith('/') ? `/${lang}${href}` : href;
}

function LinkList({
  items,
  lang,
}: {
  items: { title: string; desc: string; href: string }[];
  lang: string;
}) {
  return (
    <div className="rp-tech-facts__links">
      {items.map(item => {
        const isExternal = !item.href.startsWith('/');
        return (
          <a
            key={item.href}
            className="rp-tech-facts__link"
            href={resolveHref(lang, item.href)}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
          >
            <span className="rp-tech-facts__link-title">{item.title}</span>
            <span className="rp-tech-facts__link-desc">{item.desc}</span>
          </a>
        );
      })}
    </div>
  );
}

export default function TechnicalFacts() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).technicalFacts;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-tech-facts">
        <div className="rp-tech-facts__panel rp-landing-card">
          <h3 className="rp-tech-facts__title">{t.prerequisitesTitle}</h3>
          <ul className="rp-tech-facts__checks">
            {t.prerequisites.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rp-tech-facts__panel rp-tech-facts__panel--wide rp-landing-card">
          <h3 className="rp-tech-facts__title">{t.repositoriesTitle}</h3>
          <LinkList items={t.repositories} lang={lang} />
        </div>
        <div className="rp-tech-facts__panel rp-tech-facts__panel--wide rp-landing-card">
          <h3 className="rp-tech-facts__title">{t.nextTitle}</h3>
          <LinkList items={t.next} lang={lang} />
        </div>
      </div>
    </section>
  );
}
