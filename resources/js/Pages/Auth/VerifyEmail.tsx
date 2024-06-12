import AuthenticationCard from "@/Components/AuthenticationCard";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import classNames from "classnames";
import type React from "react";

interface Props {
    status: string;
}

export default function VerifyEmail({ status }: Props) {
    const form = useForm({});
    const verificationLinkSent = status === "verification-link-sent";

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route("verification.send"));
    }

    return (
        <AuthenticationCard>
            <Head title="Email Verification" />

            <div className="mb-4 text-gray-600 text-sm dark:text-gray-400">
                Before continuing, could you verify your email address by
                clicking on the link we just emailed to you? If you didn't
                receive the email, we will gladly send you another.
            </div>

            {verificationLinkSent && (
                <div className="mb-4 font-medium text-green-600 text-sm dark:text-green-400">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={onSubmit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton
                        className={classNames({
                            "opacity-25": form.processing,
                        })}
                        disabled={form.processing}
                    >
                        Resend Verification Email
                    </PrimaryButton>

                    <div>
                        <Link
                            href={route("profile.show")}
                            className="rounded-md text-gray-600 text-sm underline dark:hover:text-gray-100 dark:text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-2"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="ml-2 rounded-md text-gray-600 text-sm underline dark:hover:text-gray-100 dark:text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-2"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </AuthenticationCard>
    );
}
