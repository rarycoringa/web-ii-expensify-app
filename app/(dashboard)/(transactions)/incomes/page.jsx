"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import IncomeCard from "../components/IncomeCard";

export default function Incomes() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    return (
        <Stack gap={8} w="60%">
            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Text fontSize="md" color="fg.muted">Incomes Amount</Text>
                <Heading size="lg" mt={2} color="green.600">$4,250</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Incomes</Heading>
                <Stack gap={2} w="full">
                    <IncomeCard description="Salary" account="Checking" date="2025-02-01" amount={3500} />
                    <IncomeCard description="Freelance" account="Savings" date="2025-02-02" amount={500} />
                    <IncomeCard description="Investment" account="Brokerage" date="2025-01-28" amount={250} />
                </Stack>
            </Box>
        </Stack>
    );
}
