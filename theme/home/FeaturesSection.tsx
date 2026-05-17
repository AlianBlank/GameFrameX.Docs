import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './FeaturesSection.css';

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const features = (landingI18n[lang] || landingI18n.en).features;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <div className="rp-features">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="rp-features__card rp-landing-card"
            style={{ '--stagger': i } as React.CSSProperties}
          >
            <span className="rp-features__icon">{feature.icon}</span>
            <h3 className="rp-features__title">{feature.title}</h3>
            <p className="rp-features__detail">{feature.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
