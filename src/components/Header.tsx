import { useState } from 'react';
import { Button, Input } from '@headlessui/react';
import { useNews } from '../hooks/useNews';
import { deleteNews, getNewsByAuthor, getNews } from '../services/newsService';
import ConfirmationModal from './ConfirmationModal';
import clsx from 'clsx';

interface Props {
  setIsOpen: (open: boolean) => void;
}

export default function Header({ setIsOpen }: Props) {
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useNews();
  const { selectedNews } = state;

  const handleAddNews = () => {
    dispatch({
      type: 'isEditing',
      payload: { isEditing: false },
    });
    setIsOpen(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteNews(selectedNews.id);
    setLoading(false);
    if (!res) return setConfirmModal(false);

    dispatch({
      type: 'delete-news',
      payload: { id: selectedNews.id! },
    });
    setConfirmModal(false);
  };

  const handleEdit = () => {
    dispatch({
      type: 'isEditing',
      payload: { isEditing: true },
    });
    setIsOpen(true);
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLoading(true);
    const value = e.currentTarget.value;
    let data;
    if (!value) {
      const allData = await getNews();
      data = allData.data;
    } else {
      const result = await getNewsByAuthor(value);
      data = result.data;
    }

    if (data.length) {
      dispatch({
        type: 'add-news',
        payload: { news: data },
      });
    }
    setLoading(false)
  };

  return (
    <header className="flex flex-wrap items-center justify-between shadow-md bg-red-700 py-6 px-4 sm:px-10 md:px-20">
      <div className="flex items-center gap-12">
        <h1 className="text-gray-100 text-3xl sm:text-4xl w-full sm:w-auto text-center sm:text-left">
          MFNews
        </h1>
        <Input
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
          placeholder="Buscar por nombre y/autor"
          className={clsx(
            'block min-w-54 rounded-lg border border-gray-50 bg-white/20 py-1.5 px-4 text-sm/6 text-gray-50'
          )}
        />
      </div>

      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
        {selectedNews?.id && (
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
            <Button
              onClick={() => setConfirmModal(true)}
              className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700w-full sm:w-auto"
            >
              Eliminar noticia
            </Button>

            <Button
              onClick={handleEdit}
              className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 w-full sm:w-auto"
            >
              Editar noticia
            </Button>
          </div>
        )}

        <Button
          onClick={handleAddNews}
          className="rounded bg-gray-100 py-2 px-4 text-sm text-red-700 w-full sm:w-auto"
        >
          Nueva noticia
        </Button>
      </div>
      <ConfirmationModal
        loading={loading}
        onOk={handleDelete}
        isOpen={confirmModal}
        setIsOpen={setConfirmModal}
      />
    </header>
  );
}
