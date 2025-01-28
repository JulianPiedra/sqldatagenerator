// useGlobalState.ts
import { useState, useEffect } from "react";

const globalState = {
  tableName: '' as string, // Estado inicial del nombre de la tabla
  allData: [] as any[], // Estado inicial de los datos
};

const listeners: (() => void)[] = []; // Lista de funciones para notificar cambios

export const useGlobalState = () => {
  const [, setInternalState] = useState(0); // Para forzar actualizaciones en los componentes que usan este hook

  const updateState = (newState: Partial<typeof globalState>) => {
    Object.assign(globalState, newState); // Actualiza el estado global
    listeners.forEach((listener) => listener()); // Notifica a los listeners
  };

  useEffect(() => {
    const listener = () => setInternalState((count) => count + 1); // Forzar re-render
    listeners.push(listener); // Agrega el listener
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1); // Elimina el listener al desmontar el componente
    };
  }, []);

  return [globalState, updateState] as const; // Retorna el estado y la función para actualizarlo
};
