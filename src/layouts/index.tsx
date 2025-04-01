import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNews } from "../hooks/useNews";
import NewsForm from '../components/NewsForm';
import Header from '../components/Header';
import NewsDetail from '../components/NewsDetail';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useNews();

  const { news } = state;

  return (
    <>
      <Header setIsOpen={setIsOpen} />

      <main className={`${news.length ? "flex gap-8" : null} p-4`}>
        <Outlet />
        <NewsForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </main>
      <NewsDetail />
    </>
  );
}
