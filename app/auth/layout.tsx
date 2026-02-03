"use client";

import { Container, Flex } from "@chakra-ui/react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Flex minH="100vh" alignItems="center" justifyContent="center">
            <Container maxW="md" py={12}>
                {children}
            </Container>
        </Flex>
    );
}
