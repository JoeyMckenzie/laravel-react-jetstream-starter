import type { PropsWithChildren } from "react";

interface Props {
    message?: string;
    className?: string;
}

export default function InputError({
    message,
    className,
    children,
}: PropsWithChildren<Props>) {
    if (!message && !children) {
        return null;
    }
    return (
        <div className={className}>
            <p className="text-red-600 text-sm dark:text-red-400">
                {message || children}
            </p>
        </div>
    );
}
