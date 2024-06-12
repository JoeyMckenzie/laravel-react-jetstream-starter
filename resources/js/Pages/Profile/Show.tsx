import SectionBorder from "@/Components/SectionBorder";
import AppLayout from "@/Layouts/AppLayout";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm";
import LogoutOtherBrowserSessions from "@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm";
import TwoFactorAuthenticationForm from "@/Pages/Profile/Partials/TwoFactorAuthenticationForm";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import type { PageProps, Session } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

interface Props {
    sessions: Session[];
    confirmsTwoFactorAuthentication: boolean;
}

export default function Show({
    sessions,
    confirmsTwoFactorAuthentication,
}: Props) {
    const page = usePage<PageProps>();

    return (
        <AppLayout
            title={"Profile"}
            renderHeader={() => (
                <h2 className="font-semibold text-gray-800 text-xl leading-tight dark:text-gray-200">
                    Profile
                </h2>
            )}
        >
            <div>
                <div className="mx-auto max-w-7xl py-10 lg:px-8 sm:px-6">
                    {page.props.jetstream.canUpdateProfileInformation ? (
                        <div>
                            <UpdateProfileInformationForm
                                user={page.props.auth.user}
                            />

                            <SectionBorder />
                        </div>
                    ) : null}

                    {page.props.jetstream.canUpdatePassword ? (
                        <div className="mt-10 sm:mt-0">
                            <UpdatePasswordForm />

                            <SectionBorder />
                        </div>
                    ) : null}

                    {page.props.jetstream.canManageTwoFactorAuthentication ? (
                        <div className="mt-10 sm:mt-0">
                            <TwoFactorAuthenticationForm
                                requiresConfirmation={
                                    confirmsTwoFactorAuthentication
                                }
                            />

                            <SectionBorder />
                        </div>
                    ) : null}

                    <div className="mt-10 sm:mt-0">
                        <LogoutOtherBrowserSessions sessions={sessions} />
                    </div>

                    {page.props.jetstream.hasAccountDeletionFeatures ? (
                        <>
                            <SectionBorder />

                            <div className="mt-10 sm:mt-0">
                                <DeleteUserForm />
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </AppLayout>
    );
}
