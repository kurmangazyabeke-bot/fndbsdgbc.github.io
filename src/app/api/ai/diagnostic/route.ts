import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/services/ai/providers/providerFactory';
import { DiagnosticEngineInput } from '@/services/ai/diagnosticEngine';

export async function POST(req: NextRequest) {
  try {
    const body: DiagnosticEngineInput = await req.json();

    if (!body.question || !body.studentAnswer || !body.correctAnswer) {
      return NextResponse.json(
        { error: 'Сұрақ, оқушы жауабы және дұрыс жауап міндетті' },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const result = await provider.evaluateDiagnostic(body);

    return NextResponse.json({
      success: true,
      provider: provider.name,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Диагностикалық талдау қатесі' },
      { status: 500 }
    );
  }
}
