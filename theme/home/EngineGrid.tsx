import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './EngineGrid.css';

const engineLogos: Record<string, string> = {
  Unity:
    'https://cdn.simpleicons.org/unity/FFFFFF',
  Godot:
    'https://cdn.simpleicons.org/godotengine/478CBF',
  LayaBox:
    '/images/engines/layabox.png',
  'Cocos Creator':
    'https://cdn.simpleicons.org/cocos/FFFFFF',
};

export default function EngineGrid() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).engineGrid;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-engines">
        {t.engines.map((engine, i) => (
          <div
            key={engine.name}
            className="rp-engines__card rp-landing-card"
            style={{ '--stagger': i } as React.CSSProperties}
          >
            <img
              className="rp-engines__logo"
              src={engineLogos[engine.name]}
              alt={engine.name}
              loading="lazy"
            />
            <h3 className="rp-engines__name">{engine.name}</h3>
            <p className="rp-engines__desc">{engine.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
