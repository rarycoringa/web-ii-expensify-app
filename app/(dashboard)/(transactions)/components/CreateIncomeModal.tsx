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
import { apiCreateIncome, apiFetchAccounts } from "@/app/lib/api";

interface CreateIncomeModalProps {
    onIncomeCreated?: () => void;
}

export default function CreateIncomeModal({ onIncomeCreated }: CreateIncomeModalProps) {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [accountId, setAccountId] = useState("");
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

        if (!description.trim() || !amount.trim() || !date.trim() || !accountId.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await apiCreateIncome(description, parseFloat(amount), date, accountId);
            setDescription("");
            setAmount("");
            setDate("");
            setAccountId("");
            setOpen(false);
            onIncomeCreated?.();
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
                        <Dialog.Title>Create New Income</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CloseTrigger />

                    <Dialog.Body>
                        <Stack gap={4}>
                            <Input
                                placeholder="Income Description"
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
                                value={[accountId]}
                                onValueChange={(e) => setAccountId(e.value[0])}
                            >
                                <Select.HiddenSelect />
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Select account" />
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
