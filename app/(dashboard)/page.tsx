"use client";

import {
    Box,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IncomeCard from "./(transactions)/components/IncomeCard";
import ExpenseCard from "./(transactions)/components/ExpenseCard";
import TransferCard from "./(transactions)/components/TransferCard";
import AccountCard from "./accounts/components/AccountCard";
import { apiFetchAccounts, apiFetchExpenses, apiFetchIncomes, apiFetchTransfers } from "../lib/api";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [incomes, setIncomes] = useState<Array<{ id: string; description: string; account: string; date: string; amount: number }>>([]);
    const [expenses, setExpenses] = useState<Array<{ id: string; description: string; account: string; date: string; amount: number }>>([]);
    const [transfers, setTransfers] = useState<Array<{ id: string; description: string; fromAccount: string; toAccount: string; date: string; amount: number }>>([]);
    const [accounts, setAccounts] = useState<Array<{ id: string; name: string; balance: number }>>([]);

    const incomesBalance = incomes.reduce((sum, income) => sum + income.amount, 0);
    const expensesBalance = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalBalance = incomesBalance - expensesBalance;

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }

        fetchIncomes();
        fetchExpenses();
        fetchTransfers();
        fetchAccounts();

    }, [isAuthenticated, router]);

    const fetchIncomes = async () => {
        const fetchedIncomes = await apiFetchIncomes();
        setIncomes(fetchedIncomes);
    };

    const fetchExpenses = async () => {
        const fetchedExpenses = await apiFetchExpenses();
        setExpenses(fetchedExpenses);
    };

    const fetchTransfers = async () => {
        const fetchedTransfers = await apiFetchTransfers();
        setTransfers(fetchedTransfers);
    };

    const fetchAccounts = async () => {
        const fetchedAccounts = await apiFetchAccounts();
        setAccounts(fetchedAccounts);
    };

    return (
        <Box w="full" maxW="6xl" mx="auto">
            <Stack gap={8} w="full">
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Income</Text>
                        <Heading size="lg" mt={2} color="green.600">${incomesBalance.toFixed(2)}</Heading>
                    </Box>
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Expenses</Text>
                        <Heading size="lg" mt={2} color="red.600">${expensesBalance.toFixed(2)}</Heading>
                    </Box>
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Balance</Text>
                        <Heading size="lg" mt={2}>${totalBalance.toFixed(2)}</Heading>
                    </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Incomes</Heading>
                        <Stack gap={2} w="full">
                            {incomes.map((income) => (
                                <IncomeCard
                                    key={income.id}
                                    id={income.id}
                                    description={income.description}
                                    account={income.account}
                                    date={income.date}
                                    amount={income.amount}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Expenses</Heading>
                        <Stack gap={2} w="full">
                            {expenses.map((expense) => (
                                <ExpenseCard
                                    key={expense.id}
                                    id={expense.id}
                                    description={expense.description}
                                    account={expense.account}
                                    date={expense.date}
                                    amount={expense.amount}
                                />
                            ))}
                        </Stack>
                    </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Transfers</Heading>
                        <Stack gap={2} w="full">
                            {transfers.map((transfer) => (
                                <TransferCard
                                    key={transfer.id}
                                    id={transfer.id}
                                    description={transfer.description}
                                    fromAccount={transfer.fromAccount}
                                    toAccount={transfer.toAccount}
                                    date={transfer.date}
                                    amount={transfer.amount}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Accounts</Heading>
                        <Stack gap={2} w="full">
                            {accounts.map((account) => (
                                <AccountCard
                                    key={account.id}
                                    id={account.id}
                                    name={account.name}
                                    amount={account.balance}
                                />
                            ))}
                        </Stack>
                    </Box>
                </SimpleGrid>

                
            </Stack>
        </Box>
    );
}
