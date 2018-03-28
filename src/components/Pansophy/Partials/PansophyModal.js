import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {__} from '@wordpress/i18n'
import logo from '../../../images/logo.svg'

const PansophyModal = ({onClose, children, ...props}) => {
    const [open, setOpen] = useState(props?.open || false)

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="pansophy-app" onClose={onClose}>
                <div className="fixed z-[9999] inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-60 text-center sm:block sm:p-0">
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
                                className="relative inline-block align-bottom bg-app-glass text-left text-white shadow-xl transform transition-all w-full rounded-lg sm:align-middle sm:max-w-2xl xl:max-w-5xl sm:w-full">

                                <div
                                    className="flex items-center justify-between p-6 bg-app-glass border-b border-app-border rounded-t-lg">
                                    <h5 className="font-medium text-xl">{props.title}</h5>
                                    <button type="button" onClick={onClose} className="p-2">
                                        <svg width="14" height="2" viewBox="0 0 14 2" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13 1.75H1C0.59 1.75 0.25 1.41 0.25 1C0.25 0.59 0.59 0.25 1 0.25H13C13.41 0.25 13.75 0.59 13.75 1C13.75 1.41 13.41 1.75 13 1.75Z"
                                                fill="#10B981"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className="bg-pansophy-bgDark">
                                    {children}
                                </div>

                                <div
                                    className="flex items-center justify-center p-4 space-x-2 bg-pansophy-bgDark border-t border-pansophy-border rounded-b-lg">
                                    <span
                                        className="text-[10px] text-pansophy-text uppercase">{__('Provided by', 'pansophy')}</span>
                                    <img src={logo} alt="Pansophy Logo"/>
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </div>
                <div className="fixed bottom-10 right-10 z-[99999]">
                    <button type="button"
                            className="relative z-[999999] flex items-center justify-center w-16 h-16 bg-app-iconBlack rounded-full text-app-green"
                            onClick={() => onClose()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default PansophyModal;