import ActionMessage from "@/Components/ActionMessage";
import FormSection from "@/Components/FormSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import type { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import classNames from "classnames";

export default function CreateTeamForm() {
    const page = usePage<PageProps>();
    const form = useForm({
        name: "",
    });

    function createTeam() {
        form.post(route("teams.store"), {
            errorBag: "createTeam",
            preserveScroll: true,
        });
    }

    return (
        <FormSection
            onSubmit={createTeam}
            title={"Team Details"}
            description={
                "Create a new team to collaborate with others on projects."
            }
            renderActions={() => (
                <>
                    <ActionMessage
                        on={form.recentlySuccessful}
                        className="mr-3"
                    >
                        Saved.
                    </ActionMessage>

                    <PrimaryButton
                        className={classNames({
                            "opacity-25": form.processing,
                        })}
                        disabled={form.processing}
                    >
                        Save
                    </PrimaryButton>
                </>
            )}
        >
            <div className="col-span-6">
                <InputLabel value="Team Owner" />

                <div className="mt-2 flex items-center">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={page.props.auth.user?.profile_photo_url}
                        alt={page.props.auth.user?.name}
                    />

                    <div className="ml-4 leading-tight">
                        <div className="text-gray-900 dark:text-white">
                            {page.props.auth.user?.name}
                        </div>
                        <div className="text-gray-700 text-sm dark:text-gray-300">
                            {page.props.auth.user?.email}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
                <InputLabel htmlFor="name" value="Team Name" />
                <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={(e) =>
                        form.setData("name", e.currentTarget.value)
                    }
                    autoFocus
                />
                <InputError message={form.errors.name} className="mt-2" />
            </div>
        </FormSection>
    );
}
