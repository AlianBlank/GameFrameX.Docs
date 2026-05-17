import { useLang } from '@rspress/core/runtime';
import { landingI18n } from './i18n';
import './HeroSection.css';

export default function HeroSection() {
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).hero;

  return (
    <section className="rp-hero">
      <div className="rp-hero__name">{t.name}</div>
      <p className="rp-hero__text">{t.text}</p>
      <p className="rp-hero__tagline">{t.tagline}</p>
      <div className="rp-hero__actions">
        {t.actions.map((action) => (
          <a
            key={action.link}
            href={action.link}
            className={`rp-hero__btn rp-hero__btn--${action.theme}`}
          >
            {action.text}
          </a>
        ))}
      </div>
    </section>
  );
}
