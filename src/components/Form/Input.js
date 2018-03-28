import React from 'react'
const Input = (props) => {

    return (
        <div className="pansophy-input">
            <label htmlFor={props.name} className="flex text-xs font-medium text-white">
                {props.label}

                {props?.additional?.label && props?.additional?.url &&
                    <a href={props?.additional?.url} target="_blank" className="ml-auto font-medium text-xs text-app-blue hover:text-app-blue hover:underline">{props.additional.label}</a>}
            </label>
            <div className="mt-1">
                <input
                    type={props?.type || 'text'}
                    name={props.name}
                    id={props.name}
                    onChange={props.onChange}
                    value={props.value}
                    required
                    className="bg-transparent focus:ring-white focus:border-white block w-full sm:text-sm border-app-border rounded-md"
                    {...props?.options}
                />
            </div>
        </div>
    );
}

export default Input;