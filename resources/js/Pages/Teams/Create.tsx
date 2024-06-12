import AppLayout from "@/Layouts/AppLayout";
import CreateTeamForm from "@/Pages/Teams/Partials/CreateTeamForm";
import React from "react";

export default function Create() {
    return (
        <AppLayout
            title="Create Team"
            renderHeader={() => (
                <h2 className="font-semibold text-gray-800 text-xl leading-tight dark:text-gray-200">
                    Create Team
                </h2>
            )}
        >
            <div>
                <div className="mx-auto max-w-7xl py-10 lg:px-8 sm:px-6">
                    <CreateTeamForm />
                </div>
            </div>
        </AppLayout>
    );
}
