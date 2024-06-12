import classNames from "classnames";
import type React from "react";
import type { PropsWithChildren } from "react";

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export default function DangerButton({
    children,
    ...props
}: PropsWithChildren<Props>) {
    return (
        <button
            {...props}
            className={classNames(
                "inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-semibold text-white text-xs uppercase tracking-widest transition duration-150 ease-in-out active:bg-red-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 focus:ring-offset-2",
                props.className,
            )}
        >
            {children}
        </button>
    );
}
