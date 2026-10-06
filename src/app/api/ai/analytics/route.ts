import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/services/ai/providers/providerFactory';
import { AnalyticsEngineInput } from '@/services/ai/analyticsEngine';

export async function POST(req: NextRequest) {
  try {
    const body: AnalyticsEngineInput = await req.json();

    const provider = getAIProvider();
    const result = await provider.generateAnalytics(body);

    return NextResponse.json({
      success: true,
      provider: provider.name,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Аналитикалық талдау қатесі' },
      { status: 500 }
    );
  }
}
