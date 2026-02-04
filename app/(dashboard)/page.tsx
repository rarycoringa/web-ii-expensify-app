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
import { useEffect } from "react";
import IncomeCard from "./(transactions)/components/IncomeCard";
import ExpenseCard from "./(transactions)/components/ExpenseCard";
import TransferCard from "./(transactions)/components/TransferCard";
import AccountCard from "./accounts/components/AccountCard";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    return (
        <Box w="full" maxW="6xl" mx="auto">
            <Stack gap={8} w="full">
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Income</Text>
                        <Heading size="lg" mt={2} color="green.600">$4,250</Heading>
                    </Box>
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Expenses</Text>
                        <Heading size="lg" mt={2} color="red.600">$2,980</Heading>
                    </Box>
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Balance</Text>
                        <Heading size="lg" mt={2}>$1,270</Heading>
                    </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Incomes</Heading>
                        <Stack gap={2} w="full">
                            <IncomeCard description="Salary" account="Checking" date="2025-02-01" amount={3500} />
                            <IncomeCard description="Freelance" account="Savings" date="2025-02-02" amount={500} />
                            <IncomeCard description="Investment" account="Brokerage" date="2025-01-28" amount={250} />
                        </Stack>
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
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Transfers</Heading>
                        <Stack gap={2} w="full">
                            <TransferCard description="Transfer to Savings" fromAccount="Checking" toAccount="Savings" date="2025-02-03" amount={500} />
                            <TransferCard description="Transfer to Brokerage" fromAccount="Savings" toAccount="Brokerage" date="2025-01-29" amount={1000} />
                            <TransferCard description="Transfer from Credit" fromAccount="Credit" toAccount="Checking" date="2025-01-25" amount={300} />
                        </Stack>
                    </Box>

                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Accounts</Heading>
                        <Stack gap={2} w="full">
                            <AccountCard name="Checking" amount={1500} />
                            <AccountCard name="Savings" amount={3000} />
                        </Stack>
                    </Box>
                </SimpleGrid>

                
            </Stack>
        </Box>
    );
}
