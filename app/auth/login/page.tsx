"use client";

import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState} from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = await login(username, password);
            localStorage.setItem("token", token);
            router.push("/");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Box textAlign="center">
                    <Heading size="2xl" mb={2}>Login</Heading>
                </Box>

                <Stack gap={4}>
                    <Input placeholder="Username" type="text" size="lg" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <Input placeholder="Password" type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button colorPalette="blue" size="lg" width="full" type="submit" loading={isLoading}>Log In</Button>
                </Stack>

                {error && <Text color="red.500" textAlign="center">{error}</Text>}

                <Text textAlign="center" fontSize="sm" color="fg.muted">
                    Don't have an account?{" "}
                    <Link href="/auth/register">
                        <Button variant="plain" colorPalette="blue" size="sm">
                            Sign up
                        </Button>
                    </Link>
                </Text>
            </Stack>
        </form>
    );
}