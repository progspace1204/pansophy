import React from 'react'

const Pagination = () => {
    return (
        <nav className="flex items-center justify-center sm:px-0">
            <div className="-mt-px flex-1 flex items-center justify-center space-x-2">
                <a
                    href="#"
                    className="border border-app-border p-2 flex items-center justify-center w-[40px] h-[40px] rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:border-white"
                >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.37996 12.5466C6.25329 12.5466 6.12663 12.5 6.02663 12.4L1.97996 8.35329C1.78663 8.15996 1.78663 7.83996 1.97996 7.64662L6.02663 3.59996C6.21996 3.40662 6.53996 3.40662 6.73329 3.59996C6.92663 3.79329 6.92663 4.11329 6.73329 4.30662L3.03996 7.99996L6.73329 11.6933C6.92663 11.8866 6.92663 12.2066 6.73329 12.4C6.63996 12.5 6.50663 12.5466 6.37996 12.5466Z"/>
                        <path
                            d="M13.6668 8.5H2.44678C2.17344 8.5 1.94678 8.27333 1.94678 8C1.94678 7.72667 2.17344 7.5 2.44678 7.5H13.6668C13.9401 7.5 14.1668 7.72667 14.1668 8C14.1668 8.27333 13.9401 8.5 13.6668 8.5Z"/>
                    </svg>
                </a>
                <a
                    href="#"
                    className="border border-app-border p-2 flex items-center justify-center w-[40px] h-[40px] rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:border-white"
                >
                    1
                </a>
                <a
                    href="#"
                    className="border border-app-border p-2 flex items-center justify-center w-[40px] h-[40px] rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:border-white"
                    aria-current="page"
                >
                    2
                </a>
                <a
                    href="#"
                    className="bg-iconBlue border border-iconBlue p-2 flex items-center justify-center w-[40px] h-[40px] rounded-lg text-sm font-medium text-white hover:bg-iconBlue hover:text-white hover:border-white"
                >
                    3
                </a>
                <span
                    className="border border-app-border p-2 flex items-center justify-center w-[40px] h-[40px] rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:border-white">...</span>
                <a
                    href="#"
                    className="border border-app-border p-2 flex items-center justify-center w-[40px] h-[40px] rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:border-white"
                >
                    8
                </a>
            </div>
        </nav>
    );
}

export default Pagination;