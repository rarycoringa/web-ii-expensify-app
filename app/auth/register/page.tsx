"use client";

import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Register() {
    return (
        <Stack gap={6}>
            <Box textAlign="center">
                <Heading size="2xl" mb={2}>Register</Heading>
            </Box>

            <Stack gap={4}>
                <Input placeholder="Email" type="email" size="lg" />
                <Input placeholder="Password" type="password" size="lg" />
                <Input placeholder="Confirm Password" type="password" size="lg" />
                <Button colorPalette="blue" size="lg" width="full">Sign Up</Button>
            </Stack>

            <Text textAlign="center" fontSize="sm" color="fg.muted">
                Already have an account?{" "}
                <Link href="/auth/login">
                    <Button variant="plain" colorPalette="blue" size="sm">
                        Log in
                    </Button>
                </Link>
            </Text>
        </Stack>
    );
}