import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useRef } from "react";
import { IconClose } from "../Icons";

type PostModalByIdProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalPostId: number | undefined;
  setModalPostId: (modalPostId: number | undefined) => void;
  title?: string;
  children: ReactNode;
  postId: number;
}

const PostModalById: React.FunctionComponent<PostModalByIdProps> = ({ isOpen, setIsOpen, modalPostId, setModalPostId, title, children, postId }) => {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={modalPostId === postId} as={Fragment}>
      <Dialog as="div" className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setIsOpen(false);
          setModalPostId(undefined)
        }
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    setModalPostId(undefined)
                  }}
                  ref={cancelButtonRef}>
                  <IconClose className="w-6 h-6 text-zinc-500 right-6 top-6 absolute" />
                </span>
                <div className="bg-white">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-zinc-900">
                        {title}
                      </Dialog.Title>
                      <div className="m-6">
                        <p className="text-zinc-900">
                          {children}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PostModalById;