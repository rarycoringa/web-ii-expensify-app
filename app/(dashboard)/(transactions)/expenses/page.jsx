"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ExpenseCard from "../components/ExpenseCard";

export default function Expenses() {
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
                <Text fontSize="md" color="fg.muted">Expenses Amount</Text>
                <Heading size="lg" mt={2} color="red.600">$4,250</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Expenses</Heading>
                <Stack gap={2} w="full">
                    <ExpenseCard description="Rent" account="Checking" date="2025-02-01" amount={1500} />
                    <ExpenseCard description="Groceries" account="Checking" date="2025-02-02" amount={420} />
                    <ExpenseCard description="Utilities" account="Savings" date="2025-01-31" amount={180} />
                    <ExpenseCard description="Transport" account="Credit" date="2025-01-30" amount={120} />
                </Stack>
            </Box>
        </Stack>
    );
}
