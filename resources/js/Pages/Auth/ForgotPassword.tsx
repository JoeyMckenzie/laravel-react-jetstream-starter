import AuthenticationCard from "@/Components/AuthenticationCard";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import classNames from "classnames";
import type React from "react";

interface Props {
    status: string;
}

export default function ForgotPassword({ status }: Props) {
    const form = useForm({
        email: "",
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route("password.email"));
    }

    return (
        <AuthenticationCard>
            <Head title="Forgot Password" />

            <div className="mb-4 text-gray-600 text-sm dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-green-600 text-sm dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={onSubmit}>
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={(e) =>
                            form.setData("email", e.currentTarget.value)
                        }
                        required
                        autoFocus
                    />
                    <InputError className="mt-2" message={form.errors.email} />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton
                        className={classNames({
                            "opacity-25": form.processing,
                        })}
                        disabled={form.processing}
                    >
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticationCard>
    );
}
