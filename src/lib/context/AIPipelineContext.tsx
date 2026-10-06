'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  aiPipelineOrchestrator,
  UnifiedPipelineSnapshot,
  PracticeAttemptRecord
} from '@/services/ai/pipelineOrchestrator';

interface AIPipelineContextType {
  snapshot: UnifiedPipelineSnapshot;
  processAnswer: (answer: string, question?: string, correctAnswer?: string) => void;
  recordAttempt: (attempt: Omit<PracticeAttemptRecord, 'id' | 'timestamp'>) => void;
  resetDemoPipeline: () => void;
}

const AIPipelineContext = createContext<AIPipelineContextType | undefined>(undefined);

export function AIPipelineProvider({ children }: { children: React.ReactNode }) {
  const [snapshot, setSnapshot] = useState<UnifiedPipelineSnapshot>(() =>
    aiPipelineOrchestrator.getSnapshot()
  );

  const processAnswer = useCallback((answer: string, question?: string, correctAnswer?: string) => {
    const updated = aiPipelineOrchestrator.processStudentAnswer(answer, question, correctAnswer);
    setSnapshot({ ...updated });
  }, []);

  const recordAttempt = useCallback((attempt: Omit<PracticeAttemptRecord, 'id' | 'timestamp'>) => {
    const updated = aiPipelineOrchestrator.addPracticeAttempt(attempt);
    setSnapshot({ ...updated });
  }, []);

  const resetDemoPipeline = useCallback(() => {
    const updated = aiPipelineOrchestrator.generateInitialDemoPipeline('44');
    setSnapshot({ ...updated });
  }, []);

  return (
    <AIPipelineContext.Provider
      value={{
        snapshot,
        processAnswer,
        recordAttempt,
        resetDemoPipeline,
      }}
    >
      {children}
    </AIPipelineContext.Provider>
  );
}

export function useAIPipeline() {
  const context = useContext(AIPipelineContext);
  if (!context) {
    throw new Error('useAIPipeline must be used within an AIPipelineProvider');
  }
  return context;
}
