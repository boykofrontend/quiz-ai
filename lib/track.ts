import { useAppStore } from '@/store/useAppStore';

export const trackEvent = async (
  type: string,
  metadata?: Record<string, unknown>,
): Promise<void> => {
  try {
    const sessionId = useAppStore.getState().sessionId;

    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
      },
      body: JSON.stringify({ event_type: type, metadata }),
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
