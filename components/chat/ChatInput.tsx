'use client';

import { FC, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (): void => {
    if (!value.trim() || disabled) {
      return;
    }

    onSend(value.trim());
    setValue('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.minHeight = '38px';

    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 border-t border-zinc-200 p-4">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
        autoFocus
        rows={1}
        className="flex-1 resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm leading-5 ring-0 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-0 disabled:opacity-50"
        style={{ maxHeight: '120px', overflowY: 'auto', boxSizing: 'border-box' }}
      />
      <Button onClick={handleSend} disabled={!value.trim() || disabled}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
