import { useEffect, useState } from 'react';
import { useNews } from '../hooks/useNews';
import { News } from '../interfaces';
import { getNews } from '../services/newsService';
import Spinner from '../components/Spinner';

export default function News() {
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useNews();
  const { news, selectedNews } = state;

  const onSelectNews = (data: News) => {
    dispatch({ type: 'selected-news', payload: { selectedNews: data } });
  };

  const setNews = async () => {
    const { data } = await getNews();
    if (data.length) dispatch({ type: 'add-news', payload: { news: data } });
    setLoading(false);
  };

  useEffect(() => {
    setNews();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        >
          {loading && <Spinner />}
        </div>
      ) : (
        <div className={`${news.length ? 'flex gap-4 overflow-x-auto' : null}`}>
          {news.length ? (
            news.map((n) => (
              <div
                key={n.id}
                className={`${
                  n.id === selectedNews.id ? 'bg-red-100' : ''
                } min-w-sm flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-4 rounded-md p-4 ease-in-out duration-100 cursor-pointer shadow-sm w-full max-w-2xl`}
                onClick={() => onSelectNews(n)}
              >
                <div className="w-full md:w-auto">
                  <p className="text-red-700 font-semibold">{n.title}</p>
                  <p className="font-bold text-sm">{n.date}</p>
                  <p className="font-bold text-sm uppercase">{n.author}</p>
                </div>

                <img
                  className="object-cover h-40 w-full md:w-40 md:h-40 rounded-md"
                  src={n.image_url}
                  alt={n.title}
                />
              </div>
            ))
          ) : (
            <p className="text-center my-12">No se han cargado noticias</p>
          )}
        </div>
      )}
    </>
  );
}
