"use client";

import { Flex, Text } from "@chakra-ui/react";

interface TransferCardProps {
    description: string;
    fromAccount: string;
    toAccount: string;
    date: string;
    amount: number;
}

export default function TransferCard({ description, fromAccount, toAccount, date, amount }: TransferCardProps) {
    return (
        <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
            <Text flex="1" textAlign="left">
                {description}
            </Text>
            <Text fontSize="sm" color="fg.muted" w="60" textAlign="center">
                {fromAccount} → {toAccount}
            </Text>
            <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">
                {date}
            </Text>
            <Text fontWeight="semibold" w="20" textAlign="right" color="blue.600">
                ${amount}
            </Text>
        </Flex>
    );
}
