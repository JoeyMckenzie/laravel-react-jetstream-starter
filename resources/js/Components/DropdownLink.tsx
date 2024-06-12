import { Link } from "@inertiajs/react";
import type { PropsWithChildren } from "react";

interface Props {
    as?: string;
    href?: string;
}

export default function DropdownLink({
    as,
    href,
    children,
}: PropsWithChildren<Props>) {
    return (
        <div>
            {(() => {
                switch (as) {
                    case "button":
                        return (
                            <button
                                type="submit"
                                className="block w-full px-4 py-2 text-left text-gray-700 text-sm leading-5 transition duration-150 ease-in-out dark:focus:bg-gray-800 dark:hover:bg-gray-800 focus:bg-gray-100 hover:bg-gray-100 dark:text-gray-300 focus:outline-none"
                            >
                                {children}
                            </button>
                        );
                    case "a":
                        return (
                            <a
                                href={href}
                                className="block px-4 py-2 text-gray-700 text-sm leading-5 transition duration-150 ease-in-out dark:focus:bg-gray-800 dark:hover:bg-gray-800 focus:bg-gray-100 hover:bg-gray-100 dark:text-gray-300 focus:outline-none"
                            >
                                {children}
                            </a>
                        );
                    default:
                        return (
                            <Link
                                href={href || ""}
                                className="block px-4 py-2 text-gray-700 text-sm leading-5 transition duration-150 ease-in-out dark:focus:bg-gray-800 dark:hover:bg-gray-800 focus:bg-gray-100 hover:bg-gray-100 dark:text-gray-300 focus:outline-none"
                            >
                                {children}
                            </Link>
                        );
                }
            })()}
        </div>
    );
}
