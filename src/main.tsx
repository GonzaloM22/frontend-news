import { StrictMode } from 'react';
import { NewsProvider } from './context/NewsContext.tsx';
import { createRoot } from 'react-dom/client';
import { router } from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import './index.css';
// import App from './App.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsProvider>
      <RouterProvider router={router}/>
    </NewsProvider>
  </StrictMode>
);
