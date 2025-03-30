export default function NewsList({ news }: Array) {
  console.log('news', news);
  return (
    <div>
      {/* {news.map((n) => (
        <>
          <p>{n.titulo}</p>
          <p>{n.subtitulo}</p>

          <p>{n.url}</p>

          <p>{n.descripcion}</p>
        </>
      ))} */}
    </div>
  );
}
