'use client';

import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import ChoiceQuestion from '@/components/quiz/ChoiceQuestion';
import QuizStep from '@/components/quiz/QuizStep';
import TextQuestion from '@/components/quiz/TextQuestion';
import { trackEvent } from '@/lib/track';
import { useAppStore } from '@/store/useAppStore';

const TOTAL_STEPS = 5;

const stepTitles = [
  'How should I call you?',
  'Choose your AI twin personality',
  'What therapy style resonates with you?',
  'How are you feeling right now?',
  'What is your primary goal?',
];

const QuizPage: FC = () => {
  const router = useRouter();
  const { setQuizAnswers } = useAppStore();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    name: '',
    personality: '',
    therapyStyle: '',
    mood: '',
    goal: '',
  });

  useEffect(() => {
    trackEvent('quiz_start');
  }, []);

  const handleNext =
    (key: keyof typeof answers) =>
    (value: string): void =>
      handleAnswer(key, value);

  const handleAnswer = (key: keyof typeof answers, value: string): void => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setQuizAnswers(updated);
      trackEvent('quiz_submit', { answers: updated });
      router.push('/email');
    }
  };

  return (
    <QuizStep step={step} totalSteps={TOTAL_STEPS} title={stepTitles[step - 1]}>
      {step === 1 && <TextQuestion placeholder="Enter your name..." onNext={handleNext('name')} />}
      {step === 2 && (
        <ChoiceQuestion
          options={['Empathetic', 'Analytical', 'Motivational', 'Playful']}
          onNext={handleNext('personality')}
        />
      )}
      {step === 3 && (
        <ChoiceQuestion
          options={['CBT', 'Mindfulness', 'Solution-focused', 'Psychodynamic']}
          onNext={handleNext('therapyStyle')}
        />
      )}
      {step === 4 && (
        <ChoiceQuestion
          options={['Anxious', 'Stressed', 'Sad', 'Overwhelmed']}
          onNext={handleNext('mood')}
        />
      )}
      {step === 5 && (
        <ChoiceQuestion
          options={['Reduce stress', 'Improve focus', 'Better sleep', 'Self-discovery']}
          onNext={handleNext('goal')}
        />
      )}
    </QuizStep>
  );
};

export default QuizPage;
