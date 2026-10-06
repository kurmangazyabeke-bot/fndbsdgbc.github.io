/**
 * MATHQADAM AI - PROVIDER FACTORY
 * 19-ҚАДАМ: AI ПРОВАЙДЕРЛЕРІН АУЫСТЫРУ ОРТАЛЫҒЫ
 * 
 * Frontend кодын өзгертпей, тек серверлік орта айнымалылары (environment variables)
 * арқылы AI провайдерін (OpenAI, Gemini, DeepSeek, Mock) автоматты ауыстырады.
 */

import { ILLMProvider } from './types';
import { MockDeterministicProvider } from './mockProvider';
import { OpenAICompatibleProvider } from './openAIProvider';
import { GeminiProvider } from './geminiProvider';

let cachedProvider: ILLMProvider | null = null;

export function getAIProvider(): ILLMProvider {
  if (cachedProvider) {
    return cachedProvider;
  }

  const requestedProvider = (process.env.AI_PROVIDER || '').toLowerCase();

  if (requestedProvider === 'gemini' || (process.env.GEMINI_API_KEY && requestedProvider !== 'openai')) {
    cachedProvider = new GeminiProvider();
    return cachedProvider;
  }

  if (requestedProvider === 'openai' || requestedProvider === 'deepseek' || requestedProvider === 'groq' || process.env.OPENAI_API_KEY) {
    cachedProvider = new OpenAICompatibleProvider();
    return cachedProvider;
  }

  // Default fallback: Deterministic offline provider
  cachedProvider = new MockDeterministicProvider();
  return cachedProvider;
}
