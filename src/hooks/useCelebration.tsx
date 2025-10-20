'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CelebrationAnimation } from '@/components/gamification/CelebrationAnimation';

interface CelebrationContextType {
  showCelebration: (message: string) => void;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>(undefined);

export const CelebrationProvider = ({ children }: { children: ReactNode }) => {
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  const showCelebration = useCallback((message: string) => {
    setCelebrationMessage(message);
  }, []);

  const handleClose = useCallback(() => {
    setCelebrationMessage(null);
  }, []);

  return (
    <CelebrationContext.Provider value={{ showCelebration }}>
      {children}
      <CelebrationAnimation message={celebrationMessage} onClose={handleClose} />
    </CelebrationContext.Provider>
  );
};

export const useCelebration = () => {
  const context = useContext(CelebrationContext);
  if (context === undefined) {
    throw new Error('useCelebration must be used within a CelebrationProvider');
  }
  return context;
};