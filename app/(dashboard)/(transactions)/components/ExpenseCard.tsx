"use client";

import { Flex, Text } from "@chakra-ui/react";
import DeleteExpenseModal from "./DeleteExpenseModal";

interface ExpenseCardProps {
    id: string;
    description: string;
    account: string;
    date: string;
    amount: number;
    onExpenseDeleted?: () => void;
}

export default function ExpenseCard({ id, description, account, date, amount, onExpenseDeleted }: ExpenseCardProps) {
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

            <Text fontWeight="semibold" w="20" textAlign="right" color="red.600">
                ${amount}
            </Text>

            <DeleteExpenseModal expenseId={id} onExpenseDeleted={onExpenseDeleted} />
        </Flex>
    );
}
