"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountCard from "./components/AccountCard";
import CreateAccountModal from "./components/CreateAccountModal";
import { apiFetchAccounts } from "@/app/lib/api";
import { toaster } from "@/app/components/ui/toaster";

export default function Accounts() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [accounts, setAccounts] = useState<Array<{ id: string, name: string; balance: number }>>([]);
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }

        fetchAccounts();
    }, [isAuthenticated, router]);

    const fetchAccounts = async () => {
        const fetchedAccounts = await apiFetchAccounts();
        setAccounts(fetchedAccounts);
    }

    const handleAccountCreated = () => {
        fetchAccounts();
        toaster.create({
            title: "Account created",
            type: "success",
            duration: 6000,
        });
    };

    const handleAccountDeleted = () => {
        fetchAccounts();
        toaster.create({
            title: "Account deleted",
            type: "success",
            duration: 6000,
        });
    };

    return (
        <Stack gap={8} w="60%">
            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Text fontSize="md" color="fg.muted">Accounts Amount</Text>
                <Heading size="lg" mt={2}>${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Heading>
            </Box>

            <Box borderWidth="1px" rounded="lg" p={6} w="full">
                <Heading size="lg" mb={4}>Accounts</Heading>
                <Stack gap={2} w="full">
                    {
                        accounts.map((account, index) => (
                            <AccountCard key={index} id={account.id} name={account.name} amount={account.balance} onAccountDeleted={handleAccountDeleted} />
                        ))
                    }
                </Stack>
            </Box>

            <CreateAccountModal onAccountCreated={handleAccountCreated} />
        </Stack>
    );
}
