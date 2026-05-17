import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './ProgressiveArchitecture.css';

export default function ProgressiveArchitecture() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).progressiveArchitecture;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-progarch">
        {t.phases.map((phase, i) => (
          <div key={phase.title} className="rp-progarch__phase-wrapper">
            <div
              className="rp-progarch__phase rp-landing-card"
              style={{ '--stagger': i } as React.CSSProperties}
            >
              <span className="rp-progarch__audience">{phase.audience}</span>
              <h3 className="rp-progarch__phase-title">{phase.title}</h3>
              <div className="rp-progarch__capabilities">
                {phase.capabilities.map((cap) => (
                  <span key={cap} className="rp-progarch__tag">{cap}</span>
                ))}
              </div>
            </div>
            {i < t.phases.length - 1 && (
              <div className="rp-progarch__arrow">→</div>
            )}
          </div>
        ))}
      </div>
      <div className="rp-progarch__baseline">
        <span className="rp-progarch__baseline-text">{t.baseline}</span>
      </div>
    </section>
  );
}
