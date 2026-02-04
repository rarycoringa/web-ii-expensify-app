"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetchTransfers } from "@/app/lib/api";
import TransferCard from "../components/TransferCard";
import CreateTransferModal from "../components/CreateTransferModal";
import { toaster } from "@/app/components/ui/toaster";

export default function Transfers() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [transfers, setTransfers] = useState([]);
    const transfersBalance = transfers.reduce((total, transfer) => total + transfer.amount, 0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }

        fetchTransfers();
    }, [isAuthenticated, router]);

    const fetchTransfers = async () => {
        const fetchedTransfers = await apiFetchTransfers();
        setTransfers(fetchedTransfers);
    };

    const handleTransferCreated = () => {
        fetchTransfers();
        toaster.create({
            title: "Transfer created",
            type: "success",
            duration: 6000,
        });
    };

    const handleTransferDeleted = () => {
        fetchTransfers();
        toaster.create({
            title: "Transfer deleted",
            type: "success",
            duration: 6000,
        });
    };

    return (
        <Stack gap={8} w="60%">
            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Text fontSize="md" color="fg.muted">Transfers Amount</Text>
                <Heading size="lg" mt={2}>${transfersBalance}</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Transfers</Heading>
                <Stack gap={2} w="full">
                    {transfers.map((transfer) => (
                        <TransferCard
                            key={transfer.id}
                            id={transfer.id}
                            description={transfer.description}
                            fromAccount={transfer.source_account_id}
                            toAccount={transfer.destination_account_id}
                            date={transfer.date}
                            amount={transfer.amount}
                            onTransferDeleted={handleTransferDeleted}
                        />
                    ))}
                </Stack>
            </Box>

            <CreateTransferModal onTransferCreated={handleTransferCreated} />
        </Stack>
    );
}
