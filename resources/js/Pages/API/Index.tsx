import AppLayout from "@/Layouts/AppLayout";
import APITokenManager from "@/Pages/API/Partials/ApiTokenManager";
import type { ApiToken } from "@/types";
import React from "react";

interface Props {
    tokens: ApiToken[];
    availablePermissions: string[];
    defaultPermissions: string[];
}

export default function ApiTokenIndex({
    tokens,
    availablePermissions,
    defaultPermissions,
}: Props) {
    return (
        <AppLayout
            title={"API Tokens"}
            renderHeader={() => (
                <h2 className="font-semibold text-gray-800 text-xl leading-tight dark:text-gray-200">
                    API Tokens
                </h2>
            )}
        >
            <div>
                <div className="mx-auto max-w-7xl py-10 lg:px-8 sm:px-6">
                    <APITokenManager
                        tokens={tokens}
                        availablePermissions={availablePermissions}
                        defaultPermissions={defaultPermissions}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
