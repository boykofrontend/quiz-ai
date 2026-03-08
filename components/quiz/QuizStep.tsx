import { FC } from 'react';

import { useTypingText } from '@/hooks/useTypingText';

interface QuizStepProps {
  step: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
}

const QuizStep: FC<QuizStepProps> = ({ step, totalSteps, title, children }) => {
  const { textToShow } = useTypingText(title);
  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex h-full min-h-0 w-full max-w-2xl flex-col rounded-xl bg-white/50 p-5 shadow-lg backdrop-blur-md md:space-y-6 md:p-8">
          <div className="mb-6">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gray-800 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h2 className="mb-6 flex min-h-8 flex-wrap items-center justify-center text-center text-xl font-bold text-gray-900 md:text-2xl">
            {textToShow}
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
};

export default QuizStep;
