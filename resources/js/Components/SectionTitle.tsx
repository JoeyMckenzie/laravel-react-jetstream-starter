import React from "react";

interface Props {
    title: string;
    description: string;
}

export default function SectionTitle({ title, description }: Props) {
    return (
        <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
                <h3 className="font-medium text-gray-900 text-lg dark:text-gray-100">
                    {title}
                </h3>

                <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
}
