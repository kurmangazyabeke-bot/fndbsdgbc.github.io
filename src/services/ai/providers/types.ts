/**
 * MATHQADAM AI - LLM PROVIDER ABSTRACTION TYPES
 * 19-ҚАДАМ: LLM INTEGRATION АРХИТЕКТУРАСЫ
 */

import {
  DiagnosticEngineInput,
  DiagnosticEvaluationResult
} from '../diagnosticEngine';
import {
  AdaptiveEngineInput,
  AdaptiveEngineOutput
} from '../adaptiveEngine';
import {
  ExplanationEngineInput,
  ExplanationEngineOutput
} from '../explanationEngine';
import {
  TrainerEngineInput,
  TrainerEngineOutput
} from '../trainerEngine';
import {
  AnalyticsEngineInput,
  AnalyticsEngineOutput
} from '../analyticsEngine';

export type AIProviderType = 'mock' | 'openai' | 'gemini' | 'groq' | 'deepseek' | 'claude';

export interface LLMConfig {
  provider: AIProviderType;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Universal Interface for all LLM / AI Providers
 * Any AI provider (OpenAI, Gemini, Claude, DeepSeek, Mock) must implement this interface.
 */
export interface ILLMProvider {
  name: string;

  /**
   * AI Diagnost LLM evaluation
   */
  evaluateDiagnostic(input: DiagnosticEngineInput): Promise<DiagnosticEvaluationResult>;

  /**
   * AI Adapter LLM difficulty adaptation
   */
  evaluateAdaptive(input: AdaptiveEngineInput): Promise<AdaptiveEngineOutput>;

  /**
   * AI Explainer LLM multi-mode explanation generator
   */
  generateExplanation(input: ExplanationEngineInput): Promise<ExplanationEngineOutput>;

  /**
   * AI Trainer LLM personalized roadmap generator
   */
  generateTrainerRoute(input: TrainerEngineInput): Promise<TrainerEngineOutput>;

  /**
   * AI Analyst LLM pedagogical conclusion & growth synthesis
   */
  generateAnalytics(input: AnalyticsEngineInput): Promise<AnalyticsEngineOutput>;
}
