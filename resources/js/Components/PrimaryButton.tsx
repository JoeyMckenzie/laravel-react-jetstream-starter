import classNames from "classnames";
import type React from "react";
import type { PropsWithChildren } from "react";

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export default function PrimaryButton({
    children,
    ...props
}: PropsWithChildren<Props>) {
    return (
        <button
            {...props}
            className={classNames(
                "inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 font-semibold text-white text-xs uppercase tracking-widest transition duration-150 ease-in-out active:bg-gray-900 dark:active:bg-gray-300 dark:bg-gray-200 dark:focus:bg-white dark:hover:bg-white focus:bg-gray-700 hover:bg-gray-700 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-2",
                props.className,
            )}
        >
            {children}
        </button>
    );
}
