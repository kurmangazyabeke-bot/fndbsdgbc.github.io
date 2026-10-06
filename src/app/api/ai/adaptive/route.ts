import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/services/ai/providers/providerFactory';
import { AdaptiveEngineInput } from '@/services/ai/adaptiveEngine';

export async function POST(req: NextRequest) {
  try {
    const body: AdaptiveEngineInput = await req.json();

    const provider = getAIProvider();
    const result = await provider.evaluateAdaptive(body);

    return NextResponse.json({
      success: true,
      provider: provider.name,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Бейімдеу қатесі' },
      { status: 500 }
    );
  }
}
