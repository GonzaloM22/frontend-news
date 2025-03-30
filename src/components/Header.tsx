import { Button } from '@headlessui/react';
import { useNews } from '../hooks/useNews';
interface Props {
  setIsOpen: (open: boolean) => void;
}

export default function Header({ setIsOpen }: Props) {
  const { state, dispatch } = useNews();
  const { selectedNews } = state;

  const handleDelete = (id: string) =>
    dispatch({
      type: 'delete-news',
      payload: { id },
    });

  return (
    <header className=" flex justify-between bg-red-700 py-6 max-h-72 px-20">
      <h1 className="text-left text-gray-100 text-4xl">MFNews</h1>

      <div className="space-x-8">
        {selectedNews.id && (
          <Button
            onClick={() => handleDelete(selectedNews.id!)}
            className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 data-[hover]:bg-red-500 data-[active]:bg-red-700"
          >
            Eliminar noticia
          </Button>
        )}

        <Button
          onClick={() => setIsOpen(true)}
          className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 data-[hover]:bg-red-500 data-[active]:bg-red-700"
        >
          Nueva noticia
        </Button>
      </div>
    </header>
  );
}
