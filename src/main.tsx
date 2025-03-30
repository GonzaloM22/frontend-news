import { StrictMode } from 'react';
import { NewsProvider } from './context/NewsContext.tsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </StrictMode>
);
