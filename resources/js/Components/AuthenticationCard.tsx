import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo";
import React, { type PropsWithChildren } from "react";

export default function AuthenticationCard({
    children,
}: PropsWithChildren<Record<string, unknown>>) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center dark:bg-gray-900 sm:pt-0">
            <div>
                <AuthenticationCardLogo />
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
