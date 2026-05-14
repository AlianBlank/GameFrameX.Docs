import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './CallToAction.css';

export default function CallToAction() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).cta;

  return (
    <div
      ref={ref}
      className={`rp-cta-outer ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <section className="rp-cta">
        <h2 className="rp-cta__title">{t.title}</h2>
        <p className="rp-cta__subtitle">{t.subtitle}</p>
        <div className="rp-cta__actions">
          <a
            className="rp-cta__btn rp-cta__btn--primary"
            href={`/${lang}/client/unity/`}
          >
            {t.primary}
          </a>
          <a
            className="rp-cta__btn rp-cta__btn--secondary"
            href="https://github.com/GameFrameX/gameframex"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.secondary}
          </a>
        </div>
      </section>
    </div>
  );
}
