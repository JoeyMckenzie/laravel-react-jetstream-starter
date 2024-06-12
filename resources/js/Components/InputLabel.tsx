import React, { type PropsWithChildren } from "react";

interface Props {
    value?: string;
    htmlFor?: string;
}

export default function InputLabel({
    value,
    htmlFor,
    children,
}: PropsWithChildren<Props>) {
    return (
        <label
            className="block font-medium text-gray-700 text-sm dark:text-gray-300"
            htmlFor={htmlFor}
        >
            {value || children}
        </label>
    );
}
