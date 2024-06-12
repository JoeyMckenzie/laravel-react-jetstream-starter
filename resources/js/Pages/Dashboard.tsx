import Welcome from "@/Components/Welcome";
import AppLayout from "@/Layouts/AppLayout";
import React from "react";

export default function Dashboard() {
    return (
        <AppLayout
            title="Dashboard"
            renderHeader={() => (
                <h2 className="font-semibold text-gray-800 text-xl leading-tight dark:text-gray-200">
                    Dashboard
                </h2>
            )}
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl lg:px-8 sm:px-6">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg dark:bg-gray-800">
                        <Welcome />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
