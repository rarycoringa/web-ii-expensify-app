"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TransferCard from "../components/TransferCard";

export default function Transfers() {
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
                <Text fontSize="md" color="fg.muted">Transfers Amount</Text>
                <Heading size="lg" mt={2}>$4,250</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Transfers</Heading>
                <Stack gap={2} w="full">
                    <TransferCard description="Transfer to Savings" fromAccount="Checking" toAccount="Savings" date="2025-02-03" amount={500} />
                    <TransferCard description="Transfer to Brokerage" fromAccount="Savings" toAccount="Brokerage" date="2025-01-29" amount={1000} />
                    <TransferCard description="Transfer from Credit" fromAccount="Credit" toAccount="Checking" date="2025-01-25" amount={300} />
                </Stack>
            </Box>
        </Stack>
    );
}
