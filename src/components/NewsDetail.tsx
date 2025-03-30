import { useNews } from '../hooks/useNews';

export default function NewsDetail() {
  const { state } = useNews();

  const { selectedNews } = state;

  const { url, title, subtitle, description, author } = selectedNews;

  return (
      <div>
        <p className="text-red-700 font-semibold">{title}</p>
        <p className="font-bold text-3xl">{subtitle}</p>


        <img className="object-cover h-96" src={url} alt={title} />
        <p className="my-4">{author}</p>
        <p className="my-4">{description}</p>
      </div>

  );
}
