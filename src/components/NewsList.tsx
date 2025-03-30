import { useNews } from '../hooks/useNews';
import { News } from '../interfaces';

export default function NewsList() {
  const { state, dispatch } = useNews();

  const { news, selectedNews } = state;

  const onSelectNews = (data: News) => {
    dispatch({ type: 'selected-news', payload: { selectedNews: data } });
  };

  return (
    <div>
      {news.map((n) => (
        <div
          className={`${
            n.id === selectedNews.id ? 'bg-red-100' : null
          } flex items-center gap-10 mb-4 rounded-md p-4 ease-in-out duration-100 cursor-pointer shadow-sm`}
          onClick={() => onSelectNews(n)}
        >
          <div>
            <p className="text-red-700 font-semibold">{n.title}</p>
            <p className="font-bold text-sm">"{n.subtitle}"</p>

            <p className="font-bold text-sm uppercase">{n.author}</p>
          </div>

          <img className="object-cover h-40 w-40" src={n.url} alt={n.title} />
        </div>
      ))}
    </div>
  );
}
