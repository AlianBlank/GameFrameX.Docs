import { HomeLayout as RspressHomeLayout } from '@rspress/core/theme-original';
import './HomeLayout.css';
import CodeDemo from './CodeDemo';
import Architecture from './Architecture';
import EngineGrid from './EngineGrid';
import Stats from './Stats';
import QuickStart from './QuickStart';
import CallToAction from './CallToAction';

export default function HomeLayout() {
  return (
    <RspressHomeLayout
      afterHero={<CodeDemo />}
      beforeFeatures={
        <>
          <Architecture />
          <EngineGrid />
        </>
      }
      afterFeatures={
        <>
          <Stats />
          <QuickStart />
          <CallToAction />
        </>
      }
    />
  );
}
