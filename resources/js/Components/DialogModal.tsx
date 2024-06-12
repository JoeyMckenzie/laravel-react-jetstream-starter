import Modal, { type ModalProps } from "@/Components/Modal";
import React, { type PropsWithChildren } from "react";

DialogModal.Content = function DialogModalContent({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {
    return (
        <div className="px-6 py-4">
            <div className="font-medium text-gray-900 text-lg dark:text-gray-100">
                {title}
            </div>

            <div className="mt-4 text-gray-600 text-sm dark:text-gray-400">
                {children}
            </div>
        </div>
    );
};

DialogModal.Footer = function DialogModalFooter({
    children,
}: PropsWithChildren<Record<string, unknown>>) {
    return (
        <div className="bg-gray-100 px-6 py-4 text-right dark:bg-gray-800">
            {children}
        </div>
    );
};

export default function DialogModal({
    children,
    ...modalProps
}: PropsWithChildren<ModalProps>) {
    return <Modal {...modalProps}>{children}</Modal>;
}
