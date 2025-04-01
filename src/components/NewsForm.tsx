import { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import { useForm } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { News } from '../interfaces';
import { addNews, editNews, getNews } from '../services/newsService';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function NewsForm({ isOpen, setIsOpen }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<News>();

  const { dispatch, state } = useNews();

  const { selectedNews, isEditing } = state;

  useEffect(() => {
    if (isEditing && isOpen) {
      setValue('image_url', selectedNews.image_url);
      setValue('author', selectedNews.author);
      setValue('title', selectedNews.title);
      setValue('date', selectedNews.date);
      setValue('body', selectedNews.body);
    }
  }, [isEditing, isOpen]);

  const onSubmit = async (data: News) => {
    setLoading(true);
    if (isEditing) {
      //Edicion
      const newData = { ...data, id: selectedNews.id };

      const result = await editNews(selectedNews.id, newData);

      if (result) {
        dispatch({
          type: 'edit-news',
          payload: { news: newData },
        });
      }
    } else {
      //Nuevo
      const newData = { ...data, id: uuidv4() };

      const result = await addNews(data);

      if (result) {
        dispatch({
          type: 'add-news',
          payload: { news: newData },
        });
      }
    }
    setIsOpen(false);
    reset();
    setLoading(false);

    const { data: res } = await getNews();
    if (res.length) dispatch({ type: 'add-news', payload: { news: res } });
  };

  const handleOpenModal = () => {
    reset();
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onClose={handleOpenModal} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="space-y-4 shadow w-full max-w-md min-h-[660px] rounded-xl bg-gray-100 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <DialogTitle className="font-bold text-xl">
                Nueva noticia
              </DialogTitle>
              <p>Completar los siguientes datos.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block font-medium">Url</label>
                  <input
                    {...register('image_url', {
                      required: 'La URL es obligatoria',
                    })}
                    className="w-full border border-stone-400  p-2 rounded outline-0"
                  />
                  {errors.image_url && (
                    <p className="text-red-500 text-sm">
                      {errors.image_url.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Autor</label>
                  <input
                    {...register('author', {
                      required: 'El autor es obligatorio',
                    })}
                    className="w-full border border-stone-400  p-2 rounded outline-0"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm">
                      {errors.author.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Título</label>
                  <input
                    {...register('title', {
                      required: 'El título es obligatorio',
                    })}
                    className="w-full border border-stone-400  p-2 rounded outline-0"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Fecha</label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full border border-stone-400 p-2 rounded outline-0"
                  />
                </div>

                <div>
                  <label className="block font-medium">Descripción</label>
                  <textarea
                    {...register('body')}
                    className="w-full border border-stone-400 p-2 rounded outline-0"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleOpenModal}
                    type="button"
                    className="bg-gray-200 px-4 py-2 rounded shadow"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-red-700 text-white px-4 py-2 rounded shadow"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default NewsForm;
