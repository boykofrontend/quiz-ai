import React from 'react';

import { supabaseServer } from '@/lib/supabase';

interface Event {
  id: string;
  event_type: string;
  session_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabaseServer
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
  return data ?? [];
};

const DebugEventsPage = async (): Promise<React.ReactElement> => {
  const events = await getEvents();

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Event Log</h1>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold text-zinc-500 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Event Type</th>
              <th className="px-4 py-3">Session ID</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">
                  No events yet.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {event.id.slice(0, 8)}...
                </td>
                <td className="px-4 py-3 font-medium text-zinc-800">{event.event_type}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                  {event.session_id ?? '—'}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-400">
                  {new Date(event.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DebugEventsPage;
