'use client';

import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface ContinueButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

const ContinueButton: FC<ContinueButtonProps> = ({ disabled, onClick }) => {
  return (
    <Button
      className="animate-fade-in-up text-md h-auto w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
    >
      Continue
    </Button>
  );
};

export default ContinueButton;
