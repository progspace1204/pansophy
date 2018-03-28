import React, {Fragment} from 'react'
import {Link, NavLink} from "react-router-dom";
import {Transition, Popover} from "@headlessui/react";
import {__} from '@wordpress/i18n';
import Subscriptions from "./Subscriptions";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = ({onClick, page}) => {
    return (
        <div className='dall-e-2 text-white'>
            <div className="text-4xl font-semibold">
                <h3 className="text-white">Admin <span className="text-app-blue">Panel</span></h3>
            </div>

            <nav
                className="hidden lg:flex flex-col items-start lg:flex-row lg:items-center mt-14 border-y border-app-border">
                <NavLink to={`${pansophy_data.pansophy_url}`}
                         onClick={() => onClick('home')}
                         className={`px-4 lg:px-6 xl:px-10 py-2 lg:py-6 border-primary font-medium text-sm text-text-300 hover:text-white focus:text-white active:text-white ${page === 'home' ? 'border-b text-white' : ''}`}
                >{__('General', 'pansophy')}</NavLink>
                <NavLink to={`${pansophy_data.pansophy_url}&menu=history`}
                         onClick={() => onClick('history')}
                         className={`px-4 lg:px-6 xl:px-10 py-2 lg:py-6 border-primary font-medium text-sm text-text-300 hover:text-white focus:text-white active:text-white ${page === 'history' ? 'border-b text-white' : ''}`}
                >{__('History', 'pansophy')}</NavLink>
                <NavLink to={`${pansophy_data.pansophy_url}&menu=dall-e-2`}
                         className={`px-4 lg:px-6 xl:px-10 py-2 lg:py-6 border-primary font-medium text-sm text-text-300 hover:text-white focus:text-white active:text-white ${page === 'dall-e-2' ? 'border-b text-white' : ''}`}
                         onClick={() => onClick('dall-e-2')}
                >{__('DALL-E-2', 'pansophy')}</NavLink>
                <span
                    className="px-4 lg:px-6 xl:px-10 py-2 lg:py-6 font-medium text-sm text-text-700">{__('Models & Fine-Tuning', 'pansophy')}</span>
                <span
                    className="px-4 lg:px-6 xl:px-10 py-2 lg:py-6 font-medium text-sm text-text-700">{__('Datasets', 'pansophy')}</span>
                <span
                    className="px-4 lg:px-6 xl:px-10 py-2 lg:py-6 font-medium text-sm text-text-700">{__('Manage Subscriptions', 'pansophy')}</span>
            </nav>

            <Popover className="block z-0 relative lg:hidden">
                {({open}) => (
                    <>
                        <div className="relative z-10">
                            <div
                                className="flex mt-8 items-center justify-center px-4 py-3 sm:px-6 lg:px-8 border-y border-app-border">
                                <Popover.Button
                                    className={classNames(
                                        open ? 'text-white' : 'text-gray-400',
                                        'group rounded-md flex justify-center items-center w-full text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    )}
                                >
                                    {!open &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                        </svg>}
                                    {open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                  stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                    }
                                    {page === 'home' && <span className="ml-2">{__('General', 'pansophy')}</span>}
                                    {page === 'history' && <span className="ml-2">{__('History', 'pansophy')}</span>}
                                    {page === 'dall-e-2' && <span className="ml-2">{__('DALL-E-2', 'pansophy')}</span>}
                                </Popover.Button>
                            </div>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 inset-x-0 transform">
                                {({close}) => (
                                    <div
                                        className="relative max-w-7xl mx-auto grid grid-cols-1 bg-app-black shadow lg:grid-cols-2">
                                        <nav
                                            className="flex flex-col items-start">
                                            <NavLink to={`${pansophy_data.pansophy_url}`}
                                                     onClick={() => {
                                                         onClick('home');
                                                         close();
                                                     }}
                                                     className={`px-4 lg:px-6 xl:px-10 py-2 lg:py-6 border-primary font-medium text-sm text-text-300 hover:text-white ${page === 'home' ? 'border-l text-white' : ''}`}
                                            >{__('General', 'pansophy')}</NavLink>
                                            <NavLink to={`${pansophy_data.pansophy_url}&menu=history`}
                                                     onClick={() => {
                                                         onClick('history');
                                                         close();
                                                     }}
                                                     className={`px-4 lg:px-6 xl:px-10 py-2 lg:py-6 border-primary font-medium text-sm text-text-300 hover:text-white ${page === 'history' ? 'border-l text-white' : ''}`}
                                            >{__('History', 'pansophy')}</NavLink>
                                            <NavLink to={`${pansophy_data.pansophy_url}&menu=dall-e-2`}
                                                     className={`px-4 lg:px-6 xl:px-10 py-2 lg:py-6 border-primary font-medium text-sm text-text-300 hover:text-white ${page === 'dall-e-2' ? 'border-l text-white' : ''}`}
                                                     onClick={() => {
                                                         onClick('dall-e-2');
                                                         close();
                                                     }}
                                            >{__('DALL-E-2', 'pansophy')}</NavLink>
                                            <span
                                                className="px-4 lg:px-6 xl:px-10 py-2 lg:py-6 font-medium text-sm text-text-700">{__('Models & Fine-Tuning', 'pansophy')}</span>
                                            <span
                                                className="px-4 lg:px-6 xl:px-10 py-2 lg:py-6 font-medium text-sm text-text-700">{__('Datasets', 'pansophy')}</span>
                                            <span
                                                className="px-4 lg:px-6 xl:px-10 py-2 lg:py-6 font-medium text-sm text-text-700">{__('Manage Subscriptions', 'pansophy')}</span>
                                        </nav>
                                    </div>
                                )}
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>

            <Subscriptions/>
        </div>
    );
}

export default Header;