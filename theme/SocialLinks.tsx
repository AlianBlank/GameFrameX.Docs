import { useLang, useSite } from '@rspress/core/runtime';
import { IconArrowDown, SvgWrapper, useHoverGroup } from '@rspress/core/theme';
// SocialLink 未从 @rspress/core/theme 顶层导出，深路径引用官方子组件（自带样式与悬停提示）
import { SocialLink } from '@rspress/core/dist/theme/components/SocialLinks/SocialLink.js';
import type { SocialLink as SocialLinkItem } from '@rspress/core';

const MORE_LENGTH = 5;
// 国内平台域名：中文语言下排前面，其他语言排后面（组内保持配置顺序）
const CN_HOSTS = ['bilibili.com', 'qq.com', 'gitee.com'];

function isCnLink(item: SocialLinkItem) {
  return CN_HOSTS.some((host) => item.content.includes(host));
}

// Rspress 的 locale 配置不支持 socialLinks，故覆盖 SocialLinks 组件按当前语言排序
export default function SocialLinks() {
  const { site } = useSite();
  const lang = useLang();
  const links: SocialLinkItem[] = site.themeConfig.socialLinks || [];
  const cnFirst = lang.startsWith('zh');
  const group = (item: SocialLinkItem) => (cnFirst === isCnLink(item) ? 0 : 1);
  const socialLinks = [...links].sort((a, b) => group(a) - group(b));
  const isMore = socialLinks.length > MORE_LENGTH;
  const shownLinks = socialLinks.slice(0, MORE_LENGTH);
  const hiddenLinks = socialLinks.slice(MORE_LENGTH);
  const { hoverGroup, handleMouseEnter, handleMouseLeave } = useHoverGroup({
    position: 'right',
    customChildren: isMore ? (
      <div className="rp-social-links__hidden">
        {hiddenLinks.map((item, index) => (
          <SocialLink
            key={item.content}
            link={item}
            hoverGroupPosition={index === hiddenLinks.length - 1 ? 'right' : 'center'}
          />
        ))}
      </div>
    ) : null,
  });

  if (socialLinks.length === 0) {
    return <></>;
  }

  return (
    <div className="rp-social-links" onMouseLeave={handleMouseLeave}>
      {shownLinks.map((item, index) => (
        <SocialLink
          key={item.content}
          link={item}
          hoverGroupPosition={index === shownLinks.length - 1 ? 'right' : 'center'}
        />
      ))}
      {isMore ? (
        <SvgWrapper icon={IconArrowDown} onMouseEnter={handleMouseEnter} fontSize={20} />
      ) : null}
      {hoverGroup}
    </div>
  );
}
