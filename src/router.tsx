import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import News from './pages/News';
import NewsDetail from "./components/NewsDetail";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <News />,
      },
      {
        path: "/noticias/detalle",
        element: <NewsDetail />,
      },
    ],
  },
]);
