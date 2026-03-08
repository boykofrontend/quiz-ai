import { create } from 'zustand';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface QuizAnswers {
  name: string;
  personality: string;
  therapyStyle: string;
  mood: string;
  goal: string;
}

interface AppState {
  sessionId: string;
  quizAnswers: QuizAnswers;
  email: string;
  messages: Message[];
  setQuizAnswers: (answers: QuizAnswers) => void;
  setEmail: (email: string) => void;
  addMessage: (message: Message) => void;
}

const getOrCreateSessionId = (): string => {
  const SESSION_KEY = 'quiz_session_id';

  if (typeof window === 'undefined') {
    return '';
  }

  const existing = sessionStorage.getItem(SESSION_KEY);

  if (existing) {
    return existing;
  }

  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  sessionStorage.setItem(SESSION_KEY, id);

  return id;
};

export const useAppStore = create<AppState>((set) => ({
  sessionId: getOrCreateSessionId(),
  quizAnswers: { name: '', personality: '', therapyStyle: '', mood: '', goal: '' },
  email: '',
  messages: [],
  setQuizAnswers: (answers) => set({ quizAnswers: answers }),
  setEmail: (email) => set({ email }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
