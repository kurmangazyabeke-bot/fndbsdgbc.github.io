/**
 * MATHQADAM AI - OPENAI / DEEPSEEK / GROQ COMPATIBLE PROVIDER
 * 19-ҚАДАМ: НАҚТЫ LLM ҚОСЫЛУЫ (OPENAI COMPATIBLE REST API)
 * 
 * Ескерту: Бұл код тек server-side (Route Handlers) ортасында орындалады.
 * API кілті ешқашан frontend-ке берілмейді.
 */

import { ILLMProvider, LLMConfig } from './types';
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
import {
  AI_DIAGNOST_SYSTEM_PROMPT,
  AI_ADAPTER_SYSTEM_PROMPT,
  AI_EXPLAINER_SYSTEM_PROMPT,
  AI_TRAINER_SYSTEM_PROMPT,
  AI_ANALYST_SYSTEM_PROMPT
} from './prompts';

export class OpenAICompatibleProvider implements ILLMProvider {
  name: string;
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(config?: Partial<LLMConfig>) {
    this.apiKey = config?.apiKey || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || '';
    this.baseUrl = config?.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    this.model = config?.model || process.env.LLM_MODEL || 'gpt-4o-mini';
    this.name = `OpenAICompatibleProvider (${this.model})`;
  }

  private async callChatCompletion(systemPrompt: string, userPrompt: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('API кілті табылмады. Қосалқы алгоритмдік провайдерге ауысуда.');
    }

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`LLM API Қатесі (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    return JSON.parse(content);
  }

  async evaluateDiagnostic(input: DiagnosticEngineInput): Promise<DiagnosticEvaluationResult> {
    try {
      if (!this.apiKey) return evaluateStudentAnswer(input);

      const userPrompt = `
      Сұрақ: ${typeof input.question === 'string' ? input.question : input.question.questionKaz}
      Дұрыс жауап: ${input.correctAnswer}
      Оқушының жауабы: ${input.studentAnswer}
      Дағды: ${input.skill}
      Алдыңғы меңгеру: ${input.previousMastery ?? 60}%
      `;

      const parsed = await this.callChatCompletion(AI_DIAGNOST_SYSTEM_PROMPT, userPrompt);
      const fallback = evaluateStudentAnswer(input);

      return {
        ...fallback,
        isCorrect: parsed.isCorrect ?? fallback.isCorrect,
        mistakeType: parsed.mistakeType ?? fallback.mistakeType,
        identifiedDifficultyKaz: parsed.identifiedDifficultyKaz ?? fallback.identifiedDifficultyKaz,
        nextDiagnosticActionKaz: parsed.nextDiagnosticActionKaz ?? fallback.nextDiagnosticActionKaz,
        confidence: parsed.confidence ?? fallback.confidence,
      };
    } catch (e) {
      return evaluateStudentAnswer(input);
    }
  }

  async evaluateAdaptive(input: AdaptiveEngineInput): Promise<AdaptiveEngineOutput> {
    try {
      if (!this.apiKey) return adaptiveEngine(input);
      const userPrompt = JSON.stringify(input);
      const parsed = await this.callChatCompletion(AI_ADAPTER_SYSTEM_PROMPT, userPrompt);
      const fallback = adaptiveEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return adaptiveEngine(input);
    }
  }

  async generateExplanation(input: ExplanationEngineInput): Promise<ExplanationEngineOutput> {
    try {
      if (!this.apiKey) return explanationEngine(input);
      const userPrompt = JSON.stringify(input);
      const parsed = await this.callChatCompletion(AI_EXPLAINER_SYSTEM_PROMPT, userPrompt);
      const fallback = explanationEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return explanationEngine(input);
    }
  }

  async generateTrainerRoute(input: TrainerEngineInput): Promise<TrainerEngineOutput> {
    try {
      if (!this.apiKey) return trainerEngine(input);
      const userPrompt = JSON.stringify(input);
      const parsed = await this.callChatCompletion(AI_TRAINER_SYSTEM_PROMPT, userPrompt);
      const fallback = trainerEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return trainerEngine(input);
    }
  }

  async generateAnalytics(input: AnalyticsEngineInput): Promise<AnalyticsEngineOutput> {
    try {
      if (!this.apiKey) return analyticsEngine(input);
      const userPrompt = JSON.stringify(input);
      const parsed = await this.callChatCompletion(AI_ANALYST_SYSTEM_PROMPT, userPrompt);
      const fallback = analyticsEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return analyticsEngine(input);
    }
  }
}
