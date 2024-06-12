import classNames from "classnames";
import type React from "react";
import type { PropsWithChildren } from "react";

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export default function SecondaryButton({
    children,
    ...props
}: PropsWithChildren<Props>) {
    return (
        <button
            {...props}
            className={classNames(
                "inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 text-xs uppercase tracking-widest shadow-sm transition duration-150 ease-in-out dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-50 dark:text-gray-300 disabled:opacity-25 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-2",
                props.className,
            )}
        >
            {children}
        </button>
    );
}
