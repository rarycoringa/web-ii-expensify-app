"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetchAccounts, apiFetchExpenses } from "@/app/lib/api";
import ExpenseCard from "../components/ExpenseCard";
import CreateExpenseModal from "../components/CreateExpenseModal";
import { toaster } from "@/app/components/ui/toaster";

export default function Expenses() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [expenses, setExpenses] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const expensesBalance = expenses.reduce((total, expense) => total + expense.amount, 0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }

        fetchExpenses();
        fetchAccounts();
    }, [isAuthenticated, router]);

    const fetchExpenses = async () => {
        const fetchedExpenses = await apiFetchExpenses();
        setExpenses(fetchedExpenses);
    };

    const fetchAccounts = async () => {
        const fetchedAccounts = await apiFetchAccounts();
        setAccounts(fetchedAccounts);
    };

    const getAccountName = (accountId) => {
        const match = accounts.find((account) => account.id === accountId);
        return match?.name || accountId;
    };

    const handleExpenseCreated = () => {
        fetchExpenses();
        toaster.create({
            title: "Expense created",
            type: "success",
            duration: 6000,
        });
    };

    return (
        <Stack gap={8} w="60%">
            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Text fontSize="md" color="fg.muted">Expenses Amount</Text>
                <Heading size="lg" mt={2} color="red.600">${expensesBalance}</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Expenses</Heading>
                <Stack gap={2} w="full">
                    {expenses.map((expense) => (
                        <ExpenseCard
                            key={expense.id}
                            description={expense.description}
                            account={getAccountName(expense.account_id ?? expense.accountId ?? expense.account)}
                            date={expense.date}
                            amount={expense.amount}
                        />
                    ))}
                </Stack>
            </Box>

            <CreateExpenseModal onExpenseCreated={handleExpenseCreated} />
        </Stack>
    );
}
