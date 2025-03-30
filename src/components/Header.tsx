import { Button } from '@headlessui/react';
import { useNews } from '../hooks/useNews';

interface Props {
  setIsOpen: (open: boolean) => void;
}

export default function Header({ setIsOpen }: Props) {
  const { state, dispatch } = useNews();
  const { selectedNews } = state;

  const handleAddNews = () => {
    dispatch({
      type: 'isEditing',
      payload: { isEditing: false },
    });

    setIsOpen(true);
  };

  const handleDelete = (id: string) =>
    dispatch({
      type: 'delete-news',
      payload: { id },
    });

  const handleEdit = () => {
    dispatch({
      type: 'isEditing',
      payload: { isEditing: true },
    });

    setIsOpen(true);
  };

  return (
    <header className=" flex justify-between bg-red-700 py-6 max-h-72 px-20">
      <h1 className="text-left text-gray-100 text-4xl">MFNews</h1>

      <div className="flex items-center space-x-20">
        {selectedNews.id && (
          <div className="space-x-4">
            <Button
              onClick={() => handleDelete(selectedNews.id!)}
              className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 data-[hover]:bg-red-500 data-[active]:bg-red-700"
            >
              Eliminar noticia
            </Button>

            <Button
              onClick={handleEdit}
              className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 data-[hover]:bg-red-500 data-[active]:bg-red-700"
            >
              Editar noticia
            </Button>
          </div>
        )}

        <Button
          onClick={handleAddNews}
          className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 data-[hover]:bg-red-500 data-[active]:bg-red-700"
        >
          Nueva noticia
        </Button>
      </div>
    </header>
  );
}
