import { useLang } from '@rspress/core/runtime';
import { useEffect, useState } from 'react';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './UseCases.css';

function AnimatedNumber({ value, trigger }: { value: string; trigger: boolean }) {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger || isNaN(numericPart)) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numericPart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, numericPart]);

  if (isNaN(numericPart)) {
    return <>{value}</>;
  }

  return <>{display}{suffix}</>;
}

export default function UseCases() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).useCases;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <div className="rp-usecases">
        {t.cases.map((useCase, i) => (
          <div
            key={useCase.title}
            className="rp-usecases__card rp-landing-card"
            style={{ '--stagger': i } as React.CSSProperties}
          >
            <span className="rp-usecases__icon">{useCase.icon}</span>
            <h3 className="rp-usecases__title">{useCase.title}</h3>
            <ul className="rp-usecases__bullets">
              {useCase.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rp-usecases__metrics">
        {t.metrics.map((metric) => (
          <div key={metric.label} className="rp-usecases__metric">
            <span className="rp-usecases__metric-value">
              <AnimatedNumber value={metric.value} trigger={isVisible} />
            </span>
            <span className="rp-usecases__metric-label">{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
