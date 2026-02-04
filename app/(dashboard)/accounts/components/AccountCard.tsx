"use client";

import { Flex, Text } from "@chakra-ui/react";

interface AccountCardProps {
    name: string;
    amount: number;
}

export default function AccountCard({ name, amount }: AccountCardProps) {
    return (
        <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
            <Text flex="1" textAlign="left">
                {name}
            </Text>
            <Text fontWeight="semibold" w="20" textAlign="right">
                ${amount}
            </Text>
        </Flex>
    );
}
