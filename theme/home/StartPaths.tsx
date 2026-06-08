import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './StartPaths.css';

export default function StartPaths() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).startPaths;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-start-paths">
        {t.paths.map((path, i) => (
          <a
            key={path.href}
            className="rp-start-paths__item rp-landing-card"
            href={`/${lang}${path.href}`}
            style={{ '--stagger': i } as React.CSSProperties}
          >
            <span className="rp-start-paths__label">{path.title}</span>
            <span className="rp-start-paths__desc">{path.desc}</span>
            <span className="rp-start-paths__action">{t.action}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
