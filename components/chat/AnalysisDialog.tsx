'use client';

import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface Analysis {
  emotionalState: string;
  stressors: string[];
  patterns: string;
  recommendation: string;
}

interface AnalysisDialogProps {
  open: boolean;
  analysis: Analysis | null;
  onClose: () => void;
}

const AnalysisDialog: FC<AnalysisDialogProps> = ({ open, analysis, onClose }) => {
  const handleOpenChange = (isOpen: boolean): void => {
    if (!isOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Your AI Analysis</DialogTitle>
          <DialogDescription>
            Based on your conversation, here is what your AI Digital Twin observed.
          </DialogDescription>
        </DialogHeader>
        {analysis && (
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-1 font-medium text-zinc-500">Emotional State</p>
              <Badge variant="secondary">{analysis.emotionalState}</Badge>
            </div>
            <div>
              <p className="mb-2 font-medium text-zinc-500">Identified Stressors</p>
              <div className="flex flex-wrap gap-2">
                {analysis.stressors.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium text-zinc-500">Behavioral Pattern</p>
              <p className="text-zinc-700">{analysis.patterns}</p>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="mb-1 font-medium text-zinc-500">Recommendation</p>
              <p className="text-zinc-700">{analysis.recommendation}</p>
            </div>
          </div>
        )}
        <Button className="text-md mt-2 h-auto w-full cursor-pointer p-3" onClick={onClose}>
          Continue to Your Plan
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisDialog;
