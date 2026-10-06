/**
 * MATHQADAM AI - DETERMINISTIC FALLBACK MOCK PROVIDER
 * 19-ҚАДАМ: ОФЛАЙН ЖӘНЕ ДЕМО РЕЖИМДЕГІ БАЗАЛЫҚ AI ПРОВАЙДЕР
 */

import { ILLMProvider } from './types';
import {
  DiagnosticEngineInput,
  DiagnosticEvaluationResult,
  evaluateStudentAnswer
} from '../diagnosticEngine';
import {
  AdaptiveEngineInput,
  AdaptiveEngineOutput,
  adaptiveEngine
} from '../adaptiveEngine';
import {
  ExplanationEngineInput,
  ExplanationEngineOutput,
  explanationEngine
} from '../explanationEngine';
import {
  TrainerEngineInput,
  TrainerEngineOutput,
  trainerEngine
} from '../trainerEngine';
import {
  AnalyticsEngineInput,
  AnalyticsEngineOutput,
  analyticsEngine
} from '../analyticsEngine';

export class MockDeterministicProvider implements ILLMProvider {
  name = 'MockDeterministicProvider (Offline Fast Fallback)';

  async evaluateDiagnostic(input: DiagnosticEngineInput): Promise<DiagnosticEvaluationResult> {
    return evaluateStudentAnswer(input);
  }

  async evaluateAdaptive(input: AdaptiveEngineInput): Promise<AdaptiveEngineOutput> {
    return adaptiveEngine(input);
  }

  async generateExplanation(input: ExplanationEngineInput): Promise<ExplanationEngineOutput> {
    return explanationEngine(input);
  }

  async generateTrainerRoute(input: TrainerEngineInput): Promise<TrainerEngineOutput> {
    return trainerEngine(input);
  }

  async generateAnalytics(input: AnalyticsEngineInput): Promise<AnalyticsEngineOutput> {
    return analyticsEngine(input);
  }
}
