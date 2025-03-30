import { useState } from 'react';
import { useNews } from './hooks/useNews';
import NewsForm from './components/NewsForm';
import NewsList from './components/NewsList';
import Header from './components/Header';
import NewsDetail from './components/NewsDetail';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useNews();
  const { news } = state;

  return (
    <>
      <Header setIsOpen={setIsOpen} />

      {news.length ? (
        <main className="grid grid-cols-[20%_70%] px-10 pt-10 gap-12 over">
          <NewsList />
          <NewsDetail />
        </main>
      ) : (
        <p className="text-center my-12">No se han cargado noticias</p>
      )}

      <NewsForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default App;
