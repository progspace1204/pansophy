import React from 'react'
const Select = (props) => {

    return (
        <div className="pansophy-input">
            <label htmlFor={props.name} className="flex text-xs font-medium text-white">
                {props.label}

                {props?.additional?.label && props?.additional?.url &&
                    <a href={props?.additional?.url} target="_blank" className="ml-auto font-medium text-xs text-app-blue hover:text-app-blue hover:underline">{props.additional.label}</a>}
            </label>
            <div className="mt-1">
                <textarea
                    name={props.name}
                    id={props.name}
                    required
                    onChange={props.onChange}
                    value={props.value}
                    className="bg-transparent block w-full sm:text-sm border-app-border rounded-md"
                    rows={10}
                    {...props?.options}
                >{props?.defaultValue}</textarea>
            </div>
        </div>
    );
}

export default Select;