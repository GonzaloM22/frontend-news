import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';
import Spinner from './Spinner';

interface Props {
  isOpen: boolean;
  loading: boolean;
  setIsOpen: (open: boolean) => void;
  onOk: () => Object;
}

export default function ConfirmationModal({
  isOpen,
  loading,
  setIsOpen,
  onOk,
}: Props) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => !loading && setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        >
          {loading && <Spinner />}
        </div>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-gray-50 px-8 py-6 rounded-xl border-0">
            <DialogTitle className="font-bold">Eliminar</DialogTitle>
            <p className="text-center">
              ¿Eliminar noticia? Esta acción no es reversible.
            </p>
            <div className="flex justify-between gap-4">
              <Button
                disabled={loading}
                className="text-red-700 border px-8 py-2 rounded-xl border-red-700 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                disabled={loading}
                className="bg-red-700 py-2 px-8 rounded-xl text-gray-100 cursor-pointer"
                onClick={onOk}
              >
                Aceptar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
