import React, { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'


const PansophySelect = (props) => {
    const [selected, setSelected] = useState(props.items[0])
    useEffect(() => {
if (selected){
    console.log(selected)
    props.setValue(selected)

}




    }, [selected])
    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative w-full">
                <div className={`items-center w-full ${props?.srOnly ? 'hidden' : 'flex mb-4'}`}>
                    <label htmlFor="users"
                        className={`text-xs font-medium text-white ${props.srOnly ? 'sr-only' : 'block'}`}>
                        {props.label}
                    </label>

                    {props?.additional?.label && props?.additiona?.url &&
                        <a href={props?.additional?.url}
                            className="ml-auto font-medium text-xs text-app-blue hover:text-app-blue hover:underline">{props.additional.label}</a>}
                </div>
                <Listbox.Button
                    className={`relative flex items-center w-full bg-transparent text-sm text-pansophy-text`}>
                    <span>{selected.name}</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto">
                        <path
                            d="M10.6199 1.72083L6.81655 5.52416C6.36738 5.97333 5.63238 5.97333 5.18322 5.52416L1.37988 1.72083"
                            stroke="#10B981" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                </Listbox.Button>
                <Listbox.Options
                    className={`flex flex-col py-2 border border-app-border rounded-lg ${props?.absolute ? 'absolute bg-pansophy-bg w-full' : 'bg-transparent'} ${props?.toTop ? 'bottom-[100%]' : 'mt-5'}`}
                >
                    {props?.items?.map((item) => (
                        <Listbox.Option
                            key={item.id}
                            value={item}
                            disabled={item.unavailable}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={`flex my-0 py-2 px-4 w-full text-sm text-pansophy-text cursor-pointer hover:bg-primary ${active ? '' : ''
                                        }`}
                                >
                                    {item.name}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

export default PansophySelect;