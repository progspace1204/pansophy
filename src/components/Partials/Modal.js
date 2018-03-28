import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'

const Modal = ({onClose, children, ...props}) => {
    const [open, setOpen] = useState(props?.open || false)

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="pansophy-app" onClose={onClose}>
                <div className="fixed z-[9999] inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-app-black/75 transition-opacity"/>
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="relative inline-block align-bottom bg-app-glass rounded-lg text-left text-white overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-3xl sm:w-full">

                                <div
                                    className="flex items-center justify-between p-6 bg-app-glass border-b border-app-border">
                                    <h5 className="font-medium text-xl">{props.title}</h5>
                                    <button type="button" onClick={onClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-10 bg-app-blackish">
                                    {children}
                                </div>

                                <div
                                    className="flex items-center p-6 bg-app-glass border-t border-app-border">
                                    <button type="button" onClick={onClose}
                                            className="py-4 px-8 w-full bg-iconBlue text-base text-white rounded-lg hover:bg-iconBlue/80">{props.buttonLabel}</button>
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Modal;