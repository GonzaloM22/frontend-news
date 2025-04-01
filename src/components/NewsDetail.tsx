import { useNews } from '../hooks/useNews';

export default function NewsDetail() {
  const { state } = useNews();
  const { selectedNews, news } = state;
  const { image_url, title, date, body, author } = selectedNews;

  return (
    <>
      {selectedNews.id && (
        <div className="p-4 flex justify-center">
          <div
            className={`${
              news.length ? 'shadow-md' : ''
            } p-8 rounded-md space-y-2 max-w-xl w-full`}
          >
            <p className="text-red-700 font-semibold">{title}</p>
            <p className="font-bold text-3xl">{date}</p>

            <img
              className="object-cover h-96 w-full rounded-md"
              src={image_url}
              alt={title}
            />
            <p>{author}</p>
            <p>{body}</p>
          </div>
        </div>
      )}
    </>
  );
}
