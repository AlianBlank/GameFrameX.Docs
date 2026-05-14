import { useState, useCallback } from 'react';
import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './QuickStart.css';

function TerminalPanel({
  label,
  lines,
  copyLabel,
  copiedLabel,
}: {
  label: string;
  lines: { text: string; isComment: boolean }[];
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = lines.map(l => l.text).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [lines]);

  return (
    <div className="rp-quickstart__panel">
      <div className="rp-quickstart__header">
        <span className="rp-quickstart__dots">
          <i /><i /><i />
        </span>
        <span className="rp-quickstart__label">{label}</span>
        <button
          className={`rp-quickstart__copy${copied ? ' rp-quickstart__copy--done' : ''}`}
          onClick={handleCopy}
          type="button"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="rp-quickstart__code">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="rp-quickstart__line">
              {line.isComment ? (
                <span className="rp-quickstart__comment">{line.text || ' '}</span>
              ) : (
                <span className="rp-quickstart__cmd">{line.text || ' '}</span>
              )}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default function QuickStart() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).quickStart;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-quickstart">
        <TerminalPanel label={t.sourceLabel} lines={t.sourceLines} copyLabel={t.copy} copiedLabel={t.copied} />
        <TerminalPanel label={t.dockerLabel} lines={t.dockerLines} copyLabel={t.copy} copiedLabel={t.copied} />
      </div>
    </section>
  );
}
