"use client";

import { Flex, Spacer, Text } from "@chakra-ui/react";
import DeleteAccountModal from "./DeleteAccountModal";

interface AccountCardProps {
    id: string;
    name: string;
    amount: number;
    onAccountDeleted?: () => void;
}

export default function AccountCard({ id, name, amount, onAccountDeleted }: AccountCardProps) {
    return (
        <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
            <Text flex="1" textAlign="left">
                {name}
            </Text>
            
            <Text fontWeight="semibold" w="20" textAlign="right">
                ${amount}
            </Text>

            <DeleteAccountModal accountId={id} onAccountDeleted={onAccountDeleted} />
        </Flex>
    );
}
