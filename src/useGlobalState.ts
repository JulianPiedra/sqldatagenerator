import { useState, useEffect } from "react";

const globalState = {
  tableName: '' as string, 
  allData: [] as any[], 
  records: 0 as number,
};

const listeners: (() => void)[] = []; 

export const useGlobalState = () => {
  const [, setInternalState] = useState(0); 

  const updateState = (newState: Partial<typeof globalState>) => {
    Object.assign(globalState, newState); 
    listeners.forEach((listener) => listener()); 
  };

  useEffect(() => {
    const listener = () => setInternalState((count) => count + 1); 
    listeners.push(listener); 
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1); 
    };
  }, []);

  return [globalState, updateState] as const; 
};
