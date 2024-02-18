'use client';
import { createContext, useContext, useReducer } from 'react';

// Initial state
interface AppState {
  firstName: string | undefined;
  lastName: string | undefined;
  dispatch?: React.Dispatch<AppAction>;
}

const initialState: AppState = {
  firstName: undefined,
  lastName: undefined,
};

export enum AppActionTypes {
  SET_FIRST_NAME = 'SET_FIRST_NAME',
  SET_LAST_NAME = 'SET_LAST_NAME',
}

interface AppAction {
  type: AppActionTypes;
  payload: string | undefined;
}

// Create an App Context
const AppContext = createContext<AppState>(initialState);

// Create a provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const reducer = (state: AppState, action: AppAction) => {
    switch (action.type) {
      case AppActionTypes.SET_FIRST_NAME:
        return { ...state, firstName: action.payload };
      case AppActionTypes.SET_LAST_NAME:
        return { ...state, lastName: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be inside a AppProvider');
  }
  return context;
};
