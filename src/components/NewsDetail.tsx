import { useNews } from '../hooks/useNews';

export default function NewsDetail() {
  const { state } = useNews();

  const { selectedNews } = state;

  const { url, title, subtitle, description } = selectedNews;

  return (
    <div>
      <div>
        <p className="text-red-700 font-semibold">{title}</p>
        <p className="font-bold text-3xl">{subtitle}</p>

        <p className="my-4">{description}</p>

        <img src={url} alt={title} />
      </div>
    </div>
  );
}
