"use client";

import {
    Button,
    Dialog,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { apiDeleteAccount } from "@/app/lib/api";

interface DeleteAccountModalProps {
    accountId: string;
    onAccountDeleted?: () => void;
}

export default function DeleteAccountModal({ accountId, onAccountDeleted }: DeleteAccountModalProps) {
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            await apiDeleteAccount(accountId);
            setOpen(false);
            onAccountDeleted?.();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
            <Dialog.Trigger asChild>
                <Button colorPalette="red" variant="outline" size="sm" px={2} ml={4}>
                    Delete
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Delete Account</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CloseTrigger />

                    <Dialog.Body>
                        <Stack gap={4}>
                            Are you sure you want to delete this account?
                            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
                        </Stack>
                    </Dialog.Body>
                    
                    <Dialog.Footer gap={2}>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button colorPalette="red" onClick={handleSubmit} loading={isLoading}>
                            Delete
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
