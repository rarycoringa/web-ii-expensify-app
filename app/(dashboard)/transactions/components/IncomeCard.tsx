"use client";

import { Flex, Text } from "@chakra-ui/react";

interface IncomeCardProps {
    description: string;
    account: string;
    date: string;
    amount: number;
}

export default function IncomeCard({ description, account, date, amount }: IncomeCardProps) {
    return (
        <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
            <Text flex="1" textAlign="left">
                {description}
            </Text>
            <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">
                {account}
            </Text>
            <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">
                {date}
            </Text>
            <Text fontWeight="semibold" w="20" textAlign="right" color="green.600">
                ${amount}
            </Text>
        </Flex>
    );
}
