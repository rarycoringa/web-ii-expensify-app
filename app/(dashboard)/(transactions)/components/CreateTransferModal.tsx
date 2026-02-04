"use client";

import {
    Button,
    Dialog,
    Input,
    Stack,
    Text,
    Select,
    createListCollection,
    Portal,
} from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import { apiCreateTransfer, apiFetchAccounts } from "@/app/lib/api";

interface CreateTransferModalProps {
    onTransferCreated?: () => void;
}

export default function CreateTransferModal({ onTransferCreated }: CreateTransferModalProps) {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [accounts, setAccounts] = useState<Array<{ id: string; name: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        const fetchAccounts = async () => {
            try {
                const data = await apiFetchAccounts();
                setAccounts(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchAccounts();
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!description.trim() || !amount.trim() || !date.trim() || !fromAccountId.trim() || !toAccountId.trim()) {
            setError("Please fill in all fields");
            return;
        }

        if (fromAccountId === toAccountId) {
            setError("From and To accounts must be different");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await apiCreateTransfer(description, parseFloat(amount), date, fromAccountId, toAccountId);
            setDescription("");
            setAmount("");
            setDate("");
            setFromAccountId("");
            setToAccountId("");
            setOpen(false);
            onTransferCreated?.();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
            <Dialog.Trigger asChild>
                <Button colorPalette="blue" size="sm">
                    +
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Create New Transfer</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CloseTrigger />

                    <Dialog.Body>
                        <Stack gap={4}>
                            <Input
                                placeholder="Transfer Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Input
                                placeholder="Amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Input
                                placeholder="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <Stack gap={2}>
                                <Text fontSize="sm" fontWeight="medium">From Account</Text>
                                <Select.Root
                                    collection={useMemo(
                                        () =>
                                            createListCollection({
                                                items: accounts.map((account) => ({
                                                    label: account.name,
                                                    value: account.id,
                                                })),
                                            }),
                                        [accounts]
                                    )}
                                    value={[fromAccountId]}
                                    onValueChange={(e) => setFromAccountId(e.value[0])}
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select from account" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {accounts.map((account) => (
                                                    <Select.Item key={account.id} item={{ label: account.name, value: account.id }}>
                                                        {account.name}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Stack>

                            <Stack gap={2}>
                                <Text fontSize="sm" fontWeight="medium">To Account</Text>
                                <Select.Root
                                    collection={useMemo(
                                        () =>
                                            createListCollection({
                                                items: accounts.map((account) => ({
                                                    label: account.name,
                                                    value: account.id,
                                                })),
                                            }),
                                        [accounts]
                                    )}
                                    value={[toAccountId]}
                                    onValueChange={(e) => setToAccountId(e.value[0])}
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select to account" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {accounts.map((account) => (
                                                    <Select.Item key={account.id} item={{ label: account.name, value: account.id }}>
                                                        {account.name}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Stack>
                            
                            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
                        </Stack>
                    </Dialog.Body>

                    <Dialog.Footer gap={2}>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button colorPalette="blue" onClick={handleSubmit} loading={isLoading}>
                            Create
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
