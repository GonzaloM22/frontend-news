import { useReducer, createContext, ActionDispatch, ReactNode } from 'react';
import {
  NewsActions,
  NewsReducer,
  NewsState,
  initialState,
} from '../reducers/news-reducer';

type NewsContextProps = {
  state: NewsState;
  dispatch: ActionDispatch<[action: NewsActions]>;
};

type NewsProviderProps = {
  children: ReactNode;
};

export const NewsContext = createContext<NewsContextProps>(null!);

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const [state, dispatch] = useReducer(NewsReducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
};
