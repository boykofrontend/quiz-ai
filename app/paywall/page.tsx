'use client';

import { FC, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trackEvent } from '@/lib/track';

const FREE_FEATURES = ['3 chat sessions per month', 'Basic mood tracking', 'Limited analysis'];

const PRO_FEATURES = [
  'Unlimited chat sessions',
  'Advanced AI analysis',
  'Personalized exercises',
  'Priority support',
  'Export your insights',
];

const PaywallPage: FC = () => {
  useEffect(() => {
    trackEvent('paywall_view');
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-black-900 text-3xl font-bold">
          Unlock Your Full AI Digital Twin Experience
        </h1>
        <p className="text-black-900 mt-3">Your analysis is ready. Upgrade to access everything.</p>
      </div>

      <div className="grid w-full max-w-2xl gap-6 md:grid-cols-2">
        <Card className="border-zinc-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Free</CardTitle>
              <Badge variant="secondary">Current plan</Badge>
            </div>
            <CardDescription>
              <span className="text-2xl font-bold text-zinc-900">$0</span>
              <span className="text-zinc-400">/mo</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                  <span className="text-zinc-400">–</span>
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-zinc-900 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pro</CardTitle>
              <Badge>Most popular</Badge>
            </div>
            <CardDescription>
              <span className="text-2xl font-bold text-zinc-900">$19.99</span>
              <span className="text-zinc-400">/mo</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="text-zinc-900">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full">Start Free Trial</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaywallPage;
