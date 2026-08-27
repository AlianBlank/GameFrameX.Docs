import { useLayoutEffect, useState } from 'react';
import { SidebarList } from '@rspress/core/theme-original';
import { useActiveMatcher, useSidebar } from '@rspress/core/runtime';
import type { SidebarData } from '@rspress/core';

// 侧边栏前 N 层（depth 0 ~ COLLAPSE_FROM-1）默认展开，更深的分组默认收起；
// 当前页面所在路径上的祖先分组不受影响（仍自动展开）。depth 从 0 计：
// 0 = 侧边栏顶层条目（如 client/unity 的页面与 component 分组），
// 1 = component 下的通用小节与组件包，2 = 组件包内部小节。
const COLLAPSE_FROM = 2;

type Matcher = (link: string) => boolean;

function containsActive(
  item: SidebarData[number],
  matcher: Matcher,
  cache: WeakMap<object, boolean>,
): boolean {
  const cached = cache.get(item);
  if (cached !== undefined) {
    return cached;
  }
  let result = false;
  if ('link' in item && item.link && matcher(item.link)) {
    result = true;
  } else if ('items' in item && item.items) {
    result = item.items.some((child) => containsActive(child, matcher, cache));
  }
  cache.set(item, result);
  return result;
}

function annotate(items: SidebarData, matcher: Matcher, depth = 0): SidebarData {
  const cache = new WeakMap<object, boolean>();
  return items.map((item) => {
    if (!('items' in item) || !item.items) {
      return item;
    }
    const annotated: SidebarData[number] = {
      ...item,
      items: annotate(item.items, matcher, depth + 1),
    };
    if (containsActive(annotated, matcher, cache)) {
      // 框架语义：当前页面所在祖先一律展开（含显式 collapsed: true 的分组）
      annotated.collapsed = false;
    } else if (annotated.collapsed === undefined) {
      // 仅当 _meta.json 未显式配置时，按深度规则给默认值
      annotated.collapsed = depth >= COLLAPSE_FROM;
    }
    // 显式配置的 collapsed / collapsible 原样保留，优先于全局深度规则
    return annotated;
  });
}

export function Sidebar() {
  const rawSidebarData = useSidebar();
  const activeMatcher = useActiveMatcher();
  const [sidebarData, setSidebarData] = useState<SidebarData>(() =>
    annotate(structuredClone(rawSidebarData), activeMatcher),
  );
  useLayoutEffect(() => {
    setSidebarData(annotate(structuredClone(rawSidebarData), activeMatcher));
  }, [rawSidebarData, activeMatcher]);

  return (
    <SidebarList sidebarData={sidebarData} setSidebarData={setSidebarData} />
  );
}
