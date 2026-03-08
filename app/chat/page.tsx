'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import type { Analysis } from '@/components/chat/AnalysisDialog';
import AnalysisDialog from '@/components/chat/AnalysisDialog';
import ChatInput from '@/components/chat/ChatInput';
import MessageList from '@/components/chat/MessageList';
import { trackEvent } from '@/lib/track';
import { useAppStore } from '@/store/useAppStore';

const MESSAGE_TRIGGER = 5;

const ChatPage: FC = () => {
  const router = useRouter();
  const { quizAnswers, messages, addMessage } = useAppStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    trackEvent('chat_opened');

    const name = quizAnswers.name || 'there';
    addMessage({
      role: 'assistant',
      content: `Hi ${name}! I'm your AI Digital Twin. Let's reflect together — when was the last time you felt truly stressed? Tell me about it.`,
    });
  }, []);

  const userMessageCount = messages.filter((m) => m.role === 'user').length;

  const handleSend = async (content: string): Promise<void> => {
    addMessage({ role: 'user', content });
    const newCount = userMessageCount + 1;
    trackEvent('message_sent', { count: newCount });

    if (newCount >= MESSAGE_TRIGGER && !analysis) {
      setAnalyzing(true);
      try {
        const allMessages = [...messages, { role: 'user', content }];
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: allMessages }),
        });
        const data = await res.json();
        setAnalysis(data);
        setDialogOpen(true);
        trackEvent('analysis_shown');
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const handleDialogClose = (): void => {
    setDialogOpen(false);
    router.push('/paywall');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="flex h-[600px] w-full max-w-md flex-col rounded-xl bg-white/50 p-6 shadow-lg backdrop-blur-md">
        <div className="mb-4 border-b border-zinc-200 pb-4">
          <h1 className="text-sm font-semibold text-zinc-900">AI Digital Twin</h1>
          <p className="text-xs text-zinc-800">Your personal AI companion</p>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <MessageList messages={messages} />
          {analyzing && (
            <div className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
              <p className="text-md text-zinc-600">Analyzing your conversation...</p>
            </div>
          )}
          <ChatInput onSend={handleSend} disabled={analyzing || dialogOpen} />
        </div>
      </div>

      <AnalysisDialog open={dialogOpen} analysis={analysis} onClose={handleDialogClose} />
    </div>
  );
};

export default ChatPage;
