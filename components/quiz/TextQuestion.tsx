'use client';

import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import ContinueButton from '@/components/quiz/ContinueButton';
import { Input } from '@/components/ui/input';

interface TextQuestionProps {
  placeholder?: string;
  onNext: (value: string) => void;
}

const TextQuestion: FC<TextQuestionProps> = ({ placeholder = 'Type your answer...', onNext }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && value.trim()) onNext(value.trim());
  };
  const handleClick = (): void => onNext(value.trim());

  return (
    <div className="space-y-4">
      <Input
        className="mx-auto my-[12px] h-12"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="animate-orb-pulse mx-auto mt-5 h-40 w-40 rounded-full bg-linear-to-br from-[#ff6b35] to-[#0085fc] blur-md md:h-48 md:w-48" />
      <ContinueButton disabled={!value.trim()} onClick={handleClick} />
    </div>
  );
};

export default TextQuestion;
