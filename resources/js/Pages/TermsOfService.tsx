import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo";
import { Head } from "@inertiajs/react";

interface Props {
    terms: string;
}

export default function TermsOfService({ terms }: Props) {
    return (
        <div className="font-sans text-gray-900 antialiased dark:text-gray-100">
            <Head title="Terms of Service" />

            <div className="bg-gray-100 pt-4 dark:bg-gray-900">
                <div className="flex min-h-screen flex-col items-center pt-6 sm:pt-0">
                    <div>
                        <AuthenticationCardLogo />
                    </div>

                    <div
                        className="prose dark:prose-invert mt-6 w-full overflow-hidden bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg dark:bg-gray-800"
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled input
                        dangerouslySetInnerHTML={{ __html: terms }}
                    />
                </div>
            </div>
        </div>
    );
}
