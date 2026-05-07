import type { ComponentType } from 'react';

import TitleSlide from './slides/TitleSlide';
import ProblemSlide from './slides/ProblemSlide';
import PillarsSlide from './slides/PillarsSlide';
import StatusSlide from './slides/StatusSlide';
import DiscoverySlide from './slides/DiscoverySlide';
import SectorsSlide from './slides/SectorsSlide';
import ScoringSlide from './slides/ScoringSlide';
import WorkedExampleSlide from './slides/WorkedExampleSlide';
import LiveAppSlide from './slides/LiveAppSlide';
import PipelineSlide from './slides/PipelineSlide';
import ActionCentreSlide from './slides/ActionCentreSlide';
import CopilotSlide from './slides/CopilotSlide';
import TechSlide from './slides/TechSlide';
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
  ScoringSlide,         // 7
  WorkedExampleSlide,   // 8
  LiveAppSlide,         // 9 — the rotating live app
  PipelineSlide,        // 10
  ActionCentreSlide,    // 11
  CopilotSlide,         // 12
  TechSlide,            // 13
  NextStepsSlide,       // 14
];
