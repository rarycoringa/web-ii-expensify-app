"use client";

import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
                        <Heading size="lg" mt={2}>$4,250</Heading>
                    </Box>
                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Text fontSize="md" color="fg.muted">Expenses</Text>
                        <Heading size="lg" mt={2}>$2,980</Heading>
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
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Salary</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Checking</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-02-01</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$3,500</Text>
                            </Flex>
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Freelance</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Savings</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-02-02</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$500</Text>
                            </Flex>
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Investment</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Brokerage</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-01-28</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$250</Text>
                            </Flex>
                        </Stack>
                    </Box>

                    <Box borderWidth="1px" rounded="lg" p={6} w="full">
                        <Heading size="lg" mb={4}>Expenses</Heading>
                        <Stack gap={2} w="full">
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Rent</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Checking</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-02-01</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$1,500</Text>
                            </Flex>
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Groceries</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Checking</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-02-02</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$420</Text>
                            </Flex>
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Utilities</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Savings</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-01-31</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$180</Text>
                            </Flex>
                            <Flex align="center" borderWidth="1px" rounded="md" px={4} py={2} h="12">
                                <Text flex="1" textAlign="left">Transport</Text>
                                <Text fontSize="sm" color="fg.muted" w="20" textAlign="center">Credit</Text>
                                <Text fontSize="sm" color="fg.muted" w="28" textAlign="center">2025-01-30</Text>
                                <Text fontWeight="semibold" w="20" textAlign="right">$120</Text>
                            </Flex>
                        </Stack>
                    </Box>
                </SimpleGrid>
            </Stack>
        </Box>
    );
}
