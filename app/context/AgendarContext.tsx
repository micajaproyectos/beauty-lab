"use client";

import { createContext, useCallback, useContext, useState } from "react";
import AgendarModal from "../components/AgendarModal";

type AgendarContextValue = {
  openAgendar: () => void;
  closeAgendar: () => void;
};

const AgendarContext = createContext<AgendarContextValue | null>(null);

export function AgendarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAgendar = useCallback(() => setIsOpen(true), []);
  const closeAgendar = useCallback(() => setIsOpen(false), []);

  return (
    <AgendarContext.Provider value={{ openAgendar, closeAgendar }}>
      {children}
      {isOpen && <AgendarModal onClose={closeAgendar} />}
    </AgendarContext.Provider>
  );
}

export function useAgendar() {
  const ctx = useContext(AgendarContext);
  if (!ctx) {
    throw new Error("useAgendar debe usarse dentro de <AgendarProvider>");
  }
  return ctx;
}
