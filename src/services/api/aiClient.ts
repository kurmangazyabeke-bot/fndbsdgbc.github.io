/**
 * MATHQADAM AI - CLIENT API SDK
 * 19-ҚАДАМ: FRONTEND AI API КЛИЕНТІ
 * 
 * Барлық frontend компоненттері тек осы клиент арқылы сөйлеседі.
 * UI ішінде API logic немесе LLM credentials мүлдем болмайды.
 */

import { DiagnosticEngineInput, DiagnosticEvaluationResult, evaluateStudentAnswer } from '../ai/diagnosticEngine';
import { AdaptiveEngineInput, AdaptiveEngineOutput, adaptiveEngine } from '../ai/adaptiveEngine';
import { ExplanationEngineInput, ExplanationEngineOutput, explanationEngine } from '../ai/explanationEngine';
import { TrainerEngineInput, TrainerEngineOutput, trainerEngine } from '../ai/trainerEngine';
import { AnalyticsEngineInput, AnalyticsEngineOutput, analyticsEngine } from '../ai/analyticsEngine';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  provider?: string;
  error?: string;
}

class MathQadamAIClient {
  private async postJson<TIn, TOut>(endpoint: string, payload: TIn, fallbackFn: (input: TIn) => TOut): Promise<TOut> {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Fallback gracefully to offline algorithms
        return fallbackFn(payload);
      }

      const json: ApiResponse<TOut> = await res.json();
      if (json.success && json.data) {
        return json.data;
      }

      return fallbackFn(payload);
    } catch {
      // Offline fallback
      return fallbackFn(payload);
    }
  }

  /**
   * 1. AI Diagnost API Call
   */
  async evaluateDiagnostic(input: DiagnosticEngineInput): Promise<DiagnosticEvaluationResult> {
    return this.postJson('/api/ai/diagnostic', input, evaluateStudentAnswer);
  }

  /**
   * 2. AI Adapter API Call
   */
  async evaluateAdaptive(input: AdaptiveEngineInput): Promise<AdaptiveEngineOutput> {
    return this.postJson('/api/ai/adaptive', input, adaptiveEngine);
  }

  /**
   * 3. AI Explainer API Call
   */
  async generateExplanation(input: ExplanationEngineInput): Promise<ExplanationEngineOutput> {
    return this.postJson('/api/ai/explain', input, explanationEngine);
  }

  /**
   * 4. AI Trainer API Call
   */
  async generateTrainerRoute(input: TrainerEngineInput): Promise<TrainerEngineOutput> {
    return this.postJson('/api/ai/trainer', input, trainerEngine);
  }

  /**
   * 5. AI Analyst API Call
   */
  async generateAnalytics(input: AnalyticsEngineInput): Promise<AnalyticsEngineOutput> {
    return this.postJson('/api/ai/analytics', input, analyticsEngine);
  }
}

export const aiClient = new MathQadamAIClient();
