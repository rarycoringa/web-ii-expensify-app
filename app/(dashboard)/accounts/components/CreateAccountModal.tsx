"use client";

import { Button, Dialog, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { apiCreateAccount } from "@/app/lib/api";

interface CreateAccountModalProps {
    onAccountCreated?: () => void;
}

export default function CreateAccountModal({ onAccountCreated }: CreateAccountModalProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !balance.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await apiCreateAccount(name, parseFloat(balance));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setName("");
            setBalance("");
            setOpen(false);
            onAccountCreated?.();
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
            <Dialog.Trigger asChild>
                <Button colorPalette="green" size="sm">
                    +
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Create New Account</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CloseTrigger />

                    <Dialog.Body>
                        <Stack gap={4}>
                            <Input
                                placeholder="Account Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                placeholder="Initial Balance"
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                            />
                            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer gap={2}>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button colorPalette="green" onClick={handleSubmit} loading={isLoading}>
                            Create
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
