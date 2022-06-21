import React from "react";
import { classNames } from "../oc6";

interface IInputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    labelClassName?: string;
}

const handleClick = (ref: React.RefObject<HTMLInputElement>) => ref && ref.current && ref.current.select();

export function InputForm({ label, labelClassName, className, ...props }: IInputFormProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <>
            <label
                onClick={() => handleClick(inputRef)}
                className={classNames("p-2", "inline-block", "mx-2", "text-right", (labelClassName ?? ""))}
            >
                {label}
            </label>
            <input
                ref={inputRef}
                onClick={() => handleClick(inputRef)}
                className={classNames("inline-block", "p-2", "mx-2", "border", (className ?? ""), (props.readOnly ? "bg-gray-200" : ""))}
                {...props}
            />
        </>
    );
}