"use client";

import { Flex, Text } from "@chakra-ui/react";
import DeleteTransferModal from "./DeleteTransferModal";

interface TransferCardProps {
    id: string;
    description: string;
    fromAccount: string;
    toAccount: string;
    date: string;
    amount: number;
    onTransferDeleted?: () => void;
}

export default function TransferCard({ id, description, fromAccount, toAccount, date, amount, onTransferDeleted }: TransferCardProps) {
    return (
        <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
            <Text flex="1" textAlign="left">
                {description}
            </Text>
            <Text fontSize="sm" color="fg.muted" w="40" textAlign="center">
                {fromAccount} → {toAccount}
            </Text>
            <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">
                {date}
            </Text>
            <Text fontWeight="semibold" w="20" textAlign="right" color="blue.600">
                ${amount}
            </Text>

            <DeleteTransferModal transferId={id} onTransferDeleted={onTransferDeleted} />
        </Flex>
    );
}
