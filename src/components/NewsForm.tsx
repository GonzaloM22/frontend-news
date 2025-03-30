import { useNews } from '../hooks/useNews';
import { useForm } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface FormData {
  url: string;
  author: string;
  title: string;
  subtitle: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function NewsForm({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { dispatch } = useNews();

  const onSubmit = (data: FormData) =>
    dispatch({ type: 'add-news', payload: { news: data } });

  const handleOpenModal = () => setIsOpen(!isOpen);

  return (
    <Dialog open={isOpen} onClose={handleOpenModal} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="space-y-4 shadow w-full max-w-md rounded-xl bg-gray-100 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <DialogTitle className="font-bold text-xl">Nueva noticia</DialogTitle>

          <p>Completar los siguientes datos.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Url</label>
              <input
                {...register('url', { required: 'La URL es obligatoria' })}
                className="w-full border border-stone-400  p-2 rounded outline-0"
              />
              {errors.url && (
                <p className="text-red-500 text-sm">{errors.url.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Autor</label>
              <input
                {...register('author', { required: 'El autor es obligatorio' })}
                className="w-full border border-stone-400  p-2 rounded outline-0"
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Título</label>
              <input
                {...register('title', { required: 'El título es obligatorio' })}
                className="w-full border border-stone-400  p-2 rounded outline-0"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Subtítulo</label>
              <input
                {...register('subtitle')}
                className="w-full border border-stone-400 p-2 rounded outline-0"
              />
            </div>

            <div>
              <label className="block font-medium">Descripción</label>
              <textarea
                {...register('description')}
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
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default NewsForm;
