/**
 * MATHQADAM AI - GOOGLE GEMINI PROVIDER
 * 19-ҚАДАМ: GOOGLE GEMINI REST API ИНТЕГРАЦИЯСЫ
 * 
 * Ескерту: Бұл код тек server-side орындалады.
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

export class GeminiProvider implements ILLMProvider {
  name: string;
  private apiKey: string;
  private model: string;

  constructor(config?: Partial<LLMConfig>) {
    this.apiKey = config?.apiKey || process.env.GEMINI_API_KEY || '';
    this.model = config?.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    this.name = `GeminiProvider (${this.model})`;
  }

  private async callGemini(systemInstruction: string, userText: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY табылмады. Қосалқы алгоритмге ауысуда.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: userText }] }],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API Қатесі: ${err}`);
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(raw);
  }

  async evaluateDiagnostic(input: DiagnosticEngineInput): Promise<DiagnosticEvaluationResult> {
    try {
      if (!this.apiKey) return evaluateStudentAnswer(input);
      const userPrompt = `
      Сұрақ: ${typeof input.question === 'string' ? input.question : input.question.questionKaz}
      Дұрыс жауап: ${input.correctAnswer}
      Оқушының жауабы: ${input.studentAnswer}
      Дағды: ${input.skill}
      `;
      const parsed = await this.callGemini(AI_DIAGNOST_SYSTEM_PROMPT, userPrompt);
      const fallback = evaluateStudentAnswer(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return evaluateStudentAnswer(input);
    }
  }

  async evaluateAdaptive(input: AdaptiveEngineInput): Promise<AdaptiveEngineOutput> {
    try {
      if (!this.apiKey) return adaptiveEngine(input);
      const parsed = await this.callGemini(AI_ADAPTER_SYSTEM_PROMPT, JSON.stringify(input));
      const fallback = adaptiveEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return adaptiveEngine(input);
    }
  }

  async generateExplanation(input: ExplanationEngineInput): Promise<ExplanationEngineOutput> {
    try {
      if (!this.apiKey) return explanationEngine(input);
      const parsed = await this.callGemini(AI_EXPLAINER_SYSTEM_PROMPT, JSON.stringify(input));
      const fallback = explanationEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return explanationEngine(input);
    }
  }

  async generateTrainerRoute(input: TrainerEngineInput): Promise<TrainerEngineOutput> {
    try {
      if (!this.apiKey) return trainerEngine(input);
      const parsed = await this.callGemini(AI_TRAINER_SYSTEM_PROMPT, JSON.stringify(input));
      const fallback = trainerEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return trainerEngine(input);
    }
  }

  async generateAnalytics(input: AnalyticsEngineInput): Promise<AnalyticsEngineOutput> {
    try {
      if (!this.apiKey) return analyticsEngine(input);
      const parsed = await this.callGemini(AI_ANALYST_SYSTEM_PROMPT, JSON.stringify(input));
      const fallback = analyticsEngine(input);
      return { ...fallback, ...parsed };
    } catch (e) {
      return analyticsEngine(input);
    }
  }
}
