'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CopilotContextType = {
  isOpen: boolean;
  openCopilot: (initialQuery?: string) => void;
  closeCopilot: () => void;
  toggleCopilot: () => void;
  initialQuery: string;
  clearInitialQuery: () => void;
};

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export function CopilotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  const openCopilot = (query?: string) => {
    if (query) setInitialQuery(query);
    setIsOpen(true);
  };

  const closeCopilot = () => {
    setIsOpen(false);
  };

  const toggleCopilot = () => {
    setIsOpen(prev => !prev);
  };

  const clearInitialQuery = () => {
    setInitialQuery('');
  };

  return (
    <CopilotContext.Provider
      value={{
        isOpen,
        openCopilot,
        closeCopilot,
        toggleCopilot,
        initialQuery,
        clearInitialQuery,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
}

export function useCopilot(): CopilotContextType {
  const ctx = useContext(CopilotContext);
  if (!ctx) {
    return {
      isOpen: false,
      openCopilot: () => {},
      closeCopilot: () => {},
      toggleCopilot: () => {},
      initialQuery: '',
      clearInitialQuery: () => {},
    };
  }
  return ctx;
}
