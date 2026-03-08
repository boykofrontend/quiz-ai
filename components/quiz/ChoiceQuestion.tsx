'use client';

import { FC, useState } from 'react';

import ContinueButton from '@/components/quiz/ContinueButton';

interface ChoiceQuestionProps {
  options: string[];
  onNext: (value: string) => void;
}

const ChoiceQuestion: FC<ChoiceQuestionProps> = ({ options, onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => (): void => setSelected(option);

  const handleNext = (): void => {
    if (selected) onNext(selected);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={handleSelect(option)}
          className={`text-md w-full cursor-pointer rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors ${
            selected === option
              ? 'border-zinc-400 bg-zinc-200 text-zinc-800'
              : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
          }`}
        >
          {option}
        </button>
      ))}
      <ContinueButton disabled={!selected} onClick={handleNext} />
    </div>
  );
};

export default ChoiceQuestion;
