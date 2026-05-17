import { HomeLayout as RspressHomeLayout } from '@rspress/core/theme-original';
import './HomeLayout.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ProgressiveArchitecture from './ProgressiveArchitecture';
import EngineGrid from './EngineGrid';
import CodeDemo from './CodeDemo';
import UseCases from './UseCases';
import QuickStart from './QuickStart';
import CallToAction from './CallToAction';

export default function HomeLayout() {
  return (
    <RspressHomeLayout
      beforeHero={<HeroSection />}
      beforeFeatures={<FeaturesSection />}
      afterFeatures={
        <>
          <ProgressiveArchitecture />
          <EngineGrid />
          <CodeDemo />
          <UseCases />
          <QuickStart />
          <CallToAction />
        </>
      }
    />
  );
}
