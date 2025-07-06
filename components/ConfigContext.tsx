import React, { createContext, useContext, useState } from 'react';

export interface Timer {
  id: string;
  nome: string;
  preparar: number;
  exercicio: number;
  descanso: number;
  rodadas: number;
  ciclos: number;
  descansoEntreCiclos: number;
}

interface ConfigContextType {
  timers: Timer[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  updateTimer: (timer: Timer) => void;
  deleteTimer: (id: string) => void;
  createTimer: (timer: Omit<Timer, 'id'>) => void;
}

const defaultTimers: Timer[] = [
  {
    id: '1',
    nome: 'Tabata Clássico',
    preparar: 10,
    exercicio: 20,
    descanso: 10,
    rodadas: 8,
    ciclos: 1,
    descansoEntreCiclos: 60,
  },
  {
    id: '2',
    nome: 'HIIT Intenso',
    preparar: 15,
    exercicio: 30,
    descanso: 15,
    rodadas: 10,
    ciclos: 2,
    descansoEntreCiclos: 120,
  },
  {
    id: '3',
    nome: 'Treino Rápido',
    preparar: 5,
    exercicio: 15,
    descanso: 5,
    rodadas: 6,
    ciclos: 1,
    descansoEntreCiclos: 30,
  },
  {
    id: '4',
    nome: 'Timer Personalizado',
    preparar: 0,
    exercicio: 0,
    descanso: 0,
    rodadas: 0,
    ciclos: 0,
    descansoEntreCiclos: 0,
  },
];

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [timers, setTimers] = useState<Timer[]>(defaultTimers);
  const [selectedId, setSelectedId] = useState<string>('1');

  const updateTimer = (updatedTimer: Timer) => {
    setTimers(prev => prev.map(timer => 
      timer.id === updatedTimer.id ? updatedTimer : timer
    ));
  };

  const deleteTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
    if (selectedId === id && timers.length > 1) {
      const remainingTimers = timers.filter(timer => timer.id !== id);
      setSelectedId(remainingTimers[0].id);
    }
  };

  const createTimer = (timerData: Omit<Timer, 'id'>) => {
    const newId = (Math.max(...timers.map(t => parseInt(t.id))) + 1).toString();
    const newTimer: Timer = {
      id: newId,
      ...timerData,
    };
    setTimers(prev => [...prev, newTimer]);
    setSelectedId(newId);
  };

  return (
    <ConfigContext.Provider value={{
      timers,
      selectedId,
      setSelectedId,
      updateTimer,
      deleteTimer,
      createTimer,
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
} 