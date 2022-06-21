import { ButtonColor } from "../models";
import { classNames } from "../oc6";

interface IOutlinedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonColor: ButtonColor
}

export function OutlinedButton({ buttonColor, className, ...props }: IOutlinedButtonProps) {
    if (props.disabled) {
        buttonColor = ButtonColor.Grey;
    }

    function getColor() {
        switch (buttonColor) {
            case ButtonColor.Lime: {
                return classNames("border-lime-500", "hover:bg-lime-500", "hover:text-white");
            }
            case ButtonColor.Orange: {
                return classNames("border-orange-600", "hover:bg-orange-600", "hover:text-white");
            }
            case ButtonColor.Grey:
            default: {
                return classNames("border-gray-300", "hover:bg-gray-300", "hover:text-white");
            }
        }
    }

    const colorClassName: string = getColor();

    return (
        <button
            className={classNames("inline-block", "border-4", "border-solid", "shadow-lg", "p-2", colorClassName, className ?? "")}
            type="button"
            {...props}
        >
            {props.children}
        </button>
    );
}