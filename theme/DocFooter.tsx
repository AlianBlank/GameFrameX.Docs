import { EditLink, LastUpdated, PrevNextPage } from '@rspress/core/theme';
import { useLang } from '@rspress/core/runtime';
import { useState } from 'react';
import './DocFooter.css';

const i18n: Record<string, {
  question: string;
  yes: string;
  no: string;
  thanks: string;
  sponsor: string;
  wechat: string;
  alipay: string;
}> = {
  en: {
    question: 'Was this page helpful?',
    yes: 'Yes',
    no: 'No',
    thanks: 'Thanks for your feedback!',
    sponsor: 'Sponsor',
    wechat: 'WeChat',
    alipay: 'Alipay',
  },
  'zh-CN': {
    question: '此页面对你有帮助吗？',
    yes: '有帮助',
    no: '没帮助',
    thanks: '感谢你的反馈！',
    sponsor: '赞赏支持',
    wechat: '微信',
    alipay: '支付宝',
  },
  'zh-TW': {
    question: '此頁面對你有幫助嗎？',
    yes: '有幫助',
    no: '沒幫助',
    thanks: '感謝你的回饋！',
    sponsor: '讚賞支持',
    wechat: '微信',
    alipay: '支付寶',
  },
  ja: {
    question: 'このページは役に立ちましたか？',
    yes: 'はい',
    no: 'いいえ',
    thanks: 'フィードバックありがとうございます！',
    sponsor: '寄付する',
    wechat: 'WeChat',
    alipay: 'Alipay',
  },
  ko: {
    question: '이 페이지가 도움이 되었나요?',
    yes: '네',
    no: '아니요',
    thanks: '피드백 감사합니다!',
    sponsor: '후원하기',
    wechat: 'WeChat',
    alipay: 'Alipay',
  },
};

function PageFeedback() {
  const lang = useLang();
  const t = i18n[lang] || i18n.en;
  const [voted, setVoted] = useState(false);
  const [isPositive, setIsPositive] = useState(false);

  if (voted) {
    return (
      <div className="rp-feedback rp-feedback--voted">
        <span className="rp-feedback__icon">{isPositive ? '🎉' : '💬'}</span>
        <span className="rp-feedback__thanks">{t.thanks}</span>
      </div>
    );
  }

  return (
    <div className="rp-feedback">
      <hr className="rp-feedback__divider" />
      <div className="rp-feedback__content">
        <span className="rp-feedback__question">{t.question}</span>
        <div className="rp-feedback__buttons">
          <button
            className="rp-feedback__btn rp-feedback__btn--yes"
            onClick={() => { setIsPositive(true); setVoted(true); }}
            title={t.yes}
          >
            👍 {t.yes}
          </button>
          <button
            className="rp-feedback__btn rp-feedback__btn--no"
            onClick={() => { setIsPositive(false); setVoted(true); }}
            title={t.no}
          >
            👎 {t.no}
          </button>
        </div>
      </div>
    </div>
  );
}

function Sponsor() {
  const lang = useLang();
  const t = i18n[lang] || i18n.en;
  const [showQr, setShowQr] = useState(true);

  return (
    <div className="rp-sponsor">
      <div className="rp-sponsor__header">
        <span className="rp-sponsor__label">☕ {t.sponsor}</span>
        <button
          className="rp-sponsor__toggle"
          onClick={() => setShowQr(!showQr)}
        >
          {showQr ? '▲' : '▼'}
        </button>
      </div>
      {showQr && (
        <div className="rp-sponsor__body">
          <div className="rp-sponsor__qr-group">
            <div className="rp-sponsor__qr-item">
              <img className="rp-sponsor__qr" src="/images/wechat.jpg" alt={t.wechat} />
              <span className="rp-sponsor__hint">{t.wechat}</span>
            </div>
            <div className="rp-sponsor__qr-item">
              <img className="rp-sponsor__qr" src="/images/alipay.jpg" alt={t.alipay} />
              <span className="rp-sponsor__hint">{t.alipay}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DocFooter() {
  return (
    <footer className="rp-doc-footer">
      <PageFeedback />
      <Sponsor />
      <div className="rp-doc-footer__edit">
        <EditLink />
        <LastUpdated />
      </div>
      <div className="rp-doc-footer__divider" />
      <PrevNextPage />
    </footer>
  );
}
