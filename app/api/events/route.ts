import { NextRequest, NextResponse } from 'next/server';

import { supabaseServer } from '@/lib/supabase';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body = await req.json();
    const { event_type, metadata } = body;

    const sessionId = req.headers.get('x-session-id') ?? null;

    const { error } = await supabaseServer.from('events').insert({
      event_type,
      session_id: sessionId,
      metadata: metadata ?? null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
