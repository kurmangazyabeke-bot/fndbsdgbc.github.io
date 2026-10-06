import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/services/ai/providers/providerFactory';
import { ExplanationEngineInput } from '@/services/ai/explanationEngine';

export async function POST(req: NextRequest) {
  try {
    const body: ExplanationEngineInput = await req.json();

    if (!body.question) {
      return NextResponse.json(
        { error: 'Сұрақ мәтіні міндетті' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.generateExplanation(body);

    return NextResponse.json({
      success: true,
      provider: provider.name,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Түсіндіру қатесі' },
      { status: 500 }
    );
  }
}
