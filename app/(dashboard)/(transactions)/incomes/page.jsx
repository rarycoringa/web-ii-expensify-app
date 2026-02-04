"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetchIncomes } from "@/app/lib/api";
import IncomeCard from "../components/IncomeCard";
import CreateIncomeModal from "../components/CreateIncomeModal";

export default function Incomes() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [incomes, setIncomes] = useState([]);
    const incomesBalance = incomes.reduce((total, income) => total + income.amount, 0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }

        fetchIncomes();
    }, [isAuthenticated, router]);

    const fetchIncomes = async () => {
        const fetchedIncomes = await apiFetchIncomes();
        setIncomes(fetchedIncomes);
    }

    const handleIncomeCreated = () => {
        fetchIncomes();
        toaster.create({
            title: "Income created",
            type: "success",
            duration: 6000,
        });
    };

    const handleIncomeDeleted = () => {
        fetchIncomes();
        toaster.create({
            title: "Income deleted",
            type: "success",
            duration: 6000,
        });
    };

    return (
        <Stack gap={8} w="60%">
            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Text fontSize="md" color="fg.muted">Incomes Amount</Text>
                <Heading size="lg" mt={2} color="green.600">${incomesBalance}</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Incomes</Heading>
                <Stack gap={2} w="full">
                    {incomes.map((income) => (
                        <IncomeCard
                            key={income.id}
                            id={income.id}
                            description={income.description}
                            account={income.account_id}
                            date={income.date}
                            amount={income.amount}
                            onIncomeDeleted={handleIncomeDeleted}
                        />
                    ))}
                </Stack>
            </Box>

            <CreateIncomeModal onIncomeCreated={handleIncomeCreated} />
        </Stack>
    );
}
