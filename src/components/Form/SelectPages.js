import React, {useState} from 'react'
import {__} from '@wordpress/i18n'

const pages = [
    {id: 1, name: 'Homepage', parent: 0},
    {id: 2, name: 'About us', parent: 0},
    {id: 3, name: 'Category', parent: 0},
    {id: 4, name: 'Sub Category', parent: 1},
    {id: 5, name: 'Dashboard', parent: 0},
]

const Select = (props) => {
    const [selected, setSelected] = useState([])

    const handleSelected = (pageId) => {
        if ( props.value.includes(pageId)) {
            const array = props.value.filter(item => item !== pageId);
            props.formik.setFieldValue("pages",[...array])
        } else {
            // setSelected(prevState => [...prevState, pageId]);
        props.formik.setFieldValue("pages",[...props.value,pageId])
        }
    }

    const handleSelectAll = () => {
        // pages && pages.forEach(page => setSelected(prevState => [...prevState, page.id]))

        const maped  =  pages.map((item)=>item.id)
        props.formik.setFieldValue("pages",[...maped])
    }

    return (
        <fieldset>
            <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <button type="button"
                            className="flex items-center justify-center py-4 p-x-8 w-full bg-app-blackish border border-app-border rounded-lg text-sm text-white hover:bg-app-black/80"
                            onClick={() => handleSelectAll()}
                    >{__('Select All', 'pansophy')}</button>
                </div>
                <div className="col-span-1">
                    {props.value.length > 0 && <button type="button"
                                                    className={`flex items-center justify-center py-4 p-x-8 w-full bg-[#070f19] border border-[#033e89] rounded-lg text-sm text-white hover:bg-iconBlue/10`}
                                                    onClick={() =>  props.formik.setFieldValue("pages",[])}
                    >{__('Unselect All', 'pansophy')} {props.value.length > 0 ? `- ${props.value.length}` : ''}</button>
                    }
                    {props.value.length === 0 && <div
                        className={`flex items-center justify-center py-4 p-x-8 w-full bg-app-blackish border border-app-border rounded-lg text-sm text-text-300 opacity-[0.35]`}
                        onClick={() => handleSelectAll()}
                    >{__('Unselect All', 'pansophy')} {props.value.length > 0 ? `- ${props.value.length}` : ''}</div>
                    }
                </div>
            </div>

            <div className="bg-app-blacker border border-app-border rounded-lg max-h-[380px] overflow-auto">

                {pages.map((page, pageIdx) => (
                    <div key={pageIdx}
                         className="relative flex items-start border-b border-app-border last:border-none">
                        <div className="flex items-center mx-4 relative top-6">
                            <input
                                id={`page-${page.id}`}
                                name={`page-${page.id}`}
                                type="checkbox"
                                className="pansophy-checkbox bg-transparent focus:ring-white h-8 w-8 text-indigo-600 border-app-border rounded"
                                onChange={() => handleSelected(page.id)}
                                checked={props.value.includes(page.id)}

                            />
                        </div>
                        <div
                            className={`min-w-0 flex-1 text-sm py-5 border-l border-app-border ${page.parent > 0 ? 'pl-8' : 'pl-4'}`}>
                            <label htmlFor={`page-${page.id}`}
                                   className="font-default text-base text-white select-none">
                                {page.name}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}

export default Select;