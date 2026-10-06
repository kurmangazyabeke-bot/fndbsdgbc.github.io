import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/services/ai/providers/providerFactory';
import { TrainerEngineInput } from '@/services/ai/trainerEngine';

export async function POST(req: NextRequest) {
  try {
    const body: TrainerEngineInput = await req.json();

    const provider = getAIProvider();
    const result = await provider.generateTrainerRoute(body);

    return NextResponse.json({
      success: true,
      provider: provider.name,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Маршрут құру қатесі' },
      { status: 500 }
    );
  }
}
