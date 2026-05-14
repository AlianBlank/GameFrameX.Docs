import { useLang } from '@rspress/core/runtime';
import { useScrollReveal } from './useScrollReveal';
import { landingI18n } from './i18n';
import './CodeDemo.css';

// From: GameFrameX.Unity/Assets/Hotfix/Proto/Bag_100.cs
const protocolLines = [
  '// Proto/Bag_100.cs (shared)',
  '[ProtoContract]',
  '[MessageTypeHandler(((100) << 16) + 10)]',
  'public sealed class ReqBagInfo',
  '    : MessageObject, IRequestMessage',
  '{',
  '}',
  '',
  '[ProtoContract]',
  '[MessageTypeHandler(((100) << 16) + 11)]',
  'public sealed class RespBagInfo',
  '    : MessageObject, IResponseMessage',
  '{',
  '    [ProtoMember(1)]',
  '    public Dictionary<int, long> ItemDic { get; set; }',
  '',
  '    [ProtoMember(2047)]',
  '    public int ErrorCode { get; set; }',
  '}',
];

// From: GameFrameX.Unity/Assets/Hotfix/Manager/BagManager.cs
const clientLines = [
  '// Manager/BagManager.cs',
  'public async UniTask RequestGetBagInfo()',
  '{',
  '    var respBagInfo = await GameApp.Network',
  '        .GetNetworkChannel("network")',
  '        .Call<RespBagInfo>(new ReqBagInfo());',
  '',
  '    if (respBagInfo.ErrorCode != default) return;',
  '',
  '    foreach (var item in respBagInfo.ItemDic)',
  '        _itemDic[item.Key] = new BagItem',
  '        { ItemId = item.Key, Count = item.Value };',
  '}',
];

// From: GameFrameX.Server/GameFrameX.Hotfix/Logic/Player/Bag/ReqBagInfoHandler.cs
const serverLines = [
  '// Logic/Player/Bag/ReqBagInfoHandler.cs',
  '[MessageMapping(typeof(ReqBagInfo))]',
  'internal sealed class ReqBagInfoHandler',
  '    : PlayerRpcComponentHandler<',
  '        BagComponentAgent, ReqBagInfo, RespBagInfo>',
  '{',
  '    protected override async Task ActionAsync(',
  '        ReqBagInfo request, RespBagInfo response)',
  '    {',
  '        await ComponentAgent.OnReqBagInfoAsync(',
  '            NetWorkChannel, request, response);',
  '    }',
  '}',
];

function CodeBlock({ lines, filename }: { lines: string[]; filename: string }) {
  return (
    <div className="rp-codedemo__panel">
      <div className="rp-codedemo__header">
        <span className="rp-codedemo__dots">
          <i /><i /><i />
        </span>
        <span className="rp-codedemo__filename">{filename}</span>
      </div>
      <pre className="rp-codedemo__code">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="rp-codedemo__line">
              <span className="rp-codedemo__ln">{i + 1}</span>
              <span className="rp-codedemo__text">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default function CodeDemo() {
  const { ref, isVisible } = useScrollReveal();
  const lang = useLang();
  const t = (landingI18n[lang] || landingI18n.en).codeDemo;

  return (
    <section
      ref={ref}
      className={`rp-landing-section ${isVisible ? 'rp-landing--visible' : ''}`}
    >
      <h2 className="rp-landing-section__title">{t.title}</h2>
      <p className="rp-landing-section__subtitle">{t.subtitle}</p>
      <div className="rp-codedemo">
        <div className="rp-codedemo__protocol">
          <span className="rp-codedemo__protocol-badge">{t.protocolBadge}</span>
          <CodeBlock lines={protocolLines} filename="Proto/Bag_100.cs" />
        </div>
        <div className="rp-codedemo__columns">
          <div className="rp-codedemo__column">
            <span className="rp-codedemo__role rp-codedemo__role--client">{t.clientLabel}</span>
            <CodeBlock lines={clientLines} filename="Manager/BagManager.cs" />
          </div>
          <div className="rp-codedemo__column">
            <span className="rp-codedemo__role rp-codedemo__role--server">{t.serverLabel}</span>
            <CodeBlock lines={serverLines} filename="Logic/Player/Bag/ReqBagInfoHandler.cs" />
          </div>
        </div>
      </div>
    </section>
  );
}
