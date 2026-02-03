"use client";

import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
    return (
        <Stack gap={6}>
            <Box textAlign="center">
                <Heading size="2xl" mb={2}>Login</Heading>
            </Box>

            <Stack gap={4}>
                <Input placeholder="Email" type="email" size="lg" />
                <Input placeholder="Password" type="password" size="lg" />
                <Button colorPalette="blue" size="lg" width="full">Log In</Button>
            </Stack>

            <Text textAlign="center" fontSize="sm" color="fg.muted">
                Don't have an account?{" "}
                <Link href="/auth/register">
                    <Button variant="plain" colorPalette="blue" size="sm">
                        Sign up
                    </Button>
                </Link>
            </Text>
        </Stack>
    );
}