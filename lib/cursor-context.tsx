'use client';

import React, { createContext, useContext, useState } from 'react';

type CursorType = 'default' | 'hover' | 'text' | 'project';

interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  projectColor: string;
  setCursorType: (type: CursorType) => void;
  setCursorText: (text: string) => void;
  setProjectColor: (color: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorTypeState] = useState<CursorType>('default');
  const [cursorText, setCursorTextState] = useState<string>('');
  const [projectColor, setProjectColorState] = useState<string>('');

  const setCursorType = (type: CursorType) => setCursorTypeState(type);
  const setCursorText = (text: string) => setCursorTextState(text);
  const setProjectColor = (color: string) => setProjectColorState(color);

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        cursorText,
        projectColor,
        setCursorType,
        setCursorText,
        setProjectColor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
