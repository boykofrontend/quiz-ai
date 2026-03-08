'use client';

import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { trackEvent } from '@/lib/track';
import { useAppStore } from '@/store/useAppStore';

const getEmailError = (email: string): string => {
  if (!email) return 'Please enter your email.';
  if (!email.includes('@')) return 'Email must contain "@".';
  const [local, domain] = email.split('@');
  if (!local) return 'Enter something before "@".';
  if (!domain) return 'Enter a domain after "@".';
  if (!domain.includes('.')) return 'Domain must contain a dot (e.g. gmail.com).';
  const [, tld] = domain.split('.');
  if (!tld) return 'Enter a domain extension (e.g. .com).';
  return '';
};

const EmailPage: FC = () => {
  const router = useRouter();
  const { setEmail, quizAnswers } = useAppStore();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setError('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = (): void => {
    const emailError = getEmailError(value);
    if (emailError) {
      setError(emailError);
      return;
    }

    setEmail(value);
    trackEvent('email_submitted', { email: value });

    router.push('/chat');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Almost there{quizAnswers.name ? `, ${quizAnswers.name}` : ''}!</CardTitle>
          <CardDescription>
            Enter your email to receive your personalized AI Digital Twin analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              type="email"
              placeholder="you@example.com"
              className="h-auto p-2"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button className="h-auto w-full cursor-pointer p-3" onClick={handleSubmit}>
            Start My Journey
          </Button>
          <p className="text-center text-xs text-zinc-400">No spam. Unsubscribe any time.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailPage;
