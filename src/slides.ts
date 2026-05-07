import type { ComponentType } from 'react';

import TitleSlide from './slides/TitleSlide';
import ProblemSlide from './slides/ProblemSlide';
import PillarsSlide from './slides/PillarsSlide';
import StatusSlide from './slides/StatusSlide';
import DiscoverySlide from './slides/DiscoverySlide';
import SectorsSlide from './slides/SectorsSlide';
import TenderFinderSlide from './slides/TenderFinderSlide';
import ScoringSlide from './slides/ScoringSlide';
import WorkedExampleSlide from './slides/WorkedExampleSlide';
import LiveAppSlide from './slides/LiveAppSlide';
import PipelineSlide from './slides/PipelineSlide';
import ActionCentreSlide from './slides/ActionCentreSlide';
import DayInLifeSlide from './slides/DayInLifeSlide';
import CopilotSlide from './slides/CopilotSlide';
import TechSlide from './slides/TechSlide';
import ImpactSlide from './slides/ImpactSlide';
import NextStepsSlide from './slides/NextStepsSlide';

export interface SlideProps {
  isActive: boolean;
}

export const SLIDES: ComponentType<SlideProps>[] = [
  TitleSlide,           // 1
  ProblemSlide,         // 2
  PillarsSlide,         // 3
  StatusSlide,          // 4
  DiscoverySlide,       // 5
  SectorsSlide,         // 6
  TenderFinderSlide,    // 7 — Tender Finder, the highest-£ input
  ScoringSlide,         // 8
  WorkedExampleSlide,   // 9
  LiveAppSlide,         // 10 — the rotating live app
  PipelineSlide,        // 11
  ActionCentreSlide,    // 12
  DayInLifeSlide,       // 13 — Sarah, Tuesday morning
  CopilotSlide,         // 14
  TechSlide,            // 15
  ImpactSlide,          // 16 — The Numbers Don't Lie
  NextStepsSlide,       // 17
];
