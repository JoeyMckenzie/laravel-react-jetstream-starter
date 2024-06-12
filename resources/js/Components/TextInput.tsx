import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";

const TextInput = forwardRef<
    HTMLInputElement,
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
>((props, ref) => (
    <input
        {...props}
        ref={ref}
        className={classNames(
            "rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:focus:border-indigo-600 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300 dark:focus:ring-indigo-600 focus:ring-indigo-500",
            props.className,
        )}
    />
));

export default TextInput;
