import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { messages } = await req.json();

    const prompt = `Analyze the following chat messages and return JSON with:
- emotionalState
- stressors
- patterns
- recommendation

Return ONLY valid JSON.

Messages:
${messages.map((m: Record<string, string>) => `${m.role}: ${m.content}`).join('\n')}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    const text = data.choices[0].message.content;

    const clean = text.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(clean);

    return NextResponse.json(analysis);
  } catch (err) {
    console.error('Analyze error:', err);
    return NextResponse.json(
      {
        emotionalState: 'Unknown',
        stressors: ['Unable to analyze at this time'],
        patterns: 'Analysis unavailable',
        recommendation: 'Please try again later.',
      },
      { status: 200 },
    );
  }
};
