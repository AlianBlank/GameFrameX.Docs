import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './Architecture.css';

export default function Architecture() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).architecture;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-arch">
        <div className="rp-arch__layer rp-landing-card" style={{ '--stagger': 0 } as React.CSSProperties}>
          <div className="rp-arch__layer-header">
            <span className="rp-arch__icon">🖥️</span>
            <span className="rp-arch__layer-title">{t.client}</span>
          </div>
          <div className="rp-arch__items">
            {t.clientItems.map((item) => (
              <span key={item} className="rp-arch__tag">{item}</span>
            ))}
          </div>
        </div>

        <div className="rp-arch__arrow">↕</div>

        <div className="rp-arch__layer rp-landing-card" style={{ '--stagger': 1 } as React.CSSProperties}>
          <div className="rp-arch__layer-header">
            <span className="rp-arch__icon">📡</span>
            <span className="rp-arch__layer-title">{t.network}</span>
          </div>
          <div className="rp-arch__items">
            {t.networkItems.map((item) => (
              <span key={item} className="rp-arch__tag">{item}</span>
            ))}
          </div>
        </div>

        <div className="rp-arch__arrow">↕</div>

        <div className="rp-arch__layer rp-landing-card" style={{ '--stagger': 2 } as React.CSSProperties}>
          <div className="rp-arch__layer-header">
            <span className="rp-arch__icon">⚙️</span>
            <span className="rp-arch__layer-title">{t.server}</span>
          </div>
          <div className="rp-arch__items">
            {t.serverItems.map((item) => (
              <span key={item} className="rp-arch__tag">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
