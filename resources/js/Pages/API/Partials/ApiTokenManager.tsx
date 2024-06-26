import ActionMessage from "@/Components/ActionMessage";
import ActionSection from "@/Components/ActionSection";
import Checkbox from "@/Components/Checkbox";
import ConfirmationModal from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import DialogModal from "@/Components/DialogModal";
import FormSection from "@/Components/FormSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SectionBorder from "@/Components/SectionBorder";
import TextInput from "@/Components/TextInput";
import type { ApiToken, Nullable, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import classNames from "classnames";
import { useState } from "react";

interface Props {
    tokens: ApiToken[];
    availablePermissions: string[];
    defaultPermissions: string[];
}

export default function ApiTokenManager({
    tokens,
    availablePermissions,
    defaultPermissions,
}: Props) {
    const createApiTokenForm = useForm({
        name: "",
        permissions: defaultPermissions,
    });
    const updateApiTokenForm = useForm({
        permissions: [] as string[],
    });
    const deleteApiTokenForm = useForm({});
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] =
        useState<Nullable<ApiToken>>(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] =
        useState<Nullable<ApiToken>>(null);
    const page = usePage<PageProps>();

    function createApiToken() {
        createApiTokenForm.post(route("api-tokens.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true);
                createApiTokenForm.reset();
            },
        });
    }

    function manageApiTokenPermissions(token: ApiToken) {
        updateApiTokenForm.setData("permissions", token.abilities);
        setManagingPermissionsFor(token);
    }

    function updateApiToken() {
        if (!managingPermissionsFor) {
            return;
        }
        updateApiTokenForm.put(
            route("api-tokens.update", [managingPermissionsFor]),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setManagingPermissionsFor(null),
            },
        );
    }

    function confirmApiTokenDeletion(token: ApiToken) {
        setApiTokenBeingDeleted(token);
    }

    function deleteApiToken() {
        if (!apiTokenBeingDeleted) {
            return;
        }
        deleteApiTokenForm.delete(
            route("api-tokens.destroy", [apiTokenBeingDeleted]),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setApiTokenBeingDeleted(null),
            },
        );
    }

    return (
        <div>
            {/* <!-- Generate API Token --> */}
            <FormSection
                onSubmit={createApiToken}
                title={"Create API Token"}
                description={
                    "API tokens allow third-party services to authenticate with our application on your behalf."
                }
                renderActions={() => (
                    <>
                        <ActionMessage
                            on={createApiTokenForm.recentlySuccessful}
                            className="mr-3"
                        >
                            Created.
                        </ActionMessage>

                        <PrimaryButton
                            className={classNames({
                                "opacity-25": createApiTokenForm.processing,
                            })}
                            disabled={createApiTokenForm.processing}
                        >
                            Create
                        </PrimaryButton>
                    </>
                )}
            >
                {/* <!-- Token Name --> */}
                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={createApiTokenForm.data.name}
                        onChange={(e) =>
                            createApiTokenForm.setData(
                                "name",
                                e.currentTarget.value,
                            )
                        }
                        autoFocus
                    />
                    <InputError
                        message={createApiTokenForm.errors.name}
                        className="mt-2"
                    />
                </div>

                {/* <!-- Token Permissions --> */}
                {availablePermissions.length > 0 && (
                    <div className="col-span-6">
                        <InputLabel htmlFor="permissions">
                            Permissions
                        </InputLabel>

                        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {availablePermissions.map((permission) => (
                                <div key={permission}>
                                    <label className="flex items-center">
                                        <Checkbox
                                            value={permission}
                                            checked={createApiTokenForm.data.permissions.includes(
                                                permission,
                                            )}
                                            onChange={(e) => {
                                                if (
                                                    createApiTokenForm.data.permissions.includes(
                                                        e.currentTarget.value,
                                                    )
                                                ) {
                                                    createApiTokenForm.setData(
                                                        "permissions",
                                                        createApiTokenForm.data.permissions.filter(
                                                            (p) =>
                                                                p !==
                                                                e.currentTarget
                                                                    .value,
                                                        ),
                                                    );
                                                } else {
                                                    createApiTokenForm.setData(
                                                        "permissions",
                                                        [
                                                            e.currentTarget
                                                                .value,
                                                            ...createApiTokenForm
                                                                .data
                                                                .permissions,
                                                        ],
                                                    );
                                                }
                                            }}
                                        />
                                        <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">
                                            {permission}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </FormSection>

            {tokens.length > 0 ? (
                <div>
                    <SectionBorder />

                    {/* <!-- Manage API Tokens --> */}
                    <div className="mt-10 sm:mt-0">
                        <ActionSection
                            title={"Manage API Tokens"}
                            description={
                                "You may delete any of your existing tokens if they are no longer needed."
                            }
                        >
                            {/* <!-- API Token List --> */}
                            <div className="space-y-6">
                                {tokens.map((token) => (
                                    <div
                                        className="flex items-center justify-between"
                                        key={token.id}
                                    >
                                        <div className="break-all dark:text-white">
                                            {token.name}
                                        </div>

                                        <div className="flex items-center">
                                            {token.last_used_ago && (
                                                <div className="text-gray-400 text-sm">
                                                    Last used{" "}
                                                    {token.last_used_ago}
                                                </div>
                                            )}

                                            {availablePermissions.length > 0 ? (
                                                <PrimaryButton
                                                    className="ml-6 cursor-pointer text-gray-400 text-sm underline"
                                                    onClick={() =>
                                                        manageApiTokenPermissions(
                                                            token,
                                                        )
                                                    }
                                                >
                                                    Permissions
                                                </PrimaryButton>
                                            ) : null}

                                            <PrimaryButton
                                                className="ml-6 cursor-pointer text-red-500 text-sm"
                                                onClick={() =>
                                                    confirmApiTokenDeletion(
                                                        token,
                                                    )
                                                }
                                            >
                                                Delete
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActionSection>
                    </div>
                </div>
            ) : null}

            {/* <!-- Token Value Modal --> */}
            <DialogModal
                isOpen={displayingToken}
                onClose={() => setDisplayingToken(false)}
            >
                <DialogModal.Content title={"API Token"}>
                    <div>
                        Please copy your new API token. For your security, it
                        won't be shown again.
                    </div>

                    <div className="mt-4 rounded bg-gray-100 px-4 py-2 font-mono text-gray-500 text-sm dark:bg-gray-900">
                        {page.props?.jetstream?.flash?.token}
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton onClick={() => setDisplayingToken(false)}>
                        Close
                    </SecondaryButton>
                </DialogModal.Footer>
            </DialogModal>

            {/* <!-- API Token Permissions Modal --> */}
            <DialogModal
                isOpen={!!managingPermissionsFor}
                onClose={() => setManagingPermissionsFor(null)}
            >
                <DialogModal.Content title={"API Token Permissions"}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {availablePermissions.map((permission) => (
                            <div key={permission}>
                                <label className="flex items-center">
                                    <Checkbox
                                        value={permission}
                                        checked={updateApiTokenForm.data.permissions.includes(
                                            permission,
                                        )}
                                        onChange={(e) => {
                                            if (
                                                updateApiTokenForm.data.permissions.includes(
                                                    e.currentTarget.value,
                                                )
                                            ) {
                                                updateApiTokenForm.setData(
                                                    "permissions",
                                                    updateApiTokenForm.data.permissions.filter(
                                                        (p) =>
                                                            p !==
                                                            e.currentTarget
                                                                .value,
                                                    ),
                                                );
                                            } else {
                                                updateApiTokenForm.setData(
                                                    "permissions",
                                                    [
                                                        e.currentTarget.value,
                                                        ...updateApiTokenForm
                                                            .data.permissions,
                                                    ],
                                                );
                                            }
                                        }}
                                    />
                                    <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">
                                        {permission}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton
                        onClick={() => setManagingPermissionsFor(null)}
                    >
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        onClick={updateApiToken}
                        className={classNames("ml-2", {
                            "opacity-25": updateApiTokenForm.processing,
                        })}
                        disabled={updateApiTokenForm.processing}
                    >
                        Save
                    </PrimaryButton>
                </DialogModal.Footer>
            </DialogModal>

            {/* <!-- Delete Token Confirmation Modal --> */}
            <ConfirmationModal
                isOpen={!!apiTokenBeingDeleted}
                onClose={() => setApiTokenBeingDeleted(null)}
            >
                <ConfirmationModal.Content title={"Delete API Token"}>
                    Are you sure you would like to delete this API token?
                </ConfirmationModal.Content>
                <ConfirmationModal.Footer>
                    <SecondaryButton
                        onClick={() => setApiTokenBeingDeleted(null)}
                    >
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        onClick={deleteApiToken}
                        className={classNames("ml-2", {
                            "opacity-25": deleteApiTokenForm.processing,
                        })}
                        disabled={deleteApiTokenForm.processing}
                    >
                        Delete
                    </DangerButton>
                </ConfirmationModal.Footer>
            </ConfirmationModal>
        </div>
    );
}
