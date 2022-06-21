import React from "react";
import { classNames } from "../oc6";

interface IInputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function InputForm({ label, ...props }: IInputFormProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className={classNames("flex lg:w-3/12 w-full")}>
            <label className="p-2 inline-block w-1/6">
                {label}
            </label>
            <input
                ref={inputRef}
                className={classNames("inline-block", "p-2", "border", "w-5/6", (props.readOnly ? "bg-gray-200" : ""))}
                {...props}
            />
        </div>
    );
}